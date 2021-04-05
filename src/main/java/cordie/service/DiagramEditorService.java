package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cordie.model.DiagramEditor;

@Stateless
public class DiagramEditorService {
	@PersistenceContext(name = "CordieManagement")
	private EntityManager em;

	public DiagramEditor getDiagramEditorById(long id) {
		return em.find(DiagramEditor.class, id);
	}
	
	public DiagramEditor getDiagramEditorByDiagramSessionIdAndUserId(long diagramSessionId, long userId) {
		try {
			DiagramEditor diagramEditor = (DiagramEditor) em
					.createQuery("SELECT de FROM DiagramEditor de "
							+ "JOIN de.diagramSession ds "
							+ "JOIN de.user u "
							+ "WHERE ds.id = :diagramSessionId "
							+ "AND u.id = :userId")
					.setParameter("diagramSessionId", diagramSessionId)
					.setParameter("userId", userId)
					.getSingleResult();
			
			diagramEditor = em.find(DiagramEditor.class, diagramEditor.getId());
			em.refresh(diagramEditor);

			return diagramEditor;
		} catch (NoResultException e) {
			return null;
		}
	}

	public void insertDiagramEditor(DiagramEditor diagramEditor) {
		em.persist(diagramEditor);
	}

	public void updateDiagramEditor(DiagramEditor diagramEditor) {
		em.merge(diagramEditor);
	}
	
	public void deleteDiagramEditor(DiagramEditor diagramEditor) {
		if (!em.contains(diagramEditor)) {
			diagramEditor = em.merge(diagramEditor);
		}
		em.remove(diagramEditor);
		em.flush();
	}
}
