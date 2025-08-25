import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './app/components/BottomTabsNavigator';

// Screens import
import HomeScreen from './app/screens/HomeScreen';
import MyJourneyScreen from './app/screens/MyJourneyScreen';
import RouteFindingScreen from './app/screens/RouteFindingScreen';
import RouteResultScreen from './app/screens/RouteResultScreen';
import SearchScreen from './app/screens/SearchScreen';
import VoiceSearchScreen from './app/screens/VoiceSearchScreen';
import GuidanceStartScreen from './app/screens/GuidanceStartScreen';
import BusMovingScreen from './app/screens/BusMovingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 메인 탭 네비게이터 */}
        <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />

        {/* 주요 화면들 */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MyJourney" component={MyJourneyScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="VoiceSearch" component={VoiceSearchScreen} />
        <Stack.Screen name="GuidanceStart" component={GuidanceStartScreen} />
        <Stack.Screen name="BusMoving" component={BusMovingScreen} />

        {/* 경로 안내 관련 */}
        <Stack.Screen name="RouteFinding" component={RouteFindingScreen} />
        <Stack.Screen name="RouteResult" component={RouteResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
