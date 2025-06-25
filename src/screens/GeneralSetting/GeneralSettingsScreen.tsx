import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomIcon } from '../../components/CustomIcon';
import { CustomText } from '../../components/CustomText';
import CustomRHFTextInput from '../../components/CustomRHFTextInput';
import CustomDropdown from './components/CustomDropdown';
import { COLORS, SHADOW } from '../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { useGeneralSettingsForm } from './hooks/useGeneralSettingsForm';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';

const GeneralSettingsScreen = () => {
  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    isLoading,
    watchedValues,
    isEditingNumber,
    handleUpdateNumber,
    handleSaveNumber,
    handleCancelNumberEdit,
    getTimeZoneLabel,
    getContactPreferenceLabel,
    handleDeleteAccount,
    validationRules,
    timeZones,
    contactPreferences,
    setValue,
  } = useGeneralSettingsForm();

  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.screenContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <CustomIcon
              type="Ionicons"
              icon="arrow-back"
              size={24}
              color={COLORS.TextPrimary}
            />
            </TouchableOpacity>
            <CustomText 
              textType="H6Regular" 
              color={COLORS.TextPrimary} 
              textStyle={styles.headerTitle}
            >
              Settings
            </CustomText>
          </View>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* General Section Title */}
            <CustomText 
              textType="H6SemiBold" 
              color={COLORS.TextPrimary} 
              textStyle={styles.sectionTitle}
            >
              General
            </CustomText>

            {/* Time Zone Section */}
            <View style={styles.fieldSection}>
              <CustomText 
                textType="BodyMediumSemiBold" 
                color={COLORS.TextPrimary} 
                textStyle={styles.fieldLabel}
              >
                Time Zone
              </CustomText>
              <CustomDropdown
                options={timeZones}
                selectedValue={watchedValues.timeZone}
                onValueChange={(value) => setValue('timeZone', value)}
                placeholder="Select a time zone"
                containerStyle={styles.dropdownContainer}
              />
            </View>

            {/* Mobile Number Section */}
            <View style={styles.fieldSection}>
              <CustomText 
                textType="BodyMediumSemiBold" 
                color={COLORS.TextPrimary} 
                textStyle={styles.fieldLabel}
              >
                Your Mobile Number
              </CustomText>
              <CustomText 
                textType="BodyMediumRegular" 
                color={COLORS.BorderPrimary} 
                textStyle={styles.description}
              >
                Which verification number would you like to use for{'\n'}text alerts?
              </CustomText>
              
              <TouchableOpacity onPress={handleUpdateNumber}>
                <CustomText 
                  textType="BodyMediumRegular" 
                  color={COLORS.Primary} 
                  textStyle={styles.updateLink}
                  underline
                >
                  Update Number
                </CustomText>
              </TouchableOpacity>

              {/* Phone Number Input/Display */}
              {isEditingNumber ? (
                <View style={styles.phoneInputContainer}>
                  <CustomRHFTextInput
                    control={control}
                    name="mobileNumber"
                    rules={validationRules.mobileNumber}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    type="outlined"
                    containerStyle={styles.phoneInput}
                    autoCapitalize="none"
                  />
                  <View style={styles.phoneInputActions}>
                    <TouchableOpacity 
                      style={[styles.phoneActionButton, styles.cancelButton]} 
                      onPress={handleCancelNumberEdit}
                    >
                      <CustomText 
                        textType="SubtitleSemiBold" 
                        color={COLORS.NeutralGrey70}
                      >
                        Cancel
                      </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.phoneActionButton, styles.saveNumberButton]} 
                      onPress={() => handleSaveNumber(watchedValues.mobileNumber)}
                    >
                      <CustomText 
                        textType="SubtitleSemiBold" 
                        color={COLORS.StaticWhite}
                      >
                        Save
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.phoneNumberDisplay}>
                  <CustomText 
                    textType="BodyMediumRegular" 
                    color={COLORS.StaticBlack} 
                    textStyle={styles.phoneNumber}
                  >
                    {watchedValues.mobileNumber || '+1 832-616-0981'}
                  </CustomText>
                </View>
              )}
            </View>

            {/* Separator */}
            <View style={styles.separator} />

            {/* Private Number Section */}
            <View style={styles.fieldSection}>
              <CustomText 
                textType="BodyMediumSemiBold" 
                color={COLORS.TextPrimary} 
                textStyle={styles.fieldLabel}
              >
                Private Velvet Leash Co Number
              </CustomText>
              <CustomText 
                textType="BodyMediumRegular" 
                color={COLORS.BorderPrimary} 
                textStyle={styles.privateNumberDescription}
              >
                Velvet number allow you to book services without sharing your real phone number. When would you like to be contacted on your Velvet number?
              </CustomText>
              <CustomDropdown
                options={contactPreferences}
                selectedValue={watchedValues.contactPreference}
                onValueChange={(value) => setValue('contactPreference', value)}
                placeholder="Select contact preference"
                containerStyle={styles.dropdownContainer}
              />
            </View>

            {/* Delete Account Link */}
            <TouchableOpacity style={styles.deleteLinkContainer} onPress={handleDeleteAccount}>
              <CustomText 
                textType="BodyMediumRegular" 
                color={COLORS.Primary} 
                textStyle={styles.deleteLink}
                underline
              >
                Delete or deactivate your account
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Save Button - Fixed at bottom */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.StaticWhite} size="small" />
          ) : (
            <CustomText 
              textType="BodyLargeSemiBold" 
              color={COLORS.StaticWhite} 
              textStyle={styles.saveButtonText}
            >
              Save Settings
            </CustomText>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GeneralSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.StaticWhite,
  },
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.StaticWhite,
    paddingBottom: hp('10%'), 
  },
  header: {
    width: wp('100%'),
    height: hp('8%'), 
    backgroundColor: COLORS.StaticWhite,
    ...SHADOW.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: wp('5%'),
    top: hp('4%'), 
  },
  headerTitle: {
    marginTop: hp('4%'), 
    fontSize: RFValue(18),
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1.5%'), 
    paddingBottom: hp('2%'), 
  },
  sectionTitle: {
    fontSize: RFValue(16), 
    fontWeight: '600',
    marginBottom: hp('1.5%'), 
  },
  fieldSection: {
    marginBottom: hp('2%'),
  },
  fieldLabel: {
    fontSize: RFValue(13),
    fontWeight: '600',
    marginBottom: hp('0.5%'), 
  },
  description: {
    fontSize: RFValue(11), 
    lineHeight: RFValue(14),
    marginBottom: hp('0.5%'), 
    color: COLORS.NeutralGrey60,
  },
  privateNumberDescription: {
    fontSize: RFValue(11), 
    lineHeight: RFValue(14), 
    marginBottom: hp('1%'), 
    color: COLORS.NeutralGrey60,
  },
  updateLink: {
    fontSize: RFValue(11),
    marginBottom: hp('1%'), 
  },
  dropdownContainer: {
    marginBottom: hp('0.5%'),
  },
  phoneNumberDisplay: {
    height: hp('4.5%'), 
    borderWidth: 1.5, 
    borderColor: COLORS.Primary,
    borderRadius: wp('4%'), 
    backgroundColor: COLORS.StaticWhite,
    justifyContent: 'center',
    paddingHorizontal: wp('3%'), 
  },
  phoneNumber: {
    fontSize: RFValue(11), 
  },
  phoneInputContainer: {
    marginTop: hp('1%'),
  },
  phoneInput: {
    borderRadius: wp('4%'),
    borderWidth: 1.5, 
    borderColor: COLORS.Primary,
    paddingHorizontal: wp('3%'), 
    height: hp('4.5%'), 
  },
  phoneInputActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp('2%'),
    marginTop: hp('1%'),
  },
  phoneActionButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('4%'),
    minWidth: wp('20%'),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.NeutralGrey10,
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey40,
  },
  saveNumberButton: {
    backgroundColor: COLORS.Primary,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.NeutralGrey20,
    marginVertical: hp('1.5%'), 
  },
  deleteLinkContainer: {
    marginTop: hp('1.5%'), 
  },
  deleteLink: {
    fontSize: RFValue(11), 
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp('5%'),
    backgroundColor: COLORS.StaticWhite,
    paddingTop: hp('1.5%'), 
    paddingBottom: hp('3%'), 
    ...SHADOW.light, 
  },
  saveButton: {
    width: '100%',
    height: hp('5.5%'),
    backgroundColor: COLORS.Primary,
    borderRadius: wp('6%'), 
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.medium,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.NeutralGrey40,
  },
  saveButtonText: {
    fontSize: RFValue(15), 
    fontWeight: '600',
  },
});