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

interface SitterCardProps {
  name: string;
  location: string;
  repeatClients: number;
  rating: number;
  reviews: number;
  price: number;
  isSelected?: boolean;
  onPress?: () => void;
}

const SitterCard: React.FC<SitterCardProps> = ({
  name,
  location,
  repeatClients,
  rating,
  reviews,
  price,
  isSelected = false,
  onPress,
}) => (
  <TouchableOpacity style={[styles.sitterCard, isSelected && styles.selectedCard]} onPress={onPress}>
    <View style={styles.sitterInfo}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>
      <View style={styles.sitterDetails}>
        <Text style={styles.sitterName}>{name}</Text>
        <Text style={styles.sitterLocation}>{location}</Text>
        
        <View style={styles.statsRow}>
          <CustomIcon
            icon="refresh-cw"
            type="Feather"
            size={RFValue(14)}
            color="#8F9E73"
          />
          <Text style={styles.statsText}>{repeatClients} repeat clients</Text>
        </View>
        
        <View style={styles.statsRow}>
          <CustomIcon
            icon="star"
            type="Feather"
            size={RFValue(14)}
            color="#8F9E73"
          />
          <Text style={styles.statsText}>{rating} • {reviews} reviews</Text>
        </View>
        
        <Text style={styles.price}>${price}/per night</Text>
      </View>
    </View>
    
    {isSelected && (
      <View style={styles.checkmarkContainer}>
        <CustomIcon
          icon="check"
          type="Feather"
          size={RFValue(16)}
          color={COLORS.StaticWhite}
        />
      </View>
    )}
  </TouchableOpacity>
);

const RequestSentScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.checkCircle}>
            <CustomIcon
              icon="check"
              type="Feather"
              size={RFValue(24)}
              color={COLORS.StaticWhite}
            />
          </View>
          <Text style={styles.successTitle}>Request sent to Christy</Text>
        </View>

        {/* Service Details */}
        <View style={styles.serviceSection}>
          <Text style={styles.serviceType}>House Sitting</Text>
          <Text style={styles.serviceDetails}>Starts Jun 16 - 1 pet - $40 per night</Text>
          <View style={styles.lastMinuteTag}>
            <Text style={styles.lastMinuteText}>LAST-MINUTE REQUEST</Text>
          </View>
        </View>

        {/* Additional Sitters Section */}
        <View style={styles.additionalSection}>
          <Text style={styles.sectionTitle}>Consider additional sitters</Text>
          
          <View style={styles.warningBox}>
            <CustomIcon
              icon="alert-triangle"
              type="Feather"
              size={RFValue(20)}
              color="#F59E0B"
            />
            <Text style={styles.warningText}>
              With less than 2 weeks to go, availability is limited. Boost your chances by contacting more sitters.
            </Text>
          </View>

          {/* Sitter Cards */}
          <SitterCard
            name="America C."
            location="Katy, TX, 77449"
            repeatClients={40}
            rating={5.0}
            reviews={109}
            price={40}
            isSelected={true}
          />

          <SitterCard
            name="Mary"
            location="Houston, TX, 77084"
            repeatClients={5}
            rating={5.0}
            reviews={19}
            price={50}
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addSitterButton}>
          <Text style={styles.addSitterButtonText}>Add Sitter</Text>
        </TouchableOpacity>
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
    paddingHorizontal: wp('5%'),
  },
  successHeader: {
    alignItems: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('3%'),
  },
  checkCircle: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: '#8F9E73',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  successTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(20),
    color: COLORS.TextPrimary,
    textAlign: 'center',
  },
  serviceSection: {
    marginBottom: hp('3%'),
  },
  serviceType: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(16),
    color: COLORS.NeutralGrey60,
    marginBottom: hp('0.5%'),
  },
  serviceDetails: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginBottom: hp('1%'),
  },
  lastMinuteTag: {
    backgroundColor: '#FEF3CD',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: RFValue(4),
    alignSelf: 'flex-start',
  },
  lastMinuteText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(10),
    color: '#D97706',
  },
  additionalSection: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
    marginBottom: hp('2%'),
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF3CD',
    padding: wp('4%'),
    borderRadius: RFValue(8),
    marginBottom: hp('3%'),
    alignItems: 'flex-start',
  },
  warningText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: '#92400E',
    marginLeft: wp('3%'),
    flex: 1,
    lineHeight: RFValue(20),
  },
  sitterCard: {
    backgroundColor: COLORS.StaticWhite,
    borderRadius: RFValue(12),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#8F9E73',
    backgroundColor: '#F8FAF5',
  },
  sitterInfo: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: wp('4%'),
  },
  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: COLORS.NeutralGrey20,
  },
  sitterDetails: {
    flex: 1,
  },
  sitterName: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  sitterLocation: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
    marginBottom: hp('1%'),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  statsText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginLeft: wp('2%'),
  },
  price: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: '#8F9E73',
    marginTop: hp('0.5%'),
  },
  checkmarkContainer: {
    position: 'absolute',
    top: wp('4%'),
    right: wp('4%'),
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    backgroundColor: '#8F9E73',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('3%'),
    paddingTop: hp('2%'),
  },
  addSitterButton: {
    backgroundColor: '#8F9E73',
    paddingVertical: hp('2%'),
    borderRadius: RFValue(25),
    alignItems: 'center',
  },
  addSitterButtonText: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.StaticWhite,
  },
});

export default RequestSentScreen;