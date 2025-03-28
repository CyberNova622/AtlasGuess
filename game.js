let round = 0;
let maxRounds = 10;
let locations = [];
let usedLocations = new Set();
let currentLocation = null;
let shape = null;
let points = 0;
const maxDistance = 5000;
let currentTyped = null;
let = location_names = [
    "Урал",
    "Западно сибирска низина",
    "Карско море",
    "Средно сибирско плато",
    "острови Северна земя",
    "море Лаптеви",
    "полуостров Таймир",
    "Новосибирски острови",
    "остров Врангел",
    "нос Дежньов",
    "полуостров Чукотка",
    "Берингово море",
    "Охотско море",
    "полуостров Камчатка",
    "остров Сахалин",
    "Курилски острови",
    "Алтай",
    "Западен саян",
    "Източен саян",
    "Каракум",
    "Къзълкум",
    "Тяншан",
    "Памир",
    "Иранска планинска земя",
    "Хиндукуш",
    "Такламакан",
    "Каракорум",
    "Тибетска планинска земя",
    "Кунлунша",
    "Хималаи",
    "Гоби",
    "Голяма китайска равнина",
    "Жълто море",
    "полуостров Корея",
    "Японско море",
    "Японски острови",
    "Източнокитайско море",
    "Южнокитайско море",
    "остров Тайван",
    "Хонконг",
    "Макао",
    "Филипински острови",
    "Филипинско море",
    "полуостров Индокитай",
    "нос Пиай",
    "остров Борнео",
    "остров Ява",
    "остров Сулавеси",
    "остров Шри Ланка",
    "Бенгалски залив",
    "Малдивски острови",
    "полуостров Индостан",
    "плато Декан",
    "Арабско море",
    "Тар",
    "Индо-Гангска низина",
    "Персийски залив",
    "полуостров Арабия",
    "Мъртво море",
    "Месопотамска низина",
    "нос Баба Бурну",
]

let location_coordinates = {
    "Урал": [
        [53, 55],
        [58, 54],
        [63, 56],
        [66, 65],
        [61, 60]
    ],

    "Западно сибирска низина": [
        [57, 63],
        [57, 89],
        [65, 85],
        [65, 64]
    ],
    
    "Карско море": [
        [71, 59],
        [71, 75],
        [73, 71],
        [75, 61]
    ],

    "Средно сибирско плато": [
        [59, 101],
        [61, 117],
        [69, 116],
        [63, 69]
    ],

    "острови Северна земя": [
        [78, 107],
        [80, 98],
        [80, 92],
        [78, 98]
    ],

    "море Лаптеви": [
        [74, 116],
        [71, 130],
        [75, 134],
        [77, 119]
    ],
};

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

function startGame() {
    round = 0;
    points = 0;
    usedLocations.clear();
    updateUI();
    setRandomLocation();
    console.log('Game started!');
}

function setRandomLocation() {
    if (usedLocations.size >= location_names.length) {
        alert('No more unique locations available! Restarting the game.');
        startGame();
        return;
    }

    let randomIndex;
    let attempts = 0;
    do {
        randomIndex = Math.floor(Math.random() * location_names.length);
        attempts++;
        if (attempts > 100) {
            console.error('Failed to find a unique location after 100 attempts.');
            return;
        }
    } while (usedLocations.has(randomIndex));

    usedLocations.add(randomIndex);
    currentLocation = location_names[randomIndex];

    document.getElementById('random').textContent = currentLocation;
}

function checkGuess() {
    if (!marker) {
        alert('Please place a marker on the map.');
        return;
    }

    const markerLatLng = marker.getLatLng();
    const locationCoords = getLocationCoordinates(currentLocation);

    if (!locationCoords) {
        console.error('Invalid location coordinates.');
        return;
    }

    const { east, west, north, south } = locationCoords;
    const shapeBounds = createShape(east, north, west, south);

    if (shapeBounds.contains(markerLatLng)) {
        console.log('Marker is inside the shape!');

        const center = shapeBounds.getCenter();
        const distance = markerLatLng.distanceTo(center);

        const score = distance > maxDistance
            ? 0
            : Math.round(5000 * Math.exp(-distance / maxDistance));

        points += score;
        console.log('Current points:', points);
    } else {
        console.log('Marker LatLng:', markerLatLng.lat, markerLatLng.lng);
        console.log('Shape Bounds:', shapeBounds.getSouthWest(), shapeBounds.getNorthEast());

        console.log('Marker is outside the shape.');
    }

    updateUI();
    round++;

    if (round >= maxRounds) {
        endGame();
    } else {
        setRandomLocation();
    }
}

function updateUI() {
    document.getElementById('rund').textContent = `${round}/${maxRounds}`;
    document.getElementById('points').textContent = `${points.toFixed(0)} points`;
}

function endGame() {
    alert(`Game over! You scored ${points} points.`);
}

function resetMap() {
    map.setView([30, 5], 1.5);

    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }

    markerPlaced = false;

    document.body.style.cursor = 'none';
    cursor.style.display = 'block';
    mapDiv.classList.add('hide-cursor');

    document.addEventListener('mousemove', (e) => {
        if (!markerPlaced) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }
    });
}

function getLocationCoordinates(locationName) {
    const location = location_coordinates.find(loc => loc.name === locationName);

    if (!location) {
        console.error(`Location not found: ${locationName}`);
        return null;
    }

    const { north, south, east, west } = location.coordinates;

    if (!north || !south || !east || !west) {
        console.error('Invalid coordinates found:', { north, south, east, west });
        return null;
    }

    console.log('Coordinates:', { north, south, east, west });
    return { north, south, east, west };
}

function convertDMSToDecimal(dms) {
    const regex = /(\d+)°(\d+)'(\d+\.\d+)"?([NSEW])/;
    const match = regex.exec(dms);

    if (!match) {
        console.error('Invalid DMS format:', dms);
        return null;
    }

    const degrees = parseFloat(match[1]);
    const minutes = parseFloat(match[2]);
    const seconds = parseFloat(match[3]);
    const direction = match[4];

    let decimal = degrees + minutes / 60 + seconds / 3600;

    if (direction === 'S' || direction === 'W') {
        decimal *= -1;
    }

    return decimal;
}

function createShape(east, north, west, south) {
    const eastDecimal = typeof east === 'string' ? convertDMSToDecimal(east) : east;
    const westDecimal = typeof west === 'string' ? convertDMSToDecimal(west) : west;
    const northDecimal = typeof north === 'string' ? convertDMSToDecimal(north) : north;
    const southDecimal = typeof south === 'string' ? convertDMSToDecimal(south) : south;

    if (
        eastDecimal === null || westDecimal === null ||
        northDecimal === null || southDecimal === null
    ) {
        console.error('Failed to create shape due to invalid coordinates.');
        return null;
    }

    const bounds = [
        [southDecimal, westDecimal],
        [northDecimal, eastDecimal],
    ];

    L.rectangle(bounds, {
        color: '#000000',
        weight: 1,
        fillColor: '#000000',
        fillOpacity: 0,
        opacity: 1,
    }).addTo(map);

    return L.latLngBounds(bounds);
}

function continueGame() {
    if (round < maxRounds) {
        round++;
        updateUI();
        setRandomLocation();
        checkGuess();
        resetMap();
    } else {
        endGame();
    }
}
