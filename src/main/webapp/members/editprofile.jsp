<%@page import="org.apache.commons.lang3.StringEscapeUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="javax.servlet.*"%>
<%@page import="javax.servlet.http.*"%>
<%@page import="org.apache.commons.fileupload.*"%>
<%@page import="org.apache.commons.fileupload.disk.*"%>
<%@page import="org.apache.commons.fileupload.servlet.*"%>
<%@page import="java.sql.*"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Edit Profile</title>
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
<% if(request.getMethod().equals("POST")) {
       String firstname = "";
       String lastname = "";
       String email = "";

       try {
           Class.forName("com.mysql.jdbc.Driver");
           Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/Cordie", "Cordie", "pSJcwyTNSeLHAAV2");
           //Statement statement = connection.createStatement();

           File file ;
           int maxFileSize = 5000 * 1024;
           int maxMemSize = 5000 * 1024;
           String filePath = "uploaded_images/";
           FileItem uploadedImage = null;
           String extension = "";

           // Verify the content type
           String contentType = request.getContentType();
           if((contentType.indexOf("multipart/form-data") >= 0)) {
               DiskFileItemFactory factory = new DiskFileItemFactory();
               factory.setSizeThreshold(maxMemSize);
               factory.setRepository(new File(""));

               ServletFileUpload upload = new ServletFileUpload(factory);
               upload.setSizeMax( maxFileSize );
               try {
                   // Parse the request to get file items.
                   List fileItems = upload.parseRequest(request);
                   // Process the uploaded file items
                   Iterator i = fileItems.iterator();

                   while (i.hasNext()) {
                       FileItem item = (FileItem) i.next();

                       if(item.isFormField()) {
                           if(item.getFieldName().equals("firstname")) {
                               firstname = item.getString();
                           } else if(item.getFieldName().equals("lastname")) {
                               lastname = item.getString();
                           } else if(item.getFieldName().equals("email")) {
                               email = item.getString();
                           }
                       } else {
                           String fileName = item.getName();

                           if(!fileName.equals("")) {
                               if(fileName.lastIndexOf(".") >= 0) {
                                   extension = fileName.substring(fileName.lastIndexOf("."));
                               }

                               uploadedImage = item;
                           }
                       }
                   } // end while
               } catch(Exception ex) {
                   System.out.println(ex);
               }
           }

           if(uploadedImage != null) {
               String sql = "UPDATE user SET firstname = ?, lastname = ?, email = ?"
                   + ", displaypic = ? WHERE username = ?";
               PreparedStatement stmt = connection.prepareStatement(sql);
               stmt.setString(1, firstname);
               stmt.setString(2, lastname);
               stmt.setString(3, email);
               stmt.setString(4, session.getAttribute("USERNAME") + extension);
               stmt.setString(5, (String) session.getAttribute("USERNAME"));
               stmt.executeUpdate();

               File oldDP = new File(filePath + session.getAttribute("DISPLAYPIC"));
               oldDP.delete();
               uploadedImage.write(new File(filePath + session.getAttribute("USERNAME") + extension)) ;
               session.setAttribute("DISPLAYPIC", session.getAttribute("USERNAME") + extension);
           } else {
               String sql = "UPDATE user SET firstname = ?, lastname = ?, email = ?"
                   + " WHERE username = ?";
               PreparedStatement stmt = connection.prepareStatement(sql);
               stmt.setString(1, firstname);
               stmt.setString(2, lastname);
               stmt.setString(3, email);
               stmt.setString(4, (String) session.getAttribute("USERNAME"));
               stmt.executeUpdate();
           }

           session.setAttribute("FIRSTNAME", firstname);
           session.setAttribute("LASTNAME", lastname);
           session.setAttribute("EMAIL", email);
%>
        <div style="text-align: center;">
            Your changes were saved. <a href="profile.jsp">View your profile</a>
        </div>
        <br/>
        <br/>

        <div id="main-footer">
           All Rights Reserved. Copyright © 2012 University of the Philippines Manila
        </div>
      </div>
    </body>
</html>
<%         return;
           } catch (ClassNotFoundException e) {
               System.err.println("Driver Error");
           } catch (SQLException e) {
               System.err.println("SQLException: " + e.getMessage());
           }
   } else { %>
        <form name="editProfileForm" action="editprofile.jsp" method="POST" enctype="multipart/form-data">
            <table align="center" border="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>Current Display Picture</td>
                        <td>
                            <div class="displayPicContainer">
                                <img class="displayPic" src="DisplayPicture?imgTitle=<%= session.getAttribute("DISPLAYPIC") %>"
                                     alt="display picture"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Change</td>
                        <td><input type="file" name="displaypic" value="" size="25"/></td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td><input type="text" id="firstname" name="firstname" value="" size="25" maxlength="25" /></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td><input type="text" id="lastname" name="lastname" value="" size="25" maxlength="25" /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" id="email" name="email" value="" size="25" maxlength="50" /></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="Save" name="submit" /></td>
                        <td><input type="reset" value="Reset" name="reset" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
        <script type="text/javascript">
            (document.getElementById("firstname")).value = '<%= StringEscapeUtils.escapeEcmaScript((String) session.getAttribute("FIRSTNAME")) %>';
            (document.getElementById("lastname")).value = '<%= StringEscapeUtils.escapeEcmaScript((String) session.getAttribute("LASTNAME")) %>';
            (document.getElementById("email")).value = '<%= StringEscapeUtils.escapeEcmaScript((String) session.getAttribute("EMAIL")) %>';
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
