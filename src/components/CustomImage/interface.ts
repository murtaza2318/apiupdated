import {ImageProps, ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface CustomImageProps {
  editable?: boolean;
  id?: any;
  source?: any;
  height?: number | string;
  width?: number | string;
  onPressImage?: (id: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  resizeMode?: 'cover' | 'stretch' | 'center' | 'contain';
  loading?: boolean;
  style?: ImageStyle;
  tintColor?: string;
  thumbnail?: string;
  borderRadius?: number;
}