const mainEl = document.getElementById('main');
let expBtn = null;
let mainCanvas = null;
let mainCtx = null;
let viewport = null;
const bubbles = [];

function explore(){
  expBtn = document.getElementById('explore'); 
  expBtn.blur();
  expBtn.innerText = 'Skip the Game';
  expBtn.onclick = ()=> {
    sandrisFinish = true;
    exploreProjects();
  }

  //exploreProjects()
  sandrisAnimate();
}


function exploreProjects(){
  expBtn.style.display = 'none';

  mainCanvas = document.createElement('canvas');
  mainCanvas.id = 'mainCanvas';
  mainCtx = mainCanvas.getContext('2d');
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight*0.8;

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
  mainCtx.textAlign = 'center'
  mainCtx.fillText('Double Click to see Project',midX,focusedProject.pos.top-margin-20);
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
}


