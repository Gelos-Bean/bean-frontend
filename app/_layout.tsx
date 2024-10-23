import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    "primary": "rgb(156, 64, 77)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 218, 219)",
    "onPrimaryContainer": "rgb(64, 0, 15)",
    "secondary": "rgb(0, 108, 77)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(135, 248, 200)",
    "onSecondaryContainer": "rgb(0, 33, 21)",
    "tertiary": "rgb(140, 79, 0)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 220, 191)",
    "onTertiaryContainer": "rgb(45, 22, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(32, 26, 26)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(32, 26, 26)",
    "surfaceVariant": "rgb(244, 221, 222)",
    "onSurfaceVariant": "rgb(82, 67, 68)",
    "outline": "rgb(133, 115, 116)",
    "outlineVariant": "rgb(215, 193, 194)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(54, 47, 47)",
    "inverseOnSurface": "rgb(251, 238, 238)",
    "inversePrimary": "rgb(255, 178, 184)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(250, 242, 246)",
      "level2": "rgb(247, 236, 241)",
      "level3": "rgb(244, 230, 235)",
      "level4": "rgb(243, 229, 234)",
      "level5": "rgb(241, 225, 230)"
    },
    "surfaceDisabled": "rgba(32, 26, 26, 0.12)",
    "onSurfaceDisabled": "rgba(32, 26, 26, 0.38)",
    "backdrop": "rgba(59, 45, 46, 0.4)",
    "dark": "rgb(150, 65, 105)",
    "onDark": "rgb(255, 255, 255)",
    "darkContainer": "rgb(255, 217, 229)",
    "onDarkContainer": "rgb(61, 0, 35)"
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}