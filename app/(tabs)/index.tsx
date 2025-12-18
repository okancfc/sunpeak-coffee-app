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
const CARD_WIDTH = (width - 60) / 2;

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

  return (
    <SafeAreaView className="flex-1 bg-bg-light" edges={['top']}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4">
        <View>
          <Text className="text-2xl font-bold text-text-main">{getGreeting()}, {firstName} ☀️</Text>
          <Text className="text-sm text-gray-500 mt-1">Kahven seni bekliyor.</Text>
        </View>
        <TouchableOpacity className="relative w-11 h-11 rounded-full bg-white items-center justify-center">
          <MaterialIcons name="notifications" size={24} color="#181811" />
          <View className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stamp Card Section */}
        <View className="bg-white rounded-3xl p-5 border border-gray-100">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-lg font-bold text-text-main">Damga Kartım</Text>
              <Text className="text-xs text-gray-400 tracking-wider mt-0.5">SADAKAT PROGRAMI</Text>
            </View>
            <View className="bg-primary/40 px-3.5 py-1.5 rounded-full">
              <Text className="text-sm font-bold text-text-main">4/6</Text>
            </View>
          </View>

          {/* Stamps Grid */}
          <View className="flex-row justify-between mb-4">
            {[...Array(4)].map((_, i) => (
              <View key={`f-${i}`} className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                <MaterialIcons name="local-cafe" size={20} color="#181811" />
              </View>
            ))}
            {[...Array(2)].map((_, i) => (
              <View key={`e-${i}`} className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center border border-dashed border-gray-300">
                <MaterialIcons name="local-cafe" size={20} color="#E0E0E0" />
              </View>
            ))}
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center border border-dashed border-gray-300">
              <MaterialIcons name="card-giftcard" size={20} color="#E0E0E0" />
            </View>
          </View>

          {/* Progress Bar */}
          <View className="h-1.5 bg-gray-100 rounded-full mb-4">
            <View className="h-full bg-primary rounded-full" style={{ width: '66%' }} />
          </View>

          {/* Footer */}
          <View className="items-center">
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="bolt" size={18} color="#f9f506" />
              <Text className="text-sm font-bold text-text-main ml-1 opacity-50">2 kahve sonra ücretsiz!</Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center justify-center bg-primary px-6 py-3 rounded-full w-full"
              onPress={handleOpenStampCard}
            >
              <Text className="text-md font-bold shadow-lg shadow-primary/50 text-text-main">Kartı Görüntüle</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#181811" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* QR Code Shortcut */}
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-2xl p-4 mt-4 border border-gray-100"
          onPress={() => router.push('/(tabs)/qr-scan')}
          activeOpacity={0.9}
        >
          <View className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/50 items-center justify-center">
            <MaterialIcons name="qr-code-2" size={28} color="#181811" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-sm font-bold text-gray-500">Damga Kazanmak İçin</Text>
            <Text className="text-lg font-bold text-text-main mt-0.5">QR Kodumu Göster</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
            <MaterialIcons name="arrow-forward" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>

        {/* Featured Deal */}
        <View className="mt-6">
          <Text className="text-xl font-bold text-text-main mb-4">Öne Çıkan Fırsatlar</Text>
          <TouchableOpacity
            className="h-52 rounded-3xl overflow-hidden"
            onPress={() => router.push('/(tabs)/rewards')}
            activeOpacity={0.9}
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpWEEnhpkabTmmASK04Boji991clWcWz5M8ZNGv_zyNm6HmE9oBDB9dEF9VB8zb2ZTGkYerPatbOE0SfS4QdSisWKMyug85FYI-gFMs-wqhuUTLZXAl_iaVXGXGMKx4P1-O_JfvvLo-X5AdR2pnlOG0e_yx4qelOqi_mB2atTU5L1BknRrcJvqhf2IkomvqPW8vuWCIFFneGXfj2ApG2XMgCEMkyGuSQHCv4rT5bH59zZtcZoKeFb5S-bKUZfZ9kOgFjP4GpfRF5o',
              }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
              style={StyleSheet.absoluteFillObject}
            />
            <View className="flex-1 justify-end p-5">
              <View className="bg-primary px-3 py-1 rounded-md self-start mb-2">
                <Text className="text-[10px] font-bold text-text-main tracking-wider">POPÜLER FIRSAT</Text>
              </View>
              <Text className="text-2xl font-bold text-white leading-8">
                Sabah Kahvesi +{'\n'}Sandviç Fırsatı
              </Text>
              <Text className="text-sm text-white/80 mt-1">Güne lezzetli bir başlangıç yapın!</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Deals Grid */}
        <View className="flex-row flex-wrap justify-between mt-6">
          {deals.map((deal) => (
            <TouchableOpacity
              key={deal.id}
              className="mb-4 bg-white rounded-2xl overflow-hidden border border-gray-100"
              style={{ width: CARD_WIDTH }}
              activeOpacity={0.9}
            >
              <View className="relative">
                <Image source={{ uri: deal.image }} className="w-full h-28" resizeMode="cover" />
                {deal.tag && (
                  <View className="absolute top-2 left-2 bg-primary px-2 py-0.5 rounded-full">
                    <Text className="text-[10px] font-bold text-text-main">{deal.tag}</Text>
                  </View>
                )}
                {deal.discount && (
                  <View className="absolute top-2 right-2 bg-red-500 px-2 py-0.5 rounded-full">
                    <Text className="text-[10px] font-bold text-white">{deal.discount}</Text>
                  </View>
                )}
              </View>
              <View className="p-3">
                <Text className="text-sm font-bold text-text-main" numberOfLines={1}>{deal.title}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">{deal.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View className="h-[100px]" />
      </ScrollView>
    </SafeAreaView>
  );
}
