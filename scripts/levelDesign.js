import {Enemy} from "./Enemy.js";
import {Item} from "./Item.js";
import {CANVAS_WIDTH, char_index} from "./animation.js";



let ratio = 3/4;
const enemyType = {
    vertical_1:['resources/enemy/enemy1.png', 500, 0, 100*ratio, 80*ratio, 293, 155, 2, 90,NaN,NaN,NaN,NaN, 'vertical'],// angle 90 then the speed is fixed
    vertical_2:['resources/enemy/enemy1.png', 1200, 0, 100*ratio, 80*ratio, 293, 155, 2, 90,NaN,NaN,NaN,NaN, 'vertical'],


    horizontal_1:['resources/enemy/enemy1.png', 0, 400, 100*ratio, 80*ratio, 293, 155, 6, 0, NaN,NaN,NaN,NaN,'horizontal'],
    horizontal_2:['resources/enemy/enemy1.png', 0, 600, 100*ratio, 80*ratio, 293, 155, 6, 0, NaN,NaN,NaN,NaN,'horizontal'],

    hover_vertical_1:['resources/enemy/enemy3.png', 500, 300, 100*ratio, 80*ratio, 218, 177, NaN, 90,NaN,0.5*Math.PI/180,NaN,NaN,'hover-vertical'],


    hover_horizontal_1:['resources/enemy/enemy4.png', 500, 600, 100*ratio, 80*ratio, 213, 212, NaN, 90, 0.4*Math.PI/180,NaN,NaN,NaN,'hover-horizontal'],
    hover_horizontal_2:['resources/enemy/enemy4.png', 700, 400, 100*ratio, 80*ratio, 213, 212, NaN, 90, 0.4*Math.PI/180,NaN,NaN,NaN,'hover-horizontal'],

    diagonal_1: ['resources/enemy/enemy1.png',0, 0, 100*ratio, 80*ratio, 293, 155, 2, 50, NaN,NaN,NaN,NaN,'diagonal'],// from top right
    diagonal_2: ['resources/enemy/enemy2.png',1400, 200, 100*ratio, 80*ratio, 266, 188, 2, 150, NaN,NaN,NaN,NaN,'diagonal'],// from top left

    sin_1: ['resources/enemy/enemy1.png', 1200, 300, 100*ratio, 80*ratio, 293, 155, Math.random()  + 1, 50, NaN,NaN,NaN,NaN,'sin'],


    circle_1: ['resources/enemy/enemy1.png', 700, 300, 100*ratio, 80*ratio, 293, 155, NaN, -90, NaN,NaN,0.3,300,'circle'],
    circle_2: ['resources/enemy/enemy1.png', 500, 300, 100*ratio, 80*ratio, 293, 155, NaN, -90, NaN,NaN,0.3,300,'circle'],
    circle_3: ['resources/enemy/enemy1.png', 300, 400, 100*ratio, 80*ratio, 293, 155, NaN, -90, NaN,NaN,0.3,200,'circle'],

    arc_1:['resources/enemy/enemy1.png', 700, 500, 100*ratio, 80*ratio, 293, 155, 0.8, -90, NaN,NaN,0.3,120,'arc'],
    arc_2:['resources/enemy/enemy1.png', 700, 500, 100*ratio, 80*ratio, 293, 155, 0.8, 90, NaN,NaN,0.3,120,'arc'],
    arc_3:['resources/enemy/enemy1.png', 700, 500, 100*ratio, 80*ratio, 293, 155, 1, 45, NaN,NaN,0.4,120,'arc'],
    arc_4:['resources/enemy/enemy1.png', 700, 500, 100*ratio, 80*ratio, 293, 155, 1, -45, NaN,NaN,0.4,120,'arc'],

}



/*------------------------------------------------------- ENEMY ------------------------------------------------------------*/

/*--------------------- ALLOW BULLET ------------------------*/
export function addSingleEnemy(enemyList, ImgSrc,
                        x, y, width, height,
                        spriteWidth, spriteHeight, speed, angle,
                        angle_horizontal_speed,angle_vertical_speed,angle_circle_speed, radius,movementStyle) {
    const Enemy_Img = new Image();
    Enemy_Img.src = ImgSrc;
    enemyList.push(new Enemy(Enemy_Img, x, y, width, height, spriteWidth, spriteHeight, speed,
        angle,angle_horizontal_speed,angle_vertical_speed, angle_circle_speed, radius,movementStyle));
    return enemyList
}

export function generateEnemy(level) {
    let enemyList = []
    // enemyList = eval(`${'enemyLevel'+level}(enemyList)`);
    try {
        enemyList = eval(`${'enemyLevel'+level}(enemyList)`);
    }
    catch(err) {
        console.log(err.message);
        enemyList = enemyLevel20(enemyList);
    }

    return enemyList
}

/*------------------------- LEVEL DESIGN ENEMY ---------------------------------*/
function enemyLevel(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList,...enemyType.vertical_1);
    temp_enemyList =  addSingleEnemy(temp_enemyList,...enemyType.horizontal_1);

    return temp_enemyList;
}

function enemyLevel2(enemyList){
    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.hover_vertical_1);
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.horizontal_1);
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.vertical_2);
    return temp_enemyList
}

function enemyLevel3(enemyList){
    let temp_enemyList =  addSingleEnemy(enemyList,...enemyType.hover_horizontal_1);
    temp_enemyList =  addSingleEnemy(temp_enemyList,...enemyType.hover_horizontal_2);
    temp_enemyList = temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_1);
    temp_enemyList = addSingleEnemy(temp_enemyList,...enemyType.hover_vertical_1);

    return temp_enemyList;
}

function enemyLevel4(enemyList){
    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.diagonal_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, 'resources/enemy/enemy1.png',
        0, 0, 100, 80,
        293, 155, Math.random() * 2 + 3, 60, NaN,NaN,NaN,NaN,'diagonal');
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.diagonal_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    return temp_enemyList
}

function enemyLevel5(enemyList){
    return addSingleEnemy(enemyList, ...enemyType.sin_1);

}

function enemyLevel6(enemyList){
    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.sin_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_vertical_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    return temp_enemyList
}

function enemyLevel7(enemyList){
    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.sin_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_vertical_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_3);
    return temp_enemyList
}

function enemyLevel8(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList,...enemyType.circle_1 );
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.diagonal_1);
    return temp_enemyList
}

function enemyLevel9(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.circle_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_1);
    return temp_enemyList
}

function enemyLevel10(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.circle_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.diagonal_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_2);
    return temp_enemyList
}

function enemyLevel11(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.circle_1);
    temp_enemyList = addSingleEnemy(temp_enemyList,...enemyType.circle_2 );
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_2);
    return temp_enemyList
}

function enemyLevel12(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.circle_1);
    temp_enemyList = addSingleEnemy(temp_enemyList,...enemyType.circle_2 );
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.diagonal_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_1);
    return temp_enemyList
}

function enemyLevel13(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    return temp_enemyList
}

function enemyLevel14(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    return temp_enemyList
}

function enemyLevel15(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3);
    return temp_enemyList
}

function enemyLevel16(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_1);
    return temp_enemyList
}

function enemyLevel17(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3)

    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.vertical_2);
    return temp_enemyList
}

function enemyLevel18(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3);

    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_1);
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.horizontal_1);
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    return temp_enemyList
}

function enemyLevel19(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.sin_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.horizontal_1);
    return temp_enemyList
}

function enemyLevel20(enemyList){

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.sin_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_3);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.circle_1);
    return temp_enemyList
}

/*------------------------------------- ALLOW BULLET -------------------------------*/

// NOTICE:
// IF localStorage.setItem('Ammo','3') => The actual number of ammo can be shot is 3 - 1 = 2
// Because when press Shoot, the number of ammo will be reduced by 1
// => the projectile condition check will miss a case. if (parseInt(localStorage.getItem('Ammo'))>0)

function enemyLevel21(enemyList){
    switch(localStorage.getItem("character_index")) {
        case '0':
            localStorage.setItem('Ammo','6'); // Shoot 5 times
            break;
        case '1':
            localStorage.setItem('Ammo','2');// Shoot 1 times
            break;
        case '2':
            localStorage.setItem('Ammo','6');// Shoot 5 times
            break;
    }
    document.getElementById("bullet-number").innerHTML = localStorage.getItem("Ammo") - 1;

    let temp_enemyList = addSingleEnemy(enemyList, ...enemyType.sin_1)
    temp_enemyList =  addSingleEnemy(temp_enemyList, ...enemyType.circle_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.circle_3);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_2);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.arc_3);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_1);
    temp_enemyList = addSingleEnemy(temp_enemyList, ...enemyType.hover_horizontal_2);

    return temp_enemyList
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

export function generateItem(level){
    let itemList = []
    try {
        itemList = eval(`${'itemLevel'+level}(itemList)`);
    }
    catch(err) {
        console.log(err.message);
        itemList = itemLevel1(itemList);
    }

    // addSingleItem(itemList,'resources/item/BronzeCoin_1.png',
    //     200,0,100,80,
    //     563,564,'bronzeCoin')
    return itemList
}

/*------------------------- LEVEL DESIGN ITEM ---------------------------------*/
function itemLevel1(itemList){
    return  addSingleItem(itemList,'resources/item/GoldCoin_1.png',
        CANVAS_WIDTH - 300,400,100,80,
        563,564,'goldCoin');
}
function itemLevel2(itemList){
    return  addSingleItem(itemList,'resources/item/GoldCoin_1.png',
        CANVAS_WIDTH - 300,400,100,80,
        559,564,'goldCoin');
}