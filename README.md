# 자유롭게 퀴즈를 풀고 탐험하세요! Quzelly

이미지 들어갈 자리

## 프로젝트 소개

- 큐알 들어갈 자리
- 배포 URL : https://quzelly.vercel.app/
  <br>
- Test ID : testyk
- Test PW : test1234
  <br>
- 큐젤리(QJelly)는 퀴즈(Quiz)와 젤리피쉬(Jellyfish)의 합성어로, 해파리처럼 자유롭게 지식을 떠다니며 나누는 웹 기반 퀴즈 플랫폼입니다.
  누구나 직접 퀴즈를 만들어 공유할 수 있고, 다양한 주제의 퀴즈를 검색해 풀어보며 지식을 쌓을 수 있습니다.
  마음에 드는 퀴즈에는 좋아요를 누르거나 댓글을 남기며 다른 사용자와 소통할 수 있어, 재미와 배움을 함께 경험할 수 있습니다.

## 개발 기간

- 전체 개발 기간 : 2025.02.24 ~ 03.24

## 팀원 구성

<br />
<div align="center">

|                 Project Manager Office                 |                        Project Manager                         |                     Project Engineer                      |                   Project Assistant                   |                      Project Leader                       |
| :----------------------------------------------------: | :------------------------------------------------------------: | :-------------------------------------------------------: | :---------------------------------------------------: | :-------------------------------------------------------: |
| <img src="https://github.com/31blue.png" width="100"/> | <img src="https://github.com/Littlestar0508.png" width="100"/> | <img src="https://github.com/photoby64.png" width="100"/> | <img src="https://github.com/yzz2y.png" width="100"/> | <img src="https://github.com/hunzooyun.png" width="100"/> |
|          [김주희](https://github.com/31blue)           |          [노종국](https://github.com/Littlestar0508)           |          [박윤경](https://github.com/photoby64)           |          [서현지](https://github.com/yzz2y)           |          [윤헌주](https://github.com/hunzooyun)           |

</div>

## 기술 스택

<div align="center">

|                             |                 |                                                                                                                                                                                                                   |
| --------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**                | 마크업          | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)                                                                                                                |
|                             | 프로그래밍 언어 | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                 |
|                             | UI 라이브러리   | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)                                                                                                                |
|                             | 라우팅          | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)                                                                                           |
|                             | 상태관리        | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white)                                                                                                          |
|                             | 스타일링        | ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)                                                                                                   |
|                             | 빌드 도구       | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                   |
|                             | 코드 품질 도구  | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) |
|                             | 디자인          | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)                                                                                                                |
| **Database**                |                 | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)                                                                                                       |
| **Package Manager**         |                 | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=black)                                                                                                                   |
| **Deployment**              |                 | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                             |
| **Version Control Systems** |                 | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                |

</div>

## SiteMap

<img width="1423" alt="Image" src="https://github.com/user-attachments/assets/7faaea98-155a-4719-98d8-d72bb4aed33a" />

## ERD

![Image](https://github.com/user-attachments/assets/5a512243-c850-42b3-ad6c-5de356fd4f81)

## 주요 기능

### [메인화면] 노종국

![Image](https://github.com/user-attachments/assets/62b33cad-bb65-4cbe-8afa-c4cc9fe460da)

- 사용자가 접속하면 가장 먼저 보게 되는 초기 화면으로, 퀴즈는 'Top 7'과 ‘추천 최신’ 순으로 표시됩니다.

- 퀴즈를 클릭하면 `'문제를 푸시겠습니까?'`라는 확인 모달 창이 나타나며, 시작하기를 누르면 퀴즈 풀이가 시작됩니다.

- 취소를 선택하면 모달이 닫히고, 다시 원래 화면으로 돌아갑니다.

### [회원가입] -윤헌주

- 아이디, 이메일 주소, 비밀번호를 입력하면 각 입력창에서 실시간으로 유효성 검사가 진행되며, 조건을 만족하지 않을 경우 입력창 하단에 경고 문구가 표시됩니다.

- 이메일 형식이 올바르지 않거나 비밀번호가 6자 미만일 경우에도 해당 입력창 하단에 경고 문구가 나타납니다.

- 모든 항목을 올바르게 작성한 후 약관 동의에 체크하면 로그인 버튼이 활성화됩니다.

- 로그인 버튼을 클릭했을 때 이메일 주소 또는 비밀번호가 일치하지 않으면 경고 문구가 표시되며, 로그인에 성공하면 홈 피드 화면으로 이동합니다.

### [로그인] -윤헌주

- 아이디와 비밀번호를 입력하면, 각 입력창에서 실시간으로 유효성 검사가 이루어지며, 조건을 만족하지 않을 경우 입력창 하단에 경고 문구가 표시됩니다.

- 유효한 아이디와 비밀번호를 입력하면, 로그인 성공을 알리는 알림창이 나타나고, 확인 버튼을 누르면 메인 화면으로 이동합니다

### [아이디, 비밀번호 재설정] -윤헌주

- 아이디를 잃어버렸을 경우 가입한 이메일을 입력하면 아이디를 찾을수 있습니다. 아이디를 알림창에 표시됩니다.
- 비밀번호를 잃어버렸을때 가입한 이메일의 주소와 새 비밀번호를 입력하면 비밀번호를 변경 할 수 있습니다.

### [카드 목록 페이지] - 노종국

- 내용

### [문제 풀이 페이지] - 노종국

- 내용

### [문제 풀이 완료 페이지] - 서현지

- 내용

### [마이페이지]

#### 1. 내 프로필 - 노종국

- 내용

<br>

#### 2. 라이브러리 - 노종국

- 내용

<br>

#### 3. 출석과 보상 - 노종국

- 내용

#### 4. 개인정보 관리 - 박윤경

- 내용
