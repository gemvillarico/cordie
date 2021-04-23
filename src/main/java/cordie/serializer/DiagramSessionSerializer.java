package cordie.serializer;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.ListIterator;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import cordie.diagram.CordieObjectConverter;
import cordie.model.Diagram;
import cordie.model.DiagramEditor;
import cordie.model.DiagramSession;
import cordie.model.User;

public class DiagramSessionSerializer extends StdSerializer<DiagramSession> {

	private static final long serialVersionUID = -4194428349734118691L;

	public DiagramSessionSerializer() {
		this(null);
	}

	protected DiagramSessionSerializer(Class<DiagramSession> t) {
		super(t);
	}

	@Override
	public void serialize(DiagramSession diagramSession, JsonGenerator gen, SerializerProvider provider)
			throws IOException {
		Diagram diagram = diagramSession.getDiagram();
		gen.writeStartObject();

		gen.writeNumberField("diagramid", diagram.getId());
		gen.writeStringField("title", diagram.getTitle());
		gen.writeStringField("creator", StringEscapeUtils.escapeJava(diagram.getCreator().getUsername()));
		gen.writeStringField("datecreated", diagram.getDateCreated().toString());

		writeCollaboratorsField(diagram, gen);
		writeCurrentUsersField(diagramSession, gen);
		writeDiagramObjectsField(diagram, gen);

		gen.writeEndObject();

	}

	private void writeCollaboratorsField(Diagram diagram, JsonGenerator gen) throws IOException {
		gen.writeFieldName("collaborators");

		String temp = StringUtils.EMPTY;

		if (diagram.getCollaborators() != null) {
			Iterator<User> userIterator = diagram.getCollaborators().iterator();

			while (userIterator.hasNext()) {
				User currCol = userIterator.next();

				temp += "{\"username\" : \"" + StringEscapeUtils.escapeJava(currCol.getUsername())
						+ "\", \"firstname\" : \"" + StringEscapeUtils.escapeJava(currCol.getFirstname())
						+ "\", \"lastname\" : \"" + StringEscapeUtils.escapeJava(currCol.getLastname())
						+ "\", \"email\" : \"" + StringEscapeUtils.escapeJava(currCol.getEmail()) + "\"" + "}";

				if (userIterator.hasNext()) {
					temp += ", ";
				}
			}
		}

		gen.writeRawValue("[" + temp + "]");
	}

	private void writeCurrentUsersField(DiagramSession diagramSession, JsonGenerator gen) throws IOException {
		gen.writeFieldName("currentusers");

		String temp = StringUtils.EMPTY;

		if (diagramSession.getCurrentEditors() != null) {
			Iterator<Entry<String, DiagramEditor>> deIterator = diagramSession.getCurrentEditors().entrySet().iterator();
			while (deIterator.hasNext()) {
				temp += "\"" + StringEscapeUtils.escapeJava(deIterator.next().getValue().getUser().getUsername()) + "\"";

				if (deIterator.hasNext()) {
					temp += ", ";
				}
			}
		}

		gen.writeRawValue("[" + temp + "]");/**/
	}

	private void writeDiagramObjectsField(Diagram diagram, JsonGenerator gen) throws IOException {
		gen.writeFieldName("objects");

		String temp = StringUtils.EMPTY;

		try {
			Document dom = null;
			SAXBuilder builder = new SAXBuilder();

			byte[] diagramContent = diagram.getDiagramContent();
			if (diagramContent == null) {
				Element root = new Element("diagram");
				dom = new Document(root);
			} else {
				dom = builder.build(new ByteArrayInputStream(diagramContent));
			}

			Element root = dom.getRootElement();

			@SuppressWarnings("unchecked")
			ListIterator<Element> rootChildrentItr = root.getChildren().listIterator();
			while (rootChildrentItr.hasNext()) {
				if (rootChildrentItr.hasPrevious()) {
					temp += ", ";
				}
				temp += CordieObjectConverter.convert((Element) rootChildrentItr.next());
			}

		} catch (JDOMException | IOException e) {
			e.printStackTrace();
		}

		gen.writeRawValue("[" + temp + "]");
	}

}
