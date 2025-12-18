import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function StampDetailScreen() {
    const router = useRouter();
    const [animate, setAnimate] = useState(false);
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(20);

    useEffect(() => {
        setAnimate(true);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleBack = () => {
        router.back();
    };

    const renderStamp = (index: number, filled: boolean, isGift: boolean = false) => {
        const delay = index * 100;

        if (isGift) {
            return (
                <View key={`gift-${index}`} style={styles.stampGift}>
                    <MaterialIcons name="redeem" size={24} color={Colors.yellow600} />
                </View>
            );
        }

        if (filled) {
            return (
                <Animated.View
                    key={`filled-${index}`}
                    style={[
                        styles.stampContainer,
                        {
                            opacity: fadeAnim,
                            transform: [
                                {
                                    scale: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.5, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.stampFilled}>
                        <MaterialIcons name="check" size={18} color={Colors.textMain} />
                    </View>
                </Animated.View>
            );
        }

        return (
            <View key={`empty-${index}`} style={styles.stampEmpty}>
                <MaterialIcons name="local-cafe" size={18} color={Colors.gray300} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Background Glows */}
            <View style={styles.bgGlow1} />
            <View style={styles.bgGlow2} />

            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.textMain} />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Text style={styles.headerBadgeText}>SADAKAT KARTI</Text>
                    </View>
                    <View style={{ width: 32 }} />
                </View>

                {/* Main Content */}
                <Animated.View
                    style={[
                        styles.mainContent,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Stamp Card */}
                    <View style={styles.stampCardWrapper}>
                        <View style={styles.stampCardShadow} />
                        <View style={styles.stampCard}>
                            {/* Card Header */}
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.cardTitle}>Sunpeak Club</Text>
                                    <Text style={styles.cardSubtitle}>HEDİYE KAHVE PROGRAMI</Text>
                                </View>
                                <View style={styles.cardIcon}>
                                    <MaterialIcons name="local-cafe" size={20} color={Colors.textMain} />
                                </View>
                            </View>

                            {/* Stamps Grid - 7 stamps (6 regular + 1 gift) */}
                            <View style={styles.stampsGrid}>
                                {[...Array(4)].map((_, i) => renderStamp(i, true))}
                                {[...Array(2)].map((_, i) => renderStamp(i + 4, false))}
                                {renderStamp(6, false, true)}
                            </View>

                            {/* Progress Info */}
                            <View style={styles.progressInfo}>
                                <Text style={styles.progressText}>4/6 Tamamlandı</Text>
                                <Text style={styles.progressReward}>2 kahve sonra hediye!</Text>
                            </View>
                        </View>
                    </View>

                    {/* Info Text */}
                    <Animated.View
                        style={[
                            styles.infoContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <Text style={styles.infoTitle}>
                            6 kahve al,{'\n'}
                            <Text style={styles.infoTitleHighlight}>7. kahve hediye!</Text>
                        </Text>
                        <Text style={styles.infoDescription}>
                            Fiziksel kart yok. Her kahve, dijital kartına damga olur. QR kodunu kasada okutman yeterli.
                        </Text>
                    </Animated.View>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        position: 'relative',
    },
    bgGlow1: {
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '50%',
        height: '50%',
        borderRadius: 999,
        backgroundColor: 'rgba(249, 245, 6, 0.2)',
    },
    bgGlow2: {
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '60%',
        height: '60%',
        borderRadius: 999,
        backgroundColor: 'rgba(249, 245, 6, 0.1)',
    },
    safeArea: {
        flex: 1,
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    headerBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textSecondary,
        letterSpacing: 1,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    // Stamp Card
    stampCardWrapper: {
        position: 'relative',
        marginBottom: 40,
    },
    stampCardShadow: {
        position: 'absolute',
        bottom: -16,
        left: 24,
        right: 24,
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 24,
        transform: [{ scaleX: 0.95 }],
    },
    stampCard: {
        backgroundColor: Colors.surfaceLight,
        borderRadius: 24,
        padding: 24,
        shadowColor: 'rgba(24, 24, 17, 0.08)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textMain,
    },
    cardSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
        letterSpacing: 1,
        marginTop: 4,
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    // Stamps Grid
    stampsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    stampContainer: {
        width: 40,
        height: 40,
    },
    stampFilled: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    stampEmpty: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.gray200,
    },
    stampGift: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(249, 245, 6, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    // Progress Info
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.gray50,
        padding: 12,
        borderRadius: 12,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    progressReward: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textMain,
    },
    // Info Section
    infoContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    infoTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.textMain,
        textAlign: 'center',
        lineHeight: 36,
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    infoTitleHighlight: {
        color: 'transparent',
    },
    infoDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 280,
    },
});
