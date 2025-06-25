import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomText } from '../../../components/CustomText';
import { COLORS, SHADOW } from '../../../utils/theme';
import { Profile } from '../hooks/useBoardingSearching';

interface ProfileCardProps {
  profile: Profile;
  index: number;
  onPress?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, index, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, SHADOW.medium]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={profile.profileImage} style={styles.profileImage} />
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.nameRow}>
            <CustomText textType="BodyLargeBold" color={COLORS.NeutralGrey100}>
              {index}. {profile.name}
            </CustomText>
            {profile.isStarSitter && (
              <View style={styles.starSitterBadge}>
                <CustomText textType="CaptionBold" color={COLORS.StaticWhite}>
                  Star Sitter
                </CustomText>
              </View>
            )}
          </View>
          
          <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey70} numberOfLines={1}>
            {profile.description}
          </CustomText>
          
          <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey70}>
            {profile.distance}
          </CustomText>
        </View>
        
        <View style={styles.priceContainer}>
          <CustomText textType="CaptionRegular" color={COLORS.NeutralGrey70}>
            from
          </CustomText>
          <CustomText textType="H5Bold" color={COLORS.Primary}>
            ${profile.price}
          </CustomText>
          <CustomText textType="CaptionRegular" color={COLORS.NeutralGrey70}>
            per night
          </CustomText>
        </View>
      </View>
      
      {/* Profile Stats */}
      <View style={styles.statsContainer}>
        {/* Rating */}
        <View style={styles.statRow}>
          <Image source={require('../../../../assets/icons/stars.png')} style={styles.statIcon} />
          <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey70}>
            {profile.rating} • {profile.reviewCount} reviews
          </CustomText>
        </View>
        
        {/* Repeat Clients */}
        <View style={styles.statRow}>
          <Image source={require('../../../../assets/icons/Repeat.png')} style={styles.statIcon} />
          <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey70}>
            {profile.repeatClients} repeat clients
          </CustomText>
        </View>
        
        {/* Availability */}
        <View style={styles.statRow}>
          <Image source={require('../../../../assets/icons/Checkcircle.png')} style={styles.statIcon} />
          <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey70}>
            Availability updated {profile.availabilityUpdated}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.StaticWhite,
    borderRadius: RFValue(12),
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    padding: wp(4),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  profileImageContainer: {
    marginRight: wp(3),
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    resizeMode: 'cover',
  },
  headerContent: {
    flex: 1,
    paddingRight: wp(2),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
    flexWrap: 'wrap',
  },
  starSitterBadge: {
    backgroundColor: COLORS.Primary,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: RFValue(12),
    marginLeft: wp(2),
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  statsContainer: {
    gap: hp(0.8),
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: wp(4),
    height: wp(4),
    marginRight: wp(2),
    resizeMode: 'contain',
  },
});