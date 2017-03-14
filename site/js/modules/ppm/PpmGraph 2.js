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
    this.light = this.getLight(new BABYLON.Vector3(-6, -10, 10));
    this.camera = this.getCamera( -Math.PI/2.5, Math.PI/5, 17, BABYLON.Vector3.Zero(), true);
    this.shadowGenerator = this.getShadowGenerator();
    this.graph = this.getGraph();
    this.run();
};



// creation

PpmGraph.prototype.getGraph = function() {
    var self = this,
        sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 10}, this.scene),
        image = '../../../img/data/co2-2007-02.jpeg',
        material = new BABYLON.StandardMaterial("kosh", this.scene);

        image = 'http://3.bp.blogspot.com/-0ceB5kqwo70/TgF9neqSuKI/AAAAAAAAKCc/cdK47cIp-ZY/s1600/PUMPKIN+CARVINGS+FACE.jpg';

    var applyDisplacementMapFromBuffer = function (buffer, heightMapWidth, heightMapHeight, minHeight, maxHeight) {
        var that = sphere;
        if (!that.isVerticesDataPresent(BABYLON.VertexBuffer.PositionKind) || !that.isVerticesDataPresent(BABYLON.VertexBuffer.NormalKind) || !that.isVerticesDataPresent(BABYLON.VertexBuffer.UVKind)) {
            BABYLON.Tools.Warn("Cannot call applyDisplacementMap: Given mesh is not complete. Position, Normal or UV are missing");
            return;
        }
        var positions = that.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        var normals = that.getVerticesData(BABYLON.VertexBuffer.NormalKind);
        var uvs = that.getVerticesData(BABYLON.VertexBuffer.UVKind);
        var position = BABYLON.Vector3.Zero();
        var normal = BABYLON.Vector3.Zero();
        var uv = BABYLON.Vector2.Zero();
        for (var index = 0; index < positions.length; index += 3) {
            BABYLON.Vector3.FromArrayToRef(positions, index, position);
            BABYLON.Vector3.FromArrayToRef(normals, index, normal);
            BABYLON.Vector2.FromArrayToRef(uvs, (index / 3) * 2, uv);
            // Compute height
            var u = ((Math.abs(uv.x) * heightMapWidth) % heightMapWidth) | 0;
            var v = ((Math.abs(uv.y) * heightMapHeight) % heightMapHeight) | 0;
            var pos = (u + v * heightMapWidth) * 4;
            var r = buffer[pos] / 255.0;
            var g = buffer[pos + 1] / 255.0;
            var b = buffer[pos + 2] / 255.0;
            // var gradient = r * 0.3 + g * 0.59 + b * 0.11;
            var gradient = r * 0.33 + g * 0.33 + b * 0.33;
            normal.normalize();
            normal.scaleInPlace(minHeight + (maxHeight - minHeight) * gradient);
            position = position.add(normal);
            position.toArray(positions, index);
        }
        BABYLON.VertexData.ComputeNormals(positions, that.getIndices(), normals);
        that.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        that.updateVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
    };


    sphere.applyDisplacementMap = function (url, minHeight, maxHeight) {
        var scene = self.scene;
        var onload = function (img) {
            // Getting height map data
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var heightMapWidth = img.width;
            var heightMapHeight = img.height;
            canvas.width = heightMapWidth;
            canvas.height = heightMapHeight;

            context.save();

            // move the origin to center of canvas
            context.translate(canvas.width/2, canvas.height/2);

            // rotate around this point
            // context.rotate(-Math.PI/2);
            context.scale(.4, .7);

            context.drawImage(img, -(img.width/2), -(img.height/2));
            context.restore();

            // Create VertexData from map data
            var buffer = context.getImageData(0, 0, heightMapWidth, heightMapHeight).data;
            applyDisplacementMapFromBuffer(buffer, heightMapWidth, heightMapHeight, minHeight, maxHeight);
        };
        BABYLON.Tools.LoadImage(url, onload, function () {}, scene.database);
    };

    sphere.applyDisplacementMap(image, -.7, 0);

    material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);
    sphere.material = material;
    material.wireframe = true;

    return sphere;
};



