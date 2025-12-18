import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StampDetailScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleBack = () => {
        router.back();
    };

    const handleShowQR = () => {
        // Modal'ı kapat ve QR ekranına git
        router.replace('/(tabs)/qr-scan');
    };

    // Stamp data - 4 filled, 2 empty, 1 gift
    const stamps = [
        { filled: true },
        { filled: true },
        { filled: true },
        { filled: true },
        { filled: false },
        { filled: false },
        { filled: false, isGift: true },
    ];

    const renderStamp = (stamp: { filled: boolean; isGift?: boolean }, index: number) => {
        if (stamp.isGift) {
            return (
                <View key={index} className="w-12 h-14 items-center justify-center">
                    <MaterialIcons name="card-giftcard" size={24} color="#dacc05" />
                    <Text className="text-[8px] font-bold text-primary-dark mt-0.5">HEDİYE</Text>
                </View>
            );
        }

        if (stamp.filled) {
            return (
                <View key={index} className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                    <MaterialIcons name="check" size={22} color="#181811" />
                </View>
            );
        }

        return (
            <View key={index} className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center border border-dashed border-gray-300">
                <MaterialIcons name="local-cafe" size={20} color="#E0E0E0" />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-bg-light">
            {/* Background Gradient */}
            <LinearGradient
                colors={['rgba(249, 245, 6, 0.3)', '#f8f8f5', '#f8f8f5']}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="flex-row items-center shadow-lg shadow-black/10 justify-between px-5 py-4">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-100"
                        onPress={handleBack}
                    >
                        <MaterialIcons name="close" size={24} color="#181811" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-text-main">Sadakat Kartım</Text>
                    <View className="w-10" />
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Stamp Card */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim }
                            ],
                        }}
                        className="bg-white rounded-3xl p-6 border border-gray-100 mb-4"
                    >
                        {/* Card Header */}
                        <View className="flex-row justify-between items-center mb-6">
                            <View>
                                <Text className="text-xl font-bold text-text-main">Sunpeak Club</Text>
                                <Text className="text-xs text-gray-400 tracking-wider mt-0.5">HEDİYE KAHVE PROGRAMI</Text>
                            </View>
                            <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                                <MaterialIcons name="local-cafe" size={18} color="#181811" />
                            </View>
                        </View>

                        {/* Progress Text */}
                        <View className="mb-5">
                            <Text className="text-2xl font-bold text-text-main">4/6 Tamamlandı</Text>
                            <Text className="text-sm text-gray-500 mt-1">2 kahve sonra hediye! 🎉</Text>
                        </View>

                        {/* Stamps Grid */}
                        <View className="flex-row justify-between mb-5">
                            {stamps.map((stamp, index) => renderStamp(stamp, index))}
                        </View>

                        {/* Progress Bar */}
                        <View className="h-1.5 bg-gray-100 rounded-full">
                            <View className="h-full bg-primary rounded-full" style={{ width: '66%' }} />
                        </View>
                    </Animated.View>

                    {/* Info Card */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                        className="flex-row bg-white rounded-2xl p-4 mb-4"
                    >
                        <View className="w-12 h-12 rounded-full bg-primary/30 items-center justify-center">
                            <MaterialIcons name="info-outline" size={24} color="#dacc05" />
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className="text-lg font-bold text-text-main mb-1">Nasıl Çalışır?</Text>
                            <Text className="text-md text-gray-600/60 leading-5">
                                6 kahve al, 7. kahve hediye! Her alışverişte QR kodunuzu okutun ve damga kazanın.
                            </Text>
                        </View>
                    </Animated.View>

                    {/* QR Button */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                    >
                        <TouchableOpacity
                            className="flex-row items-center bg-primary p-4 rounded-2xl"
                            onPress={handleShowQR}
                            activeOpacity={0.9}
                        >
                            <View className="w-16 h-16 rounded-xl bg-white/30 items-center justify-center">
                                <MaterialIcons name="qr-code-2" size={28} color="#181811" />
                            </View>
                            <View className="flex-1 ml-6">
                                <Text className="text-xl font-bold text-text-main">QR Kodumu Göster</Text>
                                <Text className="text-md text-text-main/60 mt-0.5">Kasada okutarak damga kazan</Text>
                            </View>
                            <MaterialIcons name="arrow-forward-ios" size={18} color="#181811" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Activity History */}
                    <View className="mt-6">
                        <Text className="text-lg font-bold text-text-main mb-4">Son Aktiviteler</Text>

                        <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                            <View className="flex-row items-center p-4 border-b border-gray-100">
                                <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center">
                                    <MaterialIcons name="add-circle" size={20} color="#22C55E" />
                                </View>
                                <View className="flex-1 ml-3">
                                    <Text className="text-sm font-semibold text-text-main">Damga Kazanıldı</Text>
                                    <Text className="text-xs text-gray-500 mt-0.5">Bugün, 14:30</Text>
                                </View>
                                <Text className="text-sm font-bold text-green-500">+1</Text>
                            </View>

                            <View className="flex-row items-center p-4 border-b border-gray-100">
                                <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center">
                                    <MaterialIcons name="add-circle" size={20} color="#22C55E" />
                                </View>
                                <View className="flex-1 ml-3">
                                    <Text className="text-sm font-semibold text-text-main">Damga Kazanıldı</Text>
                                    <Text className="text-xs text-gray-500 mt-0.5">Dün, 09:15</Text>
                                </View>
                                <Text className="text-sm font-bold text-green-500">+1</Text>
                            </View>

                            <View className="flex-row items-center p-4">
                                <View className="w-10 h-10 rounded-full bg-purple-50 items-center justify-center">
                                    <MaterialIcons name="card-giftcard" size={20} color="#8B5CF6" />
                                </View>
                                <View className="flex-1 ml-3">
                                    <Text className="text-sm font-semibold text-text-main">Hediye Kullanıldı</Text>
                                    <Text className="text-xs text-gray-500 mt-0.5">12 Aralık, 11:45</Text>
                                </View>
                                <Text className="text-sm font-bold text-purple-500">🎁</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
