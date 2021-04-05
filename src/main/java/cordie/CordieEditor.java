package cordie;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.util.Base64;

import javax.inject.Inject;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import cordie.diagram.CordieMessage;
import cordie.diagram.operation.CordieAddCollaboratorOperation;
import cordie.diagram.operation.CordieDeleteOperation;
import cordie.diagram.operation.CordieEditOperation;
import cordie.diagram.operation.CordieInsertOperation;
import cordie.diagram.operation.CordieMoveOperation;
import cordie.diagram.operation.CordieNoneOperation;
import cordie.diagram.operation.CordieOperation;
import cordie.diagram.operation.CordieRemoveCollaboratorOperation;
import cordie.model.Diagram;
import cordie.model.DiagramEditor;
import cordie.model.DiagramSession;
import cordie.model.DiagramSessionMessage;
import cordie.model.User;
import cordie.serializer.DiagramSessionSerializer;
import cordie.service.DiagramEditorService;
import cordie.service.DiagramService;
import cordie.service.DiagramSessionMessageService;
import cordie.service.DiagramSessionService;
import cordie.service.UserService;

public class CordieEditor extends HttpServlet {

	private static final long serialVersionUID = 7884530719982139739L;

	//private Map<String, DiagramManager> diagrams;

	@Inject
	private DiagramService diagramService;
	
	@Inject
	private UserService userService;
	
	@Inject
	private DiagramSessionService diagramSessionService;
	
	@Inject
	private DiagramEditorService diagramEditorService;
	
	@Inject
	private DiagramSessionMessageService diagramSessionMessageService;

//	@SuppressWarnings("unchecked")
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
//		CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
//		diagrams = cdm.getMap();
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
		String id = request.getParameter("id");//actual diagram_id in db
		String username = (String) request.getSession().getAttribute("USERNAME");
		String editorID = request.getParameter("editorID");
		
		long diagramId = (id == null) ? -1 : Long.parseLong(id);
		Diagram diagram = (id == null) ? null : diagramService.getDiagramByIdAndUsername(diagramId, username);
		User user = userService.getUserByUsername(username);
		
		PrintWriter writer = response.getWriter();

		if (action.equals("newUser")) {
			// Avoid errors when two or more users open a diagram all at the same time
//			synchronized (diagrams) {
				
				DiagramSession diagramSession = diagramSessionService.getDiagramSessionByDiagramId(diagramId);
				if (diagramSession == null) {//!diagrams.containsKey(id)) {

					if (diagram == null) {
						writer.println(
								"{\"error\" : \"This diagram does not exist, no longer available, or you do not have permission to edit.\", \"errorType\" : 1}");
						writer.close();
						return;
					}

//					DiagramManager cordieDiagram = new DiagramManager(diagram);
//					diagrams.put(id, cordieDiagram);
					diagramSession = new DiagramSession();
					diagramSession.setDiagram(diagram);
					diagramSessionService.insertDiagramSession(diagramSession);

//					ExecutorService executor = Executors.newFixedThreadPool(1);
//					try {
//						executor.execute(new CordieMessageDirector(cordieDiagram));
//					} catch (Exception exception) {
//						exception.printStackTrace();
//					}
//					executor.shutdown();
				} else if (diagram != null && !diagram.getCollaborators().contains(user)) {//(!diagrams.get(id).allowsEditFrom(username)) {
					writer.println(
							"{\"error\" : \"You do not have permission to edit this diagram.\", \"errorType\" : 1}");
					writer.close();
					return;
				}

				DiagramEditor diagramEditor = new DiagramEditor();
				diagramEditor.setDiagramSession(diagramSession);
				diagramEditor.setUser(user);
				diagramEditorService.insertDiagramEditor(diagramEditor);
				diagramSession.getDiagramEditors().add(diagramEditor);
				editorID = Long.toString(diagramEditor.getId());
//				writer.println(diagrams.get(id).addEditor(username));
				
				ObjectMapper mapper = new ObjectMapper();
				SimpleModule module = new SimpleModule("DiagramSessionSerializer", new Version(1, 0, 0, null, null, null));
				module.addSerializer(DiagramSession.class, new DiagramSessionSerializer());
				mapper.registerModule(module);
				writer.println("{\"diagram\" : " + mapper.writeValueAsString(diagramSession) + ", \"editorID\" : \"" + editorID + "\"}");
//			}
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
				
				currentDiagram.addCollaborator(newCollaboratorUser);
				userService.updateUser(newCollaboratorUser);
			
				// Send out an AddCollaborator operation to the diagram if it's currently live
				DiagramSession diagramSession = diagramSessionService.getDiagramSessionById(diagramId);
				if (diagramSession != null) {
				//if (diagrams.containsKey(id)) {
					CordieOperation co = new CordieAddCollaboratorOperation(newCollaborator, newCollaboratorUser.getFirstname(), newCollaboratorUser.getLastname(),
							newCollaboratorUser.getEmail());
//					diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
					
					DiagramSessionMessage dsm = new DiagramSessionMessage();
					dsm.setDiagramSession(diagramSession);
					dsm.setMessage(cordieOperationToBase64(new CordieMessage(null, co, 0, 0)));
					diagramSessionMessageService.insertDiagramSessionMessage(dsm);
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
				
				currentDiagram.removeCollaborator(toRemoveUser);
				userService.updateUser(toRemoveUser);
				
				// Send out a RemoveCollaborator operation to the diagram if it's currently live
				DiagramSession diagramSession = diagramSessionService.getDiagramSessionById(diagramId);
				if (diagramSession != null) {
//				if (diagrams.containsKey(id)) {
					CordieOperation co = new CordieRemoveCollaboratorOperation(toRemove);
//					diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
					DiagramSessionMessage dsm = new DiagramSessionMessage();
					dsm.setDiagramSession(diagramSession);
					dsm.setMessage(cordieOperationToBase64(new CordieMessage(null, co, 0, 0)));
					diagramSessionMessageService.insertDiagramSessionMessage(dsm);
				}
				
				writer.println("{\"response\" : \"" + toRemove + "is being removed as collaborator.\"}");
				writer.close();
				return;
			}
		}

		DiagramSession diagramSession = diagramSessionService.getDiagramSessionByDiagramId(diagramId);
		if (diagramSession == null) {
//		if (!diagrams.containsKey(id)) {
			writer.println("{\"error\" : \"This diagram no longer exists.\", \"errorType\" : 1}");
			return;
		}

//		if (!diagrams.get(id).hasCurrentEditor(editorID)) {
		DiagramEditor diagramEditor = diagramEditorService.getDiagramEditorById(Long.parseLong(editorID));//diagramEditorService.getDiagramEditorByDiagramSessionIdAndUserId(diagramSession.getId(), user.getId());
		if (diagramEditor == null) {
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

			DiagramSessionMessage dsm = new DiagramSessionMessage();
			dsm.setDiagramSession(diagramSession);
			dsm.setMessage(cordieOperationToBase64(new CordieMessage(editorID, co, myMsgs, otherMsgs)));
			diagramSessionMessageService.insertDiagramSessionMessage(dsm);
//			diagrams.get(id).queueMessage(new CordieMessage(editorID, co, myMsgs, otherMsgs));

			return;
		}

		//TODO uncomment below
		/*if (action.equals("askUpdate")) {
			if (diagrams.get(id).messageQueueEmpty() && diagrams.get(id).getClient(editorID).hasUpdates()) {
				writer.println(diagrams.get(id).getClient(editorID).getUpdates());
			} else {
			}
		}*/
	}

	private String cordieOperationToBase64(CordieMessage cordieMessage) {
		try {
		    ByteArrayOutputStream bo = new ByteArrayOutputStream();
		    ObjectOutputStream so = new ObjectOutputStream(bo);
		    so.writeObject(cordieMessage);
		    so.flush();
		    return new String(Base64.getEncoder().encodeToString(bo.toByteArray()));       
		} 
		catch (Exception e) {
		    e.printStackTrace();
		    return null;
		}
	}
}
