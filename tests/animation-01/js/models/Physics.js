function Physics() {
    this.cube = null;
    this.ice = null;
    this.init();
}

Physics.prototype.init = function() {
    var settings = {
        translate: {
            x: 220,
            y: 180
        },
        scale: 130,
        camera: {
        x : 0.5,
        y : 1.0
        }
    }, iceSettings = {
        translate: {
            x: 210,
            y: 180
        },
        scale: 40,
        camera: {
            x : .3,
            y : .4
        }
    };
    this.cube = new Cube(this, $('#physics-cube')[0], settings, 'frame');
    this.ice = new Cube(this, this.cube.elements.hostLayer[0][0], iceSettings, 'ice');
};
