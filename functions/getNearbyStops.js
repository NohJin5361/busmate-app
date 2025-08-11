const functions = require("firebase-functions");
const axios = require("axios");

// Firebase에 저장된 API키 불러오기 (환경 변수 우선, fallback으로 config 사용)
const apiKey = process.env.GETNEARBYSTOPS_KEY || functions.config().getnearbystops?.key;

// 공공데이터 포털 키는 제공 형식 그대로 사용

/**
 * GPS 좌표를 기반으로 반경 500m 이내의 버스 정류장 목록을 반환
 * @param {object} request - HTTPS 요청 객체. `request.query`에 `lat`과 `lon`이 포함되어야 함.
 * @param {object} response - HTTPS 응답 객체.
 * @returns {Promise<void>} JSON 형식의 정류장 목록 또는 에러 메시지를 반환함.
 */
const getNearbyStops = functions.https.onRequest(async (request, response) => {
  // CORS 헤더 설정
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }
  
  const { lat, lon } = request.query;

  // 좌표값 유효성 검사
  if (!lat || !lon) {
    console.error("Missing required query parameters: lat, lon");
    return response.status(400).send("필수 파라미터(lat, lon)가 없습니다.");
  }
  
  // 좌표값 범위 검사 (한국 영역)
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  
  if (isNaN(latNum) || isNaN(lonNum) || 
      latNum < 33.0 || latNum > 38.6 || 
      lonNum < 124.5 || lonNum > 132.0) {
    return response.status(400).send("유효하지 않은 좌표값입니다.");
  }

if (!apiKey) {
  console.error("Missing API key for public data portal.");
  return response.status(500).send("서버 설정 오류: 공공데이터 API 키가 설정되지 않았습니다.");
}

const url = `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey=${apiKey}&pageNo=1&numOfRows=20&_type=json&gpsLati=${lat}&gpsLong=${lon}`;

  try {
    console.log(`Searching for bus stops near: lat=${lat}, lon=${lon}`);
    const apiResponse = await axios.get(url);
    
    // API 응답 상태 확인
    if (apiResponse.data.response?.header?.resultCode !== '00') {
      console.error("API Error:", apiResponse.data.response?.header?.resultMsg);
      return response.status(400).send("공공데이터 API 오류가 발생했습니다.");
    }
    
    const items = apiResponse.data?.response?.body?.items?.item || [];
    console.log(`Found ${items.length} nearby bus stops`);

    // 응답 데이터가 없는 경우 빈 배열을 반환합니다.
    if (!items || items.length === 0) {
      return response.status(200).json([]);
    }

    // 프론트엔드에 필요한 데이터만 추출하여 응답합니다.
    const nearbyStops = items.map(stop => ({
      nodeid: stop.nodeid,
      nodename: stop.nodename,
      gpslati: stop.gpslati,
      gpslong: stop.gpslong,
    }));
    
    return response.status(200).json(nearbyStops);

  } catch (error) {
    console.error("Error calling public data API:", error);
    return response.status(500).send("외부 API 호출 중 에러가 발생했습니다.");
  }
});

module.exports = { getNearbyStops };