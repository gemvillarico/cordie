
var UPDATE_INTERVAL = 1 * 1000;    // get updates every UPDATE_INTERVAL milliseconds
var DRAW_INTERVAL = 50;             // calls the mainDraw every DRAW_INTERVAL milliseconds
var EDIT_TIMEOUT = 10 * 1000;       // timeout for the last edit done in milliseconds

// Default settings for tools
var DEFAULT_TOOL = 'select';
var DEFAULT_FILLCOLOR = "255,255,255,1";
var DEFAULT_STROKESTYLE = "0,0,0,1";
var DEFAULT_TEXTCOLOR = "0,0,0,1";
var DEFAULT_LINEWIDTH = 2;
var DEFAULT_LINECAP = "round";
var DEFAULT_LINEJOIN = "round";
var DEFAULT_ROTATE = 0;
var DEFAULT_FONTSTYLE = "normal";
var DEFAULT_FONTWEIGHT = "normal";
var DEFAULT_FONTSIZE = 14;
var DEFAULT_FONTFAMILY = "sans-serif";
var DEFAULT_WIDTH = 150;
var DEFAULT_HEIGHT = 150;

// Selection handle defaults
var SELECTION_HANDLE_COLOR = "220,20,60,1";
var SELECTION_HANDLE_WIDTH = 2;
var SELECTION_HANDLE_SIZE = 6;

// Arrowstyle defaults
var DEFAULT_ARROWSTYLE1 = "none";
var DEFAULT_ARROWSTYLE2 = "none";
var DEFAULT_LINESTYLE = "solid";
var ARROWHEAD_ANGLE = Math.PI / 8;                                   // angle of arrowhead
var ARROWHEAD_L = 15;                                                // length of arrowhead
var ARROWHEAD_H = Math.abs(ARROWHEAD_L / Math.cos(ARROWHEAD_ANGLE)); // hypotenuse of arrowhead
var DIAMOND_ANGLE = Math.PI / 6;
var DIAMOND_L = 15;
var BALL_R = 7.5;
var SOCKET_R = 11.5

// Class notation defaults
var DEFAULT_CFONTSIZE = 14;
var DEFAULT_CNFONTSIZE = 18;
var H_MARGIN = 6; // horizontal margin

// Instance specification defaults
var DEFAULT_ISWIDTH = 200;
var DEFAULT_ISHEIGHT = 120;

// Node defaults
var DEFAULT_NODE_THICKNESS = 20;
var DEFAULT_TOPHEIGHT = 30;

// State box defaults
var DEFAULT_RADIUSRATIO = 0.15;

// Expansion region defaults
var DEFAULT_LISTBOXPINSIZE = 8;

// Others
var DEFAULT_SMALLSIZE = 30;
var DEFAULT_MEDIUMSIZE = 70;
var DEFAULT_XSMALLSIZE = 15;

var DEFAULT_ACTIVATIONBAR_W = 25;
var DEFAULT_ACTIVATIONBAR_H = 90;

var DEFAULT_LIFELINE_W = 25;
var DEFAULT_LIFELINE_H = 160;

var DEFAULT_DELETION_LINEWIDTH = 6;
var DEFAULT_DELETION_SIZE = 50;

var DEFAULT_FINALSTATE_BORDER = 0.30;

var DEFAULT_BLACKBAR_THICKNESS = 5;

var DEFAULT_FRAME_W = 270;
var DEFAULT_FRAME_H = 180;

var DEFAULT_PACKAGE2_W = 270;
var DEFAULT_PACKAGE2_H = 180;

var DEFAULT_ACTIONRADIUS = 0.4;

var DEFAULT_USECASE_W = 150;
var DEFAULT_USECASE_H = 100;

var DEFAULT_SUPERSTATE_W = 270;
var DEFAULT_SUPERSTATE_H = 180;

var DEFAULT_ACTION_W = 150;
var DEFAULT_ACTION_H = 100;

var DEFAULT_SUBACTIVITY_W = 150;
var DEFAULT_SUBACTIVITY_H = 100;

var DEFAULT_SENDSGN_W = 150;
var DEFAULT_SENDSGN_H = 100;

var DEFAULT_ACCEPTSGN_W = 150;
var DEFAULT_ACCEPTSGN_H = 100;

var DEFAULT_CONNECTOR_LABEL = "A";

var DEFAULT_TRANSFORMATION_W = 150;
var DEFAULT_TRANSFORMATION_H = 100;

var DEFAULT_PART_W = 150;
var DEFAULT_PART_H = 100;

