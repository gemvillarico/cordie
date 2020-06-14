
function Rectangle(iX, iY, w, h) {
    this.objecttype = "rectangle";
    this.x = iX;
    this.y = iY;
    this.width = w;
    this.height = h;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Ellipse(iX, iY, w, h) {
    this.objecttype = "ellipse";
    this.x = iX;
    this.y = iY;
    this.width = w;
    this.height = h;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Arrowhead(iX, iY) {
    this.objecttype = "arrowhead";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = "0,0,0,1";
    this.rotate = DEFAULT_ROTATE;
}

function ActivationBar(iX, iY) {
    this.objecttype = "activationbar";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_ACTIVATIONBAR_W;
    this.height = DEFAULT_ACTIVATIONBAR_H;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Lifeline(iX, iY) {
    this.objecttype = "lifeline";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_LIFELINE_W;
    this.height = DEFAULT_LIFELINE_H;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Deletion(iX, iY) {
    this.objecttype = "deletion";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_DELETION_SIZE;
    this.height = DEFAULT_DELETION_SIZE;
    this.linewidth = DEFAULT_DELETION_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function InitialPS(iX, iY) {
    this.objecttype = "initialps";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_STROKESTYLE;
    this.rotate = DEFAULT_ROTATE;
}

function FinalState(iX, iY) {
    this.objecttype = "finalstate";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function ShallowHistPS(iX, iY) {
    this.objecttype = "shallowhistps";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function DeepHistPS(iX, iY) {
    this.objecttype = "deephistps";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function InitialNode(iX, iY) {
    this.objecttype = "initialnode";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_STROKESTYLE;
    this.rotate = DEFAULT_ROTATE;
}

function FinalNode(iX, iY) {
    this.objecttype = "finalnode";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function BlackBar(iX, iY) {
    this.objecttype = "blackbar";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_WIDTH;
    this.height = DEFAULT_HEIGHT;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_STROKESTYLE;
    this.rotate = DEFAULT_ROTATE;
}

function Diamond(iX, iY) {
    this.objecttype = "diamond";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_MEDIUMSIZE;
    this.height = DEFAULT_MEDIUMSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Pin(iX, iY) {
    this.objecttype = "pin";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_XSMALLSIZE;
    this.height = DEFAULT_XSMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function FlowFinal(iX, iY) {
    this.objecttype = "flowfinal";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_SMALLSIZE;
    this.height = DEFAULT_SMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Port(iX, iY) {
    this.objecttype = "port";
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_XSMALLSIZE;
    this.height = DEFAULT_XSMALLSIZE;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Note(iX, iY, iLabel) {
    this.objecttype = "note";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_HEIGHT;
    this.label = iLabel;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_WIDTH;
    this.x = iX;
    this.y = iY;
}

function Frame(iX, iY) {
    this.objecttype = "frame";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_FRAME_H;
    this.label = "Frame Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_FRAME_W;
    this.x = iX;
    this.y = iY;
}

function Package1(iX, iY) {
    this.objecttype = "package1";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_HEIGHT;
    this.label = "Package";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_WIDTH;
    this.x = iX;
    this.y = iY;
}

function Package2(iX, iY) {
    this.objecttype = "package2";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_PACKAGE2_H;
    this.label = "Package";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_PACKAGE2_W;
    this.x = iX;
    this.y = iY;
}

function Component(iX, iY) {
    this.objecttype = "component";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_HEIGHT;
    this.label = "Component Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_WIDTH;
    this.x = iX;
    this.y = iY;
}

function Artifact(iX, iY) {
    this.objecttype = "artifact";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_HEIGHT;
    this.label = "Artifact Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_WIDTH;
    this.x = iX;
    this.y = iY;
}

function UseCase(iX, iY) {
    this.objecttype = "usecase";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_USECASE_H;
    this.label = "Use Case";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_USECASE_W;
    this.x = iX;
    this.y = iY;
}

function Actor(iX, iY) {
    this.objecttype = "actor";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_HEIGHT;
    this.label = "Actor Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_MEDIUMSIZE;
    this.x = iX;
    this.y = iY;
}

function Superstate(iX, iY) {
    this.objecttype = "superstate";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_SUPERSTATE_H;
    this.label = "Superstate Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_SUPERSTATE_W;
    this.x = iX;
    this.y = iY;
}

function Action(iX, iY) {
    this.objecttype = "action";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_ACTION_H;
    this.label = "Action Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_ACTION_W;
    this.x = iX;
    this.y = iY;
}

function Subactivity(iX, iY) {
    this.objecttype = "subactivity";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_SUBACTIVITY_H;
    this.label = "Subactivity Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_SUBACTIVITY_W;
    this.x = iX;
    this.y = iY;
}

function TimeSignal(iX, iY) {
    this.objecttype = "timesignal";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_HEIGHT;
    this.label = "Time Signal Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_MEDIUMSIZE;
    this.x = iX;
    this.y = iY;
}

function AcceptSignal(iX, iY) {
    this.objecttype = "acceptsignal";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_ACCEPTSGN_H;
    this.label = "Accept Signal Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_ACCEPTSGN_W;
    this.x = iX;
    this.y = iY;
}

function SendSignal(iX, iY) {
    this.objecttype = "sendsignal";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_SENDSGN_H;
    this.label = "Send Signal Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_SENDSGN_W;
    this.x = iX;
    this.y = iY;
}

function Connector(iX, iY) {
    this.objecttype = "connector";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_SMALLSIZE;
    this.label = DEFAULT_CONNECTOR_LABEL;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_SMALLSIZE;
    this.x = iX;
    this.y = iY;
}

function Transformation(iX, iY) {
    this.objecttype = "transformation";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_TRANSFORMATION_H;
    this.label = "";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_TRANSFORMATION_W;
    this.x = iX;
    this.y = iY;
}

function Part(iX, iY) {
    this.objecttype = "part";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.height = DEFAULT_PART_H;
    this.label = "Part Name";
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.width = DEFAULT_PART_W;
    this.x = iX;
    this.y = iY;
}

function Text(iX, iY, iWidth, iHeight, iLabel) {
    this.objecttype = "text";
    this.x = iX;
    this.y = iY;
    this.width = iWidth;
    this.height = iHeight;
    this.fontstyle = DEFAULT_FONTSTYLE;
    this.fontweight = DEFAULT_FONTWEIGHT;
    this.fontsize = DEFAULT_FONTSIZE;
    this.fontfamily = DEFAULT_FONTFAMILY;
    this.label = iLabel;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.rotate = DEFAULT_ROTATE;
}

function Line(iX1, iY1, iX2, iY2) {
    this.objecttype = "line";
    this.x1 = iX1;
    this.y1 = iY1;
    this.x2 = iX2;
    this.y2 = iY2;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.arrowstyle1 = DEFAULT_ARROWSTYLE1;
    this.arrowstyle2 = DEFAULT_ARROWSTYLE2;
    this.linestyle = DEFAULT_LINESTYLE;
}

function Bezier(iX1, iY1, iX2, iY2, iCtrl1x, iCtrl1y, iCtrl2x, iCtrl2y) {
    this.objecttype = "bezier";
    this.x1 = iX1;
    this.y1 = iY1;
    this.x2 = iX2;
    this.y2 = iY2;
    this.ctrl1x = iCtrl1x;
    this.ctrl1y = iCtrl1y;
    this.ctrl2x = iCtrl2x;
    this.ctrl2y = iCtrl2y;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.arrowstyle1 = DEFAULT_ARROWSTYLE1;
    this.arrowstyle2 = DEFAULT_ARROWSTYLE2;
    this.linestyle = DEFAULT_LINESTYLE;
}

function Path(iPathPoints) {
    this.objecttype = "path";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.points = iPathPoints;
}

function ClassNotation(iX, iY) {
    this.objecttype = "class";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_WIDTH;
    this.height = DEFAULT_HEIGHT;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.fontsize = DEFAULT_CFONTSIZE;
    this.classfontsize = DEFAULT_CNFONTSIZE;
    this.classname = "Class Name";
    this.abstractclass = false;
    this.qualifiedassociation = false;
    this.qualifier = "";
    this.stereotype = "";
    this.templateclass = false;
    this.activeclass = false;
    this.attributes = [];
    this.showattributes = true;
    this.operations = [];
    this.showoperations = true;
    this.templates = [];
    this.rotate = DEFAULT_ROTATE;
}

function Polygon(iPoints) {
    this.objecttype = "polygon";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.points = iPoints;
}

function Polyline(iPoints) {
    this.objecttype = "polyline";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.arrowstyle1 = DEFAULT_ARROWSTYLE1;
    this.arrowstyle2 = DEFAULT_ARROWSTYLE2;
    this.linestyle = DEFAULT_LINESTYLE;
    this.points = iPoints;
}

function Instance(iX, iY) {
    this.objecttype = "instance";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_ISWIDTH;
    this.height = DEFAULT_ISHEIGHT;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.fontsize = DEFAULT_CFONTSIZE;
    this.classname = "Class Name";
    this.instancename = "Instance Name"
    this.attributes = [];
    this.showattributes = false;
    this.rotate = DEFAULT_ROTATE;
}

function Node(iX, iY) {
    this.objecttype = "node";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_WIDTH;
    this.height = DEFAULT_HEIGHT;
    this.topheight = DEFAULT_TOPHEIGHT;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.fontsize = DEFAULT_CFONTSIZE;
    this.nodename = "Node Name";
    this.stereotype = "";
    this.rotate = DEFAULT_ROTATE;
    this.showartifacts = true;
    this.containedartifacts = [];
    this.taggedvalues = [];
}

function Statebox(iX, iY) {
    this.objecttype = "statebox";
    this.linewidth = DEFAULT_LINEWIDTH;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.x = iX;
    this.y = iY;
    this.width = DEFAULT_ISWIDTH;
    this.height = DEFAULT_ISHEIGHT;
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.textcolor = DEFAULT_TEXTCOLOR;
    this.fontsize = DEFAULT_CFONTSIZE;
    this.statename = "State Name";
    this.internalactivitys = [];
    this.showinternalactivities = true;
    this.rotate = DEFAULT_ROTATE;
}

function ExpansionRegion(iX, iY) {
    this.objecttype = "expansionregion";
    this.fillcolor = DEFAULT_FILLCOLOR;
    this.height = DEFAULT_HEIGHT;
    this.linecap = DEFAULT_LINECAP;
    this.linejoin = DEFAULT_LINEJOIN;
    this.linewidth = DEFAULT_LINEWIDTH;
    this.rotate = DEFAULT_ROTATE;
    this.strokestyle = DEFAULT_STROKESTYLE;
    this.width = DEFAULT_WIDTH;
    this.x = iX;
    this.y = iY;
    this.listboxpinsize = DEFAULT_LISTBOXPINSIZE;
    this.listboxpin1x = 0;
    this.listboxpin1y = this.height * 0.3;
    this.listboxpin2x = this.width * 0.7;
    this.listboxpin2y = this.height;
}

function addNewRectangle(iX, iY, w, h) {
    var temp = new Rectangle(iX, iY, w, h);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewEllipse(iX, iY, w, h) {
    var temp = new Ellipse(iX, iY, w, h);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewText(iX, iY, iWidth, iHeight, iLabel) {
    var temp = new Text(iX, iY, iWidth, iHeight, iLabel);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewLine(iX1, iY1, iX2, iY2) {
    var temp = new Line(iX1, iY1, iX2, iY2);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewBezier(iX1, iY1, iX2, iY2, iCtrl1x, iCtrl1y, iCtrl2x, iCtrl2y) {
    var temp = new Bezier(iX1, iY1, iX2, iY2, iCtrl1x, iCtrl1y, iCtrl2x, iCtrl2y);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPath(iPathCoordinates) {
    var temp = new Path(iPathCoordinates);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewClass(iX, iY) {
    var temp = new ClassNotation(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewNote(iX, iY, iLabel) {
    var temp = new Note(iX, iY, iLabel);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewFrame(iX, iY) {
    var temp = new Frame(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPackage1(iX, iY) {
    var temp = new Package1(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPackage2(iX, iY) {
    var temp = new Package2(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewComponent(iX, iY) {
    var temp = new Component(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewArtifact(iX, iY) {
    var temp = new Artifact(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewUseCase(iX, iY) {
    var temp = new UseCase(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewActor(iX, iY) {
    var temp = new Actor(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewSuperstate(iX, iY) {
    var temp = new Superstate(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewAction(iX, iY) {
    var temp = new Action(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewSubactivity(iX, iY) {
    var temp = new Subactivity(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewTimeSignal(iX, iY) {
    var temp = new TimeSignal(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewAcceptSignal(iX, iY) {
    var temp = new AcceptSignal(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewSendSignal(iX, iY) {
    var temp = new SendSignal(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewConnector(iX, iY) {
    var temp = new Connector(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewTransformation(iX, iY) {
    var temp = new Transformation(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPart(iX, iY) {
    var temp = new Part(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPolygon(iX, iY) {
    var polygonPts = [];
    polygonPts.push({ "x" : iX, "y" : iY });
    polygonPts.push({ "x" : iX, "y" : iY + DEFAULT_HEIGHT });
    polygonPts.push({ "x" : iX + DEFAULT_HEIGHT, "y" : iY + DEFAULT_HEIGHT  });
    var temp = new Polygon(polygonPts);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPolyline(iX1, iY1, iX2, iY2) {
    var polylinePts = [];
    polylinePts.push({ "x" : iX1, "y" : iY1 });
    polylinePts.push({ "x" : iX2, "y" : iY2 });
    var temp = new Polyline(polylinePts);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewInstance(iX, iY) {
    var temp = new Instance(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewNode(iX, iY) {
    var temp = new Node(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewStatebox(iX, iY) {
    var temp = new Statebox(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewExpansionRegion(iX, iY) {
    var temp = new ExpansionRegion(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewArrowhead(iX, iY) {
    var temp = new Arrowhead(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewActivationBar(iX, iY) {
    var temp = new ActivationBar(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewLifeline(iX, iY) {
    var temp = new Lifeline(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewDeletion(iX, iY) {
    var temp = new Deletion(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewInitialPS(iX, iY) {
    var temp = new InitialPS(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewFinalState(iX, iY) {
    var temp = new FinalState(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewShallowHistPS(iX, iY) {
    var temp = new ShallowHistPS(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewDeepHistPS(iX, iY) {
    var temp = new DeepHistPS(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewInitialNode(iX, iY) {
    var temp = new InitialNode(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewFinalNode(iX, iY) {
    var temp = new FinalNode(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewBlackBar(iX, iY) {
    var temp = new BlackBar(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewDiamond(iX, iY) {
    var temp = new Diamond(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPin(iX, iY) {
    var temp = new Pin(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewFlowFinal(iX, iY) {
    var temp = new FlowFinal(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

function addNewPort(iX, iY) {
    var temp = new Port(iX, iY);
    diagramObjects.push(temp);
    noOfDiagramObjects = diagramObjects.length;
    select(noOfDiagramObjects - 1);

    generateOp(new insertOperation(temp, noOfDiagramObjects - 1));
    generateOp(new noneOperation());
}

// Translate an object into descriptions or URL code
function translateObj(obj, type) {
    if(type == 1) {
        switch(obj.objecttype) {
            case "rectangle" :
                return "[rectangle (" + obj.x + ", " + obj.y + ")]";
            case "ellipse" :
                return "[ellipse (" + obj.x + ", " + obj.y + ")]";
            case "text" :
                return "[text " + obj.label + "]";
            case "line" :
                return "[line ("+ obj.x1 + ", " + obj.y1 + ") to (" + obj.x2 +
                    ", " + obj.y2 + ")]";
            case "path" :
                return "[path from (" + obj.points[0].x + ", " + obj.points[0].y
                    + ") to (" + obj.points[obj.points.length-1].x + ", " +
                    obj.points[obj.points.length-1].y + ")]";
            case "class" :
                return "[class]";
            default :
                return "[" + obj.objecttype + "]";
        }
    }
    else if(type == 2) {
        var temp = "&objecttype=" + obj.objecttype + "&linewidth=" + obj.linewidth
            + "&linecap=" + obj.linecap + "&linejoin=" + obj.linejoin + "&strokestyle="
            + encodeURIComponent(obj.strokestyle);

        switch(obj.objecttype) {
            case "rectangle" :
            case "ellipse" :
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
                temp += "&x=" + obj.x + "&y=" + obj.y + "&width=" + obj.width +
                    "&height=" + obj.height + "&fillcolor=" + encodeURIComponent(obj.fillcolor)
                    + "&rotate=" + obj.rotate;
                break;
            case "text" :
                temp = "&objecttype=text" + "&fontstyle=" + obj.fontstyle +
                    "&fontweight=" + obj.fontweight + "&fontsize=" + obj.fontsize
                    + "&fontfamily=" + encodeURIComponent(obj.fontfamily) + "&x="
                    + obj.x + "&y=" + obj.y + "&width=" + obj.width + "&height="
                    + obj.height + "&label=" + encodeURIComponent(obj.label) +
                    "&textcolor=" + encodeURIComponent(obj.textcolor) + "&rotate="
                    + obj.rotate;
                break;
            case "line" :
                temp += "&x1=" + obj.x1 + "&y1=" + obj.y1 + "&x2=" + obj.x2 +
                    "&y2=" + obj.y2 + "&arrowstyle1=" + encodeURIComponent(obj.arrowstyle1)
                    + "&arrowstyle2=" + encodeURIComponent(obj.arrowstyle2) + "&linestyle="
                    + obj.linestyle;
                break;
            case "bezier" :
                temp += "&x1=" + obj.x1 + "&y1=" + obj.y1 + "&x2=" + obj.x2
                    + "&y2=" + obj.y2 + "&ctrl1x=" + obj.ctrl1x + "&ctrl1y=" +
                    obj.ctrl1y + "&ctrl2x=" + obj.ctrl2x + "&ctrl2y=" + obj.ctrl2y
                    + "&arrowstyle1=" + encodeURIComponent(obj.arrowstyle1) +
                    "&arrowstyle2=" + encodeURIComponent(obj.arrowstyle2) + 
                    "&linestyle=" + obj.linestyle;
                break;
            case "path" :
                for(var i = 0; i < obj.points.length; i++) {
                    temp += "&x=" + obj.points[i].x + "&y=" + obj.points[i].y;
                }
                break;
            case "class" :
                temp += "&x=" + obj.x + "&y=" + obj.y + "&width=" + obj.width
                    + "&height=" + obj.height + "&fillcolor=" + encodeURIComponent(obj.fillcolor)
                    + "&textcolor=" + encodeURIComponent(obj.textcolor) + "&fontsize="
                    + obj.fontsize + "&classfontsize=" + obj.classfontsize + "&classname="
                    + encodeURIComponent(obj.classname) + "&abstractclass=" + obj.abstractclass
                    + "&qualifiedassociation=" + obj.qualifiedassociation + "&qualifier="
                    + encodeURIComponent(obj.qualifier) + "&stereotype=" +
                    encodeURIComponent(obj.stereotype) + "&templateclass=" + obj.templateclass
                    + "&activeclass=" + obj.activeclass + "&showattributes=" +
                    obj.showattributes + "&showoperations=" + obj.showoperations
                    + "&rotate=" + obj.rotate;

                for(var i = 0; i < obj.attributes.length; i++) {
                    temp += "&attributevalue=" + encodeURIComponent(obj.attributes[i].value)
                        + "&attributestatic=" + obj.attributes[i].isstatic;
                }

                for(var i = 0; i < obj.operations.length; i++) {
                    temp += "&operationvalue=" + encodeURIComponent(obj.operations[i].value)
                        + "&operationstatic=" + obj.operations[i].isstatic + "&operationabstract"
                        + obj.operations[i].isabstract;
                }

                for(var i = 0; i < obj.templates.length; i++) {
                    temp += "&templatevalue=" + encodeURIComponent(obj.templates[i]);
                }

                break;
            case "note" :
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
                temp += "&fillcolor=" + encodeURIComponent(obj.fillcolor) + "&fontsize="
                    + obj.fontsize + "&fontfamily=" + obj.fontfamily + "&fontstyle="
                    + obj.fontstyle + "&fontweight=" + obj.fontweight + "&height="
                    + obj.height + "&label=" + encodeURIComponent(obj.label) + 
                    "&rotate=" + obj.rotate + "&textcolor=" + obj.textcolor + 
                    "&width=" + obj.width + "&x=" + obj.x + "&y=" + obj.y;
                break;
            case "polygon" :
                temp += "&fillcolor=" + encodeURIComponent(obj.fillcolor);
                for(var i = 0; i < obj.points.length; i++) {
                    temp += "&x=" + obj.points[i].x + "&y=" + obj.points[i].y;
                }
                break;
            case "polyline" :
                temp += "&arrowstyle1=" + encodeURIComponent(obj.arrowstyle1) +
                    "&arrowstyle2=" + encodeURIComponent(obj.arrowstyle2) +
                    "&linestyle=" + obj.linestyle;
                for(var i = 0; i < obj.points.length; i++) {
                    temp += "&x=" + obj.points[i].x + "&y=" + obj.points[i].y;
                }
                break;
            case "instance" :
                temp += "&x=" + obj.x + "&y=" + obj.y + "&width=" + obj.width
                    + "&height=" + obj.height + "&fillcolor=" + encodeURIComponent(obj.fillcolor)
                    + "&textcolor=" + encodeURIComponent(obj.textcolor) + "&fontsize="
                    + obj.fontsize + "&classname=" + encodeURIComponent(obj.classname) + "&instancename="
                    + encodeURIComponent(obj.instancename) + "&showattributes=" +
                    obj.showattributes + "&rotate=" + obj.rotate;

                for(var i = 0; i < obj.attributes.length; i++) {
                    temp += "&attributevalue=" + encodeURIComponent(obj.attributes[i].value)
                        + "&attributestatic=" + obj.attributes[i].isstatic;
                }

                break;
            case "node" :
                temp += "&x=" + obj.x + "&y=" + obj.y + "&width=" + obj.width
                    + "&height=" + obj.height + "&topheight=" + obj.topheight +
                    "&fillcolor=" + encodeURIComponent(obj.fillcolor) + "&textcolor="
                    + encodeURIComponent(obj.textcolor) + "&fontsize=" + obj.fontsize
                    + "&nodename=" + encodeURIComponent(obj.nodename) + "&stereotype="
                    + encodeURIComponent(obj.stereotype) + "&showartifacts=" +
                    obj.showartifacts + "&rotate=" + obj.rotate;

                for(var i = 0; i < obj.containedartifacts.length; i++) {
                    temp += "&containedartifactvalue=" + encodeURIComponent(obj.containedartifacts[i]);
                }

                for(var i = 0; i < obj.taggedvalues.length; i++) {
                    temp += "&taggedvaluevalue=" + encodeURIComponent(obj.taggedvalues[i]);
                }

                break;
            case "statebox" :
                temp += "&x=" + obj.x + "&y=" + obj.y + "&width=" + obj.width
                    + "&height=" + obj.height + "&fillcolor=" + encodeURIComponent(obj.fillcolor)
                    + "&textcolor=" + encodeURIComponent(obj.textcolor) + "&fontsize="
                    + obj.fontsize + "&statename=" + encodeURIComponent(obj.statename) 
                    + "&showinternalactivities=" + obj.showinternalactivities +
                    "&rotate=" + obj.rotate;

                for(var i = 0; i < obj.internalactivitys.length; i++) {
                    temp += "&internalactivityvalue=" + encodeURIComponent(obj.internalactivitys[i]);
                }

                break;
            case "expansionregion" :
                temp += "&fillcolor=" + encodeURIComponent(obj.fillcolor) +
                    "&height=" + obj.height + "&rotate=" + obj.rotate + "&width="
                    + obj.width + "&x=" + obj.x + "&y=" + obj.y + "&listboxpin1x=" 
                    + obj.listboxpin1x + "&listboxpin1y=" + obj.listboxpin1y +
                    "&listboxpin2x=" + obj.listboxpin2x + "&listboxpin2y=" +
                    obj.listboxpin2y + "&listboxpinsize=" + obj.listboxpinsize;
                break;
        }

        return temp;
    }
}
