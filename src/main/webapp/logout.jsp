<% session.invalidate();%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Log Out</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/icon.gif">
        <link rel="stylesheet" type="text/css" href="css/cordie.css"/>
    </head>
    <body>
      <div id="main-header">
         <img src="images/cordie banner.png">
      </div>
      <div id="menu">
         <ul id="menulist">
            <li class="home"><a href="index.jsp">Home</a></li>
            <li><a href="login.jsp">Log In</a></li>
            <li><a href="signup.jsp">Register</a></li>
            <li><a href="logout.jsp">Log Out</a></li>
            <li id="empty2"></li>
         </ul>
      </div>
      <div id="main-content">
          <p>You are now logged out. <a href="login.jsp">Log in</a> again</p>
            <br/>
            <br/>

            <div id="main-footer">
               All Rights Reserved. Copyright © 2012 University of the Philippines Manila
            </div>
      </div>
    </body>
</html>
