package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cordie.model.Diagram;

@Stateless
public class DiagramService {
	@PersistenceContext(name = "CordieManagement")
	private EntityManager em;

	public Diagram getDiagramById(long id) {
		return em.find(Diagram.class, id);
	}

	public Diagram getDiagramByIdAndUsername(long diagramId, String username) {
		try {
			
			Diagram diagram = (Diagram) em.createQuery(
					"SELECT d FROM Diagram d JOIN d.collaborators c WHERE d.id = :diagramId and :username IN (c.username)")
					.setParameter("diagramId", diagramId).setParameter("username", username).getSingleResult();
			
			diagram = em.find(Diagram.class, diagram.getId());
			em.refresh(diagram);
			
			return diagram;
		} catch (NoResultException nre) {
			return null;
		}
	}

	public void insertDiagram(Diagram diagram) {
		em.persist(diagram);
	}

	public void updateDiagram(Diagram diagram) {
		em.merge(diagram);
	}
	
	public void deleteDiagram(Diagram diagram) {
		if (!em.contains(diagram)) {
			diagram = em.merge(diagram);
		}
		em.remove(diagram);
		em.flush();
	}
}
