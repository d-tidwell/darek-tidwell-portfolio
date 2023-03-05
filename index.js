import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer, raycaster, mouse, canvasBounds, blurred;

blurred = true;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Loading Screen
const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById("progress-bar");
loadingManager.onProgress=function(url, loaded, total) {
    progressBar.value = ( loaded / total) * 100;
}
const progressBarContainer = document.querySelector('.progress-bar-container');
loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
}
// GLTF MODELS
const loader = new GLTFLoader(loadingManager);
loader.load( 'sony_trinitron_prl/scene.gltf', function ( gltf ) {
    let tvModel = gltf.scene;
    tvModel.castShadow = true;
    tvModel.scale.set(0.001, 0.001, 0.001);
    tvModel.position.z= 0.6;
    tvModel.position.y=0.25;
    tvModel.rotation.set(0,3.55,0)
    scene.add( tvModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-tv' );

},undefined, function ( error ) {

    console.error( error );

} );
const loader2 = new GLTFLoader(loadingManager);
loader2.load( 'brick_phone/scene.gltf', function ( gltf2 ) {
    let phoneModel = gltf2.scene;
    phoneModel.scale.set(0.025, 0.025, 0.025);
    phoneModel.position.x= 0.65;
    phoneModel.position.y=0.25;
    phoneModel.rotation.set(0,-4.7,0)
    scene.add( phoneModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

}, undefined, function ( error ) {

    console.error( error );

} );

const loader3 = new GLTFLoader(loadingManager);
loader.load( 'book_stack.glb', function ( gltf ) {
    let bookModel = gltf.scene;
    bookModel.castShadow = true;
    bookModel.scale.set(.2, .2, .2);
    bookModel.position.z= -0.5;
    bookModel.position.y= 0.4-0.28;
    bookModel.position.x= -0.2;
    bookModel.rotation.set(0,5.1,0)
    scene.add( bookModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-book' );

},undefined, function ( error ) {

    console.error( error );

} );



// Camera
camera = new THREE.PerspectiveCamera( 70, sizes.width / sizes.height, 0.01, 10 );
camera.position.z = 1.5;

scene = new THREE.Scene();
// scene.fog = new THREE.Fog( 0x121111, 0.00025, .2 );
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

// Floor
//video texture - see html video in index.html none display property
//Get your video element
const video = document.getElementById("video");
video.onloadeddata = function () {
    video.play();
};
//Create your video texture:
const videoTexture = new THREE.VideoTexture(video);
videoTexture.needsUpdate = true;
const videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    toneMapped: false,
    
});
const circle = new THREE.CircleGeometry(3, 64);
circle.rotateX( - Math.PI / 2 );
circle.rotateY(-Math.PI / 2);
const circleMat = new THREE.Mesh(circle, videoMaterial);
scene.add(circleMat);
// Meshs
//const mesh1 = new THREE.Mesh( box1, material );
//scene.add( mesh1 );
// const mesh2 = new THREE.Mesh( box2, material );
// mesh2.name = "rear tester";
// scene.add( mesh2 );
//const mesh3 = new THREE.Mesh( box3, material );
//scene.add( mesh3 );
const mesh4 = new THREE.Mesh( box4, material );
// needed for event handler
// mesh4.name = 'tester';
// scene.add( mesh4 );

// const meshPlane = new THREE.Mesh (plane, shadowMaterial);
// meshPlane.position.y = -0.2;
// meshPlane.receiveShadow = true;
// meshPlane.transparent = true;
// scene.add(meshPlane)


// Lights
let spotLight = new THREE.SpotLight( 0x7b7b7b, 1 );
                spotLight.angle = 1;
				spotLight.position.set( 0.5, .8, 2 );
				spotLight.position.multiplyScalar( 70 );
                spotLight.pnumbra = 1;
                spotLight.focus = 1;
				scene.add( spotLight );
let spotLight2 = new THREE.SpotLight( 0x7b7b7b, 3 );
                scene.add( spotLight2 );
                spotLight2.angle = .5;
                spotLight2.position.y = 2;
                spotLight2.position.x = -3;
                spotLight2.position.z = -8;
                const spotLightHelper = new THREE.SpotLightHelper( spotLight2 );
                scene.add( spotLightHelper );
const light = new THREE.AmbientLight( 0x8affa7, 0.7 ); // soft white light
scene.add( light );

// Renderer

renderer = new THREE.WebGLRenderer( {antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//renderer.outputEncoding = THREE.sRGBEncoding;
renderer.antialias = true;
renderer.shadowMap.enabled = true

document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 2;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 0.25, 0);

//click control needs mouse x & y set first with normalized coordinate to set the ray
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
function onMouseMove( event ) {
  // calculates mouse position in normalized device coordinate -1 to  +1 for both given the canvas size
  canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
  mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
  
}
function onClick(event) {

    raycaster.setFromCamera(mouse, camera);
    let intersect;
    intersect = raycaster.intersectObjects(scene.children, true);
    if (intersect.length > 0 ) {
        console.log(intersect)
        console.log(mouse.x, mouse.y);
        console.log(intersect[0].object.name);
    if(intersect[0].object.name == "TVSCREEN") {
        //There is a mobile size issue here needs to be resolved
        const textureLoader = new THREE.TextureLoader().load('catpicture.jpg');
        let infoPane = new THREE.PlaneGeometry(0.5,0.5);
        //infoPane.rotateY(- Math.PI / 2);
        infoPane.translate(0,-0.01,.51);
        const infoMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader });
        const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
        //object catchable name
        infoMesh.name = "INFO-TV";
        scene.add(infoMesh);
        blurred = false;
    }
    if(intersect[0].object.name == "PHONEBUTTON"){
        //There is a mobile issue here needs to be resolved 
        let infoPane = new THREE.PlaneGeometry(0.3,0.5);
        infoPane.rotateY(- Math.PI / 2);
        infoPane.translate(0.44,-0.01,0);
        const infoMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        const infoMesh = new THREE.Mesh(infoPane, infoMaterial);
        //object catchable name
        infoMesh.name = "INFO-TV";
        scene.add(infoMesh);
        blurred = false;
    }
    if(intersect[0].object.name == "book_stack_1" || intersect[0].object.name == "book_stack_3" ||
        intersect[0].object.name == "book_stack_2" || intersect[0].object.name == "book_stack_4" || intersect[0].object.name == "book_stack_6" ) {
            //There is a mobile issue here needs to be resolved 
        let infoPane = new THREE.PlaneGeometry(0.3,0.5);
        infoPane.rotateY(0.48);
        infoPane.translate(-0.27,0,-.4);
        const infoMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        const infoMesh = new THREE.Mesh(infoPane, infoMaterial);
        //object catchable name
        infoMesh.name = "INFO-TV";
        scene.add(infoMesh);
        blurred = false;
        }
    // to remove the object - need to make this a function
    if(intersect[0].object.name == "INFO-TV") {
        console.log("removed");
        let selectedObject = scene.getObjectByName("INFO-TV")
        scene.remove(selectedObject);
        blurred = true;
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

    // Update trackball controls
    controls.update();
    // const time = performance.now() / 3000;

    // spotLight2.position.x = Math.cos( time ) * 25;
    // spotLight2.position.z = Math.sin( time ) * 25;
    // console.log(spotLight2.position)
    circle.rotateY(0.0003)
    renderer.render( scene, camera );
    requestAnimationFrame( animate );

}

