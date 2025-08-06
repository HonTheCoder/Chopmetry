// mobile.js - touch gesture support

let touchStartX = 0;
let touchEndX = 0;

// Utility: check if in menu mode (not actively playing)
function isInMenu() {
    return document.querySelector('.menu.active') !== null;
}

// Detect swipe gestures (for menus)
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;

    // Only handle swipe if in menu
    if (!isInMenu()) return;

    if (touchEndX < touchStartX - 50) {
        // Swipe left → Main menu
        setActiveMenu(MENU_MAIN);
    }

    if (touchEndX > touchStartX + 50) {
        // Swipe right → Resume game
        resumeGame();
    }
}, { passive: true });

// Prevent iOS pinch-zoom
document.addEventListener('gesturestart', e => e.preventDefault());

// ✅ Touch slicing for gameplay (single finger)
document.addEventListener('touchstart', e => {
    if (!isInMenu()) {
        pointerIsDown = true;
        pointerScreen.x = e.touches[0].clientX;
        pointerScreen.y = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchmove', e => {
    if (!isInMenu() && pointerIsDown) {
        pointerScreen.x = e.touches[0].clientX;
        pointerScreen.y = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchend', e => {
    if (!isInMenu()) {
        pointerIsDown = false;
    }
}, { passive: true });
