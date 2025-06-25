import {ViewStyle, TextStyle} from 'react-native';

export interface CustomIconProps {
  icon: string;
  type: IconType;
  color?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  size?: number;
  disabled?: boolean;
  resizeMode?: string;
  style?: ViewStyle;
  iconStyle?: TextStyle;  // for the icon itself
  tintColor?: string;
}
export type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'Ionicons'
  | 'FontAwesome'
  | 'Fontisto'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Feather'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Foundation'
  | 'SimpleLineIcons'
  | 'EvilIcons'
  | 'Octicons';
