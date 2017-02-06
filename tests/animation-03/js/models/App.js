function App(canvas) {
    this.canvas = canvas;
    this.engine = null;
    this.status = settings.water;
    this.view = {
        texture: true,
        camera: true
    };

    this.scene = null;
    this.light = null;
    this.camera = null;
    this.tile = null;
    this.land = null;
    this.material = null;
    this.water = null;
    this.shadowGenerator = null;

    this.init();
}



App.prototype.init = function() {
    var self = this;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.getScene();
    this.light = this.getLight();
    this.camera = this.getCamera();
    this.tile = this.getTile();
    this.land = this.getLand();
    this.water = this.getWater();
    this.shadowGenerator = this.getShadowGenerator();

    // this.scene.registerBeforeRender(function () {
    //     self.animate();
    // });
    this.updateWater();
    this.run();
};

App.prototype.run = function() {
    var self = this;
    this.engine.runRenderLoop(function() {
        self.scene.render();
    });
};



// creation

App.prototype.getScene = function() {
    var scene = new BABYLON.Scene(this.engine);
    scene.clearColor = new BABYLON.Color3(255,255,255);
    return scene;
};

App.prototype.getCamera = function() {
    var camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI/2, 0, 12, BABYLON.Vector3.Zero(), this.scene);
    camera.attachControl(this.canvas, false);
    return camera
};

App.prototype.getLight = function() {
    var light = new BABYLON.DirectionalLight('ligth 1', new BABYLON.Vector3(-6, -10, 10), this.scene);
    light.intensity = 1;
    return light;
};

App.prototype.getTile = function() {
    var material = new BABYLON.StandardMaterial("material tile", this.scene),
        tile = BABYLON.Mesh.CreateBox("Tile", settings.water.size, this.scene, true),
        color = hexToRgb(settings.color.tile);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    tile.material = material;
    tile.scaling.y = 0.1;
    tile.position.y = -0.5;
    return tile;
};

App.prototype.getLand = function() {
    var land = BABYLON.Mesh.CreateGroundFromHeightMap(
            'egypt',
            settings.imageData.texture,
            10,
            10,
            500,
            0,
            0.1,
            this.scene,
            true,
            null
        ),
        color = hexToRgb(settings.color.land);
    this.material = new BABYLON.StandardMaterial("material land", this.scene);
    this.material.diffuseTexture = new BABYLON.Texture(settings.imageData.texture, this.scene);
    //material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    //material.wireframe = true;
    //material.diffuseTexture = null;
    //
    land.enableEdgesRendering();
    land.edgesWidth = 4.0;
    land.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    //material.diffuseTexture = a ? null : this.diffuseTexture
    land.material = this.material;
    // land.receiveShadows = true;
    return land;
};


App.prototype.getWater = function() {
    var material = new BABYLON.StandardMaterial("material water", this.scene),
        water = BABYLON.Mesh.CreateBox("Water", settings.water.size, this.scene, true),
        color = hexToRgb(settings.color.water);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    water.material = material;
    return water;
};

App.prototype.getShadowGenerator = function() {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
};




// animation

App.prototype.slide = function(value) {
    this.status.current = (this.status.max - this.status.min) * (value / 100) + this.status.min;
    this.updateWater();
};

App.prototype.animate = function() {
    this.nextFrame();
    this.updateWater();
};

App.prototype.nextFrame = function() {
    this.status.current += this.status.delta;
    if (this.status.current > this.status.max || this.status.current < this.status.min) {
        this.status.delta *= -1;
    }
};


App.prototype.updateWater = function() {
    this.water.scaling.y = this.status.current;
    this.water.position.y = this.water.scaling.y * this.status.size / 2;
};



// styling

App.prototype.toggleCamera = function() {
    this.view.camera = !this.view.camera;
    if (this.view.camera) {
        this.camera.alpha = -Math.PI/2;
        this.camera.beta = 0;
        this.camera.radius = 12;
    } else {
        this.camera.alpha = -Math.PI/2.5;
        this.camera.beta = Math.PI/5;
        this.camera.radius = 17;
    }
};

App.prototype.toggleView = function() {
    this.view.texture = !this.view.texture;
    if (this.view.texture) {
        this.land.material = this.material;

    } else {
        var color = hexToRgb(pickers.land.toString()),
            material = new BABYLON.StandardMaterial("material land", this.scene);
        material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
        this.land.material = material;

    }
};

App.prototype.updateColor = function(type) {
    var color = hexToRgb(pickers[type].toString());
    this[type].material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
};