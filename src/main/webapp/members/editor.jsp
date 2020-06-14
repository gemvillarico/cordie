<%@page import="org.apache.commons.lang3.StringEscapeUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cordie Editor</title>
        <link rel="shortcut icon" type="image/x-icon" href="../images/icon.gif">
        <link rel="stylesheet" type="text/css" href="../css/cordie.css"/>
        <link rel="stylesheet" type="text/css" href="../css/cordie-editor.css"/>
        <script type="text/javascript" src="editor/javascript/defaults.js"></script>
        <script type="text/javascript" src="editor/javascript/editor.js"></script>
        <script type="text/javascript" src="editor/javascript/diagram shapes 1.js"></script>
        <script type="text/javascript" src="editor/javascript/diagram shapes 2.js"></script>
        <script type="text/javascript" src="editor/javascript/diagram shapes 3.js"></script>
        <script type="text/javascript" src="editor/javascript/diagram shapes 4.js"></script>
        <script type="text/javascript" src="editor/javascript/communication.js"></script>
        <script type="text/javascript" src="editor/javascript/canvas.js"></script>
        <script type="text/javascript" src="editor/javascript/tools.js"></script>
        <script type="text/javascript" src="editor/javascript/tools 2.js"></script>
        <script type="text/javascript" src="editor/javascript/operations.js"></script>
        <script type="text/javascript" src="editor/javascript/objects.js"></script>
        <script type="text/javascript" src="editor/javascript/properties box 1.js"></script>
        <script type="text/javascript" src="editor/javascript/properties box 2.js"></script>
        <script type="text/javascript" src="editor/javascript/collaborators.js"></script>
        <script type="text/javascript" src="editor/javascript/developer.js"></script>
        <script type="text/javascript" src="editor/javascript/jsBezier-0.3-min.js"></script>
        <script type="text/javascript" src="editor/javascript/jscolor/jscolor.js"></script>
    </head>

    <body onload="javascript:init('<%= StringEscapeUtils.escapeEcmaScript((String)
            session.getAttribute("USERNAME")) %>', '<%= request.getParameter("diagram_id") %>')">
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
        <div id="header">
        </div>

        <div id="content">
            <div id="canvasArea">
                <canvas id="drawingArea" width="800px" height="500px"></canvas>
                <div id="textAreaPopUp">
                    <textarea id="textValueInput"></textarea>
                    <input type="button" value="save" id="saveText" onclick="saveText();">
                </div>
            </div>

            <div id="rightBoxes">
                <div id="rightBox1">
                    <jsp:include page="editor/toolbox.jsp"/>
                </div>

                <div id="rightBox2">
                    <div id="boxMenu">
                        <ul>
                            <li><a id="propertiesTabButton" href="javascript:propertiesBoxTab()">Selected Object</a></li>
                            <li><a id="collaboratorsTabButton" href="javascript:collaboratorsTab()">Collaborators</a></li>
                            <li><a id="recentChangesTabButton" href="javascript:recentChangesTab()">Recent Changes</a></li>
                        </ul>
                    </div>

                    <div id="boxTab">
                        <jsp:include page="editor/properties box.jsp" />

                        <jsp:include page="editor/developer.jsp" />

                        <jsp:include page="editor/collaborators.jsp" />
                    </div>
                </div>
            </div>
        </div>

        <div id="error" style="display: none;">
            <span style="color: #FF6600; font-weight: bold;">Error </span>
            <span id="errorMessage"></span>
        </div>

        <div id="footer">
        </div>

        <iframe id="downloadFrame" style="display:none;"></iframe>

            <br/>
            <br/>

            <div id="main-footer">
               All Rights Reserved. Copyright © 2012 University of the Philippines Manila
            </div>
      </div>
    </body>
</html>
