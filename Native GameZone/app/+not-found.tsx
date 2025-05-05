import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Button } from '@/components/ui/Button';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Enhanced: Added glassmorphism effect and animated entrance for 404 page
export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
        <ThemedText type="title" style={styles.title}>404 - Lost in Space!</ThemedText>
        <ThemedText style={styles.subtitle}>This page is out of orbit.</ThemedText>
        <Link href="/(tabs)" asChild>
          <Button title="Back to Home" style={styles.button} />
        </Link>
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
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    backdropFilter: 'blur(10px)', // Glassmorphism effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    color: '#ff4500', // Neon orange
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  button: {
    width: 200,
  },
});