# 🚌 버스 메이트 (BusMate) - AI 기반 고령자 맞춤형 버스 안내 앱 (MVP)

**BusMate**는 고령자들이 대중교통을 보다 쉽고 안전하게 이용할 수 있도록 돕는 스마트 모바일 앱입니다.  
사용자의 **나이**와 **건강 상태** 정보를 기반으로, 개인 맞춤형 버스 노선과 알림 서비스를 제공합니다.

---

## ✅ 주요 기능

- 📍 **주변 정류장 안내**: GPS 기반으로 가까운 버스 정류장 자동 표시
- ⏱ **실시간 도착 안내**: 곧 도착할 버스를 알림으로 안내
- 🎯 **AI 맞춤형 경로 추천**: 연령대나 질환(예: 관절통 등)을 고려해 환승이 적거나 병원 근처로 이동 가능한 노선 우선 추천
- 🔔 **하차 알림**: 목적지 도착 2개 정류장 전 알림 제공
- 🗣 **음성 안내 지원**: TTS(음성 출력) 기능으로 시각 약자도 사용 가능
- ❤️ **즐겨찾기 등록**: 자주 가는 장소(집, 병원, 시장 등) 저장

---

## 🛠️ 기술 스택

| 영역          | 도구/플랫폼                 | 선택 이유 |
|---------------|------------------------------|-----------|
| 프론트엔드    | React Native                 | iOS/Android 동시 개발 가능, 진입장벽 낮음 |
| 백엔드        | Firebase (Firestore, Functions) | 서버 구축 없이 빠르게 MVP 구현 가능 |
| 지도 & 위치   | Naver Maps SDK + GPS         | 국내 지도 정확도 높고 한글 지원 우수 |
| 버스 정보 API | 서울시 TOPIS API 또는 지역 API | 실시간 버스 도착/위치 데이터 제공 |
| 음성 안내     | Android/iOS 내장 TTS 기능     | 외부 라이브러리 없이 음성 출력 가능 |
| 인증 (선택)   | Firebase Authentication       | 간단한 로그인 및 사용자 식별 가능 |

---

## 📁 프로젝트 구조

```bash
busmate-app/
├── app/                       # React Native 앱 소스
│   ├── assets/                # 이미지, 아이콘 등 정적 리소스
│   ├── components/            # 공통 UI 컴포넌트
│   ├── screens/               # 화면별 컴포넌트 (홈, 설정, 스플래시 등)
│   ├── navigation/            # 네비게이션 정의
│   ├── services/              # API 통신 및 위치 추적 모듈
│   ├── utils/                 # 거리 계산, 시간 포맷 함수 등
│   └── App.js                 # 앱 진입점
├── functions/                 # Firebase Cloud Functions
│   └── notifyOnApproach.js
├── firestore.rules            # Firestore 보안 규칙
├── firebase.json              # Firebase 설정
├── .env                       # 환경변수(API 키 등)
├── README.md                  # 이 파일
└── docs/                      # 기획서, API 문서, DB 설계 등
