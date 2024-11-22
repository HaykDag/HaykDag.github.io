class Car {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      const size = Math.min(maze.nodeHeight,maze.nodeWidth)
      this.width = size*0.35;
      this.height = size*0.6;
      this.angle = Math.PI/2;
      this.speed = 0;
      this.maxSpeed = size*0.05;
      this.acceleration = size*0.0005;
      this.friction = size*0.0005;
      this.turnSpeed = 0.045;

      this.left = false;
      this.right = false;
  }

  update(keys) {
    // Control the speed
    if (keys["ArrowUp"]){
      if(this.speed<0) this.speed *= 0.5;  
      this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);  
    } 
    if (keys["ArrowDown"]){
      if(this.speed>0) this.speed *= 0.5;  
      this.speed = Math.max(this.speed - this.acceleration, -this.maxSpeed / 2);  
    } 

    // Apply friction
    if (!keys["ArrowUp"] && !keys["ArrowDown"]) {
        this.speed = this.speed > 0 ? Math.max(this.speed - this.friction, 0) : Math.min(this.speed + this.friction, 0);
    }

    // Calculate the new position based on speed and angle
    const newX = this.x + Math.sin(this.angle) * this.speed;
    const newY = this.y - Math.cos(this.angle) * this.speed;

    // Check for collision along the movement path
    if (!this.hasCollisionInterpolated(this.x, this.y, newX, newY, maze.walls)) {
        // Update the position if no collision
        this.x = newX;
        this.y = newY;
    } else {
        // Collision detected, reduce speed and nudge back
        this.speed *= -0.1;
    }

    //handle front wheels turning effect
    keys["ArrowLeft"] ? this.left = true : this.left = false;
    keys["ArrowRight"]? this.right = true : this.right = false;

    // Handle rotation and check for collision while turning
    if (this.speed !== 0) {
        const flip = this.speed > 0 ? 1 : -1;
        const originalAngle = this.angle;

        if (keys["ArrowLeft"]) this.angle -= this.turnSpeed * flip;
        if (keys["ArrowRight"]) this.angle += this.turnSpeed * flip;

        // Check for collision after rotation
        if (this.hasCollision(this.x, this.y, maze.walls)) {
            // Collision detected during turn, revert the angle and reduce speed
            this.angle = originalAngle;
            this.speed *= -0.5; // Slight bounce back effect
        }
    }

    const project = this.isInProject(maze); 
    if(project){
      project.openned = true;
      window.open(project.url, '_blank','noopener');
      for(const k of Object.keys(game.keys)){
        game.keys[k] = false;
      }
    }
  }


  draw() {
    mainCtx.save();
    mainCtx.translate(this.x, this.y);
    mainCtx.rotate(this.angle);

    // Draw Wheels
    let wheelAngle = this.left ? -Math.PI/30 : this.right ? +Math.PI/30 : 0;
    mainCtx.fillStyle = "black";
    mainCtx.save();
    mainCtx.rotate(wheelAngle);
    const wheelWidth = this.width / 10;
    const wheelHeight = this.height / 5;
    mainCtx.fillRect(-this.width / 2+2, -this.height / 3, wheelWidth, wheelHeight);                   // Front left
    mainCtx.fillRect(this.width / 2 - wheelWidth-2, -this.height / 3, wheelWidth, wheelHeight);       // Front right
    mainCtx.restore();
    //back wheels
    mainCtx.fillRect(-this.width / 2-1, this.height / 3 - wheelHeight, wheelWidth, wheelHeight);      // Rear left
    mainCtx.fillRect(this.width / 2 - wheelWidth+1, this.height / 3 - wheelHeight, wheelWidth, wheelHeight); // Rear right
    

    // Draw Car Body
    mainCtx.fillStyle = "#0077FF"; // Blue car body
    mainCtx.beginPath();
    mainCtx.moveTo(-this.width / 2, this.height / 2); // Rear left corner
    mainCtx.lineTo(this.width / 2, this.height / 2);  // Rear right corner
    mainCtx.lineTo(this.width / 3, -this.height / 2); // Front right corner (narrower)
    mainCtx.lineTo(-this.width / 3, -this.height / 2);// Front left corner (narrower)
    mainCtx.closePath();
    mainCtx.fill();

    // Draw Windows
    mainCtx.fillStyle = "#333"; // Dark windows
    const windowWidth = this.width / 2;
    const windowHeight = this.height / 2.5;
    mainCtx.fillRect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);

    // Draw Headlights
    mainCtx.fillStyle = "yellow";
    const headlightWidth = this.width / 10;
    const headlightHeight = this.height / 10;
    mainCtx.fillRect(-this.width / 3, -this.height / 2 - headlightHeight / 2, headlightWidth, headlightHeight);
    mainCtx.fillRect(this.width / 3 - headlightWidth, -this.height / 2 - headlightHeight / 2, headlightWidth, headlightHeight);

    // Draw Taillights
    mainCtx.fillStyle = "red";
    const taillightWidth = this.width / 10;
    const taillightHeight = this.height / 10;
    mainCtx.fillRect(-this.width / 2 + taillightWidth / 2, this.height / 2 - taillightHeight, taillightWidth, taillightHeight);
    mainCtx.fillRect(this.width / 2 - taillightWidth * 1.5, this.height / 2 - taillightHeight, taillightWidth, taillightHeight);

    mainCtx.restore();
    
}


  hasCollisionInterpolated(x1, y1, x2, y2, walls) {
    const steps = 20; // Number of steps for interpolation
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const interpolatedX = x1 + (x2 - x1) * t;
        const interpolatedY = y1 + (y2 - y1) * t;
        if (this.hasCollision(interpolatedX, interpolatedY, walls)) {
            return true;
        }
    }
    return false;
  }

  hasCollision(x, y, walls) {
    // Define the car's corners
    const corners = this.getCorners(x, y);

    // Check each wall for collision with any edge of the car
    for (const wall of walls) {
        const { start, end } = wall;
        
        // Check collision with each of the car's edges
        for (let i = 0; i < 4; i++) {
            const corner1 = corners[i];
            const corner2 = corners[(i + 1) % 4];

            if (this.lineIntersect(corner1, corner2, start, end)) {
                return true; // Collision detected
            }
        }
    }

    return false; // No collision detected
  }


  lineIntersect(p1, p2, q1, q2) {
    const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

    const d1 = cross(p1, p2, q1);
    const d2 = cross(p1, p2, q2);
    const d3 = cross(q1, q2, p1);
    const d4 = cross(q1, q2, p2);

    // Check if the segments intersect
    return (d1 * d2 < 0) && (d3 * d4 < 0);
  }

  getCorners(x, y) {
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    return [
        { x: x - halfWidth * cos - halfHeight * sin, y: y - halfWidth * sin + halfHeight * cos }, // Rear left
        { x: x + halfWidth * cos - halfHeight * sin, y: y + halfWidth * sin + halfHeight * cos }, // Rear right
        { x: x + halfWidth * cos + halfHeight * sin, y: y + halfWidth * sin - halfHeight * cos }, // Front right
        { x: x - halfWidth * cos + halfHeight * sin, y: y - halfWidth * sin - halfHeight * cos }, // Front left
    ];
  }
  drawWheel(x, y, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Draw Wheel
    ctx.fillStyle = "black";
    ctx.fillRect(-5, -10, 10, 20);

    // Draw Tread or Spokes
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const angle = (i * Math.PI) / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.sin(angle) * 5, Math.cos(angle) * 10);
        ctx.stroke();
    }

    ctx.restore();
  }

  isInProject(maze){
    const {x,y} = this;
    const {nodeWidth,nodeHeight,projects} = maze;
    const minSize = Math.min(nodeHeight,nodeWidth);
    for(const project of projects){
      if(project.openned) continue;
      if(x>=project.x+minSize/16  && 
        x<=project.x + minSize-minSize/8 &&
        y>=project.y+minSize/16   &&
        y <= project.y+minSize-minSize/8){
          return project;
      }
    }
    return null;
  }

}