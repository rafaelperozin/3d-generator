global._babelPolyfill = false;

import * as BABYLON from 'babylonjs';

var rw = 2;
var rh = 2; // 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
var glazBarNum = 2;
// TODO: fix the inclination

var rightPropostion = 4 / 2;
var currentPropostion = rw / rh;
//var incTilt = 0.015;

var bm = rw;
if (rh > rw) bm = rh;

// put in the correct proportion
var roofHeight = rh * (20 / bm);
var roofWidth = rw * (20 / bm);
console.log(roofHeight)
var stTilt = 4.77; // 2 = 4.83 | 2.5 = 4.81 | 3 = 4.79 | 3.5 = 4.78 | 4 = 4.77 | 4.5 = 4.77 | 5 4.77
//if (currentPropostion < rightPropostion) stTilt -= ((currentPropostion/rightPropostion)*10) * incTilt;

switch (rh) {
    case 2:
        stTilt = 4.88;
        break;
    case 2.5:
        stTilt = 4.81;
        break;
    case 3:
        stTilt = 4.79;
        break;
    case 3.5:
        stTilt = 4.78;
        break;
}

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
        var camera = new BABYLON.ArcRotateCamera("Camera", 1 * Math.PI / 4, Math.PI / 3.5, 50, BABYLON.Vector3.Zero(), scene);
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
        var rafterWidth1 = BABYLON.MeshBuilder.CreateBox("rafterWidth1", { height: (roofWidth+1.5), width: 0.78, depth: 0.78 }, scene);
        rafterWidth1.position = new BABYLON.Vector3(0, 8.8, -((roofHeight)/2));
        rafterWidth1.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafterWidth1.material = mat;

        // var rafterWidthBase1 = BABYLON.MeshBuilder.CreateBox("rafterWidthBase1", { height: (roofWidth+1.5), width: 0.78, depth: 0.78 }, scene);
        // rafterWidthBase1.position = new BABYLON.Vector3(0, 5.6, -((roofHeight)/2));
        // rafterWidthBase1.rotation = new BABYLON.Vector3(4.71, 1.57085);
        // rafterWidthBase1.material = mat;

        var rafterWidth2 = BABYLON.MeshBuilder.CreateBox("rafterWidth2", { height: (roofWidth+1.5), width: 0.78, depth: 0.78 }, scene);
        rafterWidth2.position = new BABYLON.Vector3(0, 5.6, ((roofHeight)/2));
        rafterWidth2.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafterWidth2.material = mat;

        var rafterLength1 = BABYLON.MeshBuilder.CreateBox("rafterLength1", { height: (roofHeight+2.5), width: 0.78, depth: 0.78 }, scene);
        rafterLength1.position = new BABYLON.Vector3(-((roofWidth)-((roofWidth)/2)), 7.8, 0);
        rafterLength1.rotation = new BABYLON.Vector3(stTilt, 0);
        rafterLength1.material = mat;

        var rafterLength2 = BABYLON.MeshBuilder.CreateBox("rafterLength2", { height: (roofHeight+2.5), width: 0.78, depth: 0.78 }, scene);
        rafterLength2.position = new BABYLON.Vector3(((roofWidth)-((roofWidth)/2)), 7.8, 0);
        rafterLength2.rotation = new BABYLON.Vector3(stTilt, 0);
        rafterLength2.material = mat;

        // var rafterLengthBase1 = BABYLON.MeshBuilder.CreateBox("rafterLengthBase1", { height: (roofHeight+1.5), width: 0.78, depth: 0.78 }, scene);
        // rafterLengthBase1.position = new BABYLON.Vector3(-((roofWidth)-((roofWidth)/2)), 5.6, 0);
        // rafterLengthBase1.rotation = new BABYLON.Vector3(4.71, 0);
        // rafterLengthBase1.material = mat;

        // var rafterLengthBase2 = BABYLON.MeshBuilder.CreateBox("rafterLengthBase2", { height: (roofHeight+1.5), width: 0.78, depth: 0.78 }, scene);
        // rafterLengthBase2.position = new BABYLON.Vector3(((roofWidth)-((roofWidth)/2)), 5.6, 0);
        // rafterLengthBase2.rotation = new BABYLON.Vector3(4.71, 0);
        // rafterLengthBase2.material = mat;

        for (var i = 1; i <= glazBarNum; i++) {

            var space = roofWidth / (glazBarNum + 1);
            // rafterLength2 - sapce * number of current glazzing bar
            var glaPos = ((roofWidth)-((roofWidth)/2)) - (space * i);

            window['glazzingBar' + i]
            window['glazzingBar' + i] = BABYLON.MeshBuilder.CreateBox("glazzingBar"+i, { height: (roofHeight+1.5), width: 0.78, depth: 0.78 }, scene);
            window['glazzingBar' + i].position = new BABYLON.Vector3(glaPos, 7.8, 0);
            window['glazzingBar' + i].rotation = new BABYLON.Vector3(stTilt, 0);
            window['glazzingBar' + i].material = mat;    
        }

        // var glazzingBar1 = BABYLON.MeshBuilder.CreateBox("glazzingBar1", { height: (roofHeight+1.5), width: 0.78, depth: 0.78 }, scene);
        // glazzingBar1.position = new BABYLON.Vector3(-((roofWidth/glazBarNum)*i), 5.6, 0);
        // glazzingBar1.rotation = new BABYLON.Vector3(4.71, 0);
        // glazzingBar1.material = mat;


        var col1 = BABYLON.MeshBuilder.CreateBox("col1", { height: 20, width: 0.78, depth: 0.78 }, scene);
        col1.position = new BABYLON.Vector3((roofWidth/2), -1.5, -(roofHeight/2));
        col1.material = mat;

        var col2 = BABYLON.MeshBuilder.CreateBox("col2", { height: 15.2, width: 0.78, depth: 0.78 }, scene);
        col2.position = new BABYLON.Vector3((roofWidth/2), -1.9, (roofHeight/2));
        col2.material = mat;

        var col3 = BABYLON.MeshBuilder.CreateBox("col3", { height: 20, width: 0.78, depth: 0.78 }, scene);
        col3.position = new BABYLON.Vector3(-(roofWidth/2), -1.5, -(roofHeight/2));
        col3.material = mat;

        var col4 = BABYLON.MeshBuilder.CreateBox("col4", { height: 15.2, width: 0.78, depth: 0.78 }, scene);
        col4.position = new BABYLON.Vector3(-(roofWidth/2), -1.9, (roofHeight/2));
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

});