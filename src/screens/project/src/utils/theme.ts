import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const COLORS = {
  Primary: '#8F9E73',
  Primary10: '#0071BC1A',
  PrimaryGreen60: '#1C8F5D',
  Secondary: '#F6EDCA',
  SecondaryV2: '#6C38B2',
  Secondary10: '#6C38B21A',
  Warning: '#FFAA00',
  Warning10: '#EDA12F',
  ErrorRed0: '#FCDBDB',
  ErrorRed50: '#F14D4D',
  ErrorRed60: '#C94040',
  StaticWhite: '#FFFFFF',
  StaticBlack: '#000000',
  NeutralGrey0: '#F2F5F6',
  NeutralGrey10: '#E9EDEE',
  NeutralGrey20: '#D8DFE0',
  NeutralGrey40: '#B6C2C3',
  NeutralGrey60: '#8D9A9B',
  NeutralGrey70: '#626D6F',
  NeutralGrey80: '#51595A',
  NeutralGrey90: '#333839',
  NeutralGrey100: '#25292A',
  ButtonPrimary: '#CFC9C180', 
  BorderPrimary: '#A9A59F', 
  StaticBlue: '#4C96FF', 
  TextPrimary: '#404348',
};

export const FONT_POPPINS = {
  boldFont: 'Poppins-Bold',
  extraBoldFont: 'Poppins-ExtraBold',
  extraLightFont: 'Poppins-ExtraLight',
  lightFont: 'Poppins-Light',
  mediumFont: 'Poppins-Medium',
  regularFont: 'Poppins-Regular',
  semiBoldFont: 'Poppins-SemiBold',
};

export const SHADOW = {
  light: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  dark: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
};