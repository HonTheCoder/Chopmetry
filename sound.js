// sound.js - handles background music and SFX
const sounds = {
    click: new Audio('sounds/click.wav'),
    gameover: new Audio('sounds/gameover.wav'),
    menu: new Audio('sounds/menu.mp3'),
    bgm: new Audio('sounds/bgm.mp3')
};

// Settings for music tracks
sounds.menu.loop = true;
sounds.menu.volume = 0.5;

sounds.bgm.loop = true;
sounds.bgm.volume = 0.5;

// Utility functions
function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play();
    }
}

function stopAllMusic() {
    sounds.menu.pause();
    sounds.bgm.pause();
    sounds.menu.currentTime = 0;
    sounds.bgm.currentTime = 0;
}

function playMenuMusic() {
    if (sounds.menu.paused) {
        stopAllMusic();
        sounds.menu.play();
    }
}

function playGameMusic() {
    if (sounds.bgm.paused) {
        stopAllMusic();
        sounds.bgm.play();
    }
}

// Patch setActiveMenu to handle music transitions
const originalSetActiveMenu = window.setActiveMenu;
window.setActiveMenu = function (menu) {
    originalSetActiveMenu(menu);

    if (menu === MENU_MAIN) {
        playMenuMusic();
    } else if (menu === null) {
        playGameMusic();
    }
};

// Ensure menu music plays on first load
document.addEventListener('DOMContentLoaded', () => {
    const startMusicOnce = () => {
        if (state.menus.active === MENU_MAIN) {
            playMenuMusic();
        }
    };

    document.body.addEventListener('click', startMusicOnce, { once: true });
    document.body.addEventListener('touchstart', startMusicOnce, { once: true });
});

// 🔊 Toggle Mute Button Logic
const toggleSoundBtn = document.getElementById('toggle-sound-btn');
let isMuted = false;

function updateToggleButtonText() {
    toggleSoundBtn.textContent = isMuted ? ' SOUND: OFF' : ' SOUND: ON';
}

// Update volumes based on mute state
document.addEventListener('DOMContentLoaded', () => {
    const toggleSoundBtn = document.getElementById('toggle-sound-btn');
    let isMuted = false;

    function updateToggleButtonText() {
        if (toggleSoundBtn) {
            toggleSoundBtn.textContent = isMuted ? 'SOUND: OFF' : 'SOUND: ON';
        }
    }

    function applyMuteState() {
        // Mute or unmute ALL sounds
        Object.values(sounds).forEach(audio => {
            audio.volume = isMuted ? 0 : 0.5;
        });
    }

    if (toggleSoundBtn) {
        toggleSoundBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            applyMuteState();
            updateToggleButtonText();
        });

        updateToggleButtonText();
        applyMuteState();
    }
});
