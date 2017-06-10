function Tile(app, tileData, index, single, parentElement) {
    this.app = app;

    // settings
    this.data = tileData;
    this.index = index;
    this.timer = null;
    this.status = {
        playing: false
    };
    this.view = {
        texture: true,
        camera: false
    };

    // babylon
    this.engine = null;
    this.scene = null;
    this.light = null;
    this.camera = null;
    this.tile = null;
    this.land = null;
    this.material = null;
    this.water = null;
    this.shadowGenerator = null;
    this.single = single;
    this.cities = [];

    // dom
    this.parentElement = parentElement;
    this.element = {
        tileLeft: null,
        status: {
            year: null,
            meters: null
        },
        tools: {
            slider : {
                shortTerm: null,
                longTerm: null
            },
            camera: {
                ortho: null,
                perspective: null
            },
            texture: {
                full: null,
                mono: null
            }
        }
    };
    this.canvas = null;

    // sub modules
    this.slider = null;

    this.init(tileData);
}


Tile.prototype = Object.create(_Controller.prototype);



Tile.prototype.init = function(tileData) {
    this.data.current = this.data.min;
    this.create();
    this.createIndexButton();
    this.addListeners();
    this.initModel();
    this.slider = new Slider(this.app, this);
    this.play();
    this.delayStop();
};

Tile.prototype.initModel = function() {
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.scene = this.getScene();
    this.light = this.getLight(new BABYLON.Vector3(-6, -10, 10), 1.2);
    this.camera = this.getCamera(-Math.PI/2.5, Math.PI/5, 17, BABYLON.Vector3.Zero(), false);
    this.tile = this.getTile();
    this.land = this.getLand();
    this.water = this.getWater();
    this.shadowGenerator = this.getShadowGenerator();

    //this.initCities(tileData);
    // this.scene.registerBeforeRender(function () {
    //     self.animate();
    // });
    this.updateWater();

};

Tile.prototype.initCities = function(tileData) {
    for (var i = 0, l = tileData.cities.length; i < l; i++) {
        var city = new City(this.app, this, tileData.cities[i]);
        this.cities.push(city);
    }
};

Tile.prototype.create = function() {
    var tile, tileRight, canvas, status, statusLocation, statusLabel,
        canvasTools, sliderTools, cameraTools, textureTools, tileHead, location, title,
        tileInfo, tileStory;

    tile = $('<div class="tile" id="tile-' + this.index + '"></div>');
    this.element.tileLeft = $('<div class="tile-left"></div>');
    tileRight = $('<div class="tile-right"></div>');
    status = $('<div class="tile-status"></div>');
    statusLocation = $('<div class="tile-status-location">' + this.data.location + '</div>');
    statusLabel = $('<div class="tile-status-label">Sea Level Rise</div>');
    this.element.status.year = $('<div class="tile-status-year"></div>');
    this.element.status.meters = $('<div class="tile-status-meters"></div>');
    canvas = $('<canvas class="tile-canvas" id="tile-' + this.data.title.toLowerCase() + '"></canvas>');
    canvasTools = $('<div class="tile-canvas-tools"></div>');

    sliderTools = $('<div class="tile-canvas-tools-set"><div class="tile-canvas-tools-set-label">Long-term / Short-term</div></div>');
    this.element.tools.slider.shortTerm = $('<div class="tile-canvas-tool-slider-button tile-canvas-tool-slider-button--active"><div class="tile-canvas-tool-slider-button-icon tile-canvas-tool-slider-button-icon--short"></div><div class="tile-canvas-tool-slider-button-label">Show this Century</div></div>');
    this.element.tools.slider.longTerm = $('<div class="tile-canvas-tool-slider-button"><div class="tile-canvas-tool-slider-button-icon tile-canvas-tool-slider-button-icon--long"></div><div class="tile-canvas-tool-slider-button-label">Show Long-term</div></div>');

    cameraTools = $('<div class="tile-canvas-tools-set"><div class="tile-canvas-tools-set-label">Camera</div></div>');
    this.element.tools.camera.ortho = $('<div class="tile-canvas-tool-icon tile-canvas-tool-icon--ortho"></div>');
    this.element.tools.camera.perspective = $('<div class="tile-canvas-tool-icon tile-canvas-tool-icon--active tile-canvas-tool-icon--perspective"></div>');

    textureTools = $('<div class="tile-canvas-tools-set"><div class="tile-canvas-tools-set-label">Texture</div></div>');
    this.element.tools.texture.full = $('<div class="tile-canvas-tool-icon tile-canvas-tool-icon--active tile-canvas-tool-icon--texture-full"></div>');
    this.element.tools.texture.mono = $('<div class="tile-canvas-tool-icon tile-canvas-tool-icon--texture-mono"></div>');

    tileHead = $('<div class="tile-head"></div>');
    location = $('<h2>' + this.data.location + '</h2>');
    title = $('<h3>' + this.data.title + '</h3>');
    tileInfo = $('<div class="tile-info"></div>');
    tileStory= $('<div class="tile-story">' + this.data.text + '</div>');

    // assembly
    tile.append(this.element.tileLeft).append(tileRight);
    tileHead.append(location).append(title);
    status.append(statusLocation).append(this.element.status.year).append(statusLabel).append(this.element.status.meters);
    this.element.tileLeft.append(canvas).append(canvasTools).append(status);
    canvasTools.append(sliderTools).append(cameraTools).append(textureTools);
    sliderTools.append(this.element.tools.slider.shortTerm).append(this.element.tools.slider.longTerm);

    cameraTools.append(this.element.tools.camera.ortho).append(this.element.tools.camera.perspective);
    textureTools.append(this.element.tools.texture.full).append(this.element.tools.texture.mono);
    tileRight.append(tileHead).append(tileInfo).append(tileStory);



    // finishing
    tile.css('width', this.parentElement.parent().outerWidth());
    this.parentElement.append(tile);
    this.canvas = canvas[0];
};

Tile.prototype.createIndexButton = function() {
    var self = this,
        button = $('<div class="tile-index-button tile-index-button-' + this.index + '">' + this.data.location + '</div>');
    if (this.index === 0) {
        button.addClass('tile-index-button--active');
    }

    button.click(function(){
        self.app.carrousel.slideTo(self.index);
        $('.tile-index-button').each(function(){
            if ($(this).hasClass('tile-index-button-' + self.index)) {
                $(this).addClass('tile-index-button--active');
            } else {
                $(this).removeClass('tile-index-button--active');
            }
        })
    });
    $('#tiles-index-set').append(button);
};

Tile.prototype.addListeners = function() {
    var self = this;

    this.element.tools.slider.shortTerm.click(function(){
        self.slider.setLength('short');
    });
    this.element.tools.slider.longTerm.click(function(){
        self.slider.setLength('long');
    });

    this.element.tools.camera.ortho.click(function(){
        self.setCamera(true);
    });
    this.element.tools.camera.perspective.click(function(){
        self.setCamera(false);
    });

    this.element.tools.texture.full.click(function(){
        self.setTexture(true);
    });
    this.element.tools.texture.mono.click(function(){
        self.setTexture(false);
    });
};


// creation / Babylon

Tile.prototype.getTile = function() {
    var material = new BABYLON.StandardMaterial("material tile", this.scene),
        tile = BABYLON.Mesh.CreateBox("Tile", settings.tile.size, this.scene, true),
        color = hexToRgb(settings.color.tile);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    material.checkOnlyOnce = true;
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




// animation

Tile.prototype.update = function(percentage, year) {
    var meters = this.yearToMeters(year);
    if (!this.status.playing) {
        this.play();
    }
    this.data.current = (this.data.max - this.data.min) * percentage + this.data.min;
    this.updateWater();
    this.delayStop();
    this.element.status.year.html(year);
    this.element.status.meters.html(meters + 'm');
};

Tile.prototype.updateWater = function() {
    this.water.scaling.y = this.data.current;
    this.water.position.y = this.water.scaling.y * settings.tile.size / 2;
};





// resize

Tile.prototype.resize = function() {
    $(this.canvas).css('height', $(this.canvas).outerWidth());
};



// settings

Tile.prototype.setCamera = function(setting) {
    this.view.camera = setting;
    this.play();
    if (this.view.camera) {
        this.element.tools.camera.ortho.addClass('tile-canvas-tool-icon--active');
        this.element.tools.camera.perspective.removeClass('tile-canvas-tool-icon--active');
        this.camera.alpha = -Math.PI/2;
        this.camera.beta = 0;
        this.camera.radius = 12;
    } else {
        this.element.tools.camera.perspective.addClass('tile-canvas-tool-icon--active');
        this.element.tools.camera.ortho.removeClass('tile-canvas-tool-icon--active');
        this.camera.alpha = -Math.PI/2.5;
        this.camera.beta = Math.PI/5;
        this.camera.radius = 17;
    }
    this.delayStop();
};

Tile.prototype.setTexture = function(setting) {
    this.view.texture = setting;
    this.play();
    if (this.view.texture) {
        this.element.tools.texture.full.addClass('tile-canvas-tool-icon--active');
        this.element.tools.texture.mono.removeClass('tile-canvas-tool-icon--active');
        this.land.material = this.material;
    } else {
        this.element.tools.texture.mono.addClass('tile-canvas-tool-icon--active');
        this.element.tools.texture.full.removeClass('tile-canvas-tool-icon--active');
        var color = hexToRgb(settings.color.land),
            material = new BABYLON.StandardMaterial("material land", this.scene);
        material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
        this.land.material = material;
    }
    this.delayStop();
};

Tile.prototype.setColor = function(type, color) {
    this[type].material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
};



// helpers

Tile.prototype.yearToMeters = function(year) {
    var startYear = 1900;
    return (Math.pow((year - startYear), 4.5) / 25000000000).toFixed(2);
};
