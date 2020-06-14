<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cordie - Error</title>
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
          <p>Only members are allowed to view this page. Please <a href="login.jsp">log in</a></p>
            <br/>
            <br/>

            <div id="main-footer">
               All Rights Reserved. Copyright © 2012 University of the Philippines Manila
            </div>
      </div>
    </body>
</html>
