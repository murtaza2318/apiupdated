import React, { FC, forwardRef } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { COLORS } from '../../utils/theme';

interface Props extends TextInputProps {
  inputContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  title?: string;
  titleTextStyle?: TextStyle;
  error?: string;
  important?: boolean;
}

const CustomTextInput: FC<Props> = forwardRef<TextInput, Props>(({
  inputContainerStyle,
  textStyle,
  title,
  titleTextStyle,
  error,
  important = false,
  ...rest
}, ref) => {
  return (
    <View style={[styles.container, inputContainerStyle]}>
      {title && (
        <Text style={[styles.label, titleTextStyle]}>
          {title} {important && <Text style={styles.important}>*</Text>}
        </Text>
      )}
      <TextInput
        ref={ref}
        style={[styles.input, textStyle]}
        placeholderTextColor="#888"
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 5,
    color: COLORS.TextPrimary,
    fontWeight: 'bold',
  },
  important: {
    color: 'red',
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.StaticWhite,
    borderColor: COLORS.BorderPrimary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 13,
  },
});

export default CustomTextInput;
