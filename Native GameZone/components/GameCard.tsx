import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeIn } from 'react-native-reanimated';

// Enhanced: Added shadows and gaming images
type GameCardProps = {
  title: string;
  image: string;
};

export function GameCard({ title, image }: GameCardProps) {
  return (
    <Animated.View entering={FadeIn.duration(600)} style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        contentFit="cover"
        transition={500}
      />
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#ff4500',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e0e0e0',
  },
});