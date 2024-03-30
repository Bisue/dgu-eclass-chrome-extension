import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://eclass.dongguk.edu/Report.do'],
  css: ['report.css'],
};

/**
 * 과제 제출률 정보 가져오기
 */
function getSubmitInfo(document: HTMLDocument) {
  const infoTable = document.querySelectorAll('#listBox .boardListWrite tbody')[1];
  if (!infoTable) {
    return false;
  }

  const tempEl = document.createElement('div');
  tempEl.innerHTML = (Array.from(infoTable.childNodes).find(el => el.nodeType == 8) as Comment).data.trim();
  document.body.appendChild(tempEl);

  const dataRaw = tempEl.innerText;
  const reportInfoDTORaw = dataRaw.split('ReportInfoDTO')[1];

  const submitCnt = Number.parseInt(reportInfoDTORaw.match(/submitCnt=([0-9]+),/)[1]);
  const lateSubmitCnt = Number.parseInt(reportInfoDTORaw.match(/lateSubmitCnt=([0-9]+),/)[1]);
  const studentCnt = Number.parseInt(reportInfoDTORaw.match(/studentCnt=([0-9]+),/)[1]);

  document.body.removeChild(tempEl);

  return {
    submitCnt: submitCnt,
    studentCnt: studentCnt,
    lateSubmitCnt: lateSubmitCnt,
    percent: ((submitCnt + lateSubmitCnt) / studentCnt) * 100,
  };
}

/**
 * Injection
 */
window.addEventListener('load', () => {
  let submitInfo: ReturnType<typeof getSubmitInfo>;

  const frame = document.querySelector("frame[name='main']") as HTMLFrameElement;
  if (frame) {
    submitInfo = getSubmitInfo(frame.contentDocument);
  } else {
    submitInfo = getSubmitInfo(document);
  }

  if (submitInfo === false) {
    return;
  }

  const outputTbody = document.querySelectorAll('#listBox .boardListWrite tbody')[0];

  const outputRow = document.createElement('tr');
  outputRow.className = 'odd-row';
  outputRow.innerHTML = `
  <th class="head first">제출률(by Extended Eclass)</th>
  <td class="last bisue-submit-tr">${submitInfo.submitCnt}(+${submitInfo.lateSubmitCnt}) / ${submitInfo.studentCnt} (${submitInfo.percent.toFixed(2)}%)</td>
  `;
  outputTbody.appendChild(outputRow);
});
