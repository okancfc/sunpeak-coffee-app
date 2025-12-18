import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type TabIconName = 'home' | 'stars' | 'qr-code-scanner' | 'person';

function TabBarIcon({ name, focused }: { name: TabIconName; focused: boolean }) {
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? '#181811' : '#BDBDBD'}
      style={focused ? { transform: [{ scale: 1.1 }] } : undefined}
    />
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const tabs = [
    { name: 'index', label: 'Ana Sayfa', icon: 'home' as TabIconName },
    { name: 'rewards', label: 'Fırsatlar', icon: 'stars' as TabIconName },
    { name: 'qr-scan', label: 'QR Kodum', icon: 'qr-code-scanner' as TabIconName },
    { name: 'profile', label: 'Profil', icon: 'person' as TabIconName },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-100 shadow-sm">
      <View className="flex-row h-[76px] px-2 pb-5 items-center justify-around">
        {state.routes.map((route: any, index: number) => {
          const tabInfo = tabs[index];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              className="flex-1 items-center justify-center h-full gap-1 relative"
              onPress={onPress}
              activeOpacity={0.7}
            >
              {isFocused && (
                <View className="absolute top-0 w-8 h-[3px] bg-text-main rounded-b-sm" />
              )}
              <TabBarIcon name={tabInfo.icon} focused={isFocused} />
              <Text
                className={`text-[10px] font-bold tracking-wide ${isFocused ? 'text-text-main' : 'text-gray-400'
                  }`}
              >
                {tabInfo.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Fırsatlar',
        }}
      />
      <Tabs.Screen
        name="qr-scan"
        options={{
          title: 'QR Okut',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
        }}
      />
    </Tabs>
  );
}
