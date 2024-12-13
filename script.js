import { animateLoop} from "./animation.js";

console.log(window.innerWidth);
// const gangsterCanvas = document.getElementById('gangsterCanvas');
// const ctx = gangsterCanvas.getContext('2d');
// const CANVAS_WIDTH = gangsterCanvas.width = 128;
// const CANVAS_HEIGHT = gangsterCanvas.height = 128;
//
//
//
// const spriteWidth = 128;
// const spriteHeight = 128;
// let frameX  = 0 ;
// let frameY = 0;
// let gameFrame = 0;

const gangsterImg = new Image();
// gangsterImg.src = 'resources/Idle.png';
// animate(gangsterImg,5,8)

// gangsterImg.src = 'Gangsters_1/Dead.png';
// animate(gangsterImg,4,20)

// gangsterImg.src = 'Gangsters_1/Shoot.png';
// animate(gangsterImg,3,8)

// gangsterImg.src = 'resources/Run.png';
// animate(gangsterImg,5,8)

const BG_WIDTH = 1536;
const GANGSTER_WIDTH = 128;
const GANGSTER_HEIGHT = 128;
class Character {
    constructor(characterId, x, y, state) {
        this.x = x;
        this.y = y;
        this.character = document.getElementById(characterId);
        this.state = state;
        this.direction = "right";
        this.characterImg = new Image();
        this.FrameStats = {
            maxFrames: 5,
            staggerFrames: 8
        };

        this.OFFSET_X = 0
        this.OFFSET_Y = 435;
        this.paddingRight = 70;
        this.paddingLeft = 80;
        this.jumpSpd = 10;
        this.gravity = 10;

        this.animationId = undefined;
        this.isRunning = false;

        this.character.style.top = y + "px";
        this.character.style.left = x + "px";
    }

    /* ------------------------------ HORIZONTAL MOVEMENT ------------------------------*/
    // Function to move the character
     run(units) {
         if (!this.isRunning) return; // Stop if not running
         this.x += units; // Update horizontal position

         if (this.x > BG_WIDTH - this.character.width-this.paddingRight) {
             this.x = this.x - units;
             this.character.style.left = this.x + "px"; // Apply new position
         } else if(this.x < 0 - this.paddingLeft ){
             this.x = this.x - units;
             this.character.style.left = this.x + "px"; // Apply new position

         } else {
             this.character.style.left = this.x + "px"; // Apply new position
             this.animationId = requestAnimationFrame(()=>{this.run(units)}); // Continue animation
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
    changeDirection() {
        if (this.direction === "left") {
            this.character.style.transform =  "rotateY(180deg)";
        } else {
            this.character.style.transform =  "none";
        }
    }

    shoot() {

    }
    /* ------------------------------ VERTICAL MOVEMENT ------------------------------*/
    onAirCheck(){
        return this.y < this.OFFSET_Y
    }

    moveUp(units) {
        this.y -= units;
        this.character.style.top = this.y+ "px";
    }

    jump(event,maxHeight){
        const interval = setInterval(() => {
            if (this.y > maxHeight) {
                this.moveUp(this.jumpSpd);
            } else {
                clearInterval(interval);
                this.fall()
            }
        }, 20);
    }

    fall() {
        const interval = setInterval(() => {
            if (this.onAirCheck()) {
                this.moveUp(-this.gravity);
            } else {
                clearInterval(interval);

                // When there is no other events then set to idle
                if (this.isRunning){
                    this.state = 'Run';
                } else {
                    this.state = 'Idle';
                }

                this.setAnimation();
            }
        },20)
    }



    setAnimation() {
        if (this.state === 'start'){
            this.characterImg.src = 'resources/Idle.png';
            animateLoop(this.characterImg,this.FrameStats);
        } else {
            this.characterImg.src = 'resources/' + this.state + '.png';
        }
        // console.log(this.FrameStats);
        switch (this.state) {
            case 'Run':
            case 'Idle':
                this.FrameStats.maxFrames = 5;
                this.FrameStats.staggerFrames = 8;
                break;

            case 'Dead':
                this.FrameStats.maxFrames = 4;
                this.FrameStats.staggerFrames = 20;
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



const OFFSET_X = 0;
const OFFSET_Y = 435;
let PLAYER = new Character('gangsterCanvas',OFFSET_X,OFFSET_Y,'Idle');
console.log(PLAYER.character.width )
PLAYER.state = 'start';
PLAYER.setAnimation();



/*--------------------------- EVENTS --------------------------------*/
let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keydown", (event) => {
    console.log(event.key);

    switch (event.key) {
        case 'z':
            PLAYER.state = 'Run';
            PLAYER.setAnimation();
            PLAYER.moveLeft(5);
            PLAYER.direction = 'left';
            PLAYER.changeDirection();
            break;
        case 'c':
            PLAYER.state = 'Run';
            PLAYER.setAnimation();
            PLAYER.moveRight(5);
            PLAYER.direction = 'right';
            PLAYER.changeDirection();
            break;
        case 's':
            if (event.key === 's'){
                if(PLAYER.state !== 'Jump'){
                    PLAYER.state = 'Jump';
                    PLAYER.setAnimation();
                    PLAYER.jump(event,200);
                }
            }
            break;
        case 'u':
            PLAYER.state = 'Shoot';
            PLAYER.setAnimation();

    }
});


bodyElement.addEventListener("keyup", (event) => {
        if (event.key === 'a'||event.key === 'd') {
            PLAYER.stopRunning();

        }
        if (PLAYER.state !== 'Jump'){
            // event.stopPropagation();
            PLAYER.state = 'Idle';
            PLAYER.setAnimation();
        }
})

































