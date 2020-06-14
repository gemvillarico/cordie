package cordie;

import cordie.diagram.*;
import cordie.diagram.operation.*;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;
import java.util.Map;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.xml.bind.DatatypeConverter;


public class CordieEditor extends HttpServlet {
    private Map<String, CordieDiagram> diagrams;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        //contextPath = config.getServletContext().getContextPath();

        CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
        diagrams = cdm.getMap();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.sendRedirect("index.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        String action = request.getParameter("action");
        String id = request.getParameter("id");
        String username = (String) request.getSession().getAttribute("USERNAME");
        String editorID = request.getParameter("editorID");
        
        PrintWriter writer = response.getWriter();

        if(action.equals("newUser")) { //<editor-fold>
            synchronized(diagrams) { // avoid errors when two or more users open a diagram all at the same time
                if(!diagrams.containsKey(id)) {
                    Connection connection = null;
                    ResultSet rs;

                    try {
                        Class.forName("com.mysql.jdbc.Driver");
                        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                        String sql = "SELECT * FROM collaborator WHERE c_diagram_id = ? AND c_username = ?";
                        PreparedStatement stmt = connection.prepareStatement(sql);
                        stmt.setInt(1, Integer.parseInt(id));
                        stmt.setString(2, username);
                        rs = stmt.executeQuery();

                        if(!rs.next()) {
                            writer.println("{\"error\" : \"This diagram does not exist, no longer available, or you do not have permission to edit.\", \"errorType\" : 1}");
                            writer.close();
                            return;
                        }
                    } catch (Exception e) {
                        System.err.println("Exception: " + e.getMessage());
                        writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                        writer.close();
                        return;
                    }

                    diagrams.put(id, new CordieDiagram(id));
                } else if(!diagrams.get(id).allowsEditFrom(username)) {
                    writer.println("{\"error\" : \"You do not have permission to edit this diagram.\", \"errorType\" : 1}");
                    writer.close();
                    return;
                }

                //diagrams.get(id).addEditor(username);
                //writer.println(diagrams.get(id));
                
                writer.println(diagrams.get(id).addEditor(username));
            }
            return;
        } //</editor-fold>
        
        if(action.equals("addcollaborator")) { //<editor-fold>
            String newCollaborator = request.getParameter("collaborator");

            Connection connection = null;
            ResultSet rs;
            
            // If diagram is not open
            if(!diagrams.containsKey(id)) { // <editor-fold>
                // Check if user is the creator
                try {
                    Class.forName("com.mysql.jdbc.Driver");
                    connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                    String sql = "SELECT COUNT(*) FROM collaborator WHERE c_diagram_id = ? AND c_username = ? AND is_creator = ?";
                    PreparedStatement stmt = connection.prepareStatement(sql);
                    stmt = connection.prepareStatement(sql);
                    stmt.setInt(1, Integer.parseInt(id));
                    stmt.setString(2, username);
                    stmt.setString(3, "YES");
                    rs = stmt.executeQuery();
                    rs.next();
                    if(rs.getInt(1) != 1) {
                        writer.println("{\"error\" : \"You are not allowed to add collaborators.\", \"errorType\" : 2}");
                        return;
                    } else { // <editor-fold>
                        try {
                            Class.forName("com.mysql.jdbc.Driver");
                            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                            String ncFirstname = "";
                            String ncLastname = "";
                            String ncEmail = "";
                            String ncDisplaypic = "";

                            // Get user info
                            sql = "SELECT firstname, lastname, email, displaypic "
                                    + "FROM user WHERE username = ?";
                            stmt = connection.prepareStatement(sql);
                            stmt.setString(1, newCollaborator);
                            rs = stmt.executeQuery();
                            if(rs.next()) {
                                ncFirstname = rs.getString("firstname");
                                ncLastname = rs.getString("lastname");
                                ncEmail = rs.getString("email");
                                ncDisplaypic = rs.getString("displaypic");
                            } else {
                                writer.println("{\"error\" : \"User with the username "
                                        + newCollaborator + " does not exist.\", \"errorType\" : 2}");
                                writer.close();
                                return;
                            }

                            // Check if the user is already a collaborator
                            sql = "SELECT COUNT(*) FROM collaborator WHERE c_diagram_id = ? AND c_username = ?";
                            stmt = connection.prepareStatement(sql);
                            stmt.setInt(1, Integer.parseInt(id));
                            stmt.setString(2, newCollaborator);
                            rs = stmt.executeQuery();
                            rs.next();
                            if(rs.getInt(1) == 1) {
                                writer.println("{\"error\" : \"" + newCollaborator +
                                        " is already a collaborator.\", \"errorType\" : 2}");
                                writer.close();
                                return;
                            }

                            // Update database
                            sql = "INSERT INTO Cordie.collaborator (c_diagram_id, c_username, is_creator) "
                                    + "VALUES (?, ?, 'NO')";
                            stmt = connection.prepareStatement(sql);
                            stmt.setInt(1, Integer.parseInt(id));
                            stmt.setString(2, newCollaborator);
                            stmt.executeUpdate();

                            writer.println("{\"response\" : \" " + newCollaborator + " is being added as collaborator.\"}");
                            writer.close();
                            return;
                        } catch (Exception e) {
                            System.err.println("Exception: " + e.getMessage());
                            writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                            writer.close();
                            return;
                        }
                        // </editor-fold>
                    }
                } catch(Exception e) {
                    System.err.println("Exception: " + e.getMessage());
                    writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                    writer.close();
                    return;
                }
                // </editor-fold>
            }
            
            // Only creator of the diagram can add collaborators
            if(!diagrams.get(id).getCreator().equals(username)) {
                writer.println("{\"error\" : \"You are not allowed to add collaborators.\", \"errorType\" : 2}");
                return;
            }
            
            try { // <editor-fold>
                Class.forName("com.mysql.jdbc.Driver");
                connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                String ncFirstname = "";
                String ncLastname = "";
                String ncEmail = "";
                String ncDisplaypic = "";

                // Get user info
                String sql = "SELECT firstname, lastname, email, displaypic "
                        + "FROM user WHERE username = ?";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setString(1, newCollaborator);
                rs = stmt.executeQuery();
                if(rs.next()) {
                    ncFirstname = rs.getString("firstname");
                    ncLastname = rs.getString("lastname");
                    ncEmail = rs.getString("email");
                    ncDisplaypic = rs.getString("displaypic");
                } else {
                    writer.println("{\"error\" : \"User with the username "
                            + newCollaborator + " does not exist.\", \"errorType\" : 2}");
                    writer.close();
                    return;
                }

                // Check if the user is already a collaborator
                sql = "SELECT COUNT(*) FROM collaborator WHERE c_diagram_id = ? AND c_username = ?";
                stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, newCollaborator);
                rs = stmt.executeQuery();
                rs.next();
                if(rs.getInt(1) == 1) {
                    writer.println("{\"error\" : \"" + newCollaborator +
                            " is already a collaborator.\", \"errorType\" : 2}");
                    writer.close();
                    return;
                }

                // Update database
                sql = "INSERT INTO Cordie.collaborator (c_diagram_id, c_username, is_creator) "
                        + "VALUES (?, ?, 'NO')";
                stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, newCollaborator);
                stmt.executeUpdate();

                // Send out an AddCollaborator operation to the diagram
                CordieOperation co = new CordieAddCollaboratorOperation(newCollaborator, 
                        ncFirstname, ncLastname, ncEmail, ncDisplaypic);
                diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));

                writer.println("{\"response\" : \" " + newCollaborator + " is being added as collaborator.\"}");
                writer.close();
                return;
                // </editor-fold>
            } catch (Exception e) {
                System.err.println("Exception: " + e.getMessage());
                writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                writer.close();
                return;
            }
        } //</editor-fold>

        if(action.equals("removecollaborator")) { // <editor-fold>
            String toRemove = request.getParameter("collaborator");

            Connection connection = null;
            ResultSet rs;
            
            // If diagram is not open
            if(!diagrams.containsKey(id)) {
                // Check if user is the creator
                try {
                    Class.forName("com.mysql.jdbc.Driver");
                    connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                    String sql = "SELECT COUNT(*) FROM collaborator WHERE c_diagram_id = ? AND c_username = ? AND is_creator = ?";
                    PreparedStatement stmt = connection.prepareStatement(sql);
                    stmt = connection.prepareStatement(sql);
                    stmt.setInt(1, Integer.parseInt(id));
                    stmt.setString(2, username);
                    stmt.setString(3, "YES");
                    rs = stmt.executeQuery();
                    rs.next();
                    if(rs.getInt(1) != 1) {
                        writer.println("{\"error\" : \"You are not allowed to remove collaborators.\", \"errorType\" : 2}");
                        return;
                    } else { // <editor-fold>
                        try { // <editor-fold>
                            Class.forName("com.mysql.jdbc.Driver");
                            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                            // Check if the user is a collaborator
                            sql = "SELECT * FROM collaborator WHERE c_diagram_id = ? AND c_username = ?";
                            stmt = connection.prepareStatement(sql);
                            stmt.setInt(1, Integer.parseInt(id));
                            stmt.setString(2, toRemove);
                            rs = stmt.executeQuery();

                            if(rs.next()) {
                                if(rs.getString("is_creator").equals("YES")) {
                                    writer.println("{\"error\" : \"The creator of this diagram "
                                            + "cannot be removed from the list of collaborators.\", \"errorType\" : 2}");
                                    writer.close();
                                    return;
                                }
                            } else {
                                writer.println("{\"error\" : \"" + toRemove +
                                        " is not a collaborator of this diagram.\", \"errorType\" : 2}");
                                writer.close();
                                return;
                            }

                            // Update database
                            sql = "DELETE FROM collaborator WHERE c_diagram_id = ? "
                                    + "AND c_username = ? AND is_creator = 'NO'";
                            stmt = connection.prepareStatement(sql);
                            stmt.setInt(1, Integer.parseInt(id));
                            stmt.setString(2, toRemove);
                            stmt.executeUpdate();

                            writer.println("{\"response\" : \"" + toRemove + "is being removed as collaborator.\"}");
                            writer.close();
                            return;
                            // </editor-fold>
                        } catch (Exception e) {
                            System.err.println("Exception: " + e.getMessage());
                            writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                            writer.close();
                            return;
                        }
                        // </editor-fold>
                    }
                } catch(Exception e) {
                    System.err.println("Exception: " + e.getMessage());
                    writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                    writer.close();
                    return;
                }
                // </editor-fold>
            }
            
            // Only creator of the diagram can remove collaborators
            if(!diagrams.get(id).getCreator().equals(username)) {
                writer.println("{\"error\" : \"You are not allowed to remove other collaborators.\", \"errorType\" : 2}");
                return;
            }

            try { // <editor-fold>
                Class.forName("com.mysql.jdbc.Driver");
                connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

                // Check if the user is a collaborator
                String sql = "SELECT * FROM collaborator WHERE c_diagram_id = ? AND c_username = ?";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, toRemove);
                rs = stmt.executeQuery();

                if(rs.next()) {
                    if(rs.getString("is_creator").equals("YES")) {
                        writer.println("{\"error\" : \"The creator of this diagram "
                                + "cannot be removed from the list of collaborators.\", \"errorType\" : 2}");
                        writer.close();
                        return;
                    }
                } else {
                    writer.println("{\"error\" : \"" + toRemove +
                            " is not a collaborator of this diagram.\", \"errorType\" : 2}");
                    writer.close();
                    return;
                }
                
                // Update database
                sql = "DELETE FROM collaborator WHERE c_diagram_id = ? "
                        + "AND c_username = ? AND is_creator = 'NO'";
                stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, toRemove);
                stmt.executeUpdate();
                
                // Send out a RemoveCollaborator operation to the diagram
                CordieOperation co = new CordieRemoveCollaboratorOperation(toRemove);
                diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));

                writer.println("{\"response\" : \"" + toRemove + "is being removed as collaborator.\"}");
                writer.close();
                return;
                // </editor-fold>
            } catch (Exception e) {
                System.err.println("Exception: " + e.getMessage());
                writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
                writer.close();
                return;
            }
        } //</editor-fold>

        
        if(!diagrams.containsKey(id)) {
            //writer.println("{\"error\" : \"Sending message failed. Please reload the page.\", \"errorType\" : 1}");
            writer.println("{\"error\" : \"This diagram no longer exists.\", \"errorType\" : 1}");
            return;
        }

        if(!diagrams.get(id).hasCurrentEditor(editorID)) {
            writer.println("{\"error\" : \"You no longer have permission to edit this diagram.\", \"errorType\" : 1}");
            return;
        }

        if(action.equals("send")) { //<editor-fold>
            int myMsgs = Integer.parseInt(request.getParameter("myMsgs"));
            int otherMsgs = Integer.parseInt(request.getParameter("otherMsgs"));

            CordieOperation co;
            String optype = request.getParameter("optype");

            if(optype.equals("insert")) {
                co = new CordieInsertOperation(request.getParameterMap());
            } else if(optype.equals("delete")) {
                co = new CordieDeleteOperation(
                        Integer.parseInt(request.getParameter("position")));
            } else if(optype.equals("edit")) {
                if(request.getParameter("value") != null) {
                    co = new CordieEditOperation(
                            Integer.parseInt(request.getParameter("position")),
                            request.getParameter("attribute"),
                            request.getParameter("value"));
                } else {
                    co = new CordieEditOperation(request.getParameterMap());
                }
            } else if(optype.equals("move")) {
                co = new CordieMoveOperation(
                        Integer.parseInt(request.getParameter("position")),
                        Integer.parseInt(request.getParameter("destination")));
            } else {
                co = new CordieNoneOperation();
            }
            
            diagrams.get(id).queueMessage(new CordieMessage(editorID, co, myMsgs, otherMsgs));

            return;
        } //</editor-fold>

        if(action.equals("createImage")) {//<editor-fold>
            String value = request.getParameter("data");
            
            byte[] btDataFile = DatatypeConverter.parseBase64Binary(value);  
            File of = new File("files/" + URLEncoder.encode(username + "_" + editorID + "_" + id + ".png"));
            FileOutputStream osf = new FileOutputStream(of);  
            osf.write(btDataFile);  
            osf.flush();
            if (osf != null) {
                try {
                    osf.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return;
        } //</editor-fold>

        if(action.equals("askUpdate")) { //<editor-fold>
            if(diagrams.get(id).messageQueueEmpty() &&
               diagrams.get(id).getClient(editorID).hasUpdates()) {
                writer.println(diagrams.get(id).getClient(editorID).getUpdates());
            } else {
            }
        } //</editor-fold>
    }
}
