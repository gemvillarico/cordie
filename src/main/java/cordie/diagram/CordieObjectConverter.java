package cordie.diagram;

import java.util.ListIterator;
import org.jdom.Element;
import org.apache.commons.text.StringEscapeUtils;

public class CordieObjectConverter {
    @SuppressWarnings("rawtypes")
	public static String convert(Element elt) {
        String eltName = elt.getName();
        if(eltName.equals("rectangle") || eltName.equals("ellipse") || eltName.equals("lifeline")
                || eltName.equals("arrowhead") || eltName.equals("activationbar")
                || eltName.equals("deletion") || eltName.equals("initialps")
                || eltName.equals("finalstate") || eltName.equals("shallowhistps")
                || eltName.equals("deephistps") || eltName.equals("initialnode")
                || eltName.equals("blackbar") || eltName.equals("diamond")
                || eltName.equals("finalnode") || eltName.equals("pin")
                || eltName.equals("flowfinal") || eltName.equals("port")) { 
            return "{\"objecttype\" : \"" + eltName + "\", \"linewidth\" : " + elt.getAttributeValue("linewidth") 
                + ", \"linecap\" : \"" + elt.getAttributeValue("linecap") +
                "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin") +
                "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle")
                + "\", \"x\" : " + elt.getAttributeValue("x") + ", \"y\" : " +
                elt.getAttributeValue("y") + ", \"width\" : " + elt.getAttributeValue("width")
                + ", \"height\" : " + elt.getAttributeValue("height") + ", \"fillcolor\" : \"" 
                + elt.getAttributeValue("fillcolor") + "\", \"rotate\" : " +
                elt.getAttributeValue("rotate") + " }";
            
        } else if(eltName.equals("line")) { 
            return "{\"objecttype\" : \"line\", \"linewidth\" : " + elt.getAttributeValue("linewidth") +
                ", \"linecap\" : \"" + elt.getAttributeValue("linecap") + "\", \"linejoin\" : \"" +
                elt.getAttributeValue("linejoin") + "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") +
                "\", \"x1\" : " + elt.getAttributeValue("x1") +
                ", \"y1\" : " + elt.getAttributeValue("y1") +
                ", \"x2\" : " + elt.getAttributeValue("x2") +
                ", \"y2\" : " + elt.getAttributeValue("y2") +
                ", \"arrowstyle1\" : \"" + elt.getAttributeValue("arrowstyle1") +
                "\", \"arrowstyle2\" : \"" + elt.getAttributeValue("arrowstyle2") +
                "\", \"linestyle\" : \"" + elt.getAttributeValue("linestyle") + "\" }";
            
        } else if(eltName.equals("path")) { 
            String temp = "{\"objecttype\" : \"path\", \"linewidth\" : " + elt.getAttributeValue("linewidth") 
                    + ", \"linecap\" : \"" + elt.getAttributeValue("linecap") +
                    "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin")
                    + "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") 
                    + "\", \"points\" : [";

            String[] temp2 = elt.getAttributeValue("points").split("[ ]+");
            for(int i = 0; i < temp2.length; i++) {
                String[] temp3 = temp2[i].split("[,]+");
                if(i != 0) temp += ",";
                temp = temp + " {\"x\" : " + temp3[0] + ", \"y\" : " +
                        temp3[1] + "}";
            }
            temp += " ] }";

            return temp;
            
        } else if(eltName.equals("polygon")) { 
            String temp = "{\"objecttype\" : \"polygon\", \"linewidth\" : " + elt.getAttributeValue("linewidth")
                    + ", \"linecap\" : \"" + elt.getAttributeValue("linecap") +
                    "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin")
                    + "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle")
                    + "\", \"fillcolor\" : \"" + elt.getAttributeValue("fillcolor")
                    + "\", \"points\" : [";

            ListIterator itr = elt.getChildren("point").listIterator();
            while(itr.hasNext()) {
                if(itr.hasPrevious()) temp += ", ";
                Element point = (Element) itr.next();
                temp += "{\"x\" : " + point.getAttributeValue("x") + ", \"y\" : " 
                        + point.getAttributeValue("y") + "}";
            }

            temp += " ] }";

            return temp;
            
        } else if(eltName.equals("text")) { 
            return "{\"objecttype\" : \"text\", \"fontstyle\" : \"" + elt.getAttributeValue("fontstyle")
                + "\", \"fontweight\" : \"" + elt.getAttributeValue("fontweight")
                + "\", \"fontsize\" : " + elt.getAttributeValue("fontsize")
                + ", \"fontfamily\" : \"" + elt.getAttributeValue("fontfamily")
                + "\", \"x\" : " + elt.getAttributeValue("x")
                + ", \"y\" : " + elt.getAttributeValue("y")
                + ", \"width\" : " + elt.getAttributeValue("width")
                + ", \"height\" : " + elt.getAttributeValue("height")
                + ", \"label\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("label"))
                + "\", \"textcolor\" : \"" + elt.getAttributeValue("textcolor")
                + "\", \"rotate\" : " + elt.getAttributeValue("rotate") + " }";
            
        } else if(eltName.equals("class")) { 
            String temp = "{\"objecttype\" : \"class\", \"linewidth\" : " + elt.getAttributeValue("linewidth") +
                ", \"linecap\" : \"" + elt.getAttributeValue("linecap") + "\", \"linejoin\" : \"" +
                elt.getAttributeValue("linejoin") + "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") +
                "\", \"x\" : " + elt.getAttributeValue("x") + ", \"y\" : " + elt.getAttributeValue("y") +
                ", \"width\" : " + elt.getAttributeValue("width") + ", \"height\" : " +
                elt.getAttributeValue("height") + ", \"fillcolor\" : \"" + elt.getAttributeValue("fillcolor") +
                "\", \"textcolor\" : \"" + elt.getAttributeValue("textcolor") +
                "\", \"fontsize\" : " + elt.getAttributeValue("fontsize") +
                ", \"classfontsize\" : " + elt.getAttributeValue("classfontsize") +
                ", \"classname\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("classname")) +
                "\", \"abstractclass\" : " + elt.getAttributeValue("abstractclass") +
                ", \"qualifiedassociation\" : " + elt.getAttributeValue("qualifiedassociation") +
                ", \"qualifier\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("qualifier")) +
                "\", \"stereotype\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("stereotype")) +
                "\", \"templateclass\" : " + elt.getAttributeValue("templateclass") +
                ", \"activeclass\" : " + elt.getAttributeValue("activeclass") + ", \"attributes\" : [";

            ListIterator itr;

            Element attributes = elt.getChild("attributes");
            if(attributes != null) {
                itr = attributes.getChildren("attribute").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp = temp + "], \"showattributes\" : " + elt.getAttributeValue("showattributes")
                    + ", \"operations\" : [";

            Element operations = elt.getChild("operations");
            if(operations != null) {
                itr = operations.getChildren("operation").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp = temp + "], \"showoperations\" : " + elt.getAttributeValue("showoperations")
                    + ", \"templates\" : [";

            Element templates = elt.getChild("templates");
            if(templates != null) {
                itr = templates.getChildren("template").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp += "], \"rotate\" : " + elt.getAttributeValue("rotate") + " }";

            return temp;
            
        } else if(eltName.equals("note") || eltName.equals("frame")
                || eltName.equals("package1") || eltName.equals("component")
                || eltName.equals("artifact") || eltName.equals("usecase")
                || eltName.equals("actor") || eltName.equals("superstate")
                || eltName.equals("action") || eltName.equals("subactivity")
                || eltName.equals("timesignal") || eltName.equals("acceptsignal")
                || eltName.equals("sendsignal") || eltName.equals("connector")
                || eltName.equals("transformation") || eltName.equals("part")
                || eltName.equals("package2")) { 
            return "{\"objecttype\" : \"" + eltName + "\", \"fillcolor\" : \"" + elt.getAttributeValue("fillcolor")
                    + "\", \"fontsize\" : " + elt.getAttributeValue("fontsize") 
                    + ", \"fontfamily\" : \"" + elt.getAttributeValue("fontfamily") 
                    + "\", \"fontstyle\" : \"" + elt.getAttributeValue("fontstyle") 
                    + "\", \"fontweight\" : \"" + elt.getAttributeValue("fontweight") 
                    + "\", \"height\" : " + elt.getAttributeValue("height") 
                    + ", \"label\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("label"))
                    + "\", \"linecap\" : \"" + elt.getAttributeValue("linecap") 
                    + "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin") 
                    + "\", \"linewidth\" : " + elt.getAttributeValue("linewidth") 
                    + ", \"rotate\" : " + elt.getAttributeValue("rotate") 
                    + ", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") 
                    + "\", \"textcolor\" : \"" + elt.getAttributeValue("textcolor") 
                    + "\", \"width\" : " + elt.getAttributeValue("width") 
                    + ", \"x\" : " + elt.getAttributeValue("x") 
                    + ", \"y\" : " + elt.getAttributeValue("y")  + "}";
            
        } else if(eltName.equals("attribute")) { 
            return "{\"value\" : \"" + StringEscapeUtils.escapeJava(elt.getText()) + "\", \"isstatic\" : " +
                    elt.getAttributeValue("static") + "}";
            
        } else if(eltName.equals("operation")) { 
            return "{\"value\" : \"" + StringEscapeUtils.escapeJava(elt.getText()) + "\", \"isstatic\" : " +
                    elt.getAttributeValue("static") + ", \"isabstract\" : " +
                    elt.getAttributeValue("abstract") + "}";
            
        } else if(eltName.equals("template")) { 
            return "{\"value\" : \"" + StringEscapeUtils.escapeJava(elt.getText()) + "\"}";
            
        } else if(eltName.equals("bezier")) { 
            return "{\"objecttype\" : \"bezier\", \"linewidth\" : " + elt.getAttributeValue("linewidth") +
                ", \"linecap\" : \"" + elt.getAttributeValue("linecap") + "\", \"linejoin\" : \"" +
                elt.getAttributeValue("linejoin") + "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") +
                "\", \"x1\" : " + elt.getAttributeValue("x1") +
                ", \"y1\" : " + elt.getAttributeValue("y1") +
                ", \"x2\" : " + elt.getAttributeValue("x2") +
                ", \"y2\" : " + elt.getAttributeValue("y2") +
                ", \"arrowstyle1\" : \"" + elt.getAttributeValue("arrowstyle1") +
                "\", \"arrowstyle2\" : \"" + elt.getAttributeValue("arrowstyle2") +
                "\", \"linestyle\" : \"" + elt.getAttributeValue("linestyle") +
                "\", \"ctrl1x\" : " + elt.getAttributeValue("ctrl1x")+ ", \"ctrl1y\" : "
                + elt.getAttributeValue("ctrl1y")+ ", \"ctrl2x\" : " + elt.getAttributeValue("ctrl2x")
                + ", \"ctrl2y\" : " + elt.getAttributeValue("ctrl2y")+ " }";
            
        } else if(eltName.equals("point")) { 
            return "{\"x\" : " + elt.getAttributeValue("x") + ",\"y\" : " + 
                    elt.getAttributeValue("y") + "}";
            
        } else if(eltName.equals("instance")) { 
            String temp = "{\"objecttype\" : \"instance\", \"linewidth\" : " + elt.getAttributeValue("linewidth") +
                ", \"linecap\" : \"" + elt.getAttributeValue("linecap") + 
                "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin") +
                "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") +
                "\", \"x\" : " + elt.getAttributeValue("x") +
                ", \"y\" : " + elt.getAttributeValue("y") +
                ", \"width\" : " + elt.getAttributeValue("width") + 
                ", \"height\" : " + elt.getAttributeValue("height") +
                ", \"fillcolor\" : \"" + elt.getAttributeValue("fillcolor") +
                "\", \"textcolor\" : \"" + elt.getAttributeValue("textcolor") +
                "\", \"fontsize\" : " + elt.getAttributeValue("fontsize") +
                ", \"classname\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("classname")) +
                "\", \"instancename\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("instancename")) +
                "\", \"rotate\" : " + elt.getAttributeValue("rotate") +
                ", \"showattributes\" : " + elt.getAttributeValue("showattributes") +
                ", \"attributes\" : [";

            Element attributes = elt.getChild("attributes");
            if(attributes != null) {
                ListIterator itr = attributes.getChildren("attribute").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp += "] }";

            return temp;
            
        } else if(eltName.equals("node")) { 
            String temp = "{\"objecttype\" : \"node\", \"linewidth\" : " + elt.getAttributeValue("linewidth") +
                ", \"linecap\" : \"" + elt.getAttributeValue("linecap") +
                "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin") +
                "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") +
                "\", \"x\" : " + elt.getAttributeValue("x") +
                ", \"y\" : " + elt.getAttributeValue("y") +
                ", \"width\" : " + elt.getAttributeValue("width") +
                ", \"height\" : " + elt.getAttributeValue("height") +
                ", \"topheight\" : " + elt.getAttributeValue("topheight") +
                ", \"fillcolor\" : \"" + elt.getAttributeValue("fillcolor") +
                "\", \"textcolor\" : \"" + elt.getAttributeValue("textcolor") +
                "\", \"fontsize\" : " + elt.getAttributeValue("fontsize") +
                ", \"nodename\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("nodename")) +
                "\", \"stereotype\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("stereotype")) +
                "\", \"rotate\" : " + elt.getAttributeValue("rotate") +
                ", \"showartifacts\" : " + elt.getAttributeValue("showartifacts") +
                ", \"containedartifacts\" : [";

            Element artifacts = elt.getChild("containedartifacts");
            if(artifacts != null) {
                ListIterator itr = artifacts.getChildren("containedartifact").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp += "], \"taggedvalues\" : [";
            
            Element taggedvalues = elt.getChild("taggedvalues");
            if(taggedvalues != null) {
                ListIterator itr = taggedvalues.getChildren("taggedvalue").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp += "] }";

            return temp;
            
        } else if(eltName.equals("taggedvalue")) { 
            return "\"" + StringEscapeUtils.escapeJava(elt.getText()) + "\"";
            
        } else if(eltName.equals("containedartifact")) { 
            return "\"" + StringEscapeUtils.escapeJava(elt.getText()) + "\"";
            
        } else if(eltName.equals("statebox")) { 
            String temp = "{\"objecttype\" : \"statebox\", \"linewidth\" : " + elt.getAttributeValue("linewidth") +
                ", \"linecap\" : \"" + elt.getAttributeValue("linecap") +
                "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin") +
                "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") +
                "\", \"x\" : " + elt.getAttributeValue("x") +
                ", \"y\" : " + elt.getAttributeValue("y") +
                ", \"width\" : " + elt.getAttributeValue("width") +
                ", \"height\" : " + elt.getAttributeValue("height") +
                ", \"fillcolor\" : \"" + elt.getAttributeValue("fillcolor") +
                "\", \"textcolor\" : \"" + elt.getAttributeValue("textcolor") +
                "\", \"fontsize\" : " + elt.getAttributeValue("fontsize") +
                ", \"statename\" : \"" + StringEscapeUtils.escapeJava(elt.getAttributeValue("statename")) +
                "\", \"rotate\" : " + elt.getAttributeValue("rotate") +
                ", \"showinternalactivities\" : " + elt.getAttributeValue("showinternalactivities") +
                ", \"internalactivitys\" : [";

            Element internalactivitys = elt.getChild("internalactivitys");
            if(internalactivitys != null) {
                ListIterator itr = internalactivitys.getChildren("internalactivity").listIterator();
                while(itr.hasNext()) {
                    if(itr.hasPrevious()) temp += ", ";
                    temp += convert((Element) itr.next());
                }
            }
            temp += "] }";

            return temp;
            
        } else if(eltName.equals("internalactivity")) { 
            return "\"" + StringEscapeUtils.escapeJava(elt.getText()) + "\"";
            
        } else if(eltName.equals("expansionregion")) { 
            return "{\"objecttype\" : \"expansionregion\", \"linewidth\" : " + 
                elt.getAttributeValue("linewidth") + ", \"linecap\" : \"" +
                elt.getAttributeValue("linecap") + "\", \"linejoin\" : \"" +
                elt.getAttributeValue("linejoin") + "\", \"strokestyle\" : \"" +
                elt.getAttributeValue("strokestyle") + "\", \"x\" : " +
                elt.getAttributeValue("x") + ", \"y\" : " + elt.getAttributeValue("y")
                + ", \"width\" : " + elt.getAttributeValue("width") + ", \"height\" : "
                + elt.getAttributeValue("height") + ", \"fillcolor\" : \"" +
                elt.getAttributeValue("fillcolor") + "\", \"rotate\" : " +
                elt.getAttributeValue("rotate") + ", \"listboxpin1x\" : " + 
                elt.getAttributeValue("listboxpin1x") + ", \"listboxpin1y\" : " 
                + elt.getAttributeValue("listboxpin1y")  + ", \"listboxpin2x\" : " 
                + elt.getAttributeValue("listboxpin2x") + ", \"listboxpin2y\" : " 
                + elt.getAttributeValue("listboxpin2y")+ ", \"listboxpinsize\" : "
                + elt.getAttributeValue("listboxpinsize") + " }";
            
        } else if(eltName.equals("polyline")) { 
            String temp = "{\"objecttype\" : \"polyline\", \"linewidth\" : " + elt.getAttributeValue("linewidth")
                    + ", \"linecap\" : \"" + elt.getAttributeValue("linecap") +
                    "\", \"linejoin\" : \"" + elt.getAttributeValue("linejoin")
                    + "\", \"strokestyle\" : \"" + elt.getAttributeValue("strokestyle") 
                    + "\", \"arrowstyle1\" : \"" + elt.getAttributeValue("arrowstyle1")
                    + "\", \"arrowstyle2\" : \"" + elt.getAttributeValue("arrowstyle2")
                    + "\", \"linestyle\" : \"" + elt.getAttributeValue("linestyle")
                    + "\", \"points\" : [";

            ListIterator itr = elt.getChildren("point").listIterator();
            while(itr.hasNext()) {
                if(itr.hasPrevious()) temp += ", ";
                Element point = (Element) itr.next();
                temp += "{\"x\" : " + point.getAttributeValue("x") + ", \"y\" : "
                        + point.getAttributeValue("y") + "}";
            }

            temp += " ] }";

            return temp;
            
        } else {
            return "{}";
        }
    }
}