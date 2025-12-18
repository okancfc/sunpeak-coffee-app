import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useOnboarding } from './_layout';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const { setOnboardingComplete } = useOnboarding();

    const handleComplete = async () => {
        await setOnboardingComplete();
        router.replace('/(tabs)');
    };

    return (
        <View className="flex-1 bg-bg-light">
            {/* Hero Image Section */}
            <View style={{ height: height * 0.55 }} className="w-full relative">
                <ImageBackground
                    source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ6dm00TuLwnImwaFXSGza6OSTSHvYXFqNYflYwC2EM4pmryJbsst5rupWcAAH3wNrXgi3s4svybM5oGEVgBSArR-8TY2x-vN4bqXuoISlLv6b81kSi6SfsdSsa6CbuzkVwNcX7TL0dUgEs-92bofPK_K18AjeSs0LCxqxorkqaj9abyhpRdUOVEDDmpEwYVHEKdrzs0aQlbFJ9JBeN3iPXtmKFracXAt7rslMjR0XIjH1Pj50GboGSS_XplnTnbTE09HfPO3vcrs',
                    }}
                    style={styles.heroImage}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'transparent', 'rgba(0,0,0,0.2)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                </ImageBackground>

                {/* Floating Badge */}
                <View className="absolute bottom-5 left-0 right-0 items-center">
                    <View className="flex-row items-center bg-primary px-5 py-2.5 rounded-full">
                        <MaterialIcons name="verified" size={18} color="#181811" />
                        <Text className="text-xs font-bold text-text-main tracking-wider ml-2">EN AVANTAJLI</Text>
                    </View>
                </View>
            </View>

            {/* Content Section */}
            <View className="flex-1 px-6 pt-8 pb-10 justify-between">
                {/* Brand */}
                <View className="flex-row items-center gap-2.5">
                    <MaterialIcons name="wb-sunny" size={32} color="#D97706" />
                    <Text className="text-xl font-bold text-text-main">Sunpeak Coffee</Text>
                </View>

                {/* Headline */}
                <View className="my-6">
                    <Text className="text-5xl font-bold text-text-main leading-[56px]">
                        Her gün{'\n'}kahve keyfi
                    </Text>
                    <Text className="text-lg text-gray-500 mt-4 leading-6">
                        Abone ol, her gün 1 kahveni ücretsiz al.
                    </Text>
                </View>

                {/* Pagination Dots */}
                <View className="flex-row justify-center gap-2 mb-6">
                    <View className="w-2 h-2 rounded-full bg-gray-300" />
                    <View className="w-8 h-2 rounded-full bg-primary" />
                    <View className="w-2 h-2 rounded-full bg-gray-300" />
                </View>

                {/* Buttons */}
                <View className="gap-3">
                    <TouchableOpacity
                        className="flex-row items-center justify-center bg-primary py-4.5 rounded-2xl"
                        style={{ paddingVertical: 18 }}
                        onPress={handleComplete}
                        activeOpacity={0.9}
                    >
                        <Text className="text-lg font-bold text-text-main">Başlayalım</Text>
                        <MaterialIcons name="arrow-forward" size={24} color="#181811" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-3 items-center"
                        onPress={handleComplete}
                        activeOpacity={0.7}
                    >
                        <Text className="text-base font-semibold text-gray-500">Atla</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heroImage: {
        flex: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
});
