package cordie.diagram;

import javax.annotation.Resource;
import javax.ejb.DependsOn;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.jms.ConnectionFactory;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.Message;
import javax.jms.Queue;
import javax.jms.QueueBrowser;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import cordie.diagram.operation.CordieNoneOperation;
import cordie.model.DiagramSession;

@Startup
@Singleton
@DependsOn("CordieCollaborationMap")
public class CordieMessageHandler {
	
	@Resource(mappedName = "java:jboss/DefaultJMSConnectionFactory")
    private ConnectionFactory connectionFactory;

    @Resource(lookup = "java:/jms/queue/CordieQueue")
    private Queue cordieQueue;
    
    @Inject
    private CordieCollaborationMap cordieCollaborationMap;

	public static final String SENDER_EDITOR_ID_PROPERTY = "SENDER_EDITOR_ID_PROPERTY";

	public static final String RECIPIENT_DIAGRAM_ID_PROPERTY = "RECIPIENT_DIAGRAM_ID_PROPERTY";

	private static final long MESSAGE_CONSUME_TIMEOUT = 5 * 1000;
	
	private static final Logger logger = LogManager.getLogger(CordieMessageHandler.class);
    
	@Schedule(hour="*", minute="*", second="*/10", persistent=false)
    private void handleMessages() {
    	
		logger.info("Log4j CordieMessageHandler 1");
		try (JMSContext context = connectionFactory.createContext();) {
			JMSConsumer consumer = context.createConsumer(cordieQueue);

			while (true) {
				logger.info("Log4j CordieMessageHandler 2");

				Message m = consumer.receive(MESSAGE_CONSUME_TIMEOUT);
				
				if (m == null) {
					break;
				}
				
				logger.info("Log4j CordieMessageHandler 3");

				CordieMessage msg = m.getBody(CordieMessage.class);
				String diagramId = m.getStringProperty(CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY);
				DiagramSession diagramSession = cordieCollaborationMap.getDiagramSessionMap().get(diagramId);
				
				if (msg.getSender() != null) {
					diagramSession.getCurrentEditors().get(msg.getSender()).processMessage(msg);
				} else {
					diagramSession.apply(msg.getOp(), msg.getSender());
				}

				QueueBrowser queueBrowser = context.createBrowser(cordieQueue,
						CordieMessageHandler.RECIPIENT_DIAGRAM_ID_PROPERTY + "=" + diagramId);
				boolean isMessageQueueEmpty = !queueBrowser.getEnumeration().hasMoreElements();
				if (isMessageQueueEmpty && (msg.getOp() instanceof CordieNoneOperation)) {
					diagramSession.writeDiagram();
				}
			}
		} catch (Exception exception) {
			logger.error(exception.getMessage());
			System.out.println(exception.getStackTrace());
		}
    }
}
