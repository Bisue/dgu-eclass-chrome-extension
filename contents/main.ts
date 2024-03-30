import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://eclass.dongguk.edu/*'],
  css: ['main.css'],
};

/**
 * Injection
 */
window.addEventListener('load', () => {
  const captionEl = document.createElement('div');
  captionEl.textContent = '이클래스 Extension이 활성화되었습니다!';
  captionEl.className = 'bisue-caption';

  document.body.appendChild(captionEl);
});
