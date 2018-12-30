class Obstacle {
	constructor (center,size) {
		this.center = center.clone();  
		this.mesh = new THREE.Mesh (new THREE.CylinderGeometry(size,size,1,20),
			new THREE.MeshBasicMaterial({color: 0xffbfbf})); // transparent: true, opacity: 0.9
		this.mesh.position.copy (center);
		this.size = size;
        //this.color = THREE.Color(0xffffff);
    	scene.add (this.mesh);
	}
	
	checkCollision (agent) {
		const HIT_CRITERIA = 0.8;
		// when the agent is inside 80% of the circle
		// then consider it HIT 
		if (this.center.distanceTo (agent.pos) < this.size*HIT_CRITERIA) {
			postMessage (agent, 'HIT obstacle');
			agent.score -= 0.1;
		}
	}
    
    avoidCollision (agent) {
		const HIT_CRITERIA = 1.5;
		// when the agent is inside 80% of the circle
		// then consider it HIT 
		if (this.center.distanceTo (agent.pos) < this.size*HIT_CRITERIA){
			return true;
		}
        else return false;
	}
}
