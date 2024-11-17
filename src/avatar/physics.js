const G = [0,0.2];

class Particle{
  constructor(loc,isFixed=false){
    this.loc = loc;
    this.oldLoc = loc;
    this.initXLoc = loc[0];
    this.isFixed = isFixed;
  }
  update(offsetX){ 
    if(this.isFixed){
      offsetX = Math.sign(offsetX)*Math.min(10,Math.abs(offsetX)*0.03);
      const {initXLoc} = this;
      this.loc[0] = initXLoc - offsetX;
      return;
    } 
    
    const velocity = subtract(this.loc,this.oldLoc);
    let newLoc = add(this.loc,velocity);
    newLoc = add(newLoc,G);
    this.oldLoc = this.loc;
    this.loc = newLoc;
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(...this.loc,3,0,Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fill();
  }
}

class Segment{
  constructor(A,B){
    this.A = A;
    this.B = B;
    this.len = distance(A.loc,B.loc);
  }

  update(){
    const vectorDiff = subtract(this.A.loc,this.B.loc);
    const magn = magnitute(vectorDiff);
    const diff = magn - this.len;
    const norm = normalize(vectorDiff);
    this.B.loc = add(this.B.loc,scale(norm,diff));
  }

  draw(ctx){
    ctx.beginPath();
    ctx.moveTo(...this.A.loc);
    ctx.lineTo(...this.B.loc);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

}