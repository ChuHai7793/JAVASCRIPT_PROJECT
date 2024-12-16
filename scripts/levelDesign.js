import {Enemy} from "./Enemy.js";
import {Item} from "./Item.js";


/*---------------------------------- ENEMY --------------------------------------*/
export function addSingleEnemy(enemyList, ImgSrc,
                        x, y, width, height,
                        spriteWidth, spriteHeight, speed, angle,
                        angle_horizontal_speed,angle_vertical_speed, movementStyle) {
    const Enemy_Img = new Image();
    Enemy_Img.src = ImgSrc;
    enemyList.push(new Enemy(Enemy_Img, x, y, width, height, spriteWidth, spriteHeight, speed, angle,angle_horizontal_speed,angle_vertical_speed, movementStyle));
    return enemyList
}

export function generateEnemy(level) {
    let enemyList = []
        enemyList = eval(`${'level'+level}(enemyList)`);
    return enemyList
}
/*---------------------------------- ITEM --------------------------------------*/
export function addSingleItem(itemList, ImgSrc,
                              x, y, width, height,
                              spriteWidth, spriteHeight, name) {
    const Item_Img = new Image();
    Item_Img.src = ImgSrc;
    itemList.push(new Item(Item_Img,x, y, width, height,
        spriteWidth, spriteHeight,NaN,NaN,name));
    return itemList
}

export function generateItem(){
    let itemList = []

    itemList = addSingleItem(itemList,'resources/item/GoldCoin_1.png',
        200,400,100,80,
        563,564,'goldCoin')

    // addSingleItem(itemList,'resources/item/BronzeCoin_1.png',
    //     200,0,100,80,
    //     563,564,'bronzeCoin')

    return itemList
}


/*------------------------- LEVEL DESIGN ENEMY ---------------------------------*/
function level1(enemyList){
    return  addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
        0, 400, 100, 80,
        293, 155, Math.random() * 2 + 4, 0, NaN,NaN,'horizontal',);
}


function level2(enemyList){
    return  addSingleEnemy(enemyList, 'resources/enemy/enemy3.png',
        500, 300, 100, 80,
        218, 177, NaN, 90,NaN,0.5*Math.PI/180,'hover-vertical');
}


function level3(enemyList){
    return  addSingleEnemy(enemyList, 'resources/enemy/enemy4.png',
        500, 600, 100, 80,
        213, 212, NaN,
        90, 0.4*Math.PI/180,NaN,'hover-horizontal',);
}


function level4(enemyList){
    let temp_enemyList = addSingleEnemy(enemyList, 'resources/enemy/enemy1.png',
        500, 400, 100, 80,
        293, 155, Math.random() * 2 + 4, 90, 'hover-horizontal',);
    temp_enemyList = addSingleEnemy(temp_enemyList, 'resources/enemy/enemy1.png',
        500, 0, 100, 80,
        293, 155, Math.random() * 2 + 3, Math.random() * 70, 'vertical');
    return temp_enemyList
}
