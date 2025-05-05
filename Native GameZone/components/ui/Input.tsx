import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: object;
};

export function Input({ placeholder, value, onChangeText, secureTextEntry, style }: InputProps) {
  const colorScheme = useColorScheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          color: Colors[colorScheme ?? 'light'].text,
          borderColor: Colors[colorScheme ?? 'light'].border,
        },
        style,
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={Colors[colorScheme ?? 'light'].placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
});