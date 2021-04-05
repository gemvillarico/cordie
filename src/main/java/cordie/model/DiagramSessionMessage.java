package cordie.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "diagram_session_message")
public class DiagramSessionMessage {

	@Id
	@Column(name = "diagram_session_message_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne(cascade = { CascadeType.REFRESH })
	@JoinColumn(name = "diagram_session_id", nullable = false)
	private DiagramSession diagramSession;
	
	@Column(name = "message", length = 500)
	private String message;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private Date dateCreated;
	
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
}
