import {Obstacle} from "./Obstacle.js";
import {CANVAS_WIDTH, ctxGame, frameX, frameY, gameFrame} from "./animation.js";
import {characterInfo} from "./Character.js";



export class Projectile  extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle,char_direction,charWidthHitBox, maxDistance) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)
        this.x_reset = x;
        this.y_reset = y;
        this.direction = char_direction;
        this.char_width_hitbox = charWidthHitBox;
        this.maxDistance = maxDistance;
    }

    update(char_index) {
        super.update();
        // console.log(this.direction);
        if (this.direction === 'right'){
            this.x += this.speed;
            if (this.x >this.x_reset + this.maxDistance){
                this.x = -Infinity;
            }
        } else {
            this.x -= this.speed;

            if (this.x < this.x_reset - this.maxDistance){
                this.x = -Infinity;
            }
        }

        // SLOW DOWN ANIMATION
        switch(char_index){
            case '0':
                if (gameFrame % 8 === 0){
                    this.frame > 10 ? this.frame = 0 : this.frame++ ;
                }
                break;
            case '1': // STANDARD FOR FLAME PROJECTILE
                if (gameFrame % 8=== 0){
                    this.frame > 41 ? this.frame = 0 : this.frame++ ;
                }
                break;
            case '2':
                if (gameFrame % 8=== 0){
                    this.frame > 41 ? this.frame = 0 : this.frame++ ;
                }
                break;
        }
    }

    draw(char_index) {

        if (this.direction === 'left'){
            ctxGame.save();
            ctxGame.translate(CANVAS_WIDTH, 0); // Move the origin to the right edge
            ctxGame.scale(-1, 1); // Flip the whole canvas



            this.x_hitbox = CANVAS_WIDTH - this.width-this.x + 2.5* this.char_width_hitbox;
            this.y_hitbox = this.y;
            this.width_hitbox = this.width;
            this.height_hitbox = this.height


            ctxGame.strokeRect(this.x_hitbox  ,this.y_hitbox+ characterInfo[char_index]['y_projectile_padding']  ,this.width_hitbox ,this.height_hitbox)
            ctxGame.drawImage(this.ObstacleImg, this.frame*this.spriteWidth , 0 ,this.spriteWidth ,this.spriteHeight,
                CANVAS_WIDTH - this.width- this.x + 2.5* this.char_width_hitbox ,this.y + characterInfo[char_index]['y_projectile_padding'],this.width ,this.height);

            // RESTORE HITBOX COORDINATE
            ctxGame.restore();
            this.x_hitbox = this.x;
            this.y_hitbox = this.y;
            this.width_hitbox = this.width;
            this.height_hitbox = this.height;

        }else{

            this.x_hitbox = this.x;
            this.y_hitbox = this.y ;
            this.width_hitbox = this.width;
            this.height_hitbox = this.height ;

            ctxGame.strokeRect(this.x_hitbox,this.y_hitbox+characterInfo[char_index]['y_projectile_padding'],this.width_hitbox,this.height_hitbox);
            ctxGame.drawImage(this.ObstacleImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
                this.x,this.y + characterInfo[char_index]['y_projectile_padding'],this.width,this.height);

        }
    }

}