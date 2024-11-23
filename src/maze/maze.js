class Maze{
    constructor(canvas,rows,columns,speed){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.rows = rows;
        this.columns = columns
        this.grid = Array(rows).fill().map(()=>Array(columns).fill());
        this.startNode = {x:0,y:0};
        this.nodeWidth = canvas.width/columns;
        this.nodeHeight = canvas.height/rows;
        this.history = [];
        this.timeoutIds = [];
        this.speed = speed;
        this.finished = false;  
        this.walls = [];
        this.projects = [];
        this.init();
    }

    draw(){
        const {ctx} = this;
      for(const node of this.history){
        node.isStartNode = false;
        node.draw(this.ctx);
      }
       
      for(const {start,end} of this.walls){
        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 4;
        ctx.moveTo(start.x,start.y);
        ctx.lineTo(end.x,end.y);
        ctx.stroke();
        }

        for(const project of this.projects){
            const imgSize = Math.min(this.nodeWidth/2,this.nodeHeight/2);
            ctx.drawImage(project.img,project.x,project.y,imgSize,imgSize);
        }
       
    }
    

    init(){
        for(let i = 0;i<mazeRows;i++){
            for(let j = 0;j<mazeColumns;j++){
                let node = null;
                let {nodeWidth,nodeHeight,grid} = this; 
                if(i===this.startNode.y && j === this.startNode.x){
                    node = new Node(i,j,nodeWidth,nodeHeight,true);
                    this.startNode = node;
                    grid[i][j] = node;
                
                }else{
                    node = new Node(i,j,nodeWidth,nodeHeight);
                    grid[i][j] = node;
                }
                node.draw(this.ctx);
            }
        }
        this.placeProjects();
    }

    generate(){
        const visitedNodes = [];
        let unvistedNode = this.#getAllNodes();
        let current = this.startNode;
        const {grid, history} = this;
        while(unvistedNode.length>0){
            const neighbors = [];
            const row = current.row;
            const col = current.col;

            //top neighbor
            if(grid[row][col-1] && !grid[row][col-1].isVisited) neighbors.push(grid[row][col-1])
            //right neighbor
            if(grid[row+1] && !grid[row+1][col].isVisited) neighbors.push(grid[row+1][col])
            //bottom neighbor
            if(grid[row][col+1] && !grid[row][col+1].isVisited) neighbors.push(grid[row][col+1])
            //left neighbor
            if(grid[row-1] && !grid[row-1][col].isVisited) neighbors.push(grid[row-1][col])

            //backtrack
            
            if(neighbors.length === 0){
                if(visitedNodes.length===0) return history;
                current.isStartNode = false;
                history.push(current)
                
                current = visitedNodes.pop();
                current.isStartNode = true;
                history.push(current)
                
            }else if(current){

                let choise = this.#randomChoise(neighbors.length);
                let next = neighbors[choise];
                
                this.#removeWalls(current,next);

                current.isVisited = true;

                unvistedNode.shift();
                current.isStartNode = false;
                current.isVisited = true;
                visitedNodes.push(current);
                history.push(current)
            
                current = next;
                current.isStartNode = true;
                current.isVisited = true;
                history.push(current);
            }
        }
    }
    
    animate(){
        const {history} = this;
        for(let i = 0;i<history.length;i++){
            const timeoutId = setTimeout(()=>{
                if(i>0) {
                    history[i-1].isStartNode = false;
                    history[i-1].draw(this.ctx)
                }
                history[i].isStartNode = true;
                history[i].draw(this.ctx);
                if(i===history.length-1){
                    this.finished = true;
                    this.getWalls();
                }
            },(100*i)/this.speed)

            this.timeoutIds.push(timeoutId);
        }
    }

    placeProjects(){
        for(let i = 0;i<positions.length;i++){
            const {img,url} = positions[i];
            const row = Math.floor(Math.random()*this.grid.length);
            const col = Math.floor(Math.random()*this.grid[0].length);
            const x = col*this.nodeWidth;
            const y = row*this.nodeHeight;
            
            if(this.#projectPosOccupied(x,y)){
                i--;
                continue;
            }
            
            this.projects.push({x,y,img,url,openned:false});
        }
    }

    #projectPosOccupied(x,y){
        if(x===0 && y===0) return true;
        for(const p of this.projects){
            if(p.x===x && p.y===y){
                return true
            }
        }
        return false;
    }

    getWalls(){
        for(let i=0;i<this.grid.length;i++){
            for(let j = 0;j<this.grid[i].length;j++){

                const {row,col,width,height,walls} = this.grid[i][j];
                
                // walls: top, right,bottom,left
                if(walls[0]){//top
                    let startX = col*width;
                    let startY = row*height;
                    let endX = col*width+width;
                    let endY = row*height;
                    this.walls.push({start:{x:startX,y:startY},end:{x:endX,y:endY}});
                }

                if(walls[3]){//left
                    let startX = col*width;
                    let startY = row*height;
                    let endX = col*width;
                    let endY = row*height+height;
                    this.walls.push({start:{x:startX,y:startY},end:{x:endX,y:endY}});
                }

                if(walls[1]){//right
                    let startX = col*width+width;
                    let startY = row*height;
                    let endX = col*width+width;
                    let endY = row*height+height;
                    this.walls.push({start:{x:startX,y:startY},end:{x:endX,y:endY}});
                }

                if(i===this.grid.length-1 && walls[2]){//bottom
                    let startX = col*width+width;
                    let startY = row*height+height;
                    let endX = col*width;
                    let endY = row*height+height;
                    this.walls.push({start:{x:startX,y:startY},end:{x:endX,y:endY}});
                }     
            }
        }
    }

    #removeWalls(current,neighbor){
    
        if(current===neighbor) return;
        if(current.row === neighbor.row){
            //left neighbor
            if(current.col - neighbor.col === 1){
                current.walls[3] = false;
                neighbor.walls[1] = false;
                //right neighbor
            }else if(current.col - neighbor.col === -1){
                current.walls[1] = false;
                neighbor.walls[3] = false;
            }
        }else if(current.col === neighbor.col){
            //top neighbor
            if(current.row - neighbor.row === 1){
                current.walls[0] = false;
                neighbor.walls[2] = false;
                //bottom neighbor
            }else if(current.row - neighbor.row === -1){
                current.walls[2] = false;
                neighbor.walls[0] = false;
            }
        }
    }

    #getAllNodes(){
        const result = [];
        for(let i = 0;i<this.grid.length;i++){
            for(let j = 0;j<this.grid[i].length;j++){
                result.push(this.grid[i][j])
            }
        }
        return result;
    }

    #randomChoise(max){
        return Math.floor(Math.random()*max);
    }
}
