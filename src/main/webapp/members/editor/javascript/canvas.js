var diagramObjects = [];
var noOfDiagramObjects;
var tempObject; //temporary holder for objects

var canvas;
var context;
var WIDTH;
var HEIGHT;

var canvasValid = false;
var dlFrame;

function canvas_init() {
    canvas = document.getElementById('drawingArea');

    if(!canvas) {
        alert("cannot find canvas");
        return;
    }

    if(!canvas.getContext) {
        alert("no canvas.getContext!");
        return;
    }
    
    context = canvas.getContext('2d');
    if(!context) {
        alert("failed to get context!");
        return;
    }

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    noOfDiagramObjects = diagramObjects.length;

    setInterval(mainDraw, DRAW_INTERVAL);

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.onselectstart = function () {return false;}

    dlFrame = document.getElementById("downloadFrame");
}

//only draw when canvas gets invalidated
function mainDraw() {
    if (canvasValid == false) {
        context.clear();
        for(var i = 0; i < noOfDiagramObjects; i++) context.draw(diagramObjects[i]);
        canvasValid = true;
    }
}

function invalidate() {
    canvasValid = false;
}

function saveAsImage() {
    var indexTempSelected = diagramObjects.indexOf(selectedObj);
    selectNone();
    mainDraw();
    
    var dataURI = canvas.toDataURL("image/png");
    var dataPart = dataURI.indexOf(",") + 1;
    
    if(indexTempSelected >= 0) {
        select(indexTempSelected);
        mainDraw();
    }

    var xhReq = new createXMLHttpRequest();
    xhReq.onreadystatechange = addCollaboratorReqResult;
    xhReq.open("POST", URL, false);//true);
    xhReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhReq.send("action=createImage&data=" + encodeURIComponent(dataURI.substr(dataPart))
        + "&id=" + DIAGRAM_ID + "&editorID=" + editorID);
    //+ "&dataurl=" + encodeURIComponent(canvas.toDataURL("image/png")));
    //alert(canvas.toDataURL("image/png"));
    //window.open(canvas.toDataURL("image/png"));
    //alert(dataURI.substr(dataPart));

    window.location.href = "../members/file?editorID=" + editorID + "&id=" + DIAGRAM_ID;
    // + "&data=" + encodeURIComponent(dataURI);//.substr(dataPart));
    //dlFrame.src = "diagram.png";
}
