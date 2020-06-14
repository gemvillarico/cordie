var USERNAME;
var DIAGRAM_ID;

function init(iUsername, iDiagramID) {
    USERNAME = iUsername;
    DIAGRAM_ID = iDiagramID;
    getDiagram();

    canvas_init();
    tools_init();
    collaborators_init();
    propertiesBox_init();
    communication_init();
}