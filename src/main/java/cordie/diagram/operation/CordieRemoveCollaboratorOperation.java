package cordie.diagram.operation;

import org.apache.commons.lang3.StringEscapeUtils;

public class CordieRemoveCollaboratorOperation implements CordieOperation {
    private String toRemove;

    public CordieRemoveCollaboratorOperation(CordieRemoveCollaboratorOperation co) {
        this.toRemove = co.getUsername();
    }

    public CordieRemoveCollaboratorOperation(String str) {
        this.toRemove = str;
    }

    public String getUsername() {
        return toRemove;
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"removecollaborator\", \"collaborator\" : \""
                + StringEscapeUtils.escapeJava(toRemove) + "\" }";
    }
}
