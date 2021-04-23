package cordie;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.jms.ConnectionFactory;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.jms.QueueBrowser;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cordie.diagram.CordieCollaborationMap;
import cordie.diagram.CordieMessage;
import cordie.diagram.CordieMessageHandler;
import cordie.diagram.operation.CordieAddCollaboratorOperation;
import cordie.diagram.operation.CordieAddUserOperation;
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
import cordie.model.User;
import cordie.service.DiagramService;
import cordie.service.UserService;

public class CordieEditor extends HttpServlet {

	private static final long serialVersionUID = 7884530719982139739L;

	@Inject
	private DiagramService diagramService;

	@Inject
	private UserService userService;

	@Inject
	private CordieCollaborationMap cordieCollaborationMap;

	@Resource(mappedName = "java:jboss/DefaultJMSConnectionFactory")
	private ConnectionFactory connectionFactory;

	@Resource(lookup = "java:/jms/queue/CordieQueue")
	private Queue cordieQueue;

//	@SuppressWarnings("unchecked")
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
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
		String id = request.getParameter("id");// actual diagram_id in db
		String username = (String) request.getSession().getAttribute("USERNAME");
		String editorID = request.getParameter("editorID");

		Diagram diagram = (id == null) ? null : diagramService.getDiagramByIdAndUsername(Long.parseLong(id), username);
		User user = userService.getUserByUsername(username);

		PrintWriter writer = response.getWriter();

		if (action.equals("newUser")) {

			// Avoid errors when two or more users open a diagram all at the same time
			DiagramSession diagramSession = cordieCollaborationMap.getDiagramSessionMap().get(id);
			if (diagramSession == null) {// !diagrams.containsKey(id)) {

				if (diagram == null) {
					writer.println(
							"{\"error\" : \"This diagram does not exist, no longer available, or you do not have permission to edit.\", \"errorType\" : 1}");
					writer.close();
					return;
				}

				diagramSession = new DiagramSession(diagram);
				cordieCollaborationMap.getDiagramSessionMap().put(id, diagramSession);
			} else if (diagram != null && !diagram.getCollaborators().contains(user)) {
				writer.println("{\"error\" : \"You do not have permission to edit this diagram.\", \"errorType\" : 1}");
				writer.close();
				return;
			}

			DiagramEditor newDiagramEditor = new DiagramEditor(diagramSession, userService.getUserByUsername(username));
			writer.println(diagramSession.addEditor(newDiagramEditor));
			CordieOperation co = new CordieAddUserOperation(newDiagramEditor.getUser().getUsername());
			try (JMSContext jmsContext = connectionFactory.createContext();) {
				ObjectMessage message = jmsContext.createObjectMessage();
				message.setObject(new CordieMessage(editorID, co, 0, 0));
				message.setStringProperty(CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY, id);
				message.setStringProperty(CordieMessageHandler.SENDER_EDITOR_ID_PROPERTY, editorID);
				jmsContext.createProducer().send(cordieQueue, message);
			} catch (JMSException e) {
				e.printStackTrace();
			}
			return;
		}

		if (action.equals("addcollaborator")) {
			String newCollaborator = request.getParameter("collaborator");

			Diagram currentDiagram = diagramService.getDiagramById(Long.parseLong(id));// diagrams.get(id).getDiagram();
			if (!currentDiagram.getCreator().getUsername().equals(username)) {
				writer.println("{\"error\" : \"You are not allowed to add collaborators.\", \"errorType\" : 2}");
				return;
			} else {
				User newCollaboratorUser = newCollaborator != null ? userService.getUserByUsername(newCollaborator)
						: null;

				if (newCollaboratorUser == null) {
					writer.println("{\"error\" : \"User with the username " + newCollaborator
							+ " does not exist.\", \"errorType\" : 2}");
					writer.close();
					return;
				}

				if (currentDiagram.getCollaborators().contains(newCollaboratorUser)) {
					writer.println(
							"{\"error\" : \"" + newCollaborator + " is already a collaborator.\", \"errorType\" : 2}");
					writer.close();
					return;
				}

				currentDiagram.addCollaborator(newCollaboratorUser);
				userService.updateUser(newCollaboratorUser);

				// Send out an AddCollaborator operation to the diagram if it's currently live
				DiagramSession diagramSession = cordieCollaborationMap.getDiagramSessionMap().get(id);
				if (diagramSession != null) {
					CordieOperation co = new CordieAddCollaboratorOperation(newCollaborator,
							newCollaboratorUser.getFirstname(), newCollaboratorUser.getLastname(),
							newCollaboratorUser.getEmail());

					try (JMSContext jmsContext = connectionFactory.createContext();) {
						ObjectMessage message = jmsContext.createObjectMessage();
						message.setObject(new CordieMessage(null, co, 0, 0));
						message.setStringProperty(CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY, id);
						message.setStringProperty(CordieMessageHandler.SENDER_EDITOR_ID_PROPERTY, null);
						jmsContext.createProducer().send(cordieQueue, message);
					} catch (JMSException e) {
						e.printStackTrace();
					}

				}
				writer.println("{\"response\" : \" " + newCollaborator + " is being added as collaborator.\"}");
				writer.close();
				return;
			}
		}

		if (action.equals("removecollaborator")) {
			String toRemove = request.getParameter("collaborator");

			Diagram currentDiagram = diagramService.getDiagramById(Long.parseLong(id));// diagrams.get(id).getDiagram();
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
				DiagramSession diagramSession = cordieCollaborationMap.getDiagramSessionMap().get(id);

				if (diagramSession != null) {
					CordieOperation co = new CordieRemoveCollaboratorOperation(toRemove);

					try (JMSContext jmsContext = connectionFactory.createContext();) {
						ObjectMessage message = jmsContext.createObjectMessage();
						message.setObject(new CordieMessage(null, co, 0, 0));
						message.setStringProperty(CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY, id);
						message.setStringProperty(CordieMessageHandler.SENDER_EDITOR_ID_PROPERTY, null);
						jmsContext.createProducer().send(cordieQueue, message);
					} catch (JMSException e) {
						e.printStackTrace();
					}
				}

				writer.println("{\"response\" : \"" + toRemove + "is being removed as collaborator.\"}");
				writer.close();
				return;
			}
		}

		DiagramSession diagramSession = cordieCollaborationMap.getDiagramSessionMap().get(id);
		if (diagramSession == null) {
			writer.println("{\"error\" : \"This diagram no longer exists.\", \"errorType\" : 1}");
			return;
		}

		DiagramEditor diagramEditor = diagramSession.getCurrentEditors().get(editorID);
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

			try (JMSContext jmsContext = connectionFactory.createContext();) {
				ObjectMessage message = jmsContext.createObjectMessage();
				message.setObject(new CordieMessage(editorID, co, myMsgs, otherMsgs));
				message.setStringProperty(CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY, id);
				message.setStringProperty(CordieMessageHandler.SENDER_EDITOR_ID_PROPERTY, editorID);
				jmsContext.createProducer().send(cordieQueue, message);
			} catch (JMSException e) {
				e.printStackTrace();
			}

			return;
		}

		if (action.equals("askUpdate")) {
			try (JMSContext jmsContext = connectionFactory.createContext();) {
				QueueBrowser queueBrowser = jmsContext.createBrowser(cordieQueue,
						CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY + "=" + id);
				boolean isMessageQueueEmpty = !queueBrowser.getEnumeration().hasMoreElements();

				if (isMessageQueueEmpty && diagramEditor.hasUpdates()) {
					writer.println(diagramEditor.getUpdates());
				} else {
				}
			} catch (JMSException e) {
				e.printStackTrace();
			}
		}
	}
}
