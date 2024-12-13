/*---------------- MAIN INITIALIZATION --------------------*/
import {GAME_CANVAS,ctx,CANVAS_WIDTH,CANVAS_HEIGHT} from './animation.js'
import {gameFrame} from './animation.js'



export class Enemy {
    constructor(EnemyImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle) {

        this.EnemyImg = EnemyImg;
        // this.x = Math.random() * CANVAS_WIDTH;
        // this.y = Math.random() * CANVAS_HEIGHT;
        this.x_reset = x;
        this.y_reset = y;
        this.x = x; // Position x on the canvas
        this.y = y; // Position y on the canvas
        this.width = width; // size of enemy object
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;


        this.speed = speed; // the magnitude of vector for enemy movement
        this.angle = angle* Math.PI / 180; // angle for the speed vector

        this.frame = 0; // used to slide through sprite for animation
    }

    reset(){
        this.x = this.x_reset;
        this.y = this.y_reset;
    }

    update() {
        this.x += this.speed*Math.cos(this.angle);
        this.y += this.speed*Math.sin(this.angle);
        this.x_hitbox = this.x;
        this.y_hitbox = this.y;
        this.width_hitbox = this.width;
        this.height_hitbox = this.height;
        // SLOW DOWN ANIMATION
        if (gameFrame % 4=== 0){
            this.frame > 4 ? this.frame = 0 : this.frame++ ;
        }
    }

    draw(){

        ctx.strokeRect(this.x_hitbox,this.y_hitbox,this.width_hitbox,this.height_hitbox);
        ctx.drawImage(this.EnemyImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
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


    const Enemy2_Img = new Image();
    Enemy2_Img.src = 'resources/enemy/enemy2.png';
    const ENEMY2_NUMBER = 3;
    for (let i=1; i<= ENEMY2_NUMBER;i++){
        enemyList.push(new Enemy(Enemy2_Img,CANVAS_WIDTH,0,100,80,
            266,160,Math.random()*3+3,90+Math.random()*90));
    }

    return enemyList
}
