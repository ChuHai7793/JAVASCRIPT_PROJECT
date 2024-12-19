/*---------------- MAIN INITIALIZATION --------------------*/
import {ctx,CANVAS_WIDTH,CANVAS_HEIGHT} from './animation.js'
import {frameX,frameY} from './animation.js'
import {OFFSET_X,OFFSET_Y} from './animation.js'


export class Character {
    constructor(characterResource,char_index){
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

        switch (char_index) {
            case '0':
                this.maxJumpHeight = 200;
                this.jumpSpd = 10;
                this.gravity = 10;
                break
            case '1':
                this.maxJumpHeight = 100;
                this.jumpSpd = 10;
                this.gravity = 7;

                break;
            case '2':
                this.maxJumpHeight = 250;
                this.jumpSpd = 10;
                this.gravity = 15;
                break;
        }

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

                this.setAnimation();
            }
        },20)
    }


    /* -----------------------*/
    draw() {
        if (this.direction === 'left'){
            ctx.save();
            ctx.translate(CANVAS_WIDTH, 0); // Move the origin to the right edge
            ctx.scale(-1, 1); // Flip the whole canvas

            this.x_hitbox = CANVAS_WIDTH - this.width-this.x + 100;
            this.y_hitbox = this.y + 130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height - 100;
            ctx.strokeRect(this.x_hitbox  ,this.y_hitbox  ,this.width_hitbox ,this.height_hitbox)

            ctx.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,this.spriteWidth ,this.spriteHeight,
                CANVAS_WIDTH - this.width- this.x ,this.y ,this.width ,this.height);

            // RESTORE HITBOX COORDINATE
            ctx.restore();
            this.x_hitbox = this.x + 100;
            this.y_hitbox = this.y +130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height -100;

        }else{

            this.x_hitbox = this.x + 100;
            this.y_hitbox = this.y +130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height -100;
            ctx.strokeRect(this.x_hitbox ,this.y_hitbox , this.width_hitbox,this.height_hitbox)


            ctx.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,
                this.spriteWidth ,this.spriteHeight,
                this.x ,this.y ,this.width ,this.height);
        }
    }

    setAnimation() {

        this.characterImg.src = 'resources/Characters/char'+localStorage.getItem("character_index") + '/'+this.state + '.png';

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
                this.FrameStats.maxFrames = 3;
                this.FrameStats.staggerFrames = 8;
                break;
            case 'Jump':
                this.FrameStats.maxFrames = 9;
                this.FrameStats.staggerFrames = 20;
                break;
        }
    }

}

