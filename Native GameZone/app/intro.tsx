import { Link } from 'expo-router';
import { StyleSheet, FlatList, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { IntroSlide } from '@/components/IntroSlide';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function IntroScreen() {
  const colorScheme = useColorScheme();
  const slides = [
    {
      title: 'Welcome to GameZone!',
      description: 'Dive into epic gaming adventures with friends!',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    },
    {
      title: 'Win Big Rewards!',
      description: 'Spin the wheel for exclusive prizes!',
      image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9',
    },
    {
      title: 'Join the Battle!',
      description: 'Challenge players in multiplayer arenas!',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.backgroundElements}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      <Animated.View entering={FadeIn.duration(800)} style={styles.heroSection}>
        <ThemedText type="title" style={styles.heroTitle}>
          GameZone
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Your ultimate gaming adventure awaits! Join now and play with millions.
        </ThemedText>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.carousel}>
        <FlatList
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <IntroSlide
              title={item.title}
              description={item.description}
              image={item.image}
              index={index}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.ctaContainer}>
        <Link href="/signup" asChild>
          <Button
            title="Get Started"
            style={[styles.ctaButton, { backgroundColor: '#ff4500' }]}
            textStyle={styles.ctaButtonText}
          />
        </Link>
        <Link href="/login" asChild>
          <Button
            title="Sign In"
            style={[styles.ctaButton, styles.secondaryButton]}
            textStyle={styles.ctaButtonText}
          />
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
    backgroundColor: '#0f0f19',
    padding: 20,
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
    backgroundColor: '#ff4500',
    top: -50,
    left: -50,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: '#9333ea',
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
    fontFamily: 'SpaceMono',
    textShadowColor: 'rgba(255, 69, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    color: '#e0e0e0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'SpaceMono',
    maxWidth: 300,
  },
  carousel: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  ctaContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  ctaButton: {
    width: '80%',
    maxWidth: 300,
    borderRadius: 50,
    paddingVertical: 16,
    marginVertical: 8,
    shadowColor: '#ff4500',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#ff4500',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceMono',
    color: '#fff',
  },
});