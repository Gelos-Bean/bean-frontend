import React, { useEffect } from 'react';
import { Stack, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import MenuBar from '../components/MenuBar.jsx';
import theme from '../styles/theme.js';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const page = usePathname();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" /> 
      </Stack>
      {page !== '/login' && <MenuBar />}
    </PaperProvider>
  );
}