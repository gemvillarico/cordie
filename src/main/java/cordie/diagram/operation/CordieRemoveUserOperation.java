package cordie.diagram.operation;

import org.apache.commons.lang3.StringEscapeUtils;

public class CordieRemoveUserOperation implements CordieOperation {
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
