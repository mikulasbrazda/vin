let scene, camera, renderer;

// keep values of all 5 parametrs of torusKnotGeometry in global variables
//declare class knot

class Knot {

    constructor(id = 1, radius = 1, tube = 0.4, tubularSegments = 64, radialSegments = 8, p = 2, q = 3) {
        this.id = id;
        this.radius = radius;
        this.tube = tube;
        this.tubularSegments = tubularSegments;
        this.radialSegments = radialSegments;
        this.p = p;
        this.q = q;
        const geometry = new THREE.TorusKnotGeometry(this.radius, this.tube, this.tubularSegments, this.radialSegments, this.p, this.q);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
        this.knotMesh = new THREE.Mesh(geometry, material);
    }
    calculateMesh() {
        this.knotMesh.geometry.dispose(); // Dispose of the old geometry
        let geometry = new THREE.TorusKnotGeometry(this.radius, this.tube, this.tubularSegments, this.radialSegments, this.p, this.q);
        this.knotMesh.geometry = geometry;
    }

}

//create list of knots
let knots = [];

function animate() {
    requestAnimationFrame(animate);
    knots.forEach(knot => {
        knot.knotMesh.rotation.x += 0.01;
        knot.knotMesh.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}

function init() {
    	
    // Set up the scene, camera, and renderer as global variables.
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let knot = new Knot();
    knots.push(knot);

    scene.add(knot.knotMesh);
    

    // Add lighting
    let ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);


    camera.position.z = 50;
    animate();
    // knot.animate();
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Assume you have HTML controls with IDs like 'colorPicker', 'pointsSlider', etc.

function onColorChange(event, knot) {
    const newColor = event.target.value;
    knot.knotMesh.material.color.set(newColor);
}

function onRadiusChange(event, knot) {
    knot.radius = event.target.value;
    knot.calculateMesh();
}

function onTubeChange(event, knot) {
    knot.tube = event.target.value;

    knot.calculateMesh();
}

function onRadialSegmentsChange(event, knot) {
    knot.radialSegments = event.target.value;
    knot.calculateMesh();
}

function onTubularSegmentsChange(event, knot) {
    knot.tubularSegments = event.target.value;
    knot.calculateMesh();
}

function onPSliderChange(event, knot) {
    knot.p = event.target.value;
    knot.calculateMesh();
}

function onQSliderChange(event, knot) {
    knot.q = event.target.value;
    knot.calculateMesh();
}

function addUi(newKnot) {
    let listItem = document.createElement('li');
    listItem.id = newKnot.id;
    listItem.innerHTML = `Knot ${newKnot.id}        
    <label for="colorPicker${newKnot.id}">Color:</label>
    <input type="color" id="colorPicker${newKnot.id}" value="#00ff00">
    
    <label for="radiusSlider${newKnot.id}">Radius:</label>
    <input type="range" id="radiusSlider${newKnot.id}" min="1" max="20" step="0.1" value="1">

    <label for="tubeSlider${newKnot.id}">Tube:</label>
    <input type="range" id="tubeSlider${newKnot.id}" min="0.1" max="10" step="0.1" value="0.4">

    <label for="radialSegmentsSlider${newKnot.id}">Radial Segments:</label>
    <input type="range" id="radialSegmentsSlider${newKnot.id}" min="3" step="1" max="20" value="8">
    
    <label for="tubularSegmentsSlider${newKnot.id}">Tubular Segments:</label>
    <input type="range" id="tubularSegmentsSlider${newKnot.id}" min="3" step="1" max="20" value="64">
    <!-- p and q slider -->
    <label for="pSlider${newKnot.id}">p:</label>
    <input type="range" id="pSlider${newKnot.id}" min="1" step="1" max="20" value="2">
    <label for="qSlider${newKnot.id}">q:</label>
    <input type="range" id="qSlider${newKnot.id}" min="1" step="1" max="20" value="3"></input>`;
    document.getElementById('knotList').appendChild(listItem);
    //pass knot to event listeners
    document.getElementById(`colorPicker${newKnot.id}`).addEventListener('change', function (event) { onColorChange(event, newKnot) });
    document.getElementById(`radiusSlider${newKnot.id}`).addEventListener('input',  function (event) { onRadiusChange(event, newKnot)});
    document.getElementById(`tubeSlider${newKnot.id}`).addEventListener('input',  function (event) { onTubeChange(event, newKnot)}); 
    document.getElementById(`radialSegmentsSlider${newKnot.id}`).addEventListener('input',  function (event) { onRadialSegmentsChange(event, newKnot)});
    document.getElementById(`tubularSegmentsSlider${newKnot.id}`).addEventListener('input',  function (event) { onTubularSegmentsChange(event, newKnot)});
    document.getElementById(`pSlider${newKnot.id}`).addEventListener('input',  function (event) { onPSliderChange(event, newKnot)});
    document.getElementById(`qSlider${newKnot.id}`).addEventListener('input',  function (event) { onQSliderChange(event, newKnot)});
}

// add knot to the scene on different possition
function addKnot(event) {
    // You'll need to add the knot to the scene
    let newKnot = new Knot(knots.length + 1);
    addUi(newKnot);
    scene.add(newKnot.knotMesh);
    knots.push(newKnot);

   // console.log(JSON.stringify(knots));

    // newKnot.animate()
    // You'll also need to add the knot to the DOM
    
}



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('colorPicker1').addEventListener('change', function (event) { onColorChange(event, knots[0]) });

    //add all event listeners also for next parameters of torusKnotGeometry
    document.getElementById('radiusSlider1').addEventListener('input', function (event) { onRadiusChange(event, knots[0])});
    document.getElementById('tubeSlider1').addEventListener('input', function (event) { onTubeChange(event, knots[0])});
    document.getElementById('radialSegmentsSlider1').addEventListener('input', function (event) { onRadialSegmentsChange(event, knots[0])});
    document.getElementById('tubularSegmentsSlider1').addEventListener('input', function (event) { onTubularSegmentsChange(event, knots[0])});

    // add p and q sliders
    document.getElementById('pSlider1').addEventListener('input', function (event) { onPSliderChange(event, knots[0])});
    document.getElementById('qSlider1').addEventListener('input', function (event) { onQSliderChange(event, knots[0])});

    // add another knot
    document.getElementById('addKnot').addEventListener('click', addKnot);

    // Add other event listeners here
});

// Add event listeners to the HTML controls

// Rest of your Three.js setup and animation loop...


init();
