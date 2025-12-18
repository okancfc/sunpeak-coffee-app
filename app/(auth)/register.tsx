import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const router = useRouter();
    const { signUp, isLoading } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'İsim gerekli';
        }

        if (!email) {
            newErrors.email = 'E-posta gerekli';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Geçerli bir e-posta girin';
        }

        if (!password) {
            newErrors.password = 'Şifre gerekli';
        } else if (password.length < 6) {
            newErrors.password = 'Şifre en az 6 karakter olmalı';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Şifreler eşleşmiyor';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        const { error } = await signUp(email, password, fullName);

        if (error) {
            Alert.alert('Kayıt Hatası', error);
        } else {
            Alert.alert(
                'Kayıt Başarılı! 🎉',
                'Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.',
                [
                    {
                        text: 'Tamam',
                        onPress: () => router.replace('/(auth)/login'),
                    },
                ]
            );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg-light" edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white items-center justify-center mb-4 border border-gray-100"
                        onPress={() => router.back()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#181811" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-text-main mb-2">Hesap Oluştur</Text>
                        <Text className="text-base text-gray-500">Sunpeak Club'a katılın</Text>
                    </View>

                    {/* Form */}
                    <View className="mb-8">
                        {/* Full Name Input */}
                        <View className="mb-4">
                            <Text className="text-sm font-semibold text-text-main mb-2">İsim Soyisim</Text>
                            <View className={`flex-row items-center bg-white rounded-xl px-4 py-3.5 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}>
                                <MaterialIcons name="person" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 text-base text-text-main ml-3"
                                    placeholder="Adınız Soyadınız"
                                    placeholderTextColor="#9CA3AF"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    autoCapitalize="words"
                                    style={{ textAlignVertical: 'center', paddingVertical: 0 }}
                                />
                            </View>
                            {errors.fullName && <Text className="text-xs text-red-500 mt-1.5">{errors.fullName}</Text>}
                        </View>

                        {/* Email Input */}
                        <View className="mb-4">
                            <Text className="text-sm font-semibold text-text-main mb-2">E-posta</Text>
                            <View className={`flex-row items-center bg-white rounded-xl px-4 py-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-200'}`}>
                                <MaterialIcons name="email" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 text-base text-text-main ml-3"
                                    placeholder="ornek@email.com"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    style={{ textAlignVertical: 'center', paddingVertical: 0 }}
                                />
                            </View>
                            {errors.email && <Text className="text-xs text-red-500 mt-1.5">{errors.email}</Text>}
                        </View>

                        {/* Password Input */}
                        <View className="mb-4">
                            <Text className="text-sm font-semibold text-text-main mb-2">Şifre</Text>
                            <View className={`flex-row items-center bg-white rounded-xl px-4 py-3.5 border ${errors.password ? 'border-red-500' : 'border-gray-200'}`}>
                                <MaterialIcons name="lock" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 text-base text-text-main ml-3"
                                    placeholder="En az 6 karakter"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    style={{ textAlignVertical: 'center', paddingVertical: 0 }}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <MaterialIcons
                                        name={showPassword ? 'visibility' : 'visibility-off'}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text className="text-xs text-red-500 mt-1.5">{errors.password}</Text>}
                        </View>

                        {/* Confirm Password Input */}
                        <View className="mb-4">
                            <Text className="text-sm font-semibold text-text-main mb-2">Şifre Tekrar</Text>
                            <View className={`flex-row items-center bg-white rounded-xl px-4 py-3.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}>
                                <MaterialIcons name="lock-outline" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 text-base text-text-main ml-3"
                                    placeholder="Şifrenizi tekrar girin"
                                    placeholderTextColor="#9CA3AF"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    style={{ textAlignVertical: 'center', paddingVertical: 0 }}
                                />
                            </View>
                            {errors.confirmPassword && <Text className="text-xs text-red-500 mt-1.5">{errors.confirmPassword}</Text>}
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            className={`flex-row items-center justify-center py-4 rounded-xl mt-6 mb-2 ${fullName && email && password && confirmPassword
                                    ? 'bg-primary'
                                    : 'bg-gray-200'
                                }`}
                            onPress={handleRegister}
                            disabled={isLoading || !fullName || !email || !password || !confirmPassword}
                            activeOpacity={0.9}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#181811" />
                            ) : (
                                <>
                                    <Text className={`text-base font-bold ${fullName && email && password && confirmPassword
                                            ? 'text-text-main'
                                            : 'text-gray-400'
                                        }`}>Kayıt Ol</Text>
                                    <MaterialIcons
                                        name="arrow-forward"
                                        size={20}
                                        color={fullName && email && password && confirmPassword ? '#181811' : '#9CA3AF'}
                                        style={{ marginLeft: 8 }}
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Login Link */}
                    <View className="flex-row justify-center items-center mb-6">
                        <Text className="text-sm text-gray-500">Zaten hesabınız var mı?</Text>
                        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                            <Text className="text-sm font-bold text-text-main ml-2">Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
