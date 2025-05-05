import { Platform, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type IntroSlideProps = {
  title: string;
  description: string;
  image: string;
  index: number;
};

export function IntroSlide({ title, description, image, index }: IntroSlideProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />
        <View style={styles.overlay} />
      </Animated.View>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: 375,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#ff4500',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#ff4500',
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 69, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#e0e0e0',
    fontFamily: 'SpaceMono',
    maxWidth: 300,
  },
});