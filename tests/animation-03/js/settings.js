var settings = {
    water: {
        size: 10,
        current: 0,
        min: 0.003,
        max: 0.008,
        delta: 0
    },
    steps: 200,
    imageData: {
        displacement: 'img/heightmap.png',
        texture: 'img/color.png'

    },
    color: {
        land: '#fff',
        water: '#3ad',
        tile: '#000'
    }
};
settings.water.current = settings.water.min;
settings.water.delta = (settings.water.max - settings.water.min) / settings.steps;