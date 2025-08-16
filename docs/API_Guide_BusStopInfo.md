# 공공데이터 오픈 API 활용가이드

## 1. 서비스 명세

### 1.1 버스정류소정보조회 서비스

#### 가. API 서비스 개요

*   **API 명(영문):** `BusSttnInfoInqireService`
*   **API 명(국문):** 버스정류소정보조회 서비스
*   **API 설명:** 정류소명, 정류소번호를 기준으로 시내버스 정류소정보를 조회하는 버스정류소조회 서비스
*   **인증/권한:** `serviceKey` (필수)
*   **인터페이스 표준:** REST (GET)
*   **교환 데이터 표준:** XML, JSON (중복선택가능)
*   **서비스 URL:** `http://apis.data.go.kr/1613000/BusSttnInfoInqireService`

#### 다. 상세기능내역

##### 2) [좌표기반근접정류소 목록조회] 상세기능명세 (`getCrdntPrxmtSttnList`)

*   **상세기능 설명:** GPS 좌표를 기반으로 근처(반경 500m)에 있는 정류장을 검색한다.
*   **Call Back URL:** `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`

*   **요청 메시지 명세 (Request Parameters):**

| 항목명 (영문) | 항목명 (국문) | 필수 여부 | 설명 |
| :------------ | :------------ | :------ | :--- |
| `serviceKey`  | 인증키        | 필수    | 공공데이터포털에서 발급받은 인증키 |
| `numOfRows`   | 한 페이지 결과 수 | 선택    | 한 페이지에 표시할 결과 수 |
| `pageNo`      | 페이지 번호   | 선택    | 페이지 번호 |
| `_type`       | 데이터 타입   | 선택    | 데이터 타입 (xml 또는 json) |
| `gpsLati`     | GPS Y 좌표  | 필수    | WGS84 위도 좌표 |
| `gpsLong`     | GPS X 좌표  | 필수    | WGS84 경도 좌표 |

## 2. OpenAPI 에러 코드정리

### 2-1 공공데이터 포털 에러코드

| 에러코드 | 에러메시지                       | 설명                               |
| :------- | :------------------------------- | :--------------------------------- |
| 1        | `APPLICATION_ERROR`              | 어플리케이션 에러                  |
| 4        | `HTTP_ERROR`                     | HTTP 에러                          |
| 12       | `NO_OPENAPI_SERVICE_ERROR`       | 해당 오픈 API 서비스가 없거나 폐기됨 |
| 20       | `SERVICE_ACCESS_DENIED_ERROR`    | 서비스 접근거부                    |
| 22       | `LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR` | 서비스 요청제한횟수 초과에러       |
| 30       | `SERVICE_KEY_IS_NOT_REGISTERED_ERROR` | 등록되지 않은 서비스키             |
| 31       | `DEADLINE_HAS_EXPIRED_ERROR`     | 활용기간 만료                      |
| 32       | `UNREGISTERED_IP_ERROR`          | 등록되지 않은 IP                   |
| 99       | `UNKNOWN_ERROR`                  | 기타에러                           |

### 2-2 제공기관 에러코드

| 에러코드 | 에러메시지                       | 설명                 |
| :------- | :------------------------------- | :------------------- |
| 99       | `INVALID_REQUEST_PARAMETER_ERROR` | 잘못된 요청 파라메터 에러 |