import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const { profile, user, signOut } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Çıkış Yap',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-bg-light" edges={['top']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-3xl font-bold text-text-main">Profil</Text>
                </View>

                {/* Profile Card */}
                <View className="bg-white rounded-2xl p-6 items-center mb-4 border border-gray-100">
                    <View className="relative mb-4">
                        <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
                            <Text className="text-3xl font-bold text-text-main">
                                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                            </Text>
                        </View>
                        <View className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white items-center justify-center border border-gray-100">
                            <MaterialIcons name="verified" size={16} color="#f9f506" />
                        </View>
                    </View>
                    <Text className="text-xl font-bold text-text-main mb-1">{profile?.full_name || 'Kullanıcı'}</Text>
                    <Text className="text-sm text-gray-500 mb-3">{user?.email}</Text>
                    <View className="flex-row items-center bg-primary-light px-3 py-1.5 rounded-full">
                        <MaterialIcons name="local-cafe" size={14} color="#181811" />
                        <Text className="text-xs font-semibold text-text-main ml-1.5">Sunpeak Club Üyesi</Text>
                    </View>
                </View>

                {/* Stats */}
                <View className="flex-row bg-surface rounded-2xl p-5 mb-4">
                    <View className="flex-1 items-center">
                        <Text className="text-3xl font-bold text-text-main">{profile?.stamps_collected || 0}</Text>
                        <Text className="text-xs text-gray-500 mt-1">Toplam Damga</Text>
                    </View>
                    <View className="w-px bg-gray-200 mx-4" />
                    <View className="flex-1 items-center">
                        <Text className="text-3xl font-bold text-text-main">{profile?.total_rewards || 0}</Text>
                        <Text className="text-xs text-gray-500 mt-1">Hediye Kahve</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="bg-white rounded-2xl overflow-hidden mb-4">
                    <TouchableOpacity
                        className="flex-row items-center p-4 border-b border-gray-100"
                        onPress={() => router.push('/(tabs)/qr-scan')}
                    >
                        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                            <MaterialIcons name="qr-code-2" size={22} color="#181811" />
                        </View>
                        <View className="flex-1 ml-3">
                            <Text className="text-base font-semibold text-text-main">QR Kodum</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">Damga kazanmak için göster</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row items-center p-4 border-b border-gray-100"
                        onPress={() => router.push('/stamp-detail')}
                    >
                        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                            <MaterialIcons name="history" size={22} color="#181811" />
                        </View>
                        <View className="flex-1 ml-3">
                            <Text className="text-base font-semibold text-text-main">Geçmiş</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">Tüm aktivitelerim</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                            <MaterialIcons name="notifications" size={22} color="#181811" />
                        </View>
                        <View className="flex-1 ml-3">
                            <Text className="text-base font-semibold text-text-main">Bildirimler</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">Kampanya ve fırsatlar</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center p-4">
                        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                            <MaterialIcons name="help-outline" size={22} color="#181811" />
                        </View>
                        <View className="flex-1 ml-3">
                            <Text className="text-base font-semibold text-text-main">Yardım</Text>
                            <Text className="text-xs text-gray-500 mt-0.5">SSS ve destek</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    className="flex-row border border-red-300 items-center justify-center bg-red-50 py-3.5 rounded-xl mb-4"
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="logout" size={20} color="#EF4444" />
                    <Text className="text-base font-semibold text-red-500 ml-2">Çıkış Yap</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text className="text-xs text-gray-400 text-center">Sunpeak Coffee v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
