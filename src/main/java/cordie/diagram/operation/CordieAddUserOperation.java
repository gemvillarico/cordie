package cordie.diagram.operation;

import org.apache.commons.lang3.StringEscapeUtils;

public class CordieAddUserOperation implements CordieOperation {
    private String user;

    public CordieAddUserOperation(String u) {
        this.user = u;
    }

    public CordieAddUserOperation(CordieAddUserOperation co) {
        this.user = co.getUser();
    }

    public String getUser() {
        return user;
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"adduser\", \"collaborator\" : \""
                + StringEscapeUtils.escapeJava(user) + "\" }";
    }
}
