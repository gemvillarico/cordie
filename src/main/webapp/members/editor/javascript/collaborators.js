
var creator;
var collaborators;
var currentusers;
var currentusersList;
var collaboratorsList;
var isCreator = false;

function collaborators_init() {
    isCreator = (creator == USERNAME);
    
    collaboratorsList = document.getElementById("collaborators");
    //currentusersList = document.getElementById("currentusers");

    for(var i = 0; i < collaborators.length; i++) {
        // Display in collaborators table
        var collaboratorTbody = document.createElement("tbody");
        var collaboratorRow1 = document.createElement("tr");
        var collaboratorRow2 = document.createElement("tr");
        var collaboratorRow3 = document.createElement("tr");
        var collaboratorRow4 = document.createElement("tr");
        var collaboratorRow5 = document.createElement("tr");
        var colR1C1 = document.createElement("td");
        var colR1C2 = document.createElement("td");
        var colR2C1 = document.createElement("td");
        var colR3C1 = document.createElement("td");
        var colR4C1 = document.createElement("td");

        var userPicContainer = document.createElement("div");
        userPicContainer.setAttribute("class", "displayPicContainer2");
        var userPic = document.createElement("img");
        userPic.setAttribute("class", "displayPic2");
        userPic.setAttribute("src", "DisplayPicture?username=" + collaborators[i].username);
        userPicContainer.appendChild(userPic);

        colR1C1.appendChild(userPicContainer);
        colR1C1.setAttribute("rowspan", "5");
        colR1C2.appendChild(document.createTextNode(collaborators[i].username));
        colR2C1.appendChild(document.createTextNode(collaborators[i].firstname + 
            " " + collaborators[i].lastname));
        colR3C1.appendChild(document.createTextNode(collaborators[i].email));
        
        if(currentusers.indexOf(collaborators[i].username) == -1) {
            colR4C1.appendChild(document.createTextNode("Offline"));
            collaboratorTbody.setAttribute("class", "offlineSign");
        } else {
            colR4C1.appendChild(document.createTextNode("Online"));
            collaboratorTbody.setAttribute("class", "onlineSign");
        }
        collaboratorRow4.appendChild(colR4C1);
        
        if(isCreator && (collaborators[i].username != creator)) {
            var colR5C1 = document.createElement("td");
            var removeButton = document.createElement("a");
            removeButton.setAttribute("href", "javascript:removeCollaboratorReq('"
                + collaborators[i].username + "')");
            removeButton.setAttribute("class", "removeCollaboratorButton");
            removeButton.appendChild(document.createTextNode("Remove"));
            colR5C1.appendChild(removeButton);
            collaboratorRow5.appendChild(colR5C1);
        }

        collaboratorRow1.appendChild(colR1C1);
        collaboratorRow1.appendChild(colR1C2);
        collaboratorRow2.appendChild(colR2C1);
        collaboratorRow3.appendChild(colR3C1);
        collaboratorRow4.appendChild(colR4C1);
        collaboratorTbody.appendChild(collaboratorRow1);
        collaboratorTbody.appendChild(collaboratorRow2);
        collaboratorTbody.appendChild(collaboratorRow3);
        collaboratorTbody.appendChild(collaboratorRow4);
        collaboratorTbody.appendChild(collaboratorRow5);
        collaboratorTbody.setAttribute("id", "collaborator_" + escape(collaborators[i].username));
        collaboratorsList.appendChild(collaboratorTbody);
    
    }

    if(!isCreator) {
        document.getElementById("addCollaboratorSection").setAttribute("style", "display: none;");
        document.getElementById("addCollaboratorSubTab").setAttribute("style", "display: none;");
    }
}

function addCollaborator(collaborator) {
    var newIndex = collaborators.push(collaborator) - 1;

    var collaboratorTbody = document.createElement("tbody");
    var collaboratorRow1 = document.createElement("tr");
    var collaboratorRow2 = document.createElement("tr");
    var collaboratorRow3 = document.createElement("tr");
    var collaboratorRow4 = document.createElement("tr");
    var collaboratorRow5 = document.createElement("tr");
    var colR1C1 = document.createElement("td");
    var colR1C2 = document.createElement("td");
    var colR2C1 = document.createElement("td");
    var colR3C1 = document.createElement("td");
    var colR4C1 = document.createElement("td");

    var userPicContainer = document.createElement("div");
    userPicContainer.setAttribute("class", "displayPicContainer2");
    var userPic = document.createElement("img");
    userPic.setAttribute("class", "displayPic2");
    userPic.setAttribute("src", "DisplayPicture?username=" + collaborators[newIndex].username);
    userPicContainer.appendChild(userPic);

    colR1C1.appendChild(userPicContainer);
    colR1C1.setAttribute("rowspan", "5");
    colR1C2.appendChild(document.createTextNode(collaborators[newIndex].username));
    colR2C1.appendChild(document.createTextNode(collaborators[newIndex].firstname + 
        " " + collaborators[newIndex].lastname));
    colR3C1.appendChild(document.createTextNode(collaborators[newIndex].email));

    if(currentusers.indexOf(collaborators[newIndex].username) == -1) {
        colR4C1.appendChild(document.createTextNode("Offline"));
        collaboratorTbody.setAttribute("class", "offlineSign");
    } else {
        colR4C1.appendChild(document.createTextNode("Online"));
        collaboratorTbody.setAttribute("class", "onlineSign");
    }
    collaboratorRow4.appendChild(colR4C1);

    if(isCreator) {
        var colR5C1 = document.createElement("td");
        var removeButton = document.createElement("a");
        removeButton.setAttribute("href", "javascript:removeCollaboratorReq('"
            + collaborators[newIndex].username + "')");
        removeButton.setAttribute("class", "removeCollaboratorButton");
        removeButton.appendChild(document.createTextNode("Remove"));
        colR5C1.appendChild(removeButton);
        collaboratorRow5.appendChild(colR5C1);
    }

    collaboratorRow1.appendChild(colR1C1);
    collaboratorRow1.appendChild(colR1C2);
    collaboratorRow2.appendChild(colR2C1);
    collaboratorRow3.appendChild(colR3C1);
    collaboratorRow4.appendChild(colR4C1);
    collaboratorTbody.appendChild(collaboratorRow1);
    collaboratorTbody.appendChild(collaboratorRow2);
    collaboratorTbody.appendChild(collaboratorRow3);
    collaboratorTbody.appendChild(collaboratorRow4);
    collaboratorTbody.appendChild(collaboratorRow5);
    collaboratorTbody.setAttribute("id", "collaborator_" + escape(collaborators[newIndex].username));
    collaboratorsList.appendChild(collaboratorTbody);
}

function addUser(collaborator) {
    if(currentusers.indexOf(collaborator) != -1) return;
    currentusers.push(collaborator)
    
    var collaboratorTbody = document.getElementById("collaborator_" + escape(collaborator));
    collaboratorTbody.removeAttribute("class");
    collaboratorTbody.setAttribute("class", "onlineSign");
    var colR4C1= collaboratorTbody.childNodes[3];
    colR4C1.removeChild(colR4C1.childNodes[0]);
    colR4C1.appendChild(document.createTextNode("Online"));
}

function removeCollaborator(target) {
    var targetPos = -1;

    for(var i = 0; i < collaborators.length; i++) {
        if(collaborators[i].username == target)
            targetPos = i;
    }

    if(targetPos == -1) return;
    collaborators.splice(targetPos, 1);

    collaboratorsList.removeChild(document.getElementById("collaborator_" + escape(target)));
}

function removeCurrentUser(target) {
    var targetPos = -1;

    for(var i = 0; i < currentusers.length; i++) {
        if(currentusers[i] == target) {
            targetPos = i;
            break;
        }
    }

    if(targetPos == -1) return;
    currentusers.splice(targetPos, 1);

    //currentusersList.removeChild(document.getElementById("currentuser_" + escape(target)));
    var collaboratorTbody = document.getElementById("collaborator_" + escape(target));
    collaboratorTbody.removeAttribute("class");
    collaboratorTbody.setAttribute("class", "offlineSign");
    var colR4C1= collaboratorTbody.childNodes[3];
    colR4C1.removeChild(colR4C1.childNodes[0]);
    colR4C1.appendChild(document.createTextNode("Offline"));
}

function enableAddReqCollaborator() {
    document.getElementById('enableAddCollaboratorButton').disabled = true;
    document.getElementById('addCollaboratorText').disabled = false;
    document.getElementById('addCollaboratorButton').disabled = false;
    document.getElementById('cancelAddCollaborator').disabled = false;
    document.getElementById('addCollaboratorText').focus();
}

function addCollaboratorReq() {
    var xhReq = new createXMLHttpRequest();
    xhReq.onreadystatechange = addCollaboratorReqResult;
    xhReq.open("POST", URL, true);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=addcollaborator&id=" + DIAGRAM_ID + "&collaborator="
        + encodeURIComponent(document.getElementById('addCollaboratorText').value) 
        + "&editorID=" + editorID);

    cancelAddCollaborator();
}

function cancelAddCollaborator() {
    document.getElementById('addCollaboratorText').value = '';
    document.getElementById('addCollaboratorText').disabled = true;
    document.getElementById('addCollaboratorButton').disabled = true;
    document.getElementById('cancelAddCollaborator').disabled = true;
    document.getElementById('enableAddCollaboratorButton').disabled = false;
}

function removeCollaboratorReq(toRemove) {
    if(!window.confirm("Remove " + toRemove + " from list of collaborators?"))
        return;

    var xhReq = new createXMLHttpRequest();
    xhReq.onreadystatechange = removeCollaboratorReqResult;
    xhReq.open("POST", URL, true);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=removecollaborator&id=" + DIAGRAM_ID + "&collaborator="
        + encodeURIComponent(toRemove)+"&editorID=" + editorID);
}

function addCollaboratorReqResult() {
    if(this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        if(result.error)
            alert(result.error);
        else if(result.response) {
            //alert(result.response);
        }
    }
}

function removeCollaboratorReqResult() {
    if(this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        if(result.error)
            alert(result.error);
        else if(result.response) {
            //alert(result.response);
        }
    }
}

/*function currentusersSubTab() {
    (document.getElementById("collaboratorsSection")).setAttribute('style', 'display: none;');
    (document.getElementById("addCollaboratorSection")).setAttribute('style', 'display: none;');
    (document.getElementById("collaboratorsSubTab2")).removeAttribute('class');
    (document.getElementById("addCollaboratorSubTab2")).removeAttribute('class');

    (document.getElementById("currentusersSubTab2")).setAttribute('class', 'active');
    (document.getElementById("currentusersSection")).setAttribute('style', 'display: block;');
}*/

function collaboratorsSubTab() {
    //(document.getElementById("currentusersSection")).setAttribute('style', 'display: none;');
    (document.getElementById("addCollaboratorSection")).setAttribute('style', 'display: none;');
    //(document.getElementById("currentusersSubTab2")).removeAttribute('class');
    (document.getElementById("addCollaboratorSubTab2")).removeAttribute('class');

    (document.getElementById("collaboratorsSubTab2")).setAttribute('class', 'active');
    (document.getElementById("collaboratorsSection")).setAttribute('style', 'display: block;');
}

function addCollaboratorSubTab() {
    if(!isCreator) {
        return;
    }
    
    //(document.getElementById("currentusersSection")).setAttribute('style', 'display: none;');
    (document.getElementById("collaboratorsSection")).setAttribute('style', 'display: none;');
    //(document.getElementById("currentusersSubTab2")).removeAttribute('class');
    (document.getElementById("collaboratorsSubTab2")).removeAttribute('class');
    
    (document.getElementById("addCollaboratorSubTab2")).setAttribute('class', 'active');
    (document.getElementById("addCollaboratorSection")).setAttribute('style', 'display: block;');
}
