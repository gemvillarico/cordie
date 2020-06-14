package cordie;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LogInExec extends HttpServlet {
    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Connection connection = null;
        ResultSet rs;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");

            String username = request.getParameter("username");
            String password = request.getParameter("password");

            String sql = "SELECT * FROM user WHERE username = ? AND password = md5(?)";
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, password);
            rs = stmt.executeQuery();

            if(rs.next()) {
                request.getSession().setAttribute("USERNAME", rs.getString("username"));
                request.getSession().setAttribute("FIRSTNAME", rs.getString("firstname"));
                request.getSession().setAttribute("LASTNAME", rs.getString("lastname"));
                request.getSession().setAttribute("EMAIL", rs.getString("email"));
                request.getSession().setAttribute("DISPLAYPIC", rs.getString("displaypic"));

                response.sendRedirect("index.jsp");
            } else {
                response.sendRedirect("loginfailed.jsp");
            }
        } catch (ClassNotFoundException e) {
            System.err.println("Driver Error");
        } catch (SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
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
