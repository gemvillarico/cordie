package cordie.diagram;

import cordie.diagram.operation.*;

public class Transform {
    public static CordieOperation[] doTransform(CordieOperation[] tOps) {
        if(tOps[0] instanceof CordieInsertOperation) { 
            CordieInsertOperation a = (CordieInsertOperation) tOps[0];
            if(tOps[1] instanceof CordieInsertOperation) {
                CordieInsertOperation b = (CordieInsertOperation) tOps[1];
                if(a.getPosition() > b.getPosition())
                    a.incrementPosition();
                else
                    b.incrementPosition();
            } else if(tOps[1] instanceof CordieDeleteOperation) {
                CordieDeleteOperation b = (CordieDeleteOperation) tOps[1];
                if(a.getPosition() > b.getPosition())
                    a.decrementPosition();
                else
                    b.incrementPosition();
            } else if(tOps[1] instanceof CordieEditOperation) {
                CordieEditOperation b = (CordieEditOperation) tOps[1];
                if(a.getPosition() <= b.getPosition())
                    b.incrementPosition();
            } else if(tOps[1] instanceof CordieMoveOperation) {
                CordieMoveOperation b = (CordieMoveOperation) tOps[1];
                if(a.getPosition() > b.getPosition()) {
                    if(a.getPosition() > b.getDestination()) {
                        //do nothing
                    }
                    else {
                        a.decrementPosition();
                        b.incrementDestination();
                    }
                } else {
                    if(a.getPosition() > b.getDestination()) {
                        a.incrementPosition();
                        b.incrementPosition();
                    } else {
                        b.incrementPosition();
                        b.incrementDestination();
                    }
                }
            } 
        } else if(tOps[0] instanceof CordieDeleteOperation) { 
            CordieDeleteOperation a = (CordieDeleteOperation) tOps[0];
            if(tOps[1] instanceof CordieInsertOperation) {
                CordieInsertOperation b = (CordieInsertOperation) tOps[1];
                if(a.getPosition() < b.getPosition())
                    b.decrementPosition();
                else
                    a.incrementPosition();
            } else if(tOps[1] instanceof CordieDeleteOperation) {
                CordieDeleteOperation b = (CordieDeleteOperation) tOps[1];
                if(a.getPosition() < b.getPosition())
                    b.decrementPosition();
                else if(a.getPosition() > b.getPosition())
                    a.decrementPosition();
                else {
                    tOps[0] = new CordieNoneOperation();
                    tOps[1] = new CordieNoneOperation();
                }
            } else if(tOps[1] instanceof CordieEditOperation) {
                CordieEditOperation b = (CordieEditOperation) tOps[1];
                if(a.getPosition() < b.getPosition())
                    b.decrementPosition();
                else if(a.getPosition() == b.getPosition())
                    tOps[1] = new CordieNoneOperation();
            } else if(tOps[1] instanceof CordieMoveOperation) {
                CordieMoveOperation b = (CordieMoveOperation) tOps[1];
                if(a.getPosition() == b.getPosition()) {
                    a.setPosition(b.getDestination());
                    tOps[1] = new CordieNoneOperation();
                } else if(a.getPosition() < b.getPosition()) {
                    if(a.getPosition() < b.getDestination()) {
                        b.decrementPosition();
                        b.decrementDestination();
                    } else {
                        a.incrementPosition();
                        b.decrementPosition();
                    }
                } else if(a.getPosition() <= b.getDestination()) {
                    a.decrementPosition();
                    b.decrementDestination();
                }
            } 
        } else if(tOps[0] instanceof CordieEditOperation) { 
            CordieEditOperation a = (CordieEditOperation) tOps[0];
            if(tOps[1] instanceof CordieInsertOperation) {
                CordieInsertOperation b = (CordieInsertOperation) tOps[1];
                if(a.getPosition() >= b.getPosition())
                    a.incrementPosition();
            } else if(tOps[1] instanceof CordieDeleteOperation) {
                CordieDeleteOperation b = (CordieDeleteOperation) tOps[1];
                if(a.getPosition() > b.getPosition())
                    a.decrementPosition();
                else if(a.getPosition() == b.getPosition())
                    tOps[0] = new CordieNoneOperation();
            } else if(tOps[1] instanceof CordieEditOperation) {
                CordieEditOperation b = (CordieEditOperation) tOps[1];
                if((a.getPosition() == b.getPosition()) &&
                        a.getAttribute().equals(b.getAttribute())) {
                    if(a.getValue() == null && b.getValue() == null) {
                        CordieOperation[] origAttOps = {a.getAttributeOp(), b.getAttributeOp()};
                        CordieOperation[] transAttOps = Transform.doTransform(origAttOps);
                        a.setAttributeOp(transAttOps[0]);
                        b.setAttributeOp(transAttOps[1]);
                    } else if(a.getValue() != null && b.getValue() != null) {
                        tOps[1] = new CordieNoneOperation();
                    }
                }
            } else if(tOps[1] instanceof CordieMoveOperation) {
                CordieMoveOperation b = (CordieMoveOperation) tOps[1];
                if(a.getPosition() == b.getPosition()) {
                    a.setPosition(b.getDestination());
                } else if(a.getPosition() >= b.getDestination() &&
                          a.getPosition() < b.getPosition()) {
                    a.incrementPosition();
                } else if(a.getPosition() <= b.getDestination() &&
                          a.getPosition() > b.getPosition()) {
                    a.decrementPosition();
                } else {
                    //do nothing
                }
            } 
        } else if(tOps[0] instanceof CordieMoveOperation) { 
            CordieMoveOperation a = (CordieMoveOperation) tOps[0];
            if(tOps[1] instanceof CordieInsertOperation) {
                CordieInsertOperation b = (CordieInsertOperation) tOps[1];
                if(b.getPosition() > a.getPosition()) {
                    if(b.getPosition() > a.getDestination()) {
                        //do nothing
                    } else {
                        a.incrementDestination();
                        b.decrementPosition();
                    }
                } else if(b.getPosition() > a.getDestination()) {
                    a.incrementPosition();
                    b.incrementPosition();
                } else {
                    a.incrementPosition();
                    a.incrementDestination();
                }
            } else if(tOps[1] instanceof CordieDeleteOperation) {
                CordieDeleteOperation b = (CordieDeleteOperation) tOps[1];
                if(b.getPosition() == a.getPosition()) {
                    tOps[0] = new CordieNoneOperation();
                    b.setPosition(a.getDestination());
                } else if(b.getPosition() < a.getPosition()) {
                    if(b.getPosition() < a.getDestination()) {
                        a.decrementPosition();
                        a.decrementDestination();
                    } else {
                        a.decrementPosition();
                        b.incrementPosition();
                    }
                } else if(b.getPosition() <= a.getDestination()) {
                    a.decrementDestination();
                    b.decrementPosition();
                } else {
                    //do nothing
                }
            } else if(tOps[1] instanceof CordieEditOperation) {
                CordieEditOperation b = (CordieEditOperation) tOps[1];
                if(b.getPosition() == a.getPosition()) {
                    b.setPosition(a.getDestination());
                } else if(b.getPosition() >= a.getDestination() &&
                          b.getPosition() < a.getPosition()) {
                    b.incrementPosition();
                } else if(b.getPosition() <= a.getDestination() &&
                          b.getPosition() > a.getPosition()) {
                    b.decrementPosition();
                } else {
                    //do nothing
                }
            } else if(tOps[1] instanceof CordieMoveOperation) {
                CordieMoveOperation b = (CordieMoveOperation) tOps[1];
                int p = a.getPosition();
                int q = a.getDestination();
                int r = b.getPosition();
                int s = b.getDestination();

                // 1
		if(p == r) {
                    if(q == s) {
                        tOps[0] = new CordieNoneOperation();
                        tOps[1] = new CordieNoneOperation();
                        return tOps;
                    } else if(r == s) {
                        b.setPosition(q);
                        b.setDestination(q);
                        return tOps;
                    } else if(p == q) {
                        a.setPosition(s);
                        a.setDestination(s);
                        return tOps;
                    } else {
                        a.setPosition(s);
                        tOps[1] = new CordieNoneOperation();
                        return tOps;
                    }
		}

                // 2
		if(p > r) {
                    if(p <= s) a.decrementPosition();
                    if(r >= q) b.incrementPosition();
		} else {
                    if(p >= s) a.incrementPosition();
                    if(r <= q) b.decrementPosition();
		}

                // 3
		if(q > r && q < s) a.decrementDestination();
		else if(q < r && q > s) a.incrementDestination();
		else {
                    if(r == q) {
                        if(p < r && r < s) a.decrementDestination();
                        else if(p > r && r > s) a.incrementDestination();
                    } else if(s == q) {
                        if(r < s && s <= p) a.decrementDestination();
                        else if(r > s && s >= p) a.incrementDestination();
                    }
		}

                //4
		if(s > p) {
                    if(s <= q) b.decrementDestination();
		} else if(s < p) {
                    if(s >= q) b.incrementDestination();
		} else { // p == s
                    if(p < q && r < s) b.decrementDestination();
                    else if(p > q && r > s) b.incrementDestination();
		}
            } 
        }

        return tOps;
    }
}
