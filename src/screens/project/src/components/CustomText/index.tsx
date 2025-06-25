import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_POPPINS } from '../../utils/theme';
import { CustomTextProps, TextType, FontSize, FontWeight } from './interface';
import { RFValue } from 'react-native-responsive-fontsize';

export const TEXT_TYPES: Record<TextType, { fontWeight: string; fontSize: number }> = {
  H1ExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(43.153),
  },
  H1Bold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(43.153),
  },
  H1SemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(43.153),
  },
  H2ExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(39.923),
  },
  H2Bold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(39.923),
  },
  H2SemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(39.923),
  },
  H3ExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(30.769),
  },
  H3Bold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(30.769),
  },
  H3SemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(30.769),
  },
  H4ExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(24.615),
  },
  H4Bold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(24.615),
  },
  H4SemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(24.615),
  },
  H4Regular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(24.615),
  },
  H5ExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(18.461),
  },
  H5Bold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(18.461),
  },
  H5SemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18.461),
  },
  H5Regular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(18.461),
  },
  H6ExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(15.384),
  },
  H6Bold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(15.384),
  },
  H6SemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(15.384),
  },
  H6Regular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(15.384),
  },
  BodyLargeExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(13.846),
  },
  BodyLargeBold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(13.846),
  },
  BodyLargeSemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(13.846),
  },
  BodyLargeRegular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(13.846),
  },
  BodyMediumExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(12.307),
  },
  BodyMediumBold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(12.307),
  },
  BodyMediumSemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(12.307),
  },
  BodyMediumRegular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(12.307),
  },
  SubtitleExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(10.769),
  },
  SubtitleBold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(10.769),
  },
  SubtitleSemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(10.769),
  },
  SubtitleRegular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(10.769),
  },
  CaptionExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(9.23),
  },
  CaptionBold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(9.23),
  },
  CaptionSemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(9.23),
  },
  CaptionRegular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(9.23),
  },
  FootnoteExtraBold: {
    fontWeight: FONT_POPPINS.extraBoldFont,
    fontSize: RFValue(7.692),
  },
  FootnoteBold: {
    fontWeight: FONT_POPPINS.boldFont,
    fontSize: RFValue(7.692),
  },
  FootnoteSemiBold: {
    fontWeight: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(7.692),
  },
  FootnoteRegular: {
    fontWeight: FONT_POPPINS.regularFont,
    fontSize: RFValue(7.692),
  },
};

const fontSizeLevel: Record<FontSize, number> = {
  S8: RFValue(8),
  S9: RFValue(9),
  S10: RFValue(10),
  S11: RFValue(11),
  S12: RFValue(12),
  S13: RFValue(13),
  S14: RFValue(14),
  S15: RFValue(15),
  S16: RFValue(16),
  S17: RFValue(17),
  S18: RFValue(18),
  S19: RFValue(19),
  S20: RFValue(20),
  S21: RFValue(21),
  S22: RFValue(22),
  S23: RFValue(23),
  S24: RFValue(24),
  S25: RFValue(25),
  S26: RFValue(26),
  S27: RFValue(27),
  S28: RFValue(28),
};

const fontWeights: Record<FontWeight, string> = {
  '200': FONT_POPPINS.extraLightFont,
  '300': FONT_POPPINS.lightFont,
  '400': FONT_POPPINS.regularFont,
  '500': FONT_POPPINS.mediumFont,
  '600': FONT_POPPINS.semiBoldFont,
  '700': FONT_POPPINS.boldFont,
  '800': FONT_POPPINS.extraBoldFont,
  '1200': 'Pacifico-Regular'
};

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  textStyle,
  color,
  center,
  onPress,
  underline,
  numberOfLines,
  fontWeight,
  fontSize,
  textType = 'BodyMediumRegular',
  disabled = false,
  containerStyle,
  ...rest
}) => {
  return (
    <View style={containerStyle}>
      <Text
        allowFontScaling={false}
        style={[
          styles.text,
          { opacity: disabled ? 0.4 : 1 },
          underline && { textDecorationLine: 'underline' },
          center && { textAlign: 'center' },
          { color: color || COLORS.NeutralGrey60 },
          textType && {
            fontFamily: TEXT_TYPES[textType].fontWeight,
            fontSize: TEXT_TYPES[textType].fontSize || RFValue(12),
          },
          fontWeight && {
            fontFamily: fontWeights[fontWeight],
          },
          fontSize && {
            fontSize: fontSizeLevel[fontSize],
          },
          disabled && { opacity: 0.5 },
          textStyle,
        ]}
        disabled={typeof onPress !== 'function' || disabled}
        onPress={typeof onPress === 'function' ? onPress : () => {}}
        numberOfLines={numberOfLines}
        {...rest}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12.5),
  },
});