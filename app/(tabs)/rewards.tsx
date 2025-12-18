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
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const dealItems = [
    {
        id: 1,
        title: 'Sabah Sandviçi',
        description: 'Güne taze kruvasan sandviç ve çay ile başla.',
        price: '120 TL',
        discount: '-%20',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXGUuEf6a6ODt9mdpaOwB0bO3_Sqzu_Xq_nI4KbuznM8xfPh2RvpJLFvPeC1qEitFTqIg2H-phkqyySwZ99st05oCHsHGKgmbN0-6VD_oCFgtj4QS6n7NKJdc6kRd-djvzoftK-aiS-2ChKDfN1FSk_SPVCLNXAApWcYMU4S1ZmrH-H9XLLXTPxmvhw5MtRFE9F4fGT1nzfFdDD7r9pgbKQS6KZcw-IyYr321THx6ZZo6J93VJl1_hkVGUs9RhHz4R3tfq1fhu1Y',
    },
    {
        id: 2,
        title: 'Öğrenci Molası',
        description: 'Öğrenci kimliğini göster, filtre kahveni %50 indirimli al.',
        price: '55 TL',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRdpPki9oRgXcVVBiuDGiUSVxv8us_P3aEK9H2sTmT-nR73G7rS5Y2rIj36MeXkQ6bGSd8CEOlM44O_5mO-zB3xz5uiT0IeltRh5XkUhzcEC3WFFCkcodeeCS9sjYk8ApclLLDnSsXqrbZx5vQyvYkKX5M29BTQVmuo3M2sAommBCSPi_YtlEatyYTLv2z_jPqxAmDMy7k7S2LIqnm-Y9ImQgOVgemvEZZv5dd3Z3inKMzE-8aeuDfFrM5LU0drB_DqexYLSTJ8uY',
    },
    {
        id: 3,
        title: '2. Kahve %50',
        description: 'Arkadaşınla gel, ikinci kahveni yarı fiyatına iç.',
        priceLabel: 'Sepette İndirim',
        tag: 'Dostunla',
        tagColor: 'blue',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1AOSWJ_qXCzA2u0lV6-GVMUGreEatjkF_HXsDCPzk3QXauqBtM7-WpcsbgleTaS-2Sbxf1snR0xqq_jzrl22Tam0Ppc4XZnPw2h7dXjxDEF3U42gkL6qv7v-j6Ka2t2ib8O0IVeLFyfetdwcVaa2aB5GM4R8-EF1Za2jAgQvTRLvRcp3skWZzGYY-MzeEr8dqF9h2f5HYhYgiG_fu7l6f_8oUElp0u3_3oqemY6q8kWyNnKSce9qrKVsC6VVukncgoJfg2BpsAtI',
    },
];

export default function RewardsScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Fırsatlar</Text>
                    <Text style={styles.headerSubtitle}>Sana özel indirimler ve kampanyalar.</Text>
                </View>
            </SafeAreaView>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Featured Hero Deal */}
                <View style={styles.heroDealContainer}>
                    <Image
                        source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9tTxRhfyzvqgP7PIYSPXR35uYwGayIFHv_vb3tduYe_tGP8E9biSQDR-vVONzG724L0B8oJsmtHOwGYfgIzx4cNqlmA20YJNsjFZguvQsFX2_sS06nctSdKH2ZT6PN2xTDuek3ozD2bQVYDXaY9_mq6so8fyirKEF7x6MSH621bTVSGIvi63k9uQpr0Pga1oMVEV36AL9UhZ6bAR2eP-wtRVhUkn2hE5xlBe9rrvQ07TDJ1ZzWurR3bKDVQLD-nTX9GLdwiHx6Is',
                        }}
                        style={styles.heroDealImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(62, 39, 35, 0.6)', 'rgba(62, 39, 35, 0.95)']}
                        style={styles.heroDealGradient}
                    />
                    <View style={styles.heroDealContent}>
                        <View style={styles.heroDealBadges}>
                            <View style={styles.heroDealBadgeOrange}>
                                <Text style={styles.heroDealBadgeText}>SINIRLI SÜRE</Text>
                            </View>
                            <View style={styles.heroDealBadgeWhite}>
                                <Text style={styles.heroDealBadgeTextDark}>POPÜLER</Text>
                            </View>
                        </View>
                        <Text style={styles.heroDealTitle}>Tatlı + Kahve Menüsü</Text>
                        <Text style={styles.heroDealSubtitle}>
                            Seçeceğin bir kahve ve günlük taze cheesecake sadece{' '}
                            <Text style={styles.heroDealPrice}>200 TL</Text>.
                        </Text>
                        <TouchableOpacity style={styles.heroDealButton} activeOpacity={0.9}>
                            <Text style={styles.heroDealButtonText}>Fırsatı Yakala</Text>
                            <MaterialIcons name="arrow-forward" size={20} color={Colors.orange} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Other Deals Section */}
                <View style={styles.dealsSection}>
                    <View style={styles.dealsSectionHeader}>
                        <Text style={styles.dealsSectionTitle}>Diğer Fırsatlar</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>Tümünü Gör</Text>
                            <MaterialIcons name="chevron-right" size={18} color={Colors.orange} />
                        </TouchableOpacity>
                    </View>

                    {/* Deal Items */}
                    {dealItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.dealItem} activeOpacity={0.9}>
                            <Image source={{ uri: item.image }} style={styles.dealItemImage} />
                            <View style={styles.dealItemContent}>
                                <View style={styles.dealItemHeader}>
                                    <Text style={styles.dealItemTitle}>{item.title}</Text>
                                    {item.discount && (
                                        <View style={styles.dealItemDiscountBadge}>
                                            <Text style={styles.dealItemDiscountText}>{item.discount}</Text>
                                        </View>
                                    )}
                                    {item.tag && (
                                        <View style={[styles.dealItemTagBadge, item.tagColor === 'blue' && styles.tagBadgeBlue]}>
                                            <Text style={[styles.dealItemTagText, item.tagColor === 'blue' && styles.tagTextBlue]}>
                                                {item.tag}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.dealItemDescription} numberOfLines={2}>
                                    {item.description}
                                </Text>
                                <View style={styles.dealItemFooter}>
                                    {item.price ? (
                                        <Text style={styles.dealItemPrice}>{item.price}</Text>
                                    ) : (
                                        <Text style={styles.dealItemPriceLabel}>{item.priceLabel}</Text>
                                    )}
                                    {item.price ? (
                                        <TouchableOpacity style={styles.dealItemAddButton}>
                                            <MaterialIcons name="add" size={20} color={Colors.brownDark} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.dealItemViewButton}>
                                            <Text style={styles.dealItemViewButtonText}>İncele</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
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
        backgroundColor: Colors.rewardsBg,
    },
    safeArea: {
        backgroundColor: Colors.rewardsBg,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '700',
        color: Colors.brownDark,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.brownMedium,
        marginTop: 6,
        opacity: 0.8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    // Hero Deal
    heroDealContainer: {
        height: 360,
        borderRadius: 40,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    heroDealImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    heroDealGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    heroDealContent: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 32,
    },
    heroDealBadges: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    heroDealBadgeOrange: {
        backgroundColor: Colors.orange,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    heroDealBadgeWhite: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    heroDealBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.white,
        letterSpacing: 1,
    },
    heroDealBadgeTextDark: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.white,
        letterSpacing: 1,
    },
    heroDealTitle: {
        fontSize: 36,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 12,
        lineHeight: 40,
        letterSpacing: -0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroDealSubtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 32,
        lineHeight: 24,
    },
    heroDealPrice: {
        color: '#FFB74D',
        fontWeight: '700',
    },
    heroDealButton: {
        backgroundColor: Colors.rewardsBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderRadius: 20,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    heroDealButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.brownDark,
    },
    // Deals Section
    dealsSection: {
        marginTop: 32,
    },
    dealsSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        marginBottom: 20,
    },
    dealsSectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.brownDark,
        letterSpacing: -0.3,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    seeAllButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.orange,
    },
    // Deal Item
    dealItem: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 28,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
        borderWidth: 1,
        borderColor: 'rgba(235, 229, 218, 0.3)',
    },
    dealItemImage: {
        width: 104,
        height: 104,
        borderRadius: 16,
    },
    dealItemContent: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'space-between',
    },
    dealItemHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    dealItemTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.brownDark,
        flex: 1,
    },
    dealItemDiscountBadge: {
        backgroundColor: 'rgba(255, 237, 213, 1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 237, 213, 1)',
    },
    dealItemDiscountText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.orange,
    },
    dealItemTagBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    tagBadgeBlue: {
        backgroundColor: Colors.blue50,
        borderWidth: 1,
        borderColor: 'rgba(147, 197, 253, 0.5)',
    },
    dealItemTagText: {
        fontSize: 11,
        fontWeight: '700',
    },
    tagTextBlue: {
        color: Colors.blue600,
    },
    dealItemDescription: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.brownMedium,
        lineHeight: 20,
        marginTop: 6,
    },
    dealItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    dealItemPrice: {
        fontSize: 19,
        fontWeight: '700',
        color: Colors.brownDark,
    },
    dealItemPriceLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.brownMedium,
    },
    dealItemAddButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F0E6',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    dealItemViewButton: {
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 18,
        backgroundColor: '#F5F0E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dealItemViewButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.brownDark,
    },
});
