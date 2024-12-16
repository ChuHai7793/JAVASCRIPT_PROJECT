import {CANVAS_WIDTH, gameFrame} from "./animation.js";
import {Obstacle} from "./Obstacle.js";


export class Item extends Obstacle {
    constructor(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle,name) {
        super(ObstacleImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle)
        this.name = name;
    }

    reset(char_x) {
        this.x = char_x + Math.floor(Math.random() * (CANVAS_WIDTH-400));
        this.y = 400;
    }

    update() {
        super.update();

        // SLOW DOWN ANIMATION
        if (gameFrame % 5=== 0){
            this.frame > 8 ? this.frame = 0 : this.frame++ ;
        }
    }
}

export function generateItem(){
    let itemList = []

    const Item1_Img = new Image();
    Item1_Img.src = 'resources/item/GoldCoin_1.png';
    const ITEM1_NUMBER = 1;
    for (let i=1; i<= ITEM1_NUMBER;i++){
        itemList.push(new Item(Item1_Img,200,400,100,80,
            563,564,NaN,NaN,'goldCoin'));
    }

    return itemList
}
