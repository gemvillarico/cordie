
function propertiesBoxTab() {
    document.getElementById("propertiesTabButton").setAttribute("class", "active");
    document.getElementById("collaboratorsTabButton").removeAttribute("class");
    document.getElementById("recentChangesTabButton").removeAttribute("class");

    document.getElementById("appliedOpsTable").setAttribute("style", "display: none;");
    document.getElementById("collaboratorsAndCurrentUsers").setAttribute("style", "display: none;");
    document.getElementById("propertiesBox").setAttribute("style", "display: block;");
    styleTab();
}

function collaboratorsTab() {
    document.getElementById("collaboratorsTabButton").setAttribute("class", "active");
    document.getElementById("propertiesTabButton").removeAttribute("class");
    document.getElementById("recentChangesTabButton").removeAttribute("class");

    document.getElementById("propertiesBox").setAttribute("style", "display: none;");
    document.getElementById("appliedOpsTable").setAttribute("style", "display: none;");
    document.getElementById("collaboratorsAndCurrentUsers").setAttribute("style", "display: block;");
    //currentusersSubTab();
    collaboratorsSubTab();
}

function recentChangesTab() {
    document.getElementById("recentChangesTabButton").setAttribute("class", "active");
    document.getElementById("propertiesTabButton").removeAttribute("class");
    document.getElementById("collaboratorsTabButton").removeAttribute("class");

    document.getElementById("propertiesBox").setAttribute("style", "display: none;");
    document.getElementById("collaboratorsAndCurrentUsers").setAttribute("style", "display: none;");
    document.getElementById("appliedOpsTable").setAttribute("style", "display: block;");
}

function default_init() {
    // arrow settings
    (document.getElementById("defaultArrowhead1")).value = DEFAULT_ARROWSTYLE1;
    (document.getElementById("defaultArrowhead2")).value = DEFAULT_ARROWSTYLE2;
    (document.getElementById("defaultLinestyle")).value = DEFAULT_LINESTYLE;

    // font settings
    (document.getElementById("selectedFontsize")).value = DEFAULT_FONTSIZE;
    (document.getElementById("selectedFontfamily")).value = DEFAULT_FONTFAMILY;

    // fill settings
    var rgbaFill = DEFAULT_FILLCOLOR.split(",");
    var rFill = parseInt(rgbaFill[0]).toString(16);
    var gFill = parseInt(rgbaFill[1]).toString(16);
    var bFill = parseInt(rgbaFill[2]).toString(16);
    rFill = (rFill.length < 2) ? '0' + rFill : rFill;
    gFill = (gFill.length < 2) ? '0' + gFill : gFill;
    bFill = (bFill.length < 2) ? '0' + bFill : bFill;
    (document.getElementById("defaultFill")).color.fromString(rFill + gFill + bFill);
    (document.getElementById("defaultFillA")).value = rgbaFill[3];
    
    // stroke settings
    var rgbaStroke = DEFAULT_STROKESTYLE.split(",");
    var rStroke = parseInt(rgbaStroke[0]).toString(16);
    var gStroke = parseInt(rgbaStroke[1]).toString(16);
    var bStroke = parseInt(rgbaStroke[2]).toString(16);
    rStroke = (rStroke.length < 2) ? '0' + rStroke : rStroke;
    gStroke = (gStroke.length < 2) ? '0' + gStroke : gStroke;
    bStroke = (bStroke.length < 2) ? '0' + bStroke : bStroke;
    (document.getElementById("defaultStroke")).color.fromString(rStroke + gStroke 
        + bStroke);
    (document.getElementById("defaultStrokeA")).value = rgbaStroke[3];

    // text color settings
    var rgbaText = DEFAULT_TEXTCOLOR.split(",");
    var rText = parseInt(rgbaText[0]).toString(16);
    var gText = parseInt(rgbaText[1]).toString(16);
    var bText = parseInt(rgbaText[2]).toString(16);
    rText = (rText.length < 2) ? '0' + rText : rText;
    gText = (gText.length < 2) ? '0' + gText : gText;
    bText = (bText.length < 2) ? '0' + bText : bText;
    (document.getElementById("defaultText")).color.fromString(rText + gText + bText);
    (document.getElementById("defaultTextA")).value = rgbaText[3];
}

function changeSetting(setting, newValue) {
    switch(setting) {
        case "arrowhead1" :
            DEFAULT_ARROWSTYLE1 = newValue;
            break;
        case "linestyle" :
            DEFAULT_LINESTYLE = newValue;
            break;
        case "arrowhead2" :
            DEFAULT_ARROWSTYLE2 = newValue;
            break;
        case "fontsize" :
            if(!isNumber(newValue) || parseFloat(newValue) <= 0) {
                alert("You must enter a number greater than 0");
                document.getElementById("selectedFontsize").value = DEFAULT_FONTSIZE;
                return;
            }
            DEFAULT_FONTSIZE = parseFloat(newValue);
            break;
        case "fontfamily" :
            DEFAULT_FONTFAMILY = newValue;
            break;
        default:
            break;
    }
}

function changeColorSetting(setting) {
    var rgbTemp = document.getElementById("default" + setting).value;
    var r = parseInt(rgbTemp.substr(0, 2), 16);
    var g = parseInt(rgbTemp.substr(2, 2), 16);
    var b = parseInt(rgbTemp.substr(4, 2), 16);
    var a = document.getElementById("default" + setting + "A").value;

    var errMsg = "";
    var hasError = false;
    if(!isNumber(r) || r < 0 || r > 255) {
        //errMsg += "R value must be a number between 0 and 255.\n";
        hasError = true;
    }
    if(!isNumber(g) || g < 0 || g > 255) {
        //errMsg += "G value must be a number between 0 and 255.\n";
        hasError = true;
    }
    if(!isNumber(b) || b < 0 || b > 255) {
        //errMsg += "B value must be a number between 0 and 255.\n";
        hasError = true;
    }
    if(!isNumber(a) || a < 0 || a > 1.0) {
        errMsg += "alpha value must be a number between 0 and 1.\n";
        hasError = true;
    }
    if(hasError) {
        errMsg += "There is an error in the rgba value.";
        alert(errMsg);
        var rgbaDefault;
        switch(setting) {
            case "Fill" :
                rgbaDefault = DEFAULT_FILLCOLOR.split(",");
                break;
            case "Stroke" :
                rgbaDefault = DEFAULT_STROKESTYLE.split(",");
                break;
            case "Text" :
                rgbaDefault = DEFAULT_TEXTCOLOR.split(",");
                break;
            default :
                break;
        }

        var rDefault = parseInt(rgbaDefault[0]).toString(16);
        var gDefault = parseInt(rgbaDefault[1]).toString(16);
        var bDefault = parseInt(rgbaDefault[2]).toString(16);
        rDefault = (rDefault.length < 2) ? '0' + rDefault : rDefault;
        gDefault = (gDefault.length < 2) ? '0' + gDefault : gDefault;
        bDefault = (bDefault.length < 2) ? '0' + bDefault : bDefault;
        (document.getElementById("default" + setting)).color.fromString(rDefault + gDefault + bDefault);
        document.getElementById("default" + setting + "A").value = rgbaDefault[3];
        return;
    }

    var rgba = r + "," + g + "," + b + "," + a;

    switch(setting) {
        case "Fill" :
            DEFAULT_FILLCOLOR = rgba;
            break;
        case "Stroke" :
            DEFAULT_STROKESTYLE = rgba;
            break;
        case "Text" :
            DEFAULT_TEXTCOLOR = rgba;
            break;
        default :
            break;
    }
}
