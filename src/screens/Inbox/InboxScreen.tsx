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

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTabButton]}
    onPress={onPress}
  >
    <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

interface MessageItemProps {
  name: string;
  time: string;
  lastMessage: string;
  serviceDetails: string;
  status: string;
  actionText?: string;
  onPress: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  name,
  time,
  lastMessage,
  serviceDetails,
  status,
  actionText,
  onPress,
}) => (
  <TouchableOpacity style={styles.messageItem} onPress={onPress}>
    <View style={styles.messageHeader}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageTopRow}>
          <Text style={styles.senderName}>{name}</Text>
          <Text style={styles.messageTime}>{time}</Text>
        </View>
        
        <Text style={styles.lastMessage}>
          <Text style={styles.youLabel}>You: </Text>
          {lastMessage}
        </Text>
        
        <Text style={styles.serviceDetails}>{serviceDetails}</Text>
        <Text style={styles.status}>{status}</Text>
        
        {actionText && (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{actionText}</Text>
            <CustomIcon
              icon="arrow-right"
              type="Feather"
              size={RFValue(16)}
              color="#8F9E73"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const InboxScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Primary');

  const handleMessagePress = () => {
    // Navigate to message detail
    console.log('Navigate to message detail');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <CustomIcon
            icon="bell"
            type="Feather"
            size={RFValue(20)}
            color={COLORS.TextPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TabButton
          title="Primary"
          isActive={activeTab === 'Primary'}
          onPress={() => setActiveTab('Primary')}
        />
        <TabButton
          title="Unread"
          isActive={activeTab === 'Unread'}
          onPress={() => setActiveTab('Unread')}
        />
        <TabButton
          title="pending"
          isActive={activeTab === 'pending'}
          onPress={() => setActiveTab('pending')}
        />
      </View>

      {/* Sort Option */}
      <View style={styles.sortContainer}>
        <CustomIcon
          icon="arrow-down"
          type="Feather"
          size={RFValue(16)}
          color={COLORS.TextPrimary}
        />
        <Text style={styles.sortText}>Sorted by recent activity</Text>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesList} showsVerticalScrollIndicator={false}>
        <MessageItem
          name="Christy S."
          time="5:29 PM"
          lastMessage="Right"
          serviceDetails="House Sitting • Jun 16 to Jun 20"
          status="Request sent"
          actionText="Complete your Pet's profile"
          onPress={handleMessagePress}
        />
      </ScrollView>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navItem}>
          <CustomIcon
            icon="inbox"
            type="Feather"
            size={RFValue(20)}
            color="#8F9E73"
          />
          <Text style={[styles.navText, styles.activeNavText]}>Inbox</Text>
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
            color={COLORS.NeutralGrey60}
          />
          <Text style={styles.navText}>Your Pet</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  headerTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(24),
    color: COLORS.TextPrimary,
  },
  notificationButton: {
    padding: wp('2%'),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  tabButton: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1%'),
    borderRadius: RFValue(20),
    marginRight: wp('3%'),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey40,
  },
  activeTabButton: {
    backgroundColor: '#8F9E73',
    borderColor: '#8F9E73',
  },
  tabButtonText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
  },
  activeTabButtonText: {
    color: COLORS.StaticWhite,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  sortText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginLeft: wp('2%'),
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
  },
  messageHeader: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: wp('3%'),
  },
  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: COLORS.NeutralGrey20,
  },
  messageContent: {
    flex: 1,
  },
  messageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  senderName: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
  },
  messageTime: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
  },
  lastMessage: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  youLabel: {
    fontWeight: '600',
  },
  serviceDetails: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  status: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: '#8F9E73',
    marginBottom: hp('1%'),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: RFValue(8),
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(14),
    color: '#8F9E73',
    marginRight: wp('2%'),
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

export default InboxScreen;