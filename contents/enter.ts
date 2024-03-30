import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://eclass.dongguk.edu/*'],
  //   world: 'MAIN',
  //   css: ['main.css'],
};

/**
 * Injection
 */
window.addEventListener('load', () => {
  const frame = document.querySelector("frame[name='main']") as HTMLFrameElement;

  if (frame) {
    const path = '/' + frame.getAttribute('src');

    location.href = path;
  }
});
