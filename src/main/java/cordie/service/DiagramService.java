package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import cordie.model.Diagram;

@Stateless
public class DiagramService {
	@PersistenceContext
    private EntityManager em;
	
	public Diagram getDiagramById(long id) {
		return em.find(Diagram.class, id);
	}
	
	public Diagram getDiagramByIdAndUsername(long diagramId, String username) {
		return (Diagram) em.createQuery("SELECT d FROM Diagram d JOIN d.collaborators c WHERE d.id = :diagramId and :username IN (c.username)")
				.setParameter("diagramId", diagramId)
				.setParameter("username", username)
				.getSingleResult();
	}
	
	public void insertDiagram(Diagram diagram) {
		em.getTransaction().begin();
		em.persist(diagram);
		em.getTransaction().commit();
	}
	
	public void updateDiagram(Diagram diagram) {
		em.merge(diagram);
		em.flush();
	}
}
