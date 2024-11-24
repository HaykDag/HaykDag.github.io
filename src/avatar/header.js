window.addEventListener('resize', resizeCanvas);
const avatarCanvas = document.getElementById('avatar');
const header = document.getElementById('header');
const avatarCtx = avatarCanvas.getContext('2d');
avatarCanvas.width = window.innerWidth*0.1;
avatarCanvas.height = 50;
const skinTone = 'rgb(232, 190, 172)';
const avatar = new Avatar(skinTone);

let mouseX = 5;
let mouseY = 20;
let mouthX = 1;
let mouthY = 1;
const mouthRange = 10;
let speaking = true;
let mouthMoveDelay = 0;

setTimeout(()=>{
  speaking=false;
  const exploreBtn = document.createElement('button');
  exploreBtn.id = 'explore';
  exploreBtn.textContent = "Let's Go! 🚀";
  exploreBtn.onclick = explore;
  header.appendChild(exploreBtn);
},13000);

resizeCanvas();
function animate(timeStamp){
  avatarCtx.clearRect(0,0,avatarCanvas.width,avatarCanvas.height);
  
  const diff = timeStamp-mouthMoveDelay;
  //mouseMovement
  if(diff>100 && speaking){
    mouthX = Math.random()>0.5 ? -1 * Math.random()*mouthRange : Math.random()*mouthRange;
    mouthY = Math.random()>0.5 ? -1 * Math.random()*mouthRange : Math.random()*mouthRange;;
    mouthMoveDelay = timeStamp;
  }
  
  avatarCtx.save();
  avatarCtx.translate(avatarCanvas.width*0.5,164); 
  avatar.draw(avatarCtx,mouseX,mouseY,mouthX,0);
  avatarCtx.restore();
  requestAnimationFrame(animate); 
}

avatarCanvas.addEventListener('mousemove',(e)=>{
  const {offsetX,offsetY} = e;
  
  mouseX = offsetX -avatarCanvas.width*0.3;
  mouseY = offsetY - 164;
});
document.addEventListener('mousemove',(e)=>{
  if(e.target.id==='avatar') return;
  const {screenX,screenY} = e;
  const rect = avatarCanvas.getBoundingClientRect();
  const {left,right,top} = rect;
  const middle = (left+right)/2;
  
  mouseX = screenX<middle ? 1-avatarCanvas.width*0.3 : 240-avatarCanvas.width*0.3;
  mouseY = screenY - 164 - top - 50;
});

animate();

const typewriterEl = document.getElementById('typewriter');
const typewriter = new Typewriter(typewriterEl,{
  loop:false,
  delay: 50,
});

typewriter
  .pauseFor(350)
  .typeString("<span><strong>Hello, World! 👋</strong></span>")
  .pauseFor(200)
  .typeString("<span>I’m <strong>Hayk</strong>, a self-taught software engineer who thrives on caffeine and curiosity.</span>")
  .pauseFor(200)
  .typeString("<span>Feel free to poke around and check out my projects.</span>")
  .pauseFor(200)
  .typeString("<span>And please don’t feed the bugs!🐛")
  .pauseFor(200)
  .start()
  

function resizeCanvas() {
  const minSize = Math.min(window.innerHeight,window.innerWidth);
  avatarCanvas.width = minSize*0.3;
  avatarCanvas.height = 300;

}