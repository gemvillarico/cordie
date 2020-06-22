package cordie;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import cordie.diagram.CordieMessage;
import cordie.diagram.DiagramManager;
import cordie.diagram.operation.CordieOperation;
import cordie.diagram.operation.CordieRemoveCollaboratorOperation;
import cordie.model.Diagram;
import cordie.service.DiagramService;
import cordie.service.UserService;

public class DiagramList extends HttpServlet {

	private static final long serialVersionUID = -2297856658189536959L;
	
	@Inject
	private DiagramService diagramService;
	
	@Inject 
	private UserService userService;
	
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Connection connection = null;
        ResultSet rs;
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

            String username = (String) request.getSession().getAttribute("USERNAME");

            String action = request.getParameter("action");
            if(action == null) {
                // do nothing
            } else if(action.equals("add")) {
                
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
                
//                FileWriter writer = new FileWriter("cordie_diagram_files/" + id + ".xml");
//                outputter.output(dom, writer);
//                writer.close();
                
                
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
    			outputter.output(dom, bos);
    			Diagram diagram = diagramService.getDiagramById(Long.parseLong(id));
    			diagram.setDiagramContent(bos.toByteArray());
//    			TODO diagramService.updateDiagram(diagram);
            } else if(action.equals("delete")) {
                
                String id = request.getParameter("id");

                // check if diagram has active users
                CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
                @SuppressWarnings("unchecked")
				Map<String, DiagramManager> diagrams = cdm.getMap();
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
//                File xmlFile = new File("cordie_diagram_files/" + id + ".xml");
//                xmlFile.delete();
            } else if(action.equals("leave")) {
                
                String id = request.getParameter("id");
                String sql = "DELETE FROM collaborator WHERE diagram_id = ? "
                        + "AND user_id = (select user_id from user where username = ?) AND is_creator = 'NO'";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setInt(1, Integer.parseInt(id));
                stmt.setString(2, username);
                stmt.executeUpdate();

                // create message for users currently editing the diagram
                CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
                @SuppressWarnings("unchecked")
				Map<String, DiagramManager> diagrams = cdm.getMap();
                if(diagrams.containsKey(id)) {
                    CordieOperation co = new CordieRemoveCollaboratorOperation(username);
                    diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
                }
                
            } else if(action.equals("copy")) {
            	Diagram origDiagram = diagramService.getDiagramById(Long.parseLong(request.getParameter("from")));

            	Diagram copyDiagram = new Diagram();
            	copyDiagram.setCreator(userService.getUserByUsername(username));
            	copyDiagram.setTitle(request.getParameter("title"));
            	copyDiagram.setDescription(request.getParameter("description"));
            	copyDiagram.setDiagramContent(origDiagram.getDiagramContent());
            	
            	diagramService.insertDiagram(copyDiagram);
            }

            String sql = "SELECT diagram.* FROM diagram INNER JOIN collaborator"
                    + " ON diagram.diagram_id = collaborator.diagram_id"
                    + " WHERE collaborator.user_id = (select user_id from user where username = ?)";
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, username);
            rs = stmt.executeQuery();

            out.print("[");
            while(rs.next()) {
                //Connection connection2 = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");
                String sql2 = "SELECT user_id FROM collaborator WHERE diagram_id = ?";
                PreparedStatement stmt2 = connection.prepareStatement(sql2);
                stmt2.setInt(1, Integer.parseInt(rs.getString("diagram_id")));
                ResultSet rs2 = stmt2.executeQuery();
                
                String collaborators = "[";
                while(rs2.next()) {
                    collaborators += "\"" + rs2.getString("user_id")+ "\"";
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
