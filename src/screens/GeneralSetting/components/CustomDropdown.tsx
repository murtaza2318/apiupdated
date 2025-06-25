import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomIcon } from '../../../components/CustomIcon';
import { CustomText } from '../../../components/CustomText';
import { COLORS, SHADOW } from '../../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  containerStyle?: any;
  maxHeight?: number;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  containerStyle,
  maxHeight = SCREEN_HEIGHT * 0.4,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<View>(null);

  // Get selected option label
  const getSelectedLabel = () => {
    const selectedOption = options.find(option => option.value === selectedValue);
    return selectedOption ? selectedOption.label : placeholder;
  };

  // Handle dropdown open
  const handleDropdownOpen = () => {
    if (disabled) return;

    dropdownRef.current?.measure((fx, fy, width, height, px, py) => {
      setDropdownPosition({
        top: py + height,
        left: px,
        width: width,
      });
      setIsOpen(true);
    });
  };

  // Handle option select
  const handleOptionSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  // Render dropdown item
  const renderDropdownItem = ({ item, index }: { item: DropdownOption; index: number }) => {
    const isSelected = item.value === selectedValue;
    const isLast = index === options.length - 1;

    return (
      <TouchableOpacity
        style={[
          styles.dropdownItem,
          isSelected && styles.selectedDropdownItem,
          !isLast && styles.dropdownItemBorder,
        ]}
        onPress={() => handleOptionSelect(item.value)}
        activeOpacity={0.7}
      >
        <CustomText
          textType="BodyMediumRegular"
          color={isSelected ? COLORS.Primary : COLORS.StaticBlack}
          textStyle={[
            styles.dropdownItemText,
            isSelected && styles.selectedDropdownItemText,
          ]}
        >
          {item.label}
        </CustomText>
        {isSelected && (
          <CustomIcon
            icon="checkmark"
            type="Ionicons"
            size={RFValue(16)}
            color={COLORS.Primary}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Dropdown Trigger */}
      <TouchableOpacity
        ref={dropdownRef}
        style={[
          styles.dropdownTrigger,
          disabled && styles.dropdownTriggerDisabled,
        ]}
        onPress={handleDropdownOpen}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <CustomText
          textType="BodyMediumRegular"
          color={selectedValue ? COLORS.StaticBlack : COLORS.NeutralGrey60}
          textStyle={styles.triggerText}
          numberOfLines={1}
        >
          {getSelectedLabel()}
        </CustomText>
        <CustomIcon
          icon={isOpen ? "chevron-up" : "chevron-down"}
          type="Ionicons"
          size={RFValue(16)}
          color={disabled ? COLORS.NeutralGrey40 : COLORS.NeutralGrey60}
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.dropdownList,
              {
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                maxHeight: maxHeight,
              },
            ]}
          >
            <FlatList
              data={options}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={styles.flatList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownTrigger: {
    height: hp('4.5%'),
    borderWidth: 1.5,
    borderColor: COLORS.Primary,
    borderRadius: wp('4%'),
    backgroundColor: COLORS.StaticWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    ...SHADOW.light,
  },
  dropdownTriggerDisabled: {
    backgroundColor: COLORS.NeutralGrey10,
    borderColor: COLORS.NeutralGrey40,
  },
  triggerText: {
    flex: 1,
    fontSize: RFValue(11),
    marginRight: wp('2%'),
    textAlignVertical: 'center',
    lineHeight: RFValue(14),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownList: {
    position: 'absolute',
    backgroundColor: COLORS.StaticWhite,
    borderRadius: wp('2%'),
    ...SHADOW.medium,
    elevation: 8,
    marginTop: hp('0.5%'),
  },
  flatList: {
    borderRadius: wp('2%'),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    minHeight: hp('5%'),
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NeutralGrey20,
  },
  selectedDropdownItem: {
    backgroundColor: COLORS.Primary + '10', // 10% opacity
  },
  dropdownItemText: {
    flex: 1,
    fontSize: RFValue(11),
  },
  selectedDropdownItemText: {
    fontWeight: '600',
  },
});

export default CustomDropdown;