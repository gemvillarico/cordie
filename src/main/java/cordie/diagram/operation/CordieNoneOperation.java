package cordie.diagram.operation;

public class CordieNoneOperation implements CordieOperation {

    private static final long serialVersionUID = 1166181715547800854L;

	public CordieNoneOperation() {
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"none\" }";
    }
}
