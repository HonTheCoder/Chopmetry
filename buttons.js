const creditsNode = document.querySelector('.credits');

function setCreditsVisible(visible) {
    creditsNode.style.display = visible ? 'block' : 'none';
}

// Game Start Buttons
handleClick($('.play-normal-btn'), () => {
    playSound('click');
    setGameMode(GAME_MODE_RANKED);
    setActiveMenu(null);
    resetGame();
    setCreditsVisible(false);
});

handleClick($('.play-casual-btn'), () => {
    playSound('click');
    setGameMode(GAME_MODE_CASUAL);
    setActiveMenu(null);
    resetGame();
    setCreditsVisible(false);
});

// Pause Menu
handleClick($('.resume-btn'), () => {
    playSound('click');
    resumeGame();
});

// Back to Main Menu
handleClick($('.menu-btn--pause'), () => {
    playSound('click');
    setActiveMenu(MENU_MAIN);
    setCreditsVisible(true);
});

handleClick($('.menu-btn--score'), () => {
    playSound('click');
    setActiveMenu(MENU_MAIN);
    setCreditsVisible(true);
});
