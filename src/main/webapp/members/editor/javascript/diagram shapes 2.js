
CanvasRenderingContext2D.prototype.drawRectangle = function (x, y, w, h, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    this.strokeRect(0, 0, w, h);
    this.fillRect(0, 0, w, h);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawRoundedRectangle = function (x, y, w, h, r, angle) {
    this.save();
    this.translate(x, y);
    this.rotate(angle / 180 * Math.PI);

    this.beginPath();
    this.moveTo(r, 0);
    this.lineTo(w - r, 0);
    this.quadraticCurveTo(w, 0, w, r);
    this.lineTo(w, h - r);
    this.quadraticCurveTo(w, h, w - r, h);
    this.lineTo(r, h);
    this.quadraticCurveTo(0, h, 0, h - r);
    this.lineTo(0, r);
    this.quadraticCurveTo(0, 0, r, 0);
    this.closePath();
    this.fill();
    this.stroke();

    this.restore();
};

CanvasRenderingContext2D.prototype.drawDashedRoundedRect = function(x, y, w, h, r, angle, dashPattern) {
    this.save();
    this.translate(x, y);
    this.rotate(angle / 180 * Math.PI);

    this.beginPath();
    this.moveTo(r, 0);
    this.lineTo(w - r, 0);
    this.quadraticCurveTo(w, 0, w, r);
    this.lineTo(w, h - r);
    this.quadraticCurveTo(w, h, w - r, h);
    this.lineTo(r, h);
    this.quadraticCurveTo(0, h, 0, h - r);
    this.lineTo(0, r);
    this.quadraticCurveTo(0, 0, r, 0);
    this.closePath();
    this.fill();

    this.drawDashedLine(r, 0, w - r, 0, dashPattern);
    this.drawDashedLine(w, r, w, h - r, dashPattern);
    this.drawDashedLine(w - r, h, r, h, dashPattern);
    this.drawDashedLine(0, h - r, 0, r, dashPattern);

    this.drawDashedQuadratic([{"x" : w - r, "y" : 0}, {"x" : w, "y" : 0}, {"x" : w, "y" : r}], dashPattern);
    this.drawDashedQuadratic([{"x" : w, "y" : h - r}, {"x" : w, "y" : h}, {"x" : w - r, "y" : h}], dashPattern);
    this.drawDashedQuadratic([{"x" : r, "y" : h}, {"x" : 0, "y" : h}, {"x" : 0, "y" : h - r}], dashPattern);
    this.drawDashedQuadratic([{"x" : 0, "y" : r}, {"x" : 0, "y" : 0}, {"x" : r, "y" : 0}], dashPattern);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawDashedQuadratic = function(points, dashPattern) {
    var step = 0.005;

    // Possibly gratuitous helper functions
    var delta = function(p0, p1) {
        return [p1[0] - p0[0], p1[1] - p0[1]];
    };
    var arcLength = function(p0, p1) {
        var d = delta(p0, p1);
        return Math.sqrt(d[0]*d[0] + d[1] * d[1]);
    };
    var getPt = function(t) {
        var pt = jsBezier.pointOnCurve(points, t);
        return [pt.x, pt.y];
    };

    var subPaths = [];
    var loc = getPt(0);
    var lastLoc = loc;

    var dashIndex = 0;
    var length = 0;
    var thisPath = [];
    for(var t = step; t <= 1; t += step) {
        loc = getPt(t);
        length += arcLength(lastLoc, loc);
        lastLoc = loc;

        //detect when we come to the end of a dash or space
        if(length >= dashPattern[dashIndex]) {

          //if we are on a dash, we need to record the path.
          if(dashIndex % 2 == 0)
            subPaths.push(thisPath);

          //go to the next dash or space in the pattern
          dashIndex = (dashIndex + 1) % dashPattern.length;

          //clear the arclength and path.
          thisPath = [];
          length = 0;
        }

        //if we are on a dash and not a space, add a point to the path.
        if(dashIndex % 2 == 0) {
          thisPath.push(loc[0], loc[1]);
        }
    }
    if(thisPath.length > 0)
    subPaths.push(thisPath);

    // Now draw subpaths on the canvas
    this.beginPath();
    for(var i = 0; i < subPaths.length; i++) {
        var part = subPaths[i];
        if(part.length > 0)
          this.moveTo(part[0], part[1]);
        for(var j = 1; j < part.length / 2; j++) {
          this.lineTo(part[2*j], part[2*j+1]);
        }
    }
    this.stroke();
}

CanvasRenderingContext2D.prototype.drawEllipse = function (x, y, width, height, r) {
    this.save();
    this.translate(x, y);
    this.rotate(r / 180 * Math.PI);

    var kappa = .5522848,
        ox = (width / 2) * kappa, // control point offset horizontal
        oy = (height / 2) * kappa, // control point offset vertical
        xe = width,           // x-end
        ye = height,           // y-end
        xm = width / 2,       // x-middle
        ym = height / 2;       // y-middle

    this.beginPath();
    this.moveTo(0, ym);
    this.bezierCurveTo(0, ym - oy, xm - ox, 0, xm, 0);
    this.bezierCurveTo(xm + ox, 0, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, 0, ym + oy, 0, ym);
    this.closePath();
    this.stroke();
    this.fill();

    this.restore();
};

CanvasRenderingContext2D.prototype.drawText = function (textObj) {
    this.save();
    this.translate(textObj.x, textObj.y);
    this.rotate(textObj.rotate / 180 * Math.PI);

    this.textBaseline = "top";
    this.font = textObj.fontstyle + " " + textObj.fontweight + " " + textObj.fontsize
        + "px " + textObj.fontfamily;
    this.textAlign = "left";

    this.drawWrappedText(textObj.width, textObj.height - textObj.fontsize, textObj.label,
        textObj.fontsize, 0, -textObj.fontsize);

    this.restore();
};

CanvasRenderingContext2D.prototype.drawSolidLine = function (x1, y1, x2, y2) {
    this.beginPath();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
    this.stroke();
}

CanvasRenderingContext2D.prototype.drawDashedLine = function (fromX, fromY, toX, toY, pattern) {
    this.beginPath();

    var lt = function (a, b) {return a <= b;};
    var gt = function (a, b) {return a >= b;};
    var capmin = function (a, b) {return Math.min(a, b);};
    var capmax = function (a, b) {return Math.max(a, b);};

    var checkX = {thereYet: gt, cap: capmin};
    var checkY = {thereYet: gt, cap: capmin};

    if (fromY - toY > 0) {
        checkY.thereYet = lt;
        checkY.cap = capmax;
    }
    if (fromX - toX > 0) {
        checkX.thereYet = lt;
        checkX.cap = capmax;
    }

    this.moveTo(fromX, fromY);
    var offsetX = fromX;
    var offsetY = fromY;
    var idx = 0, dash = true;
    while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
        var ang = Math.atan2(toY - fromY, toX - fromX);
        var len = pattern[idx];

        offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
        offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

        if (dash) this.lineTo(offsetX, offsetY);
        else this.moveTo(offsetX, offsetY);

        idx = (idx + 1) % pattern.length;
        dash = !dash;
    }

    this.stroke();
};

CanvasRenderingContext2D.prototype.drawSolidBezier = function(x1, y1, x2, y2, ctrl1x, ctrl1y, ctrl2x, ctrl2y) {
    this.beginPath();
    this.moveTo(x1, y1);
    this.bezierCurveTo(ctrl1x, ctrl1y, ctrl2x, ctrl2y, x2, y2);
    this.stroke();
}

CanvasRenderingContext2D.prototype.drawDashedBezier = function(x1, y1, x2, y2, ctrl1x, ctrl1y, ctrl2x, ctrl2y, dashPattern) {
    var points = [ {x : x1, y : y1}, {x : ctrl1x, y : ctrl1y}, {x : ctrl2x, y : ctrl2y}, {x : x2, y : y2} ];

    var step = 0.0005;  //this really should be set by an intelligent method,
                        //rather than using a constant, but it serves as an
                        //example.

    // Possibly gratuitous helper functions
    var delta = function(p0, p1) {
        return [p1[0] - p0[0], p1[1] - p0[1]];
    };
    var arcLength = function(p0, p1) {
        var d = delta(p0, p1);
        return Math.sqrt(d[0]*d[0] + d[1] * d[1]);
    };
    var getBezierPt = function(inputCurve, t) {
        var pt = jsBezier.pointOnCurve(inputCurve, t);
        return [pt.x, pt.y];
    };

    var subPaths = [];
    var loc = getBezierPt(points, 0);
    var lastLoc = loc;

    var dashIndex = 0;
    var length = 0;
    var thisPath = [];
    for(var t = step; t <= 1; t += step) {
        loc = getBezierPt(points, t);
        length += arcLength(lastLoc, loc);
        lastLoc = loc;

        //detect when we come to the end of a dash or space
        if(length >= dashPattern[dashIndex]) {

          //if we are on a dash, we need to record the path.
          if(dashIndex % 2 == 0)
            subPaths.push(thisPath);

          //go to the next dash or space in the pattern
          dashIndex = (dashIndex + 1) % dashPattern.length;

          //clear the arclength and path.
          thisPath = [];
          length = 0;
        }

        //if we are on a dash and not a space, add a point to the path.
        if(dashIndex % 2 == 0) {
          thisPath.push(loc[0], loc[1]);
        }
    }
    if(thisPath.length > 0)
    subPaths.push(thisPath);

    // Now draw subpaths on the canvas
    this.beginPath();
    for(var i = 0; i < subPaths.length; i++) {
        var part = subPaths[i];
        if(part.length > 0)
          this.moveTo(part[0], part[1]);
        for(var j = 1; j < part.length / 2; j++) {
          this.lineTo(part[2*j], part[2*j+1]);
        }
    }
    this.stroke();
}

CanvasRenderingContext2D.prototype.drawBezier = function(x1, y1, x2, y2, ctrl1x, ctrl1y, ctrl2x, ctrl2y, ah1, ah2, linestyle) {
    var lineangle1 = Math.atan2(ctrl1y - y1, ctrl1x - x1);
    var lineangle2 = Math.atan2(ctrl2y - y2, ctrl2x - x2);

    var x12 = x1;
    var y12 = y1;
    var x22 = x2;
    var y22 = y2;

    switch(ah1) {
        case "lines" :
        case "hollow triangle" :
        case "filled triangle" :
            x12 += ARROWHEAD_L * Math.cos(lineangle1);
            y12 += ARROWHEAD_L * Math.sin(lineangle1);
            break;
        case "hollow diamond" :
        case "filled diamond" :
            x12 += 2 * DIAMOND_L * Math.cos(lineangle1);
            y12 += 2 * DIAMOND_L * Math.sin(lineangle1);
            break;
        case "ball" :
            x12 += 2 * BALL_R * Math.cos(lineangle1);
            y12 += 2 * BALL_R * Math.sin(lineangle1);
            break;
        case "socket" :
                x12 += SOCKET_R * Math.cos(lineangle1);
                y12 += SOCKET_R * Math.sin(lineangle1);
                break;
        default :
            break;
    }

    switch(ah2) {
        case "lines" :
        case "hollow triangle" :
        case "filled triangle" :
            x22 -= ARROWHEAD_L * Math.cos(lineangle2 + Math.PI);
            y22 -= ARROWHEAD_L * Math.sin(lineangle2 + Math.PI);
            break;
        case "hollow diamond" :
        case "filled diamond" :
            x22 -= 2 * DIAMOND_L * Math.cos(lineangle2 + Math.PI);
            y22 -= 2 * DIAMOND_L * Math.sin(lineangle2 + Math.PI);
            break;
        case "ball" :
            x22 -= 2 * BALL_R * Math.cos(lineangle2 + Math.PI);
            y22 -= 2 * BALL_R * Math.sin(lineangle2 + Math.PI);
            break;
        case "socket" :
            x22 -= SOCKET_R * Math.cos(lineangle2 + Math.PI);
            y22 -= SOCKET_R * Math.sin(lineangle2 + Math.PI);
            break;
        default :
            break;
    }

    if(linestyle == "dashed")
        this.drawDashedBezier(x12, y12, x22, y22, ctrl1x, ctrl1y, ctrl2x, ctrl2y, [7, this.lineWidth + 7]);
    else if(linestyle == "dotted")
        this.drawDashedBezier(x12, y12, x22, y22, ctrl1x, ctrl1y, ctrl2x, ctrl2y, [2, this.lineWidth + 5]);
    else
        this.drawSolidBezier(x12, y12, x22, y22, ctrl1x, ctrl1y, ctrl2x, ctrl2y);

    this.drawArrowhead(ah1, x1, y1, lineangle1);
    this.drawArrowhead(ah2, x2, y2, lineangle2);
}

CanvasRenderingContext2D.prototype.drawLine = function (x1, y1, x2, y2, ah1, ah2, linestyle) {
    var lineangle = Math.atan2(y2 - y1, x2 - x1);

    var x12 = x1;
    var y12 = y1;
    var x22 = x2;
    var y22 = y2;

    if(ah1 == "socket") {
        x12 += SOCKET_R * Math.cos(lineangle);
        y12 += SOCKET_R * Math.sin(lineangle);
    }
    if(ah2 == "socket") {
        x22 -= SOCKET_R * Math.cos(lineangle);
        y22 -= SOCKET_R * Math.sin(lineangle);
    }

    if(linestyle == "dashed")
        this.drawDashedLine(x12, y12, x22, y22, [7, this.lineWidth + 7]);
    else if(linestyle == "dotted")
        this.drawDashedLine(x12, y12, x22, y22, [1, this.lineWidth + 5]);
    else
        this.drawSolidLine(x12, y12, x22, y22);

    this.drawArrowhead(ah1, x1, y1, lineangle);
    this.drawArrowhead(ah2, x2, y2, lineangle + Math.PI);
};

CanvasRenderingContext2D.prototype.drawArrowhead = function (arrowstyle, x, y, lineangle) {
    switch(arrowstyle) {
        case "lines" :
            var angle1 = lineangle + ARROWHEAD_ANGLE;
            var topx = x + Math.cos(angle1) * ARROWHEAD_H;
            var topy = y + Math.sin(angle1) * ARROWHEAD_H;

            var midx = x + Math.cos(lineangle) * ARROWHEAD_H;
            var midy = y + Math.sin(lineangle) * ARROWHEAD_H;

            var angle2 = lineangle - ARROWHEAD_ANGLE;
            var botx = x + Math.cos(angle2) * ARROWHEAD_H;
            var boty = y + Math.sin(angle2) * ARROWHEAD_H;

            this.beginPath();
            this.moveTo(topx, topy);
            this.lineTo(x, y);
            this.lineTo(botx, boty);
            this.moveTo(midx, midy);
            this.lineTo(x, y);
            this.stroke();

            break;
        case "hollow triangle" :
        case "filled triangle" :
            var angle1 = lineangle + ARROWHEAD_ANGLE;
            var topx = x + Math.cos(angle1) * ARROWHEAD_H;
            var topy = y + Math.sin(angle1) * ARROWHEAD_H;

            var angle2 = lineangle - ARROWHEAD_ANGLE;
            var botx = x + Math.cos(angle2) * ARROWHEAD_H;
            var boty = y + Math.sin(angle2) * ARROWHEAD_H;

            this.beginPath();
            this.moveTo(topx, topy);
            this.lineTo(x, y);
            this.lineTo(botx, boty);

            if(arrowstyle == "hollow triangle") {
                this.save();
                this.fillStyle = "rgba(255,255,255,1)";
                this.closePath();
                this.fill();
                this.restore();
            } else if(arrowstyle == "filled triangle") {
                this.closePath();
                this.fill();
            }

            this.stroke();

            break;
        case "half head" :
            var angle1 = lineangle + ARROWHEAD_ANGLE;
            var topx = x + Math.cos(angle1) * ARROWHEAD_H;
            var topy = y + Math.sin(angle1) * ARROWHEAD_H;

            this.beginPath();
            this.moveTo(topx, topy);
            this.lineTo(x, y);

            this.stroke();
            break;
        case "hollow diamond" :
        case "filled diamond" :
            var angle1 = lineangle + DIAMOND_ANGLE;//ARROWHEAD_ANGLE;
            var topx = x + Math.cos(angle1) * ARROWHEAD_H;
            var topy = y + Math.sin(angle1) * ARROWHEAD_H;

            var angle2 = lineangle - DIAMOND_ANGLE;//ARROWHEAD_ANGLE;
            var botx = x + Math.cos(angle2) * ARROWHEAD_H;
            var boty = y + Math.sin(angle2) * ARROWHEAD_H;

            this.beginPath();
            this.moveTo(topx, topy);
            this.lineTo(x, y);
            this.lineTo(botx, boty);
            this.lineTo(x + 2 * DIAMOND_L * Math.cos(lineangle), y + 2 * DIAMOND_L * Math.sin(lineangle));

            this.closePath();

            if(arrowstyle == "filled diamond") {
                this.fill();
            } else if(arrowstyle == "hollow diamond") {
                this.save();
                this.fillStyle = "rgba(255,255,255,1)";
                this.fill();
                this.restore();
            }

            this.stroke();
            break;
        case "ball" :
            this.beginPath();
            this.arc(x + BALL_R * Math.cos(lineangle), y + BALL_R  * Math.sin(lineangle),
                BALL_R, 0, 2 * Math.PI);
            this.closePath();
            this.save();
            this.fillStyle = "rgba(255,255,255,1)";
            this.fill();
            this.restore();
            this.stroke();
            break;
        case "socket" :
            this.beginPath();
            this.arc(x, y, SOCKET_R, lineangle - Math.PI / 2, lineangle + Math.PI / 2);
            this.stroke();
            break;
        case "none" :
        default :break;
    }
}

CanvasRenderingContext2D.prototype.drawPath = function (points) {
    this.beginPath();
    this.moveTo(points[0].x, points[0].y);
    for(var i = 0; i < points.length; i++)
        this.lineTo(points[i].x, points[i].y);
    this.stroke();
};

CanvasRenderingContext2D.prototype.drawPolygon = function (points) {
    this.beginPath();
    this.moveTo(points[0].x, points[0].y);
    for(var i = 0; i < points.length; i++)
        this.lineTo(points[i].x, points[i].y);
    this.closePath();
    this.stroke();
    this.fill();
};

CanvasRenderingContext2D.prototype.drawPolyline = function (points, ah1, ah2, linestyle) {
    var noOfPts = points.length;

    if(noOfPts < 2) return;
    
    var x0 = points[0].x;
    var y0 = points[0].y;
    var lineangle1 = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
    if(ah1 == "socket") {
        x0 += SOCKET_R * Math.cos(lineangle1);
        y0 += SOCKET_R * Math.sin(lineangle1);
    }

    var xn = points[noOfPts - 1].x;
    var yn = points[noOfPts - 1].y;
    var lineangle2 = Math.atan2(points[noOfPts - 1].y - points[noOfPts - 2].y,
        points[noOfPts - 1].x - points[noOfPts - 2].x);
    if(ah2 == "socket") {
        xn -= SOCKET_R * Math.cos(lineangle2);
        yn -= SOCKET_R * Math.sin(lineangle2);
    }

    if(linestyle == "dashed") {
        for(var i = 0; i < noOfPts - 1; i++) {
           var x1 = points[i].x;
           var y1 = points[i].y;
           var x2 = points[i + 1].x;
           var y2 = points[i + 1].y;

           if(i == 0) {
               x1 = x0;
               y1 = y0;
           }
           if(i + 2 == noOfPts) {
               x2 = xn;
               y2 = yn;
           }

           this.drawDashedLine(x1, y1, x2, y2, [7, this.lineWidth + 7]);
        }
    } else if(linestyle == "dotted") {
        for(var i = 0; i < noOfPts - 1; i++) {
           var x1 = points[i].x;
           var y1 = points[i].y;
           var x2 = points[i + 1].x;
           var y2 = points[i + 1].y;

           if(i == 0) {
               x1 = x0;
               y1 = y0;
           }
           if(i + 2 == noOfPts) {
               x2 = xn;
               y2 = yn;
           }

           this.drawDashedLine(x1, y1, x2, y2, [1, this.lineWidth + 5]);
        }
    } else {
        for(var i = 0; i < noOfPts - 1; i++) {
           var x1 = points[i].x;
           var y1 = points[i].y;
           var x2 = points[i + 1].x;
           var y2 = points[i + 1].y;

           if(i == 0) {
               x1 = x0;
               y1 = y0;
           }
           if(i + 2 == noOfPts) {
               x2 = xn;
               y2 = yn;
           }

           this.drawSolidLine(x1, y1, x2, y2);
        }
    }

    this.drawArrowhead(ah1, points[0].x, points[0].y, lineangle1);
    this.drawArrowhead(ah2, points[noOfPts - 1].x, points[noOfPts - 1].y, lineangle2 + Math.PI);
};

CanvasRenderingContext2D.prototype.drawWrappedText = function(maxwidth, maxheight, text, yjump, x, y) {
    var textline = text.split("\n");

    for(var i = 0; i < textline.length; i++) {
        if(this.measureText(textline[i]).width <= maxwidth) {
            y += yjump;
            if(y > maxheight) return;
            this.fillText(textline[i], x, y);
        } else {
            var startIndex = 0;
            var currIndex = 0;
            var lastSpaceIndex = -1;
            while(currIndex <= textline[i].length) {
                if(this.measureText(textline[i].substring(startIndex, currIndex)).width > maxwidth) {
                    y += yjump;
                    if(y > maxheight) return;

                    if(lastSpaceIndex == -1) {
                        if(this.measureText(textline[i].substring(startIndex, currIndex - 1)).width <= maxwidth) {
                            this.fillText(textline[i].substring(startIndex, currIndex - 1), x, y);
                        }
                        startIndex = currIndex - 1;
                    } else {
                        if(this.measureText(textline[i].substring(startIndex, lastSpaceIndex)).width <= maxwidth) {
                            this.fillText(textline[i].substring(startIndex, lastSpaceIndex + 1), x, y);
                        }
                        startIndex = lastSpaceIndex + 1;
                        lastSpaceIndex = -1;
                    }
                }

                if(textline[i].charAt(currIndex) == " ") {
                    lastSpaceIndex = currIndex;
                }

                currIndex++;
            }
            if(textline[i].substring(startIndex).length != 0) {
                if(this.measureText(textline[i].substring(startIndex)).width < maxwidth) {
                    y += yjump;
                    if(y > maxheight) return;
                    if(this.measureText(textline[i].substring(startIndex)).width <= maxwidth) {
                        this.fillText(textline[i].substring(startIndex), x, y);
                    }
                }
            }
        }
    }
}

CanvasRenderingContext2D.prototype.getWrappedTextHeight = function(maxwidth, maxheight, text, yjump, x, y) {
    var textline = text.split("\n");

    var totalHeight = 0;

    for(var i = 0; i < textline.length; i++) {
        if(this.measureText(textline[i]).width <= maxwidth) {
            y += yjump;
            if(y > maxheight) return totalHeight;
            totalHeight += yjump;
        } else {
            var startIndex = 0;
            var currIndex = 0;
            var lastSpaceIndex = -1;
            while(currIndex <= textline[i].length) {
                if(this.measureText(textline[i].substring(startIndex, currIndex)).width > maxwidth) {
                    y += yjump;
                    if(y > maxheight) return totalHeight;

                    if(lastSpaceIndex == -1) {
                        if(this.measureText(textline[i].substring(startIndex, currIndex - 1)).width <= maxwidth) {
                            totalHeight += yjump;
                        }
                        startIndex = currIndex - 1;
                    } else {
                        if(this.measureText(textline[i].substring(startIndex, lastSpaceIndex)).width <= maxwidth) {
                            totalHeight += yjump;
                        }
                        startIndex = lastSpaceIndex + 1;
                        lastSpaceIndex = -1;
                    }
                }

                if(textline[i].charAt(currIndex) == " ") {
                    lastSpaceIndex = currIndex;
                }

                currIndex++;
            }
            if(textline[i].substring(startIndex).length != 0) {
                if(this.measureText(textline[i].substring(startIndex)).width < maxwidth) {
                    y += yjump;
                    if(y > maxheight) return totalHeight;
                    if(this.measureText(textline[i].substring(startIndex)).width <= maxwidth) {
                        totalHeight += yjump;
                    }
                }
            }
        }
    }

    return totalHeight;
}
