import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileHeader = () => (
  <View style={styles.container}>
    {/* Cover Image */}
    <Image
      source={require('../assets/cover_image.jpg')}
      style={styles.coverImage}
    />
    {/* Avatar */}
    <View style={styles.avatarWrapper}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
        style={styles.avatar}
      />
    </View>
    {/* Card with details */}
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>America C.</Text>
          <Text style={styles.details}>LOTS of SPACE to ROAM, Large FENCE</Text>
          <Text style={styles.location}>Katy, TX</Text>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.starSitterBadge}>
            <Text style={styles.starSitterText}>Star Sitter</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>from <Text style={styles.priceValue}>$40</Text></Text>
            <Text style={styles.perNight}>per night</Text>
          </View>
        </View>
      </View>
      <View style={styles.reviewRow}>
        <Text style={styles.reviewIcon}>●</Text>
        <Text style={styles.reviewText}>5.0 · 109 reviews</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 2,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  card: {
    marginTop: 32,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    fontFamily: 'System',
  },
  details: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    minWidth: 90,
  },
  starSitterBadge: {
    backgroundColor: '#73865C',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  starSitterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#73865C',
    fontSize: 13,
    fontWeight: '500',
  },
  priceValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#73865C',
  },
  perNight: {
    color: '#888',
    fontSize: 11,
    marginTop: -2,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  reviewIcon: {
    color: '#73865C',
    fontSize: 14,
    marginRight: 4,
  },
  reviewText: {
    color: '#888',
    fontSize: 13,
  },
});

export default ProfileHeader; 