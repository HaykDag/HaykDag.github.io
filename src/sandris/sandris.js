const sandrisCanvas = document.createElement('canvas');
const sandrisctx = sandrisCanvas.getContext('2d');

const platform = detectDevice();

sandrisCanvas.width = platform === 'Mobile' ? window.innerWidth*0.7 : Math.max(window.innerWidth*0.20,300);
sandrisCanvas.height = platform === 'Mobile' ? window.innerHeight*0.3 : window.innerHeight*0.45;

const squareSize = 16;
const sandSize = 4;

const sandAudio = document.createElement('audio');
sandAudio.src = './src/sandris/audio/sand-audio.mp3';
const levelAudio = document.createElement('audio');
levelAudio.src = './src/sandris/audio/level-up.mp3';
const lineConntected = document.createElement('audio');
lineConntected.src = './src/sandris/audio/line-connect.mp3';


let playground = null;

let lastTime = 0;
let sandrisFinish = false;
let info = false;

function sandrisAnimate(time){

  if(!info){
    const sandrisCnt = document.getElementById('sandrisCnt');
    sandrisCnt.style.display = 'flex';
    const sandrisInfo = document.createElement('span');
    sandrisInfo.textContent = `Get at least 1 point to move ahead. Sorry, there is no way around that`;
    sandrisCanvas.height = getHeight();
    playground = new Playground(sandrisCanvas);
    sandrisCnt.appendChild(sandrisInfo);
    sandrisCnt.appendChild(sandrisCanvas);
    info = true;
  }

  if(!sandrisFinish && time - lastTime>70){
    playground.update();
    lastTime = time;
  }
  requestAnimationFrame(sandrisAnimate);
}

let fallSpeed = 1;
let downStep = 10;
let sideStep = 4+fallSpeed;
let colide = false;


function getHeight(){
  const headerRect = document.getElementById('header').getBoundingClientRect();
  const height = window.innerHeight - headerRect.bottom - 80;
  return height;
}


