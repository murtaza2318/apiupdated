import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from './ToggleSwitch';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Setting {
  id: string;
  title: string;
  description: string;
}

interface NotificationSectionProps {
  sectionTitle: string;
  settingsList: Setting[];
  toggles: Record<string, boolean>;
  onToggle: (id: string) => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({ sectionTitle, settingsList, toggles, onToggle }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {settingsList.map((setting, index) => (
        <View key={setting.id}>
          {setting.title !== "Text/SMS Notifications" &&
            setting.title !== "Message Notifications" &&
            setting.title !== "Marketing Messages" && (
              <Text style={styles.settingTitle}>{setting.title}</Text>
            )}
          <View style={styles.settingRow}>
            <Text style={[styles.settingDescription, setting.id === "marketing-sms" && styles.marketingText]}>
              {setting.description}
            </Text>
            <ToggleSwitch
              value={toggles[setting.id]}
              onValueChange={() => onToggle(setting.id)}
            />
          </View>
          {index < settingsList.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('3.5%'),
    color: '#404348',
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginBottom: hp('1.5%'),
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
    backgroundColor: '#fff',
  },
  settingTitle: {
    fontSize: wp('3%'),
    color: '#404348',
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginBottom: hp('0.5%'),
  },
  settingDescription: {
    fontSize: wp('3%'),
    color: '#a9a59f',
    fontFamily: 'Poppins',
    fontWeight: '500',
    flex: 1,
    marginRight: wp('4%'),
    backgroundColor: '#fff',
  },
  marketingText: {
    color: '#404348',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: hp('1%'),
  },
});

export default NotificationSection; 