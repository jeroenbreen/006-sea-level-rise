var settings = {
    water: {
        size: 10,
        current: 0,
        min: 0.003,
        max: 0.008,
        delta: 0
    },
    steps: 200,
    imageData: {
        displacement: 'img/heightmap.png',
        texture: 'img/color.png'

    },
    color: {
        land: '#fff',
        water: '#3ad',
        tile: '#000'
    }
};
settings.water.current = settings.water.min;
settings.water.delta = (settings.water.max - settings.water.min) / settings.steps;

window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas'),
        engine = new BABYLON.Engine(canvas, true),
        scene,
        createScene;

    createScene = function () {

        var thisScene = getScene(engine),
            light = getLight(thisScene),
            camera = getCamera(thisScene, canvas),
            tile = getTile(thisScene),
            land = getLand(thisScene),
            water = getWater(thisScene),
            shadowGenerator = getShadowGenerator(light);

        land.receiveShadows = true;

        // animations
        thisScene.registerBeforeRender(function () {
            animate(water);

        });

        return thisScene;
    };

    scene = createScene();

    engine.runRenderLoop(function() {
        scene.render();
    });



});



function getScene(engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(255,255,255);
    return scene;
}

function getCamera(scene, canvas) {
    var camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI/2, Math.PI / 3, 12, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);
    return camera
}

function getLight(scene) {
    var light = new BABYLON.DirectionalLight('ligth 1', new BABYLON.Vector3(-6, -10, 10), scene);
    light.intensity = 1;
    return light;
}

function getTile(scene) {
    var material = new BABYLON.StandardMaterial("material tile", scene),
        tile = BABYLON.Mesh.CreateBox("Tile", settings.water.size, scene, true),
        color = hexToRgb(settings.color.tile);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    tile.material = material;
    tile.scaling.y = 0.1;
    tile.position.y = -0.5;
    return tile;
}

function getLand(scene) {
    var material = new BABYLON.StandardMaterial("material land", scene),
        land = BABYLON.Mesh.CreateGroundFromHeightMap(
        'egypt',
        settings.imageData.texture,
        10,
        10,
        500,
        0,
        0.1,
        scene,
        true,
        null
    ),
    color = hexToRgb(settings.color.land);
    material.diffuseTexture = new BABYLON.Texture(settings.imageData.texture, scene);
    //material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    //material.wireframe = true;
    //material.diffuseTexture = null;
    //
    // land.enableEdgesRendering();
    // land.edgesWidth = 4.0;
    // land.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    //material.diffuseTexture = a ? null : this.diffuseTexture
    land.material = material;
    return land;
}


function getWater(scene) {
    var material = new BABYLON.StandardMaterial("material water", scene),
        water = BABYLON.Mesh.CreateBox("Water", settings.water.size, scene, true),
        color = hexToRgb(settings.color.water);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    updateMesh(water);
    water.material = material;
    return water;
}

function getShadowGenerator(light) {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
}




// animation

function animate(water) {
    updateWater();
    updateMesh(water);
}

function updateWater() {
    settings.water.current += settings.water.delta;
    if (settings.water.current > settings.water.max || settings.water.current < settings.water.min) {
        settings.water.delta *= -1;
    }
}


function updateMesh(water) {
    water.scaling.y = settings.water.current;
    water.position.y = water.scaling.y * settings.water.size / 2;
}



// helpers

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255] : null;
}
