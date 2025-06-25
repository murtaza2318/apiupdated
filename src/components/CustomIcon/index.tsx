import React from 'react';
import {TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
import {CustomIconProps} from './interface';
import {RFValue} from 'react-native-responsive-fontsize';


export const CustomIcon: React.FC<CustomIconProps> = ({
  icon,
  type,
  color,
  onPress,
  size,
  disabled,
  resizeMode,
  style,
  onLongPress,
  tintColor,
  iconStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={
        disabled ||
        (typeof onPress !== 'function' && typeof onLongPress !== 'function')
      }>
      {type == 'Entypo' && (
        <Entypo
          disabled
          name={icon as any}
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'Ionicons' && (
        <Ionicons
          disabled
          name={icon as any} 
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'FontAwesome' && (
        <FontAwesome
          disabled
          name={icon as any}
          style={iconStyle}
          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'FontAwesome6' && (
        <FontAwesome6
          disabled
          name={icon as any}
          style={iconStyle}          
          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'Fontisto' && (
        <Fontisto
          disabled
          name={icon as any}
          style={iconStyle}          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'FontAwesome5' && (
        <FontAwesome5
          disabled
          name={icon as any}
          style={iconStyle}          
          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'Feather' && (
        <Feather
          disabled
          name={icon as any}
          style={iconStyle}          
          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'MaterialIcons' && (
        <MaterialIcons
          disabled
          name={icon as any}
          style={iconStyle}          
          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          disabled
          name={icon as any}
          style={iconStyle}          
          
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'Foundation' && (
        <Foundation
          name={icon as any}
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'AntDesign' && (
        <AntDesign
          name={icon as any}
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'SimpleLineIcons' && (
        <SimpleLineIcons
          name={icon as any}
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'EvilIcons' && (
        <EvilIcons
          name={icon as any}
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
      {type == 'Octicons' && (
        <Octicons
          name={icon as any}
          color={color || COLORS.NeutralGrey100}
          size={size || RFValue(20)}
          {...rest}
        />
      )}
    </TouchableOpacity>
  );
};
