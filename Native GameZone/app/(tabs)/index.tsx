import { StyleSheet, FlatList } from 'react-native';
import { SearchBar } from '@/components/SearchBar';
import { GameCard } from '@/components/GameCard';
import { SpinWheelButton } from '@/components/SpinWheelButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Enhanced: Added gradient background and glowing cards
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const games = [
    { id: '1', title: 'Cyber Clash', image: 'https://images.unsplash.com/photo-1593305841991-2a3b8d5619b6' },
    { id: '2', title: 'Neon Racer', image: 'https://images.unsplash.com/photo-1557853197-4c9a23e5a1a3' },
    { id: '3', title: 'Star Blitz', image: 'https://images.unsplash.com/photo-1612036782180-4a3e2c0e2e7a' },
  ];

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundImage: `linear-gradient(180deg, ${Colors[colorScheme ?? 'light'].gradientStart}, ${Colors[colorScheme ?? 'light'].gradientEnd})`,
        },
      ]}
    >
      <Animated.View entering={FadeInDown.duration(600)}>
        <ThemedText type="title" style={styles.title}>GameZone</ThemedText>
        <SearchBar placeholder="Search for games..." style={styles.searchBar} />
        <SpinWheelButton style={styles.spinButton} />
      </Animated.View>
      <ThemedText type="subtitle" style={styles.subtitle}>Popular Games</ThemedText>
      <FlatList
        data={games}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <GameCard title={item.title} image={item.image} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gameList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#ff4500',
    fontFamily: 'SpaceMono',
  },
  searchBar: {
    marginVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    paddingHorizontal: 20,
    shadowColor: '#ff4500',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  spinButton: {
    alignSelf: 'center',
  },
  subtitle: {
    color: '#e0e0e0',
    marginBottom: 10,
  },
  gameList: {
    paddingBottom: 20,
  },
});