import {Character} from './Character.js'
import {generateEnemy, generateItem} from './levelDesign.js'


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
let health = 10;
// localStorage.setItem('highScores', '');

function sortObjectByValue(obj) {
    // Convert the object into an array of key-value pairs
    const sortedEntries = Object.entries(obj).sort((a, b) => a[1] - b[1]);

    // Convert the sorted array back into an object
    return Object.fromEntries(sortedEntries);
}

function updateScore() {
    // IF NEXT LEVEL RETURN TRUE, ELSE FALSE
    const scoreBoard = document.getElementById('score-board');
    const levelDisplay = document.getElementById('level-display');
    const scoreList = [1,2,3,4,5,6,7,8,9,10];
    // const scoreList = [3,6,9,12,15,18,21,24];
    // const scoreList = [5,10,15,20,25];
    score += 1;
    scoreBoard.innerText = score;
    // SET LEVEL
    if (scoreList.includes(score) ){
        level++;
        levelDisplay.innerText = 'LEVEL ' + level;
        return true;
    }
    return false;
}
function saveScoreToStorage(name,score) {

    try {
        let highScores = JSON.parse(localStorage.getItem('highScores')); // get localStorage obj
        localStorage.removeItem("highScores");//remove 'highScores' from localStorage
        highScores[name] = score; // Add name,score
        // highScores = sortObjectByValue(highScores);
        let highScores_Json = JSON.stringify(highScores) // Change to JSON format
        localStorage.setItem('highScores', highScores_Json); // Write to localStorage
    } catch {
        let highScores = {}; // Add name,score
        highScores[name] = score;
        highScores = sortObjectByValue(highScores);
        let highScores_Json = JSON.stringify(highScores) // Change to JSON format
        localStorage.setItem('highScores', highScores_Json); // Write to localStorage
    }

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



function animate(character, Obstacles, FrameStats) {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    /*------------------ CHARACTER ---------------------------*/
    character.draw(character.characterImg);

    /*------------------ ENEMY ---------------------------*/

    for (let enemy of Obstacles['enemyList']) {

        enemy.update();
        enemy.draw();

        if (enemy.y > CANVAS_HEIGHT - enemy.height || enemy.y < 0 ||
            enemy.x > CANVAS_WIDTH - enemy.width || enemy.x < 0 ) {
            enemy.reset(character.x);
        }

        if (isColliding(enemy, character)) {
            enemy.reset(character.x);

            updateHealth(-10);

            if (health <= 0) {
                character.state = 'Dead';
                character.setAnimation();
                setTimeout(()=>{
                    deadDisplayContainer.style.display = 'flex';
                },1000)
                // let name = prompt('INPUT CHAMPION NAME');
                saveScoreToStorage(localStorage.getItem('playerName'),score);
            }
        }
    }

    /*------------------ ITEM ---------------------------*/
    for (let item of Obstacles['itemList']) {

        item.update();
        item.draw();

        if (isColliding(item, character)) {

            if (item.name === 'goldCoin') {
                item.reset(character.x);
                /*------------------ NEXT LEVEL --------------------*/
                if (updateScore()){// CHECK IF LEVEL IS CHANGED THEN CHANGE ENEMY ACCORDING TO LEVEL
                    character.reset(character.x);// Move character to origin position
                    Obstacles['enemyList'] = []; // Temporarily clear all enemies
                    nextLevelTransition.style.display = 'flex';
                    nextLevelTransition.classList.add('next-level-transition');

                    setTimeout(()=>{
                        Obstacles['itemList'] = generateItem(level);
                        Obstacles['enemyList'] = generateEnemy(level);
                        nextLevelTransition.classList.remove('next-level-transition');
                    },2000) // Wait 3 seconds after create new enemies

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

Obstacles['itemList'] = generateItem(1);
/*---------------- PLAYER INITIALIZATION --------------------*/
// const gangsterImg = new Image();


let char_index = localStorage.getItem("character_index");
console.log(char_index)
// localStorage.setItem("character_index",0);

const PLAYER = new Character('resources/Characters/char'+ char_index +  '/Idle.png',char_index);
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


























