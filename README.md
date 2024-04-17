# 동국대학교 Eclass Extension

> 동국대학교 Eclass에 기능을 추가하는 크롬 Extension

[동국대학교 Eclass](https://eclass.dongguk.edu/Main.do?cmd=viewHome)

<br>

<img width="100%" src="./img/과제 제출율.png" alt="Main Image" />

<br>

## 기능

- 과제 제출률 조회
  - 제출한 과제만 가능
  - 과제 `제출정보보기` 페이지 이동 시, 제출률 표시
- 수강자 조회 디블러링

## 환경

- [Plasmo Extension](https://docs.plasmo.com/)
- Node 18
- Chrome 112

## 설치

### 자체 빌드

- `npm install` or `pnpm install`
- `npm run build && npm run package`
- `build/` 폴더 내 `zip` 파일을 적당한 폴더에 압축해제
- 크롬 확장 프로그램 관리 -> 오른쪽 상단 개발자 모드 `ON`
- 왼쪽 상단 `압축해제된 확장 프로그램을 로드합니다.` 클릭 후, 압축해제한 폴더 선택

### 크롬 웹 스토어

- [스토어 링크 (not stable)](https://chromewebstore.google.com/detail/gpbceagdpcppnmhannjcjdbnpodkecem)
