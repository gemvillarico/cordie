
function displayOp(op){
    var opStr = "";

    switch(op.optype) {
        case 'insert' :
            opStr = "You inserted a(n) " + op.object.objecttype;
            break;
        case 'delete' :
            opStr = "You deleted an object";
            break;
        case 'edit' :
            if(op.value == null)
                opStr = "You edited the " + op.attribute + "s of " + diagramObjects[op.position].objecttype;
            else
                opStr = "You edited the " + op.attribute + " of " + diagramObjects[op.position].objecttype;
            break;
        case 'move' :
            opStr = "You moved the z-order of " + diagramObjects[op.position].objecttype + " from "
                + op.position + " to " + op.destination;
            break;
        case 'removecollaborator' :
            opStr = op.collaborator + " is no longer a collaborator";
            break;
        case 'adduser' :
            opStr = op.collaborator + " has joined the session";
            break;
        case 'removeuser' :
            opStr = op.collaborator + " has left the session";
            break;
        case 'addcollaborator' :
            opStr = op.collaborator.username + " can now edit the diagram";
            break;
        default :
            return;
    }

    var testcontent2 = document.createTextNode(opStr);
    var newrow2 = document.createElement('tr');
    var newd2 = document.createElement('td');
    newd2.appendChild(testcontent2);
    newrow2.appendChild(newd2);
    document.getElementById('appliedOpsDisplay').appendChild(newrow2);

    /*var testcontent = document.createTextNode(opStr + " | myMsgs: " + myMsgs);
    var newrow = document.createElement('tr');
    var newd = document.createElement('td');
    newd.appendChild(testcontent);
    newrow.appendChild(newd);
    newrow.setAttribute("myMsgs", myMsgs)
    document.getElementById('outgoingDisplay').appendChild(newrow);*/
}

/*function displayOutgoing(update) {
    var ognodes = document.getElementById('outgoingDisplay').childNodes;

    for(var k = 0; k < ognodes.length; k++) {
       if(ognodes[k].getAttribute("myMsgs") < update.otherMsgs) {
           document.getElementById('outgoingDisplay').removeChild(ognodes[k]);
           k--;
       }
    }
}*/

function displayApplied(update) {
    var opStr = "";
    var op = update.op;

    switch(op.optype) {
        case 'insert' :
            opStr = update.from + " inserted a(n) " + op.object.objecttype;
            break;
        case 'delete' :
            opStr = update.from + " deleted an object";
            break;
        case 'edit' :
            if(op.value == null)
                opStr = update.from + " edited the " + op.attribute + "s of " +
                    diagramObjects[op.position].objecttype;
            else
                opStr = update.from + " edited the " + op.attribute + " of " +
                    diagramObjects[op.position].objecttype;
            break;
        case 'move' :
            opStr = update.from + " moved the z-order of " + diagramObjects[op.position].objecttype + " from "
                + op.position + " to " + op.destination;
            break;
        case 'removecollaborator' :
            opStr = op.collaborator + " is no longer a collaborator";
            break;
        case 'adduser' :
            opStr = op.collaborator + " has joined the session";
            break;
        case 'removeuser' :
            opStr = op.collaborator + " has left the session";
            break;
        case 'addcollaborator' :
            opStr = op.collaborator.username + " can now edit the diagram";
            break;
        default :
            return;
    }

    //alert(JSON.stringify(update));

    var testcontent2 = document.createTextNode(opStr);
    var newrow2 = document.createElement('tr');
    var newd2 = document.createElement('td');
    newd2.setAttribute('style', 'color: #FF6600;');
    newd2.appendChild(testcontent2);
    newrow2.appendChild(newd2);
    document.getElementById('appliedOpsDisplay').appendChild(newrow2);
}

function showTempObject() {
    alert(JSON.stringify(tempObject));
}

function saveCanvasTest() {
    var dataURL = document.getElementById("drawingArea").toDataURL();
    document.getElementById("canvasImg").src = dataURL;
}
