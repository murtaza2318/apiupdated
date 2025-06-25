import React, { useState } from 'react';
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

interface AddressFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
}

const AddressField: React.FC<AddressFieldProps> = ({ label, placeholder, value, onPress }) => (
  <TouchableOpacity style={styles.fieldContainer} onPress={onPress}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldContent}>
      <Text style={[styles.fieldValue, !value && styles.placeholder]}>
        {value || placeholder}
      </Text>
      <CustomIcon
        icon="chevron-right"
        type="Feather"
        size={RFValue(16)}
        color={COLORS.NeutralGrey60}
      />
    </View>
  </TouchableOpacity>
);

const MissingInfoScreen = () => {
  const navigation = useNavigation();
  const [addressData, setAddressData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDone = () => {
    // Handle save and navigate back
    navigation.goBack();
  };

  const handleFieldPress = (field: string) => {
    // Handle field editing - could navigate to input screen or show modal
    console.log(`Edit ${field}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <CustomIcon
            icon="arrow-left"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.TextPrimary}
          />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Missing Info</Text>
          <Text style={styles.headerSubtitle}>Your Address</Text>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <AddressField
          label="Address 1"
          placeholder="Street Address"
          value={addressData.address1}
          onPress={() => handleFieldPress('address1')}
        />

        <AddressField
          label="Address 2"
          placeholder="(Optional)"
          value={addressData.address2}
          onPress={() => handleFieldPress('address2')}
        />

        <AddressField
          label="City"
          placeholder="City"
          value={addressData.city}
          onPress={() => handleFieldPress('city')}
        />

        <AddressField
          label="State"
          placeholder="XX"
          value={addressData.state}
          onPress={() => handleFieldPress('state')}
        />

        <AddressField
          label="Zip Code"
          placeholder="XXXXX"
          value={addressData.zipCode}
          onPress={() => handleFieldPress('zipCode')}
        />
      </ScrollView>
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
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
  },
  backButton: {
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
  },
  headerSubtitle: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
    marginTop: hp('0.5%'),
  },
  doneButton: {
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  doneButtonText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(16),
    color: COLORS.Primary,
  },
  content: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  fieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  fieldLabel: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  fieldContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldValue: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    flex: 1,
  },
  placeholder: {
    color: COLORS.NeutralGrey60,
  },
});

export default MissingInfoScreen;