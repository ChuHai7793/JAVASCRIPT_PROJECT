// import {PLAYER, char_index, Obstacles} from "./animation.js"
import {Projectile} from "./Projectiles.js";
import {characterInfo} from "./Character.js";
// import {char_index} from "./animation.js";


/*---------------- PROJECTILE IMAGE INITIALIZATION --------------------*/
let flameImg = new Image();
flameImg.src = 'resources/projectiles/flame_projectile.png';
// let flameProjectile1;
// let flameProjectile2;
// let flameProjectile3;
// let flameProjectile4;

let waterImg = new Image();
waterImg.src = 'resources/projectiles/water_projectile.png';
// let waterProjectile5;

/*---------------- EVENT HANDLING --------------------*/

export function eventHandling(PLAYER,char_index,Obstacles) {

    let bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.addEventListener("keydown", (event) => {

        if (PLAYER.state !== 'Dead') {
            switch (event.key) {
                case 'z':
                    if (PLAYER.state !== 'Shoot') { // Can't do anything while shooting
                        PLAYER.state = 'Run';
                        PLAYER.direction = 'left';
                        PLAYER.setAnimation(char_index);
                        PLAYER.moveLeft(PLAYER.speed);
                    }
                    break;
                case 'c':
                    if (PLAYER.state !== 'Shoot') { // Can't do anything while shooting
                        PLAYER.state = 'Run';
                        PLAYER.direction = 'right';
                        PLAYER.setAnimation(char_index);
                        PLAYER.moveRight(PLAYER.speed);
                    }
                    break;
                case 's':
                    if (PLAYER.state !== 'Shoot') { // Can't do anything while shooting
                        if (PLAYER.state !== 'Jump') {
                            PLAYER.state = 'Jump';
                            PLAYER.setAnimation(char_index);
                            PLAYER.jump();
                        }
                    }
                    break;
                case 'u':
                    // Can only shoot while being in Idle state and no projectile seen on screen
                    // if (PLAYER.state === 'Idle' && Obstacles['projectileList'].length === 0 && !PLAYER.onAirCheck()) {
                    if (PLAYER.state === 'Idle'  && !PLAYER.onAirCheck()) {

                        // // Keep shooting
                        let ShootIntervalId = setInterval(() => {
                            PLAYER.state = 'Shoot';
                            PLAYER.setAnimation(char_index);
                        })
                        // Shoot for 'timeOutAnimation' seconds then change to idle state, waiting time to finish animation for each character is different
                        let timeOutAnimation = characterInfo[char_index].timeOutAnimation; // char 1
                        setTimeout(() => {
                            clearInterval( ShootIntervalId );
                            PLAYER.state = 'Idle';
                            PLAYER.setAnimation(char_index);
                        }, timeOutAnimation)


                        /*-------------------- SET UP PROJECTILE OBJECTS ---------------------------*/
                        // CHARACTER 1 PROJECTILE
                        // flameProjectile1 = new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                        //     666 / 6, 300 / 6, 666, 300, 4, 0, PLAYER.direction, PLAYER.width_hitbox, 700);
                        // flameProjectile2 = new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                        //     666 / 6, 300 / 6, 666, 300, 4, 0, PLAYER.direction, PLAYER.width_hitbox);
                        // flameProjectile3 = new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                        //     666 / 6, 300 / 6, 666, 300, 4, 0, PLAYER.direction, PLAYER.width_hitbox, 700);
                        //
                        // // CHARACTER 2 PROJECTILE - MORE SPEED, LONGEST DISTANCE
                        // flameProjectile4 = new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                        //     666 / 6, 300 / 6, 666, 300, 6, 0, PLAYER.direction, PLAYER.width_hitbox, 1000);
                        //
                        // // CHARACTER 2 PROJECTILE - MORE SPEED, SHORTEST DISTANCE
                        // waterProjectile5 = new Projectile(waterImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                        //     1016 / 10, 577 / 10, 1016, 577, 2, 0, PLAYER.direction, PLAYER.width_hitbox, 300);

                        // Projectile disappear after 'timeOutProjectile'
                        let timeOutProjectile = characterInfo[char_index].timeOutProjectile;
                        setTimeout(() => {
                            switch (char_index) {
                                case '0':
                                    // Obstacles['projectileList'] = [flameProjectile1, flameProjectile2, flameProjectile3]
                                    Obstacles['projectileList'].push( new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                                        666 / 6, 300 / 6, 666, 300, 4, 0, PLAYER.direction, PLAYER.width_hitbox, 700));
                                    Obstacles['projectileList'].push( new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                                        666 / 6, 300 / 6, 666, 300, 4, 0, PLAYER.direction, PLAYER.width_hitbox, 700));
                                    Obstacles['projectileList'].push( new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                                        666 / 6, 300 / 6, 666, 300, 4, 0, PLAYER.direction, PLAYER.width_hitbox, 700));
                                    break;
                                case '1':
                                    // Obstacles['projectileList'] = [flameProjectile4]
                                    // Add a new projectile object when press shoot
                                    Obstacles['projectileList'].push(new Projectile(flameImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                                        666 / 6, 300 / 6, 666, 300, 6, 0, PLAYER.direction, PLAYER.width_hitbox, 1000));
                                    break;
                                case '2':
                                    // Obstacles['projectileList'] = [waterProjectile5]
                                    Obstacles['projectileList'].push (new Projectile(waterImg, PLAYER.x_hitbox + PLAYER.width_hitbox, PLAYER.y_hitbox,
                                        1016 / 10, 577 / 10, 1016, 577, 2, 0, PLAYER.direction, PLAYER.width_hitbox, 300));
                                    break;
                            }
                            // Obstacles['projectileList'] = [flameProjectile1,flameProjectile2,flameProjectile3]
                        }, timeOutProjectile)
                    }
            }
        }
    });


    bodyElement.addEventListener("keyup", (event) => {
        if (PLAYER.state !== 'Dead' && PLAYER.state !== 'Shoot') {
            if ((event.key === 'z' || event.key === 'c')) {
                PLAYER.stopRunning();
                if (PLAYER.state !== 'Jump' && PLAYER.state !== 'Shoot') {
                    PLAYER.state = 'Idle';
                    PLAYER.setAnimation(char_index);
                }
            }
        }
    })
}