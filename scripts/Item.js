import {CANVAS_WIDTH, gameFrame} from "./animation.js";
import {Obstacle} from "./Obstacle.js";


export class Item extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle,name) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)
        this.name = name;
    }

    reset(char_x) {
        // this.x = Math.floor(Math.random() * (CANVAS_WIDTH-100));

        // Coin will appear randomly on the other half of the canvas opposite to character x position
        // if character x position belong to the left half of canvas
        if (char_x <= CANVAS_WIDTH / 2) {
            this.x = Math.floor(Math.random() * (CANVAS_WIDTH / 2 - 100)) + CANVAS_WIDTH / 2;
        // if character x position belong to the right half of canvas
        } else {
            this.x = Math.floor(Math.random() * (CANVAS_WIDTH / 2 - 300)) + 300;
        }

        if (this.name === 'goldCoin') {

            this.y = 400;
        } else if (this.name === 'bronzeCoin') {

            this.y = 0;
        }
    }

    update() {
        super.update();
        if (this.name === 'bronzeCoin') {
            this.y += 2;
        }
        // SLOW DOWN ANIMATION
        if (gameFrame % 5=== 0){
            this.frame > 8 ? this.frame = 0 : this.frame++ ;
        }
    }
}

