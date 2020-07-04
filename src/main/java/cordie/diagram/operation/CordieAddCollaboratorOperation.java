package cordie.diagram.operation;

import org.apache.commons.text.StringEscapeUtils;

public class CordieAddCollaboratorOperation implements CordieOperation {
    private String username;
    private String firstname;
    private String lastname;
    private String email;

    public CordieAddCollaboratorOperation(String iUsername, String iFirstname,
            String iLastname, String iEmail) {
        this.username = iUsername;
        this.firstname = iFirstname;
        this.lastname = iLastname;
        this.email = iEmail;
    }

    public CordieAddCollaboratorOperation(CordieAddCollaboratorOperation co) {
        this.username = co.getUsername();
        this.firstname = co.getFirstname();
        this.lastname = co.getLastname();
        this.email = co.getEmail();
    }

    public String getUsername() {
        return username;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"addcollaborator\", \"collaborator\" : { \"username\" : \"" +
                StringEscapeUtils.escapeJava(username) + "\", \"firstname\" : \"" + StringEscapeUtils.escapeJava(firstname) +
                "\", \"lastname\" : \"" + StringEscapeUtils.escapeJava(lastname) + "\", \"email\" : \"" +
                StringEscapeUtils.escapeJava(email) + "\""
        				+ "} }";
    }
}