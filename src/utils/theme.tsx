import { Platform, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CustomIcon } from '../components/CustomIcon';
import { IconType } from '../components/CustomIcon/interface';
import { CustomText } from '../components/CustomText';

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


export const IMAGES = {
  // windMetric: require('../assets/images/map/windMetric.png'),

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
export const FONT_PACIFICO = {
  regularFont: 'Pacifico-Regular',
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

// * --------------------- Toast setup ---------------------

interface ToastType {
  color: string;
  backgroundColor: string;
  iconName: string;
  iconType: IconType;
}

interface ToastTypes {
  success: ToastType;
  info: ToastType;
  warning: ToastType;
  error: ToastType;
}

const TOASTS_DATA: ToastTypes = {
  success: {
    color: COLORS.Primary,
    backgroundColor: COLORS.NeutralGrey0,
    iconName: 'check-circle',
    iconType: 'Octicons',
    ...SHADOW.dark,
  },
  warning: {
    color: COLORS.SecondaryV2,
    backgroundColor: COLORS.Secondary10,
    iconName: 'information-circle-outline',
    iconType: 'Ionicons',
  },
  info: {
    color: COLORS.Secondary,
    backgroundColor: COLORS.StaticWhite,
    iconName: 'alert',
    iconType: 'Octicons',
  },
  error: {
    color: COLORS.ErrorRed50,
    backgroundColor: COLORS.ErrorRed0,
    iconName: 'close-circle-outline',
    iconType: 'Ionicons',
  },
};

interface ICustomToast {
  type: 'success' | 'info' | 'warning' | 'error';
  heading: string;
  message?: string;
}

const CustomToast = (props: ICustomToast) => {
  const { type, heading, message } = props;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: TOASTS_DATA[type].backgroundColor,
          borderLeftColor: TOASTS_DATA[type].color,
        },
      ]}>
      <CustomIcon
        icon={TOASTS_DATA[type].iconName}
        type={TOASTS_DATA[type].iconType}
        size={RFValue(16.92)}
        color={TOASTS_DATA[type].color}
      />
      <View style={{ flex: 1, gap: RFValue(2) }}>
        <CustomText
          textType={'BodyMediumBold'}
          color={TOASTS_DATA[type].color}
          textStyle={{ flex: 1 }}>
          {heading}
        </CustomText>
        {message && (
          <CustomText
            textType={'SubtitleRegular'}
            color={COLORS.NeutralGrey70}
            textStyle={{ flex: 1 }}>
            {message}
          </CustomText>
        )}
      </View>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    width: RFValue(250),
    backgroundColor: 'red',
    borderRadius: RFValue(5),
    padding: RFValue(10),
    borderLeftWidth: 6,
    flexDirection: 'row',
    gap: RFValue(5),
    alignSelf: 'flex-end',
    margin: wp(5),
  },
});

export const toastConfig = {
  success: ({ props }: any) => (
    <CustomToast
      type={'success'}
      heading={props.heading}
      message={props.message}
    />
  ),
  info: ({ props }: any) => (
    <CustomToast
      type={'info'}
      heading={props.heading}
      message={props.message}
    />
  ),
  warning: ({ props }: any) => (
    <CustomToast
      type={'warning'}
      heading={props.heading}
      message={props.message}
    />
  ),
  error: ({ props }: any) => (
    <CustomToast
      type={'error'}
      heading={props.heading}
      message={props.message}
    />
  ),
};
