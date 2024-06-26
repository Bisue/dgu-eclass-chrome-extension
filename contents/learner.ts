import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://eclass.dongguk.edu/Learner.do*'],
  //   css: ["learner.css"]
};

/**
 * 수강자 조회 디블러링
 */
async function deblurring(document: Document) {
  try {
    const ids = Array.from(document.querySelectorAll('#listBox input[type="checkbox"]:not(#checkAll)')).map((e: HTMLInputElement) => e.value);
    const url = `https://eclass.dongguk.edu/Message.do?cmd=sendMessageForm&gubun=popup&messageSendDTO.receiverId=${ids.join(',')}&messageSendDTO.courseId=`;

    const response = await fetch(url);
    const rawHtml = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');

    const names = (doc.querySelector('.boardListPopup tr:first-child td') as HTMLElement).innerText.trim().split(',');

    const nameSlots = document.querySelectorAll('#listBox .boardListBasic tbody tr td:last-child');
    const idSlots = document.querySelectorAll('#listBox .boardListBasic tbody tr td:nth-child(5)');
    names.forEach((name, idx) => {
      nameSlots[idx].innerHTML = name;
    });
    ids.forEach((id, idx) => {
      idSlots[idx].innerHTML = id;
    });
  } catch (e) {
    alert(`뭔가 꼬임!\n${e.message}`);
  }
}

/**
 * Injection
 */
window.addEventListener('load', () => {
  const frame = document.querySelector("frame[name='main']") as HTMLFrameElement;
  if (frame) {
    deblurring(frame.contentDocument);
  } else {
    deblurring(document);
  }
});
