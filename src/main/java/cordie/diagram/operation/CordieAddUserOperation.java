package cordie.diagram.operation;

import org.apache.commons.text.StringEscapeUtils;

public class CordieAddUserOperation implements CordieOperation {
	private static final long serialVersionUID = 80140344743490485L;

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
		return "{ \"optype\" : \"adduser\", \"collaborator\" : \"" + StringEscapeUtils.escapeJava(user) + "\" }";
	}
}
