import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TimeZone from 'react-native-timezone';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomIcon } from '../../../components/CustomIcon';
import { CustomText } from '../../../components/CustomText';
import { COLORS } from '../../../utils/theme';

// Comprehensive timezone data with popular zones first
const TIME_ZONES = [
  // Popular US Timezones
  { label: 'Eastern Time (ET)', value: 'America/New_York', region: 'US' },
  { label: 'Central Time (CT)', value: 'America/Chicago', region: 'US' },
  { label: 'Mountain Time (MT)', value: 'America/Denver', region: 'US' },
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles', region: 'US' },
  { label: 'Alaska Time (AKT)', value: 'America/Anchorage', region: 'US' },
  { label: 'Hawaii Time (HT)', value: 'Pacific/Honolulu', region: 'US' },
  { label: 'Arizona Time', value: 'America/Phoenix', region: 'US' },
  
  // Other North American Timezones
  { label: 'Atlantic Time (AT)', value: 'America/Halifax', region: 'CA' },
  { label: 'Newfoundland Time', value: 'America/St_Johns', region: 'CA' },
  { label: 'Mexico Central Time', value: 'America/Mexico_City', region: 'MX' },
  
  // European Timezones
  { label: 'GMT (London)', value: 'Europe/London', region: 'GB' },
  { label: 'Central European Time', value: 'Europe/Berlin', region: 'DE' },
  { label: 'Eastern European Time', value: 'Europe/Bucharest', region: 'RO' },
  
  // Asian Timezones
  { label: 'Japan Standard Time', value: 'Asia/Tokyo', region: 'JP' },
  { label: 'China Standard Time', value: 'Asia/Shanghai', region: 'CN' },
  { label: 'India Standard Time', value: 'Asia/Kolkata', region: 'IN' },
  { label: 'Singapore Time', value: 'Asia/Singapore', region: 'SG' },
  
  // Australian Timezones
  { label: 'Australian Eastern Time', value: 'Australia/Sydney', region: 'AU' },
  { label: 'Australian Central Time', value: 'Australia/Adelaide', region: 'AU' },
  { label: 'Australian Western Time', value: 'Australia/Perth', region: 'AU' },
  
  // UTC Options
  { label: 'UTC', value: 'UTC', region: 'UTC' },
  { label: 'GMT', value: 'GMT', region: 'GMT' },
];

interface TimeZoneSelectorProps {
  selectedTimeZone: string;
  onTimeZoneChange: (timeZone: string) => void;
  label?: string;
  showDetectedZone?: boolean;
  containerStyle?: object;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({
  selectedTimeZone,
  onTimeZoneChange,
  label = "Time Zone",
  showDetectedZone = true,
  containerStyle,
}) => {
  const [detectedTimeZone, setDetectedTimeZone] = useState<string | null>(null);
  const [autoTimeZoneEnabled, setAutoTimeZoneEnabled] = useState<boolean>(false);
  const [telephonyRegion, setTelephonyRegion] = useState<string | null>(null);
  const [localeRegion, setLocaleRegion] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(true);

  useEffect(() => {
    detectUserTimeZone();
  }, []);

  const detectUserTimeZone = async () => {
    try {
      setIsDetecting(true);
      
      // Get timezone information
      const timezone = await TimeZone.getTimeZone();
      const isAutoEnabled = await TimeZone.isAutoTimeZoneEnabled();
      const telRegion = await TimeZone.getRegionByTelephony();
      const locRegion = await TimeZone.getRegionByLocale();

      console.log('Detected timezone:', timezone);
      console.log('Auto timezone enabled:', isAutoEnabled);
      console.log('Telephony region:', telRegion);
      console.log('Locale region:', locRegion);

      setDetectedTimeZone(timezone);
      setAutoTimeZoneEnabled(isAutoEnabled ?? false);
      setTelephonyRegion(telRegion);
      setLocaleRegion(locRegion);

      // Auto-select detected timezone - prioritize exact matches first
      if (timezone) {
        let matchingZone = TIME_ZONES.find(zone => zone.value === timezone);
        
        // If no exact match, try to find by city name or region
        if (!matchingZone) {
          matchingZone = TIME_ZONES.find(zone => {
            const zoneParts = zone.value.split('/');
            const detectedParts = timezone.split('/');
            
            // Match by city (last part of the timezone)
            if (zoneParts.length > 1 && detectedParts.length > 1) {
              return zoneParts[1].toLowerCase() === detectedParts[1].toLowerCase();
            }
            
            return false;
          });
        }
        
        // If still no match, try partial matching
        if (!matchingZone) {
          matchingZone = TIME_ZONES.find(zone => 
            zone.value.includes(timezone) || 
            timezone.includes(zone.value.split('/')[1]) ||
            (timezone.includes('America') && zone.value.includes('America'))
          );
        }
        
        // Auto-select the detected/matched timezone
        if (matchingZone) {
          console.log('Auto-selecting timezone:', matchingZone.value);
          onTimeZoneChange(matchingZone.value);
        } else {
          console.log('No matching timezone found, using detected as fallback');
          // If no match in our predefined list, we could add it dynamically
          // or fallback to a default
          onTimeZoneChange(selectedTimeZone || 'America/Chicago');
        }
      }

    } catch (error) {
      console.warn('Error detecting timezone:', error);
      // Fallback to default timezone
      onTimeZoneChange(selectedTimeZone || 'America/Chicago');
    } finally {
      setIsDetecting(false);
    }
  };

  const getTimeZoneLabel = (value: string): string => {
    const timezone = TIME_ZONES.find(tz => tz.value === value);
    return timezone ? timezone.label : value;
  };

  const getDetectedZoneInfo = () => {
    if (!detectedTimeZone) return null;
    
    // First try to find exact match
    let matchingZone = TIME_ZONES.find(zone => zone.value === detectedTimeZone);
    
    // If no exact match, try to find by city name
    if (!matchingZone) {
      matchingZone = TIME_ZONES.find(zone => {
        const zoneParts = zone.value.split('/');
        const detectedParts = detectedTimeZone.split('/');
        
        if (zoneParts.length > 1 && detectedParts.length > 1) {
          return zoneParts[1].toLowerCase() === detectedParts[1].toLowerCase();
        }
        
        return false;
      });
    }
    
    // If still no match, try partial matching
    if (!matchingZone) {
      matchingZone = TIME_ZONES.find(zone => 
        zone.value.includes(detectedTimeZone) || 
        detectedTimeZone.includes(zone.value.split('/')[1])
      );
    }

    return matchingZone ? matchingZone.label : detectedTimeZone;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText 
        textType="BodyMediumSemiBold" 
        color={COLORS.TextPrimary} 
        textStyle={styles.fieldLabel}
      >
        {label}
      </CustomText>

      {/* Show detected timezone info */}
      {showDetectedZone && !isDetecting && detectedTimeZone && (
        <View style={styles.detectedZoneContainer}>
          <View style={styles.detectedZoneRow}>
            <CustomIcon 
              icon="map-pin" 
              type="Feather" 
              size={RFValue(12)} 
              color={COLORS.Primary} 
            />
            <CustomText 
              textType="BodyMediumRegular" 
              color={COLORS.Primary} 
              textStyle={styles.detectedZoneText}
            >
              Current: {getDetectedZoneInfo()}
              {autoTimeZoneEnabled && ' (Auto)'}
            </CustomText>
          </View>
        </View>
      )}

      {/* Loading indicator while detecting */}
      {isDetecting && (
        <View style={styles.detectingContainer}>
          <CustomText 
            textType="BodyMediumRegular" 
            color={COLORS.NeutralGrey60} 
            textStyle={styles.detectingText}
          >
            Detecting your timezone...
          </CustomText>
        </View>
      )}

      {/* Timezone Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTimeZone}
          onValueChange={onTimeZoneChange}
          style={styles.picker}
        >
          {TIME_ZONES.map((zone, index) => (
            <Picker.Item 
              key={index} 
              label={zone.label} 
              value={zone.value}
            />
          ))}
        </Picker>
        <View style={styles.pickerIconContainer}>
          <CustomIcon 
            icon="chevron-down" 
            type="Feather" 
            size={RFValue(16)} 
            color={COLORS.TextPrimary} 
          />
        </View>
      </View>

      {/* Debug info (optional - can be removed in production) */}
      {__DEV__ && detectedTimeZone && (
        <View style={styles.debugContainer}>
          <CustomText 
            textType="BodyMediumRegular" 
            color={COLORS.NeutralGrey40} 
            textStyle={styles.debugText}
          >
            Debug - Detected: {detectedTimeZone}
            {telephonyRegion && ` | Tel: ${telephonyRegion}`}
            {localeRegion && ` | Locale: ${localeRegion}`}
          </CustomText>
        </View>
      )}
    </View>
  );
};

export default TimeZoneSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
  },
  fieldLabel: {
    fontSize: RFValue(16),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  detectedZoneContainer: {
    marginBottom: hp('0.5%'),
  },
  detectedZoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
  },
  detectedZoneText: {
    fontSize: RFValue(12),
    fontWeight: '500',
  },
  detectingContainer: {
    marginBottom: hp('0.5%'),
  },
  detectingText: {
    fontSize: RFValue(12),
    fontStyle: 'italic',
  },
  pickerContainer: {
    height: hp('6%'),
    borderWidth: 2,
    borderColor: COLORS.Primary,
    borderRadius: wp('8%'),
    backgroundColor: COLORS.StaticWhite,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  picker: {
    height: '100%',
    color: COLORS.StaticBlack,
    backgroundColor: 'transparent',
  },
  pickerIconContainer: {
    position: 'absolute',
    right: wp('4%'),
    top: '50%',
    transform: [{ translateY: -8 }],
    pointerEvents: 'none',
  },
  debugContainer: {
    marginTop: hp('0.5%'),
    padding: wp('2%'),
    backgroundColor: COLORS.NeutralGrey10,
    borderRadius: wp('2%'),
  },
  debugText: {
    fontSize: RFValue(10),
  },
});

// Export timezone utilities
export const TimeZoneUtils = {
  getTimeZoneLabel: (value: string): string => {
    const timezone = TIME_ZONES.find(tz => tz.value === value);
    return timezone ? timezone.label : value;
  },
  
  getAvailableTimeZones: () => TIME_ZONES,
  
  detectUserTimeZone: async () => {
    try {
      const timezone = await TimeZone.getTimeZone();
      const isAutoEnabled = await TimeZone.isAutoTimeZoneEnabled();
      return { timezone, isAutoEnabled };
    } catch (error) {
      console.warn('Error detecting timezone:', error);
      return { timezone: null, isAutoEnabled: false };
    }
  },
};