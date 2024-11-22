import React, { useContext, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { Stack, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';

import Header from '../components/Header.jsx';
import MenuBar from '../components/MenuBar.jsx';
import theme from '../styles/theme.js';
import styles from '../styles/posStyles.js';

SplashScreen.preventAutoHideAsync();

const Separator = () => <View style={styles.separator} />;

function RootLayoutContent() {
  const { authState } = useContext(AuthContext);
  const userName = authState?.user?.name || "User";
  const userImg = authState?.user?.image || "";

  const page = usePathname();
  const pageName = convertPageName(page);

  function convertPageName(path) {
    if (path == '/') {
      return 'Home';
    }
    return path.replace('/', '').replace(/^./, (str) => str.toUpperCase());
  }

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded)
    return null;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {page !== '/login' && (
          <>
            <Header 
              title={pageName} 
              location="Sydney" 
              username={userName}
              image={userImg} />
            <Separator />
          </>
        )}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" /> 
        </Stack>
        {page !== '/login' && <MenuBar />}
      </SafeAreaView>
    </PaperProvider>
  );
};



export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}