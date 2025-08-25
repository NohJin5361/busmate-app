import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VoiceWave = () => {
  const navigation = useNavigation();

  // 3개의 애니메이션 값
  const animationValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    animationValues.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 800,
            delay: i * 250,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // 2초 후 RouteFinding으로 이동
    const timer = setTimeout(() => {
      navigation.replace("RouteFinding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>뒤로가기</Text>
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
                    scaleY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 2.0],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>

      {/* 안내 텍스트 */}
      <Text style={styles.text}>
         AI가 경로를{"\n"} 탐색하고 있습니다
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  backButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#1976D2', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  backText: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
  waveContainer: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 40 },
  bar: { width: 14, height: 60, marginHorizontal: 6, borderRadius: 7, backgroundColor: '#1976D2' },
  text: { fontSize: 26, fontWeight: 'bold', color: '#222222', textAlign: 'center', lineHeight: 36 },
});

export default VoiceWave;
