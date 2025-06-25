import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CustomIcon } from '../../components/CustomIcon';
import { CustomText } from '../../components/CustomText';
import { CustomSwitch } from '../../components/CustomSwitch';
import { Separator } from '../../components/Separator';
import { COLORS, SHADOW } from '../../utils/theme';

// Define notification settings data for better organization and mapping
const emailSettings = [
  {
    id: 'email-notifications',
    title: 'Send me an email when I get a new message or request',
    description: 'Send me an email when I get a new message\nor request',
  },
  {
    id: 'marketing-emails',
    title: 'Receive marketing emails from Velvet Leash Co.',
    description: 'Receive marketing emails from Velvet Leash Co.',
  },
];

const smsSettings = [
  {
    id: 'sms-general',
    title: 'Text/SMS Notifications',
    description:
      'We recommend keeping these messages on so we\ncan provide you the best service.',
  },
  {
    id: 'sms-messages',
    title: 'Message Notifications',
    description: 'Send me a text message when I get a new\nmessage or request.',
  },
  {
    id: 'new-inquiries',
    title: 'New Inquiries',
    description: 'Text me when I receive a new message or request.',
  },
  {
    id: 'new-messages',
    title: 'New Messages',
    description:
      'Text me all my Velvet Leash Co messages after the\ninitial request.',
  },
  {
    id: 'booking-request',
    title: 'New Booking Request',
    description: 'Text me when I have a new Velvet Leash Co\nbooking request.',
  },
  {
    id: 'booking-declined',
    title: 'Booking Declined',
    description: 'Text me when a new Velvet Leash Co is confirmed.',
  },
  {
    id: 'mms-support',
    title: 'MMS Message Support',
    description:
      'By enabling MMS support, text message can\ninclude sound, images, and video.',
  },
  {
    id: 'quiet-hours',
    title: 'Quiet Hours',
    description:
      'Would you like to delay delivery of nighttime\ntext messages until the following morning?',
  },
  {
    id: 'marketing-sms',
    title: 'Marketing Messages',
    description: 'Receive marketing text message from Velvet\nLeash Co.',
  },
];

export const Notifications: React.FC = () => {
  // State to manage switch values
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});

  const handleSwitchChange = (id: string, value: boolean) => {
    setSwitchStates(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const renderSettingItem = (
    setting: typeof emailSettings[0] | typeof smsSettings[0],
    index: number,
    isLast: boolean,
    isMarketingSms: boolean = false
  ) => (
    <View key={setting.id}>
      {setting.title !== 'Text/SMS Notifications' &&
        setting.title !== 'Message Notifications' &&
        setting.title !== 'Marketing Messages' && (
          <CustomText
            textType="CaptionSemiBold"
            color={COLORS.TextPrimary}
            textStyle={styles.settingTitle}>
            {setting.title}
          </CustomText>
        )}
      <View style={styles.settingRow}>
        <CustomText
          textType="CaptionRegular"
          color={isMarketingSms ? COLORS.TextPrimary : COLORS.BorderPrimary}
          textStyle={styles.settingDescription}>
          {setting.description}
        </CustomText>
        <CustomSwitch
          value={switchStates[setting.id] || false}
          onValueChange={(value) => handleSwitchChange(setting.id, value)}
        />
      </View>
      {!isLast && <Separator style={styles.separator} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.StaticWhite} />
      
      {/* Header */}
      <View style={[styles.header, SHADOW.light]}>
        <View style={styles.headerContent}>
          <CustomIcon
            icon="arrow-left"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.TextPrimary}
            onPress={() => console.log('Back pressed')}
          />
          <CustomText
            textType="BodyMediumRegular"
            color={COLORS.TextPrimary}
            textStyle={styles.headerTitle}>
            Settings
          </CustomText>
          <View style={{ width: RFValue(20) }} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <CustomText
            textType="H5SemiBold"
            color={COLORS.TextPrimary}
            textStyle={styles.mainTitle}>
            Notifications
          </CustomText>

          {/* Email Section */}
          <View style={styles.section}>
            <CustomText
              textType="CaptionSemiBold"
              color={COLORS.TextPrimary}
              textStyle={styles.sectionTitle}>
              Email
            </CustomText>

            <View style={styles.settingsContainer}>
              {emailSettings.map((setting, index) =>
                renderSettingItem(setting, index, index === emailSettings.length - 1)
              )}
            </View>
          </View>

          {/* Text/SMS Section */}
          <View style={styles.section}>
            <CustomText
              textType="CaptionSemiBold"
              color={COLORS.TextPrimary}
              textStyle={styles.sectionTitle}>
              Text/SMS
            </CustomText>

            <View style={styles.settingsContainer}>
              {smsSettings.map((setting, index) =>
                renderSettingItem(
                  setting,
                  index,
                  index === smsSettings.length - 1,
                  setting.id === 'marketing-sms'
                )
              )}
            </View>
          </View>

          {/* Legal Text */}
          <View style={styles.legalContainer}>
            <CustomText
              textType="CaptionRegular"
              color={COLORS.BorderPrimary}
              textStyle={styles.legalText}>
              By enabling mobile notifications, you're saying it's okay for us to send you service-related and promotional text messages, include auto-dialed. you can adjust these settings on this page anytime. receiving promotional messages is not a condition to use th Velvet Leash Co Service. reply HELP for help and STOP to Unsubscribe. Message frequency varies. Message and date rates may apply. For more, see our{' '}
              <CustomText
                textType="CaptionRegular"
                color={COLORS.Primary}
                textStyle={styles.linkText}>
                Terms of service
              </CustomText>{' '}
              and{' '}
              <CustomText
                textType="CaptionRegular"
                color={COLORS.Primary}
                textStyle={styles.linkText}>
                Privacy Statement.
              </CustomText>
            </CustomText>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.indicator} />
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
    backgroundColor: COLORS.StaticWhite,
    paddingVertical: hp(2),
    borderBottomWidth: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: RFValue(16),
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(10),
  },
  mainTitle: {
    marginBottom: hp(3),
    fontSize: RFValue(20),
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    marginBottom: hp(1.5),
    fontSize: RFValue(12),
  },
  settingsContainer: {
    backgroundColor: COLORS.StaticWhite,
  },
  settingTitle: {
    marginBottom: hp(0.5),
    fontSize: RFValue(10),
    lineHeight: RFValue(12.8),
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },
  settingDescription: {
    flex: 1,
    marginRight: wp(4),
    fontSize: RFValue(10),
    lineHeight: RFValue(12.8),
  },
  separator: {
    marginVertical: hp(1),
  },
  legalContainer: {
    marginTop: hp(2),
  },
  legalText: {
    fontSize: RFValue(10),
    lineHeight: RFValue(12.8),
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: hp(2),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicator: {
    width: wp(35),
    height: RFValue(4),
    backgroundColor: COLORS.BorderPrimary,
    borderRadius: RFValue(15),
  },
});