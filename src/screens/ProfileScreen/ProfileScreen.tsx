import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import HomeDetails from './components/HomeDetails';
import LocationMap from './components/LocationMap';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('Info'); // 'Info', 'Reviews', 'Services'

  return (
    <View style={styles.screenBg}>
      {/* Top header like Boarding/Searching screens */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowBtn}>
          <Text style={styles.headerArrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SelectService')} style={styles.arrowBtn}>
          <Text style={styles.headerArrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollCardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <ProfileHeader />
          {/* Tabs */}
          <View style={styles.tabBar}>
            {['Info', 'Reviews', 'Services'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'Info' && (
              <View>
                <View style={styles.starSitterInfoSection}>
                  <Text style={styles.starSitterInfoTitle}>America C. has Star Sitter status</Text>
                  <Text style={styles.starSitterInfoDescription}>
                    The Star Sitter program highlights responsive sitters who making it easier for pet parents to find the best care for their pets.
                  </Text>
                </View>
                <AboutSection />
                <SkillsSection />
                <HomeDetails />
                {/* Location section at the bottom */}
                <LocationMap />
                {/* Contact button below map */}
                <View style={styles.contactBtnWrapper}>
                  <TouchableOpacity style={styles.contactBtn}>
                    <Text style={styles.contactBtnText}>Contact this sitter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {activeTab === 'Reviews' && (
              <View style={styles.sectionPlaceholder}>
                <Text>Reviews content goes here...</Text>
              </View>
            )}
            {activeTab === 'Services' && (
              <View style={styles.sectionPlaceholder}>
                <Text>Services content goes here...</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenBg: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 0,
  },
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 36,
    paddingBottom: 12,
    backgroundColor: '#fff',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 0,
    shadowColor: 'transparent',
  },
  arrowBtn: {
    padding: 4,
  },
  headerArrow: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  scrollCardContent: {
    paddingBottom: 24,
    width: '100%',
    alignItems: 'center',
    minHeight: SCREEN_HEIGHT - 60,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
    marginTop: 0,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#73865C',
    backgroundColor: '#F7F8F9',
  },
  tabText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#222',
    fontWeight: 'bold',
  },
  tabContent: {
    backgroundColor: '#fff',
    minHeight: 120,
    width: '100%',
  },
  sectionPlaceholder: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starSitterInfoSection: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  starSitterInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  starSitterInfoDescription: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },
  contactBtnWrapper: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 32,
  },
  contactBtn: {
    backgroundColor: '#A6B48A',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 0,
  },
  contactBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 