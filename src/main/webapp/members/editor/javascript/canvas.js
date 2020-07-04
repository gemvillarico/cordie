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
    
    if(indexTempSelected >= 0) {
        select(indexTempSelected);
        mainDraw();
    }
    
    downloadCanvasContentFn("drawingArea", diagramTitle);
}

function downloadCanvasContentFn(canvasId = "", fileName = "") {
    let id = "canvasDownloadLinkId";
    //get the link if already exisit in page
    let link = document.getElementById(id);

    //if not create one
    if (link == null) {
        //Create a link
        link = document.createElement('a');
        link.id = id;
    }

    //set file name
    link.download = fileName + '.png';
    //get canvas as data URL
    link.href = document.getElementById(canvasId).toDataURL()
    //click -- this will download
    link.click();
}
