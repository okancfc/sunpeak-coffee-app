import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const { profile, user, signOut, isLoading } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                },
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
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profil</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                            </Text>
                        </View>
                        <View style={styles.memberBadge}>
                            <MaterialIcons name="verified" size={16} color={Colors.primary} />
                        </View>
                    </View>
                    <Text style={styles.userName}>{profile?.full_name || 'Kullanıcı'}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                    <View style={styles.membershipBadge}>
                        <MaterialIcons name="local-cafe" size={14} color={Colors.textMain} />
                        <Text style={styles.membershipText}>Sunpeak Club Üyesi</Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{profile?.stamps_collected || 0}</Text>
                        <Text style={styles.statLabel}>Toplam Damga</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{profile?.total_rewards || 0}</Text>
                        <Text style={styles.statLabel}>Hediye Kahve</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <MaterialIcons name="qr-code-2" size={22} color={Colors.textMain} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>QR Kodum</Text>
                            <Text style={styles.menuSubtitle}>Damga kazanmak için göster</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={Colors.gray400} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <MaterialIcons name="history" size={22} color={Colors.textMain} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Geçmiş</Text>
                            <Text style={styles.menuSubtitle}>Tüm aktivitelerim</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={Colors.gray400} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <MaterialIcons name="notifications" size={22} color={Colors.textMain} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Bildirimler</Text>
                            <Text style={styles.menuSubtitle}>Kampanya ve fırsatlar</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={Colors.gray400} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIconContainer}>
                            <MaterialIcons name="help-outline" size={22} color={Colors.textMain} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>Yardım</Text>
                            <Text style={styles.menuSubtitle}>SSS ve destek</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={Colors.gray400} />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="logout" size={20} color={Colors.red500} />
                    <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.versionText}>Sunpeak Coffee v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.textMain,
    },
    profileCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 3,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.textMain,
    },
    memberBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.gray500,
        marginBottom: 12,
    },
    membershipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    membershipText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.textMain,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.surfaceLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.textMain,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.gray500,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: Colors.gray200,
        marginHorizontal: 16,
    },
    menuContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray100,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContent: {
        flex: 1,
        marginLeft: 12,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textMain,
    },
    menuSubtitle: {
        fontSize: 12,
        color: Colors.gray500,
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        marginBottom: 16,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.red500,
    },
    versionText: {
        fontSize: 12,
        color: Colors.gray400,
        textAlign: 'center',
    },
});
