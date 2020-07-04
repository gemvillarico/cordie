package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cordie.model.User;

@Stateless
public class UserService {
	@PersistenceContext(name = "CordieManagement")
	private EntityManager em;

	public User getUserByUsername(String username) {
		try {
			
			User user = (User) em.createQuery("SELECT u FROM User u WHERE u.username = :username")
					.setParameter("username", username).getSingleResult();
			
			user = em.find(User.class, user.getId());
			em.refresh(user);
			
			return user;
		} catch (NoResultException nre) {
			return null;
		}
	}
	
	public void insertUser(User user) {
		em.persist(user);
	}

	public void updateUser(User user) {
		em.merge(user);
	}
}
