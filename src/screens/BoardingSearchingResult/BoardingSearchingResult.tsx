import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomText } from '../../components/CustomText';
import { CustomIcon } from '../../components/CustomIcon';
import { COLORS, SHADOW, FONT_PACIFICO, } from '../../utils/theme';
import { useBoardingSearching } from './hooks/useBoardingSearching';
import { ProfileCard } from './components/ProfileCard';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ContactAmericaScreen from '../ContactAmerica';

export const BoardingSearching: React.FC = () => {
  const { profiles, loading, refreshProfiles } = useBoardingSearching();
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();

  const handleProfilePress = (profileId: string) => {
    navigation.navigate('ContactAmerica');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.StaticWhite} />
      
      {/* Header */}
      <View style={styles.header}>
      <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <CustomIcon
                   type="Ionicons"
                   icon="arrow-back"
                   size={24}
                   color={COLORS.TextPrimary}
                />
            </TouchableOpacity>
               
             </View>

          <CustomText textStyle={styles.title} fontSize="S24" color={COLORS.TextPrimary}>
            Boarding
          </CustomText>
      </View>

      {/* Trust Banner */}
      <View style={styles.trustBanner}>
        <Image
          source={require('../../../assets/icons/VerifyIcon.png')}
          style={styles.verifyIcon}
        />
       <View style={styles.trustTextContainer}>
          <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey100}>
            We{' '}
            <TouchableOpacity
              style={styles.backgroundCheckButton}
              onPress={() => console.log('Background check pressed')}
              activeOpacity={0.7}
            >
              <CustomText textType="BodyMediumBold" color={COLORS.StaticBlue}>
                background check
              </CustomText>
            </TouchableOpacity>
            {' '}every sitter.
          </CustomText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Find a Match Section */}
          <View style={styles.findMatchHeader}>
            <CustomIcon
              icon="search"
              type="FontAwesome"
              size={RFValue(20)}
            //   color={COLORS.TextPrimary}
            />
            <CustomText
              textType="H5Bold"
              color={COLORS.TextPrimary}
              textStyle={styles.findMatchTitle}
            >
              Find a match
            </CustomText>
          </View>
          
          <CustomText
            textType="BodyMediumRegular"
            color={COLORS.TextPrimary}
            textStyle={styles.findMatchDescription}
          >
            Add dates to see boarding sitters who'll be available for your need. These are sitters in your area, but they might not be available.
          </CustomText>

        {/* Profiles List */}
        <View style={styles.profilesList}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey70}>
                Loading profiles...
              </CustomText>
            </View>
          ) : (
            profiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                index={index + 1}
                onPress={() => handleProfilePress(profile.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NeutralGrey0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    backgroundColor: COLORS.StaticWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BorderPrimary,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: wp('6%'),
  },
  title: {
    fontFamily: FONT_PACIFICO.regularFont,
    textAlign: 'left',
    marginBottom: 0,
    marginRight: wp(2),
    marginLeft: wp(2),
  },
  headerTitle: {
    flex: 1,
    marginLeft: wp(2),
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.Secondary,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    marginBottom: hp(1),
  },
  trustTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backgroundCheckButton: {
    paddingVertical: hp(0.0),
    marginTop: wp(2.5),
  },
  verifyIcon: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(2),
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(2),
  },
  findMatchContainer: {
    backgroundColor: COLORS.StaticWhite,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: RFValue(12),
    ...SHADOW.light,
  },
  findMatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    marginLeft: hp(2),
  },
  findMatchTitle: {
    marginTop: hp(0.5),
    marginLeft: hp(1),
  },
  findMatchDescription: {
    lineHeight: RFValue(20),
    marginLeft: hp(3),
  },
  profilesList: {
    gap: hp(0.5),
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
  },
});