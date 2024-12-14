/*---------------- MAIN INITIALIZATION --------------------*/
import {gameFrame} from './animation.js'
import {Obstacle} from "./Obstacle.js";


export class Enemy  extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)

        this.x_reset = x;
        this.y_reset = y;

    }

    reset(){
        this.x = this.x_reset;
        this.y = this.y_reset;
    }

    update() {

        this.x += this.speed*Math.cos(this.angle);
        this.y += this.speed*Math.sin(this.angle);
        super.update();

        // SLOW DOWN ANIMATION
        if (gameFrame % 4=== 0){
            this.frame > 4 ? this.frame = 0 : this.frame++ ;
        }
    }

    // draw(){
    //
    //     ctx.strokeRect(this.x_hitbox,this.y_hitbox,this.width_hitbox,this.height_hitbox);
    //     ctx.drawImage(this.ObstacleImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    // }
}

export function generateEnemy(){
    let enemyList = []

    const Enemy1_Img = new Image();
    Enemy1_Img.src = 'resources/enemy/enemy1.png';
    const ENEMY1_NUMBER = 3;
    for (let i=1; i<= ENEMY1_NUMBER;i++){
        enemyList.push(new Enemy(Enemy1_Img,0,0,100,80,
            293,155,Math.random()*4+3,Math.random()*90));
    }


    // const Enemy2_Img = new Image();
    // Enemy2_Img.src = 'resources/enemy/enemy2.png';
    // const ENEMY2_NUMBER = 3;
    // for (let i=1; i<= ENEMY2_NUMBER;i++){
    //     enemyList.push(new Enemy(Enemy2_Img,CANVAS_WIDTH,0,100,80,
    //         266,160,Math.random()*3+3,90+Math.random()*90));
    // }
    //
    // const Enemy3_Img = new Image();
    // Enemy3_Img.src = 'resources/enemy/enemy3.png';
    // const ENEMY3_NUMBER = 3;
    // for (let i=1; i<= ENEMY3_NUMBER;i++){
    //     enemyList.push(new Enemy(Enemy3_Img,CANVAS_WIDTH,0,100,80,
    //         218,177,Math.random()*3+1,90+Math.random()*90));
    // }
    //
    // const Enemy4_Img = new Image();
    // Enemy4_Img.src = 'resources/enemy/enemy4.png';
    // const ENEMY4_NUMBER = 3;
    // for (let i=1; i<= ENEMY4_NUMBER;i++){
    //     enemyList.push(new Enemy(Enemy4_Img,CANVAS_WIDTH,100,100,80,
    //         213,212,Math.random()*3+1,180));
    // }

    return enemyList
}
