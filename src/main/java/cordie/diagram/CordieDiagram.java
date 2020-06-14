package cordie.diagram;

import cordie.diagram.operation.*;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.jdom.output.Format;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;
import org.apache.commons.lang3.StringEscapeUtils;

public class CordieDiagram {
    // <editor-fold>
    private String diagramID;
    private String diagramTitle;
    private String creator;
    private Date dateCreated;
    private List<String> collaboratorList;
    private Map<String, String[]> collaboratorInfo;

    private Map<String, CordieClient> currentEditors;
    private ArrayList<String> currentUsers;
    private int editorsCount;
    private ArrayBlockingQueue<CordieMessage> messageQueue;
    private XMLOutputter outputter;
    
    private Document dom;
    private Element root;

    //private final long CHECKING_PERIOD = 5 * 60 * 1000; // check user activity every 5 mins
    //private final long MAX_IDLE_ALLOWED = 10 * 60 * 1000; // allow users to be idle for less than 10 minutes
    private final long CHECKING_PERIOD = 10 * 1000; // check user activity every 10 sec
    private final long MAX_IDLE_ALLOWED = 25 * 1000; // allow users to be idle for less than 1 minute
    private Timer timer;
    // </editor-fold>

    public CordieDiagram(String iDiagramID) {
        // Parse XML file
        SAXBuilder builder = new SAXBuilder();
        try {
            dom = builder.build(new File("cordie_diagram_files/" + iDiagramID + ".xml"));
        } catch(JDOMException e) {
            e.printStackTrace();
        } catch(IOException e) {
            e.printStackTrace();
        }

        this.root = dom.getRootElement();
        this.diagramID = iDiagramID;

        setCollaboratorsAndOtherAttributes();

        this.currentEditors = new HashMap<String, CordieClient>();
        this.currentUsers = new ArrayList<String>();
        this.editorsCount = 0;
        this.messageQueue = new ArrayBlockingQueue<CordieMessage>(200);
        this.outputter = new XMLOutputter(Format.getPrettyFormat());

        // Run this diagram's message processor
        ExecutorService executor = Executors.newFixedThreadPool(1);
        try {
            executor.execute(new CordieMessageDirector());
        } catch(Exception exception){
            exception.printStackTrace();
        }
        executor.shutdown();

        // Set up a TimerTask object to monitor user activity
        timer = new Timer();
        timer.scheduleAtFixedRate(new MonitorEditors(), 5 * 1000, CHECKING_PERIOD);
    }

    private void setCollaboratorsAndOtherAttributes() {
        Connection connection = null;
        String sql = "";
        PreparedStatement stmt;
        ResultSet rs;

        this.collaboratorList = new ArrayList<String>();
        this.collaboratorInfo = new HashMap<String, String[]>();

        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

            sql = "SELECT user.username, user.firstname, user.lastname, user.email,"
                    + " user.displaypic FROM user INNER JOIN collaborator "
                    + "ON user.username = collaborator.c_username "
                    + "WHERE c_diagram_id = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, Integer.parseInt(diagramID));
            rs = stmt.executeQuery();

            while(rs.next()) {
                collaboratorList.add(rs.getString("username"));
                String[] temp = { rs.getString("firstname"), rs.getString("lastname"),
                                  rs.getString("email"), rs.getString("displaypic")};
                this.collaboratorInfo.put(rs.getString("username"), temp);
            }

            sql = "SELECT title, creator, date_created FROM diagram WHERE diagram_id = ?";
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, Integer.parseInt(diagramID));
            rs = stmt.executeQuery();

            if(rs.next()) {
                this.diagramTitle = rs.getString("title");
                this.creator = rs.getString("creator");
                this.dateCreated = rs.getDate("date_created");
            }
        } catch (ClassNotFoundException e) {
            System.err.println("Driver Error");
        } catch (SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        }
    }

    public boolean isInactive() {
        return currentEditors.isEmpty();
    }

    public boolean allowsEditFrom(String username) {
        return collaboratorList.contains(username);
    }

    public String getCreator() {
        return creator;
    }

    public String addEditor(String username) {
        String editorID = Integer.toString(editorsCount);
        synchronized(currentEditors) {
            //System.out.println(editorID + " is now an editor");
            currentEditors.put(editorID, new CordieClient(username));
            editorsCount++;
            if(!currentUsers.contains(username)) {
                currentUsers.add(username);
            }

            CordieOperation co = new CordieAddUserOperation(username);
            this.queueMessage(new CordieMessage(editorID, co, 0, 0));
        }

        return "{\"diagram\" : " + this.toString() + ", \"editorID\" : \"" + 
                editorID + "\"}";
        //return editorID;
    }

    public void queueMessage(CordieMessage msg) {
        try {
            messageQueue.put(msg);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
    }

    /*public ArrayBlockingQueue<CordieMessage> getMessageQueue() {
        return messageQueue;
    }*/

    public boolean messageQueueEmpty() {
        return messageQueue.isEmpty();
    }
    
    public CordieClient getClient(String editorID) {
        return currentEditors.get(editorID);
    }

    public boolean hasCurrentEditor(String editorID) {
        return currentEditors.containsKey(editorID);
    }

    public void apply(CordieOperation op, String sender) {
        List doChildren = root.getChildren();

        // Apply to server copy
        if(op instanceof CordieInsertOperation) { // <editor-fold>
            CordieInsertOperation cio = (CordieInsertOperation) op;
            doChildren.add(cio.getPosition(), cio.getObject());
            // </editor-fold>
        } else if(op instanceof CordieDeleteOperation) { // <editor-fold>
            CordieDeleteOperation cdo = (CordieDeleteOperation) op;
            doChildren.remove(cdo.getPosition());
            // </editor-fold>
        } else if(op instanceof CordieEditOperation) { // <editor-fold>
            CordieEditOperation ceo = (CordieEditOperation) op;
            Element target = (Element) doChildren.get(ceo.getPosition());

            if(ceo.getValue() != null) {
                target.setAttribute(ceo.getAttribute(), ceo.getValue());
            } else if (ceo.getAttribute().equals("attribute") || ceo.getAttribute().equals("operation") ||
                       ceo.getAttribute().equals("template") || ceo.getAttribute().equals("taggedvalue") ||
                       ceo.getAttribute().equals("containedartifact") || ceo.getAttribute().equals("internalactivity")) {
                CordieOperation attrOp = ceo.getAttributeOp();
                List attrItems = target.getChild(ceo.getAttribute() + "s").getChildren();
                
                if(attrOp instanceof CordieInsertOperation) {
                    CordieInsertOperation attrInsertOp = (CordieInsertOperation) attrOp;
                    attrItems.add(attrInsertOp.getPosition(), attrInsertOp.getObject());
                } else if(attrOp instanceof CordieDeleteOperation) {
                    attrItems.remove(((CordieDeleteOperation) attrOp).getPosition());
                } else if(attrOp instanceof CordieEditOperation) {
                    CordieEditOperation attrEditOp = (CordieEditOperation) attrOp;
                    if(attrEditOp.getAttribute().equals("attributeValue")) {
                        ((Element) attrItems.get(attrEditOp.getPosition())).setText(attrEditOp.getValue());
                    } else if(attrEditOp.getAttribute().equals("attributeStatic")) {
                        ((Element) attrItems.get(attrEditOp.getPosition())).setAttribute("static", attrEditOp.getValue());
                    } else if(attrEditOp.getAttribute().equals("attributeAbstract")) {
                        ((Element) attrItems.get(attrEditOp.getPosition())).setAttribute("abstract", attrEditOp.getValue());
                    }
                } else if(attrOp instanceof CordieMoveOperation) {
                    CordieMoveOperation attrMoveOp = (CordieMoveOperation) attrOp;
                    Element attrTarget = (Element) attrItems.remove(attrMoveOp.getPosition());
                    attrItems.add(attrMoveOp.getDestination(), attrTarget);
                }
            } else if(ceo.getAttribute().equals("point")) {
                CordieOperation attrOp = ceo.getAttributeOp();
                List points = target.getChildren("point");
                
                if(attrOp instanceof CordieInsertOperation) {
                    CordieInsertOperation attrInsertOp = (CordieInsertOperation) attrOp;
                    points.add(attrInsertOp.getPosition(), attrInsertOp.getObject());
                } else if(attrOp instanceof CordieDeleteOperation) {
                    points.remove(((CordieDeleteOperation) attrOp).getPosition());
                } else if(attrOp instanceof CordieEditOperation) {
                    CordieEditOperation attrEditOp = (CordieEditOperation) attrOp;
                    if(attrEditOp.getAttribute().equals("attributeX")) {
                        ((Element) points.get(attrEditOp.getPosition())).setAttribute("x", attrEditOp.getValue());
                    } else if(attrEditOp.getAttribute().equals("attributeY")) {
                        ((Element) points.get(attrEditOp.getPosition())).setAttribute("y", attrEditOp.getValue());
                    }
                }
            }
            // </editor-fold>
        } else if(op instanceof CordieMoveOperation) { // <editor-fold>
            CordieMoveOperation cmo = (CordieMoveOperation) op;
            Element target = (Element) doChildren.remove(cmo.getPosition());
            doChildren.add(cmo.getDestination(), target);
            // </editor-fold>
        } else if(op instanceof CordieRemoveCollaboratorOperation) { // <editor-fold>
            CordieRemoveCollaboratorOperation crco = (CordieRemoveCollaboratorOperation) op;
            String userToRemove = crco.getUsername();

            synchronized(currentEditors) {
                Set<String> editorsToRemove = new HashSet<String>();
                for(String key : currentEditors.keySet()) {
                    if(currentEditors.get(key).getUsername().equals(userToRemove)) {
                        //currentEditors.remove(key);
                        editorsToRemove.add(key);
                    }
                }
                for(String key : editorsToRemove) {
                    //System.out.println("removing user: " + key + " for " + userToRemove);
                    currentEditors.remove(key);
                }
                
                if(currentUsers.contains(userToRemove)) {
                    currentUsers.remove(currentUsers.indexOf(userToRemove));
                }

                //if(!collaboratorList.contains(userToRemove)) return;

                collaboratorList.remove(userToRemove);
                collaboratorInfo.remove(userToRemove);
                //currentEditors.remove(userToRemove);
            }
            // </editor-fold>
        } else if(op instanceof CordieRemoveUserOperation) { // <editor-fold>
            CordieRemoveUserOperation cruo = (CordieRemoveUserOperation) op;
            String userToRemove = cruo.getUsername();

            synchronized(currentEditors) {
                for(String key : currentEditors.keySet()) {
                    if(currentEditors.get(key).getUsername().equals(userToRemove)) {
                        currentEditors.remove(key);
                    }
                }
                if(currentUsers.contains(userToRemove)) {
                    currentUsers.remove(currentUsers.indexOf(userToRemove));
                }

                //System.out.println(cruo.getUsername() + " has not sent messages in a long time. "
                //        + "He/She will now be removed from current users.");
                //currentEditors.remove(userToRemove);
            }
            // </editor-fold>
        } else if(op instanceof CordieAddCollaboratorOperation) { // <editor-fold>
            CordieAddCollaboratorOperation caco = (CordieAddCollaboratorOperation) op;
            collaboratorList.add(caco.getUsername());
            String[] temp = { caco.getFirstname(), caco.getLastname(), caco.getEmail(),
                              caco.getDisplaypic() };
            collaboratorInfo.put(caco.getUsername(), temp);
            // </editor-fold>
        }

        // Broadcast the operation just applied to all other clients
        for(String editorID : currentEditors.keySet()) {
            if(!editorID.equals(sender))
                currentEditors.get(editorID).send(op, sender);
        }
    }

    @Override
    public String toString() {
        String temp = "{";
        temp = temp + "\"diagramid\" : \"" + diagramID + "\", \"title\" : \""
                + diagramTitle + "\", \"creator\" : \"" + StringEscapeUtils.escapeJava(creator) +
                "\", \"datecreated\" : \"" + dateCreated + "\", \"collaborators\" : [";

        ListIterator itr;
        itr = collaboratorList.listIterator();
        while(itr.hasNext()) {
            if(itr.hasPrevious()) temp += ", ";

            String currCol = (String) itr.next();
            String[] currColInfo = collaboratorInfo.get(currCol);
            temp += "{\"username\" : \"" +  StringEscapeUtils.escapeJava(currCol) + "\", \"firstname\" : \""
                    + StringEscapeUtils.escapeJava(currColInfo[0]) + "\", \"lastname\" : \"" + StringEscapeUtils.escapeJava(currColInfo[1])
                    + "\", \"email\" : \"" + StringEscapeUtils.escapeJava(currColInfo[2]) + "\", \"displaypic\" : \""
                    + StringEscapeUtils.escapeJava(currColInfo[3]) + "\"}";
        }

        temp += "], \"currentusers\" : [";
        boolean first = true;
        for(String currentuser : currentUsers) {
            if(!first) temp = temp + ", ";
            temp = temp + "\"" + StringEscapeUtils.escapeJava(currentuser) + "\"";
            first = false;
        }

        temp += "], \"objects\" : [";
        itr = root.getChildren().listIterator();
        while(itr.hasNext()) {
            if(itr.hasPrevious()) temp += ", ";
            temp += CordieObjectConverter.convert((Element) itr.next());
        }

        temp += "] }";
        return temp;
    }

    private void printToFile(){
        try {
            //output to a file
            FileWriter writer = new FileWriter("cordie_diagram_files/" + diagramID + ".xml");
            outputter.output(dom, writer);
            writer.close();

        } catch(java.io.IOException e) {
            e.printStackTrace();
        }
    }

    public class CordieClient {
        private String username;
        private int myMsgs;
        private int otherMsgs;
        private Date lastUpdate;
        private ArrayList<CordieMessage> outgoing;
        private ArrayList<String> updates;
        //private CometContext cometContext;
        private Timer lastEditTimer;
        private final long EDIT_TIMEOUT = 30 * 1000;
        private EditTimeoutReached timeoutTask;

        public CordieClient(String iUsername) {
            this.username = iUsername;
            this.myMsgs = 0;
            this.otherMsgs = 0;
            this.lastUpdate = new Date();
            this.outgoing = new ArrayList<CordieMessage>();
            this.updates = new ArrayList<String>();

            // Set up a TimerTask object to monitor the latest edit received from the server
            this.lastEditTimer = new Timer();
            this.timeoutTask = new EditTimeoutReached();
            this.lastEditTimer.schedule(timeoutTask, EDIT_TIMEOUT);
        }

        public void processMessage(CordieMessage msg) {
            // Discard acknowledged messages
            for(int i = 0; i < outgoing.size(); i++) {
                if(outgoing.get(i).getMyMsgs() < msg.getOtherMsgs()) {
                    outgoing.remove(i);
                    i--;
                }
            }

            for(int i = 0; i < outgoing.size(); i++) {
                CordieOperation[] origOps = {msg.getOp(), outgoing.get(i).getOp()};
                CordieOperation[] transformedOps = Transform.doTransform(origOps);
                msg.setOp(transformedOps[0]);
                outgoing.get(i).setOp(transformedOps[1]);
            }

            apply(msg.getOp(), msg.getSender());

            this.lastUpdate = new Date();

            otherMsgs++;
        }

        public void send(CordieOperation op, String sender) {
            if(op instanceof CordieInsertOperation) {
                outgoing.add(new CordieMessage("server",
                        new CordieInsertOperation((CordieInsertOperation)op),
                        myMsgs, otherMsgs));
            } else if(op instanceof CordieDeleteOperation) {
                outgoing.add(new CordieMessage("server",
                        new CordieDeleteOperation((CordieDeleteOperation)op),
                        myMsgs, otherMsgs));
            } else if(op instanceof CordieEditOperation) {
                outgoing.add(new CordieMessage("server",
                        new CordieEditOperation((CordieEditOperation)op),
                        myMsgs, otherMsgs));
            } else if(op instanceof CordieMoveOperation) {
                outgoing.add(new CordieMessage("server",
                        new CordieMoveOperation((CordieMoveOperation)op),
                        myMsgs, otherMsgs));
            } else if(op instanceof CordieRemoveCollaboratorOperation) {
                outgoing.add(new CordieMessage("server",
                        new CordieRemoveCollaboratorOperation((CordieRemoveCollaboratorOperation)op),
                        myMsgs, otherMsgs));
            } else {
                outgoing.add(new CordieMessage("server",
                        new CordieNoneOperation(), myMsgs, otherMsgs));
            }

            updates.add("{ \"op\" : " + op.toString() + ", \"otherMsgs\" : "
                    + otherMsgs + ", \"from\" : \"" + 
                    //(sender != null ? StringEscapeUtils.escapeJava(sender) : "")
                    (sender != null ? StringEscapeUtils.escapeJava(currentEditors.get(sender).getUsername()) : "")
                    + "\" }");
            myMsgs++;

            timeoutTask.cancel();
            this.timeoutTask = new EditTimeoutReached();
            this.lastEditTimer.schedule(timeoutTask, EDIT_TIMEOUT);
        }

        public boolean hasUpdates() {
            return !updates.isEmpty();
        }

        public String getUpdates() {
            String temp = "[";

            boolean first = true;
            for(String update : updates) {
                if(!first)
                    temp += ", ";
                else
                    first = false;
                
                temp += update;
            }

            temp += "]";

            updates.clear();

            return temp;
        }

        public Date getLastUpdate() {
            return lastUpdate;
        }

        public String getUsername() {
            return username;
        }

        public String toString() {
            return "username: " + username + " outgoing: " + outgoing +
                    " updates: " + updates;
        }

        // this is only run when no messages are sent by the server
        // for EDIT_TIMEOUT milliseconds
        private class EditTimeoutReached extends TimerTask {
            @Override
            public void run() {
                if(hasUpdates()) {
                    timeoutTask = new EditTimeoutReached();
                    lastEditTimer.schedule(timeoutTask, EDIT_TIMEOUT);
                } else {
                    send(new CordieNoneOperation(), null);
                }
            }
        }
    }

    // Thread that processes the messages in the message queue
    public class CordieMessageDirector implements Runnable {
        public CordieMessageDirector() {
        }

        @Override
        public void run() {
            while(true) {
                try {
                    CordieMessage msg = messageQueue.take();
                    if(msg.getSender() != null) {
                        currentEditors.get(msg.getSender()).processMessage(msg);
                    } else {
                        apply(msg.getOp(), msg.getSender());
                    }

                    if(messageQueueEmpty() && (msg.getOp() instanceof CordieNoneOperation)) {
                        printToFile();
                    }
                } catch(Exception exception) {
                    exception.printStackTrace();
                }
            }
        }
    }

    // Periodically checks which editors are no longer active
    private class MonitorEditors extends TimerTask {
        public void run() {
            long timeNow = (new Date()).getTime();
            /*synchronized(currentEditors) {
                for(String editorID : currentEditors.keySet()) {
                    long idleDuration = timeNow - currentEditors.get(editorID).getLastUpdate().getTime();

                    System.out.println(currentEditors.get(editorID).getUsername() + " idle for " + idleDuration);

                    if(idleDuration > MAX_IDLE_ALLOWED) {
                        CordieOperation co = new CordieRemoveUserOperation(currentEditors.get(editorID).getUsername());
                        queueMessage(new CordieMessage(null, co, 0, 0));
                    }
                }
            }*/
            synchronized(currentEditors) {
                HashMap<String, Boolean> removeList = new HashMap<String, Boolean>();
                for(String collaborator : currentUsers) {
                    removeList.put(collaborator, true);
                }
                
                for(String editorID : currentEditors.keySet()) {
                    long idleDuration = timeNow - currentEditors.get(editorID).getLastUpdate().getTime();

                    if(idleDuration <= MAX_IDLE_ALLOWED) {
                        removeList.put(currentEditors.get(editorID).getUsername(), false);
                        //CordieOperation co = new CordieRemoveUserOperation(currentEditors.get(editorID).getUsername());
                        //queueMessage(new CordieMessage(null, co, 0, 0));
                    }
                }
                
                for(String collaborator : currentUsers) {
                    if(removeList.get(collaborator)) {
                        CordieOperation co = new CordieRemoveUserOperation(collaborator);
                        queueMessage(new CordieMessage(null, co, 0, 0));
                        System.out.println("Removing " + collaborator);
                    }
                }
            }
        }
    }

    public void cancelTimer() {
        timer.cancel();
    }
}
