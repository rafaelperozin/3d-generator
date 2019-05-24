global._babelPolyfill = false;

import * as BABYLON from 'babylonjs';

// var imgGenerator = (function () {
//     var roof = [
//         timber = {
//             y: 0, // size: height
//             x: 0, // size: width
//             z: 0, // size: depth
//             h: 0, // rotation: horizontal
//             v: 0  // rotation: vertical
//         }
//     ]

//     return {
//         // TODO 1. recive values: thickness, slopeLength, roofWidth, sheetLength, sheetWidth
//         // TODO 2. calculate number of timbers
//         // TODO 3. create each timber
//     }
// })();
//constructor(thickness, slopeLength, roofWidth, sheetLength, sheetWidth)
var roofHeight = 2*3;
var roofWidth = 4 * 3;
var glazBarNum = 2;

window.addEventListener('DOMContentLoaded', function () {

    // Get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // Load the 3D engine
    var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

    // CreateScene function that creates and return the scene
    var createScene = function () {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(1, 1, 1);

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", 1 * Math.PI / 4.5, Math.PI / 2.5, 40, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
        // var light3 = new BABYLON.HemisphericLight("light3", new BABYLON.Vector3(3, 3, 0), scene);
        // var light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(0, 3, -3), scene);

        // Materials
        var mat = new BABYLON.StandardMaterial('mat', scene);
        mat.diffuseColor = new BABYLON.Color3(.15, .07, 0);
        // mat.diffuseTexture = new BABYLON.Texture('https://images.all-free-download.com/images/graphiclarge/wood_texture_208389.jpg', scene);


        // Add and manipulate meshes in the scene
        var rafterWidth1 = BABYLON.MeshBuilder.CreateBox("rafterWidth1", { height: (roofWidth+1.5), width: 0.38, depth: 0.38 }, scene);
        rafterWidth1.position = new BABYLON.Vector3(0, 5.6, -((roofHeight)/2));
        rafterWidth1.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafterWidth1.material = mat;

        var rafterWidth2 = BABYLON.MeshBuilder.CreateBox("rafterWidth2", { height: (roofWidth+1.5), width: 0.38, depth: 0.38 }, scene);
        rafterWidth2.position = new BABYLON.Vector3(0, 5.6, ((roofHeight)/2));
        rafterWidth2.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafterWidth2.material = mat;

        var rafterLength1 = BABYLON.MeshBuilder.CreateBox("rafterLength1", { height: (roofHeight+1.5), width: 0.38, depth: 0.38 }, scene);
        rafterLength1.position = new BABYLON.Vector3(-((roofWidth)-((roofWidth)/2)), 5.6, 0);
        rafterLength1.rotation = new BABYLON.Vector3(4.71, 0);
        rafterLength1.material = mat;

        var rafterLength2 = BABYLON.MeshBuilder.CreateBox("rafterLength2", { height: (roofHeight+1.5), width: 0.38, depth: 0.38 }, scene);
        rafterLength2.position = new BABYLON.Vector3(((roofWidth)-((roofWidth)/2)), 5.6, 0);
        rafterLength2.rotation = new BABYLON.Vector3(4.71, 0);
        rafterLength2.material = mat;

        // TODO dinamically create variable names
        // gbo = {};
        // for (var i = 0; i < glazBarNum; i++) {
        //     gbo['glazzingBar' + i]
        //     var gbo['glazzingBar' + i] = BABYLON.MeshBuilder.CreateBox("glazzingBar1", { height: (roofHeight+1.5), width: 0.38, depth: 0.38 }, scene);
        //     gbo['glazzingBar' + i].position = new BABYLON.Vector3(-((roofWidth/glazBarNum)*i), 5.6, 0);
        //     gbo['glazzingBar' + i].rotation = new BABYLON.Vector3(4.71, 0);
        //     gbo['glazzingBar' + i].material = mat;    
        // }

        // var glazzingBar1 = BABYLON.MeshBuilder.CreateBox("glazzingBar1", { height: (roofHeight+1.5), width: 0.38, depth: 0.38 }, scene);
        // glazzingBar1.position = new BABYLON.Vector3(-((roofWidth/glazBarNum)*i), 5.6, 0);
        // glazzingBar1.rotation = new BABYLON.Vector3(4.71, 0);
        // glazzingBar1.material = mat;


        var col1 = BABYLON.MeshBuilder.CreateBox("col1", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col1.position = new BABYLON.Vector3((roofWidth/2), 2.9, -(roofHeight/2));
        col1.material = mat;

        var col2 = BABYLON.MeshBuilder.CreateBox("col2", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col2.position = new BABYLON.Vector3((roofWidth/2), 2.9, (roofHeight/2));
        col2.material = mat;

        var col3 = BABYLON.MeshBuilder.CreateBox("col3", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col3.position = new BABYLON.Vector3(-(roofWidth/2), 2.9, -(roofHeight/2));
        col3.material = mat;

        var col4 = BABYLON.MeshBuilder.CreateBox("col4", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col4.position = new BABYLON.Vector3(-(roofWidth/2), 2.9, (roofHeight/2));
        col4.material = mat;

        // // DRAG AND DROP #####################################################################################
        // // create  a pointer
        // var pointerDragBehavior = new BABYLON.PointerDragBehavior({ dragAxis: new BABYLON.Vector3(1, 0, 0) });

        // // Use drag plane in world space
        // pointerDragBehavior.useObjectOrienationForDragging = false;

        // // Listen to drag events
        // pointerDragBehavior.onDragStartObservable.add((event)=>{
        //     console.log("dragStart");
        //     console.log(event);
        // })
        // pointerDragBehavior.onDragObservable.add((event)=>{
        //     console.log("drag");
        //     console.log(event);
        // })
        // pointerDragBehavior.onDragEndObservable.add((event)=>{
        //     console.log("dragEnd");
        //     console.log(event);
        // })

        // // enable rafter5 to drag and drop
        // rafter5.addBehavior(pointerDragBehavior);
        // // ###################################################################################################

        return scene;

    };
    
    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(function () {
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        engine.resize();
    });

    var timber = new timber(12, 0.38, 0.38, 5, 5.6);
    console.log(timber.x)
    console.log(timber.y)
    console.log(timber.z)
    console.log(timber.h)
    console.log(timber.v)
});