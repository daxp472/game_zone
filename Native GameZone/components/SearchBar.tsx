import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Input } from '@/components/ui/Input';
import { ThemedView } from '@/components/ui/ThemedView';

type SearchBarProps = {
  placeholder: string;
};

export function SearchBar({ placeholder }: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSearch = (text: string) => {
    setSearch(text);
    // Placeholder for API search
    console.log('Search:', text);
  };

  return (
    <ThemedView style={styles.container}>
      <Input
        placeholder={placeholder}
        value={search}
        onChangeText={handleSearch}
        style={styles.input}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    width: '100%',
  },
});