
CanvasRenderingContext2D.prototype.drawFrame = function (frameObj) {
    this.save();
    this.translate(frameObj.x, frameObj.y);
    this.rotate(frameObj.rotate / 180 * Math.PI);

    this.font = frameObj.fontstyle + " " + frameObj.fontweight + " " + frameObj.fontsize
        + "px " + frameObj.fontfamily;
    var labelWidth = Math.min(this.measureText(frameObj.label).width + H_MARGIN * 3, frameObj.width / 2);
    var labelThickness = Math.min(H_MARGIN * 2 + frameObj.fontsize, frameObj.height / 5);

    this.beginPath();
    this.moveTo(labelWidth, 0);
    this.lineTo(0, 0);
    this.lineTo(0, frameObj.height);
    this.lineTo(frameObj.width, frameObj.height);
    this.lineTo(frameObj.width, 0);
    this.lineTo(labelWidth, 0);
    this.fill();
    this.lineTo(labelWidth, labelThickness / 2);
    this.lineTo(labelWidth - labelThickness / 2, labelThickness);
    this.lineTo(0, labelThickness);
    this.stroke();

    // Write the label
    this.textBaseline = "bottom";
    this.setFillAndStroke(frameObj.textcolor, frameObj.strokestyle);
    var maxwidth = labelWidth - 2 * H_MARGIN;
    this.drawWrappedText(maxwidth, labelThickness, frameObj.label, frameObj.fontsize, H_MARGIN, H_MARGIN);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawPackage1 = function (pkg1Obj) {
    this.save();
    this.translate(pkg1Obj.x, pkg1Obj.y);
    this.rotate(pkg1Obj.rotate / 180 * Math.PI);

    this.font = pkg1Obj.fontstyle + " " + pkg1Obj.fontweight + " " + pkg1Obj.fontsize
        + "px " + pkg1Obj.fontfamily;
    var labelWidth = pkg1Obj.width / 3;
    var labelThickness = Math.min(H_MARGIN * 2 + pkg1Obj.fontsize, pkg1Obj.height / 5);

    this.beginPath();
    this.moveTo(0, 0);
    this.lineTo(0, pkg1Obj.height);
    this.lineTo(pkg1Obj.width, pkg1Obj.height);
    this.lineTo(pkg1Obj.width, labelThickness);
    this.lineTo(labelWidth, labelThickness);
    this.lineTo(labelWidth, 0);
    this.closePath();
    this.fill();
    this.moveTo(0, labelThickness);
    this.lineTo(labelWidth, labelThickness);
    this.stroke();

    // Write the label
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(pkg1Obj.textcolor, pkg1Obj.strokestyle);
    var nameHeight = this.getWrappedTextHeight(pkg1Obj.width - 2 * H_MARGIN, 
        pkg1Obj.height - labelThickness, pkg1Obj.label, pkg1Obj.fontsize,
        pkg1Obj.width / 2, labelThickness + H_MARGIN);
    this.drawWrappedText(pkg1Obj.width - 2 * H_MARGIN, pkg1Obj.height - labelThickness, pkg1Obj.label,
        pkg1Obj.fontsize, pkg1Obj.width / 2, 
        (pkg1Obj.height + labelThickness - nameHeight) / 2)

    this.restore();
};

CanvasRenderingContext2D.prototype.drawPackage2 = function (pkg2Obj) {
    this.save();
    this.translate(pkg2Obj.x, pkg2Obj.y);
    this.rotate(pkg2Obj.rotate / 180 * Math.PI);

    this.font = pkg2Obj.fontstyle + " " + pkg2Obj.fontweight + " " + pkg2Obj.fontsize
        + "px " + pkg2Obj.fontfamily;
    var labelWidth = Math.min(this.measureText(pkg2Obj.label).width + H_MARGIN * 3, pkg2Obj.width / 2);
    var labelThickness = Math.min(H_MARGIN * 2 + pkg2Obj.fontsize, pkg2Obj.height / 5);

    this.beginPath();
    this.moveTo(0, 0);
    this.lineTo(0, pkg2Obj.height);
    this.lineTo(pkg2Obj.width, pkg2Obj.height);
    this.lineTo(pkg2Obj.width, labelThickness);
    this.lineTo(labelWidth, labelThickness);
    this.lineTo(labelWidth, 0);
    this.closePath();
    this.fill();
    this.moveTo(0, labelThickness);
    this.lineTo(labelWidth, labelThickness);
    this.stroke();

    // Write the label
    this.textBaseline = "bottom";
    this.setFillAndStroke(pkg2Obj.textcolor, pkg2Obj.strokestyle);
    var maxwidth = labelWidth - 2 * H_MARGIN;
    this.drawWrappedText(maxwidth, labelThickness, pkg2Obj.label, pkg2Obj.fontsize, H_MARGIN, H_MARGIN);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawComponent = function (compObj) {
    this.save();
    this.translate(compObj.x, compObj.y);
    this.rotate(compObj.rotate / 180 * Math.PI);

    this.fillRect(0, 0, compObj.width, compObj.height);
    this.strokeRect(0, 0, compObj.width, compObj.height);

    // Write the label
    this.font = compObj.fontstyle + " " + compObj.fontweight + " " + compObj.fontsize
        + "px " + compObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(compObj.textcolor, compObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(compObj.width - 2 * H_MARGIN,
        compObj.height - 2 * H_MARGIN, compObj.label, compObj.fontsize,
        H_MARGIN, H_MARGIN);
    this.drawWrappedText(compObj.width - 2 * H_MARGIN, compObj.height - 2 * H_MARGIN,
        compObj.label, compObj.fontsize, compObj.width / 2, (compObj.height - nameHeight) / 2)

    // Draw icon
    this.setFillAndStroke(compObj.fillcolor, compObj.strokestyle);
    var compIcon = Math.min(compObj.width, compObj.height) * 0.20;
    var iconX = compObj.width * 0.95 - compIcon * 1.5;//- H_MARGIN - compIcon * 1.5;
    var iconY = compObj.height * 0.06;
    this.strokeRect(iconX, iconY, compIcon * 1.5, compIcon);
    var tempH = compIcon * 0.20;
    var tempW = compIcon * 0.40;
    this.fillRect(iconX - tempW / 2, iconY + compIcon * 0.2, tempW, tempH);
    this.strokeRect(iconX - tempW / 2, iconY + compIcon * 0.2, tempW, tempH);
    this.fillRect(iconX - tempW / 2, iconY + compIcon * 0.6, tempW, tempH);
    this.strokeRect(iconX - tempW / 2, iconY + compIcon * 0.6, tempW, tempH);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawArtifact = function (artfObj) {
    this.save();
    this.translate(artfObj.x, artfObj.y);
    this.rotate(artfObj.rotate / 180 * Math.PI);

    this.fillRect(0, 0, artfObj.width, artfObj.height);
    this.strokeRect(0, 0, artfObj.width, artfObj.height);

    // Write the label
    this.font = artfObj.fontstyle + " " + artfObj.fontweight + " " + artfObj.fontsize
        + "px " + artfObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(artfObj.textcolor, artfObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(artfObj.width - 2 * H_MARGIN,
        artfObj.height - 2 * H_MARGIN, artfObj.label, artfObj.fontsize,
        H_MARGIN, H_MARGIN);
    this.drawWrappedText(artfObj.width - 2 * H_MARGIN, artfObj.height - 2 * H_MARGIN,
        artfObj.label, artfObj.fontsize, artfObj.width / 2, (artfObj.height - nameHeight) / 2);

    // Draw icon
    this.setFillAndStroke(artfObj.fillcolor, artfObj.strokestyle);
    var artfIcon = Math.min(artfObj.width * 0.20, artfObj.height * 0.20);

    var x1 = artfObj.width * 0.95 - artfIcon * 1.5;
    var x2 = x1 + artfIcon * 1.5;
    var x3 = x2 - artfIcon * 0.33;
    var y1 = artfObj.height * 0.06;
    var y2 = y1 + artfIcon;
    var y3 = y1 + artfIcon * 0.33;

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

    this.restore();
};

CanvasRenderingContext2D.prototype.drawUseCase = function (ucObj) {
    this.save();
    this.translate(ucObj.x, ucObj.y);
    this.rotate(ucObj.rotate / 180 * Math.PI);

    this.drawEllipse(0, 0, ucObj.width, ucObj.height, 0)

    // Write the label
    this.font = ucObj.fontstyle + " " + ucObj.fontweight + " " + ucObj.fontsize
        + "px " + ucObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(ucObj.textcolor, ucObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(ucObj.width - 2 * H_MARGIN,
        ucObj.height - 2 * H_MARGIN, ucObj.label, ucObj.fontsize,
        H_MARGIN, H_MARGIN);
    this.drawWrappedText(ucObj.width - 2 * H_MARGIN, ucObj.height - 2 * H_MARGIN,
        ucObj.label, ucObj.fontsize, ucObj.width / 2, (ucObj.height - nameHeight) / 2);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawActor = function (actorObj) {
    this.save();
    this.translate(actorObj.x, actorObj.y);
    this.rotate(actorObj.rotate / 180 * Math.PI);

    var headRad = Math.min(actorObj.height / 12, actorObj.width / 4);

    this.beginPath();
    this.moveTo(actorObj.width / 2, actorObj.height / 6);
    this.arc(actorObj.width / 2, headRad, headRad, Math.PI * 0.5, Math.PI * 2.5, false);
    this.fill();
    this.lineTo(actorObj.width / 2, actorObj.height * 4 / 9);
    this.moveTo(0, actorObj.height * 2 / 9);
    this.lineTo(actorObj.width, actorObj.height * 2 / 9);
    this.moveTo(actorObj.width / 2, actorObj.height * 4 / 9);
    this.lineTo(0, actorObj.height * 2 / 3);
    this.moveTo(actorObj.width / 2, actorObj.height * 4 / 9);
    this.lineTo(actorObj.width, actorObj.height * 2 / 3);
    this.stroke();

    // Write the label
    this.font = actorObj.fontstyle + " " + actorObj.fontweight + " " + actorObj.fontsize
        + "px " + actorObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(actorObj.textcolor, actorObj.strokestyle);

    this.drawWrappedText(actorObj.width, actorObj.height, actorObj.label,
        actorObj.fontsize, actorObj.width / 2, actorObj.height * 2 / 3 + H_MARGIN);
    
    this.restore();
};

CanvasRenderingContext2D.prototype.drawSuperstate = function (ssObj) {
    this.save();
    this.translate(ssObj.x, ssObj.y);
    this.rotate(ssObj.rotate / 180 * Math.PI);

    // Draw rounded rectangle box
    var rectRad = DEFAULT_RADIUSRATIO * ((ssObj.width < ssObj.height) ? ssObj.width : ssObj.height);
    this.drawRoundedRectangle(0, 0, ssObj.width, ssObj.height, rectRad, 0);

    // Write label
    this.setFillAndStroke(ssObj.textcolor, ssObj.textcolor);
    this.font = ssObj.fontstyle + " " + ssObj.fontweight + " " + ssObj.fontsize
            + "px " + ssObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";

    var nameHeight = this.getWrappedTextHeight(ssObj.width - 2 * H_MARGIN, ssObj.height - H_MARGIN,
        ssObj.label, ssObj.fontsize, ssObj.width / 2, H_MARGIN);
    this.drawWrappedText(ssObj.width - 2 * H_MARGIN, ssObj.height - H_MARGIN,
        ssObj.label, ssObj.fontsize, ssObj.width / 2, H_MARGIN);

    var lineY = nameHeight + 0.5 * ssObj.fontsize;
    if(lineY <= ssObj.height) {
        this.setFillAndStroke(ssObj.fillcolor, ssObj.strokestyle);
        this.drawSolidLine(0, lineY, ssObj.width, lineY);
    }
    
    this.restore();
};

CanvasRenderingContext2D.prototype.drawAction = function (actionObj) {
    this.save();
    this.translate(actionObj.x, actionObj.y);
    this.rotate(actionObj.rotate / 180 * Math.PI);

    // Draw rounded rectangle box
    var rectRad = DEFAULT_ACTIONRADIUS * ((actionObj.width < actionObj.height) ?
        actionObj.width : actionObj.height);
    this.drawRoundedRectangle(0, 0, actionObj.width, actionObj.height, rectRad, 0);

    // Write the label
    this.font = actionObj.fontstyle + " " + actionObj.fontweight + " " + actionObj.fontsize
        + "px " + actionObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(actionObj.textcolor, actionObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(actionObj.width - 2 * H_MARGIN,
        actionObj.height - 2 * H_MARGIN, actionObj.label, actionObj.fontsize,
        H_MARGIN, H_MARGIN);
    this.drawWrappedText(actionObj.width - 2 * H_MARGIN, actionObj.height - 2 * H_MARGIN,
        actionObj.label, actionObj.fontsize, actionObj.width / 2, (actionObj.height - nameHeight) / 2);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawSubactivity = function (saObj) {
    this.save();
    this.translate(saObj.x, saObj.y);
    this.rotate(saObj.rotate / 180 * Math.PI);

    // Draw rounded rectangle box
    var rectRad = DEFAULT_ACTIONRADIUS * ((saObj.width < saObj.height) ?
        saObj.width : saObj.height);
    this.drawRoundedRectangle(0, 0, saObj.width, saObj.height, rectRad, 0);

    // Write the label
    this.font = saObj.fontstyle + " " + saObj.fontweight + " " + saObj.fontsize
        + "px " + saObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(saObj.textcolor, saObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(saObj.width - 2 * H_MARGIN,
        saObj.height - 2 * H_MARGIN, saObj.label, saObj.fontsize,
        H_MARGIN, H_MARGIN);
    this.drawWrappedText(saObj.width - 2 * H_MARGIN, saObj.height - 2 * H_MARGIN,
        saObj.label, saObj.fontsize, saObj.width / 2, (saObj.height - nameHeight) / 2);

    // Draw subactivity indicator
    this.setFillAndStroke(saObj.fillcolor, saObj.strokestyle);
    var saIcon = Math.min(saObj.width, saObj.height) * 0.15;
    var iconX = saObj.width * 0.75;
    var iconY = saObj.height * 0.25 - saIcon * 0.5;
    this.beginPath();
    this.moveTo(iconX, iconY);
    this.lineTo(iconX, iconY + saIcon * 0.5);
    this.lineTo(iconX - saIcon * 0.75, iconY + saIcon * 0.5);
    this.lineTo(iconX - saIcon * 0.75, iconY + saIcon);
    this.moveTo(iconX, iconY + saIcon);
    this.lineTo(iconX, iconY + saIcon * 0.5);
    this.lineTo(iconX + saIcon * 0.75, iconY + saIcon * 0.5);
    this.lineTo(iconX + saIcon * 0.75, iconY + saIcon);
    //this.lineTo(iconX - saIcon * 0.75, iconY + saIcon);
    this.stroke();

    this.restore();
};

CanvasRenderingContext2D.prototype.drawTimeSignal = function (tsObj) {
    this.save();
    this.translate(tsObj.x, tsObj.y);
    this.rotate(tsObj.rotate / 180 * Math.PI);

    this.beginPath();
    this.moveTo(0, 0);
    this.lineTo(tsObj.width, 0);
    this.lineTo(0, tsObj.height * 0.75);
    this.lineTo(tsObj.width, tsObj.height * 0.75);
    this.closePath();
    this.fill();
    this.stroke();

    // Write the label
    this.font = tsObj.fontstyle + " " + tsObj.fontweight + " " + tsObj.fontsize
        + "px " + tsObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(tsObj.textcolor, tsObj.strokestyle);

    this.drawWrappedText(tsObj.width - 2 * H_MARGIN, tsObj.height, tsObj.label,
        tsObj.fontsize, tsObj.width / 2, tsObj.height * 0.75 + H_MARGIN);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawAcceptSignal = function (asObj) {
    this.save();
    this.translate(asObj.x, asObj.y);
    this.rotate(asObj.rotate / 180 * Math.PI);

    this.beginPath();
    this.moveTo(0, 0);
    this.lineTo(asObj.width * 0.20, asObj.height / 2);
    this.lineTo(0, asObj.height);
    this.lineTo(asObj.width, asObj.height);
    this.lineTo(asObj.width, 0);
    this.closePath();
    this.fill();
    this.stroke();

    // Write the label
    this.font = asObj.fontstyle + " " + asObj.fontweight + " " + asObj.fontsize
        + "px " + asObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(asObj.textcolor, asObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(asObj.width * 0.8 - 2 * H_MARGIN,
        asObj.height - 2 * H_MARGIN, asObj.label, asObj.fontsize,
         H_MARGIN, H_MARGIN);
    this.drawWrappedText(asObj.width * 0.8 - 2 * H_MARGIN, asObj.height - 2 * H_MARGIN,
        asObj.label, asObj.fontsize, asObj.width * 0.6, (asObj.height - nameHeight) / 2);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawSendSignal = function (ssObj) {
    this.save();
    this.translate(ssObj.x, ssObj.y);
    this.rotate(ssObj.rotate / 180 * Math.PI);

    this.beginPath();
    this.moveTo(0, 0);
    this.lineTo(ssObj.width * 0.8, 0);
    this.lineTo(ssObj.width, ssObj.height * 0.5);
    this.lineTo(ssObj.width * 0.8, ssObj.height);
    this.lineTo(0, ssObj.height);
    this.closePath();
    this.fill();
    this.stroke();

    // Write the label
    this.font = ssObj.fontstyle + " " + ssObj.fontweight + " " + ssObj.fontsize
        + "px " + ssObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(ssObj.textcolor, ssObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(ssObj.width * 0.8 - 2 * H_MARGIN,
        ssObj.height - 2 * H_MARGIN, ssObj.label, ssObj.fontsize,
         + H_MARGIN, H_MARGIN);
    this.drawWrappedText(ssObj.width * 0.8 - 2 * H_MARGIN, ssObj.height - 2 * H_MARGIN,
        ssObj.label, ssObj.fontsize, ssObj.width * 0.4, (ssObj.height - nameHeight) / 2);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawConnector = function (connectorObj) {
    this.save();
    this.translate(connectorObj.x, connectorObj.y);
    this.rotate(connectorObj.rotate / 180 * Math.PI);

    var rad = Math.min(connectorObj.width, connectorObj.height) / 2;
    this.beginPath();
    this.arc(connectorObj.width / 2, connectorObj.height - rad, rad, 0, Math.PI * 2, false);
    this.closePath();
    this.fill();
    this.stroke();

    // Write the label
    this.font = connectorObj.fontstyle + " " + connectorObj.fontweight + " " + connectorObj.fontsize
        + "px " + connectorObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(connectorObj.textcolor, connectorObj.strokestyle);
    
    var nameHeight = this.getWrappedTextHeight(connectorObj.width / 2 + rad, connectorObj.height,
        connectorObj.label, connectorObj.fontsize, connectorObj.width / 2,
        connectorObj.height - 2 * rad);
    this.drawWrappedText(connectorObj.width / 2 + rad, connectorObj.height,
        connectorObj.label, connectorObj.fontsize, connectorObj.width / 2,
        connectorObj.height - rad - nameHeight / 2);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawTransformation = function (transfObj) {
    this.save();
    this.translate(transfObj.x, transfObj.y);
    this.rotate(transfObj.rotate / 180 * Math.PI);

    var foldlen = (transfObj.height > transfObj.width) ? transfObj.width : transfObj.height;
    foldlen *= 0.25;

    var x1 = 0;
    var x2 = x1 + transfObj.width;
    var x3 = x2 - foldlen;
    var y1 = 0;
    var y2 = y1 + transfObj.height;
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
    this.font = transfObj.fontstyle + " " + transfObj.fontweight + " " + transfObj.fontsize
        + "px " + transfObj.fontfamily;
    this.setFillAndStroke(transfObj.textcolor, transfObj.strokestyle);
    var maxwidth = transfObj.width - 2 * H_MARGIN;
    var maxheight = y2 - H_MARGIN - transfObj.fontsize;
    this.textAlign = "center";
    var labelStart = this.getWrappedTextHeight(maxwidth, maxheight, "<<transformation>>",
        transfObj.fontsize, transfObj.width / 2, y3) + H_MARGIN;
    this.drawWrappedText(maxwidth, maxheight, "<<transformation>>", transfObj.fontsize,
        transfObj.width / 2, y3);
    this.textAlign = "start";
    this.drawWrappedText(maxwidth, maxheight, transfObj.label, transfObj.fontsize,
        x1 + H_MARGIN, y3 + labelStart);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawPart = function (partObj) {
    this.save();
    this.translate(partObj.x, partObj.y);
    this.rotate(partObj.rotate / 180 * Math.PI);

    this.fillRect(0, 0, partObj.width, partObj.height);
    this.strokeRect(0, 0, partObj.width, partObj.height);

    // Write the label
    this.font = partObj.fontstyle + " " + partObj.fontweight + " " + partObj.fontsize
        + "px " + partObj.fontfamily;
    this.textBaseline = "bottom";
    this.textAlign = "center";
    this.setFillAndStroke(partObj.textcolor, partObj.strokestyle);

    var nameHeight = this.getWrappedTextHeight(partObj.width - 2 * H_MARGIN,
        partObj.height, partObj.label, partObj.fontsize, H_MARGIN, 0);
    this.drawWrappedText(partObj.width - 2 * H_MARGIN, partObj.height,
        partObj.label, partObj.fontsize, partObj.width / 2, (partObj.height - nameHeight) / 2);

    this.restore();
};

