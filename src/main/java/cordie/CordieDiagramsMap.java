package cordie;

import cordie.diagram.DiagramManager;
import java.util.HashMap;
import java.util.Collections;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.ArrayList;

@Deprecated
public class CordieDiagramsMap {
    private Map<String, DiagramManager> map;
    private Timer timer;

    private CordieDiagramsMap() {
        map = Collections.synchronizedMap(new HashMap<String, DiagramManager>());

        //int delay = 5 * 1000;   // delay for 5 sec.
        //int period = 10 * 1000;  // repeat every sec.
        //timer = new Timer();
        //timer.scheduleAtFixedRate(new MonitorDiagrams(), delay, period);
    }

    private static CordieDiagramsMap cdm = new CordieDiagramsMap();

    public static CordieDiagramsMap getInstance() {
        return cdm;
    }

    /*private class MonitorDiagrams extends TimerTask {
        @Override
        public void run() {
            ArrayList<String> diagramsToRemove = new ArrayList<String>();
            for(String diagramID : map.keySet()) {
                //System.out.println("current key" + diagramID);
                if(map.get(diagramID).isInactive()) {
                    diagramsToRemove.add(diagramID);
                } else {
                    //System.out.println("diagram " + diagramID + " is still active.");
                }
            }
            for(String diagramToRemove : diagramsToRemove) {
                System.out.println("diagram " + diagramToRemove + " is no longer active.");
                map.remove(diagramToRemove);
            }
        }
    }*/

    public Map getMap() {
        return map;
    }
}
