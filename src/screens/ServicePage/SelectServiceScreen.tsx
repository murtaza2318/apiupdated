import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { COLORS, SHADOW } from '../../utils/theme';
import { CustomIcon } from '../../components/CustomIcon';
import { CustomText } from '../../components/CustomText';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SelectServiceScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();

  const services = [
    {
      id: '1',
      name: 'Boarding',
      description: "in the sitter's home",
      icon: require('../../../assets/icons/drop_in_visits.png'),
      screen: 'Boarding',
    },
    {
      id: '2',
      name: 'House Sitting',
      description: 'in your home',
      icon: require('../../../assets/icons/house_sitting.png'),
    },
    {
      id: '3',
      name: 'Drop-in Visits',
      description: 'visits in your home',
      icon: require('../../../assets/icons/dog_walking.png'),
    },
    {
      id: '4',
      name: 'Doggy Day Care',
      description: "in the sitter's home",
      icon: require('../../../assets/icons/Sun.png'),
    },
    {
      id: '5',
      name: 'Dog Walking',
      description: 'in your neighborhood',
      icon: require('../../../assets/icons/doggy_day_care.png'),
    },
  ];

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <CustomText textType="BodyMediumRegular" color={COLORS.TextPrimary}>
            Cancel
          </CustomText>
        </TouchableOpacity>

        <CustomText textType="H5SemiBold" color={COLORS.TextPrimary} textStyle={styles.headerTitle}>
          Select a Service
        </CustomText>

        <ScrollView
          contentContainerStyle={[styles.servicesContainer, { paddingBottom: hp('45%') }]}
          showsVerticalScrollIndicator={false}
        >
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate(service.screen as keyof AuthStackNavigationType)}
              activeOpacity={0.8}
            >
              <Image source={service.icon} style={styles.serviceIcon} />
              <View>
                <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>
                  {service.name}
                </CustomText>
                <CustomText textType="CaptionRegular" color={COLORS.TextPrimary}>
                  {service.description}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <Image
        source={require('../../../assets/icons/boarding.png')}
        style={styles.heroimage}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconWrapper}>
            <CustomIcon icon="search" type="FontAwesome" iconStyle={styles.navIcon} />
          </View>
          <CustomText textType="BodyMediumRegular" color={COLORS.TextPrimary}>
            Services
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("More")}
        >
          <View style={styles.navIconWrapper}>
            <CustomIcon icon="ellipsis-h" type="FontAwesome" iconStyle={styles.navIcon} />
          </View>
          <CustomText textType="BodyMediumRegular" color={COLORS.TextPrimary}>
            More
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('10%'),
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: hp('3%'),
    marginTop: hp('2%'),
  },
  servicesContainer: {
    paddingHorizontal: wp('5%'),
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.StaticWhite,
    borderRadius: wp('2.5%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    ...SHADOW.medium,
  },
  serviceIcon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
    marginRight: wp('4%'),
  },
  cancelButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp('7%') : hp('5%'),
    left: wp('5%'),
    zIndex: 2,
  },
  heroimage: {
    position: 'absolute',
    bottom: hp('1%'), // Just above bottom nav
    width: wp('100%'),
    height: hp('50%'),
    resizeMode: 'contain',
    zIndex: -1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.StaticWhite,
    paddingVertical: hp('1.5%'),
    backgroundColor: COLORS.StaticWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    padding: wp('5%'),
    alignItems: 'center',
  },
  navIconWrapper: {
    marginBottom: hp('0.5%'),
  },
  navIcon: {
    fontSize: wp('6%'),
    color: COLORS.TextPrimary,
  },
});

export default SelectServiceScreen;
