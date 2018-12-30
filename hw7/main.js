/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agent;

// program starts here ...
init();
animate();

var counting = true;
var startTime = Date.now();
var intervalId;
var agentB, agentR;
var minute, second, msecond;

function updateCounter() {
  if(counting) {
      let currentTime = Date.now();
      msecond = ("0" + (currentTime - startTime) % 1000).substr(-3, 3);
      let counter = Math.floor((currentTime - startTime)/1000);
      //let hour = ("0" + Math.floor(counter / 3600)).substr(-2, 2);
      minute = ("0" + Math.floor((counter % 3600) / 60)).substr(-2, 2);
      second = ("0" + Math.floor(counter % 60)).substr(-2, 2);
      document.getElementById('counter').textContent = `${minute} minutes : ${second} second . ${msecond} millisecond`;
  }
}

function getRandom(min,max){
    return Math.floor(Math.random()*max)+min;
};

function init() {

  initThree();
    
  if (counting) {
    clearInterval(intervalId);
  } else {
    clearInterval(intervalId);
    startTime = Date.now();
    intervalId = setInterval(updateCounter, 15);
  }

  //scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 500;
  camera.position.y = 700;


  renderer = new THREE.WebGLRenderer();
  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setClearColor(0x888888);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
    
  

  /////////////////////////////////////////////////////////////////////

  
  // scene grid [-400,400]x[-400,400]
  var gridXZ = new THREE.GridHelper(800, 80, 0xff9696, 'white');
  scene.add(gridXZ);

  // in scene.js
  sceneFromJSON ( );  // using LevelDesigner
  
  //////////////////////////////////////////////////////////////////////////	
  	let size = 10; // halfsize of agent
//    agent = new Agent(new THREE.Vector3(-400 + 400 * Math.random(), 0, -400 + 400 * Math.random()), mesh);
    //agent = new Agent(new THREE.Vector3(50,0,-50), size);
    agentB = new Agent("BlueArrow", new THREE.Vector3(getRandom(-400, 800), 0, getRandom(-400, 800)), size, 0xaad4ff);
    agentR = new Agent("RedArrow", new THREE.Vector3(getRandom(-400, 800), 0, getRandom(-400, 800)), size, 0xffb7dc);
    updateScoreBoard(agentB, agentR);
}


function animate() {

  agentB.update(0.01)
  agentR.update(0.01)
  
  // check agent crossing obstacles ...
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agentB)} );
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agentR)} );

  updateScoreBoard(agentB, agentR);

  if (scene.targets.length > 0) {
  	requestAnimationFrame(animate);
  }
  else {
    updateScoreBoard(agentB, agentR);
    counting = false;
  	alert ('                                            << game over >>' + '\n\n                                  Time Consuming : ' + minute + ' : ' + second + ' : ' + msecond + '\n\n                                 ' + agentB.name + " : " + agentB.score + '      ' + agentR.name + ' : ' + agentR.score);
  }
  render();
  updateScoreBoard(agentB, agentR);
}

function render() {
  renderer.render(scene, camera);
}