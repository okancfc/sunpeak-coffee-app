import { Colors } from '@/constants/Colors';
import { Deal } from '@/constants/Types';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const deals: Deal[] = [
  {
    id: 1,
    title: 'Tatlı & Kahve İkili',
    subtitle: 'Sadece 75₺',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2SQ3YcCdorslZzaUpV-VqbrenpYcWO29d5bRRJkKiJuYDyYzbIkNBmtE8hP-eyljj3irBUqp62ehtmcSuTpl99IGF5caZqQtXh2ie2S_kyc7Cy6cbNgLPJGjUyDAbyjAzC9XZcdBi-VL7mFNVXxlZTwYcaH7qMfdWmqo0Vz46_qkPgpymIwl071zqWXum828ppdmNpr58zpMMpS0PA8bOCXW9TCny96_JdYvkY4suxuHhqhA6K230IaMCy1DwhQxyXbcCYonKNcc',
    discount: '-15%',
  },
  {
    id: 2,
    title: 'Hafta Sonu Croissant',
    subtitle: 'İkinciye %50 indirim',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTDcJidbmxvQVDEYpWDA-KtrMgk5CO40ga2X6ieNQqVqnga7rQG2S8EiNTqrgbJEkXeBbnlxFfElmNI-0u4sqE6XuuyYbcVRWnj79D1flRMmJ95VQl6vwv1IOuq9x9KLRGQ4YqUNZdKeUe5IjY18kq39Ml96ppJWzVCW-IKedEtxYLIC9SjioS3XZvGszSlq1neDoFaIpQk36PNqOxJ02-7v_jSbpftJQfXfkDtZx68gW_vXgtySgNY1j0c1bafBq_4uqcaf9yFo8',
  },
  {
    id: 3,
    title: 'Yaz İçecekleri',
    subtitle: 'Serinletici tatlar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZeZxNnwcbHk9ZwoBng1_3gfVWwXzCRiVVn3W4zHAHxw9C1CCJT0QXGH80xOeuNkiuw6JWszCtpqJX82vH0Ce09y8tuRJNRf-RYlZt07RNKCWCG1fpXZ2LAalhETd417BTolbTtUrJkpywGYx8PztAcBoVUmlrkpvUH_Juoe5SGdqraWEGNerm9Yq01CtmMnR2UCXB1qdNkXi0w7gB7GSGWH_cBv8FYv8XwOF9r74XPUj4YqoavIpMdsjiLMgnxg2bn__hoUDhuuE',
    tag: 'YENİ',
  },
  {
    id: 4,
    title: 'Çekirdek Kahve',
    subtitle: 'Özel karışımlarda %15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvtkICYZsck9OPfY9x7Zzz-beXMg3bU-WpilrjP-b1Cf1QWyFPplBROuH5dv5NE5VlSmmOairK9H9Ip7mWcV5mNx0EofQLecpYUY4YaR3fLQ5OPBAy8FXK8AbelGS1DGIs6LuSdupZcQNul4uxuJnfbOS-CcorpgcSzGkV8WQLrZQaJqtu1cqW6OCGnHTx_Dh4S0R3O6muCC7iHxKrsX163EKyZAPOQxMHafBJjoOZxaXHuZWsgK0Dz2OEJOZNy9-PsaBsDCCVEtU',
  },
];

// Get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Günaydın';
  if (hour < 18) return 'İyi günler';
  return 'İyi akşamlar';
};

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();

  const firstName = profile?.full_name?.split(' ')[0] || 'Kullanıcı';

  const handleOpenStampCard = () => {
    router.push('/stamp-detail');
  };

  const renderStampIcon = (filled: boolean, isGift: boolean = false) => {
    if (isGift) {
      return (
        <View style={styles.stampEmpty}>
          <MaterialIcons name="card-giftcard" size={20} color={Colors.gray300} />
        </View>
      );
    }
    if (filled) {
      return (
        <View style={styles.stampFilled}>
          <MaterialIcons name="local-cafe" size={20} color={Colors.textMain} />
        </View>
      );
    }
    return (
      <View style={styles.stampEmpty}>
        <MaterialIcons name="local-cafe" size={20} color={Colors.gray300} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}, {firstName} ☀️</Text>
          <Text style={styles.subGreeting}>Kahven seni bekliyor.</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={24} color={Colors.textMain} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stamp Card Section */}
        <View style={styles.stampCardContainer}>
          <View style={styles.stampCardHeader}>
            <View>
              <Text style={styles.stampCardTitle}>Damga Kartım</Text>
              <Text style={styles.stampCardSubtitle}>SADAKAT PROGRAMI</Text>
            </View>
            <View style={styles.stampProgress}>
              <Text style={styles.stampProgressText}>4/6</Text>
            </View>
          </View>

          {/* Stamps Grid - 7 stamps per row (6 regular + 1 gift) */}
          <View style={styles.stampsGrid}>
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={`filled-${i}`}>
                {renderStampIcon(true)}
              </React.Fragment>
            ))}
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={`empty-${i}`}>
                {renderStampIcon(false)}
              </React.Fragment>
            ))}
            {renderStampIcon(false, true)}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '66%' }]} />
          </View>

          {/* Stamp Card Footer */}
          <View style={styles.stampCardFooter}>
            <View style={styles.stampCardMessage}>
              <MaterialIcons name="bolt" size={18} color={Colors.primary} />
              <Text style={styles.stampCardMessageText}>2 kahve sonra ücretsiz!</Text>
            </View>
            <TouchableOpacity
              style={styles.viewCardButton}
              onPress={handleOpenStampCard}
            >
              <Text style={styles.viewCardButtonText}>Kartı Görüntüle</Text>
              <MaterialIcons name="arrow-forward" size={18} color={Colors.textMain} />
            </TouchableOpacity>
          </View>
        </View>

        {/* QR Code Shortcut */}
        <TouchableOpacity
          style={styles.qrShortcutContainer}
          onPress={() => router.push('/(tabs)/qr-scan')}
          activeOpacity={0.9}
        >
          <View style={styles.qrShortcutIcon}>
            <MaterialIcons name="qr-code-2" size={28} color={Colors.textMain} />
          </View>
          <View style={styles.qrShortcutContent}>
            <Text style={styles.qrShortcutTitle}>Damga Kazanmak İçin</Text>
            <Text style={styles.qrShortcutSubtitle}>QR Kodumu Göster</Text>
          </View>
          <View style={styles.qrShortcutArrow}>
            <MaterialIcons name="arrow-forward" size={24} color={Colors.gray400} />
          </View>
        </TouchableOpacity>

        {/* Featured Deal */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Öne Çıkan Fırsatlar</Text>
          <TouchableOpacity
            style={styles.heroDealContainer}
            onPress={() => router.push('/(tabs)/rewards')}
            activeOpacity={0.9}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpWEEnhpkabTmmASK04Boji991clWcWz5M8ZNGv_zyNm6HmE9oBDB9dEF9VB8zb2ZTGkYerPatbOE0SfS4QdSisWKMyug85FYI-gFMs-wqhuUTLZXAl_iaVXGXGMKx4P1-O_JfvvLo-X5AdR2pnlOG0e_yx4qelOqi_mB2atTU5L1BknRrcJvqhf2IkomvqPW8vuWCIFFneGXfj2ApG2XMgCEMkyGuSQHCv4rT5bH59zZtcZoKeFb5S-bKUZfZ9kOgFjP4GpfRF5o',
              }}
              style={styles.heroDealImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
              style={styles.heroDealGradient}
            />
            <View style={styles.heroDealContent}>
              <View style={styles.heroDealBadge}>
                <Text style={styles.heroDealBadgeText}>POPÜLER FIRSAT</Text>
              </View>
              <Text style={styles.heroDealTitle}>
                Sabah Kahvesi +{'\n'}Sandviç Fırsatı
              </Text>
              <Text style={styles.heroDealSubtitle}>
                Güne lezzetli bir başlangıç yapın!
              </Text>
              <TouchableOpacity style={styles.heroDealButton}>
                <Text style={styles.heroDealButtonText}>Fırsatı Yakala</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Deals Grid */}
        <View style={styles.dealsGrid}>
          {deals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard} activeOpacity={0.9}>
              <View style={styles.dealImageContainer}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                {deal.tag && (
                  <View style={styles.dealTag}>
                    <Text style={styles.dealTagText}>{deal.tag}</Text>
                  </View>
                )}
                {deal.discount && (
                  <View style={styles.dealDiscount}>
                    <Text style={styles.dealDiscountText}>{deal.discount}</Text>
                  </View>
                )}
              </View>
              <View style={styles.dealInfo}>
                <Text style={styles.dealTitle}>{deal.title}</Text>
                <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: 'rgba(248, 248, 245, 0.8)',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textMain,
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 16,
    color: Colors.gray500,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red500,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  // Stamp Card Styles
  stampCardContainer: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  stampCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stampCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textMain,
  },
  stampCardSubtitle: {
    fontSize: 11,
    color: Colors.gray400,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  stampProgress: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stampProgressText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textMain,
  },
  stampsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.gray200,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.gray100,
    borderRadius: 3,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  stampCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  stampCardMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stampCardMessageText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray500,
  },
  viewCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  viewCardButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
  },
  // Section Styles
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  // Hero Deal Styles
  heroDealContainer: {
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.gray100,
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
    padding: 24,
  },
  heroDealBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroDealBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMain,
    letterSpacing: 1,
  },
  heroDealTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroDealSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
  },
  heroDealButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  heroDealButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
  },
  // Deals Grid Styles
  dealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  dealCard: {
    width: (width - 40 - 16) / 2,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  dealImageContainer: {
    height: 144,
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  dealTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(249, 245, 6, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dealTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMain,
  },
  dealDiscount: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dealDiscountText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMain,
  },
  dealInfo: {
    padding: 16,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
  },
  dealSubtitle: {
    fontSize: 12,
    color: Colors.gray500,
    marginTop: 4,
  },
  // QR Shortcut Styles
  qrShortcutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  qrShortcutIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  qrShortcutContent: {
    flex: 1,
    marginLeft: 16,
  },
  qrShortcutTitle: {
    fontSize: 12,
    color: Colors.gray500,
    fontWeight: '500',
  },
  qrShortcutSubtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textMain,
    marginTop: 2,
  },
  qrShortcutArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
