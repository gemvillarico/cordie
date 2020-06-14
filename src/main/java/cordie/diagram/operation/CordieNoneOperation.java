package cordie.diagram.operation;

public class CordieNoneOperation implements CordieOperation {

    public CordieNoneOperation() {
    }

    @Override
    public String toString() {
        return "{ \"optype\" : \"none\" }";
    }
}
