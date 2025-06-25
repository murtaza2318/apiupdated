import {ReactNode} from 'react';
import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';

// extend TextProps with custom text props

export interface CustomTextProps extends TextProps {
  children: ReactNode;
  underline?: boolean;
  color?: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  textStyle?: StyleProp<ViewStyle | TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  center?: boolean;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightsType;
  textType?: TTextType;
  rest?: TextProps;
  disabled?: boolean;
}

export type FontSizeType =
  | 'S8'
  | 'S9'
  | 'S10'
  | 'S11'
  | 'S12'
  | 'S13'
  | 'S14'
  | 'S15'
  | 'S16'
  | 'S17'
  | 'S18'
  | 'S19'
  | 'S20'
  | 'S21'
  | 'S22'
  | 'S23'
  | 'S24'
  | 'S25'
  | 'S26'
  | 'S27'
  | 'S28';
export type FontWeightsType =
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '1200';

export type TTextType =
  | 'H1ExtraBold'
  | 'H1Bold'
  | 'H1SemiBold'
  | 'H2ExtraBold'
  | 'H2Bold'
  | 'H2SemiBold'
  | 'H3ExtraBold'
  | 'H3Bold'
  | 'H3SemiBold'
  | 'H4ExtraBold'
  | 'H4Bold'
  | 'H4SemiBold'
  | 'H4Regular'
  | 'H5ExtraBold'
  | 'H5Bold'
  | 'H5SemiBold'
  | 'H5Regular'
  | 'H6ExtraBold'
  | 'H6Bold'
  | 'H6SemiBold'
  | 'H6Regular'
  | 'BodyLargeExtraBold'
  | 'BodyLargeBold'
  | 'BodyLargeSemiBold'
  | 'BodyLargeRegular'
  | 'BodyMediumExtraBold'
  | 'BodyMediumBold'
  | 'BodyMediumSemiBold'
  | 'BodyMediumRegular'
  | 'SubtitleExtraBold'
  | 'SubtitleBold'
  | 'SubtitleSemiBold'
  | 'SubtitleRegular'
  | 'CaptionExtraBold'
  | 'CaptionBold'
  | 'CaptionSemiBold'
  | 'CaptionRegular'
  | 'FootnoteExtraBold'
  | 'FootnoteBold'
  | 'FootnoteSemiBold'
  | 'FootnoteRegular';
