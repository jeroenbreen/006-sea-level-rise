window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas'),
        engine = new BABYLON.Engine(canvas, true),
        camera,
        scene,
        createScene;

    createScene = function () {
        var scene = new BABYLON.Scene(engine),
            light,
            light2,
            water,
            ice,
            shadowGenerator,
            ground,
            settings;

        scene.clearColor = new BABYLON.Color3(255,255,255);
        camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -15), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        light = new BABYLON.DirectionalLight("ligth1", new BABYLON.Vector3(-5, -9, 5), scene);
        light.intensity = 0.8;

        light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(8, -2, 5), scene);
        light2.intensity = 0.3;

        water = BABYLON.Mesh.CreateBox("water", 4, scene);
        water.position.y = 2;
        water.scaling.y = 1;
        water.material = new BABYLON.StandardMaterial("texture1", scene);
        water.material.alpha = 0.8;
        water.material.diffuseColor = new BABYLON.Color3(0.2, 0.5, 0.8);

        ice = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 3, size: 1.1}, scene);
        ice.material = new BABYLON.StandardMaterial("texture1", scene);
        ice.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        ice.position.y = 2.8;
        ice.rotation.x = Math.PI/3.3;
        ice.rotation.y = Math.PI/4;
        ice.rotation.z = Math.PI/4;
        ice.scaling.x = 0.3;
        ice.scaling.y = 0.3;
        ice.material = new BABYLON.StandardMaterial("texture1", scene);
        ice.material.diffuseColor = new BABYLON.Color3(1,1,1);

        shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.getShadowMap().renderList.push(ice);
        shadowGenerator.useBlurVarianceShadowMap = true;
        shadowGenerator.blurScale = 20;

        water.receiveShadows = true;

        // animations
        settings = {
            water: {
                current: 1,
                min: 0,
                max: 1,
                delta: -0.002
            },
            ice: {
                current: 0.3,
                min: 0.3,
                max: 2,
                delta: 0.0034
            }
        };

        scene.registerBeforeRender(function () {
            var y,
                toGround = false;
            settings.water.current += settings.water.delta;
            if (settings.water.current > settings.water.max || settings.water.current < settings.water.min) {
                settings.water.delta *= -1;
            }
            water.scaling.y = settings.water.current;
            water.position.y = 2 * settings.water.current;

            settings.ice.current += settings.ice.delta;
            if (settings.ice.current > settings.ice.max || settings.ice.current < settings.ice.min) {
                settings.ice.delta *= -1;
            }
            y = (4 * water.scaling.y) - 0.8 * ice.scaling.y;
            if (y < (1.1 * ice.scaling.y) / 2) {
                y = (1.1 * ice.scaling.y) / 2;
                toGround = true;
            } else {
                toGround = false;
            }

            ice.position.y = y;
            ice.scaling.x = settings.ice.current;
            ice.scaling.y = settings.ice.current;
            if (!toGround) {
                ice.rotation.z += 0.001;
            }


        });

        scene.afterRender = function() {
            var water = scene.getMeshByName('water');


            var position = new BABYLON.Vector3(-2, water.scaling.y * 2, -2),
                worldMatrix = water.getWorldMatrix(),
                transformMatrix = scene.getTransformMatrix(),
                viewport = scene.activeCamera.viewport,
                coordinates = BABYLON.Vector3.Project(position, worldMatrix, transformMatrix, viewport);
            externalCalls(coordinates, water.scaling.y);
        };

        return scene;
    };

    scene = createScene();




    engine.runRenderLoop(function() {
        scene.render();
    });



});

var waterHeight = null;
function externalCalls(c, text) {
    if (waterHeight === null) {
        waterHeight = $('#water-height');
    }
    waterHeight.css({
        left: c.x * 500 - 40,
        top: c.y * 500 - 20
    }).html(text.toFixed(2))
}