const text = {
  start:[`My coding journey started`,`in May 2022`],
  tictactoe: [`About a year later I created`, 
              `Tic Tac Toe game where computer`,
              `uses MiniMax algorithm to find `,
              `the best move`],
  proud: [`I was really proud`, ` of this and that`,`motivated me even more`],
  pathfinder: [`The next big`,`achievement for me was`,`this path finding app`],
  maze: [`At this point nothing could stop me 😊`,`I created this Maze generating app`],
  webSites: [`Then I got interested`, `in creating websites`],
  backend: [`I learned NodeJS`, `MySQL and MongoDB`],
  seekdiscomfort1: [`Then I started`, `learning Frontend:`,`ReactJS`],
  seekdiscomfort2: [`And VueJS`],
  avatar:  [`The next "Big Deal"`,`for me was creating`,`this avatar`],
  vacuumCleaner: [`At this point I got interested in`,`Machine Learning (How it works and`
                , `what's the logic behind it)`, `During this time we purchased a`, 
                `robot vacuum cleaner that gave me`, `the idea to create this app`],
  skeletonEditor: [`I got the idea for this app`, `from the game called "QWOP"`,
                  `I wanted to create an ediitor`, `where the user can create the`, 
                  `skeleton and decide which "muscles"`, `to contract or relax to move`,
                  `the skeleton`],
  sandris: [`I saw this new verion`, `of Tetris and it seemed`, `challenging, so I decided to`, 
            `implement one`],
  chess: [`I love playing chess`, `and here is the result.`, `This is an online multiplayer`, 
          `chess game`]
}

const positions = [
  {
    id:'tictactoe',
    pos:{left:2398,top:125,right:3028,bottom:811},
    url: 'https://tic-tac-toe-sand-iota.vercel.app/'
  },
  {
    id:'pathfinder',
    pos:{left:5382,top:296,right:6137,bottom:729},
    url: 'https://pathfinder-one-xi.vercel.app/'
  },
  {
    id:'maze',
    pos:{left:3400,top:1095,right:4550,bottom:1850},
    url: 'https://maze-generator-iota.vercel.app/'
  },
  {
    id:'seekdiscomfort1',
    pos:{left:0,top:1282,right:1825,bottom:2201},
    url: 'https://seekdiscomfort.onrender.com/'
  },
  {
    id:'seekdiscomfort2',
    pos:{left:2500,top:2000,right:4300,bottom:2860},
    url: 'https://seekdiscomfort2.onrender.com/'
  },
  {
    id:'avatar',
    pos:{left:5547,top:2879,right:6172,bottom:3356},
    url: 'https://avatar-iota-three.vercel.app/'
  },
  {
    id:'vacuumCleaner',
    pos:{left:1967,top:3157,right:3785,bottom:3973},
    url: 'https://react-vacuum.vercel.app/'
  },
  {
    id:'skeletonEditor',
    pos:{left:55,top:3802,right:1299,bottom:4536},
    url: 'https://skeleton-editor.vercel.app/'
  },
  {
    id:'sandris',
    pos:{left:2250,top:4429,right:2896,bottom:5238},
    url: 'https://sandris.vercel.app/'
  },
  {
    id:'chess',
    pos:{left:4571,top:4156,right:5160,bottom:4972},
    url: 'https://hdchess.onrender.com/'
  },

]

const ticTacToeImg = new Image();
ticTacToeImg.src = './img/tictactoe.png';

const pathfinderImg = new Image();
pathfinderImg.src = './img/pathfinder.png';

const mazeImg = new Image();
mazeImg.src = './img/maze.png';

const seekDiscomfort1Img = new Image();
seekDiscomfort1Img.src = './img/seekdiscomfort1.png';

const seekdiscomfort2Img = new Image();
seekdiscomfort2Img.src = './img/seekdiscomfort2.png';

const avatarImg = new Image();
avatarImg.src = './img/avatar.png';

const vacuumCleanerImg = new Image();
vacuumCleanerImg.src = './img/vacuumCleaner.png';

const skeletonEditorImg = new Image();
skeletonEditorImg.src = './img/skeletonEditor.png';

const sandrisImg = new Image();
sandrisImg.src = './img/sandris.png';

const chessImg = new Image();
chessImg.src = './img/chess.png';


function drawProjects(ctx){
  //start
  fillTexts(ctx,text.start,350,50);
  const startMidPoint = {x:658,y:63};

  //tic tac toe
  fillTexts(ctx,text.tictactoe,1500,70);
  const tictactoeInPoint = {x:1125,y:109}; 
  drawArrow(ctx,startMidPoint,tictactoeInPoint);
  const tictactoeOutPoint = {x:1872,y:114}; 
  const tictactoeImgInPoint = {x:2400,y:428};
  drawArrow(ctx,tictactoeOutPoint,tictactoeImgInPoint);
  const tictactoeImgOutPoint = {x:3034,y:480};

  ctx.drawImage(ticTacToeImg,2400,127);



  //pathfinder
  fillTexts(ctx,text.proud,3732,250);
  const proudInPoint = {x:3472,y:280};
  drawArrow(ctx,tictactoeImgOutPoint,proudInPoint);
  const proudOutPoint = {x:4012,y:280};

  fillTexts(ctx,text.pathfinder,4612,740);
  const pathfinderInPoint = {x:4404,y:723};
  drawArrow(ctx,proudOutPoint,pathfinderInPoint);
  const pathfinderOutPoint = {x:4796,y:719};

  ctx.drawImage(pathfinderImg,5380,300);
  const pathfinderImgInPoint = {x:5368,y:500};
  drawArrow(ctx,pathfinderOutPoint,pathfinderImgInPoint);
  const pathfinderImgOutPoint = {x:5776,y:735};

  //maze
  fillTexts(ctx,text.maze,5390,1300);
  const mazeInPoint = {x:5400,y:1250};
  drawArrow(ctx,pathfinderImgOutPoint,mazeInPoint);
  const mazeOutPoint = {x:4912,y:1300};
  ctx.drawImage(mazeImg,3400,1100);
  const mazeImgInPoint = {x:4550,y:1400};
  drawArrow(ctx,mazeOutPoint,mazeImgInPoint);
  const mazeImgOutPoint = {x:3400,y:1391};

  //websites
  //frontend
  fillTexts(ctx,text.webSites,2500,1187);
  const webSiteInPoint = {x:2760,y:1200};
  drawArrow(ctx,mazeImgOutPoint,webSiteInPoint);
  const webSiteOutPoint = {x:2244,y:1200};

  //backend
  fillTexts(ctx,text.backend,1576,947);
  const backendInPoint = {x:1786,y:1000};
  drawArrow(ctx,webSiteOutPoint,backendInPoint);
  const backendOutPoint = {x:1365,y:950};

  //seekdiscomfort1
  fillTexts(ctx,text.seekdiscomfort1,390,795);
  const seekdiscomfort1InPoint = {x:612 ,y:841};
  drawArrow(ctx,backendOutPoint,seekdiscomfort1InPoint);
  const seekdiscomfort1OutPoint = {x:376,y:907};
  ctx.drawImage(seekDiscomfort1Img,0,1400);
  const seekdiscomfort1ImgInPoint = {x:416,y:1400};
  drawArrow(ctx,seekdiscomfort1OutPoint,seekdiscomfort1ImgInPoint);
  const seekdiscomfort1ImgOutPoint = {x:1840,y:1859};

  //seekdiscomfort2
  fillTexts(ctx,text.seekdiscomfort2,2300,1750,60);
  const seekdiscomfort2InPoint = {x:2120,y:1730};
  drawArrow(ctx,seekdiscomfort1ImgOutPoint,seekdiscomfort2InPoint);
  const seekdiscomfort2OutPoint = {x:2480,y:1731};
  ctx.drawImage(seekdiscomfort2Img,2500,2000);
  const seekdiscomfort2ImgInPoint = {x:2908,y:2000};
  drawArrow(ctx,seekdiscomfort2OutPoint,seekdiscomfort2ImgInPoint);
  const seekdiscomfort2ImgOutPoint = {x:4300,y:2300};


  //avatar
  fillTexts(ctx,text.avatar,5408,2235);
  const avatarInPoint = {x:5160 ,y:2239};
  drawArrow(ctx,seekdiscomfort2ImgOutPoint,avatarInPoint);
  const avatarOutPoint = {x:5408,y:2347};
  ctx.drawImage(avatarImg,5542,2880);
  const avatarImgInPoint = {x:5828,y:2871};
  drawArrow(ctx,avatarOutPoint,avatarImgInPoint);
  const avatarImgOutPoint = {x:5524,y:3131};


  //vacuum cleaner
  fillTexts(ctx,text.vacuumCleaner,4532,3371);
  const vacuumCleanerInPoint = {x:4952,y:3471};
  drawArrow(ctx,avatarImgOutPoint,vacuumCleanerInPoint);
  const vacuumCleanerOutPoint = {x:4120,y:3483};
  ctx.drawImage(vacuumCleanerImg,1968,3155); 
  const vacuumCleanerImgInPoint = {x:3796,y:3563};
  drawArrow(ctx,vacuumCleanerOutPoint,vacuumCleanerImgInPoint);
  const vacuumCleanerImgOutPoint = {x:1968,y:3455};


  //skeleton editor
  fillTexts(ctx,text.skeletonEditor,1000,2943);
  const skeletonEditorInPoint = {x:1424,y:3143};
  drawArrow(ctx,vacuumCleanerImgOutPoint,skeletonEditorInPoint);
  const skeletonEditorOutPoint = {x:904,y:3249};
  ctx.drawImage(skeletonEditorImg,50,3800); 
  const skeletonEditorImgInPoint = {x:648,y:3795};
  drawArrow(ctx,skeletonEditorOutPoint,skeletonEditorImgInPoint);
  const skeletonEditorImgOutPoint = {x:744,y:4547};


  //sand tetris
  fillTexts(ctx,text.sandris,1348,5067);
  const sandrisInPoint = {x:1088,y:5035};
  drawArrow(ctx,skeletonEditorImgOutPoint,sandrisInPoint);
  const sandrisOutPoint = {x:1656,y:5119};
  ctx.drawImage(sandrisImg,2248,4427); 
  const sandrisImgInPoint = {x:2243,y:4853};
  drawArrow(ctx,sandrisOutPoint,sandrisImgInPoint);
  const sandrisImgOutPoint = {x:2910,y:4822};

  //chess
  fillTexts(ctx,text.chess,3708,4587);
  const chessInPoint = {x:3344,y:4675};
  drawArrow(ctx,sandrisImgOutPoint,chessInPoint);
  const chessOutPoint = {x:4064,y:4675};
  ctx.drawImage(chessImg,4568,4155); 
  const chessImgInPoint = {x:4564,y:4587};
  drawArrow(ctx,chessOutPoint,chessImgInPoint);

}

function fillTexts(ctx,textArr,x,y,font=40){
  ctx.fillStyle = 'white';
  ctx.font = `${font}px Courier New`;
  ctx.textAlign = 'center'
  const lineSpace = 50;
  for(let i = 0;i<textArr.length;i++){
    const text = textArr[i];

    ctx.fillText(text,x,y+lineSpace*i);
  }
}

function drawArrow(ctx, from, to, arrowLength = 30, arrowAngle = Math.PI / 6) {
  ctx.strokeStyle = 'white';
  // Calculate the angle of the line
  const angle = Math.atan2(to.y - from.y, to.x - from.x);

  ctx.lineWidth = 3;
  // Draw the main line (shaft of the arrow)
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x-ctx.lineWidth, to.y);
  ctx.stroke();

  // Calculate the positions for the arrowhead lines
  const arrowX1 = to.x - arrowLength * Math.cos(angle - arrowAngle);
  const arrowY1 = to.y - arrowLength * Math.sin(angle - arrowAngle);

  const arrowX2 = to.x - arrowLength * Math.cos(angle + arrowAngle);
  const arrowY2 = to.y - arrowLength * Math.sin(angle + arrowAngle);

  
  // Draw the arrowhead
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(arrowX1, arrowY1);
  ctx.lineTo(arrowX2, arrowY2);
  ctx.lineTo(to.x, to.y);
  ctx.fill();
}
