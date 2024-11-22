class Node {
    constructor(row, col, width,height, isStartNode = false) {
        this.row = row;
        this.col = col;
        this.isStartNode = isStartNode;
        this.isVisited = false;
        this.isPath = false;
        this.prev = null;
        this.width = width;
        this.height = height;
        this.distance = Infinity;
        //            top, right,bottom,left
        this.walls = [true, true, true, true];
    }

    draw(ctx,i=0,dir) {
        const {width,height} = this;
        if(this.isVisited){
            ctx.beginPath();
            ctx.rect(this.col*width,this.row*height,width,height);
            ctx.fillStyle = '#34495E';
            ctx.fill();
        }
        if(this.isStartNode){
            
            const imgSize = Math.min(width/2,height/2);
            ctx.drawImage(startNodeImg,0,0,209,241,this.col * width+width/4,this.row * height+height/4,imgSize,imgSize);
            
            /*
            ctx.beginPath();
            ctx.fillStyle = "#F39C12";
            ctx.arc(this.col * width + width/2, this.row * height + height/2,Math.min(width,height)/4,0,Math.PI*2);
            ctx.fill();
            */
        }
        //top
        if(this.walls[0]){
            ctx.beginPath();
            ctx.moveTo(this.col * width, this.row * height);
            ctx.strokeStyle = "#BDC3C7";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * width + width,this.row * height);
            ctx.stroke();
        }
        //right
        if(this.walls[1]){
            ctx.beginPath();
            ctx.moveTo(this.col * width + width,this.row * height);
            ctx.strokeStyle = "#BDC3C7";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * width + width,this.row * height + height);
            ctx.stroke();
        }
        //bottom
        if(this.walls[2]){
            ctx.beginPath();
            ctx.moveTo(this.col * width,this.row * height + height);
            ctx.strokeStyle = "#BDC3C7";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * width + width,this.row * height + height);
            ctx.stroke();
        }
        //left
        if(this.walls[3]){
            ctx.beginPath();
            ctx.moveTo(this.col * width, this.row * height);
            ctx.strokeStyle = "#BDC3C7";
            ctx.lineWidth = 4;
            ctx.lineTo(this.col * width,this.row * height+height);
            ctx.stroke();
        }
        if(this.isPath){
            ctx.beginPath();
            if(dir==="vertical"){
                ctx.rect(this.col*width+width*0.1,this.row*height+height*0.3,width*0.8,height*0.2);
            }else if(dir==="horizontal"){
                ctx.rect(this.col*width+width*0.3,this.row*height+height*0.15,width*0.2,height*0.6);
            }
            if(i%3===0){
                ctx.fillStyle = 'orange';
            }else if(i%2===0){
                ctx.fillStyle = 'green';
            }else{
                ctx.fillStyle = 'red';
            }
            ctx.fill();
        }
    }
}
