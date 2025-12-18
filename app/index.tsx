import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

const ONBOARDING_KEY = 'sunpeak_onboarded';

export default function Index() {
    const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

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

    if (isOnboarded === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.backgroundLight }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (isOnboarded) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/onboarding" />;
}
