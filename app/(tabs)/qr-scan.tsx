import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
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
        // Pulse animation for QR border
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

        // Glow animation
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

    // QR code value - uses user's unique QR code from database
    const qrValue = profile?.qr_code || `SUNPEAK-${user?.id || 'GUEST'}`;

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerBadge}>
                    <MaterialIcons name="qr-code-2" size={20} color={Colors.white} />
                    <Text style={styles.headerBadgeText}>QR KODUM</Text>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* User Info */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.userAvatar}>
                        <Text style={styles.userAvatarText}>
                            {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{profile?.full_name || 'Kullanıcı'}</Text>
                        <Text style={styles.userMembership}>Sunpeak Club Üyesi</Text>
                    </View>
                </View>

                {/* QR Code Card */}
                <View style={styles.qrCardContainer}>
                    <Animated.View
                        style={[
                            styles.qrGlow,
                            { opacity: glowOpacity }
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.qrCard,
                            { transform: [{ scale: pulseAnim }] }
                        ]}
                    >
                        <View style={styles.qrWrapper}>
                            <QRCode
                                value={qrValue}
                                size={QR_SIZE}
                                color={Colors.textMain}
                                backgroundColor={Colors.white}
                            />
                        </View>

                        {/* Decorative corners */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </Animated.View>
                </View>

                {/* Instructions */}
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionTitle}>Kasada Göster</Text>
                    <Text style={styles.instructionText}>
                        Damga kazanmak için kasada bu QR kodu okutun
                    </Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="local-cafe" size={20} color={Colors.primaryDark} />
                        </View>
                        <Text style={styles.statValue}>{profile?.stamps_collected || 0}/6</Text>
                        <Text style={styles.statLabel}>Damga</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="card-giftcard" size={20} color={Colors.primaryDark} />
                        </View>
                        <Text style={styles.statValue}>{Math.max(0, 6 - (profile?.stamps_collected || 0))}</Text>
                        <Text style={styles.statLabel}>Hediye Kaldı</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="emoji-events" size={20} color={Colors.primaryDark} />
                        </View>
                        <Text style={styles.statValue}>{profile?.total_rewards || 0}</Text>
                        <Text style={styles.statLabel}>Toplam Hediye</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundLight,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.textMain,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        gap: 8,
    },
    headerBadgeText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.white,
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    userAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    userAvatarText: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textMain,
    },
    userDetails: {
        marginLeft: 12,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textMain,
    },
    userMembership: {
        fontSize: 14,
        color: Colors.gray500,
        marginTop: 2,
    },
    qrCardContainer: {
        position: 'relative',
        marginBottom: 32,
    },
    qrGlow: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        backgroundColor: Colors.primary,
        borderRadius: 40,
    },
    qrCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
        position: 'relative',
    },
    qrWrapper: {
        padding: 16,
        backgroundColor: Colors.white,
        borderRadius: 16,
    },
    corner: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderColor: Colors.primary,
    },
    topLeft: {
        top: 12,
        left: 12,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderTopLeftRadius: 8,
    },
    topRight: {
        top: 12,
        right: 12,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopRightRadius: 8,
    },
    bottomLeft: {
        bottom: 12,
        left: 12,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderBottomLeftRadius: 8,
    },
    bottomRight: {
        bottom: 12,
        right: 12,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderBottomRightRadius: 8,
    },
    instructionsContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    instructionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 16,
        color: Colors.gray500,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.surfaceLight,
        borderRadius: 20,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textMain,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.gray500,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: Colors.gray200,
        marginHorizontal: 8,
    },
});
