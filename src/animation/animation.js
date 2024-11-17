class Bubble{
  constructor(x,rad,color,canvas){
    this.canvas = canvas;
    this.x = x;
    this.xDelta = Math.random()*10;
    this.y = canvas.height*viewport.zoom;
    this.yDelta = Math.random()*(-2);
    this.rad = rad;
    this.color = color;
    this.hovered = false;
    
  }


  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.rad,0,Math.PI*2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.stroke();

    if(this.hovered){
      ctx.fillStyle = 'yellow';
      ctx.fill();
    }
  }


  move(){
    this.xDelta = Math.random()>0.5 ? Math.random()*-5 : Math.random()*5;
    this.x += this.xDelta;
    this.y += this.yDelta; 

    if((this.x+this.rad)>this.canvas.width*viewport.zoom || (this.x-this.rad) < 0){
      this.xDelta *= -1;
    }
    // if((this.y+this.rad)>this.canvas.height*viewport.zoom || (this.y-this.rad) < 0){
    if((this.y+2*this.rad) < 0){
      return true;
    }

    // const hitProject = isPointInProject({x:this.x+this.rad,y:this.y+this.rad});
    // if(hitProject){
    //   Math.random() > 0.5 ? this.xDelta *= -1 : this.yDelta *= -1;
    // }

    return false;
  }
}