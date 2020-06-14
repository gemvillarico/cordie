<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Log In Failed</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/icon.gif">
        <link rel="stylesheet" type="text/css" href="css/cordie.css"/>
    </head>
    <body>
      <div id="main-header">
         <img src="images/cordie banner.png">
<%  if(session != null && session.getAttribute("USERNAME") != null) { %>
         <div id="usernameDisplay">You are logged in <%= session.getAttribute("FIRSTNAME") %>.</div>
<%  } %>
      </div>
      <div id="menu">
         <ul id="menulist">
            <li class="home"><a href="index.jsp">Home</a></li>
<%  if(session == null || session.getAttribute("USERNAME") == null) { %>
            <li><a href="login.jsp">Log In</a></li>
            <li><a href="signup.jsp">Register</a></li>
            <li id="empty"></li>
<%  } else { %>
            <li><a href="members/profile.jsp">Profile</a></li>
            <li><a href="members/diagrams.jsp">Diagrams</a></li>
            <li><a href="logout.jsp">Log Out</a></li>
            <li id="empty2"></li>
<%  } %>
         </ul>
      </div>
      <div id="main-content">
<% if(session == null || session.getAttribute("USERNAME") == null) { %>
        <div>
            <form name="loginForm" action="LogInExec" method="POST">
                <br/>
                <div style="text-align:center">Log in failed. Please try again.</div>
                <br/>
                <table width="300" align="center" border="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th colspan="2">Log In Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="112"><b>Username</b></td>
                            <td width="188"><input type="text" name="username" value="" size="25" /></td>
                        </tr>
                        <tr>
                            <td><b>Password</b></td>
                            <td><input type="password" name="password" value="" size="25" /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Log In" name="Submit" /></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center"><a href="signup.jsp">Create an account</a></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
<% } else {
         response.sendRedirect("./members/home.jsp");
   } %>
            <br/>
            <br/>

            <div id="main-footer">
               All Rights Reserved. Copyright © 2012 University of the Philippines Manila
            </div>
      </div>
    </body>
</html>
