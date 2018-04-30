let houseColor = 0xf45042,
    roofColor = 0xe5dcdc,
    windowColor = 0x000000,
    width = window.innerWidth/2,
    height = window.innerHeight/2,
    matrix = 0,
    camera = 0,
    renderer = 0,
    scene = 0;

function createGenericWireObject(genericObject, desiredColor, xPos, yPos, zPos, scene){
    var geometry = new THREE.EdgesGeometry( genericObject );
    var material = new THREE.LineBasicMaterial( { color: desiredColor } );
    var wireframe = new THREE.LineSegments( geometry, material );
    wireframe.position.y = yPos;
    wireframe.position.x = xPos;
    wireframe.position.z = zPos;
    scene.add(wireframe);
}


function createHouse(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight){

    matrix = new THREE.Matrix4();
    matrix.set(1,0,-1,0,
               0,1,-1,0,
               0,0,1,0,
               0,0,0,1);
    
    renderer === 0 ? initializeRenderer() : null;
    
    scene = new THREE.Scene;

    scene.background = new THREE.Color( 0x00FFFFFF );


    console.log("houseWidth, houseHeight, houseDepth, roofHeight");
    console.log(houseWidth, houseHeight, houseDepth, roofHeight)
    var house = new THREE.CubeGeometry(houseWidth, houseHeight, houseDepth);
    var material = new THREE.MeshLambertMaterial( { color: houseColor, ambient: 0x121212,emissive:0x121212 } );
    material.needsUpdate = true
    //THREE.MeshLambertMaterial({color: 0xff00ff, ambient: 0x121212,emissive:0x121212});
    var cube = new THREE.Mesh(house, material);                   
    scene.add(cube);
    createGenericWireObject(house,0x000000,0,0,0, scene);

    var geometry = new THREE.CylinderGeometry( .5, 1, roofHeight, 4 ,100,false, Math.PI/4);
    var material = new THREE.MeshLambertMaterial( {color: roofColor, ambient: 0x121212,emissive:0x121212} );
    material.needsUpdate = true
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.y = 1;
    scene.add( cylinder );

    createGenericWireObject(geometry,0x000000,0,1,0, scene);

    setLight(color, xPos, yPos, zPos)

    
}

function setLight(color, xPos, yPos, zPos){
    //TODO: PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
    console.log("inside setlight", xPos, yPos, zPos, color)
    color = parseInt ( color.replace("#","0x"), 16 );
    xPos = parseFloat(xPos);
    yPos = parseFloat(yPos);
    zPos = parseFloat(zPos);
    var light = new THREE.PointLight( color );
    light.position.x = xPos;
    light.position.y = yPos;
    light.position.z = zPos;
    if(xPos && yPos && zPos){ //ensure asyc issues dont occur
        scene.add( light );
    }
}

function initializeRenderer(){
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    console.log('test');
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
}

function showTop(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight){
    
    createHouse(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight);

    var x = 80;
    var camera = new THREE.OrthographicCamera( width / - x, width / x, height / x, height / - x, .1, 1000 );

    camera.position.z = 2;
    camera.position.y = 2;
    camera.rotation.x = -90 * Math.PI / 180;

    scene.add(camera);
    renderer.setClearColor(0xEEEEEE);
    renderer.render(scene, camera);
}


function showSide(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight){
    createHouse(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight);
    console.log("test");
    // var house = new THREE.CubeGeometry(.2,.2, .2,.2);
    // var material = new THREE.MeshBasicMaterial( { color: windowColor } );
    // var cube = new THREE.Mesh(house, material);                   
    // scene.add(cube);
    // // (genericObject, desiredColor, xPos, yPos, zPos, scene){



    var geometry = new THREE.CubeGeometry(.2,.2, .2, 100);
    var material = new THREE.MeshBasicMaterial( {color: windowColor} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.y = 1;
    scene.add( cylinder );

    createGenericWireObject(geometry,0x000000,0,1,0, scene);
    //createGenericWireObject(house,0x000000,0,0,3, scene);


    var sideX = 150;
    var camera = new THREE.OrthographicCamera( width / - sideX, width / sideX, height / sideX, height / - sideX, .1, 1000 );

    
    camera.position.z = 2;
    camera.position.x = -10;
    camera.rotation.y = -90 * Math.PI / 180;

    scene.add(camera);
    renderer.setClearColor(0xEEEEEE);
    renderer.render(scene, camera);
}


function showFront(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight){
    createHouse(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight);
    let frontX = 150;
    var camera = new THREE.OrthographicCamera( width / - frontX, width / frontX, height / frontX, height / - frontX, .1, 1000 );

    camera.position.z = 5;    

    scene.add(camera);
    renderer.setClearColor(0xEEEEEE);
    renderer.render(scene, camera);
}

function twoPoint(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight){
    createHouse(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight);
    let frontX = 150;
    var camera = new THREE.OrthographicCamera( width / - frontX, width / frontX, height / frontX, height / - frontX, .1, 1000 );

    camera.position.z = 5;    
    camera.rotation.y = -45 * Math.PI / 180;
    camera.position.x = -5;

    scene.add(camera);
    renderer.setClearColor(0xEEEEEE);
    renderer.render(scene, camera);
}

function threePoint(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight){
    createHouse(color, xPos, yPos, zPos, houseWidth, houseHeight, houseDepth, roofHeight);
    let frontX = 150;
    // var camera = new THREE.OrthographicCamera( width / - frontX, width / frontX, height / frontX, height / - frontX, .1, 1000 );

    // console.log("test inside 3")
    // camera.position.z = 5;
    // camera.position.x = -5;
    // camera.position.y = 0;  
    // camera.rotation.y = -65 * Math.PI / 180 ;

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    camera.position.z = 5;
    camera.position.x = -5;
    camera.position.y = 2.5;    
    camera.rotation.y = -45 * Math.PI / 180 ;
    scene.add(camera);
    renderer.setClearColor(0xEEEEEE);
    renderer.render(scene, camera);
}