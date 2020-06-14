var diagramTitle = '';

var tools = {};
var tool;
var activeButton;

var ghostCanvas;
var ghostContext;

var tempCanvas;
var tempContext;

var hasMovedCursor = false;
var isDrag = false;
var isResizeDrag = false;
var expectResize = -1;
var offsetx, offsety;
var offsetx2, offsety2;
var offsetxp = [];
var offsetyp = [];
var selectedObj;

var expectingInputClick = false;
var pointOperation = "none";

var textAreaPopUp;
var textValueInput;

function tools_init() {
    ghostCanvas = document.createElement('canvas');
    if (!ghostCanvas) {
        alert('Error: I cannot create a new canvas element!');
        return;
    }
    ghostCanvas.height = HEIGHT;
    ghostCanvas.width = WIDTH;
    ghostContext = ghostCanvas.getContext('2d');

    // Add the temporary canvas.
    var container = canvas.parentNode;
    tempCanvas = document.createElement('canvas');
    if (!tempCanvas) {
        alert('Error: I cannot create a new canvas element!');
        return;
    }
    tempCanvas.id     = 'drawingAreaTemp';
    tempCanvas.width  = WIDTH;
    tempCanvas.height = HEIGHT;
    //container.appendChild(tempCanvas);
    container.insertBefore(tempCanvas, document.getElementById("textAreaPopUp"));
    
    tempContext = tempCanvas.getContext('2d');

    // Attach the mousedown, mousemove and mouseup event listeners.
    tempCanvas.addEventListener('mousedown', ev_canvas, false);
    tempCanvas.addEventListener('mousemove', ev_canvas, false);
    tempCanvas.addEventListener('mouseup',   ev_canvas, false);

    // Fixes problem where double clicking causes text to get selected
    tempCanvas.onselectstart = function () {return false;}

    // Display title
    document.getElementById('diagramTitle').appendChild(document.createTextNode('Title: ' + diagramTitle + ''));
    
    // Textarea pop up for text tool
    textAreaPopUp = document.getElementById("textAreaPopUp");
    textValueInput = document.getElementById("textValueInput");

    activateDefaultTool();
    default_init();
    propertiesBoxTab();
}

// The general-purpose event handler. This function just determines the mouse
// position relative to the canvas element.
function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
    }
    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) func(ev);
}

function selectNone() {
    expectingInputClick = false;
    pointOperation = "none";
    selectedObj = null;
    updatePropertiesBox();
    invalidate();
}

function select(index) {
    selectedObj = diagramObjects[index];
    updatePropertiesBox();
    invalidate();
}

function activateDefaultTool() {
    if (tools[DEFAULT_TOOL]) {
        tool = new tools[DEFAULT_TOOL]();
        if(activeButton) activeButton.removeAttribute("class");
        activeButton = document.getElementById(DEFAULT_TOOL);
        activeButton.setAttribute("class", "active");
    }
}

function activateTool(toolName) {
    activeButton.removeAttribute("class");
    activeButton = document.getElementById(toolName);
    activeButton.setAttribute("class", "active");
    tool = new tools[toolName]();
}

tools.select = function() {
    tool = this;
    this.started = false;

    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;

        if(expectingInputClick) return;

        tool.x0 = ev._x;
        tool.y0 = ev._y;
        
        if(expectResize !== -1) {
            isResizeDrag = true;
            return;
        }

        ghostContext.clear();
        for(var i = noOfDiagramObjects-1; i >= 0; i--) {
            ghostContext.draw(diagramObjects[i]);

            var imageData = ghostContext.getImageData(tool.x0, tool.y0, 1, 1);

            // if the mouse pixel exists, select and break
            if (imageData.data[3] > 0) {
                selectedObj = diagramObjects[i];

                if(selectedObj.objecttype == "line") {
                    offsetx = tool.x0 - selectedObj.x1;
                    offsety = tool.y0 - selectedObj.y1;
                    offsetx2 = tool.x0 - selectedObj.x2;
                    offsety2 = tool.y0 - selectedObj.y2;
                } else if(selectedObj.objecttype == "path" ||
                          selectedObj.objecttype == "polygon" ||
                          selectedObj.objecttype == "polyline") {
                    for(var c = 0; c < selectedObj.points.length; c++) {
                        offsetxp[c] = tool.x0 - selectedObj.points[c].x;
                        offsetyp[c] = tool.y0 - selectedObj.points[c].y;
                    }
                } else if(selectedObj.objecttype == "bezier") {
                    offsetxp[0] = tool.x0 - selectedObj.x1;
                    offsetyp[0] = tool.y0 - selectedObj.y1;
                    offsetxp[1] = tool.x0 - selectedObj.x2;
                    offsetyp[1] = tool.y0 - selectedObj.y2;
                    offsetxp[2] = tool.x0 - selectedObj.ctrl1x;
                    offsetyp[2] = tool.y0 - selectedObj.ctrl1y;
                    offsetxp[3] = tool.x0 - selectedObj.ctrl2x;
                    offsetyp[3] = tool.y0 - selectedObj.ctrl2y;
                } else {
                    offsetx = tool.x0 - selectedObj.x;
                    offsety = tool.y0 - selectedObj.y;
                }

                isDrag = true;

                updatePropertiesBox();
                invalidate();
                ghostContext.clear();
                tempCanvas.style.cursor='move';
                return;
            }
        }

        ghostContext.clear();
        selectNone();
    };

    this.mousemove = function (ev) {
        tool.x0 = ev._x;
        tool.y0 = ev._y;

        if(expectingInputClick) return;

        if(isDrag) {
            if(selectedObj.objecttype == "line") {
                selectedObj.x1 = tool.x0 - offsetx;
                selectedObj.y1 = tool.y0 - offsety;
                selectedObj.x2 = tool.x0 - offsetx2;
                selectedObj.y2 = tool.y0 - offsety2;
            } else if(selectedObj.objecttype == "path" ||
                      selectedObj.objecttype == "polygon" ||
                      selectedObj.objecttype == "polyline") {
                for(var i = 0; i < selectedObj.points.length; i++) {
                    selectedObj.points[i].x = tool.x0 - offsetxp[i];
                    selectedObj.points[i].y = tool.y0 - offsetyp[i];
                }
            } else if(selectedObj.objecttype == "bezier") {
                selectedObj.x1 = tool.x0 - offsetxp[0];
                selectedObj.y1 = tool.y0 - offsetyp[0];
                selectedObj.x2 = tool.x0 - offsetxp[1];
                selectedObj.y2 = tool.y0 - offsetyp[1];
                selectedObj.ctrl1x = tool.x0 - offsetxp[2];
                selectedObj.ctrl1y = tool.y0 - offsetyp[2];
                selectedObj.ctrl2x = tool.x0 - offsetxp[3];
                selectedObj.ctrl2y = tool.y0 - offsetyp[3];
            } else {
                selectedObj.x = tool.x0 - offsetx;
                selectedObj.y = tool.y0 - offsety;
            }

            //updatePropertiesBox();
            hasMovedCursor = true;
            invalidate();
            tempCanvas.style.cursor='move';
        } else if(isResizeDrag) {
            resizeSelectedObj(tool.x0, tool.y0);
            hasMovedCursor = true;
            //updatePropertiesBox();
            invalidate();
        }

        if(selectedObj !== null && !isResizeDrag && !isDrag) changeHandleCursor();
    };

    this.mouseup = function (ev) {
        if(tool.started == false) return;

        if(expectingInputClick) {
            if(pointOperation == "add") {
                generateAddPointOp(ev._x, ev._y);
            } else if(pointOperation == "remove") {
                generateRemovePointOp(ev._x, ev._y);
            }
            expectingInputClick = false;
        }

        updatePropertiesBox2();
        
        // Generate the operation that was just done
        if(isDrag && hasMovedCursor)
            generateDragOp();
        else if(isResizeDrag && hasMovedCursor)
            generateResizeOp();

        hasMovedCursor = false;
        isDrag = false;
        isResizeDrag = false;
        expectResize = -1;
        tool.started = false;
    };
};

tools.rectangle = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    var x, y, w, h;

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;

        tempContext.save();
        tempContext.setFillAndStroke(DEFAULT_FILLCOLOR, DEFAULT_STROKESTYLE);
        tempContext.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);
    };

    this.mousemove = function (ev) {
        if (!tool.started) return;

        x = Math.min(ev._x,  tool.x0);
        y = Math.min(ev._y,  tool.y0);
        w = Math.abs(ev._x - tool.x0);
        h = Math.abs(ev._y - tool.y0);

        tempContext.clear();

        if (!w || !h) return;

        tempContext.drawRectangle(x, y, w, h, 0);
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            tempContext.restore();
            addNewRectangle(x, y, w, h);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.ellipse = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    var x, y, w, h;

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;

        tempContext.save();
        tempContext.setFillAndStroke(DEFAULT_FILLCOLOR, DEFAULT_STROKESTYLE);
        tempContext.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);
    };

    this.mousemove = function (ev) {
        if (!tool.started) return;

        x = Math.min(ev._x,  tool.x0);
        y = Math.min(ev._y,  tool.y0);
        w = Math.abs(ev._x - tool.x0);
        h = Math.abs(ev._y - tool.y0);

        tempContext.clear();

        if (!w || !h) return;

        tempContext.drawEllipse(x, y, w, h, 0);
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            tempContext.restore();
            addNewEllipse(x, y, w, h);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.line = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;

        tempContext.save();
        tempContext.setFillAndStroke(DEFAULT_STROKESTYLE, DEFAULT_STROKESTYLE);
        tempContext.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);
    };

    this.mousemove = function (ev) {
        if (!tool.started) return;

        tempContext.clear();

        tempContext.drawLine(tool.x0, tool.y0, ev._x, ev._y, DEFAULT_ARROWSTYLE1,
            DEFAULT_ARROWSTYLE2, DEFAULT_LINESTYLE);
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            tempContext.restore();
            addNewLine(tool.x0, tool.y0, ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.path = function() {
    tool = this;
    this.started = false;
    var pathPoints = [];

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tempContext.save();
        tempContext.setFillAndStroke(DEFAULT_FILLCOLOR, DEFAULT_STROKESTYLE);
        tempContext.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);

        tempContext.beginPath();
        tempContext.moveTo(ev._x, ev._y);
        tool.started = true;
    };

    this.mousemove = function (ev) {
        if (tool.started) {
            tempContext.lineTo(ev._x, ev._y);
            tempContext.stroke();

            var temp = {"x" : ev._x, "y" : ev._y};
            pathPoints.push(temp);
        }
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            tempContext.restore();
            addNewPath(pathPoints);
            diagramUpdate();
            pathPoints = [];
            activateDefaultTool();
        }
    };
};

tools.text = function() {
    tool = this;
    this.started = false;

    selectNone();

    this.mousedown = function (ev) {
        tool.started = true;
        
        ////////////////////////////////////////////////////////////
        
        var mouseX = ev.pageX - document.getElementById("content").offsetLeft 
            + document.getElementById("canvasArea").scrollLeft;
        var mouseY = ev.pageY - document.getElementById("content").offsetTop
            + document.getElementById("canvasArea").scrollTop;
        
        var textAreaPopUp = document.getElementById("textAreaPopUp");
        
        if((mouseX + textAreaPopUp.offsetWidth) > 
            document.getElementById("canvasArea").offsetWidth) {
            
            mouseX -= textAreaPopUp.offsetWidth;
        }
        
        if((mouseY + textAreaPopUp.offsetHeight) > 
            document.getElementById("canvasArea").offsetHeight) {
            
            mouseY -= textAreaPopUp.offsetHeight;
        }
        
        textAreaPopUp.setAttribute("style", "visibility:visible;top:" + mouseY 
            + "px;left:" + mouseX + "px;");
        
        var textValueInput = document.getElementById("textValueInput");
        setTimeout(function(){textValueInput.focus();}, 100);
        ////////////////////////////////////////////////////////////
    };

    this.mousemove = function (ev) {
        if (tool.started) {
        }
    };

    this.mouseup = function (ev) {
        /*if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            addNewText(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }*/
    };
};

function saveText() {
    addNewText(textAreaPopUp.offsetLeft, textAreaPopUp.offsetTop, 
        textAreaPopUp.offsetWidth, textAreaPopUp.offsetHeight, textValueInput.value);
    resetTextAreaPopUp();
    diagramUpdate();
    activateDefaultTool();
}

function resetTextAreaPopUp() {
    textAreaPopUp.setAttribute("style", "visibility:hidden;");
    textValueInput.value = "";
}

tools.classnotation = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewClass(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.note = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewNote(ev._x, ev._y, "");
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.bezier = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;

        tempContext.save();
        tempContext.setFillAndStroke(DEFAULT_STROKESTYLE, DEFAULT_STROKESTYLE);
        tempContext.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);
    };

    this.mousemove = function (ev) {
        if (!tool.started) return;

        tempContext.clear();
        tempContext.drawBezier(tool.x0, tool.y0, ev._x, ev._y, (ev._x + 2 * tool.x0) / 3, tool.y0,
            (tool.x0 + 2 * ev._x) / 3, ev._y, DEFAULT_ARROWSTYLE1, DEFAULT_ARROWSTYLE2, DEFAULT_LINESTYLE);
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            tempContext.restore();
            addNewBezier(tool.x0, tool.y0, ev._x, ev._y, (ev._x + 2 * tool.x0) / 3, 
                tool.y0, (tool.x0 + 2 * ev._x) / 3, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.polygon = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewPolygon(ev._x, ev._y, "");
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.polyline = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;

        tempContext.save();
        tempContext.setFillAndStroke(DEFAULT_STROKESTYLE, DEFAULT_STROKESTYLE);
        tempContext.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);
    };

    this.mousemove = function (ev) {
        if (!tool.started) return;

        tempContext.clear();

        tempContext.drawPolyline([{"x" : tool.x0, "y" : tool.y0}, {"x" : ev._x, "y" : ev._y}], DEFAULT_ARROWSTYLE1,
            DEFAULT_ARROWSTYLE2, DEFAULT_LINESTYLE);
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            tempContext.restore();
            addNewPolyline(tool.x0, tool.y0, ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.instance = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewInstance(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.node = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewNode(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.statebox = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewStatebox(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.expansionregion = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewExpansionRegion(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.arrowhead = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewArrowhead(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.activationbar = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewActivationBar(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.lifeline = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewLifeline(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.deletion = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewDeletion(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.initialps = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewInitialPS(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.finalstate = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewFinalState(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.shallowhistps = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewShallowHistPS(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.deephistps = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewDeepHistPS(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.initialnode = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewInitialNode(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.finalnode = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewFinalNode(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.blackbar = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewBlackBar(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.diamond = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewDiamond(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.pin = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewPin(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.flowfinal = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewFlowFinal(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.port = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewPort(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.frame = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewFrame(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.package1 = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewPackage1(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.package2 = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewPackage2(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.component = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewComponent(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.artifact = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewArtifact(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.usecase = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewUseCase(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.actor = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewActor(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.superstate = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewSuperstate(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.action = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewAction(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.subactivity = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewSubactivity(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.timesignal = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewTimeSignal(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.acceptsignal = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewAcceptSignal(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.sendsignal = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewSendSignal(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.connector = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewConnector(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.transformation = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewTransformation(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

tools.part = function() {
    tool = this;
    this.started = false;

    selectNone();
    resetTextAreaPopUp();

    this.mousedown = function (ev) {
        tool.started = true;
    };

    this.mousemove = function (ev) {
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;

            addNewPart(ev._x, ev._y);
            diagramUpdate();
            activateDefaultTool();
        }
    };
};

// Draw the #drawingAreaTemp canvas on top of #drawingArea and clear
// #drawingAreaTemp afterward. Function is called each time the user
// completes a drawing operation.
function diagramUpdate () {
    tempContext.clear();
    invalidate();
}
