/*---------------- MAIN INITIALIZATION --------------------*/
import {gameFrame,CANVAS_WIDTH} from './animation.js'
import {Obstacle} from "./Obstacle.js";
// import * as level from './levelDesign.js';
import {addSingleEnemy} from './levelDesign.js';

export class Enemy  extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle,angle_horizontal_speed,angle_vertical_speed,movementStyle,) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)

        this.x_reset = x;
        this.y_reset = y;
        this.angle_reset = angle;
        this.movementStyle = movementStyle;


        this.sin_fluctuate = 5; // The fluctuate range when enemy moves in sin wave

        // HORIZONTAL HOVERING
        this.hover_horizontal_range_OFFSET = 500;
        this.hover_horizontal_range = this.hover_horizontal_range_OFFSET; // Change the hovering distance and direction when start moving (>0:right,<0:left)
        this.angle_horizontal_speed = angle_horizontal_speed&&0.7*Math.PI/180 // Change the hovering speed
        this.hover_horizontal_Xoffset = x; // Change the starting point for hovering

        // VERTICAL HOVERING
        this.hover_vertical_range_OFFSET = -300;
        this.hover_vertical_range = this.hover_vertical_range_OFFSET; // Change the hovering distance
        this.angle_vertical_speed = angle_vertical_speed||0.5*Math.PI/180; // Change the hovering speed
        this.hover_vertical_Yoffset = y; // Change the starting point for hovering
    }

    reset(char_x,char_y) {
        /*
        char_x, char_y is the position of character
        */


        /*----------------- HORIZONTAL CASE -----------------------*/
        if (this.movementStyle === 'horizontal') {
            // speed/Math.abs(speed) shows the direction. > 0: left to right, < 0: right to left
            // NORMALLY, THE ENEMY WILL REAPPEAR FROM THE LEFT OR RIGHT
            if ((this.speed / Math.abs(this.speed)) > 0) {
                this.x = this.x_reset;
            } else {
                this.x = CANVAS_WIDTH - this.width;
            }

            // IF THE CHARACTER TOO CLOSE TO THE LEFT when enemy move from left to right
            // => MAKE IT APPEAR FROM THE RIGHT
            if (char_x < 400 && (this.speed / Math.abs(this.speed)) > 0) {
                // console.log(CANVAS_WIDTH);
                this.x = CANVAS_WIDTH - this.width;
                this.speed *= -1;
                // console.log('dsssf')
            }
            // IF THE CHARACTER TOO CLOSE TO THE LEFT  when enemy move from right to left
            if ((CANVAS_WIDTH - char_x) < 400 && (this.speed / Math.abs(this.speed)) < 0) {
                this.x = 0;
                this.speed = -this.speed;
                // console.log('dsf')
            }
        /*----------------- HOVER HORIZONTAL CASE -----------------------*/
        } else if (this.movementStyle === 'hover-horizontal') {
            // b= this.hover_horizontal_range*Math.sin(this.angle_reset) + this.hover_horizontal_Xoffset; right
            // a = -this.hover_horizontal_range*Math.sin(this.angle_reset) + this.hover_horizontal_Xoffset; left
            // a<b
            if (char_x > this.hover_horizontal_Xoffset) {
                // this.hover_horizontal_Xoffset  = Infinity;
                this.angle = this.angle_reset;
                this.hover_horizontal_range = -this.hover_horizontal_range_OFFSET; // Change the respawn direction to left direction
            } else {
                this.angle = this.angle_reset;
                this.hover_horizontal_range = this.hover_horizontal_range_OFFSET; // Change the respawn direction to right direction
            }
        /*----------------- HOVER VERTICAL CASE -----------------------*/
        } else if (this.movementStyle === 'hover-vertical') {
            this.angle = this.angle_reset;

        } else{
            this.x = this.x_reset;
            this.y = this.y_reset;
        }

    }


    resetDelayed(){
        // move enemy hitbox outside game canvas
        // this.x= -1000;
        // this.y = -1000;
        // reset to original position after 1s
        // setTimeout(()=>{
        //     this.x = this.x_reset;
        //     this.y = this.y_reset;
        // },5000)

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

// ADD ENEMY1 1 times
// for (let i = 1; i <= 1; i++) {
//     enemyList = addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
//         0, 400, 100, 80,
//         293, 155, Math.random() * 3 + 1, 0, 'hover-horizontal')
// }

