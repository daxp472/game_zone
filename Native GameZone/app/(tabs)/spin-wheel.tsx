import { useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Enhanced: Conditionally render Lottie for mobile only to avoid web error
export default function SpinWheelScreen() {
  const colorScheme = useColorScheme();
  const animationRef = useRef<LottieView>(null);

  const handleSpin = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    animationRef.current?.reset();
    animationRef.current?.play();
    console.log('Spinning the wheel!');
    setTimeout(() => console.log('Confetti effect triggered!'), 2000);
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundImage: `linear-gradient(180deg, ${Colors[colorScheme ?? 'light'].gradientStart}, ${Colors[colorScheme ?? 'light'].gradientEnd})`,
        },
      ]}
    >
      <Animated.View entering={ZoomIn.duration(600)}>
        <ThemedText type="title" style={styles.title}>Spin to Win!</ThemedText>
        <ThemedText style={styles.subtitle}>Grab your rewards!</ThemedText>
        {Platform.OS !== 'web' ? (
          <LottieView
            ref={animationRef}
            source={require('../../assets/animations/spin-wheel.json')}
            loop={false}
            style={styles.wheel}
          />
        ) : (
          <ThemedText style={styles.fallback}>Spin Wheel not available on web</ThemedText>
        )}
        <View style={styles.buttonContainer}>
          <Button
            title="Spin Now"
            onPress={handleSpin}
            style={[
              styles.button,
              { shadowColor: '#ff4500', shadowOpacity: 0.5, shadowRadius: 10 },
            ]}
          />
        </View>
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
  title: {
    color: '#ff4500',
    fontFamily: 'SpaceMono',
    textAlign: 'center',
  },
  subtitle: {
    color: '#e0e0e0',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  wheel: {
    width: 300,
    height: 300,
    shadowColor: '#ff4500',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  fallback: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: 200,
    backgroundColor: '#ff4500',
    borderRadius: 50,
  },
});