let round = 0;
let maxRounds = 10;
let locations = [];
let currentLocation = null;
let shape = null;
let marker = null;
let map = null;
let points = 0;

fetch('locations.json')
    .then(response => response.json())
    .then(data => {
        locations = data;
        startGame();
    })
    .catch(error => console.error('Error loading locations: ', error));

function startGame() {
    setRandomLocation();
    updateRound();
    updatePoints();
}

function setRandomLocation() {
    let random = document.getElementById('random');
    random.textContent = `Random Location`;
    console.log("napraih go be deeba");
}

function createShape(coordinates) {
    if (shape) {
        map.removeLayer(shape);
    }
    shape = L.polygon(coordinates, { color: 'transparent' }).addTo(map);
}

function checkGuess() {
    if (!marker) {
        alert('Please place a marker on the map.');
        return;
    }

    const userLatLng = marker.getLatLng();
    const distance = map.distance(userLatLng, shape.getBounds().getCenter());
    const maxDistance = 5000;
    const score = Math.max(0, 5000 - (distance / maxDistance) * 5000);

    points += score;
    updatePoints();

    round++;
    updateRound();

    if (round >= maxRounds) {
        endGame();
    } else {
        setRandomLocation();
    }
}

function updateRound() {
    document.getElementById('rund').textContent = `${round}/${maxRounds}`;
}

function updatePoints() {
    document.getElementById('points').textContent = points.toFixed(0);
}

function endGame() {
    alert(`Game over! Your total score is ${points.toFixed(0)}.`);
}