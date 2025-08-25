import React, { useEffect, useState } from 'react'; 
import { View, Image, StyleSheet, Text, Dimensions, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'; // Image, Dimensions, ActivityIndicator, Alert, TouchableOpacity 추가
import { useNavigation } from '@react-navigation/native'; 


// 이 컴포넌트는 Naver Static Map 정적 이미지를 로드하고 표시
const NaverRasterStaticMap = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // 원래 여기에 놔두면 안되지만 일단 놔두고 옮길 예정
  const NAVER_CLIENT_ID = 'wjpf84qab4';     // <-- 여기에 Client ID 입력
  const NAVER_CLIENT_SECRET = 'lohfqWESZLm3FocL6yux4uVnPfD1Oxee6Ohqa545'; // <-- 여기에 Client Secret 입력

  // 상태 변수 정의 
  const [mapImageBase64, setMapImageBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 지도 이미지를 가져오는 함수 호출
  useEffect(() => {
    const fetchRasterMapImage = async () => {
      if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET || NAVER_CLIENT_ID === 'YOUR_NAVER_CLIENT_ID_HERE') {
        setError("API 키를 올바르게 입력해주세요. ('YOUR_NAVER_CLIENT_ID_HERE'를 실제 키로 변경하세요.)");
        setIsLoading(false);
        return;
      }

      // 화면 크기를 기반으로 지도 이미지의 너비와 높이를 계산
      const mapWidth = Math.floor(screenWidth);
      const mapHeight = Math.floor(screenHeight);

      // 지도 중심 좌표와 레벨 설정(현 위치: 순천대학교)
      const centerLongitude = 127.4820; // 경도
      const centerLatitude = 34.9685;  //  위도
      const level = 15; // level (카메라 줌 생각하면서 조절 가능)

      // Naver Static Map API 요청 URL 생성
      const baseUrl = 'https://maps.apigw.ntruss.com/map-static/v2/raster';
      const queryParams = `w=${mapWidth}&h=${mapHeight}&center=${centerLongitude},${centerLatitude}&level=${level}`;
      const mapApiUrl = `${baseUrl}?${queryParams}`;

      console.log('요청 URL:', mapApiUrl);

      // API 요청
      try {
        const response = await fetch(mapApiUrl, {
          method: 'GET',
          headers: {
            'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
          },
        });

        // 응답 상태 확인
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API 응답 오류:', response.status, errorText);
          setError(`지도 로드 실패: ${response.status} ${response.statusText}. 응답: ${errorText}`);
          setIsLoading(false);
          return;
        }

        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          setMapImageBase64(reader.result);
          setIsLoading(false);
        };
        reader.onerror = (e) => {
          console.error('파일 읽기 오류:', e);
          setError('이미지 데이터를 읽는 중 오류가 발생했습니다.');
          setIsLoading(false);
        };
        reader.readAsDataURL(blob);

      } catch (e) {
        console.error('지도 이미지를 가져오는 중 오류 발생:', e);
        setError(`네트워크 오류 또는 기타 문제: ${e.message}`);
        setIsLoading(false);
      }
    };

    fetchRasterMapImage();
  }, [NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, screenWidth, screenHeight]);

  // 로딩 중이거나 오류가 발생한 경우에 대한 UI 처리
  return (
    <View style={mapStyles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={mapStyles.errorText}>오류: {error}</Text>
      ) : mapImageBase64 ? (
        <Image
          source={{ uri: mapImageBase64 }}
          style={mapStyles.mapImage}
          resizeMode="cover"
        />
      ) : (
        <Text style={mapStyles.errorText}>지도를 로드할 수 없습니다. (데이터 없음)</Text>
      )}
    </View>
  );
};

// naver static map의 스타일 정의
const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

// HomeScreen 컴포넌트 정의
const HomeScreen = () => {
  const navigation = useNavigation(); 

  const handleSearchPress = () => {
    navigation.navigate('Search'); // 'Search'는 RootStack의 SearchScreen을 가리킴
  };

  return ( // 상단 텍스트 박스, NaverStaticMap 컴포넌트, '글씨 검색' 텍스트 박스의 화면 구성
    <View style={styles.container}>
      <View style={styles.topTextBox}>
        <Text style={styles.topText}>버스메이트</Text>
      </View>

      {/* NaverStaticMap 컴포넌트*/}
      <NaverRasterStaticMap />  

      {/* '글씨 검색' 텍스트 박스 
      현재 버튼 눌러지는 것까지는 문제가 없지만 눌렀을 시 
      SearchScreen.js이 나타나지 못하는 문제가 있음*/}
      <TouchableOpacity style={styles.floatingSearchTextBox} onPress={handleSearchPress}>
        <Text style={styles.floatingSearchText}>글씨 검색</Text>
      </TouchableOpacity>
    </View>
  );
};

// 여기에서 HomeScreen의 모든 스타일이 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정
    backgroundColor: 'white', // 전체 배경색
  },

  // '버스메이트' 텍스트 박스 스타일 정의
  topTextBox: {
    width: '100%', // 박스가 화면 너비를 모두 차지
    paddingTop: 30, // 위쪽 여백 추가
    padding: 15, // 상하좌우 여백
    backgroundColor: 'blue', // 배경색 파란색
    flexDirection: 'row', // '버스메이트' 텍스트를 왼쪽 정렬
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  // '버스메이트' 텍스트 스타일 정의
  topText: {
    fontSize: 20, // 글자 크기 20px
    fontWeight: 'bold', // 글자 두껍게 설정
    color: 'white', // 글자색 
    textAlign: 'left', // 글자 정렬
  },

  // '글씨 검색' 텍스트 박스 스타일
  floatingSearchTextBox: {
    position: 'absolute', // 절대 위치 지정
    bottom: 20, // 하단에서 20px 위 
    right: 20, // 우측에서 20px 왼쪽
    backgroundColor: 'lightgray', // 텍스트 박스 배경색
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8, // 모서리를 둥글게
    borderWidth: 1, // 테두리 추가
    borderColor: '#ccc', // 테두리 색상
    zIndex: 10, // 다른 요소 위에 표시되도록 z-index 설정
  },

  // '글씨 검색' 텍스트 스타일
  floatingSearchText: {
    color: '#333', // 텍스트 색상
    fontSize: 40, //글자 크기
    fontWeight: 'bold', // 글자 두껍게 설정
  },
});

export default HomeScreen;