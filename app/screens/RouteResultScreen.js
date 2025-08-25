import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RouteResultScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>기본화면</Text>
      </View>

      {/* 경로 결과 박스 */}
      <View style={styles.resultBox}>
        <Text style={styles.time}>15분</Text>
        <Text style={styles.period}>오후 04:44 ~ 오후 05:10</Text>

        <View style={styles.step}>
          <Text>🚶 순천경찰서 출발 (3분, 150m)</Text>
        </View>
        <View style={styles.step}>
          <Text>🚌 85번 버스 탑승</Text>
        </View>
        <View style={styles.step}>
          <Text>🚶 의료원로터리 정류장 도착 (3분, 150m)</Text>
        </View>
        <View style={styles.step}>
          <Text>🏥 순천의료원 도착</Text>
        </View>

        {/* 버튼 → BusMoving 으로 이동 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BusMoving')} // ✅ App.tsx 이름과 맞춤
        >
          <Text style={styles.buttonLabel}>바로 안내 시작</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center', paddingTop: 60 },
  header: { width: '100%', padding: 15, backgroundColor: '#1976D2' },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 3,
  },
  time: { fontSize: 26, fontWeight: 'bold', color: '#1976D2', textAlign: 'center' },
  period: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  step: { marginVertical: 6 },
  button: { marginTop: 20, backgroundColor: '#1976D2', paddingVertical: 15, borderRadius: 10 },
  buttonLabel: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
});

export default RouteResultScreen;
