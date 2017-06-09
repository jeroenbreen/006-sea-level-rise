function City(app, tile, city) {
    console.log(city);
    this.app = app;
    this.tile = tile;
    this.name = city.name;
    this.size = city.size;
    this.x = city.x;
    this.y = city.y;
    this.create();
}

City.prototype.create = function() {
    var material = new BABYLON.StandardMaterial("material city-" + this.name, this.tile.scene),
        city = BABYLON.MeshBuilder.CreateSphere("city", {diameter: settings.city.size * this.size, diameterX: settings.city.size * this.size}, this.tile.scene),
        color = hexToRgb(settings.city.color);
    material.diffuseColor = new BABYLON.Color3(color[0],color[1],color[2]);
    city.position.z = (-0.5 * settings.tile.size) + this.y;
    city.position.x = (-0.5 * settings.tile.size) + this.x;
    city.material = material;
    console.log(city);
    return city;
};