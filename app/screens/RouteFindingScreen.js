import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RouteFindingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("⏳ RouteFindingScreen 들어옴");
    const timer = setTimeout(() => {
      console.log("➡️ RouteResult로 이동 시도");
      navigation.replace("RouteResult"); // App.tsx와 동일
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976D2" />
      <Text style={styles.text}>AI가 최적의 경로를 찾고 있어요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  text:{ marginTop:20, fontSize:20, fontWeight:'600', color:'#333' }
});

export default RouteFindingScreen;
