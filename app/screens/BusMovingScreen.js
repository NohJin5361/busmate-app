import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing, Text, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native'; // useNavigation 훅 추가

const LOCAL_MAP_IMAGE = require('../assets/image1.png'); // 로컬 이미지 임포트 (경로 확인 필수)

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const routeCoordinates = [
  { x: 290, y: 700 },
  { x: 273, y: 650 },
  { x: 260, y: 550 },
  { x: 240, y: 480 },
  { x: 210, y: 350 }, // 2정거장 전 위치 알림 트리거
  { x: 180, y: 250 },
  { x: 170, y: 210 }, // 최종 도착 지점 (알림 트리거)
];

const BusMovingScreen = () => {
  const navigation = useNavigation(); // navigation 훅 초기화

  const [markerIndex, setMarkerIndex] = useState(0);
  const [alertShown210, setAlertShown210] = useState(false);
  const [finalAlertShown, setFinalAlertShown] = useState(false); // 최종 도착 알림 표시 여부

  const markerAnim = useRef(
    new Animated.ValueXY({
      x: routeCoordinates[0]?.x ?? 0,
      y: routeCoordinates[0]?.y ?? 0,
    })
  ).current;

  const getAngle = (from, to) => {
    if (!from || !to) return '0deg';
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return `${angle}deg`;
  };

  useEffect(() => {
    if (routeCoordinates.length < 2) return;

    const currentX = routeCoordinates[markerIndex].x;

    // ✨ 최종 도착 알림 처리    
    if (!finalAlertShown && currentX === 170) {
      Alert.alert(
        '도착 완료!',
        '성공적으로 목적지에 도착했습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              // '확인' 버튼 누르면 홈 화면으로 이동
              navigation.navigate('MainTabs', { screen: '기본 화면' });
            },
          },
        ],
        { cancelable: false } // 사용자가 '확인' 버튼을 통해서만 알림을 닫도록 설정
      );
      setFinalAlertShown(true); // 최종 알림이 떴음을 기록
      return; // 알림이 뜬 후에는 더 이상 애니메이션 타이머 설정 안 함
    }
    
    if (markerIndex >= routeCoordinates.length - 1) {
        return; // 마지막 지점 이후 애니메이션 스케줄링 중단 (finalAlertShown이 true가 아니라면, 이전 로직처럼 작동함)
    }


    
    if (!alertShown210 && currentX === 210) {
      Alert.alert('잠시후 도착', '2정거장 전 입니다.');
      setAlertShown210(true);
    }

    const timer = setTimeout(() => {
      const next = markerIndex + 1;
      Animated.timing(markerAnim, {
        toValue: {
          x: routeCoordinates[next].x,
          y: routeCoordinates[next].y,
        },
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        setMarkerIndex(next);
      });
    }, 2000); // 2초 대기 후 다음 세그먼트 애니메이션 시작

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [markerIndex, markerAnim, alertShown210, finalAlertShown, navigation]);

  const from = routeCoordinates[markerIndex];
  const to =
    markerIndex < routeCoordinates.length - 1
      ? routeCoordinates[markerIndex + 1]
      : routeCoordinates[markerIndex];
  const angle = getAngle(from, to);

  return (
    <View style={styles.container}>
      <Image
        source={LOCAL_MAP_IMAGE}
        style={[styles.map, { width: screenWidth, height: screenHeight }]}
        resizeMode="cover"
      />
      <Animated.View
        style={[
          styles.userMarker,
          {
            transform: [
              { translateX: markerAnim.x },
              { translateY: markerAnim.y },
              { rotate: angle },
            ],
          },
        ]}
      >
        <Text style={styles.userIcon}>🔵</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  userMarker: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    fontSize: 36,
  },
});

export default BusMovingScreen;