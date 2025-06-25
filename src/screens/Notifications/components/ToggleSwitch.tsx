import React from 'react';
import { Switch, Platform } from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: () => void;
  trackColor?: { false: string; true: string };
  style?: any;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange, trackColor = { false: '#e0e0e0', true: '#8f9e73' }, style }) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={trackColor}
      thumbColor={value ? '#fff' : (Platform.OS === 'android' ? '#fff' : undefined)}
      style={style}
    />
  );
};

export default ToggleSwitch; 