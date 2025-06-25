import React from 'react';
import { TouchableOpacity } from 'react-native';
import { 
  AntDesign, 
  Entypo, 
  EvilIcons, 
  Feather, 
  FontAwesome, 
  FontAwesome5, 
  Fontisto, 
  Foundation, 
  Ionicons, 
  MaterialCommunityIcons, 
  MaterialIcons, 
  Octicons, 
  SimpleLineIcons,
  FontAwesome6
} from '@expo/vector-icons';
import { COLORS } from '../../utils/theme';
import { CustomIconProps } from './interface';
import { RFValue } from 'react-native-responsive-fontsize';

export const CustomIcon: React.FC<CustomIconProps> = ({
  icon,
  type,
  color,
  onPress,
  size,
  disabled,
  style,
  onLongPress,
  ...rest
}) => {
  const IconComponent = {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
  }[type];

  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={
        disabled ||
        (typeof onPress !== 'function' && typeof onLongPress !== 'function')
      }>
      <IconComponent
        name={icon}
        color={color || COLORS.NeutralGrey100}
        size={size || RFValue(20)}
        {...rest}
      />
    </TouchableOpacity>
  );
};