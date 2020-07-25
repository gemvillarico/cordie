package cordie;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ListIterator;
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
import cordie.model.User;
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

		String username = (String) request.getSession().getAttribute("USERNAME");

		String action = request.getParameter("action");
		if (action == null) {
			// do nothing
		} else if (action.equals("add")) {
			Diagram newDiagram = new Diagram();
			newDiagram.setCreator(userService.getUserByUsername(username));
			newDiagram.setTitle(request.getParameter("title"));
			newDiagram.setDescription(request.getParameter("description"));

			// create an XML file for the newly created diagram
			Element root = new Element("diagram");
			Document dom = new Document(root);
			XMLOutputter outputter = new XMLOutputter(Format.getPrettyFormat());

			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			outputter.output(dom, bos);
			newDiagram.setDiagramContent(bos.toByteArray());

			diagramService.insertDiagram(newDiagram);
		} else if (action.equals("delete")) {
			String id = request.getParameter("id");

			// check if diagram has active users
			CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
			@SuppressWarnings("unchecked")
			Map<String, DiagramManager> diagrams = cdm.getMap();
			synchronized (diagrams) {
				if (diagrams.containsKey(id)) {
					diagrams.remove(id);
				}
			}

			Diagram diagramToDelete = diagramService.getDiagramById(Long.parseLong(request.getParameter("id")));
			diagramService.deleteDiagram(diagramToDelete);
		} else if (action.equals("leave")) {
			String id = request.getParameter("id");

			Diagram currentDiagram = diagramService.getDiagramById(Long.parseLong(id));
			if (currentDiagram.getCreator().getUsername().equals(username)) {
				// TODO show error message if creator of diagram tries to leave; should not be
				// possible
			} else {
				User currentUser = userService.getUserByUsername(username);
				currentDiagram.getCollaborators().remove(currentUser);
				diagramService.updateDiagram(currentDiagram);

				// create message for users currently editing the diagram
				CordieDiagramsMap cdm = CordieDiagramsMap.getInstance();
				@SuppressWarnings("unchecked")
				Map<String, DiagramManager> diagrams = cdm.getMap();
				if (diagrams.containsKey(id)) {
					CordieOperation co = new CordieRemoveCollaboratorOperation(username);
					diagrams.get(id).queueMessage(new CordieMessage(null, co, 0, 0));
				}
			}
		} else if (action.equals("copy")) {
			Diagram origDiagram = diagramService.getDiagramById(Long.parseLong(request.getParameter("from")));

			Diagram copyDiagram = new Diagram();
			copyDiagram.setCreator(userService.getUserByUsername(username));
			copyDiagram.setTitle(request.getParameter("title"));
			copyDiagram.setDescription(request.getParameter("description"));
			copyDiagram.setDiagramContent(origDiagram.getDiagramContent());

			diagramService.insertDiagram(copyDiagram);
		}

		User currentUser = userService.getUserByUsername(username);
		out.print("[");
		ListIterator<Diagram> diagramListIter = currentUser.getDiagrams().listIterator();
		while (diagramListIter.hasNext()) {
			Diagram diagram = diagramListIter.next();

			String collaboratorsStr = "[";
			ListIterator<User> collaboratorListIter = diagram.getCollaborators().listIterator();
			while (collaboratorListIter.hasNext()) {
				User collaborator = collaboratorListIter.next();
				
				if (collaborator.equals(currentUser)) {
					continue;
				}
				
				collaboratorsStr += "\"" + collaborator.getUsername() + "\"";//collaborator.getId() + "\"";

				collaboratorsStr += ", ";
			}
			
			collaboratorsStr = collaboratorsStr.replaceAll(", $", "");
			
			collaboratorsStr += "]";

			out.print("[\"" + diagram.getId() + "\", \"" + StringEscapeUtils.escapeJava(diagram.getTitle()) + "\", \""
					+ StringEscapeUtils.escapeJava(diagram.getDescription()) + "\", \""
					+ StringEscapeUtils.escapeJava(diagram.getCreator().getUsername()) + "\", \""
					+ diagram.getDateCreated() + "\", " + collaboratorsStr + "]");

			if (diagramListIter.hasNext()) {
				out.print(", ");
			}
		}
		out.print("]");

		out.close();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendRedirect("diagrams.jsp");
	}

	@Override
	public String getServletInfo() {
		return "Handles request for the list of diagrams " + "accessible to a user (in JSON format).";
	}
}
