
CanvasRenderingContext2D.prototype.drawClass = function (classObj) {
    this.save();
    this.translate(classObj.x, classObj.y);
    this.rotate(classObj.rotate / 180 * Math.PI);

    var attLen = classObj.showattributes ? classObj.attributes.length : 0;
    var opLen = classObj.showoperations ? classObj.operations.length : 0;
    var tempLen = classObj.templateclass ? classObj.templates.length : 0;
    var hasStereotype = (classObj.stereotype != "");
    var V_MARGIN = (classObj.height - classObj.fontsize * (attLen + opLen +
        (hasStereotype ? 1 : 0)) - classObj.classfontsize - 3 * classObj.linewidth) /
        (attLen + opLen + 4);
    V_MARGIN = (V_MARGIN < 0) ? 0 : V_MARGIN;
    var V_INC = V_MARGIN + classObj.fontsize;

    var yTemp0;
    if(!(classObj.showattributes || classObj.showoperations) ||
            classObj.activeclass || classObj.qualifiedassociation) {
        yTemp0 = 0.5 * (classObj.height + classObj.classfontsize);
    } else {
        yTemp0 = classObj.fontsize * (hasStereotype ? 1 : 0) + V_MARGIN + classObj.classfontsize;
    }

    var yTemp1 = yTemp0 + V_MARGIN + classObj.linewidth;
    var yTemp2 = yTemp1 + attLen * V_INC + V_MARGIN + classObj.linewidth;
    var i;

    this.fillRect(0, 0, classObj.width, classObj.height);
    this.strokeRect(0, 0, classObj.width, classObj.height);

    this.setFillAndStroke(classObj.textcolor, classObj.textcolor);
    this.textBaseline = "bottom";
    this.textAlign = "center";

    // Draw class name
    this.font = (classObj.abstractclass ? "italic" : "normal") + " bold " +
        classObj.classfontsize + "px sans-serif";
    //this.fillText(classObj.classname, 0.5 * classObj.width, yTemp0);
    this.drawWrappedText(classObj.width, Math.min(yTemp0, classObj.height),
        classObj.classname, classObj.classfontsize, 0.5 * classObj.width,
        yTemp0 - classObj.classfontsize);


    this.font = "normal normal " + classObj.fontsize + "px sans-serif";
    if(hasStereotype) {
        this.drawWrappedText(classObj.width, Math.min(yTemp0 - classObj.classfontsize, classObj.height),
            "<<" + classObj.stereotype + ">>", classObj.fontsize, 0.5 * classObj.width,
            yTemp0 - classObj.classfontsize - classObj.fontsize);
        //this.fillText("<<" + classObj.stereotype + ">>", 0.5 * classObj.width,
        //    yTemp0 - classObj.classfontsize);
    }

    if(classObj.activeclass) {
        this.setFillAndStroke(classObj.fillcolor, classObj.strokestyle);
        this.drawSolidLine(H_MARGIN, 0, H_MARGIN, classObj.height);
        this.drawSolidLine(classObj.width - H_MARGIN, 0, classObj.width - H_MARGIN, classObj.height);

        if(!classObj.qualifiedassociation) {
            this.restore();
            return;
        }
    }

    if(classObj.qualifiedassociation) {
        this.setFillAndStroke(classObj.fillcolor, classObj.strokestyle);
        this.fillRect(classObj.width, 0.25 * classObj.height, 0.75 * classObj.width, 0.5 * classObj.height);
        this.strokeRect(classObj.width, 0.25 * classObj.height, 0.75 * classObj.width, 0.5 * classObj.height);

        this.setFillAndStroke(classObj.textcolor, classObj.strokestyle);
        this.drawWrappedText(0.75 * classObj.width, 0.75 * classObj.height,
            classObj.qualifier, classObj.fontsize, classObj.width + 0.375 *
            classObj.width, 0.5 * (classObj.height - classObj.fontsize));
        //this.fillText(classObj.qualifier, classObj.width + 0.375 * classObj.width,
        //    0.5 * (classObj.height + classObj.fontsize));

        this.restore();
        return;
    }

    if(classObj.showattributes || classObj.showoperations) {
        this.setFillAndStroke(classObj.fillcolor, classObj.strokestyle);
        if(yTemp1 - classObj.linewidth < classObj.height)
            this.drawSolidLine(0, yTemp1 - classObj.linewidth, classObj.width, yTemp1 - classObj.linewidth);
        if(yTemp2 - classObj.linewidth < classObj.height)
            this.drawSolidLine(0, yTemp2 - classObj.linewidth, classObj.width, yTemp2 - classObj.linewidth);
    }

    this.setFillAndStroke(classObj.textcolor, classObj.textcolor);
    this.textAlign = "start";

    // Draw attributes
    this.font = "normal normal " + classObj.fontsize + "px sans-serif";
    i = -1;
    while(++i < attLen) {
        yTemp1 += V_INC;
        this.drawWrappedText(classObj.width - H_MARGIN, Math.min(yTemp1, classObj.height),
            classObj.attributes[i].value, classObj.fontsize, H_MARGIN,
            yTemp1 - classObj.fontsize);
        //this.fillText(classObj.attributes[i].value, H_MARGIN, yTemp1);
        if(classObj.attributes[i].isstatic && classObj.width > H_MARGIN && yTemp1 <= classObj.height) {
            var attrWidth = Math.min(classObj.width, H_MARGIN +
                this.measureText(classObj.attributes[i].value).width);
            this.drawSolidLine(H_MARGIN, yTemp1, attrWidth, yTemp1);
        }
    }

    // Draw operations
    i = -1;
    while(++i < opLen) {
        if(classObj.operations[i].isabstract) {
            this.font = "italic normal " + classObj.fontsize + "px sans-serif";
        } else {
            this.font = "normal normal " + classObj.fontsize + "px sans-serif";
        }
        yTemp2 += V_INC;
        this.drawWrappedText(classObj.width - H_MARGIN, Math.min(yTemp2, classObj.height),
            classObj.operations[i].value, classObj.fontsize, H_MARGIN,
            yTemp2 - classObj.fontsize);
        //this.fillText(classObj.operations[i].value, H_MARGIN, yTemp2);
        if(classObj.operations[i].isstatic && classObj.width > H_MARGIN && yTemp2 <= classObj.height) {
            var opWidth = Math.min(classObj.width, H_MARGIN +
                this.measureText(classObj.operations[i].value).width);
            this.drawSolidLine(H_MARGIN, yTemp2, opWidth, yTemp2);
        }
    }

    // For the template classes
    this.font = "normal normal " + classObj.fontsize + "px sans-serif";
    if(classObj.templateclass) {
        var tV_INC = 0;
        var templateWidth = 0;
        var tx1 = 0;
        var ty1 = 0;
        var tx2 = 0;
        var ty2 = 0;

        tV_INC = H_MARGIN + classObj.fontsize;
        var templateHeight = tV_INC * classObj.templates.length + H_MARGIN;

        var temp;
        for(i = 0; i < classObj.templates.length; i++) {
            temp = this.measureText(classObj.templates[i]).width;
            if(temp > templateWidth) templateWidth = temp;
        }
        templateWidth += 2 * H_MARGIN;

        if((classObj.width - this.measureText(classObj.classname).width) < templateWidth) {
            ty2 = 0.75 * V_MARGIN;
            if (classObj.width < 1.5 * templateWidth)
                tx1 = 0.5 * classObj.width;
            else
                tx1 = classObj.width - 0.75 * templateWidth;
        } else {
            if ((classObj.width - this.measureText(classObj.classname).width) < 1.5 * templateWidth)
                tx1 = 0.5 * classObj.width + H_MARGIN + 0.5 * this.measureText(classObj.classname).width;
            else
                tx1 = classObj.width - 0.75 * templateWidth;
            if((classObj.fontsize + 2 * (V_MARGIN + classObj.linewidth)) < 1.5 * templateHeight)
                ty2 = 0.5 * classObj.fontsize + V_MARGIN;
            else
                ty2 = 0.75 * templateHeight;
        }

        ty1 = ty2 - templateHeight;
        tx2 = tx1 + templateWidth;

        this.setFillAndStroke(classObj.fillcolor, classObj.strokestyle);
        this.fillRect(tx1, ty1, templateWidth, templateHeight);
        this.drawDashedLine(tx1, ty1, tx1, ty2, [5,5]);
        this.drawDashedLine(tx1, ty1, tx2, ty1, [5,5]);
        this.drawDashedLine(tx2, ty1, tx2, ty2, [5,5]);
        this.drawDashedLine(tx1, ty2, tx2, ty2, [5,5]);

        // Draw templates
        this.setFillAndStroke(classObj.textcolor, classObj.strokestyle);
        var yTemp3 = ty1;
        i = -1;
        while(++i < tempLen) {
            yTemp3 += tV_INC;
            this.textAlign = "center";
            this.fillText(classObj.templates[i].value, tx1 + 0.5 * templateWidth, yTemp3);
        }
    }

    this.restore();
};

CanvasRenderingContext2D.prototype.drawNote = function (noteObj) {
    this.save();
    this.translate(noteObj.x, noteObj.y);
    this.rotate(noteObj.rotate / 180 * Math.PI);

    var foldlen = (noteObj.height > noteObj.width) ? noteObj.width : noteObj.height;
    foldlen *= 0.25;

    var x1 = 0;
    var x2 = x1 + noteObj.width;
    var x3 = x2 - foldlen;
    var y1 = 0;
    var y2 = y1 + noteObj.height;
    var y3 = y1 + foldlen;

    this.beginPath();
    this.moveTo(x3, y1);
    this.lineTo(x1, y1);
    this.lineTo(x1, y2);
    this.lineTo(x2, y2);
    this.lineTo(x2, y3);
    this.lineTo(x3, y1);
    this.fill();
    this.moveTo(x3, y1);
    this.lineTo(x3, y3);
    this.lineTo(x2, y3);
    this.stroke();

    // Write the textual content
    this.textBaseline = "top";
    this.font = noteObj.fontstyle + " " + noteObj.fontweight + " " + noteObj.fontsize
        + "px " + noteObj.fontfamily;
    this.setFillAndStroke(noteObj.textcolor, noteObj.strokestyle);
    var maxwidth = noteObj.width - 2 * H_MARGIN;
    var maxheight = y2 - H_MARGIN - noteObj.fontsize;
    this.drawWrappedText(maxwidth, maxheight, noteObj.label, noteObj.fontsize, x1 + H_MARGIN, y3);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawInstance = function (instanceObj) {
    this.save();
    this.translate(instanceObj.x, instanceObj.y);
    this.rotate(instanceObj.rotate / 180 * Math.PI);

    var attLen = instanceObj.showattributes ? instanceObj.attributes.length : 0;
    var V_MARGIN = (instanceObj.height - instanceObj.fontsize * (attLen + 1)) / (attLen + 3);
    V_MARGIN = (V_MARGIN < 0) ? 0 : V_MARGIN;
    var V_INC = V_MARGIN + instanceObj.fontsize;

    var yTemp0;
    if(!instanceObj.showattributes) {
        yTemp0 = 0.5 * (instanceObj.height + instanceObj.fontsize);
    } else {
        yTemp0 = V_MARGIN + instanceObj.fontsize;
    }

    var yTemp1 = yTemp0 + V_MARGIN;

    this.fillRect(0, 0, instanceObj.width, instanceObj.height);
    this.strokeRect(0, 0, instanceObj.width, instanceObj.height);

    this.font = "normal" + " normal " + instanceObj.fontsize + "px sans-serif";
    this.setFillAndStroke(instanceObj.textcolor, instanceObj.textcolor);
    this.textBaseline = "bottom";
    this.textAlign = "center";

    // Draw instance name and class name
    var completeName = instanceObj.instancename +
        ((instanceObj.classname != "") ? " : " + instanceObj.classname : "");
    this.drawWrappedText(instanceObj.width, Math.min(yTemp0, instanceObj.height), 
        completeName, instanceObj.fontsize, 0.5 * instanceObj.width,
        yTemp0 - instanceObj.fontsize);
    //this.fillText(completeName, 0.5 * instanceObj.width, yTemp0);
    var xTemp = Math.max(0, 0.5 * instanceObj.width - 0.5 * this.measureText(completeName).width);
    if(yTemp0 <= instanceObj.height)
        this.drawSolidLine(xTemp, yTemp0, xTemp + Math.min(this.measureText(completeName).width, instanceObj.width), yTemp0);

    if(instanceObj.showattributes && yTemp1 < instanceObj.height) {
        this.setFillAndStroke(instanceObj.fillcolor, instanceObj.strokestyle);
        this.drawSolidLine(0, yTemp1, instanceObj.width, yTemp1);

        this.setFillAndStroke(instanceObj.textcolor, instanceObj.textcolor);
        this.textAlign = "start";

        // Draw attributes
        var i = 0;
        while(i < attLen) {
            yTemp1 += V_INC;
            this.drawWrappedText(instanceObj.width - H_MARGIN, Math.min(yTemp1, instanceObj.height),
                instanceObj.attributes[i].value, instanceObj.fontsize, H_MARGIN,
                yTemp1 - instanceObj.fontsize);
            //this.fillText(instanceObj.attributes[i].value, H_MARGIN, yTemp1);
            //if(instanceObj.attributes[i].isstatic) {
            if(instanceObj.attributes[i].isstatic && instanceObj.width > H_MARGIN && yTemp1 <= instanceObj.height) {
                var attrWidth = Math.min(instanceObj.width, H_MARGIN +
                    this.measureText(instanceObj.attributes[i].value).width);
                this.drawSolidLine(H_MARGIN, yTemp1, attrWidth, yTemp1);
                //this.drawSolidLine(H_MARGIN, yTemp1,
                //    H_MARGIN + this.measureText(instanceObj.attributes[i].value).width, yTemp1);
            }
            i++;
        }
    }

    this.restore();
};

CanvasRenderingContext2D.prototype.drawNode = function (nodeObj) {
    this.save();
    this.translate(nodeObj.x, nodeObj.y);
    this.rotate(nodeObj.rotate / 180 * Math.PI);

    // Draw box
    this.fillRect(0, 0, nodeObj.width, nodeObj.height);
    this.strokeRect(0, 0, nodeObj.width, nodeObj.height);
    this.beginPath();
    this.moveTo(nodeObj.width + DEFAULT_NODE_THICKNESS, -DEFAULT_NODE_THICKNESS);
    this.lineTo(DEFAULT_NODE_THICKNESS, -DEFAULT_NODE_THICKNESS);
    this.lineTo(0, 0);
    this.lineTo(nodeObj.width, 0);
    this.lineTo(nodeObj.width + DEFAULT_NODE_THICKNESS, -DEFAULT_NODE_THICKNESS);
    this.lineTo(nodeObj.width + DEFAULT_NODE_THICKNESS, nodeObj.height - DEFAULT_NODE_THICKNESS);
    this.lineTo(nodeObj.width, nodeObj.height);
    this.lineTo(nodeObj.width, 0);
    this.fill();
    this.stroke();

    var tggdvalLen = nodeObj.taggedvalues.length;
    var artfLen = nodeObj.showartifacts ? nodeObj.containedartifacts.length : 0;
    var hasStereotype = (nodeObj.stereotype == "" ? false : true);
    var V_MARGIN = (Math.min(nodeObj.height, nodeObj.topheight) - nodeObj.fontsize * (tggdvalLen + (hasStereotype ? 2 : 1))) / (tggdvalLen + 2);
    V_MARGIN = (V_MARGIN < 0) ? 0 : V_MARGIN;
    var V_INC = V_MARGIN + nodeObj.fontsize;

    var yTemp0 = V_MARGIN + nodeObj.fontsize * (nodeObj.stereotype == "" ? 1 : 2);
    this.setFillAndStroke(nodeObj.textcolor, nodeObj.textcolor);
    this.textBaseline = "bottom";
    this.textAlign = "center";

    // Draw top compartment
    if(nodeObj.stereotype != "") {
        this.font = "normal normal " + nodeObj.fontsize + "px sans-serif";
        this.drawWrappedText(nodeObj.width, Math.min(yTemp0 - nodeObj.fontsize, 
            nodeObj.topheight, nodeObj.height), "<<" + nodeObj.stereotype + ">>", 
            nodeObj.fontsize, 0.5 * nodeObj.width, yTemp0 - 2 * nodeObj.fontsize);
        //this.fillText("<<" + nodeObj.stereotype + ">>", 0.5 * nodeObj.width,
        //    yTemp0 - nodeObj.fontsize);
    }
    // Draw Node name
    this.font = "normal" + " bold " + nodeObj.fontsize + "px sans-serif";
    this.drawWrappedText(nodeObj.width, Math.min(yTemp0, nodeObj.topheight, nodeObj.height),
        nodeObj.nodename, nodeObj.fontsize, 0.5 * nodeObj.width, yTemp0 - nodeObj.fontsize);
    //this.fillText(nodeObj.nodename, 0.5 * nodeObj.width, yTemp0);

    // Draw tagged values
    this.font = "normal" + " normal " + nodeObj.fontsize + "px sans-serif";
    for(var i = 0; i < tggdvalLen; i++) {
        yTemp0 += V_INC;
        this.drawWrappedText(nodeObj.width, Math.min(yTemp0, nodeObj.topheight,
            nodeObj.height), "{" + nodeObj.taggedvalues[i] + "}", nodeObj.fontsize,
            0.5 * nodeObj.width, yTemp0 - nodeObj.fontsize);
        //this.fillText("{" + nodeObj.taggedvalues[i] + "}", 0.5 * nodeObj.width, yTemp0);
    }

    if(nodeObj.topheight <= nodeObj.height) {
        this.setFillAndStroke(nodeObj.fillcolor, nodeObj.strokestyle);
        this.drawSolidLine(0, nodeObj.topheight, nodeObj.width, nodeObj.topheight);

        // Draw contained artifacts
        if(nodeObj.showartifacts) {
            this.setFillAndStroke(nodeObj.textcolor, nodeObj.textcolor);
            this.textAlign = "start";

            var yTemp1 = nodeObj.topheight;
            for(var i = 0; i < artfLen; i++) {
                yTemp1 += H_MARGIN + nodeObj.fontsize;
                this.drawWrappedText(nodeObj.width - H_MARGIN, Math.min(yTemp1, nodeObj.height),
                    nodeObj.containedartifacts[i], nodeObj.fontsize, H_MARGIN,
                    yTemp1 - nodeObj.fontsize);
                //this.fillText(nodeObj.containedartifacts[i], H_MARGIN, yTemp1);
            }
        }
    }

    this.restore();
};

CanvasRenderingContext2D.prototype.drawStatebox = function (sbObj) {
    this.save();
    this.translate(sbObj.x, sbObj.y);
    this.rotate(sbObj.rotate / 180 * Math.PI);

    // Draw rounded rectangle box
    var rectRad = DEFAULT_RADIUSRATIO * ((sbObj.width < sbObj.height) ? sbObj.width : sbObj.height);
    this.drawRoundedRectangle(0, 0, sbObj.width, sbObj.height, rectRad, 0);

    var ialen = sbObj.showinternalactivities ? sbObj.internalactivitys.length : 0;
    var V_MARGIN = (sbObj.height - sbObj.fontsize * (ialen + 1) - 2 * rectRad) / (ialen + 1);
    V_MARGIN = (V_MARGIN < 0) ? 0 : V_MARGIN;
    var V_INC = V_MARGIN + sbObj.fontsize;

    var yTemp0;
    if(!sbObj.showinternalactivities || sbObj.internalactivitys.length == 0) {
        yTemp0 = 0.5 * (sbObj.height + sbObj.fontsize);
    } else {
        yTemp0 = V_INC;
    }

    this.setFillAndStroke(sbObj.textcolor, sbObj.textcolor);
    this.textBaseline = "bottom";
    this.textAlign = "center";

    // Draw state name
    this.font = "normal" + " bold " + sbObj.fontsize + "px sans-serif";
    this.drawWrappedText(sbObj.width, Math.min(yTemp0, sbObj.height), sbObj.statename, sbObj.fontsize,
        0.5 * sbObj.width, yTemp0 - sbObj.fontsize);
    //this.fillText(sbObj.statename, 0.5 * sbObj.width, yTemp0);

    // Draw internal activities
    var yTemp1 = yTemp0 + V_MARGIN;
    if(sbObj.showinternalactivities && sbObj.internalactivitys.length != 0 && yTemp1 <= sbObj.height) {
        this.font = "normal" + " normal " + sbObj.fontsize + "px sans-serif";
        this.setFillAndStroke(sbObj.fillcolor, sbObj.strokestyle);
        this.drawSolidLine(0, yTemp1, sbObj.width, yTemp1);
        yTemp1 += rectRad + sbObj.fontsize;

        this.setFillAndStroke(sbObj.textcolor, sbObj.textcolor);
        this.textAlign = "start";

        for(var i = 0; i < ialen; i++) {
            this.drawWrappedText(sbObj.width - rectRad, Math.min(yTemp1, sbObj.height),
                sbObj.internalactivitys[i], sbObj.fontsize, rectRad, yTemp1- sbObj.fontsize);
            //this.fillText(sbObj.internalactivitys[i], rectRad, yTemp1);
            yTemp1 += V_INC;
        }
    }

    this.restore();
};

CanvasRenderingContext2D.prototype.drawListBoxPin = function(x, y, lbpSize, horizontal) {
    if(horizontal) {
        this.beginPath();
        this.moveTo(x, y - 0.5 * lbpSize);
        this.lineTo(x + 4 * lbpSize, y - 0.5 * lbpSize);
        this.lineTo(x + 4 * lbpSize, y + 0.5 * lbpSize);
        this.lineTo(x, y + 0.5 * lbpSize);
        this.closePath();
        this.moveTo(x + lbpSize, y - 0.5 * lbpSize);
        this.lineTo(x + lbpSize, y + 0.5 * lbpSize);
        this.moveTo(x + 2 * lbpSize, y - 0.5 * lbpSize);
        this.lineTo(x + 2 * lbpSize, y + 0.5 * lbpSize);
        this.moveTo(x + 3 * lbpSize, y - 0.5 * lbpSize);
        this.lineTo(x + 3 * lbpSize, y + 0.5 * lbpSize);
    } else {
        this.beginPath();
        this.moveTo(x - 0.5 * lbpSize, y);
        this.lineTo(x - 0.5 * lbpSize, y + 4 * lbpSize);
        this.lineTo(x + 0.5 * lbpSize, y + 4 * lbpSize);
        this.lineTo(x + 0.5 * lbpSize, y);
        this.closePath();
        this.moveTo(x - 0.5 * lbpSize, y + lbpSize);
        this.lineTo(x + 0.5 * lbpSize, y + lbpSize);
        this.moveTo(x - 0.5 * lbpSize, y + 2 * lbpSize);
        this.lineTo(x + 0.5 * lbpSize, y + 2 * lbpSize);
        this.moveTo(x - 0.5 * lbpSize, y + 3 * lbpSize);
        this.lineTo(x + 0.5 * lbpSize, y + 3 * lbpSize);
    }
    this.fill();
    this.stroke();
};

CanvasRenderingContext2D.prototype.drawExpansionregion = function (erObj) {
    this.save();
    this.translate(erObj.x, erObj.y);
    this.rotate(erObj.rotate / 180 * Math.PI);

    var rectRad = DEFAULT_RADIUSRATIO * ((erObj.width < erObj.height) ? erObj.width : erObj.height);
    this.drawDashedRoundedRect(0, 0, erObj.width, erObj.height, rectRad, 0, [7, this.lineWidth + 7]);

    // Draw list box pins
    this.drawListBoxPin(erObj.listboxpin1x, erObj.listboxpin1y, erObj.listboxpinsize,
        ((erObj.listboxpin1y == 0 && erObj.listboxpin1x < erObj.width) ||
          erObj.listboxpin1y == erObj.height));
    this.drawListBoxPin(erObj.listboxpin2x, erObj.listboxpin2y, erObj.listboxpinsize,
        ((erObj.listboxpin2y == 0 && erObj.listboxpin2x < erObj.width) ||
          erObj.listboxpin2y == erObj.height));

    this.restore();
};

CanvasRenderingContext2D.prototype.drawArrowheadNotation = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.beginPath();
    this.moveTo(0, 0);
    this.lineTo(0, h);
    this.lineTo(w, 0.5 * h);
    this.closePath();
    this.fill();
    this.stroke();
    
    this.restore();
};

CanvasRenderingContext2D.prototype.drawActivationBar = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.strokeRect(0, 0, w, h);
    this.fillRect(0, 0, w, h);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawLifeline = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.drawDashedLine(w / 2, 0, w / 2, h, [7, this.lineWidth + 7]);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawDeletion = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.drawSolidLine(0, 0, w, h);
    this.drawSolidLine(w, 0, 0, h);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawFilledCircle = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    var rad = Math.min(w, h) / 2;
    this.beginPath();
    this.arc(w / 2, h - rad, rad, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();
    this.stroke();

    this.restore();
};

CanvasRenderingContext2D.prototype.drawBorderedFilledCircle = function (fsObj) {
    this.save();
    this.translate(fsObj.x, fsObj.y);
    this.rotate(fsObj.rotate / 180 * Math.PI);

    var rad = Math.min(fsObj.width, fsObj.height) / 2;
    this.beginPath();
    this.arc(fsObj.width / 2, fsObj.height - rad, rad, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();
    this.stroke();

    this.setFillAndStroke(fsObj.strokestyle, fsObj.strokestyle);
    var rad2 = rad * (1 - DEFAULT_FINALSTATE_BORDER);
    this.beginPath();
    this.arc(fsObj.width / 2, fsObj.height - rad, rad2, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();

    this.restore();
};

CanvasRenderingContext2D.prototype.drawShallowHistPS = function (shObj) {
    this.save();
    this.translate(shObj.x, shObj.y);
    this.rotate(shObj.rotate / 180 * Math.PI);

    var rad = Math.min(shObj.width, shObj.height) / 2;
    this.beginPath();
    this.arc(shObj.width / 2, shObj.height - rad, rad, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();
    this.stroke();

    this.setFillAndStroke(shObj.strokestyle, shObj.strokestyle);
    this.textBaseline = "middle";
    this.font = "normal bold " + rad + "px sans-serif";
    this.textAlign = "center";
    this.fillText("H", shObj.width / 2, shObj.height - rad);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawDeepHistPS = function (dhObj) {
    this.save();
    this.translate(dhObj.x, dhObj.y);
    this.rotate(dhObj.rotate / 180 * Math.PI);

    var rad = Math.min(dhObj.width, dhObj.height) / 2;
    this.beginPath();
    this.arc(dhObj.width / 2, dhObj.height - rad, rad, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();
    this.stroke();

    this.setFillAndStroke(dhObj.strokestyle, dhObj.strokestyle);
    this.textBaseline = "middle";
    this.font = "normal bold " + rad + "px sans-serif";
    this.textAlign = "center";
    this.fillText("H*", dhObj.width / 2, dhObj.height - rad);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawBlackBar = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.fillRect(0, (h - DEFAULT_BLACKBAR_THICKNESS) / 2, w, DEFAULT_BLACKBAR_THICKNESS);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawDiamond = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.beginPath();
    this.moveTo(w / 2, 0);
    this.lineTo(w, h / 2);
    this.lineTo(w / 2, h);
    this.lineTo(0, h / 2);
    this.closePath();
    this.fill();
    this.stroke();

    this.restore();
};

CanvasRenderingContext2D.prototype.drawSmallSquare = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    var side = Math.min(w, h);
    this.fillRect(0, 0, side, side);
    this.strokeRect(0, 0, side, side);
    
    this.restore();
};

CanvasRenderingContext2D.prototype.drawFlowFinal = function (shObj) {
    this.save();
    this.translate(shObj.x, shObj.y);
    this.rotate(shObj.rotate / 180 * Math.PI);

    var rad = Math.min(shObj.width, shObj.height) / 2;
    this.beginPath();
    this.moveTo(shObj.width / 2, shObj.height - rad, rad);
    this.arc(shObj.width / 2, shObj.height - rad, rad, Math.PI * 0.25, Math.PI * 0.75, false);
    this.lineTo(shObj.width / 2, shObj.height - rad, rad);
    this.arc(shObj.width / 2, shObj.height - rad, rad, Math.PI * 0.75, Math.PI * 1.25, false);
    this.lineTo(shObj.width / 2, shObj.height - rad, rad);
    this.arc(shObj.width / 2, shObj.height - rad, rad, Math.PI * 1.25, Math.PI * 1.75, false);
    this.lineTo(shObj.width / 2, shObj.height - rad, rad);
    this.arc(shObj.width / 2, shObj.height - rad, rad, Math.PI * 1.75, Math.PI * 2.25, false);
    this.closePath();
    this.fill();
    this.stroke();

    this.restore();
};

