
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export function useCustomFonts() {
const [fontsLoaded] = useFonts({
    SpaceMono: require('./SpaceMono-Regular.ttf'),
});

useEffect(() => {
    if (fontsLoaded) {
    SplashScreen.hideAsync();
    }
}, [fontsLoaded]);

return fontsLoaded;
}
    