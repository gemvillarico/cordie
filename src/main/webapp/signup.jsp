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
        <title>Sign Up</title>
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
<%
   HashMap<String, String> errors = new HashMap<String, String>();;
   boolean valid = true;
   String username = "";
   String password1 = "";
   String password2 = "";
   String firstname = "";
   String lastname = "";
   String email = "";

   if(request.getMethod().equals("POST")) {
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
                           if(item.getFieldName().equals("username")) {
                               username = item.getString();
                           } else if(item.getFieldName().equals("password1")) {
                               password1 = item.getString();
                           } else if(item.getFieldName().equals("password2")) {
                               password2 = item.getString();
                           } else if(item.getFieldName().equals("firstname")) {
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

                   if(username.equals("")) {
                       errors.put("username", "Please enter a username");
                       valid = false;
                   } else {
                       //check if username is already taken
                       String sql = "SELECT COUNT(*) FROM user WHERE username = ? ";
                       PreparedStatement stmt = connection.prepareStatement(sql);
                       stmt.setString(1, username);
                       ResultSet rs = stmt.executeQuery();
                       //ResultSet rs = statement.executeQuery("SELECT COUNT(*) "
                       //        + "FROM user WHERE username = '" + username + "'");
                       rs.next();
                       if(rs.getInt(1) > 0) {
                           errors.put("username", "The username " + username +
                                   " is already taken by another user.");
                           valid = false;
                       }
                   }
                   if(password1.equals("") ) {
                       errors.put("password1", "Please enter a valid password");
                       valid = false;
                   }
                   if(!password1.equals("") && (password2.equals("") ||
                      !password1.equals(password2))) {
                       errors.put("password2", "Please make sure your passwords match.");
                       password2 = "";
                       valid = false;
                   }
               } catch(Exception ex) {
                   System.out.println(ex);
               }
           } else {
           }

           if(valid) {
               String sql = "INSERT INTO user (username, password, firstname, "
                       + "lastname, email, displaypic) VALUES( ?, md5(?), ?, ?, ?, ?)";
               PreparedStatement stmt = connection.prepareStatement(sql);
               stmt.setString(1, username);
               stmt.setString(2, password1);
               stmt.setString(3, firstname);
               stmt.setString(4, lastname);
               stmt.setString(5, email);
               stmt.setString(6, username + extension);
               stmt.executeUpdate();
               /*int i = statement.executeUpdate("INSERT INTO user (username, "
                       + "password, firstname, lastname, email, displaypic)"
                       + " VALUES('" + username + "', md5('" + password1 + "'), '"
                       + firstname + "', '" + lastname + "', '" + email + "', '"
                       + username + extension + "')");*/

               if(uploadedImage != null)
                   uploadedImage.write(new File(filePath + username + extension)) ;
%>
    <table align="center">
        <thead>
            <tr>
                <th colspan="2">User Registration Successful</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Username: </td>
                <td><%= username %></td>
            </tr>
            <tr>
                <td>Firstname: </td>
                <td><%= firstname %></td>
            </tr>
            <tr>
                <td>Lastname: </td>
                <td><%= lastname %></td>
            </tr>
            <tr>
                <td>Email: </td>
                <td><%= email %></td>
            </tr>
            <tr><td>&nbsp;</td></tr>
            <tr>
                <td colspan="2">You can now <a href="login.jsp">log in</a>.</td>
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
<%
               return;
           } else { %>
        <div>
            <p>Please fill in the necessary fields.</p>
        </div>
<%         }
       } catch (ClassNotFoundException e) {
           System.err.println("Driver Error");
       } catch (SQLException e) {
           System.err.println("SQLException: " + e.getMessage());
       }
   } %>
        <form name="signupForm" action="signup.jsp" method="POST" enctype="multipart/form-data">
            <table align="center">
                <thead>
                    <tr>
                        <th colspan="2">User Registration</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><font size="1" color="red"><sup>*</sup> Required Fields</font></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Username<sup>*</sup></td>
                        <td><input type="text" id="username" name="username" value="" size="25" maxlength="25"/>
                            <br><font color="red"><%= (errors.get("username") == null) ? "" : errors.get("username") %></font>
                        </td>
                    </tr>
                    <tr>
                        <td>Password<sup>*</sup></td>
                        <td><input type="password" id="password1" name="password1" value="" size="25" maxlength="25" />
                            <br><font color="red"><%= (errors.get("password1") == null) ? "" : errors.get("password1") %></font>
                        </td>
                    </tr>
                    <tr>
                        <td>Retype Password<sup>*</sup></td>
                        <td><input type="password" id="password2" name="password2" value="" size="25" maxlength="25" />
                            <br><font color="red"><%= (errors.get("password2") == null) ? "" : errors.get("password2") %></font>
                        </td>
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
                        <td>Display Picture</td>
                        <td><input type="file" name="displaypic" value="" size="25"/></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="Submit" name="submit" /></td>
                        <td><input type="reset" value="Reset" name="reset" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
        <% if (!valid) { %>
        <script type="text/javascript">
            (document.getElementById("username")).value = '<%= username %>';
            (document.getElementById("password1")).value = '<%= password1 %>';
            (document.getElementById("password2")).value = '<%= password2 %>';
            (document.getElementById("firstname")).value = '<%= firstname %>';
            (document.getElementById("lastname")).value = '<%= lastname %>';
            (document.getElementById("email")).value = '<%= email %>';
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
