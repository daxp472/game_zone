import { Text, StyleSheet } from 'react-native';

type IconSymbolProps = {
  name: string;
  size: number;
  color: string;
  style?: object;
};

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  // Placeholder for icon rendering (replace with actual icon library like @expo/vector-icons)
  return (
    <Text style={[styles.icon, { fontSize: size, color }, style]}>{name}</Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'SpaceMono',
  },
});