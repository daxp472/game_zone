import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ThemedViewProps = {
  style?: object;
  children: React.ReactNode;
};

export function ThemedView({ style, children }: ThemedViewProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[styles.view, { backgroundColor: Colors[colorScheme ?? 'light'].background }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});