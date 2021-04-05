package cordie.diagram.operation;

import java.util.Map;
import org.apache.commons.text.StringEscapeUtils;

public class CordieEditOperation implements CordieOperation {

	private static final long serialVersionUID = -7602836195129808135L;

	private int position;
    private String attribute;
    private String value;
    private CordieOperation attributeOp;

    public CordieEditOperation(CordieEditOperation ceo) {
        position = ceo.getPosition();
        attribute = ceo.getAttribute();
        value = ceo.getValue();
        attributeOp = ceo.getAttributeOp();
    }

    public CordieEditOperation(int iPos, String iAttr, String iVal) {
        position = iPos;
        attribute = iAttr;
        value = iVal;
        attributeOp = new CordieNoneOperation();
    }

    public CordieEditOperation(Map<String, String[]> parameterMap) {
        position = Integer.parseInt(parameterMap.get("position")[0]);
        attribute = parameterMap.get("attribute")[0];
        value = null;
        
        String optype = parameterMap.get("attrOp")[0];

        if(optype.equals("insert")) {
            if(attribute.equals("attribute") || attribute.equals("operation") || 
               attribute.equals("template") || attribute.equals("taggedvalue") ||
               attribute.equals("containedartifact") || attribute.equals("internalactivity")) {
                attributeOp = new CordieInsertOperation(attribute, parameterMap.get("attrVal")[0],
                        Integer.parseInt(parameterMap.get("attrPos")[0]));
            } else if(attribute.equals("point")) {
                attributeOp = new CordieInsertOperation(attribute, parameterMap.get("attrX")[0],
                        parameterMap.get("attrY")[0], Integer.parseInt(parameterMap.get("attrPos")[0]));
            }
        } else if(optype.equals("delete")) {
            attributeOp = new CordieDeleteOperation(Integer.parseInt(parameterMap.get("attrPos")[0]));
        } else if(optype.equals("edit")) {
            attributeOp = new CordieEditOperation(Integer.parseInt(parameterMap.get("attrPos")[0]),
                    parameterMap.get("attrAttr")[0], parameterMap.get("attrVal")[0]);
        } else if(optype.equals("move")) {
            attributeOp = new CordieMoveOperation(Integer.parseInt(parameterMap.get("attrPos")[0]),
                    Integer.parseInt(parameterMap.get("attrDest")[0]));
        } else {
            attributeOp = new CordieNoneOperation();
        }
    }

    public void setPosition(int iPos) {
        position = iPos;
    }

    public void setAttributeOp(CordieOperation op) {
        attributeOp = op;
    }

    public void decrementPosition() {
        position--;
    }

    public void incrementPosition() {
        position++;
    }

    public int getPosition() {
        return position;
    }

    public String getAttribute() {
        return attribute;
    }

    public String getValue() {
        return value;
    }

    public CordieOperation getAttributeOp() {
        return attributeOp;
    }

    @Override
    public String toString() {
        if(value != null) {
            return "{ \"optype\" : \"edit\", \"attribute\" : \"" + attribute
                + "\", \"value\" : \"" + StringEscapeUtils.escapeJava(value) + "\", \"position\" : "
                + position + " }";
        } else {
            return "{ \"optype\" : \"edit\", \"attribute\" : \"" + attribute
                 + "\", \"attrOp\" : " + attributeOp + ", \"position\" : "
                + position + " }";
        }
    }
}
