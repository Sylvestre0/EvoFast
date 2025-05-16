
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCustomFonts } from '@/assets/fonts/fonts';

export default function RootLayout() {
const loaded = useCustomFonts();

if (!loaded) return null;

return (
    <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />  
    </ThemeProvider>
);
}

