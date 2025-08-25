import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GuidanceStartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // 목적지를 '순천대학교'로 고정
  const destination = '순천대학교';

  // 임시 경로 및 시간 정보 (API 연동 시 교체)
  const travelTime = 15;
  const startTime = '오후 04:44';
  const endTime = '오후 05:10';
  const routeSteps = [
    { icon: '🚶‍♂️', title: '출발지', subtitle: '순천경찰서\n3분 이동 · 150m', color: '#4A90E2' },
    { icon: '🚌', title: '정류장 출발', subtitle: '', color: '#50E3C2' },
    { icon: '📍', title: `${destination} 도착`, subtitle: '순천대학교', color: '#D0021B' },
  ];

  // 안내 시작 버튼을 누르면 BusMovingScreen으로 이동
  const handleStartGuidance = () => {
    try {
      navigation.navigate('BusMovingScreen');
    } catch (e) {
      // 만약 계층 문제로 에러가 나면 부모 네비게이터로 이동 시도
      navigation.getParent()?.navigate('BusMovingScreen');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topTextBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.topText}>기본화면</Text>
            {/* 출발지 -> 목적지 텍스트 박스: 파란 바탕 안쪽, 기본화면 아래 */}
            <View style={styles.tripSummaryBox}>
              <Text style={styles.tripSummaryText}>
                출발지: 내위치   |   목적지: {destination}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollViewContent} contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.timeInfoBox}>
            <Text style={styles.travelTimeText}>{travelTime}분</Text>
            <Text style={styles.timeRangeText}>{startTime} - {endTime}</Text>
          </View>

          <View style={styles.pathContainer}>
            {routeSteps.map((step, index) => (
              <React.Fragment key={index}>
                <View style={styles.pathStep}>
                  <View style={[styles.iconCircle, { backgroundColor: step.color }]}>
                    <Text style={styles.iconEmoji}>{step.icon}</Text>
                  </View>
                  <View style={styles.pathStepTextBox}>
                    <Text style={styles.pathStepTitle}>{step.title}</Text>
                    {step.subtitle ? (
                      <Text style={styles.pathStepSub}>{step.subtitle}</Text>
                    ) : null}
                  </View>
                </View>
                {index !== routeSteps.length - 1 && <View style={styles.verticalLine} />}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.startButton} onPress={handleStartGuidance}>
          <Text style={styles.startButtonText}>🚌 바로 안내 시작</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topTextBox: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#003399',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // 왼쪽 정렬
    flexDirection: 'row',
  },
  topText: {
    fontSize: 22, // 원래 크기로
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tripSummaryBox: {
    backgroundColor: '#fff', // 완전 하얀색 배경
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 0,
  },
  tripSummaryText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666', // 출발지 밑의 작은 글씨 색상과 동일
    textAlign: 'left',
  },
  scrollViewContent: {
    flex: 1,
  },
  timeInfoBox: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  travelTimeText: {
    fontSize: 48, // 더 크게
    fontWeight: '800',
    color: '#111',
  },
  timeRangeText: {
    fontSize: 20, // 더 크게
    marginTop: 4,
    color: '#555',
    fontWeight: '600',
  },
  pathContainer: {
    marginHorizontal: 30,
  },
  pathStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24, // 더 넓게
  },
  iconCircle: {
    width: 52, // 더 크게
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  iconEmoji: {
    fontSize: 32, // 더 크게
  },
  pathStepTextBox: {
    flex: 1,
  },
  pathStepTitle: {
    fontWeight: '800',
    fontSize: 22, // 더 크게
    color: '#222',
  },
  pathStepSub: {
    color: '#666',
    marginTop: 6,
    fontSize: 18, // 더 크게
    fontWeight: '600',
    lineHeight: 24,
  },
  verticalLine: {
    width: 2,
    height: 24, // 더 길게
    backgroundColor: '#ccc',
    marginLeft: 18,
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#6a71fb',
    padding: 15,
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});

export default GuidanceStartScreen;