function insertOperation(obj, pos) {
    this.optype = "insert";
    this.object = obj;
    this.position = pos;
}

function deleteOperation(pos) {
    this.optype = "delete";
    this.position = pos;
}

function editOperation(pos, attr, val, attrOp) {
    this.optype = "edit";
    this.position = pos;
    this.attribute = attr;
    this.value = val;
    this.attrOp = attrOp;
}

function moveOperation(pos, dest) {
    this.optype = "move";
    this.position = pos;
    this.destination = dest;
}

function noneOperation() {
    this.optype = "none";
}

function apply(op) {
    //alert("applying " + op.optype + " operation");

    switch(op.optype) {
        case "insert" :
            diagramObjects.splice(op.position, 0, op.object);
            noOfDiagramObjects = diagramObjects.length;
            break;
        case "delete" :
            if(selectedObj == diagramObjects[op.position]) {
                selectedObj = null;
                updatePropertiesBox();
            }
            diagramObjects.splice(op.position, 1);
            noOfDiagramObjects = diagramObjects.length;
            break;
        case "edit" :
            if((diagramObjects[op.position].objecttype == "path") &&
                      (op.attribute == "points")) {
                var temp2 = (op.value).split(" ");
                var newPoints = [];
                for(var i = 0; i < temp2.length; i++) {
                    var temp3 = temp2[i].split(",");
                    newPoints.push({"x" : parseFloat(temp3[0]),
                        "y" : parseFloat(temp3[1])});
                }
                diagramObjects[op.position].points = newPoints;
            } else if(op.attribute == "x" || op.attribute == "y"  ||
                      op.attribute == "x1" || op.attribute == "y1" ||
                      op.attribute == "x2" || op.attribute == "y2" ||
                      op.attribute == "linewidth" || op.attribute == "width" ||
                      op.attribute == "height" || op.attribute == "topheight" ||
                      op.attribute == "listboxpin1x" || op.attribute == "listboxpin1y" ||
                      op.attribute == "listboxpin2x" || op.attribute == "listboxpin2y" ||
                      op.attribute == "listboxpinsize" ||op.attribute == "fontsize" ||
                      op.attribute == "classfontsize" || op.attribute == "rotate") {
                diagramObjects[op.position][op.attribute] = parseFloat(op.value);
            } else if(op.attribute == "abstractclass" || op.attribute == "activeclass"
                   || op.attribute == "qualifiedassociation" || op.attribute == "templateclass"
                   || op.attribute == "showattributes" || op.attribute == "showoperations"
                   || op.attribute == "showartifacts" || op.attribute == "showinternalactivities") {
                diagramObjects[op.position][op.attribute] = (op.value == "true");
            } else if(op.value == null) {
                applyItemOp(diagramObjects[op.position][op.attribute + "s"], op.attrOp, op.attribute);
            } else {
                diagramObjects[op.position][op.attribute] = op.value;
            }
            break;
        case "move" :
            tempObject = diagramObjects.splice(op.position, 1);
            diagramObjects.splice(op.destination, 0, tempObject[0]);
            tempObject = {};
            break;
        case "removecollaborator" :
            removeCollaborator(op.collaborator);
            removeCurrentUser(op.collaborator);
            break;
        case "adduser" :
            addUser(op.collaborator);
            break;
        case "removeuser" :
            //alert("removing: " + op.collaborator);
            removeCurrentUser(op.collaborator);
            break;
        case "addcollaborator" :
            addCollaborator(op.collaborator);
            break;
        default:
            break;
    }

    invalidate();
    updatePropertiesBox();
}

function applyItemOp(itemsRoot, op, item) {
    switch(op.optype) {
        case "insert" :
            itemsRoot.splice(op.position, 0, op.object);
            break;
        case "delete" :
            itemsRoot.splice(op.position, 1);
            break;
        case "edit" :
            if(op.attribute == "attributeValue") {
                if(item == "taggedvalue" || item == "containedartifact" || item == "internalactivity") {
                    itemsRoot[op.position] = op.value;
                } else {
                    itemsRoot[op.position].value = op.value;
                }
            } else if(op.attribute == "attributeStatic") {
                itemsRoot[op.position].isstatic = eval(op.value);
            } else if(op.attribute == "attributeAbstract") {
                itemsRoot[op.position].isabstract = eval(op.value);
            } else if(op.attribute == "attributeX") {
                itemsRoot[op.position].x = parseFloat(op.value);
            } else if(op.attribute == "attributeY") {
                itemsRoot[op.position].y = parseFloat(op.value);
            }
            break;
        case "move" :
            tempObject = itemsRoot.splice(op.position, 1);
            itemsRoot.splice(op.destination, 0, tempObject[0]);
            tempObject = {};
            break;
        default:
            break;
    }
}

function transform(op1, op2) {
    switch(op1.optype) {
        case "insert" :
            switch(op2.optype) {
                case "insert" :
                    if(op1.position < op2.position)
                        op2.position++;
                    else
                        op1.position++;
                    break;
                case "delete" :
                    if(op1.position > op2.position)
                        op1.position--;
                    else
                        op2.position++;
                    break;
                case "edit" :
                    if(op1.position <= op2.position)
                        op2.position++;
                    break;
                case "move" :
                    if(op1.position > op2.position) {
                        if(op1.position > op2.destination) {
                            //do nothing
                        } else {
                            op1.position--;
                            op2.destination++;
                        }
                    } else if(op1.position > op2.destination) {
                        op1.position++;
                        op2.position++;
                    } else {
                        op2.position++;
                        op2.destination++;
                    }
                    break;
                default :
                    break;
            }
            break;
        case "delete" :
            switch(op2.optype) {
                case "insert" :
                    if(op1.position < op2.position)
                        op2.position--;
                    else
                        op1.position++;
                    break;
                case "delete" :
                    if(op1.position < op2.position)
                        op2.position--;
                    else if(op1.position > op2.position)
                        op1.position--;
                    else {
                        op1.optype = "none";
                        op2.optype = "none";
                    }
                    break;
                case "edit" :
                    if(op1.position < op2.position)
                        op2.position--;
                    else if(op1.position == op2.position)
                        op2.optype = "none";
                    break;
                case "move" :
                    if(op1.position == op2.position) {
                        op1.position = op2.destination;
                        op2.optype = "none";
                    } else if(op1.position < op2.position) {
                        if(op1.position < op2.destination) {
                            op2.position--;
                            op2.destination--;
                        } else {
                            op1.position++;
                            op2.position--;
                        }
                    } else if(op1.position <= op2.destination) {
                        op1.position--;
                        op2.destination--;
                    } else {
                        //do nothing
                    }
                    break;
                default :
                    break;
            }
            break;
        case "edit" :
            switch(op2.optype) {
                case "insert" :
                    if(op1.position >= op2.position)
                        op1.position++;
                    break;
                case "delete" :
                    if(op1.position > op2.position)
                        op1.position--;
                    else if(op1.position == op2.position)
                        op1.optype = "none";
                    break;
                case "edit" :
                    if((op1.position == op2.position) && (op1.attribute == op2.attribute)) {
                        if(op1.value == null && op2.value == null) {
                            transform(op1.attrOp, op2.attrOp);
                        } else if(op1.value != null && op2.value != null) {
                            op1.optype = "none";
                        }
                    }
                    break;
                case "move" :
                    if(op1.position == op2.position) {
                        op1.position = op2.destination;
                    } else if(op1.position >= op2.destination &&
                              op1.position < op2.position) {
                        op1.position++;
                    } else if(op1.position <= op2.destination &&
                              op1.position > op2.position) {
                        op1.position--;
                    } else {
                        //do nothing
                    }
                    break;
                default :
                    break;
            }
            break;
        case "move" :
            switch(op2.optype) {
                case "insert" :
                    if(op2.position > op1.position) {
                        if(op2.position > op1.destination) {
                            //do nothing
                        } else {
                            op2.position--;
                            op1.destination++;
                        }
                    } else if(op2.position > op1.destination) {
                        op2.position++;
                        op1.position++;
                    } else {
                        op1.position++;
                        op1.destination++;
                    }
                    break;
                case "delete" :
                    if(op2.position == op1.position) {
                        op2.position = op1.destination;
                        op1.optype = "none";
                    } else if(op2.position < op1.position) {
                        if(op2.position < op1.destination) {
                            op1.position--;
                            op1.destination--;
                        } else {
                            op2.position++;
                            op1.position--;
                        }
                    } else if(op2.position <= op1.destination) {
                        op2.position--;
                        op1.destination--;
                    } else {
                        //do nothing
                    }
                    break;
                case "edit" :
                    if(op2.position == op1.position) {
                        op2.position = op1.destination;
                    } else if(op2.position >= op1.destination &&
                              op2.position < op1.position) {
                        op2.position++;
                    } else if(op2.position <= op1.destination &&
                              op2.position > op1.position) {
                        op2.position--;
                    } else {
                        //do nothing
                    }
                    break;
                case "move" :
                    var p = op1.position;
                    var q = op1.destination;
                    var r = op2.position;
                    var s = op2.destination;

                    // 1
                    if(p == r) {
                        if(q == s) {
                            op1.optype = "none";
                            op2.optype = "none";
                            return;
                        } else if(p == q) {
                            op1.position =  s;
                            op1.destination = s;
                            return;
                        } else if(r == s) {
                            op2.position = q;
                            op2.destination = q;
                            return;
                        } else {
                            op1.optype = "none";
                            op2.position = q;
                            return;
                        }
                    }

                    // 2
                    if(p > r) {
                        if(p <= s) op1.position--;
                        if(r >= q) op2.position++;
                    } else {
                        if(p >= s) op1.position++;
                        if(r <= q) op2.position--;
                    }

                    // 3
                    if(q > r) {
                        if(q <= s) op1.destination--;
                    } else if(q < r) {
                        if(q >= s) op1.destination++;
                    } else { // q == r
                        if(p < q && r < s) op1.destination--;
                        else if(p > q && r > s) op1.destination++;
                    }

                    //4
                    if(s > p && s < q) op2.destination--;
                    else if(s < p && s > q) op2.destination++;
                    else {
                        if(p == s) {
                            if(r < p && p < q) op2.destination--;
                            else if(r > p && p > q) op2.destination++;
                        } else if(q == s) {
                            if(p < q && q <= r) op2.destination--;
                            else if(p > q && q >= r) op2.destination++;
                        }
                    }

                    break;
                default:
                    break;
            }
            break;
        default :
            break;
    }
}

function generateResizeOp() {
    switch(selectedObj.objecttype) {
        case "rectangle" :
        case "ellipse" :
        case "text" :
        case "class" :
        case "note" :
        case "instance" :
        case "node" :
        case "statebox" :
        case "expansionregion" :
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
            switch(expectResize) {
                case 0 :
                case 2 :
                case 5 :
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "x", selectedObj.x, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "y", selectedObj.y, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "width", selectedObj.width, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "height", selectedObj.height, null));
                    break;
                case 1 :
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "x", selectedObj.x, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "y", selectedObj.y, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "height", selectedObj.height, null));
                    break;
                case 3 :
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "x", selectedObj.x, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "y", selectedObj.y, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "width", selectedObj.width, null));
                    break;
                case 4 :
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "width", selectedObj.width, null));
                    break;
                case 6 :
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "height", selectedObj.height, null));
                    break;
                case 7 :
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "width", selectedObj.width, null));
                    generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "height", selectedObj.height, null));
                    break;
                case 8 :
                    if(selectedObj.objecttype == "node") {
                        generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                            "topheight", selectedObj.topheight, null));
                    } else if(selectedObj.objecttype == "expansionregion") {
                        generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                            "listboxpin1x", selectedObj.listboxpin1x, null));
                        generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                            "listboxpin1y", selectedObj.listboxpin1y, null));
                    }
                    break;
                case 9 :
                    if(selectedObj.objecttype == "expansionregion") {
                        generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                            "listboxpin2x", selectedObj.listboxpin2x, null));
                        generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                            "listboxpin2y", selectedObj.listboxpin2y, null));
                    }
            }
            break;
        case "line" :
        case "bezier" :
            if(expectResize == 0) {
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "x1", selectedObj.x1, null));
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "y1", selectedObj.y1, null));
            } else if(expectResize == 1) {
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "x2", selectedObj.x2, null));
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "y2", selectedObj.y2, null));
            } else if(expectResize == 2) {
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "ctrl1x", selectedObj.ctrl1x, null));
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "ctrl1y", selectedObj.ctrl1y, null));
            } else if(expectResize == 3) {
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "ctrl2x", selectedObj.ctrl2x, null));
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                        "ctrl2y", selectedObj.ctrl2y, null));
            }
            break;
        case "polygon" :
        case "polyline" :
            var attrOp = new editOperation(expectResize, "attributeX", selectedObj.points[expectResize].x, null);
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
            attrOp = new editOperation(expectResize, "attributeY", selectedObj.points[expectResize].y, null);
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
            break;
        case "text" :
            break;
        default :
            break;
    }
    generateOp(new noneOperation());
}

function generateDragOp() {
    switch(selectedObj.objecttype) {
        case "rectangle" :
        case "ellipse" :
        case "text" :
        case "class" :
        case "note" :
        case "instance" :
        case "node" :
        case "statebox" :
        case "expansionregion" :
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
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "x", selectedObj.x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "y", selectedObj.y, null));
            break;
        case "bezier" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl1x", selectedObj.ctrl1x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl1y", selectedObj.ctrl1y, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl2x", selectedObj.ctrl2x, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "ctrl2y", selectedObj.ctrl2y, null));
        case "line" :
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "x1", selectedObj.x1, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "y1", selectedObj.y1, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "x2", selectedObj.x2, null));
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "y2", selectedObj.y2, null));
            break;
        case "path" :
            var newPoints = "";
            for(var i = 0; i < selectedObj.points.length; i++) {
                if(i != 0)
                    newPoints += " ";

                newPoints = newPoints + selectedObj.points[i].x
                    + "," + selectedObj.points[i].y;
            }
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj),
                "points", newPoints, null));
            break;
        case "polygon" :
        case "polyline" :
            for(var i = 0; i < selectedObj.points.length; i++) {
                var attrOp = new editOperation(i, "attributeX", selectedObj.points[i].x, null);
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
                attrOp = new editOperation(i, "attributeY", selectedObj.points[i].y, null);
                generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
            }
            break;
    }

    generateOp(new noneOperation());
}

function generateAddPointOp(x, y) {
    switch(selectedObj.objecttype) {
        case "polygon" :
            // Find out the closest points to the selected point on each edge
            var noOfPts = selectedObj.points.length;
            var minDistance;
            var closestCorner;
            for(var i = 0; i < noOfPts; i++) {
                var x1 = selectedObj.points[i].x;
                var y1 = selectedObj.points[i].y;
                var x2 = selectedObj.points[(i + 1) % noOfPts].x;
                var y2 = selectedObj.points[(i + 1) % noOfPts].y;
                var u = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) /
                            ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

                var dist;
                if(u < 0) {
                    dist = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
                } else if(u > 1) {
                    dist = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
                } else {
                    var xu = x1 + u * (x2 - x1);
                    var yu = y1 + u * (y2 - y1);
                    dist = Math.sqrt((x - xu) * (x - xu) + (y - yu) * (y - yu));
                }

                if(i == 0) {
                    minDistance = dist;
                    closestCorner = i;
                } else if(dist < minDistance) {
                    minDistance = dist;
                    closestCorner = i;
                }
            }
            // Insert the new polygon corner between the endpoints of the closest edge
            var newPoint = {"x" : x, "y" : y};
            selectedObj.points.splice((closestCorner + 1) % noOfPts, 0, newPoint);

            // Generate and send operations
            var attrOp = new insertOperation(newPoint, (closestCorner + 1) % noOfPts);
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
            generateOp(new noneOperation());

            document.getElementById("polygon_addpoint_message").setAttribute("style", "display: none;");
            document.getElementById("polygon_addpoint").disabled = false;
            document.getElementById("polygon_removepoint").disabled = false;
            break;
        case "polyline" :
            var noOfPts = selectedObj.points.length;
            
            // Find the closest corner from the clicked point
            var minDistance;
            var closestCorner;
            for(var i = 0; i < noOfPts; i++) {
                var xc = selectedObj.points[i].x;
                var yc = selectedObj.points[i].y;

                var dist = Math.sqrt((x - xc) * (x - xc) + (y - yc) * (y - yc));

                if(i == 0) {
                    minDistance = dist;
                    closestCorner = i;
                } else if(dist < minDistance) {
                    minDistance = dist;
                    closestCorner = i;
                }
            }
            
            // Insert the new point after the closest corner
            var newPoint = {"x" : x, "y" : y};
            selectedObj.points.splice(closestCorner + 1, 0, newPoint);

            // Generate and send operations
            var attrOp = new insertOperation(newPoint, closestCorner + 1);
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
            generateOp(new noneOperation());

            document.getElementById("polyline_addpoint_message").setAttribute("style", "display: none;");
            document.getElementById("polyline_addpoint").disabled = false;
            document.getElementById("polyline_removepoint").disabled = false;
            break
        default :
            break;
    }
    
    pointOperation = "none";
    invalidate();
}

function generateRemovePointOp(x, y) {
    switch(selectedObj.objecttype) {
        case "polygon" :
            if(selectedObj.points.length <= 3) return;
        case "polyline" :
            var noOfPts = selectedObj.points.length;
            if(noOfPts <= 2) return;

            // Find the closest corner from the clicked point
            var minDistance;
            var closestCorner;
            for(var i = 0; i < noOfPts; i++) {
                var xc = selectedObj.points[i].x;
                var yc = selectedObj.points[i].y;

                var dist = Math.sqrt((x - xc) * (x - xc) + (y - yc) * (y - yc));

                if(i == 0) {
                    minDistance = dist;
                    closestCorner = i;
                } else if(dist < minDistance) {
                    minDistance = dist;
                    closestCorner = i;
                }
            }
            // Delete the nearest corner
            selectedObj.points.splice(closestCorner, 1);

            // Generate and send operations
            var attrOp = new deleteOperation(closestCorner);
            generateOp(new editOperation(diagramObjects.indexOf(selectedObj), "point", null, attrOp));
            generateOp(new noneOperation());

            document.getElementById(selectedObj.objecttype + "_removepoint_message").setAttribute("style", "display: none;");
            document.getElementById(selectedObj.objecttype + "_addpoint").disabled = false;
            document.getElementById(selectedObj.objecttype + "_removepoint").disabled = false;
            break;
        default :
            break;
    }

    pointOperation = "none";
    invalidate();
}

function translateOp(op, type) {
    // For translating operations into understandable descriptions
    if(type == 1) {
        switch(op.optype) {
            case 'insert' :
                return "You inserted a(n) " + op.object.objecttype;
            case 'delete' :
                return "delete @" + op.position;
            case 'edit' :
                if(op.value == null)
                    return "edit " + op.attribute + " of  @" + op.position + " : " 
                        + translateOp(op.attrOp, 3);
                else
                    return "edit " + op.attribute + " to " + op.value + " @" + op.position;
            case 'move' :
                return "move @" + op.position + " to " + op.destination;
            case 'removecollaborator' :
                return op.collaborator + " is no longer a collaborator";
            case 'adduser' :
                return op.collaborator + " has joined the session";
            case 'removeuser' :
                return op.collaborator + " has left the session";
            case 'addcollaborator' :
                return op.collaborator.username + " can now edit the diagram";
            default :
                return "none";
        }
    }
    // For translating operations on objects into URL code
    else if(type == 2) {
        switch(op.optype) {
            case 'insert' :
                return "&optype=insert" + translateObj(op.object, 2) + "&position=" + op.position;
            case 'delete' :
                return "&optype=delete&position=" + op.position;
            case 'edit' :
                if(op.value == null) {
                    return "&optype=edit&attribute=" + op.attribute + "&attrOp="
                            + translateItemOp(op.attrOp, op.attribute) + "&position=" + op.position;
                } else {
                    return "&optype=edit&attribute=" + op.attribute + "&value="
                        + encodeURIComponent(op.value) + "&position=" + op.position;
                }
            case 'move' :
                return "&optype=move&position=" + op.position + "&destination=" + op.destination;
            default :
                return "&optype=none";
        }
    }
    // For translating operations on class attributes / operations / templates into descriptions
    else if(type == 3) {
        switch(op.optype) {
            case 'insert' :
                return "inserted " + op.object.value + " on item #" + op.position;
            case 'delete' :
                return "deleted item #" + op.position;
            case 'edit' :
                return "edited item #" + op.position + " to " + op.value;
            case 'move' :
                return "moved item #" + op.position + " to #" + op.destination;
            default :
                return "";
        }
    }
}

function translateItemOp(op, item) {
    // For translating operations on polygon points into URL code
    switch(op.optype) {
        case 'insert' :
            if(item == "point") {
                return "insert&attrX=" + op.object.x + "&attrY=" + op.object.y
                    + "&attrPos=" + op.position;
            } else if(item == "attribute" || item == "operation" || item == "template") {
                return "insert&attrVal=" + encodeURIComponent(op.object.value)
                    + "&attrPos=" + op.position;
            } else if(item == "containedartifact" || item == "taggedvalue" || item == "internalactivity") {
                return "insert&attrVal=" + encodeURIComponent(op.object)
                    + "&attrPos=" + op.position;
            }
            break;
        case 'delete' :
            return "delete&attrPos=" + op.position;
        case 'edit' :
            return "edit&attrAttr=" + op.attribute + "&attrVal=" +
                encodeURIComponent(op.value) + "&attrPos=" + op.position;
        case 'move' :
            return "move&attrPos=" + op.position + "&attrDest=" + op.destination;
        default :
            return "";
    }
}
