const tooltipQuotes = {
  '.play-normal-btn': ["Victory favors the bold.", "No guts, no glory.", "Conquer or be conquered."],
  '.play-casual-btn': ["Casual? Endless chaos awaits.", "Easy mode? Not really."],
  '#toggle-sound-btn': ["The sound of power.", "Feel the beat of battle."],
  '.resume-btn': ["Don’t stop now, warrior!", "Back into the fight!"],
  '.menu-btn--pause': ["Retreat… for now.", "Back to base."],
  '.play-again-btn': ["One more run.", "Fight until the end."],
  '.menu-btn--score': ["The battlefield misses you.", "Your story isn’t over."],
  '#leaderboard-btn': ["See who rules the arena.", "Legends rise here."],
  '#submit-score-btn': ["Mark your name in history.", "Submit and claim glory."]
};

const tooltip = document.getElementById('custom-tooltip');
let tooltipTimeout;

function showTooltip(el, quote) {
  clearTimeout(tooltipTimeout); // Cancel pending hide
  tooltip.textContent = quote;
  tooltip.style.visibility = 'hidden';
  tooltip.classList.remove('hidden');
  tooltip.classList.remove('show');
  tooltip.offsetWidth;

  const rect = el.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;

  let left = rect.right + 10;
  if (left + tooltipWidth > screenWidth) {
    left = rect.left - tooltipWidth - 10;
  }

  let top = rect.top + rect.height / 2;
  if (top + tooltipHeight > screenHeight) {
    top = screenHeight - tooltipHeight - 10;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.visibility = 'visible';

  requestAnimationFrame(() => {
    tooltip.classList.add('show');
  });
}

function hideTooltip() {
  tooltip.classList.remove('show');
  clearTimeout(tooltipTimeout);
  tooltipTimeout = setTimeout(() => {
    tooltip.classList.add('hidden');
  }, 250);
}

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  for (const selector in tooltipQuotes) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const quotes = tooltipQuotes[selector];

      if (isMobile) {
        el.addEventListener('click', e => {
          const alreadyShown = tooltip.classList.contains('show');

          if (!alreadyShown) {
            e.preventDefault();
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            showTooltip(el, randomQuote);
            clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(hideTooltip, 2000);
          } else {
            hideTooltip();
            setTimeout(() => {
              const event = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              });
              el.dispatchEvent(event);
            }, 300);
          }
        });
      } else {
        el.addEventListener('mouseover', () => {
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          showTooltip(el, randomQuote);
        });

        el.addEventListener('mouseout', e => {
          if (!el.contains(e.relatedTarget) && !tooltip.contains(e.relatedTarget)) {
            hideTooltip();
          }
        });
      }
    });
  }

  document.addEventListener('click', () => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      hideTooltip();
    }
  });
});