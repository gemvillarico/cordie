package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import cordie.model.DiagramSessionMessage;

@Stateless
public class DiagramSessionMessageService {
	@PersistenceContext(name = "CordieManagement")
	private EntityManager em;
	
	public void insertDiagramSessionMessage(DiagramSessionMessage diagramSessionMessage) {
		em.persist(diagramSessionMessage);
	}

	public void updateDiagramSessionMessage(DiagramSessionMessage diagramSessionMessage) {
		em.merge(diagramSessionMessage);
	}
	
	public void deleteDiagramSessionMessage(DiagramSessionMessage diagramSessionMessage) {
		if (!em.contains(diagramSessionMessage)) {
			diagramSessionMessage = em.merge(diagramSessionMessage);
		}
		em.remove(diagramSessionMessage);
		em.flush();
	}
}
