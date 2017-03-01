function Tile(app, tileData) {
    this.app = app;
    this.data = tileData;

    this.canvas = null;
    this.engine = null;
    this.scene = null;
    this.light = null;
    this.camera = null;
    this.tile = null;
    this.land = null;
    this.material = null;
    this.water = null;
    this.shadowGenerator = null;

    this.cities = [];

    this.init(tileData);
}



Tile.prototype.init = function(tileData) {
    var self = this;
    this.data.current = this.data.min;
    this.create();
    this.initModel();
};

Tile.prototype.initModel = function() {
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.getScene();
    this.light = this.getLight();
    this.camera = this.getCamera();
    this.tile = this.getTile();
    this.land = this.getLand();
    this.water = this.getWater();
    this.shadowGenerator = this.getShadowGenerator();

    //this.initCities(tileData);
    // this.scene.registerBeforeRender(function () {
    //     self.animate();
    // });
    this.updateWater();
    this.run();
};

Tile.prototype.initCities = function(tileData) {
    for (var i = 0, l = tileData.cities.length; i < l; i++) {
        var city = new City(this.app, this, tileData.cities[i]);
        this.cities.push(city);
    }
};

Tile.prototype.create = function() {
    var tile = $('<div class="tile"></div>'),
        tileHead = $('<div class="tile-head"></div>'),
        title = $('<h2>' + this.data.title + '</h2>'),
        subtitle = $('<h3>' + this.data.subtitle + '</h3>'),
        canvas = $('<canvas class="tile-canvas" id="tile-' + this.data.title.toLowerCase() + '"></canvas>'),
        tileBody = $('<div class="tile-body">' + this.data.text + '</div>');
    tileHead.append(title);
    tileHead.append(subtitle);
    tile.append(tileHead);
    tile.append(canvas);
    tile.append(tileBody);
    $('#tiles').append(tile);
    this.canvas = canvas[0];
};

Tile.prototype.run = function() {
    var self = this;
    this.engine.runRenderLoop(function() {
        self.scene.render();
    });
};



// creation

Tile.prototype.getScene = function() {
    var scene = new BABYLON.Scene(this.engine);
    scene.autoClear = false;
    return scene;
};

Tile.prototype.getCamera = function() {
    var camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI/2, 0, 12, BABYLON.Vector3.Zero(), this.scene);
    camera.attachControl(this.canvas, false);
    return camera
};

Tile.prototype.getLight = function() {
    var light = new BABYLON.DirectionalLight('ligth 1', new BABYLON.Vector3(-6, -10, 10), this.scene);
    light.intensity = 1;
    return light;
};

Tile.prototype.getTile = function() {
    var material = new BABYLON.StandardMaterial("material tile", this.scene),
        tile = BABYLON.Mesh.CreateBox("Tile", settings.tile.size, this.scene, true),
        color = hexToRgb(settings.color.tile);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    material.checkOnlyOnce = true
    tile.material = material;
    tile.scaling.y = 0.1;
    tile.position.y = -0.5;
    return tile;
};

Tile.prototype.getLand = function() {
    var land = BABYLON.Mesh.CreateGroundFromHeightMap(
        'egypt',
        this.data.image.texture,
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
    this.material.diffuseTexture = new BABYLON.Texture(this.data.image.texture, this.scene);
    //material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    //material.wireframe = true;
    //material.diffuseTexture = null;
    //
    land.enableEdgesRendering();
    land.edgesWidth = 4.0;
    land.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    //material.diffuseTexture = a ? null : this.diffuseTexture
    land.material = this.material;
    this.material.checkOnlyOnce = true;
    // land.receiveShadows = true;
    return land;
};


Tile.prototype.getWater = function() {
    var material = new BABYLON.StandardMaterial("material water", this.scene),
        water = BABYLON.Mesh.CreateBox("Water", settings.tile.size, this.scene, true),
        color = hexToRgb(settings.color.water);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    material.checkOnlyOnce = true;
    water.material = material;
    return water;
};

Tile.prototype.getShadowGenerator = function() {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
};




// animation

Tile.prototype.slide = function(value) {
    this.data.current = (this.data.max - this.data.min) * (value / 100) + this.data.min;
    this.updateWater();
};

Tile.prototype.updateWater = function() {
    this.water.scaling.y = this.data.current;
    this.water.position.y = this.water.scaling.y * settings.tile.size / 2;
};



// styling

Tile.prototype.setCamera = function(setting) {
    if (setting) {
        this.camera.alpha = -Math.PI/2;
        this.camera.beta = 0;
        this.camera.radius = 12;
    } else {
        this.camera.alpha = -Math.PI/2.5;
        this.camera.beta = Math.PI/5;
        this.camera.radius = 17;
    }
};

Tile.prototype.setView = function(setting) {
    if (setting) {
        this.land.material = this.material;

    } else {
        var color = hexToRgb(settings.color.land),
            material = new BABYLON.StandardMaterial("material land", this.scene);
        material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
        this.land.material = material;

    }
};

Tile.prototype.setColor = function(type, color) {
    this[type].material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
};


// resize

Tile.prototype.resize = function() {
    $(this.canvas).css('height', $(this.canvas).outerWidth());
};