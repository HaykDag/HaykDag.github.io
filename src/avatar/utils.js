function lerp (a,b,t){
  return a+(b-a)*t
}

function drawPoint(ctx,x,y,color='black',r=5){
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill()
}

function getMarkedLocs(imageData,color = [0,0,255],threshold = 150){
  const red = [255,10,10];
  const green = [20,255,50];
  const blue = [20,50,255]; 
  const colors = [red,green,blue];
  const locs = [[],[],[]];
  const {data} = imageData;
  for(let i = 0;i<data.length;i+=4){
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    const picselIndex = i/4;
    for(let j  = 0;j<colors.length;j++){
      if(isMatch([r,g,b],colors[j],threshold)){
        const y = Math.floor(picselIndex/imageData.width);
        const x = picselIndex%imageData.width;
        locs[j].push({x,y});
      }
    }
  }
  return locs;
}

function isMatch(color1,color2,threshold){
  return distance(color1,color2)<=threshold;
}

function distance(p1,p2){
  let dist = 0;
  for(let i =0;i<p1.length;i++){
    dist += (p1[i]-p2[i])*(p1[i]-p2[i])
  }
  return Math.sqrt(dist);
}

function average(locs){
  const avg = [0,0];
  if(locs.length){
    for(let i =0;i<locs.length;i++){
      avg[0] += locs[i].x;
      avg[1] += locs[i].y;
    }
    avg[0] /= locs.length;
    avg[1] /= locs.length;
  }
  return avg;
}

function add(v1,v2){
  const newV = [];
  for(let i = 0;i<v1.length;i++){
    newV[i] = v1[i] + v2[i];
  }
  return newV;
}

function subtract(v1,v2){
  const newV = [];
  for(let i = 0;i<v1.length;i++){
    newV[i] = v1[i] - v2[i];
  }
  return newV;
}

function magnitute(v){
  //return distance(v,new Array(v.length).fill(0));
  let mag = 0;
  for(let i = 0;i<v.length;i++){
    mag += v[i]*v[i];
  }
  return Math.sqrt(mag);
}

function scale(v,scalar){
  let newV = [];
  for(let i = 0;i<v.length;i++){
    newV[i] = v[i]*scalar;
  }
  return newV;
}

function normalize(v){
  return scale(v,1/magnitute(v))
}