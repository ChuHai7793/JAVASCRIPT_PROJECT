import {Character} from './Character.js'
import {Enemy, generateEnemy} from './Enemy.js'

export const GAME_CANVAS = document.getElementById('background');
export const ctx = GAME_CANVAS.getContext('2d');
export const CANVAS_WIDTH = GAME_CANVAS.width;
export const CANVAS_HEIGHT = GAME_CANVAS.height;


export const OFFSET_X = 0;
export const OFFSET_Y = 425;
export let frameX  = 0 ;
export let frameY = 0;
export let gameFrame = 0;
let health = 100;


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

    // } else {
    //     setTimeout(()=>{invulnerableFLAG = false}, 2000);
    // }

}


function isColliding(obj1, obj2) {
    return (
        obj1.x_hitbox < obj2.x_hitbox + obj2.width_hitbox &&
        obj1.x_hitbox + obj1.width_hitbox > obj2.x_hitbox &&
        obj1.y_hitbox < obj2.y_hitbox + obj2.height_hitbox &&
        obj1.y_hitbox + obj1.height_hitbox > obj2.y_hitbox
    );
}

function animate(character,enemyList,FrameStats) {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    character.draw(character.characterImg);


    /*------------------ ENEMY ---------------------------*/

    for ( let enemy of enemyList) {


        enemy.update();
        enemy.draw();
        if (enemy.y > CANVAS_HEIGHT - enemy.height|| enemy.x < 0 ) {

            enemy.reset();
            // TEMPORARY SET HITBOX OF ENEMY TO PREVENT COLLISION
            enemy.x_hitbox = 0;
            enemy.y_hitbox = 0;
            enemy.width_hitbox = 0;
            enemy.height_hitbox = 0;
        }

        if (isColliding(enemy,character)) {
            enemy.reset();
            // TEMPORARY SET HITBOX OF ENEMY TO PREVENT COLLISION
            enemy.x_hitbox = 0;
            enemy.y_hitbox = 0;
            enemy.width_hitbox = 0;
            enemy.height_hitbox = 0;

            updateHealth(-10);

            if (health <= 0) {
                character.state = 'Dead';
                character.setAnimation();
            }
        }
    }


    if (gameFrame % FrameStats.staggerFrames=== 0){

        if (frameX < FrameStats.maxFrames ) {
            frameX++;
        } else {
            if (character.state !== 'Dead'){
                frameX = 0;
            } else {

            }
        }
        gameFrame = 0;
    }


    gameFrame++;// MOVE TO NEXT FRAME



    requestAnimationFrame(()=>{animate(character,enemyList,FrameStats)});
}




/*---------------- ENEMY INITIALIZATION --------------------*/








let enemyList = generateEnemy();





/*---------------- PLAYER INITIALIZATION --------------------*/
const gangsterImg = new Image();
gangsterImg.src = 'resources/Idle.png';

const PLAYER = new Character('resources/Idle.png');
// PLAYER.characterImg.src = 'resources/Run.png';
animate(PLAYER,enemyList,PLAYER.FrameStats)

// const PLAYER2 = new Character('resources/Idle.png');
// animate(PLAYER2,PLAYER2.FrameStats)






/*--------------------------- EVENTS --------------------------------*/
// let isEventInProgress = false;
//
//
// async function handleEvent(event,func) {
//     if (isEventInProgress) {
//         console.log('Event ignored: already in progress');
//         return;
//     }
//
//     isEventInProgress = true; // Set flag to indicate the event is in progress
//     console.log('Event started');
//
//     try {
//         // Simulate async operation
//         await new Promise((resolve) => {
//             setTimeout(resolve, 2000)
//         }); // Wait 2 seconds
//         console.log('Event completed');
//     } catch (error) {
//         console.error('Error during event handling:', error);
//     } finally {
//         isEventInProgress = false; // Reset flag
//     }
// }

let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keydown", (event) => {

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
            if (event.key === 's'){
                if(PLAYER.state !== 'Jump'){
                    PLAYER.state = 'Jump';
                    PLAYER.setAnimation();
                    PLAYER.jump(event);
                }
            }
            break;
        case 'u':
            PLAYER.state = 'Shoot';
            PLAYER.setAnimation();
    }
});


bodyElement.addEventListener("keyup", (event) => {


    if ((event.key === 'z'||event.key === 'c')){
        // if (currentKey!=='s' && currentKey !== event.key){
        //
        // }
        // console.log(currentKey);
        // console.log(event.key );
        // console.log(PLAYER.state);
        // if (event.key === currentKey){
        //     PLAYER.stopRunning();
        // }
        PLAYER.stopRunning();


    }

    if (PLAYER.state !== 'Jump'){
        // event.stopPropagation();
        PLAYER.state = 'Idle';
        PLAYER.setAnimation();
    }
})


























