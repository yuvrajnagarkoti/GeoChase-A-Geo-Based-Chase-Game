const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 64;
const ROWS = 20;
const COLS = 20;
// Use map from raceCourseMap.js
// const map = raceCourseMap;


canvas.width = TILE_SIZE * COLS;
canvas.height = TILE_SIZE * ROWS;
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.style.background = '#6bbf59';

const images = {};
const loadImage = (name, src) => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      images[name] = img;
      resolve();
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      resolve(); // continue even if one fails
    };
  });
};

const loadAssets = async () => {
  const assets = [
    ['grass', 'assets/grass.png'],
    ['house', 'assets/house.png'],
    ['human', 'assets/human.png'],
    ['monster', 'assets/monster.png']
  ];
  await Promise.all(assets.map(([name, src]) => loadImage(name, src)));
  draw(); // Start drawing after all assets load
};

let human = { x: 1, y: 1 };
let monster = { x: COLS - 2, y: ROWS - 2 };

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const tile = map[y][x];
      const px = x * TILE_SIZE;
      const py = y * TILE_SIZE;

      // Draw base tile
      if (tile === 0) {
        ctx.drawImage(images.grass, px, py, TILE_SIZE, TILE_SIZE);
      } else {
        ctx.drawImage(images.house, px, py, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  // Draw characters
  ctx.drawImage(images.human, human.x * TILE_SIZE, human.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  ctx.drawImage(images.monster, monster.x * TILE_SIZE, monster.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
};

const valid = (x, y) =>
  x >= 0 && y >= 0 && x < COLS && y < ROWS && map[y][x] === 0;

const move = (dir) => {
  let dx = 0, dy = 0;
  if (dir === 'up') dy = -1;
  if (dir === 'down') dy = 1;
  if (dir === 'left') dx = -1;
  if (dir === 'right') dx = 1;

  const nx = human.x + dx;
  const ny = human.y + dy;

  if (valid(nx, ny)) {
    human.x = nx;
    human.y = ny;
    draw();
  }
};

const moveMonster = () => {
  const path = findPath(monster, human);
  if (path.length > 1) {
    monster.x = path[1].x;
    monster.y = path[1].y;
  }

  draw();

  if (monster.x === human.x && monster.y === human.y) {
    clearInterval(monsterInterval);
    setTimeout(() => alert("👹 The monster caught you!"), 100);
  }
};

let monsterInterval = setInterval(moveMonster, 400);

const findPath = (start, end) => {
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const prev = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const queue = [{ ...start }];
  visited[start.y][start.x] = true;

  const dirs = [ [1, 0], [-1, 0], [0, 1], [0, -1] ];

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr.x === end.x && curr.y === end.y) break;

    for (let [dx, dy] of dirs) {
      const nx = curr.x + dx, ny = curr.y + dy;
      if (valid(nx, ny) && !visited[ny][nx]) {
        visited[ny][nx] = true;
        prev[ny][nx] = curr;
        queue.push({ x: nx, y: ny });
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr && prev[curr.y][curr.x]) {
    path.unshift(curr);
    curr = prev[curr.y][curr.x];
  }
  if (curr) path.unshift(curr);
  return path;
};

// Load everything
loadAssets();