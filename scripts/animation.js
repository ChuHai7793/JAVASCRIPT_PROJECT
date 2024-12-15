import {Character} from './Character.js'
import {generateEnemy} from './Enemy.js'
import {generateItem} from './Item.js'




export const GAME_CANVAS = document.getElementById('background');
export const ctx = GAME_CANVAS.getContext('2d');
export const CANVAS_WIDTH = GAME_CANVAS.width;
export const CANVAS_HEIGHT = GAME_CANVAS.height;


export const OFFSET_X = 0;
export const OFFSET_Y = 425;
export let frameX = 0;
export let frameY = 0;
export let gameFrame = 0;

const deadDisplayContainer = document.getElementById('dead-display-container');
const nextLevelTransition = document.getElementById('next-level-transition');

let score = 0;
let level = 1;
let health = 100;


function updateScore() {
    // IF NEXT LEVEL RETURN TRUE, ELSE FALSE
    const scoreBoard = document.getElementById('score-board');
    const levelDisplay = document.getElementById('level-display');
    score += 1;
    scoreBoard.innerText = score;

    // SET LEVEL
    switch (score){
        case 1:
            level++;
            levelDisplay.innerText = 'LEVEL ' + level;
            return true

        case 2:
            level++;
            levelDisplay.innerText = 'LEVEL ' + level;
            return true

        case 3:
            level++;
            levelDisplay.innerText = 'LEVEL ' + level;
            return true

        case 4:
            level++;
            levelDisplay.innerText = 'LEVEL ' + level;
            return true
    }
    return false;
}


function updateHealth(value) {

    health = Math.max(0, Math.min(100, health + value));
    const healthBar = document.getElementById('health-bar');
    healthBar.style.width = `${health}%`;

    if (health > 50) {
        healthBar.style.backgroundColor = '#4caf50';
    } else if (health > 20) {
        healthBar.style.backgroundColor = '#ffc107';
    } else {
        healthBar.style.backgroundColor = '#f44336';
    }
}


function isColliding(obj1, obj2) {
    return (
        obj1.x_hitbox < obj2.x_hitbox + obj2.width_hitbox &&
        obj1.x_hitbox + obj1.width_hitbox > obj2.x_hitbox &&
        obj1.y_hitbox < obj2.y_hitbox + obj2.height_hitbox &&
        obj1.y_hitbox + obj1.height_hitbox > obj2.y_hitbox
    );
}


let enemyCollideFlag = false;
function animate(character, Obstacles, FrameStats) {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    /*------------------ CHARACTER ---------------------------*/
    character.draw(character.characterImg);

    /*------------------ ENEMY ---------------------------*/

    for (let enemy of Obstacles['enemyList']) {
        // if(enemyCollideFlag === true){
        //     enemy.reset();
        // }
        // enemyCollideFlag =  false;
        enemy.update();
        enemy.draw();
        if (enemy.y > CANVAS_HEIGHT - enemy.height || enemy.y < 0 ||
            enemy.x > CANVAS_WIDTH - enemy.width || enemy.x < 0 ) {
            enemy.reset();
        }

        if (isColliding(enemy, character)) {
            // console.log(enemy.x,enemy.y)
            enemy.reset(character.x);
            // console.log(enemy.x,enemy.y)
            updateHealth(-10);

            if (health <= 0) {
                character.state = 'Dead';
                character.setAnimation();
                setTimeout(()=>{
                    deadDisplayContainer.style.display = 'flex';
                },1000)
            }
        }
    }

    /*------------------ ITEM ---------------------------*/
    for (let item of Obstacles['itemList']) {
        item.update();
        item.draw();


        if (isColliding(item, character)) {
            item.reset();
            console.log(level);
            if (item.name === 'goldCoin') {

                /*------------------ NEXT LEVEL --------------------*/
                if (updateScore()){// CHECK IF LEVEL IS CHANGED THEN CHANGE ENEMY ACCORDING TO LEVEL
                    character.reset();// Move character to origin position
                    Obstacles['enemyList'] = []; // Temporarily clear all enemies
                    nextLevelTransition.style.display = 'flex';
                    nextLevelTransition.classList.add('next-level-transition');

                    setTimeout(()=>{
                        Obstacles['enemyList'] = generateEnemy(level);
                        nextLevelTransition.classList.remove('next-level-transition');
                    },3000) // Wait 3 seconds after create new enemies

                }
            }
        }
    }


    /*------------------ SLOW DOWN ANIMATION ---------------------------*/
    if (gameFrame % FrameStats.staggerFrames === 0) {

        if (frameX < FrameStats.maxFrames) {
            frameX++;
        } else {
            if (character.state !== 'Dead') {
                frameX = 0;
            }
        }        gameFrame = 0;
    }



    gameFrame++;// MOVE TO NEXT FRAME

    requestAnimationFrame(() => {
        animate(character, Obstacles, FrameStats)
    });
}


let Obstacles = {}
/*---------------- ENEMY INITIALIZATION --------------------*/


Obstacles['enemyList'] = generateEnemy(1);
/*---------------- ITEM INITIALIZATION --------------------*/

Obstacles['itemList'] = generateItem();
/*---------------- PLAYER INITIALIZATION --------------------*/
const gangsterImg = new Image();
const PLAYER = new Character('resources/Characters/char'+localStorage.getItem("character_index") +  '/Idle.png');
// PLAYER.characterImg.src = 'resources/Run.png';


animate(PLAYER, Obstacles, PLAYER.FrameStats)


/*---------------- EVENT HANDLING --------------------*/
let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keydown", (event) => {

    if (PLAYER.state !== 'Dead') {
        switch (event.key) {
            case 'z':
                PLAYER.state = 'Run';
                PLAYER.direction = 'left';
                PLAYER.setAnimation();
                PLAYER.moveLeft(5);
                break;
            case 'c':
                PLAYER.state = 'Run';
                PLAYER.direction = 'right';
                PLAYER.setAnimation();
                PLAYER.moveRight(5);
                break;
            case 's':
                if (event.key === 's') {
                    if (PLAYER.state !== 'Jump') {
                        PLAYER.state = 'Jump';
                        PLAYER.setAnimation();
                        PLAYER.jump();
                    }
                }
                break;
            case 'u':
                PLAYER.state = 'Shoot';
                PLAYER.setAnimation();
        }
    }
});


bodyElement.addEventListener("keyup", (event) => {
    if (PLAYER.state !== 'Dead') {
        if ((event.key === 'z' || event.key === 'c')) {
            PLAYER.stopRunning();
        }

        if (PLAYER.state !== 'Jump') {
            PLAYER.state = 'Idle';
            PLAYER.setAnimation();
        }
    }
})


























