<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Profile</title>
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
        <br/>
        <table width="300" align="center" border="0" cellpadding="2">
            <thead>
                <tr>
                    <th colspan="2">
                        <div class="displayPicContainer">
                            <img class="displayPic" src="DisplayPicture?imgTitle=<%= session.getAttribute("DISPLAYPIC") %>"
                                 alt="display picture"/>
                        </div>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Username: </td>
                    <td><%= session.getAttribute("USERNAME") %></td>
                </tr>
                <tr>
                    <td>First Name: </td>
                    <td><%= session.getAttribute("FIRSTNAME") %></td>
                </tr>
                <tr>
                    <td>Last Name: </td>
                    <td><%= session.getAttribute("LASTNAME") %></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><%= session.getAttribute("EMAIL") %></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2"><a href="editprofile.jsp">Edit Profile Information</a></td>
                </tr>
                <tr>
                    <td colspan="2"><a href="editpassword.jsp">Edit Your Password</a></td>
                </tr>
            </tbody>
        </table>

        <br/>
        <br/>

        <div id="main-footer">
           All Rights Reserved. Copyright © 2012 University of the Philippines Manila
        </div>
      </div>

        
    </body>
</html>
