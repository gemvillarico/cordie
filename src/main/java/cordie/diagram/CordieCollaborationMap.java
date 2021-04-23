package cordie.diagram;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;

import cordie.model.DiagramSession;

@Startup
@Singleton
public class CordieCollaborationMap {

	private Map<String, DiagramSession> diagramSessionMap;

	@PostConstruct
	private void init() {
		diagramSessionMap = Collections.synchronizedMap(new HashMap<String, DiagramSession>());
	}

	public Map<String, DiagramSession> getDiagramSessionMap() {
		return diagramSessionMap;
	}
}
