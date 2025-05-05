import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

// Enhanced: Added glassmorphism card, XP progress bar, and animated logout
export default function ProfileScreen() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    xp: 1000,
    coins: 500,
  });

  const handleLogout = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await AsyncStorage.removeItem('jwt_token');
    router.replace('/intro');
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
        <ThemedText type="title" style={styles.title}>Profile</ThemedText>
        <View style={styles.info}>
          <ThemedText style={styles.label}>Name: {user.name}</ThemedText>
          <ThemedText style={styles.label}>Email: {user.email}</ThemedText>
          <ThemedText style={styles.label}>XP: {user.xp}</ThemedText>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(user.xp % 1000) / 10}%` }]} />
          </View>
          <ThemedText style={styles.label}>Coins: {user.coins}</ThemedText>
        </View>
        <Button title="Log Out" onPress={handleLogout} style={styles.button} />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#ff4500',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    color: '#ff4500',
    fontFamily: 'GameFont',
    marginBottom: 20,
  },
  info: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#e0e0e0',
    fontSize: 16,
    marginVertical: 5,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#ff4500',
  },
  button: {
    width: 200,
    backgroundColor: '#ff4500',
    borderRadius: 50,
  },
});