import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeIn, FadeInDown, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const validateForm = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        setError('Please fill in all required fields');
        return false;
      }
      return true;
    } else if (step === 2) {
      if (!formData.username.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
        setError('Please fill in all required fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      return true;
    } else {
      if (!formData.gender.trim() || !formData.dob.trim()) {
        setError('Please fill in all required fields');
        return false;
      }
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.dob)) {
        setError('Please enter a valid date format (YYYY-MM-DD)');
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async () => {
    if (step < 3) {
      if (!validateForm()) return;
      setStep(step + 1);
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await register(formData);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View
            key="step1"
            entering={SlideInRight.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <View style={styles.fieldsContainer}>
              <Animated.View entering={FadeInDown.duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Full Name</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    style={styles.input}
                    placeholder="Enter full name"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Enter email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View
            key="step2"
            entering={SlideInRight.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <View style={styles.fieldsContainer}>
              <Animated.View entering={FadeInDown.duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Username</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.username}
                    onChangeText={(text) => setFormData({ ...formData, username: text })}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Enter username"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    style={styles.input}
                    secureTextEntry
                    placeholder="Enter password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Confirm Password</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                    style={styles.input}
                    secureTextEntry
                    placeholder="Confirm password"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        );
      case 3:
        return (
          <Animated.View
            key="step3"
            entering={SlideInRight.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            style={styles.stepContainer}
          >
            <View style={styles.fieldsContainer}>
              <Animated.View entering={FadeInDown.duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Gender</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.gender}
                    onChangeText={(text) => setFormData({ ...formData, gender: text })}
                    style={styles.input}
                    placeholder="Enter gender (male/female/other)"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.inputContainer}>
                <ThemedText style={styles.label}>Date of Birth</ThemedText>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={formData.dob}
                    onChangeText={(text) => setFormData({ ...formData, dob: text })}
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  // Progress bar indicator
  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressIndicator, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <View style={styles.stepsIndicator}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={[styles.step, step >= s ? styles.activeStep : {}]}>
              <ThemedText style={[styles.stepText, step >= s ? styles.activeStepText : {}]}>{s}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[
          Colors[colorScheme ?? 'light'].gradientStart || '#1e1b4b', 
          Colors[colorScheme ?? 'light'].gradientEnd || '#4c1d95'
        ]}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Background decorative elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
      
      <Animated.View entering={FadeIn.duration(500)} style={styles.formContainer}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.headerContainer}>
          <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>Complete your profile</ThemedText>
          
          {renderProgressBar()}
        </Animated.View>

        {error && (
          <Animated.View entering={FadeIn.duration(300)} style={styles.error}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </Animated.View>
        )}

        <View style={styles.form}>
          {renderStep()}
          
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.buttonContainer}>
            {step > 1 && (
              <TouchableOpacity
                onPress={handlePrevious}
                style={styles.prevButton}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.buttonText}>Previous</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              style={[
                styles.button, 
                step === 1 ? styles.fullButton : null, 
                isLoading && styles.buttonDisabled
              ]}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#9333ea', '#7e22ce']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Animated.View entering={FadeIn.duration(300)} style={styles.buttonInner}>
                  <ThemedText style={styles.buttonText}>
                    {isLoading ? 'Creating Account...' : step === 3 ? 'Create Account' : 'Next'}
                  </ThemedText>
                </Animated.View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Already have an account?{' '}
            <ThemedText
              style={styles.link}
              onPress={() => router.push('/login')}
            >
              Login
            </ThemedText>
          </ThemedText>
        </Animated.View>
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.3,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: '#9333ea',
    top: -50,
    left: -50,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: '#7e22ce',
    bottom: 100,
    right: -70,
  },
  circle3: {
    width: 250,
    height: 250,
    backgroundColor: '#4c1d95',
    bottom: -100,
    left: 50,
  },
  formContainer: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: 'rgba(15, 15, 25, 0.82)',
    padding: 26,
    borderRadius: 24,
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 12,
    backdropFilter: 'blur(12px)',
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.4)',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(147, 51, 234, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: '#d1d1d1',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'SpaceMono',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#9333ea',
    borderRadius: 3,
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeStep: {
    backgroundColor: '#9333ea',
    borderColor: '#c084fc',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  stepText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeStepText: {
    color: '#ffffff',
  },
  error: {
    backgroundColor: 'rgba(220, 38, 38, 0.8)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#dc2626',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
  },
  form: {
    width: '100%',
  },
  stepContainer: {
    width: '100%',
    marginTop: 10,
  },
  fieldsContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.3)',
  },
  inputContainer: {
    marginBottom: 18,
    width: '100%',
  },
  label: {
    color: '#e0e0e0',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'SpaceMono',
    letterSpacing: 0.3,
  },
  inputWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(42, 43, 54, 0.9)',
    color: '#fff',
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.6)',
    borderRadius: 12,
    fontFamily: 'SpaceMono',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  button: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 50,
  },
  fullButton: {
    marginLeft: 0,
  },
  buttonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  footerText: {
    color: '#d1d1d1',
    fontSize: 15,
    fontFamily: 'SpaceMono',
  },
  link: {
    color: '#a855f7',
    fontWeight: '700',
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(147, 51, 234, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default SignupScreen;