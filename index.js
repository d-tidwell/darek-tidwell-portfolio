import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";
import MouseMeshInteraction from './mmi.js';


let camera, scene, renderer;

    
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const loader = new GLTFLoader();
loader.load( 'sony_trinitron_prl/scene.gltf', function ( gltf ) {
    let tvModel = gltf.scene;
    tvModel.castShadow = true;
    tvModel.scale.set(0.001, 0.001, 0.001);
   
    tvModel.position.z= 0.45;
    tvModel.rotation.set(0,3.55,0)
    scene.add( tvModel );

}, undefined, function ( error ) {

    console.error( error );

} );
const loader2 = new GLTFLoader();
loader2.load( 'brick_phone/scene.gltf', function ( gltf2 ) {
    let phoneModel = gltf2.scene;
    phoneModel.scale.set(0.025, 0.025, 0.025);
    phoneModel.position.x= 0.4;
  
    phoneModel.rotation.set(0,-4.7,0)
    scene.add( phoneModel );

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


const shadowMaterial = new THREE.ShadowMaterial({
    opacity : 0.02,
    transparent : false,
    fog : false
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
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 2;





// window resize
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight); // Update size
camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
camera.updateProjectionMatrix(); // Apply changes
});

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}


animate();
function animate() {

    requestAnimationFrame( animate );
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
      renderer.setPixelRatio(window.devicePixelRatio);
  
    //   // Update trackball controls
      controls.update();
  
    //   // Constantly rotate box
    //   scene.rotation.z -= 0.002;
    //   scene.rotation.x -= 0.004;
    //   scene.rotation.y -= 0.006;
    renderer.render( scene, camera );

}

