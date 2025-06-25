import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomText } from '../../components/CustomText';
import { CustomIcon } from '../../components/CustomIcon';
import { COLORS, FONT_PACIFICO, SHADOW } from '../../utils/theme';
import PetTypeSelector from './components/PetTypeSelector';
import DatePicker from './components/DatePicker';
import LocationSelector from './components/LocationSelector';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';

const { height } = Dimensions.get('window');

const BoardingScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const methods = useForm({
    defaultValues: {
      petType: '',
      dates: null,
      location: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    
    if (!data.petType || !data.dates || !data.location) {
      console.log('Missing required fields:', {
        petType: !data.petType,
        dates: !data.dates,
        location: !data.location
      });
      return;
    }

    // Convert date to ISO string for serialization
    const serializedData = {
      petType: data.petType.toLowerCase(),
      dates: data.dates.toISOString(),
      location: data.location,
    };

    console.log('Navigating to PetDetails with data:', serializedData);

    // Navigate to PetDetails screen with the serialized data
    navigation.navigate('PetDetails', {
      initialData: serializedData
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <CustomText textType="BodyMediumRegular" color={COLORS.TextPrimary}>Skip</CustomText>
      </View>

      <FormProvider {...methods}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <CustomText 
            textType="H4Regular"
            fontWeight="1200"
            textStyle={styles.title}
            color={COLORS.TextPrimary}
          >
            Boarding
          </CustomText>

          <CustomText textType="BodyLargeSemiBold" textStyle={styles.subtitle} color={COLORS.TextPrimary}>
            When do you need a sitter?
          </CustomText>

          <View style={styles.card}>
            <PetTypeSelector />
            <DatePicker />
            <LocationSelector />
          </View>

          <CustomText textType="SubtitleRegular" textStyle={styles.footerNote} color={COLORS.NeutralGrey60}>
            Add dates and location to see sitters who'll be available for your need.
          </CustomText>
        </ScrollView>

        <View style={styles.footerButtonContainer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={methods.handleSubmit(onSubmit)}
          >
            <CustomText textType="BodyLargeSemiBold" color={COLORS.StaticWhite}>
              Continue
            </CustomText>
          </TouchableOpacity>
        </View>
      </FormProvider>
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
    paddingVertical: hp('2%'),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginBottom: hp('2%'),
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.StaticWhite,
    borderRadius: 12,
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    ...SHADOW.dark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('10%'),
  },
  footerNote: {
    textAlign: 'center',
    marginTop: hp('2%'),
    marginHorizontal: wp('5%'),
  },
  footerButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.StaticWhite,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: COLORS.NeutralGrey10,
  },
  nextButton: {
    backgroundColor: COLORS.Primary,
    borderRadius: 12,
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
});

export default BoardingScreen;
