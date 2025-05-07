const cities = [
    { name: 'Yapkashnagar', distance: 60 },
    { name: 'Lihaspur', distance: 50 },
    { name: 'Narmis City', distance: 40 },
    { name: 'Shekharvati', distance: 30 },
    { name: 'Nuravgram', distance: 20 }
];

const vehicles = [
    { type: 'EV Bike', range: 60, count: 2 },
    { type: 'EV Car', range: 100, count: 1 },
    { type: 'EV SUV', range: 120, count: 1 }
];

const cops = [
    { id: 1, name: 'Cop 1' },
    { id: 2, name: 'Cop 2' },
    { id: 3, name: 'Cop 3' }
];

let gameState = {
    fugitiveLocation: null,
    copSelections: [],
    gameStarted: false
};

exports.getCities = (req, res) => res.json(cities);
exports.getVehicles = (req, res) => res.json(vehicles);
exports.getCops = (req, res) => res.json(cops);

exports.startGame = (req, res) => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    gameState = {
        fugitiveLocation: cities[randomIndex],
        copSelections: [],
        gameStarted: true
    };
    res.json({ message: 'Game started', fugitiveLocation: gameState.fugitiveLocation });
};

exports.copSelection = (req, res) => {
    const { copId, city, vehicle } = req.body;
    const selectedCity = cities.find(c => c.name === city);
    if (!selectedCity) return res.status(400).json({ error: 'Invalid city selection' });
    const selectedVehicle = vehicles.find(v => v.type === vehicle);
    if (!selectedVehicle) return res.status(400).json({ error: 'Invalid vehicle selection' });
    if (selectedVehicle.range < selectedCity.distance * 2) {
        return res.status(400).json({ error: 'Selected vehicle does not have enough range for round trip' });
    }
    if (gameState.copSelections.some(selection => selection.city === city)) {
        return res.status(400).json({ error: 'City already selected by another cop' });
    }
    gameState.copSelections.push({ copId, city, vehicle });
    if (gameState.copSelections.length === 3) {
        const result = checkGameResult();
        res.json({ message: 'All selections complete', result });
    } else {
        res.json({ message: 'Selection recorded' });
    }
};

function checkGameResult() {
    const successfulCop = gameState.copSelections.find(selection =>
        selection.city === gameState.fugitiveLocation.name
    );
    return {
        success: !!successfulCop,
        capturingCop: successfulCop ? successfulCop.copId : null,
        fugitiveLocation: gameState.fugitiveLocation
    };
}

exports.getGameResult = (req, res) => {
    const { selections } = req.body;
    if (!gameState.fugitiveLocation) {
        return res.status(400).json({ error: 'Game not started' });
    }
    const fugitiveCity = gameState.fugitiveLocation.name;
    const capturingCop = selections.find(sel => sel.city === fugitiveCity);
    const caught = !!capturingCop;
    res.json({
        caught,
        fugitiveCity,
        selections,
        capturingCopId: capturingCop ? capturingCop.copId : null,
        message: caught ? 'Fugitive caught!' : 'Fugitive escaped!'
    });
};
