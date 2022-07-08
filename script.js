const sentenceContainer = document.querySelector('.sentence-container');
const manContainer = document.querySelector('.man-container');
const gameContainer = document.querySelector('.game-container');
const container = document.querySelector('.container');
const sentence = 'abracadabra';
const alphabet = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż'];
let lives = 6;
let clicked = false;

//creates letter DOM
function createLetter(text) {
    const letterContainer = document.createElement('div');
    letterContainer.classList.add('letter-container');
    const letter = document.createElement('div');
    letter.classList.add('letter');
    letter.textContent = text; 
    const chalkLine = document.createElement('span');
    chalkLine.classList.add('chalk-line');
    letter.appendChild(chalkLine);
    letterContainer.appendChild(letter);
    sentenceContainer.appendChild(letterContainer);      
}
//creates hangman DOM and hide it
function createHangman(className) {
    const hangmanPart = document.createElement('span');
    manContainer.appendChild(hangmanPart);
    hangmanPart.classList.add(className);
    hangmanPart.style.display = 'none';
}
function startGame() {
    const banner = document.createElement('div');
    banner.classList.add('start-game-board');
    banner.textContent = 'start game';
    container.appendChild(banner);
    gameContainer.style.display = 'none';
    banner.addEventListener('click', () => {
        gameContainer.style.display = 'block';
        banner.style.display = 'none';
        setTimeout(() => {
            if ( !clicked ) {
                console.log('ciekawe czy klawisze moga sie przydac');
            }
        }, 5000);
    })
    
}
startGame();
//print game over logo
function gameOver() {
    const banner = document.createElement('div');
    banner.textContent = "game over";
    banner.classList.add('game-over');
    gameContainer.appendChild(banner);
}
function resetGame() {
    lives = 6;
    while( sentenceContainer.firstChild ){
        sentenceContainer.removeChild(sentenceContainer.firstChild)
    }
    while( manContainer.firstChild ){
        manContainer.removeChild(manContainer.firstChild);
    }
    initGame();
}

//hide letters value
function hideLetters() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(element => {
        element.style.fontSize = '0px';
    });
}

function initGame() {
[...sentence].forEach(element => {
    createLetter(element);
});
createHangman('stand');
createHangman('rope');
createHangman('head');
createHangman('body');
createHangman('body');
createHangman('body');

hideLetters();
}


// game flow
window.addEventListener('keydown', (e) => {
    const letters = document.querySelectorAll('.letter');
    const banner = document.querySelector('.game-over');
    clicked = true;
    if ( banner ){           
            banner.remove();
            resetGame();
    }
    if( !banner && alphabet.includes(e.key)){
        //look for wrong letter
        for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if ( !sentence.includes(e.key) ) {
                const hangmanPartToShow = manContainer.querySelector('span[style="display: none;"]');
                hangmanPartToShow.style.display = "block";
                lives--;
                if( lives == 0 ) {
                    gameOver();                                       
                }
                break;
            }            
        }
        //look for correct letter
        letters.forEach(element => {
            if ( e.key == element.textContent ) {
                element.style.fontSize = '60px';
                element.style.color = "white";
                element.style.transition = "color .2s";
            } 
        });
    }        
    });
initGame();

