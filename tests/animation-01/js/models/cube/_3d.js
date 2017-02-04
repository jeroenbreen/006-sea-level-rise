function _3d() {}

_3d.prototype.project = function(element) {
    var x = element.x,
        y = element.y,
        z = element.z;
    element.pointX = this._projectX(x, y);
    element.pointZ = this._projectY(x, y) * Math.sin(this.camera.y) + z * Math.cos(this.camera.y);
    element.pointY = this._projectY(x, y) * Math.cos(this.camera.y) - z * Math.sin(this.camera.y);
    element.projectedX = this.settings.translate.x + element.pointX * (element.pointZ + 2) * this.settings.scale;
    element.projectedY = this.settings.translate.y + element.pointY * (element.pointZ + 2) * this.settings.scale;
    element.projectedZ = (element.pointZ + 2) / 1.5;
};

_3d.prototype._projectX = function(x, y) {
    return x * Math.cos(this.camera.x) - y * Math.sin(this.camera.x);
};

_3d.prototype._projectY = function(x, y) {
    return x * Math.sin(this.camera.x) + y * Math.cos(this.camera.x);
};
