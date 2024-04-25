// sketch.js - purpose and description here
// Author: Marvel McDowell
// Collaborators Chat GPT and Romen Luo 
// Date: 4/23/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#canvasContainer").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#canvasContainer").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#canvasContainer").attribute("rows") | 0;
  numRows = select("#canvasContainer").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);

  reseed();
}

function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

// function generateGrid(numCols, numRows) {
//   let grid = [];
//   for (let i = 0; i < numRows; i++) {
//     let row = [];
//     for (let j = 0; j < numCols; j++) {
//       row.push("_");
//     }
//     grid.push(row);
//   }


//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       if (random() < 0.05) {
//         grid[i][j] = ".";
//       }
//     }
//   }
  
//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       if (random() < 0.01) {
//         grid[i][j] = "/";
//       }
//     }
//   }

//   return grid;
// }


// function drawGrid(grid) {
//   background(128);

//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//       if (grid[i][j] == '_') {
//         placeTile(i, j, floor(random(4)), 3);
//       } else if (grid[i][j] == '.') {
//         placeTile(i, j, floor(random(4)), 10); 
//       } else if (grid[i][j] == '/') {
//         placeTile(i, j, 0, 10); 
//       }
//     }
//   }
// }

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }

  let maxRoomWidth = Math.floor(numCols / 2);
  let maxRoomHeight = Math.floor(numRows / 2);
  let minRoomWidth = 3;
  let minRoomHeight = 3;
  let minRoomsRequired = 6; 
  let attemptLimit = 50;
  let rooms = [];
  let attempts = 0;

  while (rooms.length < minRoomsRequired && attempts < attemptLimit) {
    let roomWidth = Math.floor(random(minRoomWidth, maxRoomWidth));
    let roomHeight = Math.floor(random(minRoomHeight, maxRoomHeight));
    let x = Math.floor(random(0, numCols - roomWidth));
    let y = Math.floor(random(0, numRows - roomHeight));

    let overlap = false;
    for (let room of rooms) {
      if (x < room.x + room.w + 3 && x + roomWidth + 3 > room.x &&
        y < room.y + room.h + 3 && y + roomHeight + 3 > room.y) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      rooms.push({x: x, y: y, w: roomWidth, h: roomHeight});
      for (let i = y; i < y + roomHeight; i++) {
        for (let j = x; j < x + roomWidth; j++) {
          grid[i][j] = '.';
        }
      }
      let numberOfChests = floor(random(1, 5));
      for (let k = 0; k < numberOfChests; k++) {
        let chestX = Math.floor(random(x + 1, x + roomWidth - 1));
        let chestY = Math.floor(random(y + 1, y + roomHeight - 1));
        grid[chestY][chestX] = 'C'; 
      }
    }
    attempts++; 
  }

  for (let i = 0; i < rooms.length - 1; i++) {
    let r1 = rooms[i];
    let r2 = rooms[i + 1];
    let startCol = Math.floor((r1.x + r1.w / 2));
    let startRow = Math.floor((r1.y + r1.h / 2));
    let endCol = Math.floor((r2.x + r2.w / 2));
    let endRow = Math.floor((r2.y + r2.h / 2));

    for (let rowOffset = 0; rowOffset < 1; rowOffset++) {
      for (let j = Math.min(startCol, endCol); j <= Math.max(startCol, endCol); j++) {
        grid[startRow + rowOffset][j] = 'f';
      }
    }
    for (let colOffset = 0; colOffset < 1; colOffset++) {
      for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); i++) {
        grid[i][endCol + colOffset] = 'f';
      }
    }
  }

  return grid;
}

function drawGrid(grid) {
  background(128); 
  
  let tileSize = 16; 
  let mouseGridX = Math.floor(mouseX / tileSize);
  let mouseGridY = Math.floor(mouseY / tileSize);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      switch (grid[i][j]) {
      case '_': 
        placeTile(i, j, floor(random(4)), 10);
        break;
      case 'C': 
        if (i === mouseGridY && j === mouseGridX) {
          placeTile(i, j, 1, 30); 
        } else {
          placeTile(i, j, 4, 30);
        }
        break;
      case 'f': 
        if (random() > 0.6) {
          placeTile(i, j, floor(random(11, 14)), floor(random(21, 24)));
          drawContext(grid, i, j, "_", floor(random(4)), 9);
        } else {
          placeTile(i, j, 0, 9); //grey
          drawContext(grid, i, j, "_", 10, 16);
        }
        placeTile(i, j, floor(random(4)), 9);
        break;
      case '.':
        placeTile(i, j, 0, 16);
        drawContext(grid, i, j, "_", 10, 10);
        if (gridCode(grid, i, j, "_") == 1 && random() > 0.8) {
          placeTile(i, j, floor(random(25, 27)), floor(random(25, 27)));
        }
        break;
      default:
        placeTile(i, j, 0, 10);
        break;
      }
    }
  }
}

function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
    return grid[i][j] === target;
  }
  return false; 
}

function gridCode(grid, i, j, target) {
  let northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0;
  let southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0;
  let eastBit = gridCheck(grid, i, j + 1, target) ? 1 : 0;
  let westBit = gridCheck(grid, i, j - 1, target) ? 1 : 0;
  return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
}

function drawContext(grid, i, j, target, ti, tj) {
  let code = gridCode(grid, i, j, target);
  const tileOffsets = lookup[code];
  if (tileOffsets) {
    const [tiOffset, tjOffset] = tileOffsets;
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }
}

const lookup = [
  [0, 0], // 0000
  [0, -1], // 0001
  [0, 1], // 0010
  [0, 0], // 0011
  [1, 0], // 0100
  [1, -1], // 0101
  [1, 1], // 0110
  [1, 0], // 0111
  [-1, 0], // 1000 
  [-1, -1], // 1001 
  [-1, 1], // 1010
  [-1, 0], // 1011
  [0, 0], // 1100
  [0, -1], // 1101
  [0, 1], // 1110
  [0, 0]  // 1111
];


