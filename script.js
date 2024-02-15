let goatHunger = 100;
let goatHappiness = 100;
let cooldown = 1;
let feedCooldown = false;
let playCooldown = false;
let goatName;
let feedButton = "feedButton";
let playButton = "playButton";
let defeatText;
let points = 0;
const bgm = new Audio('bgm.mp3');
bgm.volume = 0.05;
bgm.loop = true;
let timer;
let restartButton = '';
let backgroundMusic = true;
let rukeListe = [];
const rukeListeCap = 5;
let rukeTimer;
let happinessDifficulty = 10;
let hungerDifficulty = 10;


//Frode's mesterverk
const dead = new Audio('lyder/drept.mp3')
const fed = new Audio('lyder/godtmedmat.mp3')
const hungry = new Audio('lyder/svolten.mp3')
const playing = new Audio('lyder/leik.mp3')
const blaeShort = new Audio('lyder/kortblæ.mp3')
const blaeLong = new Audio('lyder/langblæ.mp3')



startScreen()
function startScreen() {
    document.getElementById('app').innerHTML = /*HTML*/ `
    <div class=startImage>
        <img src="img/8-28-goat.jpg"/>
    </div>
    <div class="startContainer">
        <input type="text" onchange="updateName(this.value)"/>
        <button onclick=startGame()>Start Game</button>
        <button onclick="chooseDifficulty('5', '5')">Easy Mode</button>
        <button onclick="chooseDifficulty('10', '10')">Normal Mode</button>
        <button onclick="chooseDifficulty('15', '15')">Hard Mode</button>
    </div>
    `;
}

function updateName(goatUpdate) {
    goatName = goatUpdate;

}

function startGame() {
    timer = setInterval(hungryAndSad, 4000);
    rukeTimer = setInterval(leggeTilRuke, 2000);
    bgm.play();
    updateView();
}



function updateView() {

    if (goatHunger <= 0 || goatHappiness <= 0) {
        endGame()
    }

    document.getElementById('app').innerHTML = /*HTML*/ `
     <div id="points">Points: ${points}</div>
     <div class="rukeDiv"></div>
    <button class="muteLayout" onclick="muteSound()">Mute</button>
    <div class="bars">
        <div class="venstreBar">
            <div class="svolten">
                <img src="img/Burger.png"/>
            </div>
            <div class="hungerBar">
                <div class="hungerBarFull" style="width: ${goatHunger}%">
                </div>
        </div>
        </div>
        <div class="høgreBar">
            
            <div class="playBar">
                <div class="playBarFull" style="width: ${goatHappiness}%">
                </div>
            </div>
            <div class="glad">
                <img src="/img/m00ds.png" />
            </div>
        </div>
        </div>
        ${restartButton}
        <div class="goat">
        
        <h1 class="goatName">${goatName ?? "Frode"} ${defeatText ?? ""}</h1>
        <img onclick="goatPet()" class="goatImg" src="${changePicture()}" />
        </div>
    <div class="buttons">
        <button class=${feedButton} onclick="feedGoat()" ${feedCooldown ? 'disabled' : ''}>
            Feed
        </button>
        <button class=${playButton} onclick="playGoat()" ${playCooldown ? 'disabled' : ''}>
            Play
        </button>
    </div>
    
                 
     `;

    lageRuker();
}

function feedGoat() {
    if (goatHunger < 100) {
        goatHunger += 10;
    }
    if (goatHunger >= 100) {
        goatHunger = 100;
    }
    feedCooldown = true;
    feedButton = "feedButtonDisabled";
    setTimeout(feedButtonCooldown, (cooldown * 1000))
    fed.play()
    updateView();
}

function playGoat() {
    if (goatHappiness < 100) {
        goatHappiness += 10;
    }
    if (goatHappiness >= 100) {
        goatHappiness = 100;
    }

    playCooldown = true;
    playButton = "playButtonDisabled";
    setTimeout(playButtonCooldown, (cooldown * 1000))
    playing.play()
    updateView();
}

function feedButtonCooldown() {
    feedCooldown = false;
    feedButton = "feedButton";
    updateView();
}

function playButtonCooldown() {
    playCooldown = false;
    playButton = "playButton";
    updateView();
}

function hungryAndSad() {
    goatHappiness -= happinessDifficulty;
    goatHunger -= happinessDifficulty;
    updateView();
}

function goatPet() {
    blaeShort.play();
}

function endGame() {
    feedCooldown = true;
    playCooldown = true;
    bgm.volume = 0.0;

    clearInterval(timer);

    if (goatHunger <= 0) {
        defeatText = ' sultet ihjel.';

        restartButton = '<button class="restartLayout" onclick="restartGame()">Restart</button>'
    }
    else {
        defeatText = ' stakk av.'
        restartButton = '<button class="restartLayout" onclick="restartGame()">Restart</button>'
    }
}

function restartGame() {
    location.reload()
}

function muteSound() {
    if (backgroundMusic == true) {
        bgm.volume = 0.0;
        backgroundMusic = false;
    } else if (backgroundMusic == false) {
        bgm.volume = 0.05;
        backgroundMusic = true;
    }
}




function changePicture() {
    let goatPicture = '/img/goat8.png';
    let imageNumber = Math.ceil(goatHunger / 10)
    if (goatHappiness <= 0) {
        goatPicture = "img/blank.png"
    }
    else if (imageNumber >= 8) {
        goatPicture = "img/goat8.png"
    }
    else if (goatHunger <= 0) {
        goatPicture = 'img/goatDead.png'
    }
    else {
        goatPicture = "img/goat" + imageNumber.toString() + ".png"
    }
    return goatPicture;
}



function leggeTilRuke() {
    if (rukeListe.length < rukeListeCap) {
        randomtall1 = Math.floor(Math.random() * 100)
        randomtall2 = Math.floor(Math.random() * 100)
        currentRuke = 'top: ' + randomtall1.toString() + '%;' + 'left: ' + randomtall2.toString() + '%'

        rukeListe.push(currentRuke.toString())
    }
    else {
        endGame();
        updateView();
    }
    lageRuker();
    updateView();
}

function lageRuker() {
    document.querySelector(".rukeDiv").innerHTML = /*HTML*/ ``;

    for (let i = 0; i < rukeListe.length; i++) {
        document.querySelector(".rukeDiv").innerHTML += /*HTML*/`
        <img src="img/p00p.png" class="bæsj" style="${rukeListe[i]}" onclick="fjernRuke(${i})"/>
        `
    }
}


function fjernRuke(ruke) {
    rukeListe.splice(ruke, 1)
    points++;
    lageRuker();
    updateView();
}

function chooseDifficulty(happiness, hunger){
    happinessDifficulty = happiness;
    hungerDifficulty = hunger;
}
