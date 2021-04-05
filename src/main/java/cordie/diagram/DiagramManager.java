package cordie.diagram;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ArrayBlockingQueue;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.apache.commons.text.StringEscapeUtils;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

import cordie.diagram.operation.CordieAddCollaboratorOperation;
import cordie.diagram.operation.CordieAddUserOperation;
import cordie.diagram.operation.CordieDeleteOperation;
import cordie.diagram.operation.CordieEditOperation;
import cordie.diagram.operation.CordieInsertOperation;
import cordie.diagram.operation.CordieMoveOperation;
import cordie.diagram.operation.CordieNoneOperation;
import cordie.diagram.operation.CordieOperation;
import cordie.diagram.operation.CordieRemoveCollaboratorOperation;
import cordie.diagram.operation.CordieRemoveUserOperation;
import cordie.model.Diagram;
import cordie.model.User;
import cordie.service.UserService;

/**
 * Manages a "live" diagram; i.e., a diagram currently being edited by a user
 * 
 * @author gemvillarico
 *
 */
@Deprecated
public class DiagramManager {
	private String diagramTitle;
	private String creator;
	private Date dateCreated;	
	private Set<String> collaboratorInfo;
	private Map<String, CordieClient> currentEditors;
	private ArrayList<String> currentUsers;
	private int editorsCount;
	private ArrayBlockingQueue<CordieMessage> messageQueue;

	private Document dom;
	private Element root;

	// private final long CHECKING_PERIOD = 5 * 60 * 1000; // check user activity
	// every 5 mins
	// private final long MAX_IDLE_ALLOWED = 10 * 60 * 1000; // allow users to be
	// idle for less than 10 minutes
	private final long CHECKING_PERIOD = 10 * 1000; // check user activity every 10 sec
	private final long MAX_IDLE_ALLOWED = 25 * 1000; // allow users to be idle for less than 1 minute
	private Timer timer;

	private Diagram diagram;

	public DiagramManager(Diagram diagram) {// String iDiagramID) {
		this.diagram = diagram;

		// Parse XML file
		SAXBuilder builder = new SAXBuilder();
		try {
			byte[] diagramContent = diagram.getDiagramContent();
			if (diagramContent == null) {
				Element root = new Element("diagram");
				dom = new Document(root);
			} else {
				dom = builder.build(new ByteArrayInputStream(diagramContent));
			}

		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		this.root = dom.getRootElement();

		this.collaboratorInfo = new HashSet<>();
		for (User user : diagram.getCollaborators()) {
			this.collaboratorInfo.add(user.getUsername());
		}
		
		this.diagramTitle = diagram.getTitle();
		this.creator = diagram.getCreator().getUsername();
		this.dateCreated = diagram.getDateCreated();

		this.currentEditors = new HashMap<String, CordieClient>();
		this.currentUsers = new ArrayList<String>();
		this.editorsCount = 0;
		this.messageQueue = new ArrayBlockingQueue<CordieMessage>(200);
		
		// Set up a TimerTask object to monitor user activity
		timer = new Timer();
		timer.scheduleAtFixedRate(new MonitorEditors(), 5 * 1000, CHECKING_PERIOD);
	}

	public boolean isInactive() {
		return currentEditors.isEmpty();
	}

	public boolean allowsEditFrom(String username) {
		return collaboratorInfo.contains(username);
	}

	public String getCreator() {
		return creator;
	}

	public String addEditor(String username) {
		String editorID = Integer.toString(editorsCount);
		synchronized (currentEditors) {
			currentEditors.put(editorID, new CordieClient(username));
			editorsCount++;
			if (!currentUsers.contains(username)) {
				currentUsers.add(username);
			}

			CordieOperation co = new CordieAddUserOperation(username);
			this.queueMessage(new CordieMessage(editorID, co, 0, 0));
		}

		return "{\"diagram\" : " + this.toString() + ", \"editorID\" : \"" + editorID + "\"}";
	}

	public void queueMessage(CordieMessage msg) {
		try {
			messageQueue.put(msg);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
	}

	public boolean messageQueueEmpty() {
		return messageQueue.isEmpty();
	}

	public CordieClient getClient(String editorID) {
		return currentEditors.get(editorID);
	}

	public boolean hasCurrentEditor(String editorID) {
		return currentEditors.containsKey(editorID);
	}

	@SuppressWarnings("unchecked")
	public void apply(CordieOperation op, String sender) {
		List<Object> doChildren = root.getChildren();

		// Apply to server copy
		if (op instanceof CordieInsertOperation) { 
			CordieInsertOperation cio = (CordieInsertOperation) op;
			doChildren.add(cio.getPosition(), cio.getObject());
			
		} else if (op instanceof CordieDeleteOperation) { 
			CordieDeleteOperation cdo = (CordieDeleteOperation) op;
			doChildren.remove(cdo.getPosition());
			
		} else if (op instanceof CordieEditOperation) { 
			CordieEditOperation ceo = (CordieEditOperation) op;
			Element target = (Element) doChildren.get(ceo.getPosition());

			if (ceo.getValue() != null) {
				target.setAttribute(ceo.getAttribute(), ceo.getValue());
			} else if (ceo.getAttribute().equals("attribute") || ceo.getAttribute().equals("operation")
					|| ceo.getAttribute().equals("template") || ceo.getAttribute().equals("taggedvalue")
					|| ceo.getAttribute().equals("containedartifact")
					|| ceo.getAttribute().equals("internalactivity")) {
				CordieOperation attrOp = ceo.getAttributeOp();
				List<Object> attrItems = target.getChild(ceo.getAttribute() + "s").getChildren();

				if (attrOp instanceof CordieInsertOperation) {
					CordieInsertOperation attrInsertOp = (CordieInsertOperation) attrOp;
					attrItems.add(attrInsertOp.getPosition(), attrInsertOp.getObject());
				} else if (attrOp instanceof CordieDeleteOperation) {
					attrItems.remove(((CordieDeleteOperation) attrOp).getPosition());
				} else if (attrOp instanceof CordieEditOperation) {
					CordieEditOperation attrEditOp = (CordieEditOperation) attrOp;
					if (attrEditOp.getAttribute().equals("attributeValue")) {
						((Element) attrItems.get(attrEditOp.getPosition())).setText(attrEditOp.getValue());
					} else if (attrEditOp.getAttribute().equals("attributeStatic")) {
						((Element) attrItems.get(attrEditOp.getPosition())).setAttribute("static",
								attrEditOp.getValue());
					} else if (attrEditOp.getAttribute().equals("attributeAbstract")) {
						((Element) attrItems.get(attrEditOp.getPosition())).setAttribute("abstract",
								attrEditOp.getValue());
					}
				} else if (attrOp instanceof CordieMoveOperation) {
					CordieMoveOperation attrMoveOp = (CordieMoveOperation) attrOp;
					Element attrTarget = (Element) attrItems.remove(attrMoveOp.getPosition());
					attrItems.add(attrMoveOp.getDestination(), attrTarget);
				}
			} else if (ceo.getAttribute().equals("point")) {
				CordieOperation attrOp = ceo.getAttributeOp();
				List<Object> points = target.getChildren("point");

				if (attrOp instanceof CordieInsertOperation) {
					CordieInsertOperation attrInsertOp = (CordieInsertOperation) attrOp;
					points.add(attrInsertOp.getPosition(), attrInsertOp.getObject());
				} else if (attrOp instanceof CordieDeleteOperation) {
					points.remove(((CordieDeleteOperation) attrOp).getPosition());
				} else if (attrOp instanceof CordieEditOperation) {
					CordieEditOperation attrEditOp = (CordieEditOperation) attrOp;
					if (attrEditOp.getAttribute().equals("attributeX")) {
						((Element) points.get(attrEditOp.getPosition())).setAttribute("x", attrEditOp.getValue());
					} else if (attrEditOp.getAttribute().equals("attributeY")) {
						((Element) points.get(attrEditOp.getPosition())).setAttribute("y", attrEditOp.getValue());
					}
				}
			}
			
		} else if (op instanceof CordieMoveOperation) { 
			CordieMoveOperation cmo = (CordieMoveOperation) op;
			Element target = (Element) doChildren.remove(cmo.getPosition());
			doChildren.add(cmo.getDestination(), target);
			
		} else if (op instanceof CordieRemoveCollaboratorOperation) { 
			CordieRemoveCollaboratorOperation crco = (CordieRemoveCollaboratorOperation) op;
			String userToRemove = crco.getUsername();

			synchronized (currentEditors) {
				Set<String> editorsToRemove = new HashSet<String>();
				for (String key : currentEditors.keySet()) {
					if (currentEditors.get(key).getUsername().equals(userToRemove)) {
						// currentEditors.remove(key);
						editorsToRemove.add(key);
					}
				}
				for (String key : editorsToRemove) {
					// System.out.println("removing user: " + key + " for " + userToRemove);
					currentEditors.remove(key);
				}

				if (currentUsers.contains(userToRemove)) {
					currentUsers.remove(currentUsers.indexOf(userToRemove));
				}

				// if(!collaboratorList.contains(userToRemove)) return;

				collaboratorInfo.remove(userToRemove);
				// currentEditors.remove(userToRemove);
			}
			
		} else if (op instanceof CordieRemoveUserOperation) { 
			CordieRemoveUserOperation cruo = (CordieRemoveUserOperation) op;
			String userToRemove = cruo.getUsername();

			synchronized (currentEditors) {
				for (String key : currentEditors.keySet()) {
					if (currentEditors.get(key).getUsername().equals(userToRemove)) {
						currentEditors.remove(key);
					}
				}
				if (currentUsers.contains(userToRemove)) {
					currentUsers.remove(currentUsers.indexOf(userToRemove));
				}

				// System.out.println(cruo.getUsername() + " has not sent messages in a long
				// time. "
				// + "He/She will now be removed from current users.");
				// currentEditors.remove(userToRemove);
			}
			
		} else if (op instanceof CordieAddCollaboratorOperation) { 
			CordieAddCollaboratorOperation caco = (CordieAddCollaboratorOperation) op;
			collaboratorInfo.add(caco.getUsername());			
		}

		// Broadcast the operation just applied to all other clients
		for (String editorID : currentEditors.keySet()) {
			if (!editorID.equals(sender))
				currentEditors.get(editorID).send(op, sender);
		}
	}
	
	private UserService getUserService() throws NamingException {
		Context ctx = new InitialContext();
	    return (UserService) ctx.lookup("java:global/cordie/UserService");
	}

	@Override
	public String toString() {
		String temp = "{";
		temp = temp + "\"diagramid\" : \"" + this.diagram.getId() + "\", \"title\" : \"" + diagramTitle
				+ "\", \"creator\" : \"" + StringEscapeUtils.escapeJava(creator) + "\", \"datecreated\" : \""
				+ dateCreated + "\", \"collaborators\" : [";

		try {
			UserService userService = getUserService();
			Iterator<String> itr = collaboratorInfo.iterator();
			while (itr.hasNext()) {
				String currCol = (String) itr.next();
				
				User user = userService.getUserByUsername(currCol);
				temp += "{\"username\" : \"" + StringEscapeUtils.escapeJava(currCol) + "\", \"firstname\" : \""
						+ StringEscapeUtils.escapeJava(user.getFirstname()) + "\", \"lastname\" : \""
						+ StringEscapeUtils.escapeJava(user.getLastname()) + "\", \"email\" : \""
						+ StringEscapeUtils.escapeJava(user.getEmail()) + "\""
						+ "}";
				
				if (itr.hasNext()) {
					temp += ", ";
				}
			}
		} catch (NamingException e) {
			e.printStackTrace();
		}
		

		temp += "], \"currentusers\" : [";
		boolean first = true;
		for (String currentuser : currentUsers) {
			if (!first)
				temp = temp + ", ";
			temp = temp + "\"" + StringEscapeUtils.escapeJava(currentuser) + "\"";
			first = false;
		}

		temp += "], \"objects\" : [";
		
		@SuppressWarnings("unchecked")
		ListIterator<Element> rootChildrentItr = root.getChildren().listIterator();
		while (rootChildrentItr.hasNext()) {
			if (rootChildrentItr.hasPrevious())
				temp += ", ";
			temp += CordieObjectConverter.convert((Element) rootChildrentItr.next());
		}

		temp += "] }";
		return temp;
	}

	public class CordieClient {
		private String username;
		private int myMsgs;
		private int otherMsgs;
		private Date lastUpdate;
		private ArrayList<CordieMessage> outgoing;
		private ArrayList<String> updates;
		// private CometContext cometContext;
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
			for (int i = 0; i < outgoing.size(); i++) {
				if (outgoing.get(i).getMyMsgs() < msg.getOtherMsgs()) {
					outgoing.remove(i);
					i--;
				}
			}

			for (int i = 0; i < outgoing.size(); i++) {
				CordieOperation[] origOps = { msg.getOp(), outgoing.get(i).getOp() };
				CordieOperation[] transformedOps = Transform.doTransform(origOps);
				msg.setOp(transformedOps[0]);
				outgoing.get(i).setOp(transformedOps[1]);
			}

			apply(msg.getOp(), msg.getSender());

			this.lastUpdate = new Date();

			otherMsgs++;
		}

		public void send(CordieOperation op, String sender) {
			if (op instanceof CordieInsertOperation) {
				outgoing.add(new CordieMessage("server", new CordieInsertOperation((CordieInsertOperation) op), myMsgs,
						otherMsgs));
			} else if (op instanceof CordieDeleteOperation) {
				outgoing.add(new CordieMessage("server", new CordieDeleteOperation((CordieDeleteOperation) op), myMsgs,
						otherMsgs));
			} else if (op instanceof CordieEditOperation) {
				outgoing.add(new CordieMessage("server", new CordieEditOperation((CordieEditOperation) op), myMsgs,
						otherMsgs));
			} else if (op instanceof CordieMoveOperation) {
				outgoing.add(new CordieMessage("server", new CordieMoveOperation((CordieMoveOperation) op), myMsgs,
						otherMsgs));
			} else if (op instanceof CordieRemoveCollaboratorOperation) {
				outgoing.add(new CordieMessage("server",
						new CordieRemoveCollaboratorOperation((CordieRemoveCollaboratorOperation) op), myMsgs,
						otherMsgs));
			} else {
				outgoing.add(new CordieMessage("server", new CordieNoneOperation(), myMsgs, otherMsgs));
			}

			updates.add("{ \"op\" : " + op.toString() + ", \"otherMsgs\" : " + otherMsgs + ", \"from\" : \"" +
			// (sender != null ? StringEscapeUtils.escapeJava(sender) : "")
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
			for (String update : updates) {
				if (!first)
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
			return "username: " + username + " outgoing: " + outgoing + " updates: " + updates;
		}

		// this is only run when no messages are sent by the server
		// for EDIT_TIMEOUT milliseconds
		private class EditTimeoutReached extends TimerTask {
			@Override
			public void run() {
				if (hasUpdates()) {
					timeoutTask = new EditTimeoutReached();
					lastEditTimer.schedule(timeoutTask, EDIT_TIMEOUT);
				} else {
					send(new CordieNoneOperation(), null);
				}
			}
		}
	}

	/**
	 *  Periodically checks which editors are no longer active
	 */
	private class MonitorEditors extends TimerTask {
		public void run() {
			long timeNow = (new Date()).getTime();
			
			synchronized (currentEditors) {
				HashMap<String, Boolean> removeList = new HashMap<String, Boolean>();
				for (String collaborator : currentUsers) {
					removeList.put(collaborator, true);
				}

				for (String editorID : currentEditors.keySet()) {
					long idleDuration = timeNow - currentEditors.get(editorID).getLastUpdate().getTime();

					if (idleDuration <= MAX_IDLE_ALLOWED) {
						removeList.put(currentEditors.get(editorID).getUsername(), false);
					}
				}

				for (String collaborator : currentUsers) {
					if (removeList.get(collaborator)) {
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

	public Map<String, CordieClient> getCurrentEditors() {
		return currentEditors;
	}

	public ArrayBlockingQueue<CordieMessage> getMessageQueue() {
		return messageQueue;
	}

	public Document getDom() {
		return dom;
	}

	public Diagram getDiagram() {
		return diagram;
	}
}
