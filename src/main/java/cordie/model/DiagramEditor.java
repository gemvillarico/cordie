package cordie.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "diagram_editor")
public class DiagramEditor {
	@Id
	@Column(name = "diagram_editor_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne(cascade = { CascadeType.REFRESH })
	@JoinColumn(name = "diagram_session_id", nullable = false)
	private DiagramSession diagramSession;
	
	@ManyToOne(cascade = { CascadeType.REFRESH })
	@JoinColumn(name = "user_id")
	private User user;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
