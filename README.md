# 자유롭게 퀴즈를 풀고 탐험하세요! **Quzelly**

![Image](https://github.com/user-attachments/assets/34b025b3-4887-4f74-9e5b-f5edcd5e7751)

## 목차

- [자유롭게 퀴즈를 풀고 탐험하세요! Quzelly](#자유롭게-퀴즈를-풀고-탐험하세요-quzelly)
- [프로젝트 소개](#프로젝트-소개)
- [개발 기간](#개발-기간)
- [팀원 구성](#팀원-구성)
- [기술 스택](#기술-스택)
- [SiteMap](#sitemap)
- [UserFlow](#sitemap)
- [ERD](#erd)
- [주요 기능](#주요-기능)
  - [메인화면](#메인화면)
  - [회원가입](#회원가입)
  - [로그인](#로그인)
  - [아이디 비밀번호 재설정](#아이디-비밀번호-재설정)
  - [카드 목록 페이지](#카드-목록-페이지)
  - [문제 풀이 페이지](#문제-풀이-페이지)
  - [문제 풀이 완료 페이지](#문제-풀이-완료-페이지)
  - [마이페이지](#마이페이지)
    - [1. 내 프로필](#1-내-프로필)
    - [2. 라이브러리](#2-라이브러리)
    - [3. 출석과 보상](#3-출석과-보상)
    - [4. 개인정보 관리](#4-개인정보-관리)

## 📄 프로젝트 소개

- 큐알 들어갈 자리

- 배포 URL : https://quzelly.vercel.app/

- Test ID : likelion12

- Test PW : likelion1212

- 큐젤리(QJelly)는 퀴즈(Quiz)와 젤리피쉬(Jellyfish)의 합성어로, 해파리처럼 자유롭게 지식을 떠다니며 나누는 웹 기반 퀴즈 플랫폼입니다.
  누구나 직접 퀴즈를 만들어 공유할 수 있고, 다양한 주제의 퀴즈를 검색해 풀어보며 지식을 쌓을 수 있습니다.
  마음에 드는 퀴즈에는 좋아요를 누르거나 댓글을 남기며 다른 사용자와 소통할 수 있어, 재미와 배움을 함께 경험할 수 있습니다.

## 🗓️ 개발 기간

- 전체 개발 기간 : 2025.02.24 ~ 03.24

## 👥 팀원 구성

<br />
<div align="center">

|                 Project Manager Office                 |                        Project Manager                         |                     Project Engineer                      |                   Project Assistant                   |                      Project Leader                       |
| :----------------------------------------------------: | :------------------------------------------------------------: | :-------------------------------------------------------: | :---------------------------------------------------: | :-------------------------------------------------------: |
| <img src="https://github.com/31blue.png" width="100"/> | <img src="https://github.com/Littlestar0508.png" width="100"/> | <img src="https://github.com/photoby64.png" width="100"/> | <img src="https://github.com/yzz2y.png" width="100"/> | <img src="https://github.com/hunzooyun.png" width="100"/> |
|          [김주희](https://github.com/31blue)           |          [노종국](https://github.com/Littlestar0508)           |          [박윤경](https://github.com/photoby64)           |          [서현지](https://github.com/yzz2y)           |          [윤헌주](https://github.com/hunzooyun)           |

</div>

## 🛠️ 기술 스택

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

## 🗺️ SiteMap

<br />
<div align="center">
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/6b423454-ab6d-4575-bb11-a4a7622b5865" />
</div>
<br />
<br />

## 🧭 UserFlow

<div align="center">
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/a101e50e-07d1-455f-8570-1368ed4a076d"/>

</div>
<br />
<br />

## 🗃️ ERD

<br />
<div align="center">
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/5a512243-c850-42b3-ad6c-5de356fd4f81"/>
</div>

<br />
<br />

## 📌 주요 기능

### [메인화면]

<img src= https://github.com/user-attachments/assets/8bd5de1c-daf4-4cbe-b5d7-29a54064ce8f />
<br />
<br />

- 사용자가 접속하면 가장 먼저 보게 되는 초기 화면으로, 퀴즈는 ‘Top 7’과 ‘추천 최신’ 순으로 표시된다.

- 퀴즈를 클릭하면 '문제를 푸시겠습니까?'라는 확인 모달 창이 나타나며, 시작하기를 누르면 퀴즈 풀이가 시작된다.

- 취소를 선택하면 알림창(모달)이 닫히고, 다시 원래 화면으로 돌아간다.

- 카드에 있는 북마크를 표시하면 해당 정보가 유저의 데이터에 저장된다.
  <br />
  <br />
  <br />

### [회원가입]

![Image](https://github.com/user-attachments/assets/178faa30-7fd6-42c1-85be-550dc9c275b0)
<br />
<br />

- 아이디, 이메일 주소, 비밀번호를 입력하면 각 입력창에서 실시간으로 유효성 검사가 진행되며, 조건을 만족하지 않을 경우 입력창 하단에 경고 문구가 표시된다.

- 이메일 형식이 올바르지 않거나 비밀번호가 7자 미만 또는 16자 초과일 경우에도 해당 입력창 하단에 경고 문구가 나타난다.

- 회원가입 버튼을 클릭했을 때 모든 항목을 올바르게 작성하고 필수 약관 동의에 체크하면 회원가입이 완료되며, 로그인 화면으로 이동된다.
  <br />
  <br />
  <br />

### [로그인]

![Image](https://github.com/user-attachments/assets/cba3c4b4-adb9-4af0-84d0-d274cbb02479)
<br />
<br />

- 아이디와 비밀번호를 입력하면 각 입력창에서 실시간으로 유효성 검사가 이루어지며, 조건을 만족하지 않을 경우 입력창 하단에 경고 문구가 표시된다.

- 유효한 아이디와 비밀번호를 입력하면 로그인 성공을 알리는 알림창이 나타나고, 확인 버튼을 누르면 메인 화면으로 이동된다.
  <br />
  <br />
  <br />

### [아이디, 비밀번호 재설정]

![Image](https://github.com/user-attachments/assets/be12a1d3-7adf-431a-8262-69485a84b52d)
<br />
<br />

- 아이디를 잃어버렸을 경우, 가입한 이메일을 입력하면 아이디를 찾을 수 있다. 아이디는 알림창에 표시되며, 이후 로그인 화면으로 이동된다.

- 비밀번호를 잃어버렸을 경우, 가입한 이메일 주소와 새 비밀번호를 입력하면 비밀번호를 변경할 수 있다..
  <br />
  <br />
  <br />

### [카드 목록 페이지]

![Image](https://github.com/user-attachments/assets/582e2b96-683f-4394-a07a-7e9f583d6c53)
<br />
<br />

- 카드의 전체 목록을 데이터베이스에서 불러와 렌더링한다.

- 사용자의 선택에 따라 아이템의 렌더링 방식이 달라진다.

  - 태그를 선택하거나 최신순·인기순으로 정렬하거나 검색어를 입력한 경우, 조건에 따라 다른 결과가 렌더링된다.

- 로그인 한 사용자가 생성한 문제라면 삭제버튼 활성화가 되고, 클릭 시 삭제가 된다.
  <br />
  <br />
  <br />

### [문제 풀이 페이지]

![Image](https://github.com/user-attachments/assets/b2320d67-2895-456d-aab4-10a8511eaf78)
<br />
<br />

- 문제 풀이 페이지로 이동하면, 사용자가 최근 본 테이블에 해당 문제가 저장된다.

- 선택지는 총 4개이며, 하나는 정답이고 나머지는 오답을 나타낸다.

- 사용자가 선택지를 클릭하면 정답 여부에 따라 색상으로 구분되며, 하단에 이미지를 통해 결과가 표시된다.

- ‘해설 보기’ 버튼과 ‘다음 문제’ 버튼은 문제를 풀기 전까지 비활성화되어 클릭할 수 없다.
  <br />
  <br />
  <br />

### [문제 생성 페이지]

![Image](https://github.com/user-attachments/assets/004e4155-d687-4eb6-aa9f-4f49b01ee05b)
<br />
<br />

- 카드의 제목과 설명을 입력하고, 태그를 선택해야 한다. 사지선다형 스타일의 문제 입력창도 모두 작성해야 한다.

- 생성한 문제가 2개보다 적거나 누락된 부분이 생기면, 알림으로 어떤 부분을 놓쳤는지 이용자에게 알려준다.

- 추가 버튼과 휴지통 버튼을 활용하여 문제를 추가하고 삭제할 수 있다.
  <br />
  <br />
  <br />

### [문제 풀이 완료 페이지]

![Image](https://github.com/user-attachments/assets/bc341e40-c002-4e2c-abc1-1f9d960cccd3)
<br />
<br />

- 마지막 문제 풀이 후 ‘다음’ 버튼을 누르면 문제 풀이 완료 페이지로 이동된다. 이동 즉시 화면에 폭죽 애니메이션이 나타난다.

- 좌측에는 사용자가 풀이한 퀴즈의 이름과 점수(맞은 문제 개수/전체 문제 개수)가 출력된다.

- 우측 상단의 입력창에 댓글을 작성하고 ‘댓글 달기’ 버튼을 클릭하면, 우측 하단의 댓글 목록에 즉시 렌더링된다.

- 댓글에는 작성자의 닉네임, 레벨, 작성 시간, 내용이 순서대로 표시되며, 댓글은 최신순으로 정렬된다. 사용자는 본인이 작성한 댓글에 한해 삭제할 수 있으며, 삭제 시 해당 댓글은 즉시 목록에서 제거된다.

- 해당 퀴즈에 달린 댓글이 10개를 초과할 경우, 처음에는 10개까지만 렌더링되며, ‘댓글 더보기’ 버튼을 클릭하면 나머지 댓글이 추가로 렌더링된다.

- ‘공유’ 버튼을 클릭하면 현재 페이지의 URL이 클립보드에 복사된다.

- ‘좋아요’(하트) 버튼을 클릭하면 해당 퀴즈에 좋아요를 표시할 수 있다.

- ‘북마크’ 버튼을 클릭하면 해당 퀴즈를 북마크할 수 있으며, 북마크한 퀴즈는 마이페이지 > 라이브러리의 ‘북마크’ 탭에서 확인할 수 있다..
  <br />
  <br />
  <br />

### [마이페이지]

#### 1. 내 프로필

![Image](https://github.com/user-attachments/assets/542933e9-10b9-4c80-8855-68250e6d3c86)
<br />
<br />

- 사용자가 프로필 사진을 클릭하면, 자신의 PC에서 이미지를 업로드할 수 있다.

- PNG 확장자가 아닌 이미지이거나 2MB를 초과하는 이미지를 업로드하려고 할 경우, 동작이 차단되고 사용자에게 알림창으로 안내된다.

- 페이지에 따라 라벨의 색상이 변경되어, 사용자가 현재 위치한 페이지를 쉽게 확인할 수 있다.
  <br />
  <br />
  <br />

#### 2. 라이브러리

![Image](https://github.com/user-attachments/assets/fd64952f-2741-4262-9cce-60bc4ae61e28)
<br />
<br />

- 해당 페이지는 북마크, 최근 본, 작성글 탭으로 구성되어 있다.

- 각 탭은 사용자에게 할당된 데이터를 기반으로 렌더링된다.

- 기본적인 카드의 동작 방식은 메인 페이지와 목록 페이지와 동일하다.
  <br />
  <br />
  <br />

#### 3. 출석과 보상

<img width="1639" alt="Image" src="https://github.com/user-attachments/assets/f714e028-f7ef-4350-87c7-ad38cbe6a01d" />
<br />
<br />

- 로그인 시 출석체크가 진행되며, 해당 결과는 캘린더에 렌더링되도록 설계되어 있다.

- 데이터가 존재하는 경우에는 `update`, 존재하지 않는 경우에는 `insert`가 실행되도록 `upsert`를 활용한다.

- 한 페이지에는 5개의 카드가 렌더링되며, 페이지네이션도 함께 동작한다.
  <br />
  <br />
  <br />

#### 4. 개인정보 관리

![Image](https://github.com/user-attachments/assets/cb0a11cd-0d3c-4530-84f1-b457f376eb2f)
<br />
<br />

- 개인정보를 수정하거나 탈퇴 등의 민감한 작업을 진행하려면, 먼저 현재 비밀번호를 입력하여 본인 인증을 완료해야 한다. 비밀번호가 정확히 입력되면 개인정보 관리 페이지에 접속할 수 있다.

- 해당 페이지에서는 사용자의 아이디, 이메일, 닉네임을 확인할 수 있으며, 닉네임과 비밀번호는 유효성 검사를 통과해야만 변경이 가능하다. 조건에 맞지 않는 입력값은 실시간으로 안내 문구를 통해 피드백이 제공된다.

- 탈퇴를 원하는 경우에는 '탈퇴' 버튼을 클릭하면 한 번 더 탈퇴 여부를 묻는 알림창이 나타나며, 확인을 선택할 경우 탈퇴가 최종적으로 진행된다. 탈퇴가 완료되면 사용자 계정 정보는 시스템에서 삭제된다.

  <br />
  <br />
  <br />

## 🧾 기타 문서

### [✍️ 백로그 바로가기](https://github.com/orgs/FRONTENDBOOTCAMP-12th/projects/253)

### [📖 위키 바로가기](https://github.com/FRONTENDBOOTCAMP-12th/1Piece/wiki)

### [📝 회고 바로가기](https://github.com/FRONTENDBOOTCAMP-12th/1Piece/wiki/%F0%9F%9B%A0-%ED%9A%8C%EA%B3%A0)
