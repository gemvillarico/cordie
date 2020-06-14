
<%
    String objects[] = {"rectangle", "ellipse", "text", "line", "path", "class", 
                        "note", "bezier", "polygon", "polyline", "instance", "node",
                        "statebox", "expansionregion", "arrowhead", "activationbar",
                        "lifeline", "deletion", "initialps", "finalstate", "shallowhistps",
                        "deephistps", "initialnode", "finalnode", "blackbar", "diamond",
                        "pin", "flowfinal", "port", "frame", "package1", "package2",
                        "component", "artifact", "usecase", "actor", "superstate",
                        "action", "subactivity", "timesignal", "acceptsignal",
                        "sendsignal", "connector", "transformation", "part"};
    String objecttype[] = {"Rectangle", "Ellipse", "Text", "Line", "Path", "Class",
                        "Note", "Bezier", "Polygon", "Polyline", "Instance Specification",
                        "Node", "Statebox", "Expansion Region", "Arrowhead", "Activation Bar",
                        "Lifeline", "Deletion", "Initial Pseudostate", "Final State",
                        "Shallow History Pseudostate", "Deep History Pseudostate",
                        "Initial Node", "Final Node", "Black Bar", "Diamond", "Pin",
                        "Flow Final", "Port", "Frame", "Small Package", "Large Package",
                        "Component", "Artifact", "Use Case", "Actor", "Superstate",
                        "Action", "Subactivity", "Time Signal", "Accept Signal",
                        "Send Signal", "Connector", "Transformation", "Part"};
    String styles[][] = { {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"label", "x", "y", "width", "height", "textcolor",
                                "fontstyle", "fontweight", "fontsize", "fontfamily",
                                "rotate", "z-order"},
                          {"arrowstyle1", "arrowstyle2", "linestyle", "x1",
                                "y1", "x2", "y2", "linewidth", "linecap", "linejoin",
                                "strokestyle", "z-order"},
                          {"strokestyle", "linewidth", "linecap", "linejoin",
                                "z-order"},
                          {"fontsize", "x", "y", "width", "height", "linewidth",
                                "linecap", "linejoin", "strokestyle", "fillcolor",
                                "classfontsize", "textcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"arrowstyle1", "arrowstyle2", "linestyle", "x1",
                                "y1", "x2", "y2", "ctrl1x", "ctrl1y", "ctrl2x",
                                "ctrl2y", "linewidth", "linecap", "linejoin",
                                "strokestyle", "z-order"},
                          {"strokestyle", "linewidth", "linecap", "linejoin",
                                "fillcolor", "z-order"},
                          {"arrowstyle1", "arrowstyle2", "linestyle", "linewidth",
                               "linecap", "linejoin", "strokestyle", "z-order"},
                          {"fontsize", "x", "y", "width", "height", "linewidth",
                                "linecap", "linejoin", "strokestyle", "fillcolor",
                                "textcolor", "rotate", "z-order"},
                          {"fontsize", "x", "y", "width", "height", "topheight", 
                               "linewidth", "linecap", "linejoin", "strokestyle",
                               "fillcolor", "textcolor", "rotate", "z-order"},
                          {"fontsize", "x", "y", "width", "height", "linewidth",
                               "linecap", "linejoin", "strokestyle", "fillcolor",
                               "textcolor", "rotate", "z-order"},
                          {"x", "y", "listboxpin1x", "listboxpin1y", "listboxpin2x",
                               "listboxpin2y", "listboxpinsize", "width", "height",
                               "linewidth", "linecap", "linejoin", "strokestyle",
                               "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "linewidth", "linecap",
                                "linejoin", "strokestyle", "fillcolor", "rotate",
                                "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"},
                          {"x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate", "z-order"}
                        };
    String properties[][] = { {}, {}, {}, {}, {}, 
                                {"classname", "abstractclass", "templateclass",
                                        "activeclass", "qualifiedassociation",
                                        "qualifier", "stereotype", "showattributes",
                                        "showoperations"}, {}, {}, {}, {},
                                {"instancename", "classname", "showattributes"},
                                {"nodename", "stereotype", "showartifacts"},
                                {"statename", "showinternalactivities"}, {}, {},
                                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                                {}, {}, {}, {}, {}, {}
                            };
%>

<div id="propertiesBox">
    <div id="propertiesBoxTabs">
        <ul>
            <li id="styleTab" style="display: none;"><a id="styleTab2" href="javascript:styleTab()">Style</a></li>
            <li id="propertiesTab" style="display: none;"><a id="propertiesTab2" href="javascript:propertiesTab()">Properties</a></li>
            <li id="attributesTab" style="display: none;"><a id="attributesTab2" href="javascript:attributesTab()">Attributes</a></li>
            <li id="operationsTab" style="display: none;"><a id="operationsTab2" href="javascript:operationsTab()">Operations</a></li>
            <li id="templatesTab" style="display: none;"><a id="templatesTab2" href="javascript:templatesTab()">Templates</a></li>
            <li id="taggedvaluesTab" style="display: none;"><a id="taggedvaluesTab2" href="javascript:taggedvaluesTab()">Tagged Values</a></li>
            <li id="artifactsTab" style="display: none;"><a id="artifactsTab2" href="javascript:artifactsTab()">Artifacts</a></li>
            <li id="internalactivitiesTab" style="display: none;"><a id="internalactivitiesTab2" href="javascript:internalactivitiesTab()">Internal Activities</a></li>
        </ul>
    </div>
    
    <div id="propertiesTable">
<%  for(int i = 0; i < objects.length; i++) { %>
        <table id="<%= objects[i] %>StyleTable" style="display: none;">
            <tr><th colspan="2">Style</th></tr>
            <tr>
                <td>Object Type</td>
                <td><%= objecttype[i] %></td>
            </tr>
            <%  for(String style : styles[i]) { %>
            <tr>
                <td><%= style %></td>
                <td>
                <% if(style.equals("x") || style.equals("y") ||
                      style.equals("x1") || style.equals("y1") ||
                      style.equals("x2") || style.equals("y2") ||
                      style.equals("ctrl1x") || style.equals("ctrl1y") ||
                      style.equals("ctrl2x") || style.equals("ctrl2y") ||
                      style.equals("listboxpin1x") || style.equals("listboxpin1y") ||
                      style.equals("listboxpin2x") || style.equals("listboxpin2y")) { %>
                    <input type="text" id="<%= objects[i] %>_<%= style %>"
                                onchange="javascript:changeXY('<%= style %>', value, '<%= objects[i] %>')"/>
                <% } else if(style.equals("width") || style.equals("height") ||
                             style.equals("linewidth") || style.equals("listboxpinsize") ||
                             style.equals("topheight") || style.equals("fontsize") ||
                             style.equals("classfontsize") || style.equals("rotate")) { %>
                    <input type="text" id="<%= objects[i] %>_<%= style %>"
                                onchange="javascript:changeFloat('<%= style %>', value, '<%= objects[i] %>')"/>
                <% } else if(style.equals("z-order")) { %>
                    <input type="text" id="<%= objects[i] %>_<%= style %>" readonly/>
                    <input type="image" src="../images/up.png" title="Move Up"
                       class="upZOrderButton" onclick="javascript:zOrderUp()"/>
                    <input type="image" src="../images/down.png" title="Move Down"
                       class="downZOrderButton" onclick="javascript:zOrderDown()"/>
                <% } else if(style.equals("label")) {
                        if(objects[i].equals("note") || objects[i].equals("text")) { %>
                    <textarea id="<%= objects[i] %>_<%= style %>" rows="5"
                              cols="15" onchange="javascript:change('<%= style %>', value)">
                    </textarea>
                <%      } else { %>
                    <input id="<%= objects[i] %>_<%= style %>" type="text"
                               onchange="javascript:change('<%= style %>', value)"/>
                <%        }
                   } else if(style.equals("strokestyle") || style.equals("fillcolor") || style.equals("textcolor")) { %>
                    <!--R: <input type="text" class="rgbaInput" id="<%= objects[i] %>_<%= style %>_R"
                                onchange="javascript:changeColor('<%= objects[i] %>', '<%= style %>')"/>
                    G: <input type="text" class="rgbaInput" id="<%= objects[i] %>_<%= style %>_G"
                                onchange="javascript:changeColor('<%= objects[i] %>', '<%= style %>')"/>
                    B: <input type="text" class="rgbaInput" id="<%= objects[i] %>_<%= style %>_B"
                                onchange="javascript:changeColor('<%= objects[i] %>', '<%= style %>')"/>-->
                    <input class="color" value="" onchange="javascript:changeColor('<%= objects[i] %>', '<%= style %>')"
                           id="<%= objects[i] %>_<%= style %>"/>
                    a: <input type="text" class="rgbaInput" id="<%= objects[i] %>_<%= style %>_A"
                                onchange="javascript:changeColor('<%= objects[i] %>', '<%= style %>')"/>
                <% } else if(style.equals("fontstyle")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="normal">Normal</option>
                        <option value="italic">Italic</option>
                    </select>
                <% } else if(style.equals("fontweight")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                    </select>
                <% } else if(style.equals("fontfamily")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="sans-serif">Sans-serif</option>
                    </select>
                <% } else if(style.equals("linecap")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="butt">Butt</option>
                        <option value="round">Round</option>
                        <option value="square">Square</option>
                    </select>
                <% } else if(style.equals("linejoin")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="miter">Miter</option>
                        <option value="round">Round</option>
                        <option value="bevel">Bevel</option>
                    </select>
                <% } else if(style.equals("arrowstyle1") || style.equals("arrowstyle2")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="none">None</option>
                        <option value="lines">Lines</option>
                        <option value="half head">Half-head</option>
                        <option value="hollow triangle">Hollow Triangle</option>
                        <option value="filled triangle">Filled Triangle</option>
                        <option value="hollow diamond">Hollow Diamond</option>
                        <option value="filled diamond">Filled Diamond</option>
                        <option value="ball">Ball</option>
                        <option value="socket">Socket</option>
                    </select>
                <% } else if(style.equals("linestyle")) { %>
                    <select id="<%= objects[i] %>_<%= style %>" onchange="javascript:change('<%= style %>', value)">
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                    </select>
                <% } else { %>
                    <input type="text" id="<%= objects[i] %>_<%= style %>"
                                onchange="javascript:change('<%= style %>', value)"/>
                <% } %>
                </td>
            </tr>
            <%  } %>
            <%  if(objects[i].equals("polygon") || objects[i].equals("polyline")) { %>
            <tr>
                <td colspan="2">
                    <input id="<%= objects[i] %>_addpoint" type="button" value="Add Point"
                           onclick="javascript:addPoint()"/>
                    <div id="<%= objects[i] %>_addpoint_message" style="display: none;">
                    Click the canvas to add a point.</div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input id="<%= objects[i] %>_removepoint" type="button" value="Remove Point"
                           onclick="javascript:removePoint()"/>
                    <div id="<%= objects[i] %>_removepoint_message" style="display: none;">
                        Click the canvas to remove a point.</div>
                </td>
            </tr>
            <%  } %>
        </table>
        <table id="<%= objects[i] %>PropertiesTable" style="display: none;">
            <tr><th colspan="2">Properties</th></tr>
            <%  for(String property : properties[i]) { %>
            <tr>
                <td><%= property %></td>
                <% if(property.equals("qualifiedassociation") || property.equals("activeclass") ||
                      property.equals("templateclass") || property.equals("abstractclass") ||
                      property.equals("showattributes") || property.equals("showoperations") ||
                      property.equals("showartifacts") || property.equals("showinternalactivities")) { %>
                        <td>
                            <input type="checkbox" id="<%= objects[i] %>_<%= property %>"
                                   name="" value="" 
                                   onclick="javascript:changeBoolean('<%= property %>', checked)" />
                        </td>
                <% } else { %>
                    <td> <input type="text" id="<%= objects[i] %>_<%= property %>"
                                onchange="javascript:change('<%= property %>', value)"/> </td>
                <% } %>
            </tr>
            <%  } %>
        </table>
<%  } %>

        <table id="attributesTable" style="display: none;">
            <tr><th colspan="2">Attributes</th></tr>
            <tr>
                <td rowspan="4"> <select id="attributesList" size="4"
                                         onchange="javascript:itemSelect('attribute')"/>
                </td>
                <td> <input type="button" value="New" onclick="javascript:itemNew('attribute')"/> </td>
            </tr>
            <tr> <td> <input type="button" id="attributeDelete" value="Delete" disabled
                             onclick="javascript:itemDelete('attribute')"/> </td> </tr>
            <tr> <td> <input type="button" id="attributeUp" value="Up" disabled
                             onclick="javascript:itemUp('attribute')"/> </td> </tr>
            <tr> <td> <input type="button" id="attributeDown" value="Down" disabled
                             onclick="javascript:itemDown('attribute')"/> </td> </tr>
            <tr>
                <td> <input type="text" id="attributeEdit" disabled
                            onchange="javascript:itemEdit('attribute', 'value', value)"/> </td>
                <td> <label><input type="checkbox" id="attributeStatic" value="static"
                            onclick="javascript:itemEdit('attribute', 'static', checked)"
                            disabled /> Static</label>
                </td>
            </tr>
        </table>
        <table id="operationsTable" style="display: none;">
            <tr><th colspan="2">Operations</th></tr>
            <tr>
                <td rowspan="4"> <select id="operationsList" size="4"
                                         onchange="javascript:itemSelect('operation')"/>
                </td>
                <td> <input type="button" value="New" onclick="javascript:itemNew('operation')"/> </td>
            </tr>
            <tr> <td> <input type="button" id="operationDelete" value="Delete" disabled
                             onclick="javascript:itemDelete('operation')"/> </td> </tr>
            <tr> <td> <input type="button" id="operationUp" value="Up" disabled
                             onclick="javascript:itemUp('operation')"/> </td> </tr>
            <tr> <td> <input type="button" id="operationDown" value="Down" disabled
                             onclick="javascript:itemDown('operation')"/> </td> </tr>
            <tr>
                <td> <input type="text" id="operationEdit" disabled
                            onchange="javascript:itemEdit('operation', 'value', value)"/> </td>
                <td><label><input type="checkbox" id="operationStatic" value="static"
                            onclick="javascript:itemEdit('operation', 'static', checked)"
                            disabled />Static</label>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <label><input type="checkbox" id="operationAbstract" value="abstract"
                            onclick="javascript:itemEdit('operation', 'abstract', checked)"
                            disabled />Abstract</label>
                </td>
            </tr>
        </table>
        <table id="templatesTable" style="display: none;">
            <tr><th colspan="2">Templates</th></tr>
            <tr>
                <td rowspan="4"> <select id="templatesList" size="4"
                                         onchange="javascript:itemSelect('template')"/>
                </td>
                <td> <input type="button" value="New" onclick="javascript:itemNew('template')"/> </td>
            </tr>
            <tr> <td> <input type="button" id="templateDelete" value="Delete" disabled
                             onclick="javascript:itemDelete('template')"/> </td> </tr>
            <tr> <td> <input type="button" id="templateUp" value="Up" disabled
                             onclick="javascript:itemUp('template')"/> </td> </tr>
            <tr> <td> <input type="button" id="templateDown" value="Down" disabled
                             onclick="javascript:itemDown('template')"/> </td> </tr>
            <tr>
                <td> <input type="text" id="templateEdit" disabled
                            onchange="javascript:itemEdit('template', 'value', value)"/> </td>
            </tr>
        </table>
        <table id="taggedvaluesTable" style="display: none;">
            <tr><th colspan="2">Tagged Values</th></tr>
            <tr>
                <td rowspan="4"> <select id="taggedvaluesList" size="4"
                                         onchange="javascript:itemSelect('taggedvalue')"/>
                </td>
                <td> <input type="button" value="New" onclick="javascript:itemNew('taggedvalue')"/> </td>
            </tr>
            <tr> <td> <input type="button" id="taggedvalueDelete" value="Delete" disabled
                             onclick="javascript:itemDelete('taggedvalue')"/> </td> </tr>
            <tr> <td> <input type="button" id="taggedvalueUp" value="Up" disabled
                             onclick="javascript:itemUp('taggedvalue')"/> </td> </tr>
            <tr> <td> <input type="button" id="taggedvalueDown" value="Down" disabled
                             onclick="javascript:itemDown('taggedvalue')"/> </td> </tr>
            <tr>
                <td> <input type="text" id="taggedvalueEdit" disabled
                            onchange="javascript:itemEdit('taggedvalue', 'value', value)"/> </td>
            </tr>
        </table>
        <table id="containedartifactsTable" style="display: none;">
            <tr><th colspan="2">Artifacts</th></tr>
            <tr>
                <td rowspan="4"> <select id="containedartifactsList" size="4"
                                         onchange="javascript:itemSelect('containedartifact')"/>
                </td>
                <td> <input type="button" value="New" onclick="javascript:itemNew('containedartifact')"/> </td>
            </tr>
            <tr> <td> <input type="button" id="containedartifactDelete" value="Delete" disabled
                             onclick="javascript:itemDelete('containedartifact')"/> </td> </tr>
            <tr> <td> <input type="button" id="containedartifactUp" value="Up" disabled
                             onclick="javascript:itemUp('containedartifact')"/> </td> </tr>
            <tr> <td> <input type="button" id="containedartifactDown" value="Down" disabled
                             onclick="javascript:itemDown('containedartifact')"/> </td> </tr>
            <tr>
                <td> <input type="text" id="containedartifactEdit" disabled
                            onchange="javascript:itemEdit('containedartifact', 'value', value)"/> </td>
            </tr>
        </table>
        <table id="internalactivitiesTable" style="display: none;">
            <tr><th colspan="2">Internal Activities</th></tr>
            <tr>
                <td rowspan="4"> <select id="internalactivitiesList" size="4"
                                         onchange="javascript:itemSelect('internalactivity')"/>
                </td>
                <td> <input type="button" value="New" onclick="javascript:itemNew('internalactivity')"/> </td>
            </tr>
            <tr> <td> <input type="button" id="internalactivityDelete" value="Delete" disabled
                             onclick="javascript:itemDelete('internalactivity')"/> </td> </tr>
            <tr> <td> <input type="button" id="internalactivityUp" value="Up" disabled
                             onclick="javascript:itemUp('internalactivity')"/> </td> </tr>
            <tr> <td> <input type="button" id="internalactivityDown" value="Down" disabled
                             onclick="javascript:itemDown('internalactivity')"/> </td> </tr>
            <tr>
                <td> <input type="text" id="internalactivityEdit" disabled
                            onchange="javascript:itemEdit('internalactivity', 'value', value)"/> </td>
            </tr>
        </table>
    </div>
</div>
