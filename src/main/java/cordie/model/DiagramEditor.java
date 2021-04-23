package cordie.model;

import java.util.ArrayList;
import java.util.Date;

import org.apache.commons.text.StringEscapeUtils;

import cordie.diagram.CordieMessage;
import cordie.diagram.Transform;
import cordie.diagram.operation.CordieDeleteOperation;
import cordie.diagram.operation.CordieEditOperation;
import cordie.diagram.operation.CordieInsertOperation;
import cordie.diagram.operation.CordieMoveOperation;
import cordie.diagram.operation.CordieNoneOperation;
import cordie.diagram.operation.CordieOperation;
import cordie.diagram.operation.CordieRemoveCollaboratorOperation;

public class DiagramEditor {
	private long id;
	private DiagramSession diagramSession;
	private User user;

	private ArrayList<CordieMessage> outgoing;
	private ArrayList<String> updates;
	private int myMsgs;
	private int otherMsgs;
	private Date lastUpdate;

	public DiagramEditor(DiagramSession diagramSession, User user) {
		this.outgoing = new ArrayList<CordieMessage>();
		this.updates = new ArrayList<String>();
		this.myMsgs = 0;
		this.otherMsgs = 0;
		this.lastUpdate = new Date();
		this.diagramSession = diagramSession;
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public DiagramSession getDiagramSession() {
		return diagramSession;
	}

	public void setDiagramSession(DiagramSession diagramSession) {
		this.diagramSession = diagramSession;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void processMessage(CordieMessage msg) {
		// Discard acknowledged messages
		for (int i = 0; i < outgoing.size(); i++) {
			if (outgoing.get(i).getMyMsgs() < msg.getOtherMsgs()) {
				outgoing.remove(i);
				i--;
			}
		}

		for (int i = 0; i < outgoing.size(); i++) {
			CordieOperation[] origOps = { msg.getOp(), outgoing.get(i).getOp() };
			CordieOperation[] transformedOps = Transform.doTransform(origOps);
			msg.setOp(transformedOps[0]);
			outgoing.get(i).setOp(transformedOps[1]);
		}

		this.diagramSession.apply(msg.getOp(), msg.getSender());

		this.lastUpdate = new Date();

		otherMsgs++;
	}

	public void send(CordieOperation op, String sender) {
		if (op instanceof CordieInsertOperation) {
			outgoing.add(new CordieMessage("server", new CordieInsertOperation((CordieInsertOperation) op), myMsgs,
					otherMsgs));
		} else if (op instanceof CordieDeleteOperation) {
			outgoing.add(new CordieMessage("server", new CordieDeleteOperation((CordieDeleteOperation) op), myMsgs,
					otherMsgs));
		} else if (op instanceof CordieEditOperation) {
			outgoing.add(
					new CordieMessage("server", new CordieEditOperation((CordieEditOperation) op), myMsgs, otherMsgs));
		} else if (op instanceof CordieMoveOperation) {
			outgoing.add(
					new CordieMessage("server", new CordieMoveOperation((CordieMoveOperation) op), myMsgs, otherMsgs));
		} else if (op instanceof CordieRemoveCollaboratorOperation) {
			outgoing.add(new CordieMessage("server",
					new CordieRemoveCollaboratorOperation((CordieRemoveCollaboratorOperation) op), myMsgs, otherMsgs));
		} else {
			outgoing.add(new CordieMessage("server", new CordieNoneOperation(), myMsgs, otherMsgs));
		}

		updates.add("{ \"op\" : " + op.toString() + ", \"otherMsgs\" : " + otherMsgs + ", \"from\" : \""
				+ (sender != null
						? StringEscapeUtils.escapeJava(
								this.getDiagramSession().getCurrentEditors().get(sender).getUser().getUsername())
						: "")
				+ "\" }");
		myMsgs++;

		// TODO implement timeout for diagram session and diagram editor
//		timeoutTask.cancel();
//		this.timeoutTask = new EditTimeoutReached();
//		this.lastEditTimer.schedule(timeoutTask, EDIT_TIMEOUT);
	}

	public boolean hasUpdates() {
		return !updates.isEmpty();
	}

	public String getUpdates() {
		String temp = "[";

		boolean first = true;
		for (String update : updates) {
			if (!first)
				temp += ", ";
			else
				first = false;

			temp += update;
		}

		temp += "]";

		updates.clear();

		return temp;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}
}
