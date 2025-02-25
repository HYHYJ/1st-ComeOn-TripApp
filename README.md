# 1루와 야! 무지개 놀자~✈️

![배너](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/95375c34-6c3d-4974-99f9-a044fa3052e0)

🔗배포 URL: https://1st-come-on-trip-app.vercel.app

📅프로젝트 기간 : 2023년 8월 29일 ~ 2023년 9월 24일  
<br/>

## ✈️프로젝트 소개
YOUNG CHILLER들을 위한 청량한 여행앱! 리액트로 구성된 여행 대표앱 '야놀자'를 모티브로 하는  기능과 심플한 UI/UX에 중점을 둔 앱, 야무지개놀자 여행앱입니다.

<br/>

## 🦁목차

1. [팀 소개](#팀-소개)
2. [담당 페이지](#담당-페이지)
3. [기술 스택](#기술-스택)
4. [프로젝트 구조](#프로젝트-구조)
5. [화면 구성](#화면-구성)
6. [프로젝트 소감](#프로젝트-소감)

<br/>

## 🌈팀 소개

|                             🐤강경민                             |                             🐻김종윤                             |                            🎧️신명화                            |                             🐇장효윤                             |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :-------------------------------------------------------------: | :--------------------------------------------------------------: |
| ![캐릭터](https://avatars.githubusercontent.com/u/131448929?v=4) | ![캐릭터](https://avatars.githubusercontent.com/u/130979302?v=4) | ![캐릭터](https://avatars.githubusercontent.com/u/73214037?v=4) | ![캐릭터](https://avatars.githubusercontent.com/u/101866872?v=4) |
|            [Github 주소](https://github.com/minomad)             |            [Github 주소](https://github.com/whddbsl)             |         [Github 주소](https://github.com/MyoungHwaShin)         |             [Github 주소](https://github.com/HYHYJ)              |

<br/>

## 💻담당 페이지

### 🐤강경민 (조장)

- 🌈메인 페이지

  - 광고 배너 스와이퍼
  - 호텔 카테고리 리스트 렌더링

- 🏨호텔 / 숙소

  - 호텔 카테고리 리스트 렌더링
  - 호텔 상세정보 리스트 렌더링
  - 호텔 지도 api 호출
  - 숙소 상세정보 리스트 렌더링
  - 리뷰 CRUD
  - 관리자 페이지 (호텔 정보 수정)

- 🔒로그인 / 회원가입

  - 유효성 검사
  - 아이디, 이메일, 닉네임 중복 검사
  - 인증 (로그인 회원만 찜, 예약, 장바구니, 마이페이지 이용 가능)

- ❤️찜

  - 찜한 호텔 / 레저 추가 및 삭제

- 🔖장바구니
  - 선택한 상품 삭제
  - 선택한 상품 결제
  - 선택한 상품 가격 표시

### 🐻김종윤

- 🎡레저 / 티켓

- 🚐교통 / 항공

- 🔖장바구니

### 🎧️신명화 (스크럼 마스터)

- :book: 마이페이지 - 나의 예약 
   - 예약 내역 리스트 렌더링
   - 각 예약 내역 상세보기
- :tada:  마이페이지 - 나의 후기
  - 후기 내역 리스트 렌더링
  - 해당 후기 바로가기
- :hand: 마이페이지 - 회원정보
  - 비밀번호 확인 페이지
  - 닉네임, 비밀번호, 배경, 프로필 사진 변경
- :balloon:  마이페이지 - 1:1문의
  - 문의 내역 리스트 렌더링
  - 문의 생성/삭제
  - 문의 내역 수정
- :crown: 마이페이지 - 상담원 연결
  - 채팅 - 실시간 송신 가능(DB)
- :computer: 로그아웃
- :whale: 회원탈퇴


### 🐇장효윤
- 🌈메인 페이지
  - 배너

- 🌏지역 페이지
  - 지역 숙소 리스트
  - 지도 API 기능 사용
  - 지도에 위치 표시
  - 지도 위치 지정 기능 

- 🧭내주변 페이지
  - 지도 API 기능 사용
  - 숙소/레저 위치 지도 기능
  - 추천 숙소 리스트
  
- 🔍검색 페이지
  - 숙소/레저/교통 검색기능
  - 최근 검색어 기능

<br/>

## 📚기술 스택

[![My Skills](https://skillicons.dev/icons?i=html,css,tailwind,javascript,react,vite,vercel,git,github,figma)](https://skillicons.dev)
![zustand](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/0f5f178b-381c-44de-8f5f-7ec6ce1045c9)
![react-query](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/3b6bfa41-463d-4c22-9b5f-4ca215b7c767)
![framer-motion](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/eca9548d-af1d-4de3-b5c3-2313c9cac184)
![pb](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/75b04053-0d9f-42bb-b88c-b50b52c5e6f7)

<br/>

## 📁프로젝트 구조

<details>

```
📦src
 ├─📂api
 │  └📜usePocketData.js
 ├─📂components
 │  ├─📜AroundList.jsx
 │  ├─📜AroundMap.jsx
 │  ├─📜Button.jsx
 │  ├─📜CartController.jsx
 │  ├─📜Category.jsx
 │  ├─📜CustomDate.jsx
 │  ├─📜Entertainment.jsx
 │  ├─📜Exhibition.jsx
 │  ├─📜Form.jsx
 │  ├─📜Guest.jsx
 │  ├─📜Header.jsx
 │  ├─📜Hotel.jsx
 │  ├─📜HotelInfoCategory.jsx
 │  ├─📜HotelIntro.jsx
 │  ├─📜HotelList.jsx
 │  ├─📜HotelReviewEdit.jsx
 │  ├─📜HotelService.jsx
 │  ├─📜Input.jsx
 │  ├─📜Kakao.jsx
 │  ├─📜LeisureBrand.jsx
 │  ├─📜LeisureButton.jsx
 │  ├─📜LeisureCategory.jsx
 │  ├─📜LeisureInfoCategory.jsx
 │  ├─📜LeisureLink.jsx
 │  ├─📜LeisureProduct.jsx
 │  ├─📜LeisureProductInfo.jsx
 │  ├─📜LocationChoice.jsx
 │  ├─📜LocationMap.jsx
 │  ├─📜LocationSideButton.jsx
 │  ├─📜LocationSideButtonList.jsx
 │  ├─📜MetaTag.jsx
 │  ├─📜MyBasicButton.jsx
 │  ├─📜MyChatMessage.jsx
 │  ├─📜MyCircleProfile.jsx
 │  ├─📜MyForm.jsx
 │  ├─📜MyInput.jsx
 │  ├─📜MyList.jsx
 │  ├─📜MyNewQna.jsx
 │  ├─📜MyQnaTemplate.jsx
 │  ├─📜MySelecModal.jsx
 │  ├─📜NumberOfPeople.jsx
 │  ├─📜SearchFavorite.jsx
 │  ├─📜SearchHotel.jsx
 │  ├─📜SearchLeisure.jsx
 │  ├─📜SearchRecent.jsx
 │  ├─📜SearchResult.jsx
 │  ├─📜SearchTraffic.jsx
 │  ├─📜SelectModal.jsx
 │  ├─📜Spinner.jsx
 │  ├─📜TrafficCategory.jsx
 │  ├─📜TrafficReserveButton.jsx
 │  ├─📜WishCart.jsx
 │  └─📜WishList.jsx
 ├─📂Hook
 │  └─📜useStorage.js
 ├─📂layout
 │  ├─📜Navigation.jsx
 │  └─📜RootLayout.jsx
 ├─📂pages
 │  ├─📜AirlinePage.jsx
 │  ├─📜AppInstallPage.jsx
 │  ├─📜AroundPage.jsx
 │  ├─📜BookingPage.jsx
 │  ├─📜CartPage.jsx
 │  ├─📜ExhibitionDetailPage.jsx
 │  ├─📜FindPage.jsx
 │  ├─📜HotelDetailPage.jsx
 │  ├─📜HotelPage.jsx
 │  ├─📜HotelReviewPage.jsx
 │  ├─📜HotelRoomDetailPage.jsx
 │  ├─📜HotelRoomPage.jsx
 │  ├─📜LeisureBrandPage.jsx
 │  ├─📜LeisureDetailPage.jsx
 │  ├─📜LeisureListPage.jsx
 │  ├─📜LeisurePage.jsx
 │  ├─📜LeisureThemePage.jsx
 │  ├─📜LocationDetailPage.jsx
 │  ├─📜LocationPage.jsx
 │  ├─📜MainPage.jsx
 │  ├─📜MyBookingDetailPage.jsx
 │  ├─📜MyBookingPage.jsx
 │  ├─📜MyChatPage.jsx
 │  ├─📜MyInfoChangePage.jsx
 │  ├─📜MyInfoPage.jsx
 │  ├─📜MyNewQnaPage.jsx
 │  ├─📜MyPage.jsx
 │  ├─📜MyQnaDetailPage.jsx
 │  ├─📜MyQnaPage.jsx
 │  ├─📜MyReviewPage.jsx
 │  ├─📜MyWithdrawalPage.jsx
 │  ├─📜SearchDetailPage.jsx
 │  ├─📜SearchPage.jsx
 │  ├─📜SignInPage.jsx
 │  ├─📜SignUpPage.jsx
 │  ├─📜TrafficCarDetailPage.jsx
 │  ├─📜TrafficCarPage.jsx
 │  ├─📜TrafficDetailPage.jsx
 │  ├─📜TrafficPage.jsx
 │  ├─📜TrafficTrainPage.jsx
 │  └─📜WishPage.jsx
 ├─📂store
 │  ├─📜middleware.js
 │  ├─📜useAuthStore.js
 │  └─📜zustand.js
 ├─📂styles
 │  └─📜tailwind.css
 ├─📂utils
 │  ├─📜debounce.js
 │  ├─📜getPbImageURL.js
 │  ├─📜numberWithComma.js
 │  ├─📜regEx.js
 │  └─📜ScrollToTop.js
 ├─📜App.jsx
 ├─📜main.jsx
 └─📜routes.jsx
```

</details>

<br/>

## 📱화면 구성

### 메인 페이지

| 배너 | 메인 | 푸터 |
| :-------------: | :-------------: | :-------------: |
| ![메인 1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/d53679ab-e0b7-4008-a8bf-06f3834d6e67) | ![메인 2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/51fe19d9-2306-4ddd-a2a8-83cc5d080049) | ![메인 3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/1fc957e4-0903-43f7-854c-cc1921595551) |

### 호텔 페이지

| 국내 리스트 | 해외 리스트 | 상세 페이지 |
| :-----------: | :-----------: | :-----------: |
| ![호텔1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/7de036ea-e8df-446a-ae91-49fbb892f0cd) | ![호텔2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/e41ad3e3-fa28-4e03-8104-2d61421f1a26) | ![호텔3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/d6b4fed7-ad6a-4fa5-8f16-a63e24a9bba1) |

| 호텔 위치 | 호텔 소개 | 호텔 후기 |
| :-----------: | :-----------: | :-----------: |
| ![호텔4](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/5e01b1c7-9749-4a67-acd2-3185013d4370) | ![호텔5](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/592347b4-d9e9-474f-967a-3301cc4e3466) | ![호텔6](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/4bfeecb5-10b4-45dc-980a-106f91e2ac30) |

| 숙소 선택 | 숙소 상세 | 숙소 예약 |
| :-----------: | :-----------: | :-----------: |
| ![호텔7](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/565a4f64-d271-4243-9480-32ef550e4a55) | ![호텔8](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/c28634e5-941f-4a64-bf24-71e56c125c39) | ![호텔9](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/49d4de8a-0f3e-4580-93c4-2bf00003c724) |

### 관리자 페이지

| 관리자 계정 | 호텔 정보 수정 | 수정 완료 |
| :-----------: | :-----------: | :-----------: |
| ![관리자1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/472b6007-3c21-4649-9b48-372e3f10c1aa) | ![관리자2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/b0c887cb-4e2b-40ee-b1f7-5bd60236ae3d) | ![관리자3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/50e36cd3-2a96-4843-8af1-ea3e253c0de5)|

### 항공 페이지

| 항공 페이지 | 도착지 선택 | 항공 페이지 |
| :-----------: | :-----------: | :-----------: |
| ![항공1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/d52f467e-5c22-4829-b34a-d5cdf4eda646) | ![항공2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/b212ac3e-8766-4bf2-b330-f1e98a7eb832) | ![항공3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/81f652c7-8aa6-4f69-b146-798ab580b18b) |


### 교통 페이지

| 교통 페이지 | 기차 선택 | 다운로드 |
| :-----------: | :-----------: | :-----------: |
| ![교통1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/e9f97308-4fd1-441a-84ec-db6e3f659145) | ![교통2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/179e943b-1259-4b0c-b968-98cdbacddeb3) | ![교통3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/b0159663-30be-4cea-afc0-a5cd0068752d) |

| 렌터카 전체 | 렌터카 상세 | 렌터카 예약 |
| :-----------: | :-----------: | :-----------: |
| ![교통4](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/b85ba4dd-aa00-4bbd-8f50-d28b5728986d) | ![교통5](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/ef152226-3988-41dd-a4af-4c8506fc8995) | ![교통6](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/90e51f12-4b97-46c3-aa2f-ccbfff3e782e) |


### 레저 페이지

| 레저 전체 | 지역별 전시 | 테마파크 |
| :-----------: | :-----------: | :-----------: |
| ![레저1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/98fdfab5-27b2-4e2c-a387-ac035908e84e) | ![레저2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/e11d9dbb-977b-4e0c-a0fa-1dbe3aff2c47) | ![레저3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/9fb9f3b1-1169-4593-976b-cca8f1a77306) |

| 인기 브랜드 | 레저 상세 | 레저 예약 |
| :-----------: | :-----------: | :-----------: |
| ![레저4](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/b160a90b-9003-483a-ae3c-856a801310f1) | ![레저5](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/831f3a8d-321e-43cc-8f69-9c996f4ebb10) | ![레저6](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/661bb018-b9cc-4f71-b887-6579214daeba) |

### 지역 페이지

| 지역별 | 지역별 리스트 | 지도검색 |
| :-----------: | :-----------: | :-----------: |
| ![지역1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/18924bb0-7a98-421b-bd31-e137bb125cca) | ![지역2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/402dab95-84c5-48f2-af7c-cc00dfdf7f38) | ![지역3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/daeb7e0e-0d38-489a-8c64-58650b9081f9) |

### 내 주변 페이지

| 내 주변 | 내 주변 숙소 | 내 주변 레저 |
| :-----------: | :-----------: | :-----------: |
| ![내주변1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/fced9633-7b9a-44d0-8a61-fc6667706cef) | ![내주변2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/ad544fcc-550e-48ab-a902-f00bb4bc8999) | ![내주변3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/9cb9fd71-1f68-4515-b7d7-0a22901d95da) |

### 검색 페이지

| 숙소 검색 | 최근 검색 | 레저 검색 |
| :-----------: | :-----------: | :-----------: |
| ![검색1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/3250f00b-043a-4f6c-a6b8-f67b35649ef2) | ![검색2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/43b6ac81-0162-4592-837e-5d66a1d5b8c5) | ![검색3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/898ae40b-73cf-4ddb-90a1-4fdff9242818) |


### 로그인 / 회원가입 페이지

| 로그인 | 회원가입 | 비밀번호 찾기 |
| :-----------: | :-----------: | :-----------: |
| ![로그인](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/02abbd2a-3b91-4810-bfe2-c59b34a31793) | ![회원가입](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/4d6ce1f0-9b49-4a31-8554-20da515f1ce5) | ![비밀번호찾기](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/07f8d7ca-fd62-48df-acf0-5bb12c8272cd) |

### 찜 페이지

| 찜한 목록 | 찜한 숙소 | 찜한 레저 |
| :-----------: | :-----------: | :-----------: |
| ![찜1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/f6717080-39db-44b8-80f5-e547f912edd1) | ![찜2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/f53f75c7-4fbc-49ee-8027-c9613f85844c) | ![찜3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/e844aba5-37d8-426e-b8b1-8a05c9960889) |

### 장바구니 페이지

| 장바구니 | 숙소 | 레저 |
| :-----------: | :-----------: | :-----------: |
| ![장바구니1](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/2b0491c7-9f29-42d6-96e5-ab844e9201fa) | ![장바구니2](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/70805894-0883-47dd-8db9-4c0765b51df4) | ![장바구니3](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/09fa0f56-c388-4131-ad60-4435d997c482) |

### 마이 페이지

| 로그인 유도 | 마이 페이지 | 나의 예약 |
| :-----------: | :-----------: | :-----------: |
| ![로그인유도](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/9457d552-1379-4a09-a82e-f5a9381d065e) | ![마이페이지](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/0819eb68-86ed-44ad-9909-43b4a7759bf5) | ![나의예약](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/85a184ae-9a3a-4309-8820-1aae9cc11a36) |

| 결제 내역 | 나의 후기 | 정보변경 |
| :-----------: | :-----------: | :-----------: |
| ![결제내역](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/af6aab09-adb0-47a0-985e-2ac877ad712a) | ![나의후기](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/b5006e81-0a81-40d8-8da3-f7b212639201) | ![정보변경](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/32d54d26-d957-420a-9347-520b94544308) |

| 정보변경 | 상담원 연결 | 상담원 채팅 |
| :-----------: | :-----------: | :-----------: |
| ![정보변경](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/57e18b9c-6b5a-4900-9321-1fd41bf08c26) | ![상담원 연결](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/4bef0cf5-d322-436a-82e7-9011a5b9fe88) | ![상담원 채팅](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/775b6517-1557-4458-b1e3-2ac8f9d29533) |

| 1:1문의 | 문의 내역 | 회원 탈퇴 |
| :-----------: | :-----------: | :-----------: |
| ![1:1문의](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/7f199b46-eb2f-4d3f-bf2e-1c5061dbe6b4) | ![문의내역](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/6b01e02f-b3be-4ae2-89f5-6409848fc61a) | ![회원탈퇴](https://github.com/FRONTENDSCHOOL6/1st-ComeOn-TripApp/assets/131448929/956dad52-24e7-46e8-a8c5-d0d34b53c18b) |

<br/>

## 💬프로젝트 소감

### ✈️ 강경민

```
프로젝트를 통해서 혼자서는 경험할 수 없는 여러가지 상황들을 맞이하면서 많이 배울 수 있었고
프로젝트의 규모가 커지면서 컴포넌트 분리와 상태 관리의 중요성을 느낄 수 있는 프로젝트였습니다.
그리고 좋은 팀원들 덕분에 하고 싶었던 여행 테마의 프로젝트를 진행할 수 있었고
끝까지 완주한 1루와조 모두 감사합니다.
```

### ✈️ 김종윤

```
길었던 리액트 프로젝트를 하며 협업의 중요성을 다시 한번 느꼈습니다.
또한 컴포넌트 분리 및 재사용 가능에 대한 중요성을 느낄 수 있었습니다.
파이널 프로젝트를 좋은 팀원과 할 수 있어서 마무리까지 잘 할 수 있었던 것 같습니다.
끝까지 웃으면서 프로젝트를 완성한 팀원들에게 감사합니다!
```

### ✈️ 신명화

```
멀게 느껴졌던 ERD와 리액트를 이해하고 쓸 수 있게 되었습니다.
컴포넌트 구조를 이해하는데에 도움이 되었습니다. 프로젝트로 파악한
부족한 부분을 채워나가 좋은 개발자로 성장하겠습니다.
마지막 프로젝트라는 부담에도 최선을 다 해준 팀원들에게 감사합니다 😍
```

### ✈️ 장효윤

```
이번 프로젝트를 통해 리액트의 장점과 수업에서 배운 내용들이 어떻게 쓰이는지 확실히
알게 되었습니다. 그리고 저희 1루와조 정말 감사드립니다. 어려운 내용을 척척 알려주시고 도와주신
갓민님, 꼼꼼하게 스크럼마스터를 해주시고  프로젝트에 엄청난 추진력을 주신 갓명화님,
빛의 속도로 프로젝트를 이끌어가신 갓종윤님 모두 감사합니당! 리액트 정말 힘들었는데
이번 프로젝트로 다시 마음 잡게 되었습니당✨❤️
```
