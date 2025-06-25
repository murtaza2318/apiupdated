import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { CustomIcon } from '../../components/CustomIcon';
import { COLORS, FONT_POPPINS } from '../../utils/theme';

interface PetCardProps {
  name: string;
  breed: string;
  details: string;
  onPress: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ name, breed, details, onPress }) => (
  <TouchableOpacity style={styles.petCard} onPress={onPress}>
    <View style={styles.petInfo}>
      <View style={styles.petIcon}>
        <CustomIcon
          icon="heart"
          type="Feather"
          size={RFValue(20)}
          color={COLORS.NeutralGrey60}
        />
      </View>
      <View style={styles.petDetails}>
        <Text style={styles.petName}>{name}</Text>
        <Text style={styles.petBreed}>{breed}</Text>
        <Text style={styles.petDetailsText}>{details}</Text>
      </View>
    </View>
    <CustomIcon
      icon="chevron-right"
      type="Feather"
      size={RFValue(16)}
      color={COLORS.NeutralGrey60}
    />
  </TouchableOpacity>
);

const YourPetsScreen = () => {
  const navigation = useNavigation();

  const handleAddPet = () => {
    navigation.navigate('PetDetails' as never);
  };

  const handlePetPress = () => {
    // Navigate to pet details
    navigation.navigate('PetDetails' as never);
  };

  const handleGetQuote = () => {
    // Handle get quote action
    console.log('Get quote pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Pets</Text>
        </View>

        {/* Pet Insurance Section */}
        <View style={styles.insuranceSection}>
          <Text style={styles.insuranceTitle}>Shop for pet insurance</Text>
          <Text style={styles.insuranceDescription}>
            Pet insurance can help reduce vet bills. Compare plans today.
          </Text>
          <TouchableOpacity style={styles.quoteButton} onPress={handleGetQuote}>
            <Text style={styles.quoteButtonText}>Get a quote</Text>
          </TouchableOpacity>
        </View>

        {/* Pets Section */}
        <View style={styles.petsSection}>
          <Text style={styles.sectionTitle}>Pets</Text>
          
          <PetCard
            name="Kali"
            breed="Persian"
            details="12 pounds, 1 years, 2 months old"
            onPress={handlePetPress}
          />

          <TouchableOpacity style={styles.addPetButton} onPress={handleAddPet}>
            <Text style={styles.addPetText}>Add a Pet</Text>
            <CustomIcon
              icon="arrow-right"
              type="Feather"
              size={RFValue(16)}
              color={COLORS.NeutralGrey60}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navItem}>
          <CustomIcon
            icon="inbox"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.NeutralGrey60}
          />
          <Text style={styles.navText}>Inbox</Text>
        </View>
        <View style={styles.navItem}>
          <CustomIcon
            icon="search"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.NeutralGrey60}
          />
          <Text style={styles.navText}>Search</Text>
        </View>
        <View style={styles.navItem}>
          <CustomIcon
            icon="heart"
            type="Feather"
            size={RFValue(20)}
            color="#8F9E73"
          />
          <Text style={[styles.navText, styles.activeNavText]}>Your Pet</Text>
        </View>
        <View style={styles.navItem}>
          <CustomIcon
            icon="more-horizontal"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.NeutralGrey60}
          />
          <Text style={styles.navText}>More</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.StaticWhite,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(20),
    color: COLORS.TextPrimary,
  },
  insuranceSection: {
    backgroundColor: '#F3F4F6',
    marginHorizontal: wp('5%'),
    padding: wp('5%'),
    borderRadius: RFValue(12),
    marginBottom: hp('3%'),
  },
  insuranceTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  insuranceDescription: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
    textAlign: 'center',
    marginBottom: hp('2%'),
    lineHeight: RFValue(20),
  },
  quoteButton: {
    backgroundColor: COLORS.StaticWhite,
    paddingVertical: hp('1.5%'),
    borderRadius: RFValue(25),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey40,
  },
  quoteButtonText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
  },
  petsSection: {
    paddingHorizontal: wp('5%'),
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
    marginBottom: hp('2%'),
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  petIcon: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: COLORS.NeutralGrey20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  petBreed: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  petDetailsText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12),
    color: COLORS.NeutralGrey60,
  },
  addPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    marginTop: hp('1%'),
  },
  addPetText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(16),
    color: COLORS.NeutralGrey60,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: COLORS.NeutralGrey20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12),
    color: COLORS.NeutralGrey60,
    marginTop: hp('0.5%'),
  },
  activeNavText: {
    color: '#8F9E73',
  },
});

export default YourPetsScreen;