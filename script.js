const sentence = 'abracadabra';
const sentenceContainer = document.querySelector('.sentence-container');
const manContainer = document.querySelector('.man-container');

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
//hide letters value
function hideLetters() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(element => {
        element.style.fontSize = '0px';
    });
}







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
window.addEventListener('keydown', (e) => {
    const letters = document.querySelectorAll('.letter');
        //look for wrong letter
        for (let i = 0; i < letters.length; i++) {
            const element = letters[i];
            if ( !sentence.includes(e.key) ) {
                const hangmanPartToShow = manContainer.querySelector('span[style="display: none;"]');
                hangmanPartToShow.style.display = "block";
                console.log(hangmanPartToShow);
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
    });




