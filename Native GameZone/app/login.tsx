import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login(formData);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors[colorScheme].gradientStart, Colors[colorScheme].gradientEnd]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View entering={FadeIn.duration(500)} style={styles.formContainer}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle}>Enter your credentials to continue</ThemedText>
        </Animated.View>

        {error && (
          <Animated.View entering={FadeIn.duration(300)} style={styles.error}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </Animated.View>
        )}

        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email or Username</ThemedText>
          <TextInput
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={styles.input}
            autoCapitalize="none"
            placeholder="Enter email or username"
            placeholderTextColor="#777"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.inputContainer}>
          <ThemedText style={styles.label}>Password</ThemedText>
          <TextInput
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            style={styles.input}
            secureTextEntry
            placeholder="Enter password"
            placeholderTextColor="#777"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(600)}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={[styles.button, isLoading && styles.buttonDisabled]}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.footer}>
          <ThemedText style={styles.footerText}>
            New to GameZone?{' '}
            <ThemedText
              style={styles.link}
              onPress={() => router.push('/signup')}
            >
              Create Account
            </ThemedText>
          </ThemedText>
        </Animated.View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(26, 27, 38, 0.9)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#9333ea',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backdropFilter: 'blur(10px)',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2a2b36',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: '#9333ea',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#e0e0e0',
    fontSize: 14,
  },
  link: {
    color: '#9333ea',
    fontWeight: 'bold',
  },
});