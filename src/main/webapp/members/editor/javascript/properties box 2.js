
function itemSelect(type) {
    if(!(selectedObj.objecttype == "class" || selectedObj.objecttype == "instance" ||
         selectedObj.objecttype == "node" || selectedObj.objecttype == "statebox"))
        return;

    selectedIndex = itemlist[type].selectedIndex;

    if(isNaN(selectedIndex) || selectedIndex < 0)
        return;

    switch(type) {
        case "attribute" :
            if(selectedIndex >= selectedObj.attributes.length) return;

            (document.getElementById("attributeEdit")).value =
                selectedObj.attributes[selectedIndex].value;
            (document.getElementById("attributeStatic")).checked =
                selectedObj.attributes[selectedIndex].isstatic;
            (document.getElementById("attributeStatic")).disabled = false;
            break;
        case "operation" :
            if(selectedIndex >= selectedObj.operations.length) return;

            (document.getElementById("operationEdit")).value =
                selectedObj.operations[selectedIndex].value;
            (document.getElementById("operationStatic")).checked =
                selectedObj.operations[selectedIndex].isstatic;
            (document.getElementById("operationStatic")).disabled = false;
            (document.getElementById("operationAbstract")).checked =
                selectedObj.operations[selectedIndex].isabstract;
            (document.getElementById("operationAbstract")).disabled = false;
            break;
        case "template" :
            if(selectedIndex >= selectedObj.templates.length) return;

            (document.getElementById("templateEdit")).value =
                selectedObj.templates[selectedIndex].value;
            break;
        case "containedartifact" :
            if(selectedIndex >= selectedObj.containedartifacts.length) return;

            (document.getElementById("containedartifactEdit")).value =
                selectedObj.containedartifacts[selectedIndex];
            break;
        case "taggedvalue" :
            if(selectedIndex >= selectedObj.taggedvalues.length) return;

            (document.getElementById("taggedvalueEdit")).value =
                selectedObj.taggedvalues[selectedIndex];
            break;
        case "internalactivity" :
            if(selectedIndex >= selectedObj.internalactivitys.length) return;

            (document.getElementById("internalactivityEdit")).value =
                selectedObj.internalactivitys[selectedIndex];
            break;
        default :return;
    }

    (document.getElementById(type + "Delete")).disabled = false;
    (document.getElementById(type + "Up")).disabled = false;
    (document.getElementById(type + "Down")).disabled = false;
    (document.getElementById(type + "Edit")).disabled = false;
    (document.getElementById(type + "Edit")).focus();
}

function itemUnselect(type) {
    selectedIndex = -1;
    itemlist[type].blur();
    (document.getElementById(type + "Delete")).disabled = true;
    (document.getElementById(type + "Up")).disabled = true;
    (document.getElementById(type + "Down")).disabled = true;
    (document.getElementById(type + "Edit")).disabled = true;
    (document.getElementById(type + "Edit")).value = "";

    if(type == "attribute") {
        (document.getElementById("attributeStatic")).disabled = true;
        (document.getElementById("attributeStatic")).checked = false;
    } else if(type == "operation") {
        (document.getElementById("operationStatic")).disabled = true;
        (document.getElementById("operationStatic")).checked = false;
        (document.getElementById("operationAbstract")).disabled = true;
        (document.getElementById("operationAbstract")).checked = false;
    }
}

function itemNew(type) {
    var newItem = null;
    switch(type) {
        case "attribute" :
            newItem = {"value" : "", "static" : false};
            selectedIndex = selectedObj.attributes.push(newItem) - 1;
            break;
        case "operation" :
            newItem = {"value" : "", "static" : false, "abstract" : false};
            selectedIndex = selectedObj.operations.push(newItem) - 1;
            break;
        case "template" :
            newItem = {"value" : ""};
            selectedIndex = selectedObj.templates.push(newItem) - 1;
            break;
        case "containedartifact" :
            newItem = "";
            selectedIndex = selectedObj.containedartifacts.push(newItem) - 1;
            break;
        case "taggedvalue" :
            newItem = "";
            selectedIndex = selectedObj.taggedvalues.push(newItem) - 1;
            break;
        case "internalactivity" :
            newItem = "";
            selectedIndex = selectedObj.internalactivitys.push(newItem) - 1;
            break;
        default:
            return;
    }

    invalidate();

    itemlist[type].options[selectedIndex] = new Option("", "", false, true);
    itemSelect(type);
    (document.getElementById(type + "Edit")).focus();

    // Generate and send operations
    var attrOp = new insertOperation(newItem, selectedIndex);
    generateOp(new editOperation(diagramObjects.indexOf(selectedObj), type, null, attrOp));
    generateOp(new noneOperation());
}

function itemEdit(type, attr, value) {
    if(selectedIndex == -1) return;

    var attrOp = null;

    switch(type) {
        case "attribute" :
            if(attr == "value") {
                selectedObj.attributes[selectedIndex].value = value;
                attrOp = new editOperation(selectedIndex, "attributeValue", value, null);
            } else if(attr == "static") {
                selectedObj.attributes[selectedIndex].isstatic = value;
                attrOp = new editOperation(selectedIndex, "attributeStatic", value, null);
            } else return;

            break;
        case "operation" :
            if(attr == "value") {
                selectedObj.operations[selectedIndex].value = value;
                attrOp = new editOperation(selectedIndex, "attributeValue", value, null);
            } else if(attr == "static") {
                selectedObj.operations[selectedIndex].isstatic = value;
                attrOp = new editOperation(selectedIndex, "attributeStatic", value, null);
            } else if(attr == "abstract") {
                selectedObj.operations[selectedIndex].isabstract = value;
                attrOp = new editOperation(selectedIndex, "attributeAbstract", value, null);
            } else return;
            break;
        case "template" :
            if(attr == "value") {
                selectedObj.templates[selectedIndex].value = value;
                attrOp = new editOperation(selectedIndex, "attributeValue", value, null);
            } else return;
            break;
        case "containedartifact" :
            if(attr == "value") {
                selectedObj.containedartifacts[selectedIndex] = value;
                attrOp = new editOperation(selectedIndex, "attributeValue", value, null);
            } else return;
            break;
        case "taggedvalue" :
            if(attr == "value") {
                selectedObj.taggedvalues[selectedIndex] = value;
                attrOp = new editOperation(selectedIndex, "attributeValue", value, null);
            } else return;
            break;
        case "internalactivity" :
            if(attr == "value") {
                selectedObj.internalactivitys[selectedIndex] = value;
                attrOp = new editOperation(selectedIndex, "attributeValue", value, null);
            } else return;
            break;
        default:
             return;
    }

    invalidate();

    // Change text of corresponding select option
    if(attr == "value") {
        var selOption = itemlist[type].options[selectedIndex];
        selOption.text = value;
        selOption.value = "";
    }

    // Generate and send operations
    generateOp(new editOperation(diagramObjects.indexOf(selectedObj), type, null, attrOp));
    generateOp(new noneOperation());
}

function itemDelete(type) {
    if(selectedIndex == -1) return;

    switch(type) {
        case "attribute" :
            selectedObj.attributes.splice(selectedIndex, 1);
            break;
        case "operation" :
            selectedObj.operations.splice(selectedIndex, 1);
            break;
        case "template" :
            selectedObj.templates.splice(selectedIndex, 1);
            break;
        case "containedartifact" :
            selectedObj.containedartifacts.splice(selectedIndex, 1);
            break;
        case "taggedvalue" :
            selectedObj.taggedvalues.splice(selectedIndex, 1);
            break;
        case "internalactivity" :
            selectedObj.internalactivitys.splice(selectedIndex, 1);
            break;
        default:
             return;
    }

    invalidate();

    itemlist[type].remove(selectedIndex);
    var delIndex = selectedIndex;
    itemUnselect(type);

    // Generate and send operations
    var attrOp = new deleteOperation(delIndex);
    generateOp(new editOperation(diagramObjects.indexOf(selectedObj), type, null, attrOp));
    generateOp(new noneOperation());
}

function itemUp(type) {
    if(selectedIndex <= 0)
        return;

    switch(type) {
        case "attribute" :
            var temp = selectedObj.attributes[selectedIndex - 1];
            selectedObj.attributes[selectedIndex - 1] = selectedObj.attributes[selectedIndex];
            selectedObj.attributes[selectedIndex] = temp;
            break;
        case "operation" :
            var temp = selectedObj.operations[selectedIndex - 1];
            selectedObj.operations[selectedIndex - 1] = selectedObj.operations[selectedIndex];
            selectedObj.operations[selectedIndex] = temp;
            break;
        case "template" :
            var temp = selectedObj.templates[selectedIndex - 1];
            selectedObj.templates[selectedIndex - 1] = selectedObj.templates[selectedIndex];
            selectedObj.templates[selectedIndex] = temp;
            break;
        case "containedartifact" :
            var temp = selectedObj.containedartifacts[selectedIndex - 1];
            selectedObj.containedartifacts[selectedIndex - 1] = selectedObj.containedartifacts[selectedIndex];
            selectedObj.containedartifacts[selectedIndex] = temp;
            break;
        case "taggedvalue" :
            var temp = selectedObj.taggedvalues[selectedIndex - 1];
            selectedObj.taggedvalues[selectedIndex - 1] = selectedObj.taggedvalues[selectedIndex];
            selectedObj.taggedvalues[selectedIndex] = temp;
            break;
        case "internalactivity" :
            var temp = selectedObj.internalactivitys[selectedIndex - 1];
            selectedObj.internalactivitys[selectedIndex - 1] = selectedObj.internalactivitys[selectedIndex];
            selectedObj.internalactivitys[selectedIndex] = temp;
            break;
        default:
             return;
    }

    invalidate();

    // Switch the positions of the affected items in the select options
    temp = itemlist[type].options[selectedIndex - 1].text;
    itemlist[type].options[selectedIndex - 1].text = itemlist[type].options[selectedIndex].text;
    itemlist[type].options[selectedIndex].text = temp;
    selectedIndex--;
    itemlist[type].options[selectedIndex].selected = true;

    // Generate and send operations
    var attrOp = new moveOperation(selectedIndex + 1, selectedIndex);
    generateOp(new editOperation(diagramObjects.indexOf(selectedObj), type, null, attrOp));
    generateOp(new noneOperation());
}

function itemDown(type) {
    switch(type) {
        case "attribute" :
            if(selectedIndex >= selectedObj.attributes.length - 1) return;

            var temp = selectedObj.attributes[selectedIndex + 1];
            selectedObj.attributes[selectedIndex + 1] = selectedObj.attributes[selectedIndex];
            selectedObj.attributes[selectedIndex] = temp;
            break;
        case "operation" :
            if(selectedIndex >= selectedObj.operations.length - 1) return;

            var temp = selectedObj.operations[selectedIndex + 1];
            selectedObj.operations[selectedIndex + 1] = selectedObj.operations[selectedIndex];
            selectedObj.operations[selectedIndex] = temp;
            break;
        case "template" :
            if(selectedIndex >= selectedObj.templates.length - 1) return;

            var temp = selectedObj.templates[selectedIndex + 1];
            selectedObj.templates[selectedIndex + 1] = selectedObj.templates[selectedIndex];
            selectedObj.templates[selectedIndex] = temp;
            break;
        case "containedartifact" :
            if(selectedIndex >= selectedObj.containedartifacts.length - 1) return;

            var temp = selectedObj.containedartifacts[selectedIndex + 1];
            selectedObj.containedartifacts[selectedIndex + 1] = selectedObj.containedartifacts[selectedIndex];
            selectedObj.containedartifacts[selectedIndex] = temp;
            break;
        case "taggedvalue" :
            if(selectedIndex >= selectedObj.taggedvalues.length - 1) return;

            var temp = selectedObj.taggedvalues[selectedIndex + 1];
            selectedObj.taggedvalues[selectedIndex + 1] = selectedObj.taggedvalues[selectedIndex];
            selectedObj.taggedvalues[selectedIndex] = temp;
            break;
        case "internalactivity" :
            if(selectedIndex >= selectedObj.internalactivitys.length - 1) return;

            var temp = selectedObj.internalactivitys[selectedIndex + 1];
            selectedObj.internalactivitys[selectedIndex + 1] = selectedObj.internalactivitys[selectedIndex];
            selectedObj.internalactivitys[selectedIndex] = temp;
            break;
        default:
             return;
    }

    invalidate();

    // Switch the positions of the affected items in the select options
    temp = itemlist[type].options[selectedIndex + 1].text;
    itemlist[type].options[selectedIndex + 1].text = itemlist[type].options[selectedIndex].text;
    itemlist[type].options[selectedIndex].text = temp;
    selectedIndex++;
    itemlist[type].options[selectedIndex].selected = true;

    // Generate and send operations
    var attrOp = new moveOperation(selectedIndex - 1, selectedIndex);
    generateOp(new editOperation(diagramObjects.indexOf(selectedObj), type, null, attrOp));
    generateOp(new noneOperation());
}

function addPoint() {
    if(!(selectedObj.objecttype == "polygon" || selectedObj.objecttype == "polyline"))
        return;

    if(pointOperation != "none") return;

    document.getElementById(selectedObj.objecttype + "_addpoint_message").setAttribute("style", "display: block");
    document.getElementById(selectedObj.objecttype + "_addpoint").disabled = true;
    document.getElementById(selectedObj.objecttype + "_removepoint").disabled = true;
    expectingInputClick = true;
    pointOperation = "add";
}

function removePoint() {
    if(!(selectedObj.objecttype == "polygon" || selectedObj.objecttype == "polyline"))
        return;

    if(pointOperation != "none") return;

    document.getElementById(selectedObj.objecttype + "_removepoint_message").setAttribute("style", "display: block");
    document.getElementById(selectedObj.objecttype + "_addpoint").disabled = true;
    document.getElementById(selectedObj.objecttype + "_removepoint").disabled = true;
    expectingInputClick = true;
    pointOperation = "remove";
}
