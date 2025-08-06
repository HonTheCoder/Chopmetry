// controls.js - pause key
window.addEventListener('keydown', e => {
    if (e.key === 'p') {
        isPaused() ? resumeGame() : pauseGame();
    }
});
