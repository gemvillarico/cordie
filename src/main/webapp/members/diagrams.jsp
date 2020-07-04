<%@page import="org.apache.commons.text.StringEscapeUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cordie - Diagrams</title>
        <link rel="shortcut icon" type="image/x-icon" href="../images/icon.gif">
        <script type="text/javascript" src="diagramspage.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/cordie.css"/>
    </head>
    <body onLoad="init('<%= StringEscapeUtils.escapeEcmaScript((String) session.getAttribute("USERNAME")) %>')">
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
        <br/>
        <div>
            <input type="button" value="Refresh List" onclick="javascript:getDiagramList()"/>
            <input id="newDiagram" type="button" value="New Diagram" onclick="javascript:newDiagram()"/>
            <br/><br/>

            <table id="diagramListTable" border="1" cellspacing="0" cellpadding="2">
                <thead>
                    <tr>
                        <th width="175px">Title</th>
                        <th width="200px">Description</th>
                        <th width="150px">Creator</th>
                        <th width="175px">Date Created</th>
                        <th width="175px">Collaborators</th>
                        <th width="45px"></th>
                        <th width="45px"></th>
                        <th width="45px"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <br/>
        <br/>

        <div id="main-footer">
           All Rights Reserved. Copyright © 2012 University of the Philippines Manila
        </div>
      </div>
    </body>
</html>
