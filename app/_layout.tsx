import { Colors } from '@/constants/Colors';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = 'sunpeak_onboarded';

// Context to share onboarding state and setter
interface OnboardingContextType {
  isOnboarded: boolean | null;
  setOnboardingComplete: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  isOnboarded: null,
  setOnboardingComplete: () => { },
});

export const useOnboarding = () => useContext(OnboardingContext);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  const setOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setIsOnboarded(true);
    } catch (e) {
      console.error('Error saving onboarding status:', e);
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        setIsOnboarded(value === 'true');
      } catch (e) {
        setIsOnboarded(false);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded && isOnboarded !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isOnboarded]);

  if (!loaded || isOnboarded === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.backgroundLight }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <OnboardingContext.Provider value={{ isOnboarded, setOnboardingComplete }}>
        <RootLayoutNav isOnboarded={isOnboarded} />
      </OnboardingContext.Provider>
    </AuthProvider>
  );
}

function RootLayoutNav({ isOnboarded }: { isOnboarded: boolean }) {
  const router = useRouter();
  const segments = useSegments();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inOnboarding = segments[0] === 'onboarding';
    const inAuth = segments[0] === '(auth)';
    const inTabs = segments[0] === '(tabs)';

    // Priority 1: Not onboarded -> go to onboarding
    if (!isOnboarded && !inOnboarding) {
      router.replace('/onboarding');
      return;
    }

    // Priority 2: Onboarded but not logged in -> go to auth
    if (isOnboarded && !session && !inAuth && !inOnboarding) {
      router.replace('/(auth)/login');
      return;
    }

    // Priority 3: Logged in -> go to tabs
    if (isOnboarded && session && (inAuth || inOnboarding)) {
      router.replace('/(tabs)');
      return;
    }
  }, [isOnboarded, session, segments, isLoading]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="stamp-detail"
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom'
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
