let mazeRows = 5;
let mazeColumns = 15;
let mazeSpeed = 5;
let maze = null;
let walls = [];
let game= null;
let camera = null;
let segments = [];
let mazeBtn = null;
const startNodeImg = new Image();
startNodeImg.src = './img/node-avatar.png';


function reset(){
  mainCtx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
  maze.timeoutIds.forEach(id=>clearTimeout(id));
  maze = new Maze(mainCanvas,mazeRows,mazeColumns,mazeSpeed);
}


function setRows(value){
    mazeRows = +value;
    reset();
}

function setColumns(value){
    mazeColumns = +value;
    reset();
}

function setSpeed(value){
    mazeSpeed = Number(value);
    reset();
}
