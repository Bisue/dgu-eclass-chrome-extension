import type { PlasmoCSConfig } from 'plasmo';

export const config: PlasmoCSConfig = {
  matches: ['https://eclass.dongguk.edu/*'],
};

async function fetchCourses() {
  const url = `/Main.do?cmd=viewHome`;

  const response = await fetch(url);

  const html = await response.text();

  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');

  const courseRows = dom.querySelectorAll(`[name="courseDTO.courseId"] option:not(:first-child)`);

  const courseIds = [...courseRows].map(row => row.getAttribute('value').split(',')[0]);

  return courseIds;
}

async function fetchNoticesPerPage(boardInfoId: string, courseId: string, page = 1) {
  const url = `/Course.do?cmd=viewBoardContentsList&boardInfoDTO.boardInfoGubun=notice&boardInfoDTO.boardInfoId=${boardInfoId}&boardInfoDTO.boardClass=notice&boardInfoDTO.boardType=course&courseDTO.courseId=${courseId}&mainDTO.parentMenuId=menu_00048&mainDTO.menuId=menu_00056&curPage=${page}`;

  const response = await fetch(url);

  const html = await response.text();

  const parser = new DOMParser();
  const dom = parser.parseFromString(html, 'text/html');

  // all articles
  const rows = dom.querySelectorAll('table.boardListBasic tbody tr');
  // filter out pinned articles
  const filteredRows = [...rows].filter(row => {
    return !row.querySelector('td:first-child').textContent.includes('공지');
  });

  // extract article info
  const articles = filteredRows.map(row => {
    const columns = row.querySelectorAll('td');

    return {
      no: Number.parseInt(columns[0].textContent),
      title: columns[1].textContent.trim(),
      author: columns[3].textContent.trim(),
      date: columns[4].textContent.trim(),
    };
  });

  return articles;
}

async function fetchNotices(boardInfoId: string, courseId: string) {
  let articles = [];
  for (let page = 1; page < 100; page++) {
    const pageArticles = await fetchNoticesPerPage(boardInfoId, courseId, page);
    if (pageArticles.length === 0) break;

    articles = articles.concat(pageArticles);
  }

  return articles;
}

window.addEventListener('load', async () => {
  const dict = {};

  const courses = await fetchCourses();
  for (const course of courses) {
    const articles = await fetchNotices(course + 'N', course);
    dict[course] = articles;
  }

  console.log(dict);
});
