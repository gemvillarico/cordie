package cordie.diagram.operation;

import java.util.Map;
import org.jdom.Element;
import cordie.diagram.CordieObjectConverter;

public class CordieInsertOperation implements CordieOperation {
    
	private static final long serialVersionUID = 6912352706922632886L;
	
	private Element obj;
    private int position;

    public CordieInsertOperation(CordieInsertOperation co) {
        position = co.getPosition();
        obj = (Element)co.getObject().clone();
    }
    
    public CordieInsertOperation(Map<String, String[]> parameterMap) {
        position = Integer.parseInt(parameterMap.get("position")[0]);
        String  objType = parameterMap.get("objecttype")[0];

        if(objType.equals("rectangle") || objType.equals("ellipse") || objType.equals("arrowhead")
                || objType.equals("activationbar") || objType.equals("lifeline")
                || objType.equals("deletion") || objType.equals("initialps")
                || objType.equals("finalstate") || objType.equals("shallowhistps")
                || objType.equals("deephistps") || objType.equals("initialnode")
                || objType.equals("finalnode") || objType.equals("blackbar")
                || objType.equals("diamond") || objType.equals("pin") || objType.equals("flowfinal")
                || objType.equals("port")) { //<editor-fold>
            obj = new Element(objType);
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            
        } else if(objType.equals("text")) { //<editor-fold>
            obj = new Element("text");
            obj.setAttribute("fontstyle", parameterMap.get("fontstyle")[0]);
            obj.setAttribute("fontweight", parameterMap.get("fontweight")[0]);
            obj.setAttribute("fontsize", parameterMap.get("fontsize")[0]);
            obj.setAttribute("fontfamily", parameterMap.get("fontfamily")[0]);
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("label", parameterMap.get("label")[0]);
            obj.setAttribute("textcolor", parameterMap.get("textcolor")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            
        } else if(objType.equals("line")) { //<editor-fold>
            obj = new Element("line");
            obj.setAttribute("x1", parameterMap.get("x1")[0]);
            obj.setAttribute("y1", parameterMap.get("y1")[0]);
            obj.setAttribute("x2", parameterMap.get("x2")[0]);
            obj.setAttribute("y2", parameterMap.get("y2")[0]);
            obj.setAttribute("arrowstyle1", parameterMap.get("arrowstyle1")[0]);
            obj.setAttribute("arrowstyle2", parameterMap.get("arrowstyle2")[0]);
            obj.setAttribute("linestyle", parameterMap.get("linestyle")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            
        } else if(objType.equals("bezier")) { //<editor-fold>
            obj = new Element("bezier");
            obj.setAttribute("x1", parameterMap.get("x1")[0]);
            obj.setAttribute("y1", parameterMap.get("y1")[0]);
            obj.setAttribute("x2", parameterMap.get("x2")[0]);
            obj.setAttribute("y2", parameterMap.get("y2")[0]);
            obj.setAttribute("ctrl1x", parameterMap.get("ctrl1x")[0]);
            obj.setAttribute("ctrl1y", parameterMap.get("ctrl1y")[0]);
            obj.setAttribute("ctrl2x", parameterMap.get("ctrl2x")[0]);
            obj.setAttribute("ctrl2y", parameterMap.get("ctrl2y")[0]);
            obj.setAttribute("arrowstyle1", parameterMap.get("arrowstyle1")[0]);
            obj.setAttribute("arrowstyle2", parameterMap.get("arrowstyle2")[0]);
            obj.setAttribute("linestyle", parameterMap.get("linestyle")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            
        } else if(objType.equals("path")) { //<editor-fold>
            obj = new Element("path");
            String xcoordinate[] = parameterMap.get("x");
            String ycoordinate[] = parameterMap.get("y");

            String temp = "";
            for(int i = 0; i < xcoordinate.length; i++) {
                if(i != 0)
                    temp = temp + " ";

                temp = temp + xcoordinate[i] + "," + ycoordinate[i];
            }

            obj.setAttribute("points", temp);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            
        } else if(objType.equals("class")) { 
            obj = new Element("class");
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("textcolor", parameterMap.get("textcolor")[0]);
            obj.setAttribute("fontsize", parameterMap.get("fontsize")[0]);
            obj.setAttribute("classfontsize", parameterMap.get("classfontsize")[0]);
            obj.setAttribute("classname", parameterMap.get("classname")[0]);
            obj.setAttribute("abstractclass", parameterMap.get("abstractclass")[0]);
            obj.setAttribute("qualifiedassociation", parameterMap.get("qualifiedassociation")[0]);
            obj.setAttribute("qualifier", parameterMap.get("qualifier")[0]);
            obj.setAttribute("stereotype", parameterMap.get("stereotype")[0]);
            obj.setAttribute("templateclass", parameterMap.get("templateclass")[0]);
            obj.setAttribute("activeclass", parameterMap.get("activeclass")[0]);
            obj.setAttribute("showattributes", parameterMap.get("showattributes")[0]);
            obj.setAttribute("showoperations", parameterMap.get("showoperations")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);

            Element attributesNode = new Element("attributes");
            String attributevalues[] = parameterMap.get("attributevalue");
            if(attributevalues != null) {
                String attributestatics[] = parameterMap.get("attributestatic");
                for(int i = 0; i < attributevalues.length; i++) {
                    Element attribute = new Element("attribute");
                    attribute.setAttribute("static", attributestatics[i]);
                    attribute.setText(attributevalues[i]);
                    attributesNode.addContent(attribute);
                }
            }
            obj.addContent(attributesNode);

            Element operationsNode = new Element("operations");
            String operationvalues[] = parameterMap.get("operationvalue");
            if(operationvalues != null) {
                String operationstatics[] = parameterMap.get("operationstatic");
                String operationabstracts[] = parameterMap.get("operationstatic");
                for(int i = 0; i < operationvalues.length; i++) {
                    Element operation = new Element("operation");
                    operation.setAttribute("static", operationstatics[i]);
                    operation.setAttribute("abstract", operationabstracts[i]);
                    operation.setText(operationvalues[i]);
                    operationsNode.addContent(operation);
                }
            }
            obj.addContent(operationsNode);

            Element templatesNode = new Element("templates");
            String templatevalues[] = parameterMap.get("templatevalue");
            if(templatevalues != null) {
                for(int i = 0; i < templatevalues.length; i++) {
                    Element template = new Element("template");
                    template.setText(templatevalues[i]);
                    templatesNode.addContent(template);
                }
            }
            obj.addContent(templatesNode);
            
        } else if(objType.equals("note") || objType.equals("frame")
                || objType.equals("package1") || objType.equals("package2")
                || objType.equals("component") || objType.equals("artifact")
                || objType.equals("usecase") || objType.equals("actor")
                || objType.equals("superstate") || objType.equals("action")
                || objType.equals("subactivity") || objType.equals("timesignal")
                || objType.equals("acceptsignal") || objType.equals("sendsignal")
                || objType.equals("connector") || objType.equals("transformation")
                || objType.equals("part")) { //<editor-fold>
            obj = new Element(objType);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("fontstyle", parameterMap.get("fontstyle")[0]);
            obj.setAttribute("fontweight", parameterMap.get("fontweight")[0]);
            obj.setAttribute("fontsize", parameterMap.get("fontsize")[0]);
            obj.setAttribute("fontfamily", parameterMap.get("fontfamily")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("label", parameterMap.get("label")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            obj.setAttribute("textcolor", parameterMap.get("textcolor")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            
        } else if(objType.equals("polygon")) { //<editor-fold>
            obj = new Element("polygon");
            String xcoordinate[] = parameterMap.get("x");
            String ycoordinate[] = parameterMap.get("y");

            for(int i = 0; i < xcoordinate.length; i++) {
                Element point = new Element("point");
                point.setAttribute("x", xcoordinate[i]);
                point.setAttribute("y", ycoordinate[i]);
                obj.addContent(point);
            }

            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            
        } else if(objType.equals("polyline")) { //<editor-fold>
            obj = new Element("polyline");
            String xcoordinate[] = parameterMap.get("x");
            String ycoordinate[] = parameterMap.get("y");

            for(int i = 0; i < xcoordinate.length; i++) {
                Element point = new Element("point");
                point.setAttribute("x", xcoordinate[i]);
                point.setAttribute("y", ycoordinate[i]);
                obj.addContent(point);
            }

            obj.setAttribute("arrowstyle1", parameterMap.get("arrowstyle1")[0]);
            obj.setAttribute("arrowstyle2", parameterMap.get("arrowstyle2")[0]);
            obj.setAttribute("linestyle", parameterMap.get("linestyle")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            
        } else if(objType.equals("instance")) { 
            obj = new Element("instance");
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("textcolor", parameterMap.get("textcolor")[0]);
            obj.setAttribute("fontsize", parameterMap.get("fontsize")[0]);
            obj.setAttribute("instancename", parameterMap.get("instancename")[0]);
            obj.setAttribute("classname", parameterMap.get("classname")[0]);
            obj.setAttribute("showattributes", parameterMap.get("showattributes")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);

            Element attributesNode = new Element("attributes");
            String attributevalues[] = parameterMap.get("attributevalue");
            if(attributevalues != null) {
                String attributestatics[] = parameterMap.get("attributestatic");
                for(int i = 0; i < attributevalues.length; i++) {
                    Element attribute = new Element("attribute");
                    attribute.setAttribute("static", attributestatics[i]);
                    attribute.setText(attributevalues[i]);
                    attributesNode.addContent(attribute);
                }
            }
            obj.addContent(attributesNode);
            
        } else if(objType.equals("node")) { 
            obj = new Element("node");
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("topheight", parameterMap.get("topheight")[0]);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("textcolor", parameterMap.get("textcolor")[0]);
            obj.setAttribute("fontsize", parameterMap.get("fontsize")[0]);
            obj.setAttribute("nodename", parameterMap.get("nodename")[0]);
            obj.setAttribute("stereotype", parameterMap.get("stereotype")[0]);
            obj.setAttribute("showartifacts", parameterMap.get("showartifacts")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);

            Element containedartifactsNode = new Element("containedartifacts");
            String containedartifactvalues[] = parameterMap.get("containedartifactvalue");
            if(containedartifactvalues != null) {
                for(int i = 0; i < containedartifactvalues.length; i++) {
                    Element containedartifact = new Element("containedartifact");
                    containedartifact.setText(containedartifactvalues[i]);
                    containedartifactsNode.addContent(containedartifact);
                }
            }
            obj.addContent(containedartifactsNode);

            Element taggedvaluesNode = new Element("taggedvalues");
            String taggedvaluevalues[] = parameterMap.get("taggedvaluevalue");
            if(taggedvaluevalues != null) {
                for(int i = 0; i < taggedvaluevalues.length; i++) {
                    Element taggedvalue = new Element("taggedvalue");
                    taggedvalue.setText(taggedvaluevalues[i]);
                    taggedvaluesNode.addContent(taggedvalue);
                }
            }
            obj.addContent(taggedvaluesNode);
            
        } else if(objType.equals("statebox")) { 
            obj = new Element("statebox");
            obj.setAttribute("x", parameterMap.get("x")[0]);
            obj.setAttribute("y", parameterMap.get("y")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("textcolor", parameterMap.get("textcolor")[0]);
            obj.setAttribute("fontsize", parameterMap.get("fontsize")[0]);
            obj.setAttribute("statename", parameterMap.get("statename")[0]);
            obj.setAttribute("showinternalactivities", parameterMap.get("showinternalactivities")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);

            Element internalactivitysNode = new Element("internalactivitys");
            String internalactivityvalues[] = parameterMap.get("internalactivityvalue");
            if(internalactivityvalues != null) {
                for(int i = 0; i < internalactivityvalues.length; i++) {
                    Element internalactivity = new Element("internalactivity");
                    internalactivity.setText(internalactivityvalues[i]);
                    internalactivitysNode.addContent(internalactivity);
                }
            }
            obj.addContent(internalactivitysNode);
            
        } else if(objType.equals("expansionregion")) { //<editor-fold>
            obj = new Element("expansionregion");
            obj.setAttribute("fillcolor", parameterMap.get("fillcolor")[0]);
            obj.setAttribute("height", parameterMap.get("height")[0]);
            obj.setAttribute("linewidth", parameterMap.get("linewidth")[0]);
            obj.setAttribute("linejoin", parameterMap.get("linejoin")[0]);
            obj.setAttribute("linecap", parameterMap.get("linecap")[0]);
            obj.setAttribute("rotate", parameterMap.get("rotate")[0]);
            obj.setAttribute("strokestyle", parameterMap.get("strokestyle")[0]);
            obj.setAttribute("width", parameterMap.get("width")[0]);
            obj.setAttribute("listboxpin1x", parameterMap.get("listboxpin1x")[0]);
            obj.setAttribute("listboxpin1y", parameterMap.get("listboxpin1y")[0]);
            obj.setAttribute("listboxpin2x", parameterMap.get("listboxpin2x")[0]);
            obj.setAttribute("listboxpin2y", parameterMap.get("listboxpin2y")[0]);
            obj.setAttribute("listboxpinsize", parameterMap.get("listboxpinsize")[0]);
            
        }
    }

    // for attributes, operations, templates, artifacts, tagged values and internal activities
    public CordieInsertOperation(String eltName, String txt, int pos) {
        obj = new Element(eltName);
        obj.setText(txt);
        if(eltName.equals("attribute")) {
            obj.setAttribute("static", "false");
        } else if(eltName.equals("operation")) {
            obj.setAttribute("static", "false");
            obj.setAttribute("abstract", "false");
        }
        position = pos;
    }

    // for point
    public CordieInsertOperation(String eltName, String iX, String iY, int pos) {
        obj = new Element(eltName);
        obj.setAttribute("x", iX);
        obj.setAttribute("y", iY);
        position = pos;
    }

    public void setPosition(int iPos) {
        position = iPos;
    }

    public void decrementPosition() {
        position--;
    }

    public void incrementPosition() {
        position++;
    }

    public Element getObject() {
        return obj;
    }

    public int getPosition() {
        return position;
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"insert\", \"object\" : " + CordieObjectConverter.convert(obj)
                + ", \"position\" : " + position + " }";
    }
}
