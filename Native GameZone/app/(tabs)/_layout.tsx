import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Enhanced: Added MaterialCommunityIcons and polished tab bar with neon glow
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            shadowColor: Colors[colorScheme ?? 'light'].tint,
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
        ],
        tabBarItemStyle: { paddingVertical: 5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="multiplayer"
        options={{
          title: 'Multiplayer',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="spin-wheel"
        options={{
          title: 'Spin Wheel',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="rotate-3d-variant" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tournament"
        options={{
          title: 'Tournament',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="trophy" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopWidth: 1,
    backdropFilter: 'blur(10px)', // Glassmorphism
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
});