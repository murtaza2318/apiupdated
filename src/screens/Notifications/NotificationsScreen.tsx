import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NotificationSection from './components/NotificationSection';
import { useNotificationSettings } from './hooks/useNotificationSettings';

// Define notification settings data
const emailSettings = [
  { 
    id: "email-notifications",
    title: "Send me an email when I get a new message or request",
    description: "Send me an email when I get a new message or request",
  },
  {
    id: "marketing-emails",
    title: "Receive marketing emails from Velvet Leash Co.",
    description: "Receive marketing emails from Velvet Leash Co.",
  },
];

const smsSettings = [
  {
    id: "sms-general",
    title: "Text/SMS Notifications",
    description: "We recommend keeping these messages on so we can provide you the best service.",
  },
  {
    id: "sms-messages",
    title: "Message Notifications",
    description: "Send me a text message when I get a new message or request.",
  },
  {
    id: "new-inquiries",
    title: "New Inquiries",
    description: "Text me when I receive a new message or request.",
  },
  {
    id: "new-messages",
    title: "New Messages",
    description: "Text me all my Velvet Leash Co messages after the initial request.",
  },
  {
    id: "booking-request",
    title: "New Booking Request",
    description: "Text me when I have a new Velvet Leash Co booking request.",
  },
  {
    id: "booking-declined",
    title: "Booking Declined",
    description: "Text me when a new Velvet Leash Co is confirmed.",
  },
  {
    id: "mms-support",
    title: "MMS Message Support",
    description: "By enabling MMS support, text message can include sound, images, and video.",
  },
  {
    id: "quiet-hours",
    title: "Quiet Hours",
    description: "Would you like to delay delivery of nighttime text messages until the following morning?",
  },
  {
    id: "marketing-sms",
    title: "Marketing Messages",
    description: "Receive marketing text message from Velvet Leash Co.",
  },
];

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const {
    emailToggles,
    smsToggles,
    handleEmailToggle,
    handleSmsToggle,
    emailSettingsList,
    smsSettingsList,
  } = useNotificationSettings();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={wp('6%')} color="#404348" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: wp('6%') }} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: hp('15%'), backgroundColor: '#fff' }}>
          {/* Title */}
          <Text style={styles.title}>Notifications</Text>

          {/* Email Section */}
          <NotificationSection
            sectionTitle="Email"
            settingsList={emailSettingsList}
            toggles={emailToggles}
            onToggle={handleEmailToggle}
          />

          {/* Text/SMS Section */}
          <NotificationSection
            sectionTitle="Text/SMS"
            settingsList={smsSettingsList}
            toggles={smsToggles}
            onToggle={handleSmsToggle}
          />

          {/* Legal Text */}
          <Text style={styles.legalText}>
            By enabling mobile notifications, you're saying it's okay for us to send you service-related and promotional text messages, include auto-dialed. you can adjust these settings on this page anytime. receiving promotional messages is not a condition to use th Velvet Leash Co Service. reply HELP for help and STOP to Unsubscribe. Message frequency varies. Message and date rates may apply. For more, see our{' '}
            <Text style={styles.link}>Terms of service</Text> and{' '}
            <Text style={styles.link}>Privacy Statement.</Text>
          </Text>
        </ScrollView>

        {/* Save Settings Button */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'android' ? hp('4%') : hp('3%'),
    paddingBottom: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    color: '#404348',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: wp('5.5%'),
    color: '#404348',
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginBottom: hp('3%'),
  },
  legalText: {
    fontSize: wp('2.8%'),
    color: '#a9a59f',
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: hp('2.2%'),
    marginTop: hp('2%'),
  },
  link: {
    color: '#8f9e73',
    textDecorationLine: 'underline',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: hp('3%'),
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  saveButton: {
    width: '90%',
    backgroundColor: '#8f9e73',
    borderRadius: wp('6%'),
    paddingVertical: hp('2.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
  },
});

export default NotificationsScreen; 