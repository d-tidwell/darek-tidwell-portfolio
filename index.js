import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer, raycaster, mouse, canvasBounds;

const rabbitGroup = new THREE.Group();
const computerGroup = new THREE.Group();
const manGroup = new THREE.Group();
const bookGroup = new THREE.Group();
const spoonGroup = new THREE.Group();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Loading Screen
const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById("progress-bar");
loadingManager.onProgress=function(_url, loaded, total) {
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
    tvModel.rotation.set(0,3.55,0.5);
    computerGroup.add(tvModel);
   

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-tv' );

},undefined, function ( error ) {

    console.error( error );

} );


const loader3 = new GLTFLoader(loadingManager);
loader3.load( 'book_stack.glb', function ( gltf ) {
    let bookModel = gltf.scene;
    bookModel.castShadow = true;
    bookModel.scale.set(0.2, 0.2, 0.2);
    bookModel.position.x= -0.05;
    bookModel.rotation.set(0,5.1,0)
    bookGroup.add( bookModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-book' );

},undefined, function ( error ) {

    console.error( error );

} );
const loader4 = new GLTFLoader(loadingManager);
loader4.load( 'ibm_model_m_keyboard/working.glb', function ( gltf4 ) {
    let kBModel = gltf4.scene;
    kBModel.castShadow = true;
    kBModel.scale.set(1, 1, 1);
    kBModel.position.y=-0.13;
    kBModel.position.z=0.23;
    kBModel.rotation.set(0.3,1.95,-0.3);
    computerGroup.add( kBModel);
  

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-keyboard' );

}, undefined, function ( error ) {

    console.error( error );

} );

const loader5 = new GLTFLoader(loadingManager);
loader5.load( 'bent_spoon/working.glb', function ( gltf4 ) {
    let spoonModel = gltf4.scene;
    spoonModel.castShadow = true;
    spoonModel.scale.set(.3, .3, .3);
    spoonModel.rotation.set(0,5,0)
    spoonGroup.add(spoonModel);
   

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-spoon' );

}, undefined, function ( error ) {

    console.error( error );

} );
const loader6 = new GLTFLoader(loadingManager);
loader6.load( 'white_rabbit/scene.glb', function ( gltf4 ) {
    let rabbitModel = gltf4.scene;
    rabbitModel.castShadow = true;
    rabbitModel.scale.set(1, 1, 1);
    rabbitModel.rotation.set(0,15,0)
    rabbitGroup.add( rabbitModel );


}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-rabbit' );

}, undefined, function ( error ) {

    console.error( error );

} );
const loader7 = new GLTFLoader(loadingManager);
loader7.load( 'freefall/scene.glb', function ( gltf4 ) {
    let manModel = gltf4.scene;
    manModel.castShadow = true;
    manModel.recieveShadow = true;
    manModel.scale.set(0.04, 0.04, 0.04);
    manModel.position.y= 0.25;
    manModel.rotation.set(0,10,0);
    manGroup.add(manModel);
    
    

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-falling-man' );

}, undefined, function ( error ) {

    console.error( error );

} );


// Camera
camera = new THREE.PerspectiveCamera( 70, sizes.width / sizes.height, 0.01, 10 );
camera.position.z = 2;

scene = new THREE.Scene();
//scene.fog = new THREE.Fog(  0x22903d, 0.00025, .00009 );
scene.add(camera);

// Geometry 

// Materials

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
const videoMaterial = new THREE.MeshPhysicalMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    toneMapped: false,
    
});
;

// DOME
const sphereEnv = new THREE.SphereGeometry(3,64,32);
sphereEnv.rotateX(Math.PI/2 +1.5);
sphereEnv.rotateY(Math.PI/2 + 1.5);
const sphereMat = new THREE.Mesh(sphereEnv, videoMaterial);
sphereMat.name = "env";
scene.add(sphereMat);
// Meshs


// Lights
let spotLight = new THREE.SpotLight( 0xBCF1CD, .85 );
                spotLight.castShadow = true;
                spotLight.shadow.mapSize.width = 1024;
				spotLight.shadow.mapSize.height = 1024;
                spotLight.shadow.camera.near = 10;
				spotLight.shadow.camera.far = 200;
                spotLight.shadow.focus = 1;
                spotLight.angle = 1;
				spotLight.position.set( 0.5, .8, 2 );
				spotLight.position.multiplyScalar( 70 );
                spotLight.pnumbra = 1;
                spotLight.focus = 1;
				scene.add( spotLight );
let spotLight2 = new THREE.SpotLight( 0xBCF1CD, .85 );
                spotLight2.castShadow = true;
                spotLight2.angle = .5;
                spotLight2.position.y = 2;
                spotLight2.position.x = -3;
                spotLight2.position.z = -8;
                spotLight2.pnumbra = 1;
                spotLight2.focus = 1;
                scene.add( spotLight2 );

const light = new THREE.AmbientLight( 0xBCF1CD, 0.5); // soft white light
scene.add( light );

// Renderer

renderer = new THREE.WebGLRenderer( {antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.antialias = true;
renderer.shadowMap.enabled = true

document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 2.5;
controls.screenSpacePanning = false;
// controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 0.25, 0);



//click control needs mouse x & y set first with normalized coordinate to set the ray

raycaster = new THREE.Raycaster();

mouse = new THREE.Vector2();
function onMouseMove( event ) {
  // calculates mouse position in normalized device coordinate -1 to  +1 for both given the canvas size
  canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
  mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
  camera.updateProjectionMatrix();
  controls.update();
  
}
function onTouchMove( event ) {
    // calculates mouse position in normalized device coordinate -1 to  +1 for both given the canvas size
    canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
    mouse.x = ( ( event.changedTouches[0].clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
    mouse.y = - ( ( event.changedTouches[0].clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
    camera.updateProjectionMatrix();
    controls.update();
    
  }
function onClick(event) {

    raycaster.setFromCamera(mouse, camera);

    let intersect;
    intersect = raycaster.intersectObjects(scene.children, true);
    console.log(intersect)
    console.log(mouse.x, mouse.y);
    //mobile
    //console.log("HERE",( ( event.changedTouches[0].clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1);
  
    if (intersect.length > 0 ) {
        console.log(intersect[0].object.name);
        
        // to remove the object - need to make this a function
        if(intersect[0].object.name == "INFO-TV" || intersect[0].object.name == "INFO-TRANS") {
            console.log("removed");
            let selectedObject = scene.getObjectByName("INFO-TV");
            let selectedBackground = scene.getObjectByName("INFO-TRANS");
            camera.remove(selectedBackground);
            camera.remove(selectedObject);
            return;
            
        }
        if(intersect[0].object.name.includes("TV_") || intersect[0].object.name[1] =='b') {
            let selectedObject = scene.getObjectByName("INFO-TV");
            let selectedBackground = scene.getObjectByName("INFO-TRANS");
            camera.remove(selectedBackground);
            camera.remove(selectedObject);
            //There is a mobile size issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-projects.png');
            let infoPane = new THREE.PlaneGeometry(0.5,0.8);
            //infoPane.rotateY(- Math.PI / 2);
            //infoPane.translate(0,0.3,0.95);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            camera.add(infoMeshBackground);
            camera.add(infoMesh);
            infoPane.translate(0,0,-0.65);
            
        }
        if(intersect[0].object.name.includes("rabbit")){
            console.log(camera.position.z);
            let selectedObject = scene.getObjectByName("INFO-TV");
            let selectedBackground = scene.getObjectByName("INFO-TRANS");
            camera.remove(selectedBackground);
            camera.remove(selectedObject);
            //There is a mobile issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-contacts.png'); 
            let infoPane = new THREE.PlaneGeometry(0.3,0.5);
            //infoPane.rotateY( Math.PI / 2);
            //infoPane.translate(0.86,0.31,0);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);

            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            camera.add(infoMeshBackground);
            camera.add(infoMesh);
            infoPane.translate(0,0,-0.65);
             //infoMeshBackground.translate(0,0,-0.65);
            
        }
        if(intersect[0].object.name.includes("book")) {
            let selectedObject = scene.getObjectByName("INFO-TV");
            let selectedBackground = scene.getObjectByName("INFO-TRANS");
            camera.remove(selectedBackground);
            camera.remove(selectedObject);
                //There is a mobile issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-resume.png');
            let infoPane = new THREE.PlaneGeometry(0.6,0.90);
            // infoPane.rotateY( Math.PI / 2);
            // infoPane.rotateY(2);
            // infoPane.translate(-0.4,0.55,-.8);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            camera.add(infoMeshBackground);
            camera.add(infoMesh);
            infoPane.translate(0,0.025,-0.65);
    
            }
        if(intersect[0].object.name.includes("Spoon")){
            let selectedObject = scene.getObjectByName("INFO-TV");
            let selectedBackground = scene.getObjectByName("INFO-TRANS");
            camera.remove(selectedBackground);
            camera.remove(selectedObject);
                //There is a mobile issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-skills.png');
            let infoPane = new THREE.PlaneGeometry(0.6,0.90);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            camera.add(infoMeshBackground);
            camera.add(infoMesh);
            infoPane.translate(0,0.025,-0.65);

        }

  }
}
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('touchmove', onTouchMove, false);
window.addEventListener('click', onClick);
window.addEventListener("touchstart", onClick, false);


// window resize
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight); // Update size
camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
camera.updateProjectionMatrix(); // Apply changes
});

// ADDING Handle Groups for orbits
scene.add(rabbitGroup);
scene.add( computerGroup );
scene.add( manGroup );
scene.add( bookGroup );
scene.add( spoonGroup );

function animate() {
    requestAnimationFrame( animate );

    // Update trackball controls
    controls.update();
    const time = performance.now() / 8000;
    const manTime= performance.now() / 800;

    if(rabbitGroup) rabbitGroup.position.x = Math.cos( time ) * 1.25;
    if (rabbitGroup) rabbitGroup.position.z = Math.sin( time ) * 0.6;
    if(rabbitGroup) rabbitGroup.rotateX(0.002);

    if(computerGroup) computerGroup.position.x = -Math.cos( time ) * 1.25;
    if (computerGroup) computerGroup.position.z = -Math.sin( time ) * 0.6;
    if(computerGroup) computerGroup.rotateY(0.002);
    if(computerGroup) computerGroup.rotateZ(-0.002);

    if(bookGroup) bookGroup.position.y = Math.cos( time ) * 0.89;
    if(bookGroup) bookGroup.position.x = Math.cos( time ) * -1.15;
    if(bookGroup) bookGroup.position.z = Math.sin( time ) * 1.0;
    if(bookGroup) bookGroup.rotateY(0.002);

    if(spoonGroup) spoonGroup.position.y = Math.cos( time ) * -0.89;
    if(spoonGroup) spoonGroup.position.x = Math.cos( time ) * 1.15;
    if(spoonGroup) spoonGroup.position.z = Math.sin( time ) * -1.0;
    if(spoonGroup) spoonGroup.rotateY(0.002);
    if(spoonGroup) spoonGroup.rotateZ(-0.002);
    if(spoonGroup) spoonGroup.rotateX(-0.002);

    if(manGroup) manGroup.position.y = Math.cos( manTime ) * 0.05;
    

    // console.log(rabbitGroup.position)
    camera.updateProjectionMatrix();
    sphereEnv.rotateY(0.0006);
    renderer.render( scene, camera );
    

}

animate();


