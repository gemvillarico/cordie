package cordie;

import java.io.IOException;
import java.security.MessageDigest;
import java.util.Base64;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cordie.model.User;
import cordie.service.UserService;

public class LogInExec extends HttpServlet {
	private static final long serialVersionUID = -4936582145412223157L;

	@Inject
	private UserService userService;

	public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		
		String username = request.getParameter("username");
        String password = request.getParameter("password");
        
		User user = userService.getUserByUsername(username);
		
		try {
			if (user != null && user.getPassword().equals(LogInExec.encode(password))) {
				request.getSession().setAttribute("USERNAME", user.getUsername());
			    request.getSession().setAttribute("FIRSTNAME", user.getFirstname());
			    request.getSession().setAttribute("LASTNAME", user.getLastname());
			    request.getSession().setAttribute("EMAIL", user.getEmail());
			    
			    response.sendRedirect("index.jsp");
			    return;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		response.sendRedirect("loginfailed.jsp");
    }
    
	public static String encode(String in) throws Exception {
		if (in == null) {
			return null;
		}

		try {
			MessageDigest md = MessageDigest.getInstance("MD5", "SUN");
			
			byte[] raw = null;
			byte[] stringBytes = null;
			stringBytes = in.getBytes("UTF8");
			synchronized (md) {
				raw = md.digest(stringBytes);
			}
			return Base64.getEncoder().encodeToString(raw);
		} catch (Exception se) {
			throw new Exception("Exception while encoding " + se);
		}
	}

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
