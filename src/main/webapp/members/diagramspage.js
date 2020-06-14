
var USERNAME;
var dlist = [];
var selectedId = null;
var URL = "CordieEditor";

function init(username) {
    USERNAME = username;
    getDiagramList();
}

function createXMLHttpRequest() {
   try {return new XMLHttpRequest();} catch(e) {}
   try {return new ActiveXObject("Msxml2.XMLHTTP");} catch (e) {}
   try {return new ActiveXObject("Microsoft.XMLHTTP");} catch (e) {}

   alert("Sorry, you're browser does not support XMLHttpRequest");
   return null;
}

function getDiagramList() {
    var xhReq = new createXMLHttpRequest();
    xhReq.open("POST", 'DiagramList', false);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("");
    
    //alert(xhReq.responseText);

    try {
       dlist = JSON.parse(xhReq.responseText);
    } catch(e) {
       alert("Error getting diagram list.");
    }

    showList();
    cancelAddDiagram();
    cancelCopyDiagram();
}

function showList() {
    var dltable = document.getElementById("diagramListTable");
    var oldtbody = dltable.getElementsByTagName("tbody")[0];

    var dltbody = document.createElement("tbody");
    for(var i = 0; i < dlist.length; i++) {
        var dltr = document.createElement("tr");

        for(var j = 1; j < dlist[i].length; j++) {
            var dltd = document.createElement("td");
            if(j == 5) {
                var dltdUl1 = document.createElement("ul");
                for(var k = 0; k < dlist[i][j].length; k++) {
                    var dltdUlLi = document.createElement("li")
                    dltdUlLi.appendChild(document.createTextNode(dlist[i][j][k]));
                    
                    dltdUl1.appendChild(dltdUlLi);
                    dltd.appendChild(dltdUl1);
                }
                
                if(dlist[i][3] == USERNAME) {
                    var dltdUl2 = document.createElement("ul");
                    for(var k = 0; k < dlist[i][j].length; k++) {
                        if(dlist[i][3] == dlist[i][j][k]) {
                            
                        } else {
                            dltdUlLi = document.createElement("li")

                            var dltdUlLiA = document.createElement("a");
                            dltdUlLiA.setAttribute("href", "javascript:removeCollaboratorReq(" 
                                + dlist[i][0] + ", '" + dlist[i][j][k] + "')");
                            dltdUlLiA.setAttribute("class", "removeCollaboratorButton");
                            dltdUlLiA.appendChild(document.createTextNode("Remove"));
                            dltdUlLi.appendChild(dltdUlLiA);

                            dltdUl2.appendChild(dltdUlLi);
                            dltd.appendChild(dltdUl2);
                        }
                    }
                    
                    //dltd.appendChild(document.createElement("br"));

                    var dltrAddButton = document.createElement("input");
                    dltrAddButton.type = "button";
                    dltrAddButton.value = "Add Collaborator";
                    dltrAddButton.setAttribute("onclick", "javascript:enableAddReqCollaborator(" + i + ");");
                    dltrAddButton.setAttribute("style", "margin: 5px;");
                    dltd.appendChild(dltrAddButton);

                    var dltrAddCollaboratorDiv = document.createElement("div");
                    dltrAddCollaboratorDiv.setAttribute("class", "addCollaboratorSection");
                    dltrAddCollaboratorDiv.setAttribute("id", "addCollaboratorSection" + i);

                    dltrAddCollaboratorDiv.appendChild(document.createTextNode("Username: "));

                    var dltrAddText = document.createElement("input");
                    dltrAddText.type = "text";
                    dltrAddText.size = "20";
                    dltrAddText.value = "";
                    dltrAddCollaboratorDiv.appendChild(dltrAddText);

                    var dltrAddColButton = document.createElement("input");
                    dltrAddColButton.type = "button";
                    dltrAddColButton.value = "Add";
                    dltrAddColButton.setAttribute("onclick", "javascript:addCollaboratorReq(" 
                        + dlist[i][0] + ", " + i + ");");
                    dltrAddCollaboratorDiv.appendChild(dltrAddColButton);

                    var dltrCancelAddColButton = document.createElement("input");
                    dltrCancelAddColButton.type = "button";
                    dltrCancelAddColButton.value = "Cancel";
                    dltrCancelAddColButton.setAttribute("onclick", "javascript:cancelAddCollaborator(" + i + ");");
                    dltrAddCollaboratorDiv.appendChild(dltrCancelAddColButton);
                    
                    dltd.appendChild(dltrAddCollaboratorDiv);
                }
            } else {
                var dltdContent = document.createTextNode(dlist[i][j]);
                dltd.appendChild(dltdContent);
            }
            
            dltr.appendChild(dltd);
        }
        
        var removetd = document.createElement("td");
        var removeButton = document.createElement("a");
        if(dlist[i][3] == USERNAME) {
            removeButton.setAttribute("href", "javascript:deleteDiagram(" + i + ")");
            removeButton.appendChild(document.createTextNode("Delete"));
        } else {
            removeButton.setAttribute("href", "javascript:leaveDiagram(" + i + ")");
            removeButton.appendChild(document.createTextNode("Leave"));
        }
        removetd.appendChild(removeButton);
        dltr.appendChild(removetd);

        var opentd = document.createElement("td");
        var openButton = document.createElement("a");
        openButton.setAttribute("href", "javascript:openDiagram(" + dlist[i][0] + ")");
        openButton.appendChild(document.createTextNode("Open"));
        opentd.appendChild(openButton);
        dltr.appendChild(opentd);

        var copytd = document.createElement("td");
        var copyButton = document.createElement("a");
        copyButton.setAttribute("href", "javascript:enableCopyDiagram(" +
            dlist[i][0] + ", '" + dlist[i][1] + "')");
        copyButton.appendChild(document.createTextNode("Copy"));
        copytd.appendChild(copyButton);
        dltr.appendChild(copytd);

        dltbody.appendChild(dltr);
    }

    // hidden row for adding a new diagram
    var newDiagramRow = document.createElement("tr");
    newDiagramRow.setAttribute("id", "newDiagramRow");
    newDiagramRow.setAttribute("style", "display: none;");
    var newDiagramC1 = document.createElement("td");
    var newDiagramC2 = document.createElement("td");
    var newDiagramC3 = document.createElement("td");
    var newDiagramC4 = document.createElement("td");
    var newDiagramC5 = document.createElement("td");
    var newDiagramC6 = document.createElement("td");
    
    var newDiagramTitleInput = document.createElement("input");
    newDiagramTitleInput.setAttribute("id", "addTitle");
    newDiagramTitleInput.setAttribute("type", "text");
    newDiagramTitleInput.setAttribute("value", "New Diagram");
    newDiagramTitleInput.setAttribute("size", "20");
    newDiagramTitleInput.setAttribute("disabled", "true");
    newDiagramC1.appendChild(newDiagramTitleInput);

    var newDiagramDescriptionInput = document.createElement("textarea");
    newDiagramDescriptionInput.setAttribute("id", "addDescription");
    newDiagramDescriptionInput.setAttribute("rows", "1");
    newDiagramDescriptionInput.setAttribute("cols", "20");
    newDiagramDescriptionInput.setAttribute("disabled", "true");
    newDiagramC2.appendChild(newDiagramDescriptionInput);

    newDiagramC3.appendChild(document.createTextNode(USERNAME));
    
    var newDiagramAddButton = document.createElement("input");
    newDiagramAddButton.setAttribute("id", "addButton");
    newDiagramAddButton.setAttribute("type", "button");
    newDiagramAddButton.setAttribute("value", "Add");
    newDiagramAddButton.setAttribute("onclick", "javascript:addNew()");
    newDiagramAddButton.setAttribute("disabled", "true");
    newDiagramC4.appendChild(newDiagramAddButton);

    var newDiagramCancelButton = document.createElement("input");
    newDiagramCancelButton.setAttribute("id", "cancelAddButton");
    newDiagramCancelButton.setAttribute("type", "button");
    newDiagramCancelButton.setAttribute("value", "Cancel");
    newDiagramCancelButton.setAttribute("onclick", "javascript:cancelAddDiagram()");
    newDiagramCancelButton.setAttribute("disabled", "true");
    newDiagramC5.appendChild(newDiagramCancelButton);

    newDiagramC6.setAttribute("colspan", "3");

    newDiagramRow.appendChild(newDiagramC1);
    newDiagramRow.appendChild(newDiagramC2);
    newDiagramRow.appendChild(newDiagramC3);
    newDiagramRow.appendChild(newDiagramC4);
    newDiagramRow.appendChild(newDiagramC5);
    newDiagramRow.appendChild(newDiagramC6);
    dltbody.appendChild(newDiagramRow);

    // hidden row for copying diagram
    var copyDiagramRow = document.createElement("tr");
    copyDiagramRow.setAttribute("id", "copyDiagramRow");
    copyDiagramRow.setAttribute("style", "display: none;");
    var copyDiagramC1 = document.createElement("td");
    var copyDiagramC2 = document.createElement("td");
    var copyDiagramC3 = document.createElement("td");
    var copyDiagramC4 = document.createElement("td");
    var copyDiagramC5 = document.createElement("td");
    var copyDiagramC6 = document.createElement("td");

    var copyDiagramTitleInput = document.createElement("input");
    copyDiagramTitleInput.setAttribute("id", "copyTitle");
    copyDiagramTitleInput.setAttribute("type", "text");
    copyDiagramTitleInput.setAttribute("value", "");
    copyDiagramTitleInput.setAttribute("size", "20");
    copyDiagramTitleInput.setAttribute("disabled", "true");
    copyDiagramC1.appendChild(copyDiagramTitleInput);

    var copyDiagramDescriptionInput = document.createElement("textarea");
    copyDiagramDescriptionInput.setAttribute("id", "copyDescription");
    copyDiagramDescriptionInput.setAttribute("rows", "1");
    copyDiagramDescriptionInput.setAttribute("cols", "20");
    copyDiagramDescriptionInput.setAttribute("disabled", "true");
    copyDiagramC2.appendChild(copyDiagramDescriptionInput);

    copyDiagramC3.appendChild(document.createTextNode(USERNAME));

    var copyDiagramButton = document.createElement("input");
    copyDiagramButton.setAttribute("id", "copyButton");
    copyDiagramButton.setAttribute("type", "button");
    copyDiagramButton.setAttribute("value", "OK");
    copyDiagramButton.setAttribute("onclick", "javascript:copyDiagram()");
    copyDiagramButton.setAttribute("disabled", "true");
    copyDiagramC4.appendChild(copyDiagramButton);

    var copyDiagramCancelButton = document.createElement("input");
    copyDiagramCancelButton.setAttribute("id", "cancelCopyButton");
    copyDiagramCancelButton.setAttribute("type", "button");
    copyDiagramCancelButton.setAttribute("value", "Cancel");
    copyDiagramCancelButton.setAttribute("onclick", "javascript:cancelCopyDiagram()");
    copyDiagramCancelButton.setAttribute("disabled", "true");
    copyDiagramC5.appendChild(copyDiagramCancelButton);

    copyDiagramC6.setAttribute("colspan", "3");

    copyDiagramRow.appendChild(copyDiagramC1);
    copyDiagramRow.appendChild(copyDiagramC2);
    copyDiagramRow.appendChild(copyDiagramC3);
    copyDiagramRow.appendChild(copyDiagramC4);
    copyDiagramRow.appendChild(copyDiagramC5);
    copyDiagramRow.appendChild(copyDiagramC6);
    dltbody.appendChild(copyDiagramRow);

    dltable.replaceChild(dltbody, oldtbody);
}

function newDiagram() {
    document.getElementById("newDiagramRow").setAttribute("style", "display: row;");
    document.getElementById("newDiagram").disabled = true;
    document.getElementById("addTitle").disabled = false;
    document.getElementById("addTitle").focus();
    document.getElementById("addDescription").disabled = false;
    document.getElementById("addButton").disabled = false;
    document.getElementById("cancelAddButton").disabled = false;
}

function addNew() {
    var xhReq = new createXMLHttpRequest();
    xhReq.open("POST", 'DiagramList', false);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=add&title=" + encodeURIComponent(document.getElementById("addTitle").value)
        + "&description=" + encodeURIComponent(document.getElementById("addDescription").value));

    try {
        dlist = JSON.parse(xhReq.responseText);
    } catch(e) {
        alert("Error getting diagram list.");
    }

    showList();
    cancelAddDiagram();
}

function cancelAddDiagram() {
    document.getElementById("newDiagramRow").setAttribute("style", "display: none;");
    document.getElementById("addTitle").disabled = true;
    document.getElementById("addTitle").value = 'New Diagram';
    document.getElementById("addDescription").value = "";
    document.getElementById("addDescription").disabled = true;
    document.getElementById("addButton").disabled = true;
    document.getElementById("cancelAddButton").disabled = true;
    document.getElementById("newDiagram").disabled = false;
}

function deleteDiagram(i) {
    var confirmDelete = window.confirm("Are you sure you want to delete " + dlist[i][1] + "?");
    if(!confirmDelete) return;

    var xhReq = new createXMLHttpRequest();
    xhReq.open("POST", 'DiagramList', false);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=delete&id=" + dlist[i][0]);

    try {
        dlist = JSON.parse(xhReq.responseText);
    } catch(e) {
        alert("Error getting diagram list.");
    }

    showList();
}

function leaveDiagram(i) {
    var confirmLeave = window.confirm("You will no longer be able to edit this diagram."
        + " Do you wish to continue?");
    if(!confirmLeave) return;

    var xhReq = new createXMLHttpRequest();
    xhReq.open("POST", 'DiagramList', false);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=leave&id=" + dlist[i][0]);

    try {
        dlist = JSON.parse(xhReq.responseText);
    } catch(e) {
        alert("Error getting diagram list.");
    }

    showList();
}

function openDiagram(i) {
   window.open("editor.jsp?diagram_id=" + i);
}

function enableCopyDiagram(id, title) {
    selectedId = id;
    document.getElementById("copyDiagramRow").setAttribute("style", "display: row;");
    document.getElementById("copyTitle").disabled = false;
    document.getElementById("copyDescription").disabled = false;
    document.getElementById("copyButton").disabled = false;
    document.getElementById("cancelCopyButton").disabled = false;
    document.getElementById("copyTitle").value = "Copy of " + title;
    document.getElementById("copyDescription").value = "";
    document.getElementById("copyTitle").focus();
}

function copyDiagram() {
    if(selectedId == null) return;
    
    var xhReq = new createXMLHttpRequest();
    xhReq.open("POST", 'DiagramList', false);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=copy&from=" + selectedId + "&title=" + encodeURIComponent(document.getElementById("copyTitle").value)
        + "&description=" + encodeURIComponent(document.getElementById("copyDescription").value));

    try {
        dlist = JSON.parse(xhReq.responseText);
    } catch(e) {
        alert("Error getting diagram list.");
    }

    showList();
    cancelCopyDiagram();
}

function cancelCopyDiagram() {
    document.getElementById("copyDiagramRow").setAttribute("style", "display: none;");
    document.getElementById("copyTitle").disabled = true;
    document.getElementById("copyDescription").disabled = true;
    document.getElementById("copyButton").disabled = true;
    document.getElementById("cancelCopyButton").disabled = true;
    document.getElementById("copyTitle").value = "";
    document.getElementById("copyDescription").value = "";
    selectedId = null;
}

function enableAddReqCollaborator(rowNo) {
    var addCollaboratorSection = document.getElementById("addCollaboratorSection" + rowNo);
    addCollaboratorSection.setAttribute("style", "display: inline;");
    addCollaboratorSection.getElementsByTagName('input')[0].focus();
}

function cancelAddCollaborator(rowNo) {
    var addCollaboratorSection = document.getElementById("addCollaboratorSection" + rowNo);
    addCollaboratorSection.setAttribute("style", "display: none;");
    addCollaboratorSection.getElementsByTagName('input')[0].value = '';
}

function addCollaboratorReq(id, rowNo) {
    var addCollaboratorSection = document.getElementById("addCollaboratorSection" + rowNo);
    var collaborator = addCollaboratorSection.getElementsByTagName('input')[0].value;
    //alert("ID: " + id);
    var xhReq = new createXMLHttpRequest();
    xhReq.onreadystatechange = addCollaboratorReqResult;
    xhReq.open("POST", URL, true);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=addcollaborator&id=" + id + "&collaborator="
        + encodeURIComponent(collaborator));

    //getDiagramList();
    cancelAddCollaborator(rowNo);
}

function addCollaboratorReqResult() {
    if(this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        if(result.error)
            alert(result.error);
        else if(result.response) {
            getDiagramList();
            //alert(result.response);
        }
    }
}

function removeCollaboratorReq(id, toRemove) {
    if(!window.confirm("Remove " + toRemove + " from list of collaborators?"))
        return;

    var xhReq = new createXMLHttpRequest();
    xhReq.onreadystatechange = removeCollaboratorReqResult;
    xhReq.open("POST", URL, true);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=removecollaborator&id=" + id + "&collaborator="
        + encodeURIComponent(toRemove));
}

function removeCollaboratorReqResult() {
    if(this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        if(result.error)
            alert(result.error);
        else if(result.response) {
            getDiagramList();
            //alert(result.response);
        }
    }
}
