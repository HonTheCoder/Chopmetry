const tooltipQuotes = {
  '.play-normal-btn': ["Victory favors the bold.", "No guts, no glory.", "Conquer or be conquered."],
  '.play-casual-btn': ["Casual? Endless chaos awaits.", "Easy mode? Not really."],
  '#toggle-sound-btn': ["The sound of power.", "Feel the beat of battle."],
  '.resume-btn': ["Don’t stop now, warrior!", "Back into the fight!"],
  '.menu-btn--pause': ["Retreat… for now.", "Back to base."],
  '.play-again-btn': ["One more run.", "Fight until the end."],
  '.menu-btn--score': ["The battlefield misses you.", "Your story isn’t over."]
};

const tooltip = document.getElementById('custom-tooltip');
let tooltipTimeout;

function showTooltip(el, quote) {
  tooltip.textContent = quote;
  tooltip.classList.remove('hidden');

  const rect = el.getBoundingClientRect();
  tooltip.style.left = `${rect.right + 10}px`;
  tooltip.style.top = `${rect.top + rect.height / 2}px`;

  requestAnimationFrame(() => {
    tooltip.classList.add('show');
  });
}

function hideTooltip() {
  tooltip.classList.remove('show');
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
          e.stopPropagation();
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          showTooltip(el, randomQuote);
          clearTimeout(tooltipTimeout);
          tooltipTimeout = setTimeout(hideTooltip, 2000);
        });
      } else {
        el.addEventListener('mouseenter', () => {
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          showTooltip(el, randomQuote);
        });
        el.addEventListener('mouseleave', hideTooltip);
      }
    });
  }

  document.addEventListener('click', () => {
    if (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) return;
    hideTooltip();
  });
});

if (!tooltip) console.warn("Tooltip element not found in DOM!");