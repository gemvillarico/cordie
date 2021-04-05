package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cordie.model.DiagramSession;

@Stateless
public class DiagramSessionService {
	@PersistenceContext(name = "CordieManagement")
	private EntityManager em;

	public DiagramSession getDiagramSessionById(long id) {
		return em.find(DiagramSession.class, id);
	}

	public DiagramSession getDiagramSessionByDiagramId(long diagramId) {
		try {
			DiagramSession diagramSession = (DiagramSession) em
					.createQuery("SELECT ds FROM DiagramSession ds JOIN ds.diagram d WHERE d.id = :diagramId")
					.setParameter("diagramId", diagramId).getSingleResult();
			
			diagramSession = em.find(DiagramSession.class, diagramSession.getId());
			em.refresh(diagramSession);

			return diagramSession;
		} catch (NoResultException e) {
			return null;
		}
	}

	public void insertDiagramSession(DiagramSession diagramSession) {
		em.persist(diagramSession);
	}

	public void updateDiagramSession(DiagramSession diagramSession) {
		em.merge(diagramSession);
	}

	public void deleteDiagramSession(DiagramSession diagramSession) {
		if (!em.contains(diagramSession)) {
			diagramSession = em.merge(diagramSession);
		}
		em.remove(diagramSession);
		em.flush();
	}
}
