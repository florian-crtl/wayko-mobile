import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  placeholder, 
  error,
  style,
  ...textInputProps 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholder={placeholder}
        placeholderTextColor="hsl(240 3.8% 46.1%)" // muted-foreground
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'hsl(24 9.8% 10%)', // foreground
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)', // border
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'hsl(0 0% 100%)', // background
    color: 'hsl(24 9.8% 10%)', // foreground
    minHeight: 48,
  },
  inputError: {
    borderColor: 'hsl(0 84.2% 60.2%)', // destructive red
  },
  errorText: {
    fontSize: 12,
    color: 'hsl(0 84.2% 60.2%)', // destructive red
    marginTop: 4,
  },
}); 