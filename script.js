const mainEl = document.getElementById('main');

let expBtn = null;
let mainCanvas = null;
let mainCtx = null;
let viewport = null;
let showMaze = false;
const bubbles = [];

function explore(){
  expBtn = document.getElementById('explore'); 
  expBtn.style.display = 'none';
  setTimeout(()=>{
    expBtn.style.display = 'block';
    expBtn.innerText = 'Skip the Game';
  },5500)
  expBtn.onclick = ()=> {
    sandrisFinish = true;
    exploreProjects();
  }
  sandrisAnimate();
}


function exploreProjects(){
  if(platform === 'Desktop'){
    showMaze = false;
    document.getElementById('btnCnt').style.display = 'none';
    expBtn.innerText = "Drive in my project world";
    expBtn.onclick = loadMaze;
  }else{
    expBtn.style.display = 'none';
  }
  
  mainCanvas = document.getElementById('mainCanvas') || document.createElement('canvas');
  mainCanvas.id ? '' : mainCanvas.id='mainCanvas';
  mainCtx = mainCanvas.getContext('2d');
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight*0.8;
  mainCanvas.style.backgroundColor = 'transparent';
  viewport = new Viewport(mainCanvas);

  mainEl.innerHTML = '';
  mainEl.appendChild(mainCanvas);
  mainCanvas.addEventListener('mousemove',handleMouseMove);

  draw();

  activateProjects();// a little trick to activate chess and websites
}


let focusedProject = null;
let prevTime = 0;

function draw(time){
  if(showMaze) return;

  mainCtx.clearRect(0,0,mainCanvas.width,mainCanvas.height);

  const timeDiff = time-prevTime;
  if(timeDiff>3000){
    generateBubbles(3);
    prevTime = time;
  }

  mainCtx.save();
  mainCtx.translate(viewport.center.x,viewport.center.y);
  mainCtx.scale(1/viewport.zoom,1/viewport.zoom);
  const offset = viewport.getOffset();
  mainCtx.translate(offset.x,offset.y);
  drawProjects(mainCtx);

  animateBubbles();

  if(focusedProject){
    highlightProject();
  } 
  mainCtx.restore();

  requestAnimationFrame(draw);
}

function loadMaze(){
  expBtn.innerText = 'Explore the Projects';
  mainCanvas.style.backgroundColor = '#14432e'
  expBtn.onclick = exploreProjects;
  mainCtx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
  const {bottom} = document.querySelector('header').getBoundingClientRect();
  mainCanvas.height = window.innerHeight - bottom-2;
  maze = new Maze(mainCanvas,mazeRows,mazeColumns,mazeSpeed);
  showMaze = true;
  
  document.getElementById('btnCnt').style.display = 'flex';
  
}

function genMaze(){
  maze.generate();
  maze.animate();
  game = new Game();
  game.loop();
}

function isPointInProject(p){
  for(const project of positions){
    if(p.x>=project.pos.left  && 
       p.x<=project.pos.right &&
       p.y>=project.pos.top   &&
       p.y <= project.pos.bottom){
        return project;
    }
  }
  return null;
}

function openProject(pos){
  const project = isPointInProject(pos);
  if(project) window.open(project.url, '_blank').focus();
}

function getFocusedProject(e){
  const {center,zoom,offset,subtract} = viewport;
  const {offsetX,offsetY} = e;
  const mousePos = subtract({x:offsetX,y:offsetY},center);
  const x = Math.floor(mousePos.x*zoom-offset.x);
  const y = Math.floor(mousePos.y*zoom -offset.y);
  const project = isPointInProject({x,y})
  if(project){
    focusedProject = project;
  }else{
    focusedProject = null;
  }
}

function animateBubbles(){
  for(let i = 0;i<bubbles.length;i++){
    const bubble = bubbles[i];
    const disappear = bubble.move();
    bubble.draw(mainCtx);
    if(disappear){
      bubbles.splice(i,1);
      i--;
    }
  }
}

function generateBubbles(n){
  for(let i = 0;i<n;i++){
    const x = Math.random()*mainCanvas.width*viewport.zoom+viewport.offset.x;
    const rad = Math.random()*80+15;

    bubbles.push(new Bubble(x,rad,'white',mainCanvas));
  }
}

function highlightProject(){
  const margin = 5*viewport.zoom;
  const width = focusedProject.pos.right-focusedProject.pos.left;
  const height = focusedProject.pos.bottom-focusedProject.pos.top;
  mainCtx.beginPath();
  mainCtx.rect(focusedProject.pos.left-margin,focusedProject.pos.top-margin,width+2*margin,height+2*margin);
  mainCtx.strokeStyle = 'green';
  mainCtx.lineWidth = 4*viewport.zoom;
  mainCtx.stroke();

  const midX = focusedProject.pos.left+(focusedProject.pos.right-focusedProject.pos.left)/2
  mainCtx.beginPath();
  mainCtx.textAlign = 'center';
  mainCtx.fontSize = '20px';
  mainCtx.fillText('Double Click to see Project',midX,focusedProject.pos.top-margin-30);
}

function handleMouseMove(e){
  const {center,zoom,offset,subtract} = viewport;
  const {offsetX,offsetY} = e;
  const mousePos = subtract({x:offsetX,y:offsetY},center);
  const x = Math.floor(mousePos.x*zoom-offset.x);
  const y = Math.floor(mousePos.y*zoom -offset.y);
  for(const bubble of bubbles){
    const distance = Math.sqrt(Math.pow((bubble.x-x),2)+Math.pow((bubble.y-y),2));
   
    if(distance<=bubble.rad+5){
      bubble.hovered = true;
      setTimeout(()=>{
        bubble.hovered = false;
        bubble.yDelta = Math.random()*-2; 
      },2000);
      if(x<bubble.x && bubble.xDelta < 0) bubble.xDelta *= -1; 
      if(x>bubble.x && bubble.xDelta > 0) bubble.xDelta *= -1; 
      bubble.yDelta = 2; 
      
    }
  }
}

async function activateProjects(){
  await fetch('https://seekdiscomfort-api-com.onrender.com',{mode: 'no-cors'});
  await fetch('https://hdchess.onrender.com/',{mode: 'no-cors'});
}

window.addEventListener('resize', resizeMainCanvas);

function resizeMainCanvas() {
  if(!mainCanvas) return;
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight*0.8;

  if(showMaze){
    loadMaze();
  }
}

function downloadFunc(){
    const anchor=document.createElement('a');
    anchor.setAttribute('href','./resume/resume.pdf');
    anchor.setAttribute('download','');
    document.body.appendChild(anchor);
    anchor.click();
    anchor.parentNode.removeChild(anchor);
  }
