const scrollTopButton = document.querySelector('[data-scroll-top]');
const bottomHomeButton = document.querySelector('[data-bottom-home]');

const updateScrollButtons = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const isNearBottom = scrollTop + viewportHeight >= pageHeight - 80;

  if (scrollTopButton) {
    scrollTopButton.classList.toggle('is-visible', scrollTop > 180);
  }

  if (bottomHomeButton) {
    bottomHomeButton.classList.toggle('is-visible', isNearBottom);
  }
};

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', updateScrollButtons, { passive: true });
window.addEventListener('resize', updateScrollButtons);
updateScrollButtons();
