import React from 'react';
import { Switch } from 'react-native';
import { COLORS } from '../../utils/theme';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <Switch
      trackColor={{ 
        false: COLORS.NeutralGrey20, 
        true: COLORS.Primary 
      }}
      thumbColor={value ? COLORS.StaticWhite : COLORS.NeutralGrey40}
      ios_backgroundColor={COLORS.NeutralGrey20}
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
    />
  );
};