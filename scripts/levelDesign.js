import {Enemy} from "./Enemy.js";

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
    switch (level) {

        case 1:
            enemyList = [];
            enemyList = level1(enemyList);
            break;

        case 2:
            enemyList = [];
            enemyList = level2(enemyList);
            break;

        case 3:
            enemyList = [];
            enemyList = level3(enemyList);
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
    }

    return enemyList
}

/*------------------------- LEVEL DESIGN ---------------------------------*/
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