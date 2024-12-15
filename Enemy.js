/*---------------- MAIN INITIALIZATION --------------------*/
import {gameFrame,CANVAS_WIDTH} from './animation.js'
import {Obstacle} from "./Obstacle.js";


export class Enemy  extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle,movementStyle) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)

        this.x_reset = x;
        this.y_reset = y;
        this.movementStyle = movementStyle;

        this.sin_fluctuate = 5; // The fluctuate range when enemy moves in sin wave

        // HORIZONTAL HOVERING
        this.hover_horizontal_range = 500; // Change the hovering distance
        this.angle_horizontal_speed = 0.7*Math.PI/180; // Change the hovering speed
        this.hover_horizontal_Xoffset = x; // Change the starting point for hovering

        // VERTICAL HOVERING
        this.hover_vertical_range = 500; // Change the hovering distance
        this.angle_vertical_speed = 5*Math.PI/180;
        this.hover_vertical_Yoffset = y;
    }

    reset(){
        this.x = this.x_reset;
        this.y = this.y_reset;
    }

    update() {

        switch (this.movementStyle ){
            case 'horizontal':
                this.x += this.speed*Math.cos(this.angle); // DON'T CARE ABOUT angle parameter
                break;
            case 'vertical':
                this.y += this.speed*Math.sin(this.angle);
                break
            case 'diagonal':
                this.x += this.speed*Math.cos(this.angle);
                this.y += this.speed*Math.sin(this.angle);
                break;
            case 'sin':
                this.x += this.speed;
                this.y += this.sin_fluctuate *Math.sin(this.angle);
                this.angle += 0.07;
                break;
            case 'hover-horizontal':
                this.x = this.hover_horizontal_range*Math.sin(this.angle) + this.hover_horizontal_Xoffset;
                this.angle += this.angle_horizontal_speed;
                break;

            case 'hover-vertical':
                this.y = this.hover_vertical_range*Math.sin(this.angle) + this.hover_vertical_Yoffset;
                this.angle += this.angle_vertical_speed;
                break;
        }

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


export function generateEnemy(level) {

    let enemyList = []
    switch (level) {
        case 1:
            enemyList = []
            addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
                0, 400, 100, 80,
                293, 155, Math.random() * 2 + 4, 0, 'horizontal',);
            // enemyList = addEnemy2(enemyList,3);

            break;
        case 2:
            enemyList = []

            addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
                500, 400, 100, 80,
                293, 155, Math.random() * 2 + 4, 50, 'hover-horizontal',);
            // ADD ENEMY1 1 times
            // for (let i = 1; i <= 1; i++) {
            //     enemyList = addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
            //         0, 400, 100, 80,
            //         293, 155, Math.random() * 3 + 1, 0, 'hover-horizontal')
            // }
            break;

        case 3:

            addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
                500, 400, 100, 80,
                293, 155, Math.random() * 2 + 4, 50, 'hover-horizontal',);
            addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
                500, 0, 100, 80,
                293, 155, Math.random() * 2 + 3, Math.random() * 70, 'vertical');
            // enemyList = addEnemy2(enemyList,3);

            break;

        case 4:
            enemyList = []
            addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
                0, 100, 100, 80,
                293, 155, Math.random() * 4 + 2, Math.random()*70, 'diagonal')
            addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
                1000, 200, 100, 80,
                293, 155, Math.random() * 4 + 2, 90+ Math.random()*70, 'diagonal')

            break;


            // if (level === 2) {
            //     const Enemy2_Img = new Image();
            //     Enemy2_Img.src = 'resources/enemy/enemy2.png';
            //     const ENEMY2_NUMBER = 3;
            //     for (let i=1; i<= ENEMY2_NUMBER;i++){
            //         enemyList.push(new Enemy(Enemy2_Img,CANVAS_WIDTH,0,100,80,
            //             266,160,Math.random()*3+3,90+Math.random()*90));
            //     }
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
            }

        return enemyList
    }


    function addSingleEnemy(enemyList, ImgSrc,
                            x, y, width, height, spriteWidth, spriteHeight, speed, angle, movementStyle) {
        const Enemy_Img = new Image();
        Enemy_Img.src = ImgSrc;
        enemyList.push(new Enemy(Enemy_Img, x, y, width, height, spriteWidth, spriteHeight, speed, angle, movementStyle));
        return enemyList
    }


    function addEnemy2(enemyList, enemy_num) {
        const Enemy_Img = new Image();
        Enemy_Img.src = 'resources/enemy/enemy2.png';

        for (let i = 1; i <= enemy_num; i++) {
            enemyList.push(new Enemy(Enemy_Img, 0, 0, 100, 80,
                266, 188, Math.random() * 4 + 3, Math.random() * 70), 'horizontal');
        }
        return enemyList
    }



