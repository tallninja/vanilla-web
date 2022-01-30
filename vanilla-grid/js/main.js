let grid = document.querySelector('#grid');

const GRID_WIDTH = 700;
const GRID_HEIGHT = 500;

grid.style.width = `${GRID_WIDTH}px`;
grid.style.height = `${GRID_HEIGHT}px`;

const PIXEL = 10;
let ROWS = GRID_HEIGHT / PIXEL;
let COLS = GRID_WIDTH / PIXEL;

let pixels = new Map();

let rightNeighbor = ([r, c]) => [r, c + 1];
let leftNeighbor = ([r, c]) => [r, c - 1];
let topNeighbor = ([r, c]) => [r - 1, c];
let bottomNeighbor = ([r, c]) => [r + 1, c];
let topLeftNeighbor = ([r, c]) => [r - 1, c - 1];
let bottomLeftNeighbor = ([r, c]) => [r + 1, c - 1];
let topRightNeighbor = ([r, c]) => [r - 1, c + 1];
let bottomRightNetighbor = ([r, c]) => [r + 1, c + 1];

let neighborsSet = new Set([
  rightNeighbor,
  leftNeighbor,
  topNeighbor,
  bottomNeighbor,
  topLeftNeighbor,
  bottomLeftNeighbor,
  topRightNeighbor,
  bottomRightNetighbor,
]);

let immediateNeighborsSet = new Set();

function createGrid() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let pixel = document.createElement('div');
      pixel.setAttribute('class', 'pixel');
      pixel.style.height = `${PIXEL}px`;
      pixel.style.width = `${PIXEL}px`;
      pixel.style.left = `${j * PIXEL}px`;
      pixel.style.top = `${i * PIXEL}px`;
      pixel.addEventListener('click', (event) => {
        event.preventDefault();
        activateNeighbors(event, [i, j]);
      });
      let position = toKeyString([i, j]);
      pixels.set(position, pixel);
      grid.appendChild(pixel);
    }
  }
}

function activateNeighbors(event, [r, c]) {
  event.target.style.backgroundColor = 'black';
  for (let neighbor of neighborsSet) {
    activateNeighbor(neighbor([r, c]));
  }
}

function activateNeighbor([r, c]) {
  if (isValidNeighbor([r, c])) {
    pixels.get(toKeyString([r, c])).style.backgroundColor = 'black';
  }
}

function isValidNeighbor([r, c]) {
  if (r >= ROWS || c >= COLS) {
    return false;
  }
  if (r < 0 || c < 0) {
    return false;
  }
  return true;
}

function toKeyString([x, y]) {
  return `${x}-${y}`;
}

createGrid();
