import { Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ThemedTextProps = {
  type?: 'title' | 'subtitle' | 'default' | 'link';
  style?: object;
  children: React.ReactNode;
};

export function ThemedText({ type = 'default', style, children }: ThemedTextProps) {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[
        styles.text,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        { color: Colors[colorScheme ?? 'light'].text },
        // Fallback font if GameFont is unavailable
        { fontFamily: Platform.select({ ios: 'GameFont', android: 'SpaceMono', default: 'SpaceMono' }) },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});