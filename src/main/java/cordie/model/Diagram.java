package cordie.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "diagram")
public class Diagram implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1047659828603537454L;

	@Id
	@Column(name = "diagram_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "creator")
	private User creator;

	@Column(name = "title")
	private String title;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_last_edited")
	private Date dateLastEdited;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private Date dateCreated;

	@Column(name = "description")
	private String description;

	@Lob
	@Column(name = "diagram_content", columnDefinition = "BLOB")
	private byte[] diagramContent;

	
	@ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	@JoinTable(name = "collaborator", 
		joinColumns = {@JoinColumn(name = "diagram_id") }, 
		inverseJoinColumns = {@JoinColumn(name = "user_id") })
	private List<User> collaborators;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

//	@ManyToOne
//    @JoinColumn(name = "creator")
	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getDateLastEdited() {
		return dateLastEdited;
	}

	public void setDateLastEdited(Date dateLastEdited) {
		this.dateLastEdited = dateLastEdited;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getDiagramContent() {
		return diagramContent;
	}

	public void setDiagramContent(byte[] diagramContent) {
		this.diagramContent = diagramContent;
	}

	public List<User> getCollaborators() {
		return collaborators;
	}

	public void setCollaborators(List<User> collaborators) {
		this.collaborators = collaborators;
	}
}
