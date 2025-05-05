import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Enhanced: Added animated tournament cards with live indicators
export default function TournamentScreen() {
  const tournaments = [
    { id: '1', title: 'Global Clash', status: 'Live', prize: '1000 Coins' },
    { id: '2', title: 'Neon Showdown', status: 'Upcoming', prize: '500 Coins' },
  ];

  return (
    <ThemedView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600)}>
        <ThemedText type="title" style={styles.title}>Tournaments</ThemedText>
        <FlatList
          data={tournaments}
          renderItem={({ item }) => (
            <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.card}>
              <ThemedText style={styles.tournamentTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.status}>{item.status}</ThemedText>
              <ThemedText style={styles.prize}>Prize: {item.prize}</ThemedText>
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    color: '#ff4500',
    fontFamily: 'GameFont',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#ff4500',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tournamentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  status: {
    color: '#8a2be2',
    fontSize: 14,
  },
  prize: {
    color: '#ff4500',
    fontSize: 14,
  },
  list: {
    paddingBottom: 20,
  },
});