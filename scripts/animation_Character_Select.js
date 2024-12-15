const gangsterCanvas = document.getElementById('character-panel');
const ctx = gangsterCanvas.getContext('2d');
const CANVAS_WIDTH = gangsterCanvas.width = 128;
const CANVAS_HEIGHT = gangsterCanvas.height = 128;


const spriteWidth = 128;
const spriteHeight = 128;
let frameX  = 0 ;
let frameY = 0;
let gameFrame = 0;
// let FrameStats = [maxFrames,staggerFrames]
function animate(img,FrameStats) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.drawImage(img, frameX*spriteWidth, frameY*spriteHeight,spriteWidth,spriteHeight,
        0,0,spriteWidth,spriteHeight);


    if (gameFrame % FrameStats.staggerFrames=== 0){
        if (frameX < FrameStats.maxFrames) frameX++;
        else frameX = 0;
    }

    gameFrame++;// MOVE TO NEXT FRAME

    return requestAnimationFrame(()=>{animate(img,FrameStats)});// UNCOMMENT TO TEST
}


let char1_ImgSrc = 'resources/Characters/char0/Idle.png'
let char2_ImgSrc = 'resources/Characters/char1/Idle.png'
let char3_ImgSrc = 'resources/Characters/char2/Idle.png'

let characters_ImgSrc_List = [char1_ImgSrc,char2_ImgSrc,char3_ImgSrc]
let character_index = 0;
function changeCharacter(){
    if (character_index<characters_ImgSrc_List.length-1){
        character_index++;
    } else {
        character_index = 0;
    }
    gangsterImg.src = characters_ImgSrc_List[character_index];
    console.log(character_index);
    localStorage.setItem('character_index', character_index);
}

////////////////////////// INITIALIZE /////////////////////////////////
const gangsterImg = new Image();
gangsterImg.src = char1_ImgSrc;
let FrameStats = {
    maxFrames: 5,
    staggerFrames:8,
}
animate(gangsterImg,FrameStats) // UNCOMMENT TO TEST


















