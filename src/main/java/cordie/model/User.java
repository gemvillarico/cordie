package cordie.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3179697487791433074L;

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "username", unique = true)
	private String username;
//	private String password;
	
	@Column(name = "firstname")
	private String firstname;
	
	@Column(name = "lastname")
	private String lastname;
	
	@Column(name = "email")
	private String email;
//	private byte[] displaypic;

	@ManyToMany(mappedBy = "collaborators", fetch = FetchType.LAZY)
	private List<Diagram> diagrams;
	
	@Lob @Basic(fetch = FetchType.LAZY)
	@Column(name = "display_image")
	private byte[] displayImage;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Diagram> getDiagrams() {
		return diagrams;
	}

	public void setDiagrams(List<Diagram> diagrams) {
		this.diagrams = diagrams;
	}

	public byte[] getDisplayImage() {
		return displayImage;
	}

	public void setDisplayImage(byte[] displayImage) {
		this.displayImage = displayImage;
	}

//	TODO
//	@Column(name = "displaypic")
//	public byte[] getDisplaypic() {
//		return displaypic;
//	}
//
//	public void setDisplaypic(byte[] displaypic) {
//		this.displaypic = displaypic;
//	}

}
