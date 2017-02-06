var settings = {
    water: {
        current: 1,
        min: 0,
        max: 1,
        delta: -0.002
    }
};

window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas'),
        engine = new BABYLON.Engine(canvas, true),
        camera,
        scene,
        createScene;

    createScene = function () {
        var thisScene = getScene(engine),
            light = getLight(thisScene),
            water = getWater(thisScene),
            land = getLand(thisScene),
            shadowGenerator = getShadowGenerator(light),
            bumpMaterial = getBumpMaterial(light);
        //land.material = bumpMaterial;
        camera = getCamera(thisScene, canvas);

        // animations
        thisScene.registerBeforeRender(function () {
            var y,
                toGround = false;
            settings.water.current += settings.water.delta;
            if (settings.water.current > settings.water.max || settings.water.current < settings.water.min) {
                settings.water.delta *= -1;
            }
            water.scaling.y = settings.water.current;
            water.position.y = 2 * settings.water.current;
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

function getWater(scene) {
    var water = BABYLON.Mesh.CreateBox("water", 4, scene);
    water.position.y = 2;
    water.scaling.y = 1;
    water.material = new BABYLON.StandardMaterial("texture1", scene);
    water.material.alpha = 0.8;
    water.material.diffuseColor = new BABYLON.Color3(0.2, 0.5, 0.8);
    water.receiveShadows = true;
    return water;
}

function getLand(scene) {
    var land = BABYLON.Mesh.CreateBox("land", 4, scene);
    land.position.x = 6;
    land.scaling.y = 0.1;
    land.receiveShadows = true;
    land.applyDisplacementMap('img/heightmap2.png', 0, 1);
    land.receiveShadows = true;
    return land;
}

function getCamera(scene, canvas) {
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -15), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    return camera
}

function getLight(scene) {
    var light = new BABYLON.DirectionalLight("ligth1", new BABYLON.Vector3(-5, -9, 5), scene);
    light.intensity = 0.8;
    return light;
}

function getShadowGenerator(light) {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
}

function getBumpMaterial(scene) {
    var bumpMaterial = new BABYLON.StandardMaterial("texture1", scene);
    bumpMaterial.specularColor = new BABYLON.Color3(0, 1, 0); // light reflection - 0,0,0, turns it off.
    bumpMaterial.bumpTexture = getBumpTexture(scene);
    return bumpMaterial;
}

function getBumpTexture(scene) {
    var texture = new BABYLON.Texture("img/heightmap2.png", scene);
    texture.level = 100; // the power of the texture
    return texture;
}
