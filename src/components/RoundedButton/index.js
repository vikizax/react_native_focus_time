import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles(size, disabled).radius, style]}
      onPress={props.onPress}>
      <Text style={[styles(size, disabled).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size, disabled) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: disabled ? colors.disabled : colors.white,
      borderWidth: 2,
    },
    text: {
      color: disabled ? colors.disabled : colors.white,
      fontSize: 20,
    },
  });
