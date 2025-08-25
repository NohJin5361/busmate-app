import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // ✨ GPS 기능만을 위한 라이브러리

const MyJourneyScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null); // 사용자의 현재 위치 (위도, 경도)를 저장할 상태
  const [loading, setLoading] = useState(true); // 위치 정보를 로딩 중인지 나타내는 상태

  // GPS 권한 요청 함수
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        // iOS 위치 권한 요청 (앱 사용 중)
        const status = await Geolocation.requestAuthorization('whenInUse');
        if (status === 'granted') {
          console.log('iOS 위치 권한 허용됨');
          return true;
        } else {
          Alert.alert('위치 권한 거부', '앱을 사용하려면 위치 권한이 필요합니다. 설정에서 허용해주세요.');
          return false;
        }
      } else if (Platform.OS === 'android') {
        // 안드로이드 위치 권한 요청 (정밀 위치)
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한",
            message: "정확한 위치 정보를 가져오기 위해 위치 권한이 필요합니다.",
            buttonNeutral: "나중에 물어보기",
            buttonNegative: "취소",
            buttonPositive: "확인"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Android 위치 권한 허용됨");
          return true;
        } else {
          Alert.alert('위치 권한 거부', '앱을 사용하려면 위치 권한이 필요합니다. 설정에서 허용해주세요.');
          return false;
        }
      }
      return false; // 그 외 플랫폼
    } catch (err) {
      console.warn(err);
      Alert.alert('위치 권한 요청 중 오류', '위치 권한을 요청하는 중 오류가 발생했습니다.');
      return false;
    }
  };

  // 현재 위치 가져오기 함수
  const getCurrentLocation = () => {
    setLoading(true); // 로딩 시작
    Geolocation.getCurrentPosition(
      (position) => {
        // 성공적으로 위치를 가져왔을 때
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setLoading(false); // 로딩 완료
        console.log("현재 위치 (GPS):", latitude, longitude);
      },
      (error) => {
        // 위치 가져오기 실패 시 처리
        console.log("위치 가져오기 오류 (GPS):", error.code, error.message);
        Alert.alert('위치 정보를 가져올 수 없음', '현재 위치를 가져오는 데 실패했습니다.');
        setCurrentLocation(null); // 위치 없음으로 설정
        setLoading(false); // 로딩 완료
      },
      // Geolocation 옵션: 높은 정확도, 타임아웃, 캐시된 위치 최대 수명
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // 컴포넌트 마운트 시 위치 권한 요청 및 현재 위치 가져오기
  useEffect(() => {
    const initLocation = async () => {
      const hasPermission = await requestLocationPermission(); // 권한 요청
      if (hasPermission) {
        getCurrentLocation(); // 권한 허용 시 현재 위치 가져오기
      } else {
        // 권한이 없으면 안내 메시지 표시
        Alert.alert('위치 권한 없음', '위치 권한이 거부되어 현재 위치를 가져올 수 없습니다.');
        setLoading(false);
      }
    };
    initLocation();
  }, []); // 컴포넌트 마운트 시 단 한 번만 실행

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 위치 정보 (GPS 전용)</Text>
      {loading ? (
        // 위치 정보를 로딩 중일 때 표시
        <Text style={styles.text}>위치 정보를 가져오는 중입니다...</Text>
      ) : currentLocation ? (
        // 위치 정보를 성공적으로 가져왔을 때 위도/경도 표시
        <View>
          <Text style={styles.text}>위도: {currentLocation.latitude.toFixed(6)}</Text>
          <Text style={styles.text}>경도: {currentLocation.longitude.toFixed(6)}</Text>
        </View>
      ) : (
        // 위치 정보를 가져올 수 없을 때 안내 메시지 표시
        <Text style={styles.text}>위치 정보를 가져올 수 없습니다. 권한을 확인해주세요.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // 밝은 하늘색 배경
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // 진한 회색 텍스트
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555', // 보통 회색 텍스트
  },
});

export default MyJourneyScreen;