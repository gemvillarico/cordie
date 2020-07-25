package cordie.diagram;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import cordie.diagram.operation.CordieNoneOperation;
import cordie.service.DiagramService;

/**
 * Thread that processes the messages in the message queue
 */
public class CordieMessageDirector implements Runnable {
	private DiagramManager cordieDiagram;
	private XMLOutputter outputter;

	public CordieMessageDirector(DiagramManager cordieDiagram) {
		this.cordieDiagram = cordieDiagram;
		this.outputter = new XMLOutputter(Format.getPrettyFormat());
	}

	@Override
	public void run() {
		while (true) {
			try {
				CordieMessage msg = cordieDiagram.getMessageQueue().take();
				if (msg.getSender() != null) {
					cordieDiagram.getCurrentEditors().get(msg.getSender()).processMessage(msg);
				} else {
					cordieDiagram.apply(msg.getOp(), msg.getSender());
				}

				if (cordieDiagram.messageQueueEmpty() && (msg.getOp() instanceof CordieNoneOperation)) {
					printToFile();
				}
			} catch (Exception exception) {
				exception.printStackTrace();
			}
		}
	}

	private void printToFile() {
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			outputter.output(cordieDiagram.getDom(), bos);
			bos.close();
			cordieDiagram.getDiagram().setDiagramContent(bos.toByteArray());

			InitialContext initialContext = new InitialContext();
			DiagramService diagramService = (DiagramService) initialContext.lookup("java:global/cordie/DiagramService");
			
			diagramService.updateDiagram(cordieDiagram.getDiagram());
		} catch (IOException e) {
			e.printStackTrace();
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}