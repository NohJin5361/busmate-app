import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 음성 파형 애니메이션 컴포넌트
const VoiceWave = () => {
    const navigation = useNavigation(); // navigation 객체 가져오기
  // 3개의 애니메이션 값을 각각 생성 (막대 3개)
  const animationValues = [
    useRef(new Animated.Value(0)).current, // 시작점 0
    useRef(new Animated.Value(0)).current, // 시작점 0
    useRef(new Animated.Value(0)).current, // 시작점 0
  ];

  // 컴포넌트가 처음 렌더링될 때 애니메이션 실행
  useEffect(() => {
    animationValues.forEach((anim, i) => {
      // 무한 반복되는 애니메이션 설정
      Animated.loop(
        Animated.sequence([
          // 0 → 1로 (위로 커짐)
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            delay: i * 200, // i번째 막대는 조금씩 늦게 시작해서 파동처럼 보이게
            useNativeDriver: true,
          }),
          // 다시 1 → 0으로 (아래로 줄어듦)
          Animated.timing(anim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start(); // 애니메이션 시작
    });
  }, []);

  return (
    <View style={styles.container}>
    {/* 뒤로가기 버튼 */}
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
    </TouchableOpacity>

      {/* 웨이브 애니메이션 */}
      <View style={styles.waveContainer}>
        {animationValues.map((anim, i) => (
          <Animated.View
            key={i}
            style={[
              styles.bar,
              {
                transform: [
                  {
                    // scaleY로 세로 방향만 커졌다 줄었다
                    scaleY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1.5], // 값이 0일 땐 0.3배, 1일 땐 1.5배
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* 안내 텍스트 */}
      <Text style={styles.text}>AI가 최적의{"\n"}경로를 찾고 있어요</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면 차지
    justifyContent: 'center', // 세로 가운데 정렬
    alignItems: 'center', // 가로 가운데 정렬
    backgroundColor: '#f2f6ff', // 배경 색상 (밝은 파랑 톤)
  },
    backButton: {
      position: 'absolute',
      top: 20,       // 위에서 조금 내려오게
      left: 20,      // 왼쪽 여백
      padding: 10,   // 터치 영역 확보
      zIndex: 10,    // 다른 요소 위에 표시
    },
    backText: {
      fontSize: 45,   // 화살표 크게
      color: '#444',  // 진한 회색
    },
  waveContainer: {
    flexDirection: 'row', // 막대 3개를 가로로 나란히 배치
    alignItems: 'flex-end', // 아랫부분 기준으로 정렬
    marginBottom: 20, // 텍스트와 간격
  },
  bar: {
    width: 6, // 막대 두께
    height: 40, // 기본 높이
    marginHorizontal: 3, // 막대 사이 간격
    borderRadius: 3, // 막대 끝을 둥글게
    backgroundColor: '#000', // 막대 색상 (검정)
  },
  text: {
    fontSize: 24, // 글자 크기
    fontWeight: 'bold', // 굵게
    color: '#333', // 어두운 회색
    textAlign: 'center', // 가운데 정렬
  },
});

export default VoiceWave;
