import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type SpinWheelButtonProps = {
  style?: object;
};

export function SpinWheelButton({ style }: SpinWheelButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <Link href="/spin-wheel" asChild>
      <Button
        title="Spin the Wheel!"
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme ?? 'light'].spinWheel },
          style,
        ]}
      >
        <View style={styles.animationPlaceholder}>
          <ThemedText style={styles.animationText}>Lottie Animation Placeholder</ThemedText>
        </View>
      </Button>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  animationText: {
    fontSize: 10,
    textAlign: 'center',
  },
});