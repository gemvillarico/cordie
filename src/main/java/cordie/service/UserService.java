package cordie.service;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import cordie.model.User;

@Stateless
public class UserService {
	@PersistenceContext
	private EntityManager em;

	public User getUserByUsername(String username) {
		return (User) em.createQuery("SELECT u FROM User u WHERE u.username = :username")
				.setParameter("username", username).getSingleResult();
	}
}
