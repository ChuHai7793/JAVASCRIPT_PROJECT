import {Character} from './Character.js'
import {generateEnemy, generateItem} from './levelDesign.js'
// import {Projectile} from "./Projectiles.js";
// import {characterInfo} from "./Character.js";
import {eventHandling} from "./eventHandling.js";
import {Obstacle} from "./Obstacle.js";
import {Effect} from "./Effect.js";



export const GAME = document.getElementById('background');
export const ctxGame = GAME.getContext('2d');
export const CANVAS_WIDTH = GAME.width;
export const CANVAS_HEIGHT = GAME.height;

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

/*---------------------------------------------- GENERAL FUNCTIONS -------------------------------------------------------*/

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
    // const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20];
    const scoreList = [3,6,9,12,15,18,21,24];
    // const scoreList = [5,10,15,20,25];
    score += 1;
    scoreBoard.innerText = score;
    // SET LEVEL
    if (scoreList.includes(score)) {
        level++;
        levelDisplay.innerText = 'LEVEL ' + level;
        return true;
    }
    return false;
}

function saveScoreToStorage(name, score) {

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


/*------------------------------FUNCTION SUPPORTING animate(character, Obstacles, FrameStats)-----------------------------*/
function slowDownAnimation(character, FrameStats) {
    if (gameFrame % FrameStats.staggerFrames === 0) {

        if (frameX < FrameStats.maxFrames) {
            frameX++;

        } else {
            if (character.state !== 'Dead') {
                frameX = 0;
            }
        }
        gameFrame = 0;
    }

    gameFrame++;// MOVE TO NEXT FRAME
}



function addToEffectList(impactObject){
    Obstacles['effectList'].push( new Effect(effectImg,impactObject.x - impactObject.width_hitbox/2,
        impactObject.y - impactObject.height_hitbox/2,774/5,788/5,
        774,788))



}
function animateEnemy(character) {

    for (let enemy of Obstacles['enemyList']) {


        enemy.update();
        enemy.draw();

        if (enemy.y > CANVAS_HEIGHT - enemy.height || enemy.y < 0 ||
            enemy.x > CANVAS_WIDTH - enemy.width  || enemy.x < 0) {
            enemy.reset(character.x);
        }


        // CHECK COLLISION BETWEEN PROJECTILE AND ENEMY
        for (let itemId=0; itemId < Obstacles['projectileList'].length; itemId++) {
            if (isColliding(Obstacles['projectileList'][itemId], enemy)) {

                addToEffectList(enemy);

                switch (char_index) {
                    case '0':
                    case '2':
                        Obstacles['projectileList'].splice(itemId, 1); // Projectile disappear on impact
                        break;
                    case '1':

                        break; // Projectile continues
                    // moving
                }
                //

                let enemyId = Obstacles['enemyList'].indexOf(enemy)
                Obstacles['enemyList'].splice(enemyId, 1);
            }
        }
        // CHECK COLLISION BETWEEN CHARACTER AND ENEMY
        if (isColliding(enemy, character)) {
            enemy.reset(character.x);

            updateHealth(-10);

            if (health <= 0) {
                character.state = 'Dead';
                character.setAnimation(char_index);
                setTimeout(() => {
                    deadDisplayContainer.style.display = 'flex';
                }, 1000)
                // let name = prompt('INPUT CHAMPION NAME');
                saveScoreToStorage(localStorage.getItem('playerName'), score);
            }
        }
    }


}

function animateItem(character) {
    for (let item of Obstacles['itemList']) {

        item.update();
        item.draw();
        // CHECK COLLISION BETWEEN CHARACTER AND ITEM
        if (isColliding(item, character)) {

            if (item.name === 'goldCoin') {
                item.reset(character.x);
                /*------------------ NEXT LEVEL --------------------*/
                if (updateScore()) {// CHECK IF LEVEL IS CHANGED THEN CHANGE ENEMY ACCORDING TO LEVEL
                    // character.reset(character.x);// Move character to origin position
                    Obstacles['enemyList'] = []; // Temporarily clear all enemies
                    nextLevelTransition.style.display = 'flex';
                    nextLevelTransition.classList.add('next-level-transition');

                    setTimeout(() => {
                        Obstacles['itemList'] = generateItem(level);
                        Obstacles['enemyList'] = generateEnemy(level);
                        nextLevelTransition.classList.remove('next-level-transition');

                        // Reset character position
                        character.reset(character.x);
                    }, 2000) // Wait 3 seconds after create new enemies

                }
            }
        }
    }
}


/*--------------------------------------------- RUN ANIMATION FOR GAME LOOP ------------------------------------------------*/

let projectileId = 0;
function animate(character, Obstacles, FrameStats) {

    ctxGame.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    /*------------------ CHARACTER ---------------------------*/
    // character.update();
    character.draw(character.characterImg);
    // Obstacles['effectList'][0].update(25,13);
    // Obstacles['effectList'][0].draw();

    /*------------------------------ PROJECTILES ---------------------------*/
    if (projectileId < Obstacles['projectileList'].length) {
        let currentProjectile = Obstacles['projectileList'][projectileId];
        let tempProjectileList = Obstacles['projectileList'].slice(0, projectileId + 1);
        // Check if the last projectile has travelled more than 300, if true, fire next projectile
        if ((currentProjectile.x - currentProjectile.x_reset < 300 && currentProjectile.direction==='right')||
        (currentProjectile.x_reset - currentProjectile.x < 300 && currentProjectile.direction==='left')){
            for (let projectile of tempProjectileList) {
                projectile.update(char_index);
                projectile.draw(char_index);
            }
        } else {
            projectileId++; // Increase projectileId also means that tempProjectileList will add next projectile to itself => Shoot new projectile
        }
    } else {
        if (Obstacles['projectileList'].length !== 0 ){
            let lastProjectile = Obstacles['projectileList'][Obstacles['projectileList'].length-1];

            // Continue animation until all projectiles go max distance
            if  (
                ((lastProjectile.x - lastProjectile.x_reset < lastProjectile.maxDistance && lastProjectile.direction==='right')||
                (lastProjectile.x_reset - lastProjectile.x < lastProjectile.maxDistance && lastProjectile.direction==='left'))&&
                lastProjectile.x > 0 && lastProjectile.x < 1600
                ){
                for (let projectile of Obstacles['projectileList']) {
                    projectile.update(char_index);
                    projectile.draw(char_index);
                }
            // Otherwise, reset projectileId and Obstacles['projectileList']
            } else {
                projectileId = 0;
                Obstacles['projectileList'] = [];
            }
        }
    }
    for (let effectId = 0;effectId< Obstacles['effectList'].length;effectId++){
        Obstacles['effectList'][effectId].update();
        Obstacles['effectList'][effectId].draw();
        setTimeout(()=>{Obstacles['effectList'].splice(effectId,1)},800)
        // for (let currentEffectId = effectId; currentEffectId < Obstacles['effectList'].length; currentEffectId ++) {
        //     Obstacles['currentEffectId'][effectId].update();
        //     Obstacles['currentEffectId'][effectId].draw();
        //     setTimeout(()=>{Obstacles['effectList'].splice(currentEffectId,1)},800)
        // }
    }

    /*------------------------- ENEMY ----------------------------------*/
    animateEnemy(character);

    /*-------------------------- ITEM ----------------------------------*/
    animateItem(character);

    /*------------------ SLOW DOWN ANIMATION ---------------------------*/
    slowDownAnimation(character, FrameStats);

    /*---------------------------- LOOP -------------------------------*/
    requestAnimationFrame(() => {
        animate(character, Obstacles, FrameStats)
    });
}

/*---------------- Obstacles['enemyList'],Obstacles['itemList'], Obstacles['projectileList'] INITIALIZATION ---------------*/
export let Obstacles = {};
let effectImg = new Image();
effectImg.src = "resources/effects/flame_explode.png";



Obstacles['effectList'] = [];

/*---------------- ENEMY INITIALIZATION --------*/
Obstacles['enemyList'] = generateEnemy(1);

/*---------------- ITEM INITIALIZATION ---------*/
Obstacles['itemList'] = generateItem(1);

/*---------------- PROJECTILE INITIALIZATION ---*/
Obstacles['projectileList'] = [];

/*------------------------------------------------------ PLAYER INITIALIZATION --------------------------------------------*/
export let char_index = localStorage.getItem("character_index");
export const PLAYER = new Character(ctxGame,'resources/Characters/char' + char_index + '/Idle.png', char_index);


/*--------------------------------------------- RUN ANIMATION -------------------------------------------------------------*/
animate(PLAYER, Obstacles, PLAYER.FrameStats)


/*----------------------------------------------- EVENT HANDLING ----------------------------------------------------------*/
eventHandling(PLAYER,char_index,Obstacles);























