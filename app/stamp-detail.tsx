import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

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
        router.push('/(tabs)/qr-scan');
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
                <View key={index} style={styles.stampGift}>
                    <MaterialIcons name="card-giftcard" size={24} color={Colors.primaryDark} />
                    <Text style={styles.stampGiftLabel}>HEDİYE</Text>
                </View>
            );
        }

        if (stamp.filled) {
            return (
                <View key={index} style={styles.stampFilled}>
                    <MaterialIcons name="check" size={22} color={Colors.textMain} />
                </View>
            );
        }

        return (
            <View key={index} style={styles.stampEmpty}>
                <MaterialIcons name="local-cafe" size={20} color={Colors.gray300} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={[Colors.primaryLight, Colors.backgroundLight, Colors.backgroundLight]}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <MaterialIcons name="close" size={24} color={Colors.textMain} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sadakat Kartım</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Stamp Card */}
                    <Animated.View
                        style={[
                            styles.stampCard,
                            {
                                opacity: fadeAnim,
                                transform: [
                                    { translateY: slideAnim },
                                    { scale: scaleAnim }
                                ],
                            }
                        ]}
                    >
                        {/* Card Header */}
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.cardTitle}>Sunpeak Club</Text>
                                <Text style={styles.cardSubtitle}>HEDİYE KAHVE PROGRAMI</Text>
                            </View>
                            <View style={styles.cardBadge}>
                                <MaterialIcons name="local-cafe" size={18} color={Colors.textMain} />
                            </View>
                        </View>

                        {/* Progress Text */}
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressTitle}>4/6 Tamamlandı</Text>
                            <Text style={styles.progressSubtitle}>2 kahve sonra hediye! 🎉</Text>
                        </View>

                        {/* Stamps Grid */}
                        <View style={styles.stampsGrid}>
                            {stamps.map((stamp, index) => renderStamp(stamp, index))}
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: '66%' }]} />
                        </View>
                    </Animated.View>

                    {/* Info Card */}
                    <Animated.View
                        style={[
                            styles.infoCard,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }
                        ]}
                    >
                        <View style={styles.infoIconContainer}>
                            <MaterialIcons name="info-outline" size={24} color={Colors.primaryDark} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>Nasıl Çalışır?</Text>
                            <Text style={styles.infoText}>
                                6 kahve al, 7. kahve hediye! Her alışverişte QR kodunuzu okutun ve damga kazanın.
                            </Text>
                        </View>
                    </Animated.View>

                    {/* QR Button */}
                    <Animated.View
                        style={[
                            styles.qrButtonContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.qrButton}
                            onPress={handleShowQR}
                            activeOpacity={0.9}
                        >
                            <View style={styles.qrButtonIcon}>
                                <MaterialIcons name="qr-code-2" size={28} color={Colors.textMain} />
                            </View>
                            <View style={styles.qrButtonContent}>
                                <Text style={styles.qrButtonTitle}>QR Kodumu Göster</Text>
                                <Text style={styles.qrButtonSubtitle}>Kasada okutarak damga kazan</Text>
                            </View>
                            <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.textMain} />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* History Section */}
                    <Animated.View
                        style={[
                            styles.historySection,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>Son Aktiviteler</Text>

                        <View style={styles.historyItem}>
                            <View style={styles.historyIconContainer}>
                                <MaterialIcons name="add-circle" size={20} color="#22C55E" />
                            </View>
                            <View style={styles.historyContent}>
                                <Text style={styles.historyTitle}>Damga Kazanıldı</Text>
                                <Text style={styles.historySubtitle}>Latte - Kadıköy Şube</Text>
                            </View>
                            <Text style={styles.historyTime}>Bugün</Text>
                        </View>

                        <View style={styles.historyItem}>
                            <View style={styles.historyIconContainer}>
                                <MaterialIcons name="add-circle" size={20} color="#22C55E" />
                            </View>
                            <View style={styles.historyContent}>
                                <Text style={styles.historyTitle}>Damga Kazanıldı</Text>
                                <Text style={styles.historySubtitle}>Cappuccino - Beşiktaş Şube</Text>
                            </View>
                            <Text style={styles.historyTime}>Dün</Text>
                        </View>

                        <View style={styles.historyItem}>
                            <View style={[styles.historyIconContainer, { backgroundColor: Colors.primaryLight }]}>
                                <MaterialIcons name="card-giftcard" size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.historyContent}>
                                <Text style={styles.historyTitle}>Hediye Kullanıldı</Text>
                                <Text style={styles.historySubtitle}>Ücretsiz Latte</Text>
                            </View>
                            <Text style={styles.historyTime}>3 gün önce</Text>
                        </View>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textMain,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    // Stamp Card
    stampCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 8,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textMain,
    },
    cardSubtitle: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.gray400,
        letterSpacing: 0.5,
        marginTop: 4,
    },
    cardBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    progressHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    progressTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.textMain,
    },
    progressSubtitle: {
        fontSize: 16,
        color: Colors.gray500,
        marginTop: 4,
    },
    stampsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 4,
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
        backgroundColor: Colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.gray200,
    },
    stampGift: {
        alignItems: 'center',
    },
    stampGiftLabel: {
        fontSize: 8,
        fontWeight: '700',
        color: Colors.primaryDark,
        marginTop: 4,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: Colors.gray100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    // Info Card
    infoCard: {
        flexDirection: 'row',
        backgroundColor: Colors.surfaceLight,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    infoIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContent: {
        flex: 1,
        marginLeft: 16,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textMain,
    },
    infoText: {
        fontSize: 14,
        color: Colors.gray500,
        marginTop: 4,
        lineHeight: 20,
    },
    // QR Button
    qrButtonContainer: {
        marginBottom: 24,
    },
    qrButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 16,
        padding: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },
    qrButtonIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrButtonContent: {
        flex: 1,
        marginLeft: 16,
    },
    qrButtonTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textMain,
    },
    qrButtonSubtitle: {
        fontSize: 13,
        color: Colors.textMain,
        opacity: 0.7,
        marginTop: 2,
    },
    // History Section
    historySection: {
        backgroundColor: Colors.surfaceLight,
        borderRadius: 20,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 16,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray100,
    },
    historyIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyContent: {
        flex: 1,
        marginLeft: 12,
    },
    historyTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textMain,
    },
    historySubtitle: {
        fontSize: 12,
        color: Colors.gray500,
        marginTop: 2,
    },
    historyTime: {
        fontSize: 12,
        color: Colors.gray400,
    },
});
