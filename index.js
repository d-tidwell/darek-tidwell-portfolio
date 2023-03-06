import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer, raycaster, mouse, canvasBounds;

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
    tvModel.position.y=0.14;
    tvModel.rotation.set(0,3.55,0)
    scene.add( tvModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-tv' );

},undefined, function ( error ) {

    console.error( error );

} );
// const loader2 = new GLTFLoader(loadingManager);
// loader2.load( 'brick_phone/scene.gltf', function ( gltf2 ) {
//     let phoneModel = gltf2.scene;
//     phoneModel.castShadow = true;
//     phoneModel.scale.set(0.025, 0.025, 0.025);
//     phoneModel.position.x= 0.65;
//     phoneModel.position.y=0.14;
//     phoneModel.rotation.set(0,-4.7,0)
//     scene.add( phoneModel );

// }, function ( xhr ) {

//     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

// }, undefined, function ( error ) {

//     console.error( error );

// } );

const loader3 = new GLTFLoader(loadingManager);
loader.load( 'book_stack.glb', function ( gltf ) {
    let bookModel = gltf.scene;
    bookModel.castShadow = true;
    bookModel.scale.set(.2, .2, .2);
    bookModel.position.z= -0.5;
    bookModel.position.y= 0;
    bookModel.position.x= -0.2;
    bookModel.rotation.set(0,5.1,0)
    scene.add( bookModel );

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
    kBModel.position.x= 0.058;
    kBModel.position.y=0.0;
    kBModel.position.z=0.8;
    kBModel.rotation.set(0,1.95,0)
    scene.add( kBModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

}, undefined, function ( error ) {

    console.error( error );

} );

const loader5 = new GLTFLoader(loadingManager);
loader5.load( 'bent_spoon/working.glb', function ( gltf4 ) {
    let spoonModel = gltf4.scene;
    spoonModel.castShadow = true;
    spoonModel.scale.set(.3, .3, .3);
    spoonModel.position.x= -0.8;
    //spoonModel.rotateY=-3;
    // kBModel.position.z=0.8;
    spoonModel.rotation.set(0,5,0)
    scene.add( spoonModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

}, undefined, function ( error ) {

    console.error( error );

} );
const loader6 = new GLTFLoader(loadingManager);
loader6.load( 'white_rabbit/scene.glb', function ( gltf4 ) {
    let rabbitModel = gltf4.scene;
    rabbitModel.castShadow = true;
    rabbitModel.scale.set(1, 1, 1);
    rabbitModel.position.x= .65;
    // kBModel.position.z=0.8;
    rabbitModel.rotation.set(0,15,0)
    scene.add( rabbitModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

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
    // kBModel.position.z=0.8;
    manModel.rotation.set(0,10,0)
    scene.add( manModel );

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded-phone' );

}, undefined, function ( error ) {

    console.error( error );

} );


// Camera
camera = new THREE.PerspectiveCamera( 70, sizes.width / sizes.height, 0.01, 10 );
camera.position.z = 2;

scene = new THREE.Scene();
 scene.fog = new THREE.Fog(  0x22903d, 0.00025, .00009 );
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



// Materials

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
const videoMaterial = new THREE.MeshPhysicalMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    toneMapped: false,
    
});
;
// const circle = new THREE.CircleGeometry(3, 64);
// circle.rotateX( - Math.PI / 2 );
// circle.rotateY(0);
// const circleMat = new THREE.Mesh(circle, videoMaterial);
// scene.add(circleMat);
// DOME
const sphereEnv = new THREE.SphereGeometry(3,64,32);
sphereEnv.rotateX(Math.PI/2 +1.5);
sphereEnv.rotateY(Math.PI/2 + 1.5);
const sphereMat = new THREE.Mesh(sphereEnv, videoMaterial);
sphereMat.name = "env";
scene.add(sphereMat);
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

// Lights
let spotLight = new THREE.SpotLight( 0xBCF1CD, 1 );
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
let spotLight2 = new THREE.SpotLight( 0xBCF1CD, 1 );
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
// const pointSpoon = new THREE.PointLight(0x7b7b7b, 3, 100 )
// pointSpoon.position.set( -2.2, 0, 0);
// const pointLightHandler = new THREE.PointLightHelper(pointSpoon, 1)
// scene.add(pointSpoon);
// scene.add(pointLightHandler);
// Renderer

renderer = new THREE.WebGLRenderer( {antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//renderer.outputEncoding = THREE.sRGBEncoding;
renderer.antialias = true;
renderer.shadowMap.enabled = true
//renderer.physicallyCorrectLights = true;

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
// raycaster.near =0;
raycaster.far = 2.6;

mouse = new THREE.Vector2();
function onMouseMove( event ) {
  // calculates mouse position in normalized device coordinate -1 to  +1 for both given the canvas size
  canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
  mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
  camera.updateProjectionMatrix();
  controls.update();
  
}
function onClick(event) {

    raycaster.setFromCamera(mouse, camera);

    let intersect;
    intersect = raycaster.intersectObjects(scene.children, true);
    console.log(intersect)
    console.log(mouse.x, mouse.y);
    
    if (intersect.length > 0 ) {
        console.log(intersect[0].object.name);
        
        // to remove the object - need to make this a function
        if(intersect[0].object.name == "INFO-TV" || intersect[0].object.name == "INFO-TRANS") {
            console.log("removed");
            let selectedObject = scene.getObjectByName("INFO-TV");
            let selectedBackground = scene.getObjectByName("INFO-TRANS");
            scene.remove(selectedBackground);
            scene.remove(selectedObject);
            return;
            
        }
        if(intersect[0].object.name == "TVSCREEN" || intersect[0].object.name[0] == "O") {
            //There is a mobile size issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-projects.png');
            let infoPane = new THREE.PlaneGeometry(0.5,0.5);
            //infoPane.rotateY(- Math.PI / 2);
            infoPane.translate(0,0.3,0.95);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            scene.add(infoMeshBackground);
            scene.add(infoMesh);
            
        }
        //if(intersect[0].object.name == "PHONEBUTTON" || intersect[0].object.name == "PHONE_MAIN_LOW")
        if(intersect[0].object.name == "rabbit" || intersect[0].object.name == "rabbit"){
            //There is a mobile issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-contacts.png'); 
            let infoPane = new THREE.PlaneGeometry(0.3,0.5);
            infoPane.rotateY( Math.PI / 2);
            infoPane.translate(0.86,0.31,0);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            scene.add(infoMeshBackground);
            scene.add(infoMesh);
            
        }
        if(intersect[0].object.name == "book_stack_1" || intersect[0].object.name == "book_stack_3" ||
            intersect[0].object.name == "book_stack_2" || intersect[0].object.name == "book_stack_4" || 
            intersect[0].object.name == "book_stack_6") {
                //There is a mobile issue here needs to be resolved
            const textureLoader2 = new THREE.TextureLoader().load('info-tv-projects-trans.png')
            const textureLoader = new THREE.TextureLoader().load('info-tv-resume.png');
            let infoPane = new THREE.PlaneGeometry(0.6,1);
            infoPane.rotateY( Math.PI / 2);
            infoPane.rotateY(2);
            infoPane.translate(-0.4,0.55,-.8);
            const infoMaterial = new THREE.MeshBasicMaterial({map: textureLoader2, side: THREE.DoubleSide, transparent: true, opacity: 0.72});
            const Phongmaterial = new THREE.MeshBasicMaterial({ map: textureLoader, side: THREE.DoubleSide, transparent: true, opacity:1 });
            const infoMeshBackground = new THREE.Mesh(infoPane, infoMaterial)
            const infoMesh = new THREE.Mesh(infoPane, Phongmaterial);
            //object catchable name
            infoMesh.name = "INFO-TV";
            infoMeshBackground.name ="INFO-TRANS";
            scene.add(infoMeshBackground);
            scene.add(infoMesh);
    
            } 

  }
}
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onClick);
window.addEventListener("touchstart", onClick, false);


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
    camera.updateProjectionMatrix();
    sphereEnv.rotateY(0.0006);
    renderer.render( scene, camera );
    requestAnimationFrame( animate );

}

