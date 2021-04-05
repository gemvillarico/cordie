package cordie.diagram.operation;

public class CordieMoveOperation implements CordieOperation {

	private static final long serialVersionUID = -1782684380902256125L;

	private int position;
	private int destination;

	public CordieMoveOperation(CordieMoveOperation cmo) {
		position = cmo.getPosition();
		destination = cmo.getDestination();
	}

	public CordieMoveOperation(int iPos, int iDest) {
		position = iPos;
		destination = iDest;
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

	public void setPosition(int iPos) {
		position = iPos;
	}

	public int getDestination() {
		return destination;
	}

	public void setDestination(int iDes) {
		destination = iDes;
	}

	public void decrementDestination() {
		destination--;
	}

	public void incrementDestination() {
		destination++;
	}

	@Override
	public String toString() {
		return "{ \"optype\" : \"move\", \"position\" : " + position + ", " + "\"destination\" : " + destination + " }";
	}
}