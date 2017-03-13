function _Controller() {}



// controls

_Controller.prototype.run = function() {
    var self = this;
    this.engine.runRenderLoop(function() {
        self.scene.render();
    });
};

_Controller.prototype.stop = function() {
    this.engine.stopRenderLoop();
};



// creation

_Controller.prototype.getScene = function() {
    var scene = new BABYLON.Scene(this.engine);
    scene.autoClear = false;
    return scene;
};

_Controller.prototype.getCamera = function(x, y, z, vector) {
    return new BABYLON.ArcRotateCamera('Camera', x, y, z, vector, this.scene);
    //camera.attachControl(this.canvas, false);
};

_Controller.prototype.getLight = function(vector) {
    var light = new BABYLON.DirectionalLight('ligth 1', vector, this.scene);
    light.intensity = 1;
    return light;
};

_Controller.prototype.getShadowGenerator = function() {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
};