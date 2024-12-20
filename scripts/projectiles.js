import {Obstacle} from "./Obstacle.js";
import {CANVAS_WIDTH, ctx, frameX, frameY, gameFrame} from "./animation.js";


export class Projectile  extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle,char_direction,char_width_hitbox) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)
        this.x_reset = x;
        this.y_reset = y;
        this.direction = char_direction;
        this.char_width_hitbox = char_width_hitbox;
    }

    update() {
        super.update();
        console.log(this.direction);
        if (this.direction === 'right'){
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }

        if (this.x >this.x_reset + 1000){
            this.x = -Infinity;
        }
        // SLOW DOWN ANIMATION
        if (gameFrame % 8=== 0){
            this.frame > 41 ? this.frame = 0 : this.frame++ ;
        }
    }

    draw() {
        if (this.direction === 'left'){
            ctx.save();
            ctx.translate(CANVAS_WIDTH, 0); // Move the origin to the right edge
            ctx.scale(-1, 1); // Flip the whole canvas

            this.x_hitbox = CANVAS_WIDTH - this.width-this.x + 2* this.char_width_hitbox;
            this.y_hitbox = this.y;
            this.width_hitbox = this.width;
            this.height_hitbox = this.height;
            ctx.strokeRect(this.x_hitbox  ,this.y_hitbox  ,this.width_hitbox ,this.height_hitbox)
            // + 2* this.char_width_hitbox
            ctx.drawImage(this.ObstacleImg, this.frame*this.spriteWidth , 0 ,this.spriteWidth ,this.spriteHeight,
                CANVAS_WIDTH - this.width- this.x + 2* this.char_width_hitbox ,this.y ,this.width ,this.height);

            // RESTORE HITBOX COORDINATE
            ctx.restore();
            this.x_hitbox = this.x;
            this.y_hitbox = this.y;
            this.width_hitbox = this.width;
            this.height_hitbox = this.height;

        }else{

            this.x_hitbox = this.x;
            this.y_hitbox = this.y ;
            this.width_hitbox = this.width;
            this.height_hitbox = this.height ;

            ctx.strokeRect(this.x_hitbox,this.y_hitbox,this.width_hitbox,this.height_hitbox);
            ctx.drawImage(this.ObstacleImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
                this.x,this.y,this.width,this.height);
        }
    }

}