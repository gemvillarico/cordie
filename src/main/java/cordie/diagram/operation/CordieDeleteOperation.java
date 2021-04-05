package cordie.diagram.operation;

public class CordieDeleteOperation implements CordieOperation {

	private static final long serialVersionUID = -1864450023934714198L;

	private int position;

    public CordieDeleteOperation(CordieDeleteOperation cdo) {
        position = cdo.getPosition();
    }

    public CordieDeleteOperation(int iPos) {
        position = iPos;
    }

    public void decrementPosition() {
        position--;
    }

    public void setPosition(int iPos) {
        position = iPos;
    }

    public void incrementPosition() {
        position++;
    }

    public int getPosition() {
        return position;
    }
    
    @Override
    public String toString() {
        return "{ \"optype\" : \"delete\", \"position\" : " + position + " }";
    }
}
