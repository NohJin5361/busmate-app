import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Naver Static Map 불러오기
const NaverRasterStaticMap = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const NAVER_CLIENT_ID = 'wjpf84qab4'; // 테스트 키
  const NAVER_CLIENT_SECRET = 'lohfqWESZLm3FocL6yux4uVnPfD1Oxee6Ohqa545';

  const [mapImageBase64, setMapImageBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRasterMapImage = async () => {
      try {
        const mapApiUrl = `https://maps.apigw.ntruss.com/map-static/v2/raster?w=${Math.floor(
          screenWidth
        )}&h=${Math.floor(screenHeight)}&center=127.4820,34.9685&level=15`;

        const response = await fetch(mapApiUrl, {
          method: 'GET',
          headers: {
            'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
          },
        });

        if (!response.ok) {
          setError(`지도 로드 실패: ${response.status}`);
          setIsLoading(false);
          return;
        }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setMapImageBase64(reader.result);
          setIsLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        setError('네트워크 오류');
        setIsLoading(false);
      }
    };

    fetchRasterMapImage();
  }, [screenWidth, screenHeight]);

  return (
    <View style={mapStyles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1976D2" />
      ) : error ? (
        <Text style={mapStyles.errorText}>오류: {error}</Text>
      ) : mapImageBase64 ? (
        <Image source={{ uri: mapImageBase64 }} style={mapStyles.mapImage} resizeMode="cover" />
      ) : (
        <Text style={mapStyles.errorText}>지도를 로드할 수 없습니다.</Text>
      )}
    </View>
  );
};

const mapStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapImage: { width: '100%', height: '100%' },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginBottom: 20 },
});

// HomeScreen
const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const onVoicePress = () => {
    navigation.navigate('VoiceSearch');
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.topTextBox}>
        <Text style={styles.topText}>🚌 버스메이트</Text>
      </View>

      {/* 지도 */}
      <NaverRasterStaticMap />

      {/* 검색 버튼 영역 */}
      <View style={styles.searchButtonsRow}>
        <TouchableOpacity style={styles.voiceButton} onPress={onVoicePress}>
          <Text style={styles.buttonText}>🎤 음성 검색</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textButton} onPress={handleSearchPress}>
          <Text style={styles.buttonText}>🔍 글씨 검색</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  topTextBox: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    elevation: 4,
  },
  topText: {
    fontSize: 28, // 크게
    fontWeight: 'bold',
    color: 'white',
  },

  searchButtonsRow: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  voiceButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 16,
    elevation: 5,
  },
  textButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 16,
    elevation: 5,
  },
  buttonText: {
    fontSize: 22, // 크게
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
