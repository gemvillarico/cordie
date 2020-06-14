package cordie;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import cordie.diagram.*;
import cordie.diagram.operation.*;
import java.io.File;
import java.io.FileWriter;
import java.sql.PreparedStatement;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.XMLOutputter;
import org.jdom.output.Format;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringEscapeUtils;

public class DiagramList extends HttpServlet {
   
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection connection = null;
        ResultSet rs;
        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

            String username = (String) request.getSession().getAttribute("USERNAME");

            String action = request.getParameter("action");
            if(action == null) {
                // do nothing
            } else if(action.equals("add")) {
                // <editor-fold>
                String sql = "INSERT INTO Cordie.diagram (creator, title, "
                        + "date_last_edited, date_created, description) "
                        + "VALUES (?, ?, DEFAULT, CURRENT_TIMESTAMP, ?)";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setString(1, username);
                stmt.setString(2, request.getParameter("title"));
                stmt.setString(3, request.getParameter("description"));
                stmt.executeUpdate();

                // get id of newly created diagram
                sql = "SELECT diagram_id FROM diagram WHERE creator = ? AND title = ? "
                        + "ORDER BY date_created DESC";
                stmt = connection.prepareStatement(sql);
                stmt.setString(1, username);
                stmt.setString(2, request.getParameter("title"));
                rs = stmt.executeQuery();

                String id = "";
                if(rs.next()) {
                    id = rs.getString("diagram_id");
                }

                // create an XML file for the newly created diagram
                Element root = new Element("diagram");
                Document dom = new Document(root);
                XMLOutputter outputter = new XMLOutputter(Format.getPrettyFormat());
                FileWriter writer = new FileWriter("cordie_diagram_files/" + id + ".xml");
                outputter.output(dom, writer);
                writer.close();
                // </editor-fold>
            } else if(action.equals("delete")) {
                // <editor-fold>
                String id = request.getParameter("id");

                // check if diagram has active users
                CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
                Map<String, CordieDiagram> diagrams = cdm.getMap();
                synchronized(diagrams) {
                    if(diagrams.containsKey(id)) {
                        //diagrams.get(id).cancelTimer();
                        diagrams.remove(id);
                    }
                }

                // delete from database
                String sql = "DELETE FROM diagram WHERE diagram_id = ? AND creator = ?";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, username);
                stmt.executeUpdate();

                // delete XML file
                File xmlFile = new File("cordie_diagram_files/" + id + ".xml");
                xmlFile.delete();
                // </editor-fold>
            } else if(action.equals("leave")) {
                // <editor-fold>
                String id = request.getParameter("id");
                String sql = "DELETE FROM collaborator WHERE c_diagram_id = ? "
                        + "AND c_username = ? AND is_creator = 'NO'";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, username);
                stmt.executeUpdate();

                // create message for users currently editing the diagram
                CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
                Map<String, CordieDiagram> diagrams = cdm.getMap();
                if(diagrams.containsKey(id)) {
                    CordieOperation co = new CordieRemoveCollaboratorOperation(username);
                    diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
                }
                // </editor-fold>
            } else if(action.equals("copy")) {
                // <editor-fold>
                String sql = "INSERT INTO Cordie.diagram (creator, title, "
                        + "date_last_edited, date_created, description) "
                        + "VALUES (?, ?, DEFAULT, CURRENT_TIMESTAMP, ?)";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setString(1, username);
                stmt.setString(2, request.getParameter("title"));
                stmt.setString(3, request.getParameter("description"));
                stmt.executeUpdate();

                // get id of the copy diagram
                sql = "SELECT diagram_id FROM diagram WHERE creator = ? AND "
                        + "title = ? ORDER BY date_created DESC";
                stmt = connection.prepareStatement(sql);
                stmt.setString(1, username);
                stmt.setString(2, request.getParameter("title"));
                rs = stmt.executeQuery();

                String id = "";
                if(rs.next()) {
                    id = rs.getString("diagram_id");
                }

                // copy tne XML file of the original diagram into the XML file of this copy
                File srcFile = new File("cordie_diagram_files/" +
                        request.getParameter("from") + ".xml");
                File destFile = new File("cordie_diagram_files/" + id + ".xml");
                FileUtils.copyFile(srcFile, destFile);

                // </editor-fold>
            }

            String sql = "SELECT diagram.* FROM diagram INNER JOIN collaborator"
                    + " ON diagram.diagram_id = collaborator.c_diagram_id"
                    + " WHERE collaborator.c_username = ?";
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, username);
            rs = stmt.executeQuery();

            out.print("[");
            while(rs.next()) {
                //Connection connection2 = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");
                String sql2 = "SELECT c_username FROM collaborator WHERE c_diagram_id = ?";
                PreparedStatement stmt2 = connection.prepareStatement(sql2);
                stmt2.setInt(1, Integer.parseInt(rs.getString("diagram_id")));
                ResultSet rs2 = stmt2.executeQuery();
                
                String collaborators = "[";
                while(rs2.next()) {
                    collaborators += "\"" + rs2.getString("c_username")+ "\"";
                    if(!rs2.isLast()) collaborators += ", ";
                }
                collaborators += "]";
                
                String id = rs.getString("diagram_id");
                String title = rs.getString("title");
                String description = rs.getString("description");
                String creator = rs.getString("creator");
                String dateCreated = rs.getString("date_created");
                //String dateLastEdited = rs.getString("date_last_edited");
                
                out.print("[\"" + id + "\", \"" + StringEscapeUtils.escapeJava(title)
                        + "\", \"" + StringEscapeUtils.escapeJava(description)
                        + "\", \"" + StringEscapeUtils.escapeJava(creator) + "\", \""
                        + dateCreated + "\", " + collaborators + "]"); 
                        //"\", \"" + dateLastEdited + "\"]");

                if(!rs.isLast()) out.print(", ");
            }
            out.print("]");
        } catch (ClassNotFoundException e) {
            System.err.println("Driver Error");
        } catch (SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        } finally {
            out.close();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.sendRedirect("diagrams.jsp");
    } 

    @Override
    public String getServletInfo() {
        return "Handles request for the list of diagrams "
                + "accessible to a user (in JSON format).";
    }
}
