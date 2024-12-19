let highScores = JSON.parse(localStorage.getItem('highScores'));
let htmlHighScores = ''
for (let key in highScores) {

    htmlHighScores += `
        <li>
            <span class="player-name">${key}</span>
            <span class="player-score">${highScores[key]}</span>
        </li>`;
}

document.querySelector('.high-score-board ul').innerHTML = htmlHighScores;

function clearHighScores() {
    localStorage.clear();
    htmlHighScores = '';
    localStorage.setItem('character_index', '0')
    window.location.reload();

}