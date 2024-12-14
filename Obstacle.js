import { ctx } from "./animation.js";


export class Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle) {

        this.ObstacleImg = ObstacleImg;
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

    update() {

        this.x_hitbox = this.x;
        this.y_hitbox = this.y;
        this.width_hitbox = this.width;
        this.height_hitbox = this.height;

    }

    draw(){

        ctx.strokeRect(this.x_hitbox,this.y_hitbox,this.width_hitbox,this.height_hitbox);
        ctx.drawImage(this.ObstacleImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}