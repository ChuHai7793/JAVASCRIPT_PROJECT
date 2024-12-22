/*---------------- MAIN INITIALIZATION --------------------*/
import {CANVAS_WIDTH, CANVAS_HEIGHT, char_index} from './animation.js'
import {frameX,frameY} from './animation.js'
import {OFFSET_X,OFFSET_Y} from './animation.js'


export const characterInfo = {
    0: {
        y_projectile_padding:15, // To match the y position of projectile to the hand/gun when shooting
        timeOutAnimation:900,
        timeOutProjectile:0,
        maxJumpHeight:200,
        jumpSpd: 8,
        gravity: 14,
        speed: 2,
        gunSound:'resources/sounds/guns/char0_autogun.wav',
    },

    1: {
        y_projectile_padding:0,
        timeOutAnimation:1400,
        timeOutProjectile:750,
        maxJumpHeight:180,
        jumpSpd: 10,
        gravity: 10,
        speed: 2.5,
        gunSound:'resources/sounds/guns/char1_handgun.wav',

    },

    2: {
        y_projectile_padding:0,
        timeOutAnimation:600,
        timeOutProjectile:400,
        maxJumpHeight:160,
        jumpSpd: 15,
        gravity: 15,
        speed: 3,
        gunSound:'resources/sounds/guns/char1_handgun.wav',
    },

}


export class Character {
    constructor(ctxGame, characterResource,char_index){
        this.ctxGame = ctxGame;
        this.x = OFFSET_X;
        this.y = OFFSET_Y;
        this.state = 'Start'

        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.width = 128*2;
        this.height = 128*2;

        this.FrameStats = {
            maxFrames: 5,
            staggerFrames: 8
        };
        this.characterImg = new Image();
        this.characterImg.src = characterResource;
        this.direction = "right";


        this.animationId = undefined;
        this.paddingRight = 60;
        this.paddingLeft = 80;
        this.isRunning = false;

        this.x_hitbox = this.x + 100;
        this.y_hitbox = this.y +130;
        this.width_hitbox = this.width - 200;
        this.height_hitbox = this.height -100;

        this.speed = 2;

        this.maxJumpHeight = characterInfo[char_index].maxJumpHeight;
        this.jumpSpd = characterInfo[char_index].jumpSpd;
        this.gravity = characterInfo[char_index].gravity;
        this.speed = characterInfo[char_index].speed;

        this.shootingSound = new Audio();
        this.shootingSound.src = characterInfo[char_index].gunSound;

    }
    /* ------------------------------ RESET ------------------------------*/
    reset(){
        this.x = OFFSET_X;
        this.y = OFFSET_Y;
    }


    /* ------------------------------ HORIZONTAL MOVEMENT ------------------------------*/
    // Function to move the character
    run(units) {
        if (!this.isRunning) return; // Stop if not running
        this.x += units; // Update horizontal position

        if (this.x > CANVAS_WIDTH - this.width + this.paddingRight||this.x < 0 - this.paddingLeft) {
            this.x = this.x - units;
        } else {
            // Continue animation
            this.animationId = requestAnimationFrame(()=>{this.run(units)});
        }

    }

    // Function to start running
    moveRight(units) {
        if (!this.isRunning) {
            this.isRunning = true;
            this.run(units); // Start animation loop
        }
    }

    moveLeft(units) {
        if (!this.isRunning) {
            this.isRunning = true;
            this.run(-units); // Start animation loop
        }
    }

    // Function to stop running
    stopRunning() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId); // Stop animation loop
    }

    /* ------------------------------ VERTICAL MOVEMENT ------------------------------*/
    onAirCheck(){
        return this.y < OFFSET_Y
    }

    moveUp(units) {
        this.y -= units;
    }

    jump(){
        if (this.onAirCheck()===false){
            const interval = setInterval(() => {
                if (this.y > this.maxJumpHeight) {
                    this.moveUp(this.jumpSpd);
                } else {
                    clearInterval(interval);
                    this.fall()
                }
            }, 20);
        }

    }

    fall() {
        const interval = setInterval(() => {
            if (this.onAirCheck()) {
                this.moveUp(-this.gravity);
            } else {
                clearInterval(interval);

                // When there is no other events then set to idle
                if ( this.state !== 'Dead' ){
                    if (this.isRunning){
                        this.state = 'Run';
                    } else {
                        this.state = 'Idle';
                    }
                }

                this.setAnimation(char_index);
            }
        },20)
    }


    /* -----------------------*/
    draw() {
        if (this.direction === 'left'){
            this.ctxGame.save();
            this.ctxGame.translate(CANVAS_WIDTH, 0); // Move the origin to the right edge
            this.ctxGame.scale(-1, 1); // Flip the whole canvas

            this.x_hitbox = CANVAS_WIDTH - this.width-this.x + 100;
            this.y_hitbox = this.y + 130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height - 100;
            this.ctxGame.strokeRect(this.x_hitbox  ,this.y_hitbox  ,this.width_hitbox ,this.height_hitbox)

            this.ctxGame.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,this.spriteWidth ,this.spriteHeight,
                CANVAS_WIDTH - this.width- this.x ,this.y ,this.width ,this.height);

            // RESTORE HITBOX COORDINATE
            this.ctxGame.restore();
            this.x_hitbox = this.x + 100;
            this.y_hitbox = this.y +130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height - 100;

        }else{

            this.x_hitbox = this.x + 100;
            this.y_hitbox = this.y +130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height -100;
            this.ctxGame.strokeRect(this.x_hitbox ,this.y_hitbox , this.width_hitbox,this.height_hitbox)


            this.ctxGame.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,
                this.spriteWidth ,this.spriteHeight,
                this.x ,this.y ,this.width ,this.height);
        }
    }

    setAnimation(char_index) {
        // let char_index = localStorage.getItem("character_index")
        this.characterImg.src = 'resources/Characters/char'+char_index+ '/'+this.state + '.png';

        switch (this.state) {
            case 'Run':
            case 'Idle':
                this.FrameStats.maxFrames = 5;
                this.FrameStats.staggerFrames = 8;
                break;

            case 'Dead':
                this.FrameStats.maxFrames = 4;
                this.FrameStats.staggerFrames = 32;
                break;

            case 'Shoot':
                if (char_index === '0'){
                    this.FrameStats.maxFrames = 3;
                    this.FrameStats.staggerFrames = 8;
                } else if (char_index === '1'){
                    this.FrameStats.maxFrames = 11; // total frames - 1
                    this.FrameStats.staggerFrames = 18;
                }  else if (char_index === '2'){
                    this.FrameStats.maxFrames = 5; // total frames - 1
                    this.FrameStats.staggerFrames = 15;
                }
                break;

            case 'Jump':
                this.FrameStats.maxFrames = 9;
                this.FrameStats.staggerFrames = 20;
                break;
        }
    }

}

