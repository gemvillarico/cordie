package cordie;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.inject.Inject;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import cordie.model.User;
import cordie.service.DiagramService;
import cordie.service.UserService;

public class CordieEditor extends HttpServlet {

	private static final long serialVersionUID = 7884530719982139739L;

	private Map<String, DiagramManager> diagrams;

	@Inject
	private DiagramService diagramService;
	
	@Inject UserService userService;

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

			Diagram currentDiagram = diagramService.getDiagramById(Long.parseLong(id));//diagrams.get(id).getDiagram();
			if (!currentDiagram.getCreator().getUsername().equals(username)) {
				writer.println(
						"{\"error\" : \"You are not allowed to add collaborators.\", \"errorType\" : 2}");
				return;
			} else {
				User newCollaboratorUser = newCollaborator != null ? userService.getUserByUsername(newCollaborator) : null;
				
				if (newCollaboratorUser == null) {
					writer.println("{\"error\" : \"User with the username " + newCollaborator
							+ " does not exist.\", \"errorType\" : 2}");
					writer.close();
					return;
				}
				
				if (currentDiagram.getCollaborators().contains(newCollaboratorUser)) {
					writer.println("{\"error\" : \"" + newCollaborator
							+ " is already a collaborator.\", \"errorType\" : 2}");
					writer.close();
					return;
				}
				
				currentDiagram.getCollaborators().add(newCollaboratorUser);
				diagramService.updateDiagram(currentDiagram);
			
				// Send out an AddCollaborator operation to the diagram if it's currently live
				if (diagrams.containsKey(id)) {
					CordieOperation co = new CordieAddCollaboratorOperation(newCollaborator, newCollaboratorUser.getFirstname(), newCollaboratorUser.getLastname(),
							newCollaboratorUser.getEmail());
					diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
				}
				writer.println(
						"{\"response\" : \" " + newCollaborator + " is being added as collaborator.\"}");
				writer.close();
				return;
			}
		}

		if (action.equals("removecollaborator")) {
			String toRemove = request.getParameter("collaborator");
			
			Diagram currentDiagram = diagramService.getDiagramById(Long.parseLong(id));//diagrams.get(id).getDiagram();
			if (!currentDiagram.getCreator().getUsername().equals(username)) {
				writer.println("{\"error\" : \"You are not allowed to remove collaborators.\", \"errorType\" : 2}");
				return;
			} else {
				User toRemoveUser = toRemove != null ? userService.getUserByUsername(toRemove) : null;
				
				if (currentDiagram.getCreator().equals(toRemoveUser)) {
					writer.println("{\"error\" : \"The creator of this diagram "
							+ "cannot be removed from the list of collaborators.\", \"errorType\" : 2}");
					writer.close();
					return;
				}
				
				if (!currentDiagram.getCollaborators().contains(toRemoveUser)) {
					writer.println("{\"error\" : \"" + toRemove
							+ " is not a collaborator of this diagram.\", \"errorType\" : 2}");
					writer.close();
					return;
				}
				
				currentDiagram.getCollaborators().remove(toRemoveUser);
				toRemoveUser.getDiagrams().remove(currentDiagram);
				
				diagramService.updateDiagram(currentDiagram);
				
				// Send out a RemoveCollaborator operation to the diagram if it's currently live
				if (diagrams.containsKey(id)) {
					CordieOperation co = new CordieRemoveCollaboratorOperation(toRemove);
					diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
				}
				
				writer.println("{\"response\" : \"" + toRemove + "is being removed as collaborator.\"}");
				writer.close();
				return;
			}
		}

		if (!diagrams.containsKey(id)) {
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

		if (action.equals("askUpdate")) {
			if (diagrams.get(id).messageQueueEmpty() && diagrams.get(id).getClient(editorID).hasUpdates()) {
				writer.println(diagrams.get(id).getClient(editorID).getUpdates());
			} else {
			}
		} 
	}
}
