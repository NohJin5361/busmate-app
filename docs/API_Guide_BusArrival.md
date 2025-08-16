# 공공데이터 오픈 API 활용가이드 - 버스도착정보조회 서비스

## 1. 서비스 명세

### 1.1 버스도착정보조회 서비스

#### 가. API 서비스 개요

| 항목 | 내용 |
| --- | --- |
| **API 명(영문)** | ArvlInfoInqireService |
| **API 명(국문)** | 버스도착정보조회 서비스 |
| **API 설명** | 정류소를 기준으로 현재 운행중인 버스의 도착예정정보를 조회하는 서비스 |
| **서비스 인증/권한** | serviceKey (GPKI/NPKI) |
| **메시지 레벨 암호화** | 없음 |
| **전송 레벨 암호화** | 없음 |
| **인터페이스 표준** | REST (GET) |
| **교환 데이터 표준** | XML, JSON |
| **서비스 URL** | `http://apis.data.go.kr/1613000/ArvlInfoInqireService` |
| **서비스 명세 URL** | `http://apis.data.go.kr/1613000/ArvlInfoInqireService?_wadl&_type=xml` |
| **서비스 버전** | 1.0 |
| **서비스 시작일** | 2013-12-09 |
| **서비스 배포일** | 2013-12-09 |
| **서비스 이력** | 2013-12-09: 서비스 시작, 2022-02-01: GW 서비스 전환 |
| **메시지 교환유형** | Request-Response |
| **서비스 제공자** | 우재영 / 모빌리티플랫폼처 / 054-459-7906 / crich0522@kotsa.or.kr |
| **데이터 갱신주기** | 실시간(10~20 초) |

---

#### 나. 상세기능 목록

| 번호 | API 명(국문) | 상세기능명(영문) | 상세기능명(국문) |
| --- | --- | --- | --- |
| 1 | 도착정보조회 서비스 | getSttnAcctoArvlPrearngeInfoList | 정류소별 도착예정정보 목록 조회 |
| 2 | 도착정보조회 서비스 | getSttnAcctoSpcifyRouteBusArvlPrearngeInfoList | 정류소별 특정노선버스도착예정정보 목록 조회 |
| 3 | 도착정보조회 서비스 | getCtyCodeList | 도시코드 목록 조회 |

---

#### 다. 상세기능내역

##### 1) [정류소별도착예정정보 목록 조회] 상세기능명세

*   **상세기능 설명:** 정류소별로 실시간 도착예정정보 및 운행정보 목록을 조회한다.
*   **Call Back URL:** `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList`
*   **최대 메시지 사이즈:** 4000 byte
*   **평균 응답 시간:** 500 ms
*   **초당 최대 트랜잭션:** 30 tps

**요청 메시지 명세 (Request Parameters)**

| 항목명(영문) | 항목명(국문) | 항목크기 | 필수여부 | 샘플데이터 | 항목설명 |
| --- | --- | --- | --- | --- | --- |
| serviceKey | 인증키 | 100 | 1 | (URL Encode) | 공공데이터포털에서 발급받은 인증키 |
| numOfRows | 한 페이지 결과 수 | 4 | 0 | 10 | 한 페이지 결과 수 |
| pageNo | 페이지 번호 | 4 | 0 | 1 | 페이지 번호 |
| _type | 데이터 타입 | 10 | 0 | xml | 데이터 타입(xml, json) |
| cityCode | 도시코드 | 9 | 1 | 25 | [상세기능 3]에서 조회 가능 |
| nodeId | 정류소 ID | 30 | 1 | DJB8001793 | [국토교통부(TAGO)_버스정류소정보]에서 조회가능 |

**응답 메시지 명세 (Response Parameters)**

| 항목명(영문) | 항목명(국문) | 항목크기 | 항목설명 |
| --- | --- | --- | --- |
| resultCode | 결과코드 | 2 | 결과코드 |
| resultMsg | 결과메시지 | 50 | 결과메시지 |
| numOfRows | 한 페이지 결과 수 | 4 | 한 페이지당 표출 데이터 수 |
| pageNo | 페이지 수 | 4 | 페이지 수 |
| totalCount | 데이터 총 개수 | 4 | 데이터 총 개수 |
| nodeid | 정류소 ID | 30 | 정류소 ID |
| nodenm | 정류소명 | 30 | 정류소명 |
| routeid | 노선 ID | 30 | 노선 ID |
| routeno | 노선번호 | 30 | 노선번호 |
| routetp | 노선유형 | 10 | 노선유형 |
| arrprevstationcnt | 도착예정버스 남은 정류장 수 | 3 | 도착예정버스 남은 정류장 수 |
| vehicletp | 도착예정버스 차량유형 | 10 | 도착예정버스 차량유형 |
| arrtime | 도착예정버스 도착예상시간[초] | 5 | 도착예정버스 도착예상시간[초] |

**요청/응답 메시지 예제**
*   **요청 URL 예시**
    ```
    http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=인증키(URL Encode)&cityCode=25&nodeId=DJB8001793&numOfRows=10&pageNo=1&_type=xml
    ```
*   **응답 XML 예시**
    ```xml
    <response>
      <header>
        <resultCode>00</resultCode>
        <resultMsg>NORMAL SERVICE.</resultMsg>
      </header>
      <body>
        <items>
          <item>
            <nodeid>DJB8001793</nodeid>
            <nodenm>북대전농협</nodenm>
            <routeid>DJB30300002</routeid>
            <routeno>5</routeno>
            <routetp>마을버스</routetp>
            <arrprevstationcnt>15</arrprevstationcnt>
            <vehicletp>저상버스</vehicletp>
            <arrtime>816</arrtime>
          </item>
        </items>
        <numOfRows>10</numOfRows>
        <pageNo>1</pageNo>
        <totalCount>5</totalCount>
      </body>
    </response>
    ```

---

##### 2) [정류소별특정노선버스 도착예정정보 목록조회] 상세기능명세
*   **상세기능 설명:** 정류소 별로 특정노선의 실시간 도착예정정보 및 운행정보 목록을 조회한다.
*   **Call Back URL:** `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoSpcifyRouteBusArvlPrearngeInfoList`

... (이하 요청/응답 명세는 위와 유사) ...

---

##### 3) [도시코드 목록 조회] 상세기능명세
*   **상세기능 설명:** 서비스 가능 지역들의 도시코드 목록을 조회한다.
*   **Call Back URL:** `http://apis.data.go.kr/1613000/ArvlInfoInqireService/getCtyCodeList`

**요청 메시지 명세 (Request Parameters)**

| 항목명(영문) | 항목명(국문) | 항목크기 | 필수여부 | 샘플데이터 | 항목설명 |
| --- | --- | --- | --- | --- | --- |
| serviceKey | 인증키 | 100 | 1 | (URL Encode) | 공공데이터포털에서 발급받은 인증키 |
| _type | 데이터 타입 | 10 | 0 | xml | 데이터 타입(xml, json) |

**응답 메시지 명세 (Response Parameters)**

| 항목명(영문) | 항목명(국문) | 항목크기 | 항목설명 |
| --- | --- | --- | --- |
| resultCode | 결과코드 | 2 | 결과코드 |
| resultMsg | 결과메시지 | 50 | 결과메시지 |
| citycode | 도시코드 | 5 | 도시코드 |
| cityname | 도시명 | 100 | 도시명 |

---

## 2. OpenAPI 에러 코드정리

### 2-1 공공데이터 포털 에러코드

| 에러코드 | 에러메시지 | 설명 |
| --- | --- | --- |
| 1 | APPLICATION_ERROR | 어플리케이션 에러 |
| 4 | HTTP_ERROR | HTTP 에러 |
| 12 | NO_OPENAPI_SERVICE_ERROR | 해당 오픈 API 서비스가 없거나 폐기됨 |
| 20 | SERVICE_ACCESS_DENIED_ERROR | 서비스 접근거부 |
| 22 | LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR | 서비스 요청제한횟수 초과에러 |
| 30 | SERVICE_KEY_IS_NOT_REGISTERED_ERROR | 등록되지 않은 서비스키 |
| 31 | DEADLINE_HAS_EXPIRED_ERROR | 활용기간 만료 |
| 32 | UNREGISTERED_IP_ERROR | 등록되지 않은 IP |
| 99 | UNKNOWN_ERROR | 기타에러 |

### 2-2 제공기관 에러코드

| 에러코드 | 에러메시지 | 설명 |
| --- | --- | --- |
| 99 | INVALID_REQUEST_PARAMETER_ERROR | 잘못된 요청 파라미터 에러 |

