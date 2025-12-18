import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';

const ONBOARDING_KEY = 'sunpeak_onboarded';

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Çıkış Yap',
            'Uygulamadan çıkış yapmak ve verileri sıfırlamak istediğinize emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                },
                {
                    text: 'Çıkış Yap',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem(ONBOARDING_KEY);
                            router.replace('/onboarding');
                        } catch (e) {
                            console.error('Error logging out:', e);
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                    <MaterialIcons name="person" size={64} color={Colors.gray300} />
                </View>

                {/* Title */}
                <Text style={styles.title}>Profil</Text>
                <Text style={styles.subtitle}>Bu özellik yakında eklenecek.</Text>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <Text style={styles.logoutButtonText}>Çıkış Yap / Reset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.gray500,
        textAlign: 'center',
        marginBottom: 32,
    },
    logoutButton: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        marginTop: 32,
    },
    logoutButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.red500,
    },
});
