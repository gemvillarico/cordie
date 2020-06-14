package cordie.diagram;

import cordie.diagram.operation.CordieOperation;

public class CordieMessage {
    private String sender;
    private CordieOperation op;
    private int myMsgs;
    private int otherMsgs;

    public CordieMessage(String iSender, CordieOperation iOp, int iMyMsgs, int iOtherMsgs) {
        this.sender = iSender;
        this.op = iOp;
        this.myMsgs = iMyMsgs;
        this.otherMsgs = iOtherMsgs;
    }

    public void setOp(CordieOperation iOp) {
        this.op = iOp;
    }

    public String getSender() {
        return sender;
    }

    public CordieOperation getOp() {
        return op;
    }

    public int getMyMsgs() {
        return myMsgs;
    }

    public int getOtherMsgs() {
        return otherMsgs;
    }

    public String toString() {
        return "sender: " + sender + " op: " + op + " myMsgs: " + myMsgs
                + " otherMsgs: " + otherMsgs;
    }
}
