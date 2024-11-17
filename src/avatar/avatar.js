class Avatar{
  constructor(skinTone){
    this.skinTone = skinTone;

    this.particles = [
        new Particle([-23,125],true),
        new Particle([-23,175]),
        new Particle([23,125],true),
        new Particle([23,165])
      ]
    this.segments = [
      new Segment(this.particles[0],this.particles[1]),
      new Segment(this.particles[2],this.particles[3]),
    ]
  }
  #drawParticles(ctx,offsetX){
    this.segments[0].draw(ctx);
    this.segments[0].update();
    this.segments[1].draw(ctx);
    this.segments[1].update();
    for(let i = 0;i<this.particles.length;i++){
      this.particles[i].update(offsetX);
      this.particles[i].draw(ctx);
    }
  }
  draw(ctx,offsetX,offsetY,mouthX,mouthY){
    this.#drawHoodiesBackPart(ctx,offsetX);
    this.#drawShirt(ctx,offsetX);
    this.#drawBody(ctx,offsetX);
    this.#drawHoodie(ctx,offsetX);
    this.#drawEars(ctx,offsetX);
    this.#drawNeck(ctx,offsetX);
    this.#drawFace(ctx,offsetX,offsetY);
    this.#drawEyes(ctx,offsetX,offsetY);
    this.#drawEyebrows(ctx,offsetX);
    this.#drawNose(ctx,offsetX);
    this.#drawMouth(ctx,offsetX,offsetY,mouthX,mouthY);
    this.#drawHair(ctx,offsetX);
    this.#drawParticles(ctx,offsetX);
    
    
  }
  #drawBody(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.03);
    //right side
    ctx.beginPath();
    ctx.moveTo(0-offsetX,132);
    ctx.lineTo(25-offsetX,132);
    ctx.lineTo(73-offsetX,103);
    ctx.quadraticCurveTo(100-offsetX,111,106-offsetX,132);
    ctx.quadraticCurveTo(117-offsetX,157,120-offsetX,182);
    ctx.lineTo(125-offsetX,233);
    ctx.lineTo(0-offsetX,233);
    ctx.fillStyle = 'rgb(98,111,75)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(90-offsetX,111);
    ctx.quadraticCurveTo(81-offsetX,136,71-offsetX,157);
    ctx.strokeStyle = 'rgb(5,15,10)';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(71-offsetX,157);
    ctx.quadraticCurveTo(66-offsetX,169,68-offsetX,182);
    ctx.lineTo(72-offsetX,233);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(5,15,10,0.7)';
    ctx.stroke();

    //left side
    ctx.beginPath();
    ctx.moveTo(1-offsetX,132);
    ctx.lineTo(-20-offsetX,132);
    ctx.lineTo(-73-offsetX,103);
    ctx.quadraticCurveTo(-100-offsetX,111,-108-offsetX,132);
    ctx.quadraticCurveTo(-120-offsetX,157,-120-offsetX,182);
    ctx.lineTo(-125-offsetX,233);
    ctx.lineTo(1-offsetX,233);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(98,111,75)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-90-offsetX,111);
    ctx.quadraticCurveTo(-81-offsetX,136,-71-offsetX,157);
    ctx.strokeStyle = 'rgb(5,15,10)';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-71-offsetX,157);
    ctx.quadraticCurveTo(-66-offsetX,169,-68-offsetX,182);
    ctx.lineTo(-72-offsetX,233);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(5,15,10,0.7)';
    ctx.stroke();
  }
  #drawHoodie(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.03);
  
    //right part
    ctx.beginPath();
    ctx.moveTo(17-offsetX,52);
    ctx.quadraticCurveTo(54-offsetX,47,64-offsetX,55);
    ctx.quadraticCurveTo(65-offsetX,63,55-offsetX,74);
    ctx.lineTo(15-offsetX,119);
    ctx.quadraticCurveTo(8-offsetX,124,6-offsetX,132);
    ctx.quadraticCurveTo(4-offsetX,140,17-offsetX,138);
    ctx.lineTo(75-offsetX,103);
    ctx.lineTo(85-offsetX,94);
    ctx.quadraticCurveTo(92-offsetX,89,86-offsetX,81);
    ctx.lineTo(73-offsetX,55);
    ctx.quadraticCurveTo(68-offsetX,47,50-offsetX,41);
    ctx.quadraticCurveTo(38-offsetX,36,17-offsetX,42);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(90,105,70)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(98,111,75)';
    ctx.fill()
  
    //left part
    ctx.beginPath();
    ctx.moveTo(-17-offsetX,52);
    ctx.quadraticCurveTo(-50-offsetX,47,-62-offsetX,55);
    ctx.quadraticCurveTo(-65-offsetX,60,-55-offsetX,72);
    ctx.lineTo(-15-offsetX,117);
    ctx.quadraticCurveTo(-8-offsetX,122,-4-offsetX,130);
    ctx.quadraticCurveTo(0-offsetX,140,-12-offsetX,138);
    ctx.lineTo(-75-offsetX,103);
    ctx.lineTo(-85-offsetX,94);
    ctx.quadraticCurveTo(-92-offsetX,89,-86-offsetX,81);
    ctx.lineTo(-73-offsetX,55);
    ctx.quadraticCurveTo(-68-offsetX,47,-50-offsetX,41);
    ctx.quadraticCurveTo(-38-offsetX,36,-17-offsetX,42);
    ctx.strokeStyle = 'rgb(90,105,70)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(98,111,75)';
    ctx.fill()
  
  }
  #drawHoodiesBackPart(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.03);
    ctx.beginPath();
    ctx.moveTo(45-offsetX,91);
    ctx.lineTo(-45-offsetX,91);
    ctx.quadraticCurveTo(-65-offsetX,78,-65-offsetX,57);  
    ctx.quadraticCurveTo(-63-offsetX,52,-54-offsetX,49);
    ctx.lineTo(54-offsetX,49);
    ctx.quadraticCurveTo(63-offsetX,52,65-offsetX,57);
    ctx.quadraticCurveTo(65-offsetX,78,45-offsetX,91);
    ctx.lineTo(45-offsetX,91);
    ctx.fillStyle = 'rgb(43,44,39)';
    ctx.fill()
  }
  #drawShirt(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.05);
  
    ctx.beginPath();
    ctx.moveTo(28-offsetX,82);
    ctx.quadraticCurveTo(0-offsetX,95,-28-offsetX,82);
    ctx.quadraticCurveTo(-31-offsetX,90,-45-offsetX,91);
    ctx.quadraticCurveTo(-38-offsetX,109,-15-offsetX,132);
    ctx.lineTo(15-offsetX,132);
    ctx.quadraticCurveTo(38-offsetX,107,45-offsetX,91);
    ctx.quadraticCurveTo(31-offsetX,90,28-offsetX,82);
   
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fill()
  
  
    ctx.beginPath();
    ctx.moveTo(-35-offsetX,88);
    ctx.quadraticCurveTo(0-offsetX,110,35-offsetX,88);
    ctx.strokeStyle = 'teal';
    ctx.stroke();
  }
  #drawNeck(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.05);
  
    ctx.beginPath();
    ctx.moveTo(24-offsetX,43,);
    ctx.lineTo(24-offsetX,70)
    ctx.quadraticCurveTo(23-offsetX,78,26-offsetX,82);
    ctx.quadraticCurveTo(0-offsetX,95,-26-offsetX,82);
    ctx.quadraticCurveTo(-23-offsetX,78,-24-offsetX,70);
    ctx.lineTo(-24-offsetX,43);
    ctx.fillStyle = this.skinTone;
    ctx.fill()
  }
  #drawEars(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.05);
    let rightOffset = offsetX;
    let leftOffset = offsetX;
    if(rightOffset>0){
      rightOffset = rightOffset*1.4;
    }
    if(leftOffset<0){
      leftOffset = leftOffset*1.4;
    }
  
    ctx.beginPath();
    ctx.moveTo(62-rightOffset,4);
    ctx.quadraticCurveTo(61-rightOffset,11,61-rightOffset,15);
    ctx.quadraticCurveTo(66-rightOffset,18,70-rightOffset,14);
    ctx.quadraticCurveTo(76-rightOffset,9,78-rightOffset,0);
    ctx.quadraticCurveTo(82-rightOffset,-23,78-rightOffset,-24);
    ctx.quadraticCurveTo(76-rightOffset,-29,69-rightOffset,-23);
    ctx.fillStyle = skinTone;
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(62-rightOffset,-3);
    ctx.lineTo(63-rightOffset,9)
    ctx.quadraticCurveTo(78-rightOffset,0,75-rightOffset,-18);
    ctx.quadraticCurveTo(77-rightOffset,-25,71-rightOffset,-23);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0, 0, 0,0.1)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(235, 180, 170)';
    ctx.fill();
  
    ctx.beginPath();
    ctx.moveTo(-62-leftOffset,4);
    ctx.quadraticCurveTo(-61-leftOffset,11,-61-leftOffset,15);
    ctx.quadraticCurveTo(-66-leftOffset,18,-70-leftOffset,14);
    ctx.quadraticCurveTo(-76-leftOffset,9,-78-leftOffset,0);
    ctx.quadraticCurveTo(-82-leftOffset,-23,-78-leftOffset,-24);
    ctx.quadraticCurveTo(-76-leftOffset,-29,-69-leftOffset,-23);
    ctx.fillStyle = this.skinTone;
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(-62-leftOffset,-3);
    ctx.lineTo(-63-leftOffset,9)
    ctx.quadraticCurveTo(-78-leftOffset,0,-75-leftOffset,-18);
    ctx.quadraticCurveTo(-77-leftOffset,-25,-71-leftOffset,-23);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0, 0, 0,0.1)';
    ctx.stroke();
    ctx.fillStyle = 'rgb(235, 180, 170)';
    ctx.fill();
  }
  #drawHair(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.05);
  
    ctx.beginPath();
    ctx.moveTo(63-offsetX,-4);
    ctx.quadraticCurveTo(67-offsetX,-32,65-offsetX,-57);
    ctx.quadraticCurveTo(60-offsetX,-77,49-offsetX,-83);
    ctx.quadraticCurveTo(28-offsetX,-98,-1-offsetX,-95);
    ctx.lineTo(-1-offsetX,-130);
    ctx.quadraticCurveTo(41-offsetX,-127,65-offsetX,-105);
    ctx.quadraticCurveTo(89-offsetX,-76,80-offsetX,-45);
    ctx.fillStyle = '#4a312c';
    ctx.fill();
  
    ctx.beginPath();
    ctx.moveTo(-63-offsetX,-4);
    ctx.quadraticCurveTo(-67-offsetX,-32,-65-offsetX,-57);
    ctx.quadraticCurveTo(-60-offsetX,-77,-49-offsetX,-83);
    ctx.quadraticCurveTo(-28-offsetX,-98,1-offsetX,-95);
    ctx.lineTo(1-offsetX,-130);
    ctx.quadraticCurveTo(-41-offsetX,-127,-65-offsetX,-105);
    ctx.quadraticCurveTo(-89-offsetX,-76,-80-offsetX,-45);
    ctx.fill();
  }
  #drawFace(ctx,offsetX, offsetY=0){
    offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.05);
    offsetY = Math.sign(offsetY)*Math.min(0,Math.abs(offsetY));
  
    //right
    ctx.beginPath();
    ctx.moveTo(-1,-97+offsetY);
    ctx.quadraticCurveTo(42-offsetX,-96+offsetY,55-offsetX,-78+offsetY);
    ctx.quadraticCurveTo(68-offsetX,-64+offsetY,66-offsetX,-40+offsetY);
    ctx.quadraticCurveTo(67-offsetX,-34+offsetY,63-offsetX,-4+offsetY);
    ctx.quadraticCurveTo(65-offsetX,32+offsetY,23-offsetX,52+offsetY);
    ctx.quadraticCurveTo(15-offsetX,59+offsetY,-1,60+offsetY);
    ctx.fillStyle = skinTone;
    ctx.fill();
  
    //left
    ctx.beginPath();
    ctx.moveTo(1,-97+offsetY);
    ctx.quadraticCurveTo(-42-offsetX,-96+offsetY,-55-offsetX,-78+offsetY);
    ctx.quadraticCurveTo(-68-offsetX,-64+offsetY,-66-offsetX,-40+offsetY);
    ctx.quadraticCurveTo(-67-offsetX,-34+offsetY,-63-offsetX,-4+offsetY);
    ctx.quadraticCurveTo(-65-offsetX,32+offsetY,-23-offsetX,52+offsetY);
    ctx.quadraticCurveTo(-15-offsetX,59+offsetY,1,60+offsetY);
    ctx.fill();
  }
  #drawMouth(ctx,offsetX, offsetY=0,mouthX,mouthY){
    offsetX = Math.sign(offsetX)*Math.min(2,Math.abs(offsetX)*0.05);
    mouthX = Math.sign(mouthX)*Math.min(8,Math.abs(mouthX));
    mouthY = Math.sign(mouthY)*Math.min(14,Math.abs(mouthY));
    //restrain mouthY's minimum value to -3;
    if(mouthY <-2 ) mouthY = -2;
    //restrain mouthX's minimum value to -6; 
    if(mouthX <-4 ) mouthX = -4;
    const mouthXPoint = {x:-20,y:18};
    const mouthUpPoint = {x:0,y:20};
    const mouthDownPoint = {x:0,y:40};

    //to do 
    //tongue
    
    const tongueUpCenter = Number(mouthY) >= 0 ? mouthUpPoint.y-Number(mouthY)+4 : mouthUpPoint.y-Number(mouthY)-2;
    const tongueDownCenter = Number(mouthY) >= 0 ? mouthDownPoint.y+Number(mouthY)*2-8 : mouthUpPoint.y+Number(mouthY)*2;
    const tongBottomPoint = Number(mouthY) >= 0 ? mouthXPoint.y+Number(mouthY)  : mouthXPoint.y
    ctx.beginPath();
    ctx.moveTo(mouthXPoint.x+10+offsetX,mouthXPoint.y+2);
    ctx.quadraticCurveTo(0+offsetX,tongueUpCenter,-mouthXPoint.x-10+offsetX,mouthXPoint.y+2);
    ctx.lineTo(offsetX-mouthXPoint.x-9,tongBottomPoint);
    ctx.quadraticCurveTo(0,tongueDownCenter,mouthXPoint.x+9+offsetX,tongBottomPoint);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';

    ctx.fillStyle = 'rgb(238,169,142)';
    ctx.fill();

  
    //teeth
    const teetCenterPointY = Number(mouthY) > -5 ? mouthUpPoint.y-Number(mouthY)+2 : mouthUpPoint.y-Number(mouthY)-1; 
    ctx.beginPath();
    ctx.moveTo(mouthXPoint.x+offsetX-mouthX+3,mouthXPoint.y+2);
    ctx.quadraticCurveTo(mouthUpPoint.x+offsetX,teetCenterPointY,-mouthXPoint.x+Number(mouthX)+offsetX-3,mouthXPoint.y+2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke()
  
    //lips
    ctx.beginPath();
    ctx.moveTo(mouthXPoint.x-mouthX+offsetX,mouthXPoint.y);
    ctx.quadraticCurveTo(mouthUpPoint.x+offsetX,mouthUpPoint.y-mouthY,-mouthXPoint.x+Number(mouthX)+offsetX,mouthXPoint.y);
    ctx.quadraticCurveTo(mouthDownPoint.x+offsetX,mouthDownPoint.y+Number(mouthY)*2,mouthXPoint.x-mouthX+offsetX,mouthXPoint.y);
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgb(231,106,106,0.6)';
    ctx.stroke();
  
  }
  #drawNose(ctx,offsetX){
    offsetX = Math.sign(offsetX)*Math.min(5,Math.abs(offsetX)*0.05);
    ctx.beginPath();
    ctx.moveTo(0,-14);
    ctx.quadraticCurveTo(offsetX,-3,0,5);
    ctx.lineTo(0,8);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgb(225, 180, 172)'
    ctx.stroke();
  }
  #drawEyebrows(ctx,offsetX){

    offsetX = Math.sign(offsetX)*Math.min(1,Math.abs(offsetX)*0.05);
  
    //right eyebrow
    ctx.beginPath();
    ctx.moveTo(49+offsetX,-52);
    ctx.quadraticCurveTo(51+offsetX,-52,51+offsetX,-54);
    ctx.quadraticCurveTo(49+offsetX,-62,41+offsetX,-67);
    ctx.quadraticCurveTo(36+offsetX,-70,30+offsetX,-68);
    ctx.quadraticCurveTo(21+offsetX,-67,12+offsetX,-62);
    ctx.quadraticCurveTo(10+offsetX,-58,13+offsetX,-55);
    ctx.quadraticCurveTo(17+offsetX,-53,21+offsetX,-56);
    ctx.quadraticCurveTo(29+offsetX,-58,34+offsetX,-60);
    ctx.quadraticCurveTo(43+offsetX,-63,49+offsetX,-52);
    ctx.fillStyle = '#4a312c';
    ctx.fill();
  
    //left eyebrow
    ctx.beginPath();
    ctx.moveTo(-49+offsetX,-52);
    ctx.quadraticCurveTo(-51+offsetX,-52,-51+offsetX,-54);
    ctx.quadraticCurveTo(-49+offsetX,-62,-41+offsetX,-67);
    ctx.quadraticCurveTo(-36+offsetX,-70,-30+offsetX,-68);
    ctx.quadraticCurveTo(-21+offsetX,-67,-12+offsetX,-62);
    ctx.quadraticCurveTo(-10+offsetX,-58,-13+offsetX,-55);
    ctx.quadraticCurveTo(-17+offsetX,-53,-21+offsetX,-56);
    ctx.quadraticCurveTo(-29+offsetX,-58,-34+offsetX,-60);
    ctx.quadraticCurveTo(-43+offsetX,-63,-49+offsetX,-52);
    ctx.fill();
  }
  #drawEyes(ctx,offsetX, offsetY){

    offsetX = Math.sign(offsetX)*Math.min(4,Math.abs(offsetX)*0.05);
    offsetY = Math.sign(offsetY)*Math.min(5,Math.abs(offsetY)*0.05);
  
    //right eye
    //whole eye
    ctx.beginPath();
    ctx.moveTo(12,-26);
    ctx.quadraticCurveTo(14,-20,20,-19);
    ctx.quadraticCurveTo(26,-18,33,-18);
    ctx.quadraticCurveTo(46,-20,47,-26);
    ctx.quadraticCurveTo(50,-42,35,-45);
    ctx.quadraticCurveTo(27,-48,19,-43);
    ctx.quadraticCurveTo(11,-37,12,-26);
    ctx.fillStyle = 'white'
    ctx.fill();
    //green pupil
    ctx.beginPath();
    ctx.arc(28+offsetX,-31+offsetY,12,0,Math.PI*2);
    ctx.fillStyle = 'rgb(176,194,19)'
    ctx.fill();
    //black pupil
    ctx.beginPath();
    ctx.arc(28+offsetX,-31+offsetY,6,0,Math.PI*2);
    ctx.fillStyle = 'black'
    ctx.fill();
    //white light
    ctx.beginPath();
    ctx.arc(25+offsetX,-33+offsetY,2,0,Math.PI*2);
    ctx.fillStyle = 'white'
    ctx.fill();
    
    //left eye
    //whole eye
    ctx.beginPath();
    ctx.moveTo(-12,-26);
    ctx.quadraticCurveTo(-14,-20,-20,-19);
    ctx.quadraticCurveTo(-26,-18,-33,-18);
    ctx.quadraticCurveTo(-46,-20,-47,-26);
    ctx.quadraticCurveTo(-50,-42,-35,-45);
    ctx.quadraticCurveTo(-27,-48,-19,-43);
    ctx.quadraticCurveTo(-11,-37,-12,-26);
    ctx.fillStyle = 'white'
    ctx.fill();
    
    //green pupil
    ctx.beginPath();
    ctx.arc(-28+offsetX,-31+offsetY,12,0,Math.PI*2);
    ctx.fillStyle = 'rgb(176,194,19)'
    ctx.fill();
    //black pupil
    ctx.beginPath();
    ctx.arc(-28+offsetX,-31+offsetY,6,0,Math.PI*2);
    ctx.fillStyle = 'black'
    ctx.fill();
    //white light
    ctx.beginPath();
    ctx.arc(-25-6+offsetX,-33+offsetY,2,0,Math.PI*2);
    ctx.fillStyle = 'white'
    ctx.fill();
  }
  
}