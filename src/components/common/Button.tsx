import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false 
}) => {
  const buttonStyle = [
    styles.base,
    variant === 'primary' ? styles.primary : styles.secondary,
    disabled && styles.disabled
  ];

  const textStyle = [
    styles.baseText,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: 'hsl(24 9.8% 10%)', // primary color from design system
  },
  secondary: {
    backgroundColor: 'hsl(210 40% 98%)', // secondary color from design system
    borderWidth: 1,
    borderColor: 'hsl(214.3 31.8% 91.4%)', // border color
  },
  disabled: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: 'hsl(210 40% 98%)', // primary-foreground
  },
  secondaryText: {
    color: 'hsl(24 9.8% 10%)', // secondary-foreground
  },
  disabledText: {
    opacity: 0.7,
  },
}); 