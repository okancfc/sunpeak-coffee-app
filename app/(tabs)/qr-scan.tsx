import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Easing,
    Text,
    View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const QR_SIZE = width * 0.6;

export default function QRCodeScreen() {
    const { profile, user, isLoading } = useAuth();
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.02,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        const glowAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        pulseAnimation.start();
        glowAnimation.start();

        return () => {
            pulseAnimation.stop();
            glowAnimation.stop();
        };
    }, []);

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.6],
    });

    const qrValue = profile?.qr_code || `SUNPEAK-${user?.id || 'GUEST'}`;

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-bg-light">
                <ActivityIndicator size="large" color="#f9f506" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bg-light" edges={['top']}>
            {/* Header */}
            <View className="items-center py-4">
                <View className="flex-row items-center bg-text-main px-5 py-2.5 rounded-3xl">
                    <MaterialIcons name="qr-code-2" size={20} color="#fff" />
                    <Text className="text-sm font-bold text-white ml-2 tracking-wider">QR KODUM</Text>
                </View>
            </View>

            {/* Main Content */}
            <View className="flex-1 items-center px-6">
                {/* User Info */}
                <View className="flex-row items-center mb-8">
                    <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                        <Text className="text-xl font-bold text-text-main">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <View className="ml-3">
                        <Text className="text-xl font-bold text-text-main">{profile?.full_name || 'Kullanıcı'}</Text>
                        <Text className="text-sm text-gray-500 mt-0.5">Sunpeak Club Üyesi</Text>
                    </View>
                </View>

                {/* QR Code Card */}
                <View className="relative mb-8">
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: -20,
                            left: -20,
                            right: -20,
                            bottom: -20,
                            backgroundColor: '#f9f506',
                            borderRadius: 40,
                            opacity: glowOpacity,
                        }}
                    />
                    <Animated.View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 24,
                            padding: 24,
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            transform: [{ scale: pulseAnim }],
                        }}
                    >
                        <View className="p-4 bg-white rounded-2xl">
                            <QRCode
                                value={qrValue}
                                size={QR_SIZE}
                                color="#181811"
                                backgroundColor="#fff"
                            />
                        </View>

                        {/* Decorative corners */}
                        <View className="absolute top-3 left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-primary rounded-tl-lg" />
                        <View className="absolute top-3 right-3 w-6 h-6 border-t-[3px] border-r-[3px] border-primary rounded-tr-lg" />
                        <View className="absolute bottom-3 left-3 w-6 h-6 border-b-[3px] border-l-[3px] border-primary rounded-bl-lg" />
                        <View className="absolute bottom-3 right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-primary rounded-br-lg" />
                    </Animated.View>
                </View>

                {/* Instructions */}
                <View className="items-center mb-8">
                    <Text className="text-2xl font-bold text-text-main mb-2">Kasada Göster</Text>
                    <Text className="text-base text-gray-500 text-center">
                        Damga kazanmak için kasada bu QR kodu okutun
                    </Text>
                </View>

                {/* Stats */}
                <View className="flex-row bg-surface rounded-2xl p-5 w-full border border-gray-100">
                    <View className="flex-1 items-center">
                        <View className="w-10 h-10 rounded-full bg-primary-light items-center justify-center mb-2">
                            <MaterialIcons name="local-cafe" size={20} color="#dacc05" />
                        </View>
                        <Text className="text-xl font-bold text-text-main">{profile?.stamps_collected || 0}/6</Text>
                        <Text className="text-xs text-gray-500 mt-0.5">Damga</Text>
                    </View>
                    <View className="w-px bg-gray-200 mx-2" />
                    <View className="flex-1 items-center">
                        <View className="w-10 h-10 rounded-full bg-primary-light items-center justify-center mb-2">
                            <MaterialIcons name="card-giftcard" size={20} color="#dacc05" />
                        </View>
                        <Text className="text-xl font-bold text-text-main">{Math.max(0, 6 - (profile?.stamps_collected || 0))}</Text>
                        <Text className="text-xs text-gray-500 mt-0.5">Hediye Kaldı</Text>
                    </View>
                    <View className="w-px bg-gray-200 mx-2" />
                    <View className="flex-1 items-center">
                        <View className="w-10 h-10 rounded-full bg-primary-light items-center justify-center mb-2">
                            <MaterialIcons name="emoji-events" size={20} color="#dacc05" />
                        </View>
                        <Text className="text-xl font-bold text-text-main">{profile?.total_rewards || 0}</Text>
                        <Text className="text-xs text-gray-500 mt-0.5">Toplam Hediye</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
