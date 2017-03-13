function PpmGraph(canvas) {
    this.canvas = canvas;
    this.engine = null;
    this.scene = null;
    this.light = null;
    this.camera = null;
    this.tile = null;
    this.land = null;
    this.material = null;
    this.shadowGenerator = null;
    this.init();
}

PpmGraph.prototype = Object.create(_Controller.prototype);

PpmGraph.prototype.init = function() {
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.getScene();
    this.light = this.getLight();
    this.camera = this.getCamera( -Math.PI/2.5, Math.PI/5, 17, BABYLON.Vector3.Zero());


    this.shadowGenerator = this.getShadowGenerator();

    this.run();
};




// creation



PpmGraph.prototype.getShadowGenerator = function() {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 20;
    return shadowGenerator;
};



