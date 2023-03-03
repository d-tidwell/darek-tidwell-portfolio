import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";


let camera, scene, renderer, raycaster, mouse;

    
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// GLTF MODELS
const loader = new GLTFLoader();
loader.load( 'sony_trinitron_prl/scene.gltf', function ( gltf ) {
    let tvModel = gltf.scene;
    tvModel.castShadow = true;
    tvModel.scale.set(0.001, 0.001, 0.001);
    tvModel.position.z= 0.35;
    tvModel.rotation.set(0,3.55,0)
    scene.add( tvModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-tv' );

},undefined, function ( error ) {

    console.error( error );

} );
const loader2 = new GLTFLoader();
loader2.load( 'brick_phone/scene.gltf', function ( gltf2 ) {
    let phoneModel = gltf2.scene;
    phoneModel.scale.set(0.025, 0.025, 0.025);
    phoneModel.position.x= 0.4;
    phoneModel.rotation.set(0,-4.7,0)
    scene.add( phoneModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

}, undefined, function ( error ) {

    console.error( error );

} );

// Camera
camera = new THREE.PerspectiveCamera( 70, sizes.width / sizes.height, 0.01, 10 );
camera.position.z = 1;

scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x121111, 0.00025, 1 );
scene.add(camera);

// Geometry 
const box1 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
box1.translate(-.4,0,0)
box1.castShadow = true;
const box2 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
box2.translate(-.4,0,0)
box2.castShadow = true;
const box3 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
box3.translate(0,0,.4)
box3.castShadow = true;
const box4 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
box4.translate(0,0,-.4)
box4.castShadow = true;


const plane = new THREE.PlaneGeometry(5000,5000)
plane.receiveShadow= true;
plane.rotateX(- Math.PI / 2)

// Materials
const default_material = new THREE.MeshNormalMaterial();
const material = new THREE.MeshPhysicalMaterial({
    color : 0x049ef4,
    roughness : 0.89,
    metalness : 0.02,
    reflectivity : 0.085,
    clearcoat : 0.098,
    clearcoatRoughness : 0.01

});


// Meshs
//const mesh1 = new THREE.Mesh( box1, material );
//scene.add( mesh1 );
const mesh2 = new THREE.Mesh( box2, material );
scene.add( mesh2 );
//const mesh3 = new THREE.Mesh( box3, material );
//scene.add( mesh3 );
const mesh4 = new THREE.Mesh( box4, material );
// needed for event handler
mesh4.name = 'tester';
scene.add( mesh4 );

// const meshPlane = new THREE.Mesh (plane, shadowMaterial);
// meshPlane.position.y = -0.2;
// meshPlane.receiveShadow = true;
// meshPlane.transparent = true;
// scene.add(meshPlane)

// Lights
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 8 );
scene.add( light );



// Renderer


renderer = new THREE.WebGLRenderer( {antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.antialias = true;
renderer.shadowMap.enabled = true

document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 2;

//click control needs mouse x & y set first with normalized coordinate to set the ray
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
function onMouseMove( event ) {
  // calculates mouse position in normalized device coordinate -1 to  +1 for both given the canvas size
  let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
  mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
  
}
function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  raycaster.setFromCamera(mouse, camera);
  let intersect;
  intersect = raycaster.intersectObjects(scene.children, true);
  if (intersect.length > 0 ) {
    console.log(intersect)
    console.log(mouse.x, mouse.y);
    console.log(intersect[0].object.name);
    if(intersect[0].object.name == "TVSCREEN") {
      let infoPane = new THREE.PlaneGeometry(.5,.5);
      //infoPane.rotateY(- Math.PI / 2);
      infoPane.translate(0,-0.01,.51);
      const infoMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
      const infoMesh = new THREE.Mesh(infoPane, infoMaterial);
      //object catchable name
      infoMesh.name = "INFO-TV";
      scene.add(infoMesh);
    }
    // to remove the object - need to make this a function
    if(intersect[0].object.name == "INFO-TV") {
      console.log("removed");
      let selectedObject = scene.getObjectByName("INFO-TV")
      scene.remove(selectedObject);
    }

  }
}
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onClick);
window.addEventListener("touchend", onClick);



// window resize
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight); // Update size
camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
camera.updateProjectionMatrix(); // Apply changes
});





animate();
function animate() {

    
  
    //   // Update trackball controls
      controls.update();
  
    //   // Constantly rotate box
    //   scene.rotation.z -= 0.002;
    //   scene.rotation.x -= 0.004;
    //  scene.rotation.y -= 0.006;
    renderer.render( scene, camera );
    requestAnimationFrame( animate );

}

