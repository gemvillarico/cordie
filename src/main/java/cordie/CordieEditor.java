package cordie;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.inject.Inject;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import cordie.diagram.CordieMessage;
import cordie.diagram.CordieMessageDirector;
import cordie.diagram.DiagramManager;
import cordie.diagram.operation.CordieAddCollaboratorOperation;
import cordie.diagram.operation.CordieDeleteOperation;
import cordie.diagram.operation.CordieEditOperation;
import cordie.diagram.operation.CordieInsertOperation;
import cordie.diagram.operation.CordieMoveOperation;
import cordie.diagram.operation.CordieNoneOperation;
import cordie.diagram.operation.CordieOperation;
import cordie.diagram.operation.CordieRemoveCollaboratorOperation;
import cordie.model.Diagram;
import cordie.service.DiagramService;

public class CordieEditor extends HttpServlet {

	private static final long serialVersionUID = 7884530719982139739L;

	private Map<String, DiagramManager> diagrams;

	@Inject
	private DiagramService diagramService;

	@SuppressWarnings("unchecked")
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
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

		if (action.equals("newUser")) {
			// Avoid errors when two or more users open a diagram all at the same time
			synchronized (diagrams) {
				if (!diagrams.containsKey(id)) {

					Diagram diagram = diagramService.getDiagramByIdAndUsername(Long.parseLong(id), username);

					if (diagram == null) {
						writer.println(
								"{\"error\" : \"This diagram does not exist, no longer available, or you do not have permission to edit.\", \"errorType\" : 1}");
						writer.close();
						return;
					}

					DiagramManager cordieDiagram = new DiagramManager(diagram);
					diagrams.put(id, cordieDiagram);

					ExecutorService executor = Executors.newFixedThreadPool(1);
					try {
						executor.execute(new CordieMessageDirector(cordieDiagram));
					} catch (Exception exception) {
						exception.printStackTrace();
					}
					executor.shutdown();
				} else if (!diagrams.get(id).allowsEditFrom(username)) {
					writer.println(
							"{\"error\" : \"You do not have permission to edit this diagram.\", \"errorType\" : 1}");
					writer.close();
					return;
				}

				writer.println(diagrams.get(id).addEditor(username));
			}
			return;
		}

		if (action.equals("addcollaborator")) {
			String newCollaborator = request.getParameter("collaborator");

			Connection connection = null;
			ResultSet rs;

			// If diagram is not open
			if (!diagrams.containsKey(id)) {
				// Check if user is the creator
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie",
							"pSJcwyTNSeLHAAV2");

					String sql = "SELECT COUNT(*) FROM collaborator WHERE diagram_id = ? AND user_id = (select user_id from user where username = ?) AND is_creator = ?";
					PreparedStatement stmt = connection.prepareStatement(sql);
					stmt = connection.prepareStatement(sql);
					stmt.setInt(1, Integer.parseInt(id));
					stmt.setString(2, username);
					stmt.setString(3, "YES");
					rs = stmt.executeQuery();
					rs.next();
					if (rs.getInt(1) != 1) {
						writer.println(
								"{\"error\" : \"You are not allowed to add collaborators.\", \"errorType\" : 2}");
						return;
					} else {
						try {
							Class.forName("com.mysql.cj.jdbc.Driver");
							connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie",
									"pSJcwyTNSeLHAAV2");

							// Get user info
							sql = "SELECT firstname, lastname, email, displaypic " + "FROM user WHERE username = ?";
							stmt = connection.prepareStatement(sql);
							stmt.setString(1, newCollaborator);
							rs = stmt.executeQuery();
							if (rs.next()) {

							} else {
								writer.println("{\"error\" : \"User with the username " + newCollaborator
										+ " does not exist.\", \"errorType\" : 2}");
								writer.close();
								return;
							}

							// Check if the user is already a collaborator
							sql = "SELECT COUNT(*) FROM collaborator WHERE diagram_id = ? AND user_id = (select user_id from user where username = ?)";
							stmt = connection.prepareStatement(sql);
							stmt.setInt(1, Integer.parseInt(id));
							stmt.setString(2, newCollaborator);
							rs = stmt.executeQuery();
							rs.next();
							if (rs.getInt(1) == 1) {
								writer.println("{\"error\" : \"" + newCollaborator
										+ " is already a collaborator.\", \"errorType\" : 2}");
								writer.close();
								return;
							}

							// Update database
							sql = "INSERT INTO Cordie.collaborator (diagram_id, user_id, is_creator) "
									+ "VALUES (?, ?, 'NO')";
							stmt = connection.prepareStatement(sql);
							stmt.setInt(1, Integer.parseInt(id));
							stmt.setString(2, newCollaborator);
							stmt.executeUpdate();

							writer.println(
									"{\"response\" : \" " + newCollaborator + " is being added as collaborator.\"}");
							writer.close();
							return;
						} catch (Exception e) {
							System.err.println("Exception: " + e.getMessage());
							writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
							writer.close();
							return;
						}
						
					}
				} catch (Exception e) {
					System.err.println("Exception: " + e.getMessage());
					writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
					writer.close();
					return;
				}
				
			}

			// Only creator of the diagram can add collaborators
			if (!diagrams.get(id).getCreator().equals(username)) {
				writer.println("{\"error\" : \"You are not allowed to add collaborators.\", \"errorType\" : 2}");
				return;
			}

			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie",
						"pSJcwyTNSeLHAAV2");

				String ncFirstname = "";
				String ncLastname = "";
				String ncEmail = "";
				String ncDisplaypic = "";

				// Get user info
				String sql = "SELECT firstname, lastname, email, displaypic " + "FROM user WHERE username = ?";
				PreparedStatement stmt = connection.prepareStatement(sql);
				stmt.setString(1, newCollaborator);
				rs = stmt.executeQuery();
				if (rs.next()) {
					ncFirstname = rs.getString("firstname");
					ncLastname = rs.getString("lastname");
					ncEmail = rs.getString("email");
					ncDisplaypic = rs.getString("displaypic");
				} else {
					writer.println("{\"error\" : \"User with the username " + newCollaborator
							+ " does not exist.\", \"errorType\" : 2}");
					writer.close();
					return;
				}

				// Check if the user is already a collaborator
				sql = "SELECT COUNT(*) FROM collaborator WHERE diagram_id = ? AND user_id = (select user_id from user where username = ?)";
				stmt = connection.prepareStatement(sql);
				stmt.setInt(1, Integer.parseInt(id));
				stmt.setString(2, newCollaborator);
				rs = stmt.executeQuery();
				rs.next();
				if (rs.getInt(1) == 1) {
					writer.println(
							"{\"error\" : \"" + newCollaborator + " is already a collaborator.\", \"errorType\" : 2}");
					writer.close();
					return;
				}

				// Update database
				sql = "INSERT INTO Cordie.collaborator (diagram_id, username, is_creator) " + "VALUES (?, ?, 'NO')";
				stmt = connection.prepareStatement(sql);
				stmt.setInt(1, Integer.parseInt(id));
				stmt.setString(2, newCollaborator);
				stmt.executeUpdate();

				// Send out an AddCollaborator operation to the diagram
				CordieOperation co = new CordieAddCollaboratorOperation(newCollaborator, ncFirstname, ncLastname,
						ncEmail, ncDisplaypic);
				diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));

				writer.println("{\"response\" : \" " + newCollaborator + " is being added as collaborator.\"}");
				writer.close();
				return;
				
			} catch (Exception e) {
				System.err.println("Exception: " + e.getMessage());
				writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
				writer.close();
				return;
			}
		} 

		if (action.equals("removecollaborator")) {
			String toRemove = request.getParameter("collaborator");

			Connection connection = null;
			ResultSet rs;

			// If diagram is not open
			if (!diagrams.containsKey(id)) {
				// Check if user is the creator
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie",
							"pSJcwyTNSeLHAAV2");

					String sql = "SELECT COUNT(*) FROM collaborator WHERE diagram_id = ? AND user_id = (select user_id from user where username = ?) AND is_creator = ?";
					PreparedStatement stmt = connection.prepareStatement(sql);
					stmt = connection.prepareStatement(sql);
					stmt.setInt(1, Integer.parseInt(id));
					stmt.setString(2, username);
					stmt.setString(3, "YES");
					rs = stmt.executeQuery();
					rs.next();
					if (rs.getInt(1) != 1) {
						writer.println(
								"{\"error\" : \"You are not allowed to remove collaborators.\", \"errorType\" : 2}");
						return;
					} else {
						try {
							Class.forName("com.mysql.cj.jdbc.Driver");
							connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie",
									"pSJcwyTNSeLHAAV2");

							// Check if the user is a collaborator
							sql = "SELECT * FROM collaborator WHERE diagram_id = ? AND user_id = (select user_id from user where username = ?)";
							stmt = connection.prepareStatement(sql);
							stmt.setInt(1, Integer.parseInt(id));
							stmt.setString(2, toRemove);
							rs = stmt.executeQuery();

							if (rs.next()) {
								if (rs.getString("is_creator").equals("YES")) {
									writer.println("{\"error\" : \"The creator of this diagram "
											+ "cannot be removed from the list of collaborators.\", \"errorType\" : 2}");
									writer.close();
									return;
								}
							} else {
								writer.println("{\"error\" : \"" + toRemove
										+ " is not a collaborator of this diagram.\", \"errorType\" : 2}");
								writer.close();
								return;
							}

							// Update database
							sql = "DELETE FROM collaborator WHERE diagram_id = ? "
									+ "AND user_id = (select user_id from user where username = ?) AND is_creator = 'NO'";
							stmt = connection.prepareStatement(sql);
							stmt.setInt(1, Integer.parseInt(id));
							stmt.setString(2, toRemove);
							stmt.executeUpdate();

							writer.println("{\"response\" : \"" + toRemove + "is being removed as collaborator.\"}");
							writer.close();
							return;
							
						} catch (Exception e) {
							System.err.println("Exception: " + e.getMessage());
							writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
							writer.close();
							return;
						}
						
					}
				} catch (Exception e) {
					System.err.println("Exception: " + e.getMessage());
					writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
					writer.close();
					return;
				}
				
			}

			// Only creator of the diagram can remove collaborators
			if (!diagrams.get(id).getCreator().equals(username)) {
				writer.println(
						"{\"error\" : \"You are not allowed to remove other collaborators.\", \"errorType\" : 2}");
				return;
			}

			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie",
						"pSJcwyTNSeLHAAV2");

				// Check if the user is a collaborator
				String sql = "SELECT * FROM collaborator WHERE diagram_id = ? AND user_id = (select user_id from user where username = ?)";
				PreparedStatement stmt = connection.prepareStatement(sql);
				stmt.setInt(1, Integer.parseInt(id));
				stmt.setString(2, toRemove);
				rs = stmt.executeQuery();

				if (rs.next()) {
					if (rs.getString("is_creator").equals("YES")) {
						writer.println("{\"error\" : \"The creator of this diagram "
								+ "cannot be removed from the list of collaborators.\", \"errorType\" : 2}");
						writer.close();
						return;
					}
				} else {
					writer.println("{\"error\" : \"" + toRemove
							+ " is not a collaborator of this diagram.\", \"errorType\" : 2}");
					writer.close();
					return;
				}

				// Update database
				sql = "DELETE FROM collaborator WHERE diagram_id = ? "
						+ "AND user_id = (select user_id from user where username = ?) AND is_creator = 'NO'";
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
				
			} catch (Exception e) {
				System.err.println("Exception: " + e.getMessage());
				writer.println("{\"error\" : \"An error occured.\", \"errorType\" : 1}");
				writer.close();
				return;
			}
		} 

		if (!diagrams.containsKey(id)) {
			// writer.println("{\"error\" : \"Sending message failed. Please reload the
			// page.\", \"errorType\" : 1}");
			writer.println("{\"error\" : \"This diagram no longer exists.\", \"errorType\" : 1}");
			return;
		}

		if (!diagrams.get(id).hasCurrentEditor(editorID)) {
			writer.println("{\"error\" : \"You no longer have permission to edit this diagram.\", \"errorType\" : 1}");
			return;
		}

		if (action.equals("send")) {
			int myMsgs = Integer.parseInt(request.getParameter("myMsgs"));
			int otherMsgs = Integer.parseInt(request.getParameter("otherMsgs"));

			CordieOperation co;
			String optype = request.getParameter("optype");

			if (optype.equals("insert")) {
				co = new CordieInsertOperation(request.getParameterMap());
			} else if (optype.equals("delete")) {
				co = new CordieDeleteOperation(Integer.parseInt(request.getParameter("position")));
			} else if (optype.equals("edit")) {
				if (request.getParameter("value") != null) {
					co = new CordieEditOperation(Integer.parseInt(request.getParameter("position")),
							request.getParameter("attribute"), request.getParameter("value"));
				} else {
					co = new CordieEditOperation(request.getParameterMap());
				}
			} else if (optype.equals("move")) {
				co = new CordieMoveOperation(Integer.parseInt(request.getParameter("position")),
						Integer.parseInt(request.getParameter("destination")));
			} else {
				co = new CordieNoneOperation();
			}

			diagrams.get(id).queueMessage(new CordieMessage(editorID, co, myMsgs, otherMsgs));

			return;
		} 

		if (action.equals("createImage")) {
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
		} 

		if (action.equals("askUpdate")) {
			if (diagrams.get(id).messageQueueEmpty() && diagrams.get(id).getClient(editorID).hasUpdates()) {
				writer.println(diagrams.get(id).getClient(editorID).getUpdates());
			} else {
			}
		} 
	}

//	public DiagramService getDiagramService() {
//		return diagramService;
//	}
//
//	public void setDiagramService(DiagramService diagramService) {
//		this.diagramService = diagramService;
//	}

}
