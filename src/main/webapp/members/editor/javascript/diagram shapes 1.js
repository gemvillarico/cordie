
var selectionHandles = [];

CanvasRenderingContext2D.prototype.clear = function() {
    this.clearRect(0, 0, WIDTH, HEIGHT);
}

CanvasRenderingContext2D.prototype.setFillAndStroke = function(fill, stroke) {
    if (this === ghostContext) {
        this.fillStyle = 'black'; // always want black for the ghost canvas
        this.strokeStyle = 'black';
    } else {
        this.fillStyle = "rgba(" + (fill ? fill : stroke) + ")";
        this.strokeStyle = "rgba(" + stroke + ")";
    }
}

CanvasRenderingContext2D.prototype.setLineSettings = function(linewidth, linecap, linejoin) {
    this.lineWidth = linewidth;
    this.lineCap = linecap;
    this.lineJoin = linejoin;
};

CanvasRenderingContext2D.prototype.draw = function(obj) {
    this.save();

    switch(obj.objecttype) {
        case "rectangle" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawRectangle(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "ellipse" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawEllipse(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "line" :
            this.setFillAndStroke(obj.strokestyle, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawLine(obj.x1, obj.y1, obj.x2, obj.y2, obj.arrowstyle1, obj.arrowstyle2, obj.linestyle);
            break;
        case "path" :
            this.setFillAndStroke(obj.strokestyle, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawPath(obj.points);
            break;
        case "polygon" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawPolygon(obj.points);
            break;
        case "text" :
            this.setFillAndStroke(obj.textcolor, obj.textcolor);
            this.setLineSettings(DEFAULT_LINEWIDTH, DEFAULT_LINECAP, DEFAULT_LINEJOIN);
            this.drawText(obj);
            break;
        case "class" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawClass(obj);
            break;
        case "note" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawNote(obj);
            break;
        case "bezier" :
            this.setFillAndStroke(obj.strokestyle, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawBezier(obj.x1, obj.y1, obj.x2, obj.y2, obj.ctrl1x, obj.ctrl1y, 
                obj.ctrl2x, obj.ctrl2y, obj.arrowstyle1, obj.arrowstyle2, obj.linestyle);
            break;
        case "instance" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawInstance(obj);
            break;
        case "node" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawNode(obj);
            break;
        case "statebox" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawStatebox(obj);
            break;
        case "expansionregion" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawExpansionregion(obj);
            break;
        case "polyline" :
            this.setFillAndStroke(obj.strokestyle, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawPolyline(obj.points, obj.arrowstyle1, obj.arrowstyle2, obj.linestyle);
            break;
        case "arrowhead" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, "square", "miter");
            this.drawArrowheadNotation(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "activationbar" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawActivationBar(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "lifeline" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawLifeline(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "deletion" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawDeletion(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "initialps" :
        case "initialnode" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawFilledCircle(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "finalstate" :
        case "finalnode" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawBorderedFilledCircle(obj);
            break;
        case "shallowhistps" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawShallowHistPS(obj);
            break;
        case "deephistps" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawDeepHistPS(obj);
            break;
        case "blackbar" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawBlackBar(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "diamond" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawDiamond(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "pin" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawSmallSquare(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "flowfinal" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawFlowFinal(obj);
            break;
        case "port" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawSmallSquare(obj.x, obj.y, obj.width, obj.height, obj.rotate);
            break;
        case "frame" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawFrame(obj);
            break;
        case "package1" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawPackage1(obj);
            break;
        case "package2" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawPackage2(obj);
            break;
        case "component" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawComponent(obj);
            break;
        case "artifact" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawArtifact(obj);
            break;
        case "usecase" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawUseCase(obj);
            break;
        case "actor" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawActor(obj);
            break;
        case "superstate" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawSuperstate(obj);
            break;
        case "action" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawAction(obj);
            break;
        case "subactivity" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawSubactivity(obj);
            break;
        case "timesignal" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawTimeSignal(obj);
            break;
        case "acceptsignal" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawAcceptSignal(obj);
            break;
        case "sendsignal" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawSendSignal(obj);
            break;
        case "connector" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawConnector(obj);
            break;
        case "transformation" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawTransformation(obj);
            break;
        case "part" :
            this.setFillAndStroke(obj.fillcolor, obj.strokestyle);
            this.setLineSettings(obj.linewidth, obj.linecap, obj.linejoin);
            this.drawPart(obj);
            break;
    }

    if(selectedObj == obj) this.drawSelectionHandles(obj);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawSelectionHandles = function(obj) {
    this.save();
    this.setFillAndStroke(SELECTION_HANDLE_COLOR, SELECTION_HANDLE_COLOR);
    this.lineWidth = SELECTION_HANDLE_WIDTH;
    var half = SELECTION_HANDLE_SIZE / 2;

    selectionHandles = [];

    switch(obj.objecttype) {
        case "ellipse" :
        case "rectangle" :
        case "text" :
        case "class" :
        case "note" :
        case "instance" :
        case "node" :
        case "statebox" :
        case "expansionregion" :
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
            // Set up the selection handle boxes
            var noOfSelectionHandles = 8;
            if(obj.objecttype == "node")
                noOfSelectionHandles = 9;
            else if(obj.objecttype == "expansionregion")
                noOfSelectionHandles = 10;

            for (i = 0; i < noOfSelectionHandles; i ++) {
                var handle = {"x" : 0, "y" : 0};
                selectionHandles.push(handle);
            }

            this.translate(obj.x, obj.y);
            this.rotate((obj.rotate / 180) * 3.1416);
            this.strokeRect(0, 0, obj.width, obj.height);

            selectionHandles[0].x = -half;
            selectionHandles[0].y = -half;
            selectionHandles[1].x = obj.width / 2 - half;
            selectionHandles[1].y = -half;
            selectionHandles[2].x = obj.width - half;
            selectionHandles[2].y = -half;
            selectionHandles[3].x = -half;
            selectionHandles[3].y = obj.height / 2 - half;
            selectionHandles[4].x = obj.width - half;
            selectionHandles[4].y = obj.height / 2 - half;
            selectionHandles[6].x = obj.width / 2 - half;
            selectionHandles[6].y = obj.height - half;
            selectionHandles[5].x = -half;
            selectionHandles[5].y = obj.height - half;
            selectionHandles[7].x = obj.width - half;
            selectionHandles[7].y = obj.height - half;
            if(obj.objecttype == "node") {
                selectionHandles[8].x = obj.width / 2 - half;
                selectionHandles[8].y = obj.topheight - half;
            } else if(obj.objecttype == "expansionregion") {
                selectionHandles[8].x = obj.listboxpin1x - half;
                selectionHandles[8].y = obj.listboxpin1y - half;
                selectionHandles[9].x = obj.listboxpin2x - half;
                selectionHandles[9].y = obj.listboxpin2y - half;
            }
            break;
        case "line" :
            // Set up the selection handle boxes
            for (i = 0; i < 2; i ++) {
                var handle = {"x" : 0, "y" : 0};
                selectionHandles.push(handle);
            }

            selectionHandles[0].x = obj.x1 - half;
            selectionHandles[0].y = obj.y1 - half;
            selectionHandles[1].x = obj.x2 - half;
            selectionHandles[1].y = obj.y2 - half;
            break;
        case "bezier" :
            // Set up the selection handle boxes
            for (i = 0; i < 4; i ++) {
                var handle = {"x" : 0, "y" : 0};
                selectionHandles.push(handle);
            }

            selectionHandles[0].x = obj.x1 - half;
            selectionHandles[0].y = obj.y1 - half;
            selectionHandles[1].x = obj.x2 - half;
            selectionHandles[1].y = obj.y2 - half;
            selectionHandles[2].x = obj.ctrl1x - half;
            selectionHandles[2].y = obj.ctrl1y - half;
            selectionHandles[3].x = obj.ctrl2x - half;
            selectionHandles[3].y = obj.ctrl2y - half;

            this.drawDashedLine(obj.x1, obj.y1, obj.ctrl1x, obj.ctrl1y, [1, this.lineWidth + 5]);
            this.drawDashedLine(obj.x2, obj.y2, obj.ctrl2x, obj.ctrl2y, [1, this.lineWidth + 5]);
            break;
        case "polygon" :
            // Set up the selection handle boxes
            var noOfPts = obj.points.length;
            for (i = 0; i < noOfPts; i ++) {
                var handle = {"x" : 0, "y" : 0};
                selectionHandles.push(handle);
                selectionHandles[i].x = obj.points[i].x - half;
                selectionHandles[i].y = obj.points[i].y - half;

                this.drawDashedLine(obj.points[i].x, obj.points[i].y,
                    obj.points[(i + 1) % noOfPts].x, obj.points[(i + 1) % noOfPts].y,
                    [1, this.lineWidth + 5]);
            }            
            break;
        case "polyline" :
            // Set up the selection handle boxes
            var noOfPts = obj.points.length;
            for (i = 0; i < noOfPts; i ++) {
                var handle = {"x" : 0, "y" : 0};
                selectionHandles.push(handle);
                selectionHandles[i].x = obj.points[i].x - half;
                selectionHandles[i].y = obj.points[i].y - half;
            }
            break;
        case "path" :
            if(obj.points.length > 0) {
                for (i = 0; i < 8; i ++) {
                    var handle = {"x" : obj.points[0].x, "y" : obj.points[0].y};
                    selectionHandles.push(handle);
                }
                
                for(var i = 1; i < obj.points.length; i++) {
                    if(obj.points[i].x < selectionHandles[0].x) {
                        selectionHandles[0].x = obj.points[i].x;
                        selectionHandles[3].x = obj.points[i].x;
                        selectionHandles[5].x = obj.points[i].x;
                        selectionHandles[1].x = (obj.points[i].x + 
                            selectionHandles[2].x) / 2;
                        selectionHandles[6].x = (obj.points[i].x + 
                            selectionHandles[2].x) / 2;
                    } else if(obj.points[i].x > selectionHandles[2].x) {
                        selectionHandles[2].x = obj.points[i].x;
                        selectionHandles[4].x = obj.points[i].x;
                        selectionHandles[7].x = obj.points[i].x;
                        selectionHandles[1].x = (obj.points[i].x + 
                            selectionHandles[0].x) / 2;
                        selectionHandles[6].x = (obj.points[i].x + 
                            selectionHandles[0].x) / 2;
                    }
                    
                    if(obj.points[i].y < selectionHandles[0].y) {
                        selectionHandles[0].y = obj.points[i].y;
                        selectionHandles[1].y = obj.points[i].y;
                        selectionHandles[2].y = obj.points[i].y;
                        selectionHandles[3].y = (obj.points[i].y + 
                            selectionHandles[5].y) / 2;
                        selectionHandles[4].y = (obj.points[i].y + 
                            selectionHandles[2].y) / 2;
                    } else if(obj.points[i].y > selectionHandles[5].y) {
                        selectionHandles[5].y = obj.points[i].y;
                        selectionHandles[6].y = obj.points[i].y;
                        selectionHandles[7].y = obj.points[i].y;
                        selectionHandles[3].y = (obj.points[i].y + 
                            selectionHandles[0].y) / 2;
                        selectionHandles[4].y = (obj.points[i].y + 
                            selectionHandles[0].y) / 2;
                    }
                }
                
                this.strokeRect(selectionHandles[0].x, selectionHandles[0].y, 
                    selectionHandles[7].x - selectionHandles[0].x, 
                    selectionHandles[7].y - selectionHandles[0].y);
                
                for (i = 0; i < 8; i ++) {
                    selectionHandles[i].x -= half;
                    selectionHandles[i].y -= half;
                }
                
            }
            break;
        default :
            break;
    }

    for (var i = 0; i < selectionHandles.length; i++) {
        var cur = selectionHandles[i];
        this.fillRect(cur.x, cur.y, SELECTION_HANDLE_SIZE, SELECTION_HANDLE_SIZE);
    }

    this.restore();
};

function changeHandleCursor() {
    switch(selectedObj.objecttype) {
        case "rectangle" :
        case "ellipse" :
        case "text" :
        case "class" :
        case "note" :
        case "instance" :
        case "node" :
        case "statebox" :
        case "expansionregion" :
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
            //for (var i = 0; i < selectionHandles.length; i++) {
            for (var i = selectionHandles.length - 1; i >= 0; i--) {
                var cur = selectionHandles[i];
                var rad = selectedObj.rotate / 180 * Math.PI;
                var itp = inverseTransform(tool.x0, selectedObj.x, tool.y0, selectedObj.y, rad);

                tempCanvas.style.cursor='move';

                if (itp[0] >= cur.x && itp[0] <= cur.x + SELECTION_HANDLE_SIZE &&
                    itp[1] >= cur.y && itp[1] <= cur.y + SELECTION_HANDLE_SIZE) {
                    expectResize = i;

                    return;
                }
            }
            break;
        case "line" :
        case "bezier" :
        case "polygon" :
        case "polyline" :
            for (var i = 0; i < selectionHandles.length; i++) {
                var cur = selectionHandles[i];

                if (tool.x0 >= cur.x && tool.x0 <= cur.x + SELECTION_HANDLE_SIZE &&
                    tool.y0 >= cur.y && tool.y0 <= cur.y + SELECTION_HANDLE_SIZE) {
                    expectResize = i;
                    tempCanvas.style.cursor='move';
                    return;
                }
            }
            break;
        case "path" :
            break;
    }

    isResizeDrag = false;
    expectResize = -1;
    tempCanvas.style.cursor='auto';
}

function resizeSelectedObj(mx, my) {
    switch(selectedObj.objecttype) {
        case "rectangle" :
        case "ellipse" :
        case "text" :
        case "class" :
        case "note" :
        case "instance" :
        case "node" :
        case "statebox" :
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
            var angle = selectedObj.rotate / 180 * Math.PI;
            var delta = inverseTransform(mx, selectedObj.x, my, selectedObj.y, angle);

            switch(expectResize) {
                case 0 :
                    delta[0] = (delta[0] < selectedObj.width) ? delta[0] : (selectedObj.width - 1);
                    delta[1] = (delta[1] < selectedObj.height) ? delta[1] : (selectedObj.height - 1);
                    selectedObj.width -= delta[0];
                    selectedObj.height -= delta[1];
                    selectedObj.x += delta[0] * Math.cos(angle) - delta[1] * Math.sin(angle);
                    selectedObj.y += delta[0] * Math.sin(angle) + delta[1] * Math.cos(angle);
                    break;
                case 1 :
                    delta[1] = (delta[1] < selectedObj.height) ? delta[1] : (selectedObj.height - 1);
                    selectedObj.height -= delta[1];
                    selectedObj.x -= delta[1] * Math.sin(angle);
                    selectedObj.y += delta[1] * Math.cos(angle);
                    break;
                case 2 :
                    delta[0] = (delta[0] >= 1) ? delta[0] : 1;
                    delta[1] = (delta[1] < selectedObj.height) ? delta[1] : (selectedObj.height - 1);
                    selectedObj.x -= delta[1] * Math.sin(angle);
                    selectedObj.y += delta[1] * Math.cos(angle);
                    selectedObj.width = delta[0];
                    selectedObj.height -= delta[1];
                    break;
                case 3 :
                    delta[0] = (delta[0] < selectedObj.width) ? delta[0] : (selectedObj.width - 1);
                    selectedObj.width -= delta[0];
                    selectedObj.x += delta[0] * Math.cos(angle);
                    selectedObj.y += delta[0] * Math.sin(angle);
                    break;
                case 4 :
                    delta[0] = (delta[0] >= 1) ? delta[0] : 1;
                    selectedObj.width = delta[0];
                    break;
                case 5 :
                    delta[0] = (delta[0] < selectedObj.width) ? delta[0] : (selectedObj.width - 1);
                    delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                    selectedObj.x += delta[0] * Math.cos(angle);
                    selectedObj.y += delta[0] * Math.sin(angle);
                    selectedObj.width -= delta[0];
                    selectedObj.height = delta[1];
                    break;
                case 6 :
                    delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                    selectedObj.height = delta[1];
                    break;
                case 7 :
                    delta[0] = (delta[0] >= 1) ? delta[0] : 1;
                    delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                    selectedObj.width = delta[0];
                    selectedObj.height = delta[1];
                    break;
                case 8 :
                    if(selectedObj.objecttype == "node") {
                        delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                        //delta[1] = (delta[1] <= selectedObj.height) ? delta[1] : selectedObj.height;
                        selectedObj.topheight = delta[1];
                    }
                    break;
            }
            break;
        case "expansionregion" :
            var angle = selectedObj.rotate / 180 * Math.PI;
            var delta = inverseTransform(mx, selectedObj.x, my, selectedObj.y, angle);

            switch(expectResize) {
                case 0 :
                    delta[0] = (delta[0] < selectedObj.width) ? delta[0] : (selectedObj.width - 1);
                    delta[1] = (delta[1] < selectedObj.height) ? delta[1] : (selectedObj.height - 1);
                    selectedObj.width -= delta[0];
                    selectedObj.height -= delta[1];
                    selectedObj.x += delta[0] * Math.cos(angle) - delta[1] * Math.sin(angle);
                    selectedObj.y += delta[0] * Math.sin(angle) + delta[1] * Math.cos(angle);
                    break;
                case 1 :
                    delta[1] = (delta[1] < selectedObj.height) ? delta[1] : (selectedObj.height - 1);
                    selectedObj.height -= delta[1];
                    selectedObj.x -= delta[1] * Math.sin(angle);
                    selectedObj.y += delta[1] * Math.cos(angle);
                    break;
                case 2 :
                    delta[0] = (delta[0] >= 1) ? delta[0] : 1;
                    delta[1] = (delta[1] < selectedObj.height) ? delta[1] : (selectedObj.height - 1);
                    selectedObj.x -= delta[1] * Math.sin(angle);
                    selectedObj.y += delta[1] * Math.cos(angle);
                    selectedObj.width = delta[0];
                    selectedObj.height -= delta[1];
                    break;
                case 3 :
                    delta[0] = (delta[0] < selectedObj.width) ? delta[0] : (selectedObj.width - 1);
                    selectedObj.width -= delta[0];
                    selectedObj.x += delta[0] * Math.cos(angle);
                    selectedObj.y += delta[0] * Math.sin(angle);
                    break;
                case 4 :
                    delta[0] = (delta[0] >= 1) ? delta[0] : 1;
                    selectedObj.width = delta[0];
                    break;
                case 5 :
                    delta[0] = (delta[0] < selectedObj.width) ? delta[0] : (selectedObj.width - 1);
                    delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                    selectedObj.x += delta[0] * Math.cos(angle);
                    selectedObj.y += delta[0] * Math.sin(angle);
                    selectedObj.width -= delta[0];
                    selectedObj.height = delta[1];
                    break;
                case 6 :
                    delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                    selectedObj.height = delta[1];
                    break;
                case 7 :
                    delta[0] = (delta[0] >= 1) ? delta[0] : 1;
                    delta[1] = (delta[1] >= 1) ? delta[1] : 1;
                    selectedObj.width = delta[0];
                    selectedObj.height = delta[1];
                    break;
                case 8 :
                    var below1 = ((selectedObj.height / selectedObj.width) * delta[0] > delta[1]);
                    var below2 = ((-selectedObj.height / selectedObj.width) * delta[0]
                        + selectedObj.height >= delta[1]);

                    if(below1 && below2) {
                        delta[0] = (delta[0] >= 0) ? delta[0] : 0;
                        delta[0] = (delta[0] < selectedObj.width - 4 * selectedObj.listboxpinsize)
                            ? delta[0] : selectedObj.width - 4 * selectedObj.listboxpinsize;
                        delta[1] = 0;
                    } else if(below1 && !below2) {
                        delta[0] = selectedObj.width;
                        delta[1] = (delta[1] >= 0) ? delta[1] : 0;
                        delta[1] = (delta[1] < selectedObj.height - 4 * selectedObj.listboxpinsize)
                            ? delta[1] : selectedObj.height - 4 * selectedObj.listboxpinsize;
                    } else if(!below1 && !below2) {
                        delta[0] = (delta[0] >= 0) ? delta[0] : 0;
                        delta[0] = (delta[0] < selectedObj.width - 4 * selectedObj.listboxpinsize)
                            ? delta[0] : selectedObj.width - 4 * selectedObj.listboxpinsize;
                        delta[1] = selectedObj.height;
                    } else {
                        delta[0] = 0;
                        delta[1] = (delta[1] >= 0) ? delta[1] : 0;
                        delta[1] = (delta[1] < selectedObj.height - 4 * selectedObj.listboxpinsize)
                            ? delta[1] : selectedObj.height - 4 * selectedObj.listboxpinsize;
                    }

                    selectedObj.listboxpin1x = delta[0];
                    selectedObj.listboxpin1y = delta[1];

                    break;
                case 9 :
                    var below1 = ((selectedObj.height / selectedObj.width) * delta[0] > delta[1]);
                    var below2 = ((-selectedObj.height / selectedObj.width) * delta[0]
                        + selectedObj.height >= delta[1]);

                    if(below1 && below2) {
                        delta[0] = (delta[0] >= 0) ? delta[0] : 0;
                        delta[0] = (delta[0] < selectedObj.width - 4 * selectedObj.listboxpinsize)
                            ? delta[0] : selectedObj.width - 4 * selectedObj.listboxpinsize;
                        delta[1] = 0;
                    } else if(below1 && !below2) {
                        delta[0] = selectedObj.width;
                        delta[1] = (delta[1] >= 0) ? delta[1] : 0;
                        delta[1] = (delta[1] < selectedObj.height - 4 * selectedObj.listboxpinsize)
                            ? delta[1] : selectedObj.height - 4 * selectedObj.listboxpinsize;
                    } else if(!below1 && !below2) {
                        delta[0] = (delta[0] >= 0) ? delta[0] : 0;
                        delta[0] = (delta[0] < selectedObj.width - 4 * selectedObj.listboxpinsize)
                            ? delta[0] : selectedObj.width - 4 * selectedObj.listboxpinsize;
                        delta[1] = selectedObj.height;
                    } else {
                        delta[0] = 0;
                        delta[1] = (delta[1] >= 0) ? delta[1] : 0;
                        delta[1] = (delta[1] < selectedObj.height - 4 * selectedObj.listboxpinsize)
                            ? delta[1] : selectedObj.height - 4 * selectedObj.listboxpinsize;
                    }

                    selectedObj.listboxpin2x = delta[0];
                    selectedObj.listboxpin2y = delta[1];

                    break;
            }
            break;
        case "line" :
            switch(expectResize) {
                case 0 :
                    selectedObj.x1 = mx;
                    selectedObj.y1 = my;
                    break;
                case 1 :
                    selectedObj.x2 = mx;
                    selectedObj.y2 = my;
                    break;
            }
            break;
        case "bezier" :
            switch(expectResize) {
                case 0 :
                    selectedObj.x1 = mx;
                    selectedObj.y1 = my;
                    break;
                case 1 :
                    selectedObj.x2 = mx;
                    selectedObj.y2 = my;
                    break;
                case 2 :
                    selectedObj.ctrl1x = mx;
                    selectedObj.ctrl1y = my;
                    break;
                case 3 :
                    selectedObj.ctrl2x = mx;
                    selectedObj.ctrl2y = my;
                    break;
            }
            break;
        case "polygon" :
        case "polyline" :
            selectedObj.points[expectResize].x = mx;
            selectedObj.points[expectResize].y = my;
            break;
        case "path" :
            break;
    }
}

function transformX(x, y, angle, shift) {
    return x * Math.cos(angle) - y * Math.sin(angle) + shift;
}

function transformY(x, y, angle, shift) {
    return x * Math.sin(angle) + y * Math.cos(angle) + shift;
}

function inverseTransform(x, h, y, k, angle) {
    var dx = (x - h) * Math.cos(angle) + (y - k) * Math.sin(angle);
    var dy = (y - k) * Math.cos(angle) - (x - h) * Math.sin(angle);
    return [dx, dy];
}
