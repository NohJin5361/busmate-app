import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './app/components/BottomTabsNavigator';

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
        {/* 탭 네비게이터 첫 화면 */}
        <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
        {/* 탭 외부에서 접근하는 화면들 */}
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="GuidanceStartScreen" component={GuidanceStartScreen} />
        <Stack.Screen name="VoiceSearch" component={VoiceSearchScreen} />
        <Stack.Screen name="BusMovingScreen" component={BusMovingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});