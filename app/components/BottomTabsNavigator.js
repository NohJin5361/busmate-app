import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';   // 하단 탭바 네비게이션을 위한 라이브러리

// HomeScreen과 MyJourneyScreen 컴포넌트 경로 
import HomeScreen from '../screens/HomeScreen';
import MyJourneyScreen from '../screens/MyJourneyScreen';
 
// 하단 탭바 네비게이션 생성
const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (

    // 하단 탭바 UI 스타일 설정
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue', // 활성화된 탭 텍스트 색상
        tabBarInactiveTintColor: 'gray', // 비활성화된 탭 텍스트 색상
        headerShown: false, // 각 탭 화면 상단 헤더 숨김
        tabBarStyle: { height: 60, paddingBottom: 5 }, // 탭바 높이 및 패딩
        tabBarLabelStyle: { fontSize: 15 }, // 글자 크기
      }}
    >
        {/* 하단 탭바 UI 설정 */}
      <Tab.Screen
        name="기본 화면"
        component={HomeScreen}
        options={{ title: '기본 화면' }}
      />
      <Tab.Screen
        name="내 여정"
        component={MyJourneyScreen}
        options={{ title: '내 여정' }}
      />
    </Tab.Navigator>
  );
}