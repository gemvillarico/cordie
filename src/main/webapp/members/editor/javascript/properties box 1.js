var OBJ_TYPE = ["rectangle", "ellipse", "text", "line", "path", "class", "note", 
                "bezier", "polygon", "polyline", "instance", "node", "statebox", 
                "expansionregion", "arrowhead", "activationbar", "lifeline", "deletion", 
                "initialps", "finalstate", "shallowhistps", "deephistps", "initialnode",
                "finalnode", "blackbar", "diamond", "pin", "flowfinal", "port",
                "frame", "package1", "package2", "component", "artifact", "usecase",
                "actor", "superstate", "action", "subactivity", "timesignal", "acceptsignal",
                "sendsignal", "connector", "transformation", "part"];
var OBJ_STYLE = {"rectangle" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "ellipse" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "text" : ["label", "x", "y", "width", "height", "textcolor", "fontstyle",
                    "fontweight", "fontsize", "fontfamily", "rotate"],
                "line" : ["arrowstyle1", "arrowstyle2", "linestyle", "x1",
                    "y1", "x2", "y2", "linewidth", "linecap", "linejoin",
                    "strokestyle"],
                "path" : ["strokestyle", "linewidth", "linecap", "linejoin"],
                "class" : ["fontsize", "x", "y", "width", "height", "linewidth",
                    "linecap", "linejoin", "strokestyle", "fillcolor",
                    "classfontsize", "textcolor", "rotate", "showattributes",
                    "showoperations"],
                "note" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "bezier" : ["arrowstyle1", "arrowstyle2", "linestyle", "x1",
                    "y1", "x2", "y2", "ctrl1x", "ctrl1y", "ctrl2x", "ctrl2y", 
                    "linewidth", "linecap", "linejoin", "strokestyle"],
                "polygon" : ["strokestyle", "linewidth", "linecap", "linejoin", "fillcolor"],
                "polyline" : ["arrowstyle1", "arrowstyle2", "linestyle", "linewidth",
                    "linecap", "linejoin", "strokestyle"],
                "instance" : ["fontsize", "x", "y", "width", "height", "linewidth",
                    "linecap", "linejoin", "strokestyle", "fillcolor",
                    "textcolor", "rotate"],
                "node" : ["fontsize", "x", "y", "width", "height", "topheight",
                    "linewidth", "linecap", "linejoin", "strokestyle", "fillcolor",
                    "textcolor", "rotate"],
                "statebox" : ["fontsize", "x", "y", "width", "height", "linewidth",
                    "linecap", "linejoin", "strokestyle", "fillcolor",
                    "textcolor", "rotate"],
                "expansionregion" : ["x", "y", "width", "height", "linewidth",
                    "linecap", "linejoin", "strokestyle", "fillcolor", "rotate",
                    "listboxpin1x", "listboxpin1y", "listboxpin2x", "listboxpin2y",
                    "listboxpinsize"],
                "arrowhead" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "activationbar" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "lifeline" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "deletion" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "initialps" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "finalstate" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "shallowhistps" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "deephistps" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "initialnode" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "finalnode" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "blackbar" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "diamond" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "pin" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "flowfinal" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "port" : ["x", "y", "width", "height", "linewidth", "linecap",
                    "linejoin", "strokestyle", "fillcolor", "rotate"],
                "frame" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "package1" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "package2" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "component" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "artifact" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "usecase" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "actor" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "superstate" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "action" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "subactivity" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "timesignal" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "acceptsignal" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "sendsignal" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "connector" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "transformation" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"],
                "part" : ["x", "y", "width", "height", "fontstyle", "fontweight",
                                "fontsize", "fontfamily", "label", "textcolor",
                                "linewidth", "linecap", "linejoin", "strokestyle",
                                "fillcolor", "rotate"]
                };
var OBJ_PROPERTIES = {"rectangle" : [], "ellipse" : [], "text" : [], "line" : [],
                      "path" : [], "class" : ["classname", "abstractclass", "templateclass",
                      "activeclass", "qualifiedassociation", "qualifier", "stereotype",
                      "showattributes", "showoperations"], "note" : [], "bezier" : [],
                      "polygon" : [], "polyline" : [], "instance" : ["instancename",
                      "classname", "showattributes"], "node" : ["nodename", "stereotype",
                      "showartifacts"], "statebox" : ["statename", "showinternalactivities"],
                      "expansionregion" : [], "arrowhead" : [], "activationbar" : [],
                      "lifeline" : [], "deletion" : [], "initialps" : [], "finalstate" : [],
                      "shallowhistps" : [], "deephistps" : [], "initialnode" : [],
                      "finalnode" : [], "blackbar" : [], "diamond" : [], "pin" : [],
                      "flowfinal" : [], "port" : [], "frame" : [], "package1" : [],
                      "package2" : [], "component" : [], "artifact" : [], "usecase" : [],
                      "actor" : [], "superstate" : [], "action" : [], "subactivity" : [],
                      "timesignal" : [], "acceptsignal" : [], "sendsignal" : [], "connector" : [],
                      "transformation" : [], "part" : []
                     };

var selectedIndex; // index of the currently selected attribute, operation or template
var itemlist = {};

function propertiesBox_init() {
    itemlist["attribute"] = (document.getElementById("attributesList"));
    itemlist["operation"] = (document.getElementById("operationsList"));
    itemlist["template"] = (document.getElementById("templatesList"));
    itemlist["containedartifact"] = (document.getElementById("containedartifactsList"));
    itemlist["taggedvalue"] = (document.getElementById("taggedvaluesList"));
    itemlist["internalactivity"] = (document.getElementById("internalactivitiesList"));
}

function hideAllPropertiesBoxTable() {
    var i = 0;
    while(OBJ_TYPE[i]) {
        (document.getElementById(OBJ_TYPE[i] + "StyleTable")).setAttribute(
            'style', 'display: none;');
        (document.getElementById(OBJ_TYPE[i] + "PropertiesTable")).setAttribute(
            'style', 'display: none;');
        i++;
    }
    (document.getElementById("attributesTable")).setAttribute('style', 'display: none;');
    (document.getElementById("operationsTable")).setAttribute('style', 'display: none;');
    (document.getElementById("templatesTable")).setAttribute('style', 'display: none;');
    (document.getElementById("containedartifactsTable")).setAttribute('style', 'display: none;');
    (document.getElementById("taggedvaluesTable")).setAttribute('style', 'display: none;');
    (document.getElementById("internalactivitiesTable")).setAttribute('style', 'display: none;');

    (document.getElementById("styleTab2")).removeAttribute('class');
    (document.getElementById("propertiesTab2")).removeAttribute('class');
    (document.getElementById("attributesTab2")).removeAttribute('class');
    (document.getElementById("operationsTab2")).removeAttribute('class');
    (document.getElementById("templatesTab2")).removeAttribute('class');
    (document.getElementById("taggedvaluesTab2")).removeAttribute('class');
    (document.getElementById("artifactsTab2")).removeAttribute('class');
    (document.getElementById("internalactivitiesTab2")).removeAttribute('class');
}

function hideAllPropertiesBoxTab() {
    (document.getElementById("styleTab")).setAttribute('style', 'display: none;');
    (document.getElementById("propertiesTab")).setAttribute('style', 'display: none;');
    (document.getElementById("attributesTab")).setAttribute('style', 'display: none;');
    (document.getElementById("operationsTab")).setAttribute('style', 'display: none;');
    (document.getElementById("templatesTab")).setAttribute('style', 'display: none;');
    (document.getElementById("taggedvaluesTab")).setAttribute('style', 'display: none;');
    (document.getElementById("artifactsTab")).setAttribute('style', 'display: none;');
    (document.getElementById("internalactivitiesTab")).setAttribute('style', 'display: none;');
}

function updatePropertiesBox() {
    hideAllPropertiesBoxTable();
    hideAllPropertiesBoxTab();
    
    if(selectedObj == null) return;

    if(OBJ_TYPE.some(function (elt) {return (elt == selectedObj.objecttype);})) {
        //propertiesBoxTab();
        
        (document.getElementById(selectedObj.objecttype +
            "StyleTable")).setAttribute('style', 'display: block;');
        
        (document.getElementById("styleTab")).setAttribute('style', 'display: inline;');
        var style;
        var i = 0;
        while(style = OBJ_STYLE[selectedObj.objecttype][i++]) {
            if(style == "strokestyle" || style == "fillcolor" || style == "textcolor") {
                var rgba = selectedObj[style].split(",");
                /*(document.getElementById(selectedObj.objecttype + "_" + style + "_R")).value =
                    rgba[0];
                (document.getElementById(selectedObj.objecttype + "_" + style + "_G")).value =
                    rgba[1];
                (document.getElementById(selectedObj.objecttype + "_" + style + "_B")).value =
                    rgba[2];*/
                var r = parseInt(rgba[0]).toString(16);
                var g = parseInt(rgba[1]).toString(16);
                var b = parseInt(rgba[2]).toString(16);
                r = (r.length < 2) ? '0' + r : r;
                g = (g.length < 2) ? '0' + g : g;
                b = (b.length < 2) ? '0' + b : b;
                
                (document.getElementById(selectedObj.objecttype + "_" + style)).color.fromString(r + g + b);
                (document.getElementById(selectedObj.objecttype + "_" + style + "_A")).value =
                    rgba[3];
            } else {
                (document.getElementById(selectedObj.objecttype + "_" + style)).value =
                    selectedObj[style];
            }
        }

        // z-order property
        (document.getElementById(selectedObj.objecttype + "_z-order")).value =
                diagramObjects.indexOf(selectedObj);

        if(OBJ_PROPERTIES[selectedObj.objecttype].length > 0) {
            (document.getElementById("propertiesTab")).setAttribute('style', 'display: inline;');
            var property;
            i = 0;
            while(property = OBJ_PROPERTIES[selectedObj.objecttype][i++]) {
                switch((document.getElementById(selectedObj.objecttype + "_" + property)).type) {
                    case "text" :
                        (document.getElementById(selectedObj.objecttype + "_" + property)).value =
                            selectedObj[property];
                        break;
                    case "checkbox" :
                        (document.getElementById(selectedObj.objecttype + "_" + property)).checked =
                            selectedObj[property];
                        break;
                    default :
                        break;
                }
            }
        }

        if(selectedObj.objecttype == "class" || selectedObj.objecttype == "instance") {
            (document.getElementById("attributesTab")).setAttribute('style', 'display: inline;');
            itemUnselect("attribute");
            itemlist["attribute"].options.length = 0;
            for(i = selectedObj.attributes.length - 1; i >= 0; i--) {
                itemlist["attribute"].options[i] = new Option(selectedObj.attributes[i].value,
                    "", false, false);
            }
        }

        if(selectedObj.objecttype == "class") {
            (document.getElementById("operationsTab")).setAttribute('style', 'display: inline;');
            itemUnselect("operation");
            itemlist["operation"].options.length = 0;
            for(i = selectedObj.operations.length - 1; i >= 0; i--) {
                itemlist["operation"].options[i] = new Option(selectedObj.operations[i].value,
                    "", false, false);
            }

            (document.getElementById("templatesTab")).setAttribute('style', 'display: inline;');
            itemUnselect("template");
            itemlist["template"].options.length = 0;
            for(i = selectedObj.templates.length - 1; i >= 0; i--) {
                itemlist["template"].options[i] = new Option(selectedObj.templates[i].value,
                    "", false, false);
            }
        }

        if(selectedObj.objecttype == "polygon" || selectedObj.objecttype == "polyline") {
            document.getElementById(selectedObj.objecttype + "_addpoint_message").setAttribute("style", "display: none");
            document.getElementById(selectedObj.objecttype + "_removepoint_message").setAttribute("style", "display: none");
            document.getElementById(selectedObj.objecttype + "_addpoint").disabled = false;
            document.getElementById(selectedObj.objecttype + "_removepoint").disabled = false;
            expectingInputClick = false;
            pointOperation = "none";
        }

        if(selectedObj.objecttype == "node") {
            (document.getElementById("taggedvaluesTab")).setAttribute('style', 'display: inline;');
            itemUnselect("taggedvalue");
            itemlist["taggedvalue"].options.length = 0;
            for(i = selectedObj.taggedvalues.length - 1; i >= 0; i--) {
                itemlist["taggedvalue"].options[i] = new Option(selectedObj.taggedvalues[i],
                    "", false, false);
            }

            (document.getElementById("artifactsTab")).setAttribute('style', 'display: inline;');
            itemUnselect("containedartifact");
            itemlist["containedartifact"].options.length = 0;
            for(i = selectedObj.containedartifacts.length - 1; i >= 0; i--) {
                itemlist["containedartifact"].options[i] = new Option(selectedObj.containedartifacts[i],
                    "", false, false);
            }
        }

        if(selectedObj.objecttype == "statebox") {
            (document.getElementById("internalactivitiesTab")).setAttribute('style', 'display: inline;');
            itemUnselect("internalactivity");
            itemlist["internalactivity"].options.length = 0;
            for(i = selectedObj.internalactivitys.length - 1; i >= 0; i--) {
                itemlist["internalactivity"].options[i] = new Option(selectedObj.internalactivitys[i],
                    "", false, false);
            }
        }

        styleTab();
    }
}

// updates only x, y, width, and height in the properties box
function updatePropertiesBox2() {
    switch(selectedObj.objecttype) {
        case "node" :
            (document.getElementById("node_topheight")).value = selectedObj.topheight;
        case "rectangle" :
        case "ellipse" :
        case "text" :
        case "note" :
        case "class" :
        case "instance" :
        case "statebox" :
        case "arrowhead" :
        case "activationbar" :
        case "lifeline" :
        case "deletion" :
        case "initialps" :
        case "finalstate" :
        case "shallowhistps" :
        case "deephistps" :
        case "initialnode" :
        case "finalnode" :
        case "blackbar" :
        case "diamond" :
        case "pin" :
        case "flowfinal" :
        case "port" :
        case "frame" :
        case "package1" :
        case "package2" :
        case "component" :
        case "artifact" :
        case "usecase" :
        case "actor" :
        case "superstate" :
        case "action" :
        case "subactivity" :
        case "timesignal" :
        case "acceptsignal" :
        case "sendsignal" :
        case "connector" :
        case "transformation" :
        case "part" :

            (document.getElementById(selectedObj.objecttype + "_x")).value = selectedObj["x"];
            (document.getElementById(selectedObj.objecttype + "_y")).value = selectedObj["y"];
            (document.getElementById(selectedObj.objecttype + "_width")).value = selectedObj["width"];
            (document.getElementById(selectedObj.objecttype + "_height")).value = selectedObj["height"];
            //(document.getElementById(selectedObj.objecttype + "_rotate")).value = selectedObj["rotate"];
           break;
        case "expansionregion" :
            (document.getElementById("expansionregion_x")).value = selectedObj["x"];
            (document.getElementById("expansionregion_y")).value = selectedObj["y"];
            (document.getElementById("expansionregion_width")).value = selectedObj["width"];
            (document.getElementById("expansionregion_height")).value = selectedObj["height"];
            (document.getElementById("expansionregion_listboxpin1x")).value = selectedObj["listboxpin1x"];
            (document.getElementById("expansionregion_listboxpin1y")).value = selectedObj["listboxpin1y"];
            (document.getElementById("expansionregion_listboxpin2x")).value = selectedObj["listboxpin2x"];
            (document.getElementById("expansionregion_listboxpin2y")).value = selectedObj["listboxpin2y"];
           break;
        case "line" :
            (document.getElementById("line_x1")).value = selectedObj["x1"];
            (document.getElementById("line_y1")).value = selectedObj["y1"];
            (document.getElementById("line_x2")).value = selectedObj["x2"];
            (document.getElementById("line_y2")).value = selectedObj["y2"];
            break;
        case "bezier" :
            (document.getElementById("bezier_x1")).value = selectedObj["x1"];
            (document.getElementById("bezier_y1")).value = selectedObj["y1"];
            (document.getElementById("bezier_x2")).value = selectedObj["x2"];
            (document.getElementById("bezier_y2")).value = selectedObj["y2"];
            (document.getElementById("bezier_ctrl1x")).value = selectedObj["ctrl1x"];
            (document.getElementById("bezier_ctrl1y")).value = selectedObj["ctrl1y"];
            (document.getElementById("bezier_ctrl2x")).value = selectedObj["ctrl2x"];
            (document.getElementById("bezier_ctrl2y")).value = selectedObj["ctrl2y"];
            break;
        case "path" :
            break;
    }
}

function styleTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("styleTab2")).setAttribute('class', 'active');
    if(selectedObj)
        (document.getElementById(selectedObj.objecttype +
            "StyleTable")).setAttribute('style', 'display: block;');
}

function propertiesTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("propertiesTab2")).setAttribute('class', 'active');
    if(OBJ_PROPERTIES[selectedObj.objecttype].length > 0)
        (document.getElementById(selectedObj.objecttype +
            "PropertiesTable")).setAttribute('style', 'display: block;');
}

function attributesTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("attributesTab2")).setAttribute('class', 'active');
    if(selectedObj.objecttype == "class" || selectedObj.objecttype == "instance")
        (document.getElementById("attributesTable")).setAttribute('style', 'display: block;');
}

function operationsTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("operationsTab2")).setAttribute('class', 'active');
    if(selectedObj.objecttype == "class")
        (document.getElementById("operationsTable")).setAttribute('style', 'display: block;');
}

function templatesTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("templatesTab2")).setAttribute('class', 'active');
    if(selectedObj.objecttype == "class")
        (document.getElementById("templatesTable")).setAttribute('style', 'display: block;');
}

function artifactsTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("artifactsTab2")).setAttribute('class', 'active');
    if(selectedObj.objecttype == "node")
        (document.getElementById("containedartifactsTable")).setAttribute('style', 'display: block;');
}

function taggedvaluesTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("taggedvaluesTab2")).setAttribute('class', 'active');
    if(selectedObj.objecttype == "node")
        (document.getElementById("taggedvaluesTable")).setAttribute('style', 'display: block;');
}

function internalactivitiesTab() {
    hideAllPropertiesBoxTable();
    (document.getElementById("internalactivitiesTab2")).setAttribute('class', 'active');
    if(selectedObj.objecttype == "statebox")
        (document.getElementById("internalactivitiesTable")).setAttribute('style', 'display: block;');
}

function deleteObj() {
    if(selectedObj == null) return;

    var index = diagramObjects.indexOf(selectedObj);
    diagramObjects.splice(index, 1);
    noOfDiagramObjects = diagramObjects.length;
    selectNone();

    generateOp(new deleteOperation(index));
    generateOp(new noneOperation());
}

function zOrderUp() {
    if(selectedObj == null) return;

    var index = diagramObjects.indexOf(selectedObj);

    if(index == diagramObjects.length - 1) return;

    tempObject = diagramObjects.splice(index, 1);
    diagramObjects.splice(index + 1, 0, tempObject[0]);

    select(index + 1);
    tempObject = {};

    generateOp(new moveOperation(index, index + 1));
    generateOp(new noneOperation());
}

function zOrderDown() {
    if(selectedObj == null) return;

    var index = diagramObjects.indexOf(selectedObj);

    if(index == 0) return;

    tempObject = diagramObjects.splice(index, 1);
    diagramObjects.splice(index - 1, 0, tempObject[0]);

    select(index - 1);
    tempObject = {};
    
    generateOp(new moveOperation(index, index - 1));
    generateOp(new noneOperation());
}

function change(attribute, value) {
    selectedObj[attribute] = value;
    invalidate();

    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
        attribute, selectedObj[attribute], null));
    generateOp(new noneOperation());
}

function changeFloat(attribute, value, objecttype) {
    if(attribute == "rotate") {
        if(!isNumber(value)) {
            alert("You must enter a valid number");
            document.getElementById(objecttype + "_rotate").value = selectedObj.rotate;
            return;
        }
    } else if(!isNumber(value) || parseFloat(value) <= 0) {
        alert("You must enter a number greater than 0");
        switch(attribute) {
            case "width" :
            case "height" :
            case "linewidth" :
            case "listboxpinsize" :
            case "topheight" :
            case "fontsize" :
            case "classfontsize" :
                document.getElementById(objecttype + "_" + attribute).value = selectedObj[attribute];
                break;
            default:
                break;
        }
        return;
    }

    selectedObj[attribute] = parseFloat(value);
    invalidate();

    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
        attribute, selectedObj[attribute], null));
    generateOp(new noneOperation());
}

function changeBoolean(attribute, value) {
    selectedObj[attribute] = value;
    invalidate();

    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
        attribute, selectedObj[attribute], null));
    generateOp(new noneOperation());
}

function changeXY(attribute, value, objecttype) {
    if(!isNumber(value)) {
        alert("You must enter a number");

        switch(attribute) {
            case "x" :
            case "y" :
            case "x1" :
            case "y1" :
            case "x2" :
            case "y2" :
            case "ctrl1x" :
            case "ctrl1y" :
            case "ctrl2x" :
            case "ctrl2y" :
            case "listboxpin1x" :
            case "listboxpin1y" :
            case "listboxpin2x" :
            case "listboxpin2y" :
                document.getElementById(objecttype + "_" + attribute).value = selectedObj[attribute];
                break;
            default:
                break;
        }

        return;
    }

    selectedObj[attribute] = parseFloat(value);
    invalidate();

    switch(attribute) {
        case "x" :
        case "y" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "x", selectedObj.x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "y", selectedObj.y, null));
            break;
        case "x1" :
        case "y1" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "x1", selectedObj.x1, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "y1", selectedObj.y1, null));
            break;
        case "x2" :
        case "y2" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "x2", selectedObj.x2, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "y2", selectedObj.y2, null));
            break;
        case "ctrl1x" :
        case "ctrl1y" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl1x", selectedObj.ctrl1x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl1y", selectedObj.ctrl1y, null));
            break;
        case "ctrl2x" :
        case "ctrl2y" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl2x", selectedObj.ctrl2x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl2y", selectedObj.ctrl2y, null));
            break;
        case "listboxpin1x" :
        case "listboxpin1y" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "listboxpin1x", selectedObj.listboxpin1x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "listboxpin1y", selectedObj.listboxpin1y, null));
            break;
        case "listboxpin2x" :
        case "listboxpin2y" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "listboxpin2x", selectedObj.listboxpin2x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "listboxpin2y", selectedObj.listboxpin2y, null));
            break;
        default:
            break;
    }

    generateOp(new noneOperation());
}

function changeColor(object, style) {
    var rgbTemp = document.getElementById(object + "_" + style).value;
    var r = parseInt(rgbTemp.substr(0, 2), 16);
    var g = parseInt(rgbTemp.substr(2, 2), 16);
    var b = parseInt(rgbTemp.substr(4, 2), 16);
    var a = document.getElementById(object + "_" + style + "_A").value;
    /*var r = document.getElementById(object + "_" + style + "_R").value;
    var g = document.getElementById(object + "_" + style + "_G").value;
    var b = document.getElementById(object + "_" + style + "_B").value;
    var a = document.getElementById(object + "_" + style + "_A").value;*/

    var errMsg = "";
    var hasError = false;
    if(!isNumber(r) || r < 0 || r > 255) {
        //errMsg += "R value must be a number between 0 and 255.\n";
        hasError = true;
    }
    if(!isNumber(g) || g < 0 || g > 255) {
        //errMsg += "G value must be a number between 0 and 255.\n";
        hasError = true;
    }
    if(!isNumber(b) || b < 0 || b > 255) {
        //errMsg += "B value must be a number between 0 and 255.\n";
        hasError = true;
    }
    if(!isNumber(a) || a < 0 || a > 1.0) {
        errMsg += "alpha value must be a number between 0 and 1.\n";
        hasError = true;
    }
    if(hasError) {
        errMsg += "There is an error in the rgba value.";
        alert(errMsg);
        var rgba = selectedObj[style].split(",");

        var rDefault = parseInt(rgba[0]).toString(16);
        var gDefault = parseInt(rgba[1]).toString(16);
        var bDefault = parseInt(rgba[2]).toString(16);
        rDefault = (rDefault.length < 2) ? '0' + rDefault : rDefault;
        gDefault = (gDefault.length < 2) ? '0' + gDefault : gDefault;
        bDefault = (bDefault.length < 2) ? '0' + bDefault : bDefault;
        (document.getElementById(object + "_" + style)).color.fromString(rDefault + gDefault + bDefault);
        document.getElementById(object + "_" + style + "_A").value = rgba[3];

        return;
    }

    selectedObj[style] = parseInt(r) + "," + parseInt(g) + "," + parseInt(b) + "," + a;
    invalidate();

    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
        style, selectedObj[style], null));
    generateOp(new noneOperation());
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
