import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  style?: object;
};

export function Button({ title, onPress, style }: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});