import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="index"/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
