<img width="888" height="500" alt="Image" src="https://github.com/user-attachments/assets/2f1f0d87-ef1b-4bd7-8aca-a3f17a096bba" />

# 🚌 BusMate (버스 메이트) - AI 기반 고령자 맞춤형 버스 안내 앱 (MVP)

**BusMate**는 고령자들이 대중교통을 보다 쉽고 안전하게 이용할 수 있도록 돕는 스마트 모바일 앱입니다.  
사용자의 **나이**와 **건강 상태** 정보를 기반으로, 개인 맞춤형 버스 노선과 알림 서비스를 제공합니다.

---

## ✅ 주요 기능

- 📍 **주변 정류장 안내**: GPS 기반으로 가까운 버스 정류장 자동 표시  
- ⏱ **실시간 도착 안내**: 곧 도착할 버스를 알림으로 안내  
- 🎯 **AI 맞춤형 경로 추천**: 연령대나 질환(예: 관절통 등)을 고려해 환승이 적거나 병원 근처로 이동 가능한 노선 우선 추천  
- 🗣 **음성 안내 지원**: TTS 및 음성 명령 인식으로 시각 약자도 사용 가능  
- 🔔 **하차 알림**: 목적지 도착 2개 정류장 전 알림 제공  
- ❤️ **즐겨찾기 등록**: 자주 가는 장소(집, 병원, 시장 등) 저장  

---

## 🛠️ 기술 스택

| 구분         | 기술                                         | 역할 및 선정 이유 |
|--------------|----------------------------------------------|-------------------|
| **Front-end** | Android Native / React Native                | 어르신 사용자를 위한 **큰 글자·직관적 UI/UX** 제공 |
| **Back-end**  | Firebase Cloud Functions (Node.js)            | API 연동 + 비즈니스 로직 처리, 서버리스 아키텍처 |
| **DB**        | Cloud Firestore                              | 사용자 맞춤 데이터(즐겨찾기, 최근 검색 등) 안전 저장 |
| **AI 플랫폼** | Speech-to-Text, Dialogflow & Places API, Gemini API | 음성 입력→텍스트 변환, 경로 후보 중 사용자 맞춤형 추천 |
| **외부 API**  | 공공데이터포털(TAGO), 네이버지도 API         | **실시간 버스 도착/위치**, 정류장·경로 정보 확보 |

---

## 📁 프로젝트 구조

```bash
busmate-app/
├── app/                       # React Native 앱 소스
│   ├── assets/                # 이미지, 아이콘 등 정적 리소스
│   ├── components/            # 공통 UI 컴포넌트
│   ├── screens/               # 화면별 컴포넌트 (홈, 설정, 스플래시 등)
│   ├── navigation/            # 네비게이션 정의
│   ├── services/              # API 통신, 위치 추적, AI 음성 처리 모듈
│   ├── utils/                 # 거리 계산, 시간 포맷 등 유틸 함수
│   └── App.js                 # 앱 진입점
├── functions/                 # Firebase Cloud Functions
│   └── notifyOnApproach.js    # 하차 2정거장 전 알림 푸시
├── firestore.rules            # Firestore 보안 규칙
├── firebase.json              # Firebase 설정
├── .env                       # API 키 환경변수
├── README.md                  # 프로젝트 문서
└── docs/                      # 기획서, API 문서, DB 설계 등
