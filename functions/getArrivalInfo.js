const functions = require("firebase-functions");
const axios = require("axios");

// 공공데이터포털 TAGO 키 
const apiKey = functions.config().koreadatapotal?.key;

/**
 * 정류소 ID를 기반으로 해당 정류장의 버스 도착 예정 정보를 반환
 * @param {object} request - HTTPS 요청 객체. `request.query`에 `cityCode`와 `nodeId`가 포함되어야 함
 * @param {object} response - HTTPS 응답 객체.
 */
exports.getArrivalInfo = functions.https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
      return response.status(204).send("");
    }

    if (!apiKey) {
      console.error("API key is not configured in Firebase config.");
      return response.status(500).send("서버 설정 오류: API 키가 설정되지 않았습니다.");
    }

    const { cityCode, nodeId } = request.query;
    const pageNo = parseInt(request.query.pageNo, 10) || 1;
    const numOfRows = parseInt(request.query.numOfRows, 10) || 20;

    if (!cityCode || !nodeId) {
      console.error("Missing required query parameters: cityCode, nodeId");
      return response.status(400).send("필수 파라미터(cityCode, nodeId)가 없습니다.");
    }

    const url = `https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${encodeURIComponent(apiKey)}&_type=json&pageNo=${pageNo}&numOfRows=${numOfRows}&cityCode=${encodeURIComponent(cityCode)}&nodeId=${encodeURIComponent(nodeId)}`;

    try {
      console.log(`Fetching arrival info for nodeId=${nodeId}`);
      const apiResponse = await axios.get(url);

      if (apiResponse.data.response?.header?.resultCode !== "00") {
        console.error("API Error:", apiResponse.data.response?.header?.resultMsg);
        return response.status(400).send("공공데이터 API 오류가 발생했습니다.");
      }

      const rawItem = apiResponse.data.response?.body?.items?.item;
      const items = Array.isArray(rawItem) ? rawItem : (rawItem ? [rawItem] : []);

      // API 문서에 명시된 응답 데이터를 기반으로 결과를 가공
      const arrivals = items.map((item) => ({
        routeId: item.routeid,
        routeNo: item.routeno,
        routeType: item.routetp,
        predictedArrivalSeconds: item.arrtime,
        remainingStops: item.arrprevstationcnt,
        vehicleType: item.vehicletp,
      }));

      return response.status(200).json(arrivals);
    } catch (error) {
      console.error("Error calling public data API (arrival info):", error);
      return response.status(500).send("외부 API 호출 중 에러가 발생했습니다.");
    }
  });