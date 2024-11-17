class Viewport{
  constructor(canvas){
    this.canvas = canvas;
    this.zoom = 2.8;
    this.zoomStep = 0.05;
    this.minZoom = 1;
    this.maxZoom = 8;
    this.center = {x:canvas.width/12,y:canvas.height/12};
    this.offset = this.scale(this.center,-1);
    this.originX = 0;
    this.originY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.initialDistance = 0;
    this.lastTap = 0;
    this.pan = {
      start:{x:0,y:0},
      end:{x:0,y:0},
      offset:{x:0,y:0},
      active: false
    };
    this.#addEventListeners()
  }

  #addEventListeners(){
    if(platform==='Mobile'){
       //touches
      this.canvas.addEventListener('touchstart',this.#handleTouchStart.bind(this));
      this.canvas.addEventListener('touchmove',this.#handleTouchMove.bind(this));
      this.canvas.addEventListener('pointerup',this.#handleTouchEnd.bind(this));
    }else{
      this.canvas.addEventListener('mousedown',this.#handleMouseDown.bind(this));
      this.canvas.addEventListener('mousemove',this.#handleMouseMove.bind(this));
      this.canvas.addEventListener('mousewheel',this.#handleMouseWheel.bind(this));
      this.canvas.addEventListener('mouseup',this.#handleMouseUp.bind(this));
      this.canvas.addEventListener('dblclick',this.#handleDoubleClick.bind(this));
    }
  }

  getOffset(){
    return this.add(this.offset,this.pan.offset);
  }

  getMousePos({offsetX,offsetY}){
    return {x:offsetX*this.zoom,y:offsetY*this.zoom};
  }

  getTouchPos(e){
    const {top,left} = this.canvas.getBoundingClientRect();
    const {pageX,pageY} = e.changedTouches[0];
    
    const x = (pageX - left)*this.zoom;
    const y = (pageY - top)*this.zoom;
    
    return {x,y};
  }

  #handleTouchStart(e){
    if (e.touches.length === 2) {
      // Pinch-zoom gesture start

      const p1 = {x:e.touches[0].clientX,y:e.touches[0].clientY};
      const p2 = {x:e.touches[1].clientX,y:e.touches[1].clientY};
      
      this.initialDistance = this.distance(p1,p2);
      this.pan.active = false;
    } else if (e.touches.length === 1) {
      // Pan gesture start
      this.pan.start = this.getTouchPos(e);
      this.pan.active = true;
    }
  }

  #handleTouchMove(e){
    //e.preventDefault();
    if (e.touches.length === 2) {
      // Handle pinch-zoom
      const p1 = {x:e.touches[0].clientX,y:e.touches[0].clientY};
      const p2 = {x:e.touches[1].clientX,y:e.touches[1].clientY};
      const currentDistance = this.distance(p1,p2);
      const scaleChange = currentDistance / this.initialDistance;
      this.zoom /= scaleChange;
      this.initialDistance = currentDistance;
    } else if (e.touches.length === 1 && this.pan.active) {
      // Handle panning
      
      this.pan.end = this.getTouchPos(e);
      this.pan.offset = this.subtract(this.pan.end,this.pan.start);
      
      this.offset = this.add(this.offset,this.pan.offset);
      this.pan.start = this.pan.end;
  }
    
  }

  #handleTouchEnd(e){
    if(e.isPrimary){
      const currentTime = new Date().getTime();
      const tapLength = currentTime - this.lastTap;
      if (tapLength < 300 && tapLength > 0) {
        this.#handleDoubleClick(e);
      }
  
      this.lastTap = currentTime;
    }
    
    this.offset = this.add(this.offset,this.pan.offset);
    this.pan.active = false;
    this.pan.start = {x:0,y:0};
    this.pan.offset = {x:0,y:0};
  }

  #handleDoubleClick(e){
    const {offsetX,offsetY} = e;
 
    const mousePos = this.subtract({x:offsetX,y:offsetY},this.center);
    const x = Math.floor(mousePos.x*this.zoom-this.offset.x);
    const y = Math.floor(mousePos.y*this.zoom - this.offset.y);
    openProject({x,y});
  }

  #handleMouseWheel(e){
    e.preventDefault();
    const dir = Math.sign(e.deltaY);
    this.zoom += dir*this.zoomStep;
    this.zoom = Math.min(Math.max(this.minZoom,this.zoom),this.maxZoom);
  }

  #handleMouseDown(e){
    e.preventDefault();
    if(this.pan.active) return;
    this.pan.start = this.getMousePos(e);
    this.pan.active = true;
  }


  #handleMouseMove(e){
    if(!this.pan.active){
      getFocusedProject(e);
      return;
    } 
    
    this.pan.end = this.getMousePos(e);
    this.pan.offset = this.subtract(this.pan.end,this.pan.start);
    this.offset = this.add(this.offset,this.pan.offset);
    this.pan.start = this.pan.end;
  }

  #handleMouseUp(e){
    this.pan.active = false;
    this.offset = this.add(this.offset,this.pan.offset);
    this.pan.start = {x:0,y:0};
    this.pan.offset = {x:0,y:0};
  }

  //utils
  scale(p,s){
    return {x:p.x*s,y:p.y*s};
  }

  add(p1,p2){
    return {x:p1.x+p2.x,y:p1.y+p2.y};
  }

  subtract(p1,p2){
    return {x:p1.x-p2.x,y:p1.y-p2.y};
  }

  equal(p1,p2){
    return p1.x===p2.x && p1.y==p2.y;
  }

  distance(p1,p2){
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
  }
}