global._babelPolyfill = false;

import * as BABYLON from 'babylonjs';

var timber = {
   y: '', // size: height
   x: '', // size: width
   z: '', // size: depth
   h: '', // rotation: horizontal
   v: ''  // rotation: vertical
}

class Timber {
    
    //constructor(thickness, slopeLength, roofWidth, sheetLength, sheetWidth) {
    constructor(y, x, z, h, v) {
        this.y = y; // size: height
        this.x = x; // size: width
        this.z = z; // size: depth
        this.h = h; // rotation: horizontal
        this.v = v; // rotation: vertical
    }
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
        var rafter1 = BABYLON.MeshBuilder.CreateBox("rafter1", { height: 12, width: 0.38, depth: 0.38 }, scene);
        rafter1.position = new BABYLON.Vector3(5, 5.6, 0);
        rafter1.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafter1.material = mat;

        var rafter5 = BABYLON.MeshBuilder.CreateBox("rafter5", { height: 12, width: 0.38, depth: 0.38 }, scene);
        rafter5.position = new BABYLON.Vector3(5, 5.6, 3);
        rafter5.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafter5.material = mat;

        var rafter2 = BABYLON.MeshBuilder.CreateBox("rafter2", { height: 12, width: 0.38, depth: 0.38 }, scene);
        rafter2.position = new BABYLON.Vector3(5, 5.6, 6);
        rafter2.rotation = new BABYLON.Vector3(4.71, 1.57085);
        rafter2.material = mat;

        var rafter3 = BABYLON.MeshBuilder.CreateBox("rafter3", { height: 6, width: 0.38, depth: 0.38 }, scene);
        rafter3.position = new BABYLON.Vector3(0, 5.6, 3);
        rafter3.rotation = new BABYLON.Vector3(4.71, 0);
        rafter3.material = mat;

        var rafter4 = BABYLON.MeshBuilder.CreateBox("rafter4", { height: 6, width: 0.38, depth: 0.38 }, scene);
        rafter4.position = new BABYLON.Vector3(10, 5.6, 3);
        rafter4.rotation = new BABYLON.Vector3(4.71, 0);
        rafter4.material = mat;


        var col1 = BABYLON.MeshBuilder.CreateBox("col1", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col1.position = new BABYLON.Vector3(10, 2.9, 0);
        col1.material = mat;

        var col2 = BABYLON.MeshBuilder.CreateBox("col2", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col2.position = new BABYLON.Vector3(10, 2.9, 6);
        col2.material = mat;

        var col3 = BABYLON.MeshBuilder.CreateBox("col3", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col3.position = new BABYLON.Vector3(0, 2.9, 0);
        col3.material = mat;

        var col4 = BABYLON.MeshBuilder.CreateBox("col4", { height: 5, width: 0.38, depth: 0.38 }, scene);
        col4.position = new BABYLON.Vector3(0, 2.9, 6);
        col4.material = mat;

        // DRAG AND DROP #####################################################################################
        // create  a pointer
        var pointerDragBehavior = new BABYLON.PointerDragBehavior({ dragAxis: new BABYLON.Vector3(1, 0, 0) });

        // Use drag plane in world space
        pointerDragBehavior.useObjectOrienationForDragging = false;

        // Listen to drag events
        pointerDragBehavior.onDragStartObservable.add((event)=>{
            console.log("dragStart");
            console.log(event);
        })
        pointerDragBehavior.onDragObservable.add((event)=>{
            console.log("drag");
            console.log(event);
        })
        pointerDragBehavior.onDragEndObservable.add((event)=>{
            console.log("dragEnd");
            console.log(event);
        })

        // enable rafter5 to drag and drop
        rafter5.addBehavior(pointerDragBehavior);
        // ###################################################################################################

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