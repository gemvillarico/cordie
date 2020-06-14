<div id="toolBox">    
    <table id="toolSettings">
        <tbody>
            <tr>
                <td colspan="2">
                    <div id="diagramTitle"></div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <jsp:include page="basic buttons.jsp" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <select id="defaultArrowhead1" onchange="javascript:changeSetting('arrowhead1', value)">
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
                    <select id="defaultLinestyle" onchange="javascript:changeSetting('linestyle', value)">
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                    </select>
                    <select id="defaultArrowhead2" onchange="javascript:changeSetting('arrowhead2', value)">
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
                </td>
            </tr>
            <tr>
                <td>Fill Color
                    <input class="color" value="" onchange="javascript:changeColorSetting('Fill')"
                           id="defaultFill"/>
                    a: <input type="text" class="rgbaInput" id="defaultFillA"
                              onchange="javascript:changeColorSetting('Fill')"/>
                </td>
            </tr>
            <tr>
                <td>Stroke Color
                    <input class="color" value="" onchange="javascript:changeColorSetting('Stroke')"
                           id="defaultStroke"/>
                    a: <input type="text" class="rgbaInput" id="defaultStrokeA"
                              onchange="javascript:changeColorSetting('Stroke')"/>
                </td>
            </tr>
            <tr>
                <td>
                    Font Size
                    <input type="text" id="selectedFontsize"
                           onchange="javascript:changeSetting('fontsize', value)"/>
                    Font Family
                    <select id="selectedFontfamily" onchange="javascript:changeSetting('fontfamily', value)">
                        <option value="sans-serif">Sans-serif</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Text Color
                    <input class="color" value="" onchange="javascript:changeColorSetting('Text')"
                           id="defaultText"/>
                    a: <input type="text" class="rgbaInput" id="defaultTextA"
                              onchange="javascript:changeColorSetting('Text')"/>
                </td>
            </tr>
        </tbody>
    </table>
    
    <!--<table id="toolSettings">
        <tbody>
            <tr>
                <td colspan="3">
                    <select id="defaultArrowhead1" onchange="javascript:changeSetting('arrowhead1', value)">
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
                    <select id="defaultLinestyle" onchange="javascript:changeSetting('linestyle', value)">
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                    </select>
                    <select id="defaultArrowhead2" onchange="javascript:changeSetting('arrowhead2', value)">
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
                </td>
            </tr>
            <tr>
                <td><input class="color" value="66ff00"></td>
            </tr>
            <tr>
                <td>Fill</td>
                <td><div id="selectedFillColor"></div></td>
                <td>
                    R: <input type="text" class="rgbaInput" id="defaultFillR"
                              onchange="javascript:changeColorSetting('Fill')"/>
                    G: <input type="text" class="rgbaInput" id="defaultFillG"
                              onchange="javascript:changeColorSetting('Fill')"/>
                    B: <input type="text" class="rgbaInput" id="defaultFillB"
                              onchange="javascript:changeColorSetting('Fill')"/>
                    a: <input type="text" class="rgbaInput" id="defaultFillA"
                              onchange="javascript:changeColorSetting('Fill')"/>
                </td>
            </tr>
            <tr>
                <td>Stroke</td>
                <td><div id="selectedStrokeColor"></div></td>
                <td>
                    R: <input type="text" class="rgbaInput" id="defaultStrokeR"
                              onchange="javascript:changeColorSetting('Stroke')"/>
                    G: <input type="text" class="rgbaInput" id="defaultStrokeG"
                              onchange="javascript:changeColorSetting('Stroke')"/>
                    B: <input type="text" class="rgbaInput" id="defaultStrokeB"
                              onchange="javascript:changeColorSetting('Stroke')"/>
                    a: <input type="text" class="rgbaInput" id="defaultStrokeA"
                              onchange="javascript:changeColorSetting('Stroke')"/>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    Font Size
                    <input type="text" id="selectedFontsize"
                           onchange="javascript:changeSetting('fontsize', value)"/>
                    Font Family
                    <select id="selectedFontfamily" onchange="javascript:changeSetting('fontfamily', value)">
                        <option value="sans-serif">Sans-serif</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Text Color</td>
                <td><div id="selectedTextColor"></div></td>
                <td>
                    R: <input type="text" class="rgbaInput" id="defaultTextR"
                              onchange="javascript:changeColorSetting('Text')"/>
                    G: <input type="text" class="rgbaInput" id="defaultTextG"
                              onchange="javascript:changeColorSetting('Text')"/>
                    B: <input type="text" class="rgbaInput" id="defaultTextB"
                              onchange="javascript:changeColorSetting('Text')"/>
                    a: <input type="text" class="rgbaInput" id="defaultTextA"
                              onchange="javascript:changeColorSetting('Text')"/>
                </td>
            </tr>
        </tbody>
    </table>-->

    <div id="shapeButtons">
        <ul>
            <li><input type="image" src="../images/select.png" title="Select" value="select" id="select" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/line.png" title="Line" value="line" id="line" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/rectangle.png" title="Rectangle" value="rectangle" id="rectangle" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/ellipse.png" title="Ellipse" value="ellipse" id="ellipse" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/text.png" title="Text" value="text" id="text" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/polygon.png" title="Polygon" value="polygon" id="polygon" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/polyline.png" title="Polyline" value="polyline" id="polyline" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/bezier.png" title="Bezier Curve" value="bezier" id="bezier" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/path.png" title="Path" value="path" id="path" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/arrowhead.png" title="Arrowhead" value="arrowhead" id="arrowhead" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/activation bar.png" title="Activation Bar" value="activationbar" id="activationbar" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/lifeline.png" title="Lifeline" value="lifeline" id="lifeline" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/deletion.png" title="Deletion" value="deletion" id="deletion" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/initial pseudostate.png" title="Initial Pseudostate" value="initialps" id="initialps" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/final state.png" title="Final State" value="finalstate" id="finalstate" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/shallow history pseudostate.png" title="Shallow History Pseudostate" value="shallowhistps" id="shallowhistps" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/deep history pseudostate.png" title="Deep History Pseudostate" value="deephistps" id="deephistps" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/initial node.png" title="Initial Node" value="initialnode" id="initialnode" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/final node.png" title="Final Node" value="finalnode" id="finalnode" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/black bar.png" title="Black Bar" value="blackbar" id="blackbar" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/diamond.png" title="Diamond" value="diamond" id="diamond" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/pin.png" title="Pin" value="pin" id="pin" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/flow final.png" title="Flow Final" value="flowfinal" id="flowfinal" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/port.png" title="Port" value="port" id="port" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/class.png" title="Class" value="classnotation" id="classnotation" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/note.png" title="Note" value="note" id="note" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/instance specification.png" title="Instance Specification" value="instance" id="instance" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/node.png" title="Node" value="node" id="node" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/state box.png" title="State Box" value="statebox" id="statebox" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/expansion region.png" title="Expansion Region" value="expansionregion" id="expansionregion" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/frame.png" title="Frame" value="frame" id="frame" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/small package.png" title="Small Package" value="package1" id="package1" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/large package.png" title="Large Package" value="package2" id="package2" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/component.png" title="Component" value="component" id="component" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/artifact.png" title="Artifact" value="artifact" id="artifact" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/use case.png" title="Use Case" value="usecase" id="usecase" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/actor.png" title="Actor" value="actor" id="actor" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/superstate.png" title="Superstate" value="superstate" id="superstate" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/action.png" title="Action" value="action" id="action" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/subactivity.png" title="Subactivity" value="subactivity" id="subactivity" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/time signal.png" title="Time Signal" value="timesignal" id="timesignal" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/accept signal.png" title="Accept Signal" value="acceptsignal" id="acceptsignal" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/send signal.png" title="Send Signal" value="sendsignal" id="sendsignal" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/connector.png" title="Connector" value="connector" id="connector" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/transformation.png" title="Transformation" value="transformation" id="transformation" onclick="javascript:activateTool(value)"/></li>
            <li><input type="image" src="../images/part.png" title="Part" value="part" id="part" onclick="javascript:activateTool(value)"/></li>
        </ul>
    </div>
</div>