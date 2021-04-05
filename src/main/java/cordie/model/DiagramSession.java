package cordie.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "diagram_session")
public class DiagramSession {

	@Id
	@Column(name = "diagram_session_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToOne(cascade = { CascadeType.REFRESH })
	@JoinColumn(name = "diagram_id", referencedColumnName = "diagram_id")
	private Diagram diagram;

	@OneToMany(mappedBy = "diagramSession", cascade = { CascadeType.REFRESH }, fetch = FetchType.EAGER)
	private Set<DiagramEditor> diagramEditors = new HashSet<>();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Diagram getDiagram() {
		return diagram;
	}

	public void setDiagram(Diagram diagram) {
		this.diagram = diagram;
	}

	public Set<DiagramEditor> getDiagramEditors() {
		return diagramEditors;
	}

	public void setDiagramEditors(Set<DiagramEditor> diagramEditors) {
		this.diagramEditors = diagramEditors;
	}
}
