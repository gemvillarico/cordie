package cordie.model;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import cordie.diagram.operation.CordieAddCollaboratorOperation;
import cordie.diagram.operation.CordieDeleteOperation;
import cordie.diagram.operation.CordieEditOperation;
import cordie.diagram.operation.CordieInsertOperation;
import cordie.diagram.operation.CordieMoveOperation;
import cordie.diagram.operation.CordieOperation;
import cordie.diagram.operation.CordieRemoveCollaboratorOperation;
import cordie.diagram.operation.CordieRemoveUserOperation;
import cordie.serializer.DiagramSessionSerializer;
import cordie.service.DiagramService;

//@ApplicationScoped
public class DiagramSession {

	private long id;
	private Diagram diagram;
	private Document dom;
	private Element root;
	private Set<String> collaboratorInfo;
	private Map<String, DiagramEditor> currentEditors;
	private XMLOutputter outputter;
	private int editorsCount;

	public Set<String> getCollaboratorInfo() {
		return collaboratorInfo;
	}

	public void setCollaboratorInfo(Set<String> collaboratorInfo) {
		this.collaboratorInfo = collaboratorInfo;
	}

	public Map<String, DiagramEditor> getCurrentEditors() {
		return currentEditors;
	}

	public void setCurrentEditors(Map<String, DiagramEditor> currentEditors) {
		this.currentEditors = currentEditors;
	}

	public int getEditorsCount() {
		return editorsCount;
	}

	public void setEditorsCount(int editorsCount) {
		this.editorsCount = editorsCount;
	}

	public DiagramSession(Diagram diagram) {// String iDiagramID) {
		this.outputter = new XMLOutputter(Format.getPrettyFormat());

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

		this.currentEditors = new HashMap<String, DiagramEditor>();
		this.editorsCount = 0;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Diagram getDiagram() {
		return diagram;
	}

	public void setDiagram(Diagram diagram) {
		this.diagram = diagram;
	}

	public String addEditor(DiagramEditor newDiagramEditor) {
		String editorID = Integer.toString(editorsCount);
		synchronized (currentEditors) {
			currentEditors.put(editorID, newDiagramEditor);
			editorsCount++;
		}

		return "{\"diagram\" : " + this.toString() + ", \"editorID\" : \"" + editorID + "\"}";
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
					if (currentEditors.get(key).getUser().getUsername().equals(userToRemove)) {
						editorsToRemove.add(key);
					}
				}
				for (String key : editorsToRemove) {
					currentEditors.remove(key);
				}

				collaboratorInfo.remove(userToRemove);
			}

		} else if (op instanceof CordieRemoveUserOperation) {
			CordieRemoveUserOperation cruo = (CordieRemoveUserOperation) op;
			String userToRemove = cruo.getUsername();

			synchronized (currentEditors) {
				for (String key : currentEditors.keySet()) {
					if (currentEditors.get(key).getUser().getUsername().equals(userToRemove)) {
						currentEditors.remove(key);
					}
				}
			}

		} else if (op instanceof CordieAddCollaboratorOperation) {
			CordieAddCollaboratorOperation caco = (CordieAddCollaboratorOperation) op;
			collaboratorInfo.add(caco.getUsername());
		}

		// Broadcast the operation just applied to all other clients
		for (String editorID : currentEditors.keySet()) {
			if (!editorID.equals(sender)) {
				currentEditors.get(editorID).send(op, sender);
			}
		}
	}

	public void writeDiagram() {
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			outputter.output(this.dom, bos);
			bos.close();
			this.diagram.setDiagramContent(bos.toByteArray());

			InitialContext initialContext = new InitialContext();
			DiagramService diagramService = (DiagramService) initialContext.lookup("java:global/cordie/DiagramService");

			diagramService.updateDiagram(this.diagram);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String toString() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			SimpleModule module = new SimpleModule("DiagramSessionSerializer", new Version(1, 0, 0, null, null, null));
			module.addSerializer(DiagramSession.class, new DiagramSessionSerializer());
			mapper.registerModule(module);

			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
