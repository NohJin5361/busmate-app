// MyJourneyScreen은 '하단 탭바 UI 확인용 파일', 
// 제대로 된 기능은 GPS 기능하고 넣고 할 예정

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyJourneyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 여정</Text>
      <Text style={styles.text}>여기는 사용자 위치 정보를 보여줄 화면입니다.</Text>
      <Text style={styles.text}>GPS 등을 활용하여 현재 위치를 표시할 수 있습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // 하늘색
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b', // 진한 청록색
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#004d40', // 어두운 청록색
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 25,
  },
});

export default MyJourneyScreen;