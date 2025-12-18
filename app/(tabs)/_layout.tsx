import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';

type TabIconName = 'home' | 'stars' | 'account-balance-wallet' | 'person';

function TabBarIcon({ name, focused }: { name: TabIconName; focused: boolean }) {
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? Colors.textMain : Colors.gray400}
      style={focused ? { transform: [{ scale: 1.1 }] } : undefined}
    />
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const tabs = [
    { name: 'index', label: 'Ana Sayfa', icon: 'home' as TabIconName },
    { name: 'rewards', label: 'Fırsatlar', icon: 'stars' as TabIconName },
    { name: 'wallet', label: 'Cüzdan', icon: 'account-balance-wallet' as TabIconName },
    { name: 'profile', label: 'Profil', icon: 'person' as TabIconName },
  ];

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
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
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {isFocused && <View style={styles.activeIndicator} />}
              <TabBarIcon name={tabInfo.icon} focused={isFocused} />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? Colors.textMain : Colors.gray400 },
                ]}
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
        name="wallet"
        options={{
          title: 'Cüzdan',
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

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: 76,
    paddingHorizontal: 8,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 4,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 3,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
