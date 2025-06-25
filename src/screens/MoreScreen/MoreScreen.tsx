import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomText } from '../../components/CustomText';
import { CustomIcon } from '../../components/CustomIcon';
import { COLORS } from '../../utils/theme';
import { useMoreScreen } from './hooks/useMoreScreen';

const MoreScreen = () => {
  const {
    isLoading,
    handleSignIn,
    handleSettings,
    handleBecomeSitter,
    handleHelpCenter,
    handleContactSitter,
    handlePetDetails,
    handleBackPress,
    handleNextPress,
  } = useMoreScreen();

  const MenuButton = ({
    icon,
    title,
    onPress,
  }: {
    icon: any;
    title: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.menuButtonContent}>
        <Image source={icon} style={styles.menuIcon} />
        <CustomText
          textType="BodyLargeRegular"
          color={COLORS.TextPrimary}
          textStyle={styles.menuText}>
          {title}
        </CustomText>
      </View>
    <CustomIcon
            icon="chevron-right"
            type="FontAwesome"
            size={RFValue(15)}
            color={COLORS.NeutralGrey60}
          />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.StaticWhite} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerButton}>
          <CustomIcon
            icon="arrow-left"
            type="FontAwesome"
            size={15}
            color={COLORS.TextPrimary}
          />
        </TouchableOpacity>

        <CustomText
          textType="H5SemiBold"
          color={COLORS.TextPrimary}
          center>
          More
        </CustomText>
        
        <TouchableOpacity onPress={handleNextPress} style={styles.headerButton}>
          <CustomIcon
            icon="arrow-right"
            type="FontAwesome"
            size={15}
            color={COLORS.TextPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.headerDivider} />

      {/* Content */}
      <View style={styles.content}>
        {/* You Section */}
        <View style={styles.section}>
          <CustomText
            textType="H5SemiBold"
            color={COLORS.TextPrimary}
            textStyle={styles.sectionTitle}>
            You
          </CustomText>

          <View style={styles.menuContainer}>
            <MenuButton
              icon={require('../../../assets/icons/personIcon.png')}
              title="Sign in or sign up"
              onPress={handleSignIn}
            />
            <MenuButton
              icon={require('../../../assets/icons/settingIcon.png')}
              title="Setting"
              onPress={handleSettings}
            />
            <MenuButton
              icon={require('../../../assets/icons/heartIcon.png')}
              title="Become a sitter"
              onPress={handleBecomeSitter}
            />
            <MenuButton
              icon={require('../../../assets/icons/helpicon.png')}
              title="Help Center & Rover Support"
              onPress={handleHelpCenter}
            />
            <MenuButton
              icon={require('../../../assets/icons/heartIcon.png')}
              title="Pet Details"
              onPress={handlePetDetails}
            />
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.contactButton, isLoading && styles.contactButtonDisabled]}
          onPress={handleContactSitter}
          disabled={isLoading}>
          <CustomText
            textType="BodyLargeSemiBold"
            color={COLORS.StaticWhite}
            center>
            {isLoading ? 'Loading...' : 'Contact this sitter'}
          </CustomText>
        </TouchableOpacity>
        
        {/* Bottom Indicator */}
        <View />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.StaticWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    height: hp(8),
  },
  headerButton: {
    width: wp(6),
    height: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: COLORS.NeutralGrey20,
    marginHorizontal: wp(4),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(3),
  },
  section: {
    marginBottom: hp(4),
  },
  sectionTitle: {
    marginBottom: hp(2.5),
    marginLeft: wp(1),
  },
  menuContainer: {
    gap: hp(0.5),
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.StaticWhite,
    borderRadius: RFValue(8),
  },
  menuButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: RFValue(20),
    height: RFValue(20),
    marginRight: wp(4),
    tintColor: COLORS.TextPrimary,
  },
  menuText: {
    flex: 1,
  },
  greaterIcon: {
    width: RFValue(14),
    height: RFValue(16),
    tintColor: COLORS.TextPrimary,
  },
  bottomContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(1),
    alignItems: 'center',
  },
  contactButton: {
    backgroundColor: COLORS.Primary,
    paddingVertical: hp(2),
    paddingHorizontal: wp(8),
    borderRadius: RFValue(25),
    width: wp(85),
    marginBottom: hp(2),
  },
  contactButtonDisabled: {
    opacity: 0.6,
  },
});


export default MoreScreen;