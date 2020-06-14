var myMsgs = 1;
var otherMsgs = 0;
var outgoing = [];

var URL = "CordieEditor";
var receivedUpdate = true;
var requestUpdateIntervalID;
var lastEditTimeoutID;
var editorID;

function communication_init() {
    //document.getElementById("realtimeUpdatesCheckbox").defaultChecked = true;
    //document.getElementById("updateButton").disabled = true;
    //document.getElementById("realtimeUpdatesCheckbox").defaultChecked = false;
    //document.getElementById("updateButton").disabled = false;
    //if(document.getElementById("realtimeUpdatesCheckbox").checked) {
        requestUpdateIntervalID = setInterval(requestForUpdates, UPDATE_INTERVAL);
    //}
    lastEditTimeoutID = setTimeout(editTimeoutReached, EDIT_TIMEOUT);
}

function createXMLHttpRequest() {
   try {return new XMLHttpRequest();} catch(e) {}
   try {return new ActiveXObject("Msxml2.XMLHTTP");} catch (e) {}
   try {return new ActiveXObject("Microsoft.XMLHTTP");} catch (e) {}

   alert("Sorry, you're browser does not support XMLHttpRequest");
   return null;
}

function getDiagram() {
   var xhReq = new createXMLHttpRequest();
   xhReq.open("POST", URL, false);
   xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhReq.send("action=newUser&id=" + DIAGRAM_ID);

   //alert(xhReq.responseText);
   try {
       var receivedDiagram = JSON.parse(xhReq.responseText);
       if(receivedDiagram.error != null) {
           displayError(receivedDiagram.error);
           /*document.getElementById('errorMessage').appendChild(
               document.createTextNode(receivedDiagram.error));

           document.getElementById('content').setAttribute('style', 'display: none;');
           document.getElementById('header').setAttribute('style', 'display: none;');
           document.getElementById('error').setAttribute('style', 'display: block;');

           document.getElementById('main-content').setAttribute('style', 'display: block;');*/
           return;
       }
       
       editorID = receivedDiagram.editorID;
       receivedDiagram = receivedDiagram.diagram;
   } catch(e) {
       displayError("Error getting diagram");
       //alert("Error getting diagram");
   }
   diagramObjects = receivedDiagram.objects;
   collaborators = receivedDiagram.collaborators;
   currentusers = receivedDiagram.currentusers;
   creator = receivedDiagram.creator;
   diagramTitle = receivedDiagram.title;

   document.getElementById('main-content').setAttribute('style', 'display: block;');
}

function generateOp(op) {
    send(op);
    outgoing.push({"op" : op, "myMsgs" : myMsgs});
    
    displayOp(op); //show for illustrating

    myMsgs++;
}

function send(op) {
    var xhReq = new createXMLHttpRequest();
    xhReq.onreadystatechange = sent;
    xhReq.open("POST", URL, true);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=send&id=" + DIAGRAM_ID + translateOp(op, 2) + "&myMsgs="
        + myMsgs + "&otherMsgs=" + otherMsgs + "&editorID=" + editorID);

    clearTimeout(lastEditTimeoutID);
    lastEditTimeoutID = setTimeout(editTimeoutReached, EDIT_TIMEOUT);

    //alert("action=send&id=" + DIAGRAM_ID + translateOp(op, 2) + "&myMsgs="
    //    + myMsgs + "&otherMsgs=" + otherMsgs + "&editorID=" + editorID);
}

function sent() {
    if(this.readyState == 4 && this.status == 200) {
        if(this.responseText != "") {
           var res = JSON.parse(this.responseText);
           if(res.errorType == 1) {
               displayError(res.error);
           } else {
               alert(res.error);
           }
        }
    }
}

function updatesReady() {
    if(this.readyState == 4 && this.status == 200) {
        receivedUpdate = true;

        if(this.responseText == "") {
            return;
        }

        var updates = JSON.parse(this.responseText);
        if(updates.error) {
           if(updates.errorType == 1) {
               displayError(updates.error);
           } else {
               alert(updates.error);
           }
        }

        //alert(this.responseText);

        for(var i = 0; i < updates.length; i++) {
            for(var j = 0; j < outgoing.length; j++) {
               if(outgoing[j].myMsgs < updates[i].otherMsgs) {
                   outgoing.splice(j, 1);
                   j--;
               }
            }

            //displayOutgoing(updates[i]); //test

            for(var l = 0; l < outgoing.length; l++) {
               transform(updates[i].op, outgoing[l].op);
            }

            apply(updates[i].op)
            otherMsgs++;

            displayApplied(updates[i]); // test
        }
    }
}

function displayError(errorMsg) {
    document.getElementById('errorMessage').appendChild(document.createTextNode(errorMsg));

    document.getElementById('content').setAttribute('style', 'display: none;');
    document.getElementById('header').setAttribute('style', 'display: none;');
    document.getElementById('error').setAttribute('style', 'display: block;');

    document.getElementById('main-content').setAttribute('style', 'display: block;');
    clearInterval(requestUpdateIntervalID);
    clearTimeout(lastEditTimeoutID);
    return;
}

function requestForUpdates() {
   if(!receivedUpdate)
       return;

   var xhReq = new createXMLHttpRequest();
   xhReq.onreadystatechange = updatesReady;
   xhReq.open("POST", URL, true);
   xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhReq.send("action=askUpdate&id=" + DIAGRAM_ID + "&editorID=" + editorID);

   receivedUpdate = false;
}

function realtimeToggle() {
    document.getElementById("updateButton").disabled =
        document.getElementById("realtimeUpdatesCheckbox").checked;

    if(document.getElementById("realtimeUpdatesCheckbox").checked) {
        requestUpdateIntervalID = setInterval(requestForUpdates, UPDATE_INTERVAL);
    } else {
        clearInterval(requestUpdateIntervalID);
    }
}

function editTimeoutReached() {
    generateOp(new noneOperation());
}
