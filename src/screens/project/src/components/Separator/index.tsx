import React from 'react';
import { View, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';

interface SeparatorProps {
  style?: ViewStyle;
  color?: string;
  height?: number;
}

export const Separator: React.FC<SeparatorProps> = ({
  style,
  color = COLORS.NeutralGrey20,
  height = RFValue(1),
}) => {
  return (
    <View
      style={[
        {
          height,
          backgroundColor: color,
          width: '100%',
        },
        style,
      ]}
    />
  );
};