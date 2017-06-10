function _Controller() {}



// controls

_Controller.prototype.play = function() {
    var self = this;
    this.status.playing = true;
    this.engine.runRenderLoop(function() {
        self.scene.render();
    });
};

_Controller.prototype.stop = function() {
    this.status.playing = false;
    this.engine.stopRenderLoop();
};



_Controller.prototype.delayStop = function(delay) {
    var self = this;
    if (!delay) {
        delay = 1000;
    }
    this.timer = setTimeout(function(){
        self.stop();
    }, delay)
};



// creation

_Controller.prototype.getScene = function() {
    var scene = new BABYLON.Scene(this.engine);
    scene.clearColor = new BABYLON.Color4(0,0,0,0);
    return scene;
};

_Controller.prototype.getCamera = function(x, y, z, vector, attach) {
    var camera = new BABYLON.ArcRotateCamera('Camera', x, y, z, vector, this.scene);
    if (attach) {
        camera.attachControl(this.canvas, false);
    }
    return camera;
};

_Controller.prototype.getLight = function(vector, intensity) {
    var light = new BABYLON.DirectionalLight('ligth 1', vector, this.scene);
    light.intensity = intensity;
    return light;
};

_Controller.prototype.getShadowGenerator = function() {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
};