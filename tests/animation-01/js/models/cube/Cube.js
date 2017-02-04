function Cube(parent, host, settings, prefix) {
    this.parent = parent;
    this.host = host;
    this.settings = settings;
    this.camera = settings.camera;
    this.prefix = prefix;
    this.elements = {};
    this.corners = [];
    this.backPlanes = [];
    this.frontRibs = [];
    this.backRibs = [];
    this.timer = null;
    this.t = 35;
    this.init();
}

Cube.prototype = Object.create(_3d.prototype);

Cube.prototype.init = function() {
    this.createData();
    this.updateModel();
    this.drawElements();
    this.draw();
};

Cube.prototype.stop = function() {
    clearInterval(this.timer);
};

Cube.prototype.play = function () {
    var self = this;
    this.timer = setInterval(function () {
        //
    }, this.t);
};


Cube.prototype.createData = function() {
    var cube = [
        [-0.5, -0.5, -0.5],
        [-0.5, -0.5, 0.5],
        [0.5, -0.5, 0.5],
        [0.5, -0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [-0.5, 0.5, 0.5],
        [0.5, 0.5, 0.5],
        [0.5, 0.5, -0.5]
    ];
    this.backPlanes = [
        [0, 1, 2, 3], [3, 0, 4, 7], [1, 0, 4, 5], [4, 5, 6, 7], [6, 7, 3, 2]
    ];
    this.backRibs = [
        [0, 1, 2, 3], [3, 0, 4, 7], [1, 0, 4, 5]
    ];
    this.frontRibs = [
        [4, 5, 6, 7], [1, 5, 6, 2], [6, 7, 3, 2]
    ];
    for (var i = 0, l = cube.length; i < l; i++) {
        this.corners.push(
            new Corner(cube[i][0], cube[i][1], cube[i][2])
        );
    }
};

Cube.prototype.updateModel = function() {
    for (var i = 0, l = this.corners.length; i < l; i++) {
        var corner = this.corners[i];
        this.project(corner);
    }
};

Cube.prototype.drawElements = function() {
    this.elements.cubeLayer = d3.select(this.host).append('g').attr({
        transform: function() {
            return 'translate(0, 0)';
        },
        class: this.prefix + '-cube'
    });
    this.elements.backLayer = this.elements.cubeLayer.append('g').attr('class', 'rib-layer');
    this.elements.hostLayer = this.elements.cubeLayer.append('g').attr('class', 'elements-layer');
    this.elements.frontLayer = this.elements.cubeLayer.append('g').attr('class', 'plane-layer');
};


Cube.prototype.draw = function() {
    var self = this;
    // create back ribs
    this.elements.backLayer.selectAll('*').remove();
    this.elements.backLayer.selectAll('.plane').data(this.backPlanes).enter().append('polygon').attr('points', function(d, i) {
        return self.getPlane(i, 'backPlanes');
    }).attr('class', 'plane');
    this.elements.backLayer.selectAll('.rib').data(this.backRibs).enter().append('polygon').attr('points', function(d, i) {
        return self.getPlane(i, 'backRibs');
    }).attr('class', 'rib');
    // create front planes
    this.elements.frontLayer.selectAll('*').remove();
    this.elements.frontLayer.selectAll('.rib').data(this.frontRibs).enter().append('polygon').attr('points', function(d, i) {
        return self.getPlane(i, 'frontRibs');
    }).attr('class', 'rib');
};

Cube.prototype.update = function() {
    var self = this;
    this.updateModel();
    this.elements.backLayer.selectAll('.plane').transition().duration(400).attr('points', function(d,i){
        return self.getPlane(i, 'backPlanes');
    });
    this.elements.backLayer.selectAll('.rib').transition().duration(400).attr('points', function(d,i){
        return self.getPlane(i, 'backRibs');
    });
    this.elements.frontLayer.selectAll('.rib').transition().duration(400).attr('points', function(d,i){
        return self.getPlane(i, 'frontRibs');
    });
};

Cube.prototype.getPlane = function(index, set) {
    var path = '';
    for (var i = 0; i < 4; i++) {
        path += Math.round(this.corners[this[set][index][i]].projectedX) + ',';
        path += Math.round(this.corners[this[set][index][i]].projectedY);
        if ( i < 3) {
            path += ' '
        }
    }
    return path;
};