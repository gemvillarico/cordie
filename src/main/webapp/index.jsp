<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cordie</title>
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
            <p>Welcome to Cordie!</p>
            <p>Cordie is a web-based UML diagram creation application that
                allows users to collaborate with each other in real-time.
                Once signed in, users can create new diagrams, edit, and
                collaborate with others.</p>
            <h3>Draw Diagrams</h3>
            <p>
                Diagrams can be created easily since Cordie provides the
                necessary editing tools to assist users in editing their
                diagrams. Adding UML notational elements and other basic shapes
                is supported. Users can also create diagrams aside from UML
                diagrams, such as mind maps and sketches.
            </p>
            <h3>Web-based</h3>
            <p>Anyone can sign in to Cordie and start creating diagrams. There's
                no installation required; users only need a web browser and
                access to the Internet to be able to start editing diagrams and
                collaborate with others.
            </p>
            <h3>Collaborate Real-time</h3>
            <p>Multiple users can share and simultaneously edit a single
                diagram. Team members are able to collaborate in real-time even
                if they are physically separated.
            </p>
            <br/>
            <br/>

            <div id="main-footer">
               All Rights Reserved. Copyright © 2012 University of the Philippines Manila
            </div>
      </div>
    </body>
</html>
