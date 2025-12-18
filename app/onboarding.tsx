import { Colors } from '@/constants/Colors';
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

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const { setOnboardingComplete } = useOnboarding();

    const handleComplete = async () => {
        await setOnboardingComplete();
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            {/* Hero Image Section */}
            <View style={styles.heroSection}>
                <ImageBackground
                    source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ6dm00TuLwnImwaFXSGza6OSTSHvYXFqNYflYwC2EM4pmryJbsst5rupWcAAH3wNrXgi3s4svybM5oGEVgBSArR-8TY2x-vN4bqXuoISlLv6b81kSi6SfsdSsa6CbuzkVwNcX7TL0dUgEs-92bofPK_K18AjeSs0LCxqxorkqaj9abyhpRdUOVEDDmpEwYVHEKdrzs0aQlbFJ9JBeN3iPXtmKFracXAt7rslMjR0XIjH1Pj50GboGSS_XplnTnbTE09HfPO3vcrs',
                    }}
                    style={styles.heroImage}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'transparent', 'rgba(0,0,0,0.2)']}
                        style={styles.heroGradient}
                    />
                </ImageBackground>

                {/* Floating Badge */}
                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <MaterialIcons name="verified" size={18} color={Colors.textMain} />
                        <Text style={styles.badgeText}>EN AVANTAJLI</Text>
                    </View>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
                {/* Brand */}
                <View style={styles.brandContainer}>
                    <MaterialIcons name="wb-sunny" size={32} color="#D97706" />
                    <Text style={styles.brandText}>Sunpeak Coffee</Text>
                </View>

                {/* Headline */}
                <View style={styles.headlineContainer}>
                    <Text style={styles.headline}>
                        Her gün{'\n'}kahve keyfi
                    </Text>
                    <Text style={styles.subheadline}>
                        Abone ol, her gün 1 kahveni ücretsiz al.
                    </Text>
                </View>

                {/* Pagination Dots */}
                <View style={styles.dotsContainer}>
                    <View style={[styles.dot, styles.dotInactive]} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={[styles.dot, styles.dotInactive]} />
                </View>

                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleComplete}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.primaryButtonText}>Başlayalım</Text>
                        <MaterialIcons name="arrow-forward" size={24} color={Colors.textMain} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleComplete}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.secondaryButtonText}>Atla</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    heroSection: {
        height: height * 0.55,
        width: '100%',
        position: 'relative',
    },
    heroImage: {
        flex: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    badgeContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    badgeText: {
        color: Colors.textMain,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    contentSection: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 32,
        marginTop: -24,
        backgroundColor: Colors.backgroundLight,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    brandText: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textMain,
        letterSpacing: -0.5,
    },
    headlineContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    headline: {
        fontSize: 40,
        fontWeight: '700',
        color: Colors.textMain,
        textAlign: 'center',
        lineHeight: 44,
        letterSpacing: -1,
    },
    subheadline: {
        fontSize: 16,
        color: Colors.gray500,
        textAlign: 'center',
        marginTop: 12,
        maxWidth: 280,
        lineHeight: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 32,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    dotActive: {
        width: 32,
        backgroundColor: Colors.primary,
    },
    dotInactive: {
        width: 8,
        backgroundColor: Colors.gray300,
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 'auto',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 5,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textMain,
    },
    secondaryButton: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.gray500,
    },
});
