import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function WalletScreen() {
    return (
        <View style={styles.container}>
            {/* Decorative Background Elements */}
            <View style={styles.bgGlow1} />
            <View style={styles.bgGlow2} />

            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ width: 40 }} />
                    <Text style={styles.headerTitle}>CÜZDANIM</Text>
                    <TouchableOpacity style={styles.notificationButton}>
                        <MaterialIcons name="notifications" size={24} color={Colors.textMain} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* QR Code Card */}
                <View style={styles.qrCardWrapper}>
                    <View style={styles.qrCardGlow} />
                    <View style={styles.qrCard}>
                        <View style={styles.qrCardTopAccent} />

                        {/* QR Code */}
                        <View style={styles.qrCodeContainer}>
                            <Image
                                source={{
                                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvY2Z1GA8k7zPJUx-DRwjF_WhQsCQMoughj9-Qskx7uaWMADP1KargPyrhKUPEdT3MtBsTygkSFP0cLzWNNM9kj9AWGLxbkaG9iJnTm9sNsuvJHM4J1xH013G4qiRZTXRLzMrxe6W-rU-4W8ht1G0hh7QmLbKC8CHTYuB4UmxowY1lshG9oa3tiGHB1DhN64z71eCK4OX-rjFFXFR9OtURnXkLQTVvskHzdDqXFC092ieO1dJzeMzROnRBKqjQiuD1Pmr-afnFO80',
                                }}
                                style={styles.qrCodeImage}
                                resizeMode="contain"
                            />
                            {/* Coffee Icon Overlay */}
                            <View style={styles.qrCodeOverlay}>
                                <View style={styles.qrCodeIconContainer}>
                                    <MaterialIcons name="local-cafe" size={28} color={Colors.yellow500} />
                                </View>
                            </View>
                        </View>

                        <Text style={styles.qrCardText}>
                            QR kodu okutarak ödeme yap{'\n'}veya ücretsiz kahveni kullan
                        </Text>

                        {/* Brightness Button */}
                        <TouchableOpacity style={styles.brightnessButton} activeOpacity={0.7}>
                            <MaterialIcons name="brightness-high" size={18} color={Colors.yellow600} />
                            <Text style={styles.brightnessButtonText}>Ekran Parlaklığını Artır</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <TouchableOpacity style={styles.statCard} activeOpacity={0.9}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="account-balance-wallet" size={24} color={Colors.yellow600} />
                        </View>
                        <View style={styles.statInfo}>
                            <Text style={styles.statLabel}>MEVCUT BAKİYE</Text>
                            <Text style={styles.statValue}>150 TL</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statCard} activeOpacity={0.9}>
                        <View style={styles.statIconContainer}>
                            <MaterialIcons name="local-cafe" size={24} color={Colors.yellow600} />
                        </View>
                        <View style={styles.statInfo}>
                            <Text style={styles.statLabel}>ÜCRETSİZ KAHVE</Text>
                            <Text style={styles.statValue}>2 Adet</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.primaryActionButton} activeOpacity={0.9}>
                        <MaterialIcons name="add-circle" size={24} color={Colors.black} />
                        <Text style={styles.primaryActionButtonText}>Bakiye Yükle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryActionButton} activeOpacity={0.8}>
                        <MaterialIcons name="history" size={24} color={Colors.textSecondary} />
                        <Text style={styles.secondaryActionButtonText}>Hesap Hareketleri</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom Spacing */}
                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        position: 'relative',
        overflow: 'hidden',
    },
    bgGlow1: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 256,
        height: 256,
        borderRadius: 128,
        backgroundColor: 'rgba(253, 230, 138, 0.4)',
    },
    bgGlow2: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: 'rgba(243, 244, 246, 0.6)',
    },
    safeArea: {
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textMain,
        letterSpacing: 2,
    },
    notificationButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    scrollView: {
        flex: 1,
        zIndex: 10,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    // QR Card
    qrCardWrapper: {
        position: 'relative',
        marginTop: 16,
    },
    qrCardGlow: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        bottom: -16,
        borderRadius: 100,
        backgroundColor: Colors.primaryLight,
        opacity: 0.6,
    },
    qrCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 30,
        elevation: 5,
        borderWidth: 1,
        borderColor: Colors.gray100,
        position: 'relative',
        overflow: 'hidden',
    },
    qrCardTopAccent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        alignItems: 'center',
    },
    qrCodeContainer: {
        width: 240,
        height: 240,
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: Colors.gray100,
        position: 'relative',
    },
    qrCodeImage: {
        width: '100%',
        height: '100%',
        opacity: 0.95,
    },
    qrCodeOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrCodeIconContainer: {
        backgroundColor: Colors.white,
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.yellow50,
    },
    qrCardText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    brightnessButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Colors.gray50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 24,
    },
    brightnessButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textMain,
        opacity: 0.8,
    },
    // Stats Grid
    statsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.gray100,
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.yellow50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statInfo: {},
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.textSecondary,
        letterSpacing: 1,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.textMain,
        marginTop: 4,
        letterSpacing: -0.5,
    },
    // Actions
    actionsContainer: {
        marginTop: 24,
        gap: 12,
    },
    primaryActionButton: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 6,
    },
    primaryActionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.black,
    },
    secondaryActionButton: {
        backgroundColor: 'transparent',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    secondaryActionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textMain,
    },
});
