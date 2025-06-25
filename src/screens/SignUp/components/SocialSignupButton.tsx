import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomText } from '../../../components/CustomText';
import { CustomIcon } from '../../../components/CustomIcon';
import { COLORS } from '../../../utils/theme';

interface SocialSignupButtonProps {
  type: 'facebook' | 'google';
  onPress: () => void;
  style?: ViewStyle;
  text?: string;
  textColor?: string;
  iconColor?: string;
}

const SocialSignupButton: React.FC<SocialSignupButtonProps> = ({
  type,
  onPress,
  style,
  text,
  textColor,
  iconColor,
}) => {
  const isFacebook = type === 'facebook';

  const defaultText = isFacebook ? 'Sign Up with Facebook' : 'Sign Up with Google';
  const defaultTextColor = isFacebook ? COLORS.NeutralGrey0 : COLORS.StaticWhite;
  const defaultIconColor = isFacebook ? COLORS.NeutralGrey0 : COLORS.StaticWhite;

  return (
    <TouchableOpacity
      style={[
        styles.socialButton,
        isFacebook ? styles.facebookButton : styles.googleButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <CustomIcon
        icon={isFacebook ? 'facebook' : 'google'}
        type="FontAwesome"
        size={RFValue(16)}
        color={iconColor ?? defaultIconColor}
        style={styles.socialIcon}
      />
      <CustomText
        textType="BodyMediumSemiBold"
        color={textColor ?? defaultTextColor}
        textStyle={styles.socialButtonText}
      >
        {text ?? defaultText}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(48),
    borderRadius: RFValue(24),
    marginVertical: RFValue(6),
    paddingHorizontal: wp(4),
  },
  facebookButton: {
    backgroundColor: COLORS.Secondary, 
  },
  googleButton: {
    backgroundColor: COLORS.Primary, 
  },
  socialIcon: {
    marginRight: RFValue(10),
  },
  socialButtonText: {
    fontSize: RFValue(14),
  },
});

export default SocialSignupButton;


