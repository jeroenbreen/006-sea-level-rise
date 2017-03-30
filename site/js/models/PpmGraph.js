function PpmGraph(canvas) {
    this.canvas = canvas;
    this.settings = {
        displacement: {
            min: 0,
            max: 1
        },
        subdivisions: 20,
        texture: 3
    };
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
    var image = 'img/data/co2/co2-2007-02.jpeg';

    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = this.getScene();
    this.light = this.getLight(new BABYLON.Vector3(-5, 10, 10), 1);
    this.light2 = this.getLight(new BABYLON.Vector3(5, -10, -10), 0.7);
    this.camera = this.getCamera( Math.PI/2, Math.PI/2, 17, BABYLON.Vector3.Zero(), true);

    this.shadowGenerator = this.getShadowGenerator();
    this.earth = this.getEarth();
    this.sphere = this.getSphere();

    // prevent zoom camera
    this.camera.lowerRadiusLimit = this.camera.radius;
    this.camera.upperRadiusLimit = this.camera.radius;

    this.update(image);
    this.run();
};

PpmGraph.prototype.getEarth = function() {
    var sphere = BABYLON.Mesh.CreateSphere("Sphere", this.settings.subdivisions, 10, this.scene, true),
        material = new BABYLON.StandardMaterial("kosh", this.scene);
    material.diffuseTexture = new BABYLON.Texture('img/textures/earth.jpg', this.scene);
    sphere.material = material;
    return sphere;
};

PpmGraph.prototype.getSphere = function() {
    var sphere = BABYLON.Mesh.CreateSphere("Sphere", this.settings.subdivisions, 10, this.scene, true);
    this.material = new BABYLON.StandardMaterial("kosh", this.scene);
    sphere.material = this.material;
    return sphere;
};



// creation

PpmGraph.prototype.update = function(image) {
    switch (this.settings.texture) {
        case 1:
            this.material.diffuseTexture = new BABYLON.Texture(image, this.scene);
            this.material.alpha = 0.8;
            break;
        case 2:
            this.material.wireframe = true;
            break;
        case 3:
            var sphere = this.sphere.clone(),
                material = new BABYLON.StandardMaterial("kosh", this.scene);
            material.diffuseColor = new BABYLON.Color3(1,1,0.5);
            material.alpha = 0.3;
            sphere.material = material;
            this.material.diffuseColor = new BABYLON.Color3(1,1,1);
            this.material.alpha = 0.1;
            this.material.wireframe = true;
            break;
        case 4:
            this.material.diffuseColor = new BABYLON.Color3(1,1,0.5);
            this.material.alpha = 0.5;
            break;
    }


    var self = this,
        onload = function (img) {
            self.getBuffer(img);
        };
    BABYLON.Tools.LoadImage(image, onload, function () {}, this.scene.database);
};



PpmGraph.prototype.getBuffer = function(img) {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        heightMapWidth = img.width,
        heightMapHeight = img.height,
        buffer;
    canvas.width = heightMapWidth;
    canvas.height = heightMapHeight;
    context.save();
    // move the origin to center of canvas
    context.translate(canvas.width/2, canvas.height/2);
    context.scale(1, 1);
    context.drawImage(img, -(img.width/2), -(img.height/2));
    context.restore();
    // Create VertexData from map data
    buffer = context.getImageData(0, 0, heightMapWidth, heightMapHeight).data;
    this.applyDisplacement(buffer, heightMapWidth, heightMapHeight);
};



PpmGraph.prototype.applyDisplacement = function(buffer, heightMapWidth, heightMapHeight) {
    if (!this.sphere.isVerticesDataPresent(BABYLON.VertexBuffer.PositionKind) || !this.sphere.isVerticesDataPresent(BABYLON.VertexBuffer.NormalKind) || !this.sphere.isVerticesDataPresent(BABYLON.VertexBuffer.UVKind)) {
        BABYLON.Tools.Warn("Cannot call applyDisplacementMap: Given mesh is not complete. Position, Normal or UV are missing");
        return;
    }
    var positions = this.sphere.getVerticesData(BABYLON.VertexBuffer.PositionKind),
        normals = this.sphere.getVerticesData(BABYLON.VertexBuffer.NormalKind),
        uvs = this.sphere.getVerticesData(BABYLON.VertexBuffer.UVKind),
        position = BABYLON.Vector3.Zero(),
        normal = BABYLON.Vector3.Zero(),
        uv = BABYLON.Vector2.Zero();
    for (var index = 0, l = positions.length; index < l; index += 3) {
        var gradient = this.colorToDisplacement(position, index, positions, normals, normal, uvs, uv, heightMapWidth, heightMapHeight, buffer);
        normal.normalize();
        normal.scaleInPlace(this.settings.displacement.min + (this.settings.displacement.max - this.settings.displacement.min) * gradient);
        position = position.add(normal);
        position.toArray(positions, index);
    }
    BABYLON.VertexData.ComputeNormals(positions, this.sphere.getIndices(), normals);
    this.sphere.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    this.sphere.updateVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
};

PpmGraph.prototype.colorToDisplacement = function(position, index, positions, normals, normal, uvs, uv, heightMapWidth, heightMapHeight, buffer) {
    BABYLON.Vector3.FromArrayToRef(positions, index, position);
    BABYLON.Vector3.FromArrayToRef(normals, index, normal);
    BABYLON.Vector2.FromArrayToRef(uvs, (index / 3) * 2, uv);
    // Compute height
    var u = ((Math.abs(uv.x) * heightMapWidth) % heightMapWidth) | 0,
        v = ((Math.abs(uv.y) * heightMapHeight) % heightMapHeight) | 0,
        pos = (u + v * heightMapWidth) * 4,
        r = buffer[pos] / 255.0,
        g = buffer[pos + 1] / 255.0,
        b = buffer[pos + 2] / 255.0;
    return r / 3 + g / 3 + b / 3;
};


