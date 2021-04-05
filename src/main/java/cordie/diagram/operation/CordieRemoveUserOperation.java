package cordie.diagram.operation;

import org.apache.commons.text.StringEscapeUtils;

public class CordieRemoveUserOperation implements CordieOperation {
    
	private static final long serialVersionUID = -105081685033791941L;
	
	private String toRemove;

    public CordieRemoveUserOperation(CordieRemoveUserOperation co) {
        this.toRemove = co.getUsername();
    }

    public CordieRemoveUserOperation(String str) {
        this.toRemove = str;
    }

    public String getUsername() {
        return toRemove;
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"removeuser\", \"collaborator\" : \""
                + StringEscapeUtils.escapeJava(toRemove) + "\" }";
    }
}
