import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';   // 네비게이션 컨테이너를 위한 라이브러리
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';   // 상태 표시줄과 색상 모드, 뷰, 스타일시트를 위한 라이브러리

// BottomTabsNavigator 컴포넌트 경로
import BottomTabsNavigator from './app/components/BottomTabsNavigator'; 

// 앱의 메인 컴포넌트
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // 앱의 전체적인 스타일을 정의
  return (    
    <View style={appStyles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer> 
        <BottomTabsNavigator /> {/* 하단 탭바 네비게이션 컴포넌트 
        여기에서 HomeScreen, MyJourneyScreen이 실행됨
        이 현상을 코드 좀 정리하다가 늦게 발견해서 못함 */}
      </NavigationContainer>  
    </View>
  );
}


// 앱의 스타일 정의
const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});