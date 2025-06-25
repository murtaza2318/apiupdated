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

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    {children}
  </View>
);

const PaymentHistoryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Earning');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleApplyPromoCode = () => {
    console.log('Apply promo code');
  };

  const handleAddPaymentMethod = () => {
    console.log('Add payment method');
  };

  const handleMoreInfo = () => {
    console.log('More info');
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
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Wallet Section */}
        <View style={styles.walletSection}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>Wallet</Text>
            <Text style={styles.walletAmount}>$0.00</Text>
          </View>
          <TouchableOpacity style={styles.promoLink} onPress={handleApplyPromoCode}>
            <Text style={styles.promoLinkText}>Apply Promo Code</Text>
          </TouchableOpacity>
        </View>

        {/* Add Payment Method Button */}
        <TouchableOpacity style={styles.addPaymentButton} onPress={handleAddPaymentMethod}>
          <Text style={styles.addPaymentButtonText}>Add or Modify a Payment Method</Text>
        </TouchableOpacity>

        {/* Earning Summary Section */}
        <Section
          title="Earning Summary"
          subtitle="you haven't made any withdrawals yet"
        >
          <TouchableOpacity style={styles.moreInfoLink} onPress={handleMoreInfo}>
            <Text style={styles.moreInfoText}>More info.....</Text>
          </TouchableOpacity>
        </Section>

        {/* External Withdrawal History Section */}
        <Section
          title="External Withdrawal History"
          subtitle="you haven't made any External Withdrawal yet"
        >
          <TouchableOpacity style={styles.moreInfoLink} onPress={handleMoreInfo}>
            <Text style={styles.moreInfoText}>More info.....</Text>
          </TouchableOpacity>
        </Section>

        {/* Documents Section */}
        <Section title="Documents" subtitle="No documents available">
          <View />
        </Section>

        {/* Payment History Tabs */}
        <View style={styles.tabsSection}>
          <Text style={styles.paymentHistoryTitle}>Payment History</Text>
          
          <View style={styles.tabContainer}>
            <TabButton
              title="Earning"
              isActive={activeTab === 'Earning'}
              onPress={() => setActiveTab('Earning')}
            />
            <TabButton
              title="Pending Earnings"
              isActive={activeTab === 'Pending Earnings'}
              onPress={() => setActiveTab('Pending Earnings')}
            />
            <TabButton
              title="Withdrawals"
              isActive={activeTab === 'Withdrawals'}
              onPress={() => setActiveTab('Withdrawals')}
            />
            <TabButton
              title="Payment"
              isActive={activeTab === 'Payment'}
              onPress={() => setActiveTab('Payment')}
            />
            <TabButton
              title="Payment issues"
              isActive={activeTab === 'Payment issues'}
              onPress={() => setActiveTab('Payment issues')}
            />
            <TabButton
              title="Other"
              isActive={activeTab === 'Other'}
              onPress={() => setActiveTab('Other')}
            />
          </View>

          {/* No Transaction Message */}
          <View style={styles.noTransactionContainer}>
            <Text style={styles.noTransactionText}>No transaction found</Text>
          </View>
        </View>
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
  headerTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
  },
  headerSpacer: {
    width: wp('10%'),
  },
  content: {
    flex: 1,
  },
  walletSection: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  walletTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
  },
  walletAmount: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
  },
  promoLink: {
    alignSelf: 'flex-start',
  },
  promoLinkText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: '#8F9E73',
    textDecorationLine: 'underline',
  },
  addPaymentButton: {
    backgroundColor: COLORS.StaticWhite,
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey40,
    borderRadius: RFValue(25),
    paddingVertical: hp('2%'),
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  addPaymentButtonText: {
    fontFamily: FONT_POPPINS.mediumFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
  },
  section: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
  },
  sectionTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginBottom: hp('0.5%'),
  },
  sectionSubtitle: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.NeutralGrey60,
    marginBottom: hp('1%'),
  },
  moreInfoLink: {
    alignSelf: 'flex-start',
  },
  moreInfoText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: '#8F9E73',
    textDecorationLine: 'underline',
  },
  tabsSection: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  paymentHistoryTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(18),
    color: COLORS.TextPrimary,
    marginBottom: hp('2%'),
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('3%'),
  },
  tabButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: RFValue(15),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey40,
  },
  activeTabButton: {
    backgroundColor: '#8F9E73',
    borderColor: '#8F9E73',
  },
  tabButtonText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12),
    color: COLORS.NeutralGrey60,
  },
  activeTabButtonText: {
    color: COLORS.StaticWhite,
  },
  noTransactionContainer: {
    borderWidth: 2,
    borderColor: COLORS.NeutralGrey20,
    borderStyle: 'dashed',
    borderRadius: RFValue(8),
    paddingVertical: hp('4%'),
    alignItems: 'center',
  },
  noTransactionText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(16),
    color: COLORS.NeutralGrey60,
  },
});

export default PaymentHistoryScreen;