class Game {
  constructor() {
    this.car = new Car(maze.canvas.width - maze.nodeWidth/2,maze.canvas.height-maze.nodeHeight/2);
    this.keys = {};

    window.addEventListener("keydown", (e) => this.keys[e.key] = true);
    window.addEventListener("keyup", (e) => this.keys[e.key] = false);
  }

  update() {
    this.car.update(this.keys);
  }

  draw() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    maze.draw();
    this.car.draw(this.keys);
  }

  loop() {
    if(maze.finished){
      this.update();
      this.draw();
    };
    requestAnimationFrame(() => this.loop());
  }
}