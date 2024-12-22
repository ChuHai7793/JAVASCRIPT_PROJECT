import {Obstacle} from "./Obstacle.js";
import {CANVAS_WIDTH, ctxGame, frameX, frameY, gameFrame} from "./animation.js";
import {characterInfo} from "./Character.js";


export class Effect  extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)
        this.sound = new Audio();
        this.sound.src = 'resources/sounds/explosions/explosion09.wav';
    }

    update() {
        super.update();

        // PLAY SOUND WHEN EXPLOSION HAPPENS
        if (this.frame === 0) {
            this.sound.volume = 0.5;
            this.sound.play();
        }

        // SLOW DOWN ANIMATION
        if (gameFrame % 7=== 0){
            this.frame > 13 ? this.frame = 0 : this.frame++ ;
        }

    }

    draw(char_index) {

        ctxGame.drawImage(this.ObstacleImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);

        }

}