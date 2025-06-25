import { TouchableOpacityProps } from 'react-native';

export type IconType = 
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons';

export interface CustomIconProps extends TouchableOpacityProps {
  icon: string;
  type: IconType;
  color?: string;
  size?: number;
  disabled?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  tintColor?: string;
  onLongPress?: () => void;
}