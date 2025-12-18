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

export default function LoginScreen() {
    const router = useRouter();
    const { signIn, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        const { error } = await signIn(email, password);

        if (error) {
            Alert.alert('Giriş Hatası', 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg-light" edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View className="items-center mb-10">
                        <View className="w-20 h-20 rounded-full bg-primary-light items-center justify-center mb-6">
                            <MaterialIcons name="wb-sunny" size={48} color="#dacc05" />
                        </View>
                        <Text className="text-3xl font-bold text-text-main mb-2">Hoş Geldiniz</Text>
                        <Text className="text-base text-gray-500">Sunpeak Coffee'ye giriş yapın</Text>
                    </View>

                    {/* Form */}
                    <View className="mb-8">
                        {/* Email Input */}
                        <View className="mb-5">
                            <Text className="text-sm font-semibold text-text-main mb-2">E-posta</Text>
                            <View className={`flex-row items-center bg-white rounded-xl px-4 py-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-200'}`}>
                                <MaterialIcons name="email" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 text-text-main ml-3"
                                    placeholder="ornek@email.com"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    style={{ height: 24 }}
                                />
                            </View>
                            {errors.email && <Text className="text-xs text-red-500 mt-1.5">{errors.email}</Text>}
                        </View>

                        {/* Password Input */}
                        <View className="mb-5">
                            <Text className="text-sm font-semibold text-text-main mb-2">Şifre</Text>
                            <View className={`flex-row items-center bg-white rounded-xl px-4 py-3.5 border ${errors.password ? 'border-red-500' : 'border-gray-200'}`}>
                                <MaterialIcons name="lock" size={20} color="#9CA3AF" />
                                <TextInput
                                    className="flex-1 text-text-main ml-3"
                                    placeholder="••••••••"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    style={{ height: 24 }}
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

                        {/* Login Button */}
                        <TouchableOpacity
                            className="flex-row items-center justify-center bg-primary py-4 rounded-xl mt-2"
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.9}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#181811" />
                            ) : (
                                <>
                                    <Text className="text-base font-bold text-text-main">Giriş Yap</Text>
                                    <MaterialIcons name="arrow-forward" size={20} color="#181811" style={{ marginLeft: 8 }} />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Register Link */}
                    <View className="flex-row justify-center items-center">
                        <Text className="text-sm text-gray-500">Hesabınız yok mu?</Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text className="text-sm font-bold text-text-main ml-2">Kayıt Ol</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
