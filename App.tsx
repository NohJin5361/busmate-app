import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';   // 네비게이션 컨테이너를 위한 라이브러리
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';   // 상태 표시줄과 색상 모드, 뷰, 스타일시트를 위한 라이브러리

// BottomTabsNavigator 컴포넌트 경로
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './app/components/BottomTabsNavigator';

// 개별 화면들
import SearchScreen from './app/screens/SearchScreen';
import VoiceSearchScreen from './app/screens/VoiceSearchScreen';

// Stack Navigator 생성
const Stack = createNativeStackNavigator();

// 앱의 메인 컴포넌트
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // 앱의 전체적인 스타일을 정의
  return (
    <View style={appStyles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* 탭 네비게이터는 Stack의 첫 화면으로 */}
          <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />

          {/* 탭 외부에서 접근하는 화면들 */}
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="VoiceSearch" component={VoiceSearchScreen} />
        </Stack.Navigator>
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