import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBoardingForm } from '../hooks/useBoardingForm';
import { COLORS } from '../../../utils/theme';
import { CustomText } from '../../../components/CustomText';

const DatePicker = () => {
  const { dates, setDates } = useBoardingForm();
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) setDates(selectedDate);
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={() => setShowPicker(true)}>
        <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>
          Dates
        </CustomText>
        <CustomText textType="BodyMediumRegular" color={COLORS.TextPrimary}>
          {dates ? dates.toLocaleDateString() : 'Select your dates'}
        </CustomText>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        <Modal transparent={true} visible={showPicker} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={dates || new Date()}
                mode="date"
                display="spinner"
                onChange={handleChange}
                minimumDate={new Date()}
              />
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.doneButton}>
                <CustomText textType="BodyLargeSemiBold" color={COLORS.TextPrimary}>
                  Done
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        showPicker && (
          <DateTimePicker
            value={dates || new Date()}
            mode="date"
            display="default"
            onChange={handleChange}
            minimumDate={new Date()}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: COLORS.StaticBlack,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  doneButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default DatePicker;
