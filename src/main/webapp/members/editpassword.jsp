<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Edit Password</title>
        <link rel="shortcut icon" type="image/x-icon" href="../images/icon.gif">
        <link rel="stylesheet" type="text/css" href="../css/cordie.css"/>
    </head>
    <body>
      <div id="main-header">
         <img src="../images/cordie banner.png">
<%  if(session != null && session.getAttribute("USERNAME") != null) { %>
         <div id="usernameDisplay">You are logged in <%= session.getAttribute("FIRSTNAME") %>.</div>
<%  } %>
      </div>
      <div id="menu">
         <ul id="menulist">
            <li class="home"><a href="../index.jsp">Home</a></li>
<%  if(session == null || session.getAttribute("USERNAME") == null) { %>
            <li><a href="../login.jsp">Log In</a></li>
            <li><a href="../signup.jsp">Register</a></li>
            <li id="empty"></li>
<%  } else { %>
            <li><a href="profile.jsp">Profile</a></li>
            <li><a href="diagrams.jsp">Diagrams</a></li>
            <li><a href="../logout.jsp">Log Out</a></li>
            <li id="empty2"></li>
<%  } %>
         </ul>
      </div>
      <div id="main-content">
        <br/><br/>
<%
   HashMap<String, String> errors = new HashMap<String, String>();;
   boolean valid = true;
   String password = "";
   String newpassword1 = "";
   String newpassword2 = "";

   if(request.getMethod().equals("POST")) {
       try {
           password = request.getParameter("password");
           newpassword1 = request.getParameter("newpassword1");
           newpassword2 = request.getParameter("newpassword2");

           Class.forName("com.mysql.cj.jdbc.Driver");
           Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");
           //Statement statement = connection.createStatement();

           String sql = "SELECT COUNT(*) FROM user WHERE username = ? AND password = md5(?)";
           PreparedStatement stmt = connection.prepareStatement(sql);
           stmt.setString(1, (String) session.getAttribute("USERNAME"));
           stmt.setString(2, password);
           ResultSet rs = stmt.executeQuery();
           /*ResultSet rs = statement.executeQuery("SELECT COUNT(*) "
                   + "FROM user WHERE username = '" + session.getAttribute("USERNAME")
                   + "' AND password = md5('" + password + "')");*/
           rs.next();
           if(rs.getInt(1) == 0) {
               valid = false;
               errors.put("password", "Wrong Password");
           }
           if(newpassword1.equals("") ) {
               valid = false;
               errors.put("newpassword1", "Please enter a valid password");
           }
           if(!newpassword1.equals("") && (newpassword2.equals("") ||
              !newpassword1.equals(newpassword2))) {
               newpassword2 = "";
               valid = false;
               errors.put("newpassword2", "Please make sure your passwords match.");
           }

           if(valid) {
               sql = "UPDATE user SET password = md5(?) WHERE username = ?";
               stmt = connection.prepareStatement(sql);
               stmt.setString(1, newpassword1);
               stmt.setString(2, (String) session.getAttribute("USERNAME"));
               stmt.executeUpdate();
               //int i = statement.executeUpdate("UPDATE user SET password = md5('" +
               //    newpassword1 + "')" + " WHERE username='" + session.getAttribute("USERNAME") + "'");
%>
        <div style="text-align: center;">Your password has been saved. Go back to <a href="profile.jsp">profile</a></div>

        <br/>
        <br/>

        <div id="main-footer">
           All Rights Reserved. Copyright © 2012 University of the Philippines Manila
        </div>
      </div>
    </body>
</html>
<%             return;
           }

       } catch (ClassNotFoundException e) {
           System.err.println("Driver Error");
       } catch (SQLException e) {
           System.err.println("SQLException: " + e.getMessage());
       }
   }
%>
        <form name="editPasswordForm" action="editpassword.jsp" method="POST">
            <table align="center" border="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>Enter Your Password: </td>
                        <td><input id="password" type="password" name="password" value="" size="25" />
                        <br/><font color="red"><%= (errors.get("password") == null) ? "" : errors.get("password") %></font></td>
                    </tr>
                    <tr>
                        <td>Your New Password: </td>
                        <td><input id="newpassword1" type="password" name="newpassword1" value="" size="25" />
                        <br/><font color="red"><%= (errors.get("newpassword1") == null) ? "" : errors.get("newpassword1") %></font></td>
                    </tr>
                    <tr>
                        <td>Confirm New Password: </td>
                        <td><input id="newpassword2" type="password" name="newpassword2" value="" size="25" />
                        <br/><font color="red" color="red"><%= (errors.get("newpassword2") == null) ? "" : errors.get("newpassword2") %>
                        </font></td>
                    </tr>
                    <tr><td colspan="2"><input type="submit" value="Change Password" /></td></tr>
                </tbody>
            </table>
        </form>
        <% if (!valid) { %>
        <script type="text/javascript">
            (document.getElementById("password")).value = '<%= password %>';
            (document.getElementById("newpassword1")).value = '<%= newpassword1 %>';
            (document.getElementById("newpassword2")).value = '<%= newpassword2 %>';
        </script>
        <% } %>

        <br/>
        <br/>

        <div id="main-footer">
           All Rights Reserved. Copyright © 2012 University of the Philippines Manila
        </div>
      </div>
    </body>
</html>
