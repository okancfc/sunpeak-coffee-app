import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
        <View className="flex-1 bg-[#FFFDF7]">
            <SafeAreaView edges={['top']} className="bg-[#FFFDF7]">
                {/* Header */}
                <View className="px-6 pt-4 pb-5">
                    <Text className="text-4xl font-bold text-brown-dark tracking-tight">Fırsatlar</Text>
                    <Text className="text-[15px] font-medium text-[#5D4037] mt-1.5 opacity-80">
                        Sana özel indirimler ve kampanyalar.
                    </Text>
                </View>
            </SafeAreaView>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Featured Hero Deal */}
                <View className="h-[360px] rounded-[40px] overflow-hidden">
                    <Image
                        source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9tTxRhfyzvqgP7PIYSPXR35uYwGayIFHv_vb3tduYe_tGP8E9biSQDR-vVONzG724L0B8oJsmtHOwGYfgIzx4cNqlmA20YJNsjFZguvQsFX2_sS06nctSdKH2ZT6PN2xTDuek3ozD2bQVYDXaY9_mq6so8fyirKEF7x6MSH621bTVSGIvi63k9uQpr0Pga1oMVEV36AL9UhZ6bAR2eP-wtRVhUkn2hE5xlBe9rrvQ07TDJ1ZzWurR3bKDVQLD-nTX9GLdwiHx6Is',
                        }}
                        style={StyleSheet.absoluteFillObject}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(62, 39, 35, 0.6)', 'rgba(62, 39, 35, 0.95)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View className="flex-1 justify-end p-8">
                        <View className="flex-row gap-3 mb-8">
                            <View className="bg-orange shadow-md shadow-black/20 px-3.5 py-1.5 rounded-full">
                                <Text className="text-[11px] font-bold text-white tracking-wider">SINIRLI SÜRE</Text>
                            </View>
                            <View className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
                                <Text className="text-[11px] font-bold text-white tracking-wider">POPÜLER</Text>
                            </View>
                        </View>
                        <Text className="text-4xl shadow-sm shadow-black/60 font-bold text-white mb-3 leading-10">Tatlı + Kahve Menüsü</Text>
                        <Text className="text-base font-medium text-white/90 mb-8 leading-6">
                            Seçeceğin bir kahve ve günlük taze cheesecake sadece{' '}
                            <Text className="text-[#FFB74D] font-bold">200 TL</Text>.
                        </Text>
                        <TouchableOpacity
                            className="bg-[#FFFDF7] flex-row items-center justify-center px-6 py-4 rounded-2xl"
                            activeOpacity={0.9}
                        >
                            <Text className="text-base font-bold text-brown-dark">Fırsatı Yakala</Text>
                            <MaterialIcons name="arrow-forward" size={20} color="#E65100" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Other Deals Section */}
                <View className="mt-8">
                    <View className="flex-row justify-between items-center px-1 mb-5">
                        <Text className="text-[22px] font-bold text-brown-dark">Diğer Fırsatlar</Text>
                        <TouchableOpacity className="flex-row items-center py-1 px-2 rounded-lg">
                            <Text className="text-[13px] font-semibold text-orange">Tümünü Gör</Text>
                            <MaterialIcons name="chevron-right" size={18} color="#E65100" />
                        </TouchableOpacity>
                    </View>

                    {/* Deal Items */}
                    {dealItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            className="flex-row bg-white rounded-[28px] p-4 mb-5 border border-[#EBE5DA]/50"
                            activeOpacity={0.9}
                        >
                            <Image source={{ uri: item.image }} className="w-[104px] h-[104px] rounded-2xl" />
                            <View className="flex-1 ml-5 justify-between">
                                <View className="flex-row items-start justify-between">
                                    <Text className="text-lg font-bold text-brown-dark flex-1">{item.title}</Text>
                                    {item.discount && (
                                        <View className="bg-orange-100 px-2.5 py-1 rounded-full bg-orange/10">
                                            <Text className="text-[11px] font-bold text-orange">{item.discount}</Text>
                                        </View>
                                    )}
                                    {item.tag && (
                                        <View className={`px-2.5 py-1 rounded-full ${item.tagColor === 'blue' ? 'bg-blue-50 border border-blue-300/50' : ''}`}>
                                            <Text className={`text-[11px] font-bold ${item.tagColor === 'blue' ? 'text-blue-600' : ''}`}>
                                                {item.tag}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Text className="text-[13px] font-medium text-[#5D4037] leading-5 mt-1.5" numberOfLines={2}>
                                    {item.description}
                                </Text>
                                <View className="flex-row justify-between items-center mt-2">
                                    {item.price ? (
                                        <Text className="text-[19px] font-bold text-brown-dark">{item.price}</Text>
                                    ) : (
                                        <Text className="text-[13px] font-bold text-[#5D4037]">{item.priceLabel}</Text>
                                    )}
                                    {item.price ? (
                                        <TouchableOpacity className="w-9 h-9 rounded-full bg-[#F5F0E6] items-center justify-center">
                                            <MaterialIcons name="add" size={20} color="#3E2723" />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity className="h-9 px-4 rounded-full bg-[#F5F0E6] items-center justify-center">
                                            <Text className="text-[13px] font-bold text-brown-dark">İncele</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Spacing */}
                <View className="h-[120px]" />
            </ScrollView>
        </View>
    );
}
