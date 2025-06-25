import React, { FC, ReactNode, useCallback, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../utils/theme';
import { CustomIcon } from '../CustomIcon';
import { CustomText } from '../CustomText';
import CustomImage from '../CustomImage';
import { IconType } from '../CustomIcon/interface';

interface ICustomTextInput extends TextInputProps {
  label?: string;
  inputContainerStyle?: ViewStyle;
  textStyle?: any;
  error?: any;
  font?: any;
  colorTheme?: any;
  editField?: boolean;
  name?: string;
  textInputRef?: any;
  changeBorderColorOnFocus?: boolean;
  bottomTextInfo?: string;
  title?: string;
  titleTextStyle?: TextStyle | ViewStyle;
  important?: boolean;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  type?: 'standard' | 'outlined';
  leftImage?: string;
  rightImage?: string;
  renderLeftIcon?: ReactNode;
  renderRightIcon?: ReactNode;
}

const CustomTextInput: FC<ICustomTextInput> = props => {
  const {
    inputContainerStyle,
    label,
    placeholder,
    secureTextEntry,
    multiline,
    numberOfLines,
    returnKeyType,
    keyboardType,
    onSubmitEditing,
    blurOnSubmit,
    maxLength,
    textStyle,
    error,
    value,
    onChangeText,
    editField,
    name,
    textInputRef,
    changeBorderColorOnFocus = false,
    bottomTextInfo,
    title,
    titleTextStyle,
    important = false,
    disabled = false,
    autoCapitalize = 'none',
    type = 'standard',
    leftImage,
    rightImage,
    renderLeftIcon,
    renderRightIcon,
  } = props;

  const [hidePassword, setHidePassword] = useState(true);
  const [canEdit, setCanEdit] = useState(editField);
  const [focus, setFocus] = useState(false);
  const canEditRef = React.useRef(canEdit);
  const inputRef = React.useRef<TextInput>(null);

  const onPressEdit = () => {
    setCanEdit(!canEdit);
    canEditRef.current = !canEditRef.current;
    inputRef?.current?.blur();
    if (!canEditRef.current) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 200);
    } else {
      inputRef?.current?.blur();
    }
  };

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  return (
    <View>
      {title && (
        <CustomText
          textType={'SubtitleSemiBold'}
          color={COLORS.NeutralGrey40}
          textStyle={[
            {
              marginBottom: hp(1),
              fontSize: RFValue(11.5),
            },
            titleTextStyle,
          ]}
        >
          {title}
          {important && (
            <CustomText
              textType={'SubtitleSemiBold'}
              color={COLORS.ErrorRed50}
            >
              {' *'}
            </CustomText>
          )}
        </CustomText>
      )}
      <View
        style={[
          inputContainerStyle,
          styles.inputContainer,
          type == 'standard'
            ? {
                backgroundColor: COLORS.NeutralGrey0,
                borderColor: COLORS.NeutralGrey20,
              }
            : {
                backgroundColor: COLORS.NeutralGrey10,
                borderColor: COLORS.NeutralGrey20,
              },
          focus && styles.focus,
          error && {
            borderColor: COLORS.ErrorRed60,
          },
        ]}
      >
        {leftImage ? (
          <CustomImage
            source={leftImage}
            resizeMode="contain"
            containerStyle={styles.leftImageStyle}
          />
        ) : (
          renderLeftIcon
        )}

        <View style={{ flex: 1 }}>
          <TextInput
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry ? hidePassword : false}
            multiline={multiline}
            style={[
              styles.inputText,
              Platform.OS == 'ios'
                ? { fontFamily: 'NunitoSans10pt-Regular' }
                : { fontFamily: 'NunitoSans_10pt-Regular' },
              textStyle,
            ]}
            numberOfLines={numberOfLines}
            focusable={true}
            keyboardType={keyboardType}
            ref={textInputRef || inputRef}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            placeholderTextColor={COLORS.NeutralGrey60}
            maxLength={maxLength}
            editable={!disabled}
            key={name}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </View>
        {rightImage ? (
          <CustomImage
            source={rightImage}
            resizeMode="contain"
            containerStyle={styles.leftImageStyle}
          />
        ) : (
          renderRightIcon
        )}
        {secureTextEntry ? (
          <CustomIcon
            icon={!hidePassword ? 'eye-off-outline' : 'eye-outline'}
            type="Ionicons"
            size={RFValue(18.75)}
            color={error ? COLORS.ErrorRed60 : COLORS.NeutralGrey60}
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
          />
        ) : null}
        {editField ? (
          <CustomIcon
            icon={canEdit ? 'edit' : 'save'}
            type="Feather"
            size={wp(6)}
            onPress={onPressEdit}
            style={styles.eyeIcon}
          />
        ) : null}
      </View>
      {bottomTextInfo ? (
        <CustomText color={COLORS.NeutralGrey60} textStyle={styles.bottomTextInfo}>
          {bottomTextInfo}
        </CustomText>
      ) : null}
      {error ? (
        <View style={styles.errorContainer}>
          <CustomText
            textType={'CaptionRegular'}
            color={COLORS.ErrorRed60}
            textStyle={error && styles.errorText}
          >
            {error || null}
          </CustomText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.NeutralGrey0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    paddingHorizontal: RFValue(12),
    height: RFValue(42),
    borderRadius: RFValue(6),
  },
  inputText: {
    paddingHorizontal: RFValue(10),
    color: COLORS.NeutralGrey100,
    paddingVertical: RFValue(0),
    height: RFValue(42),
    textAlignVertical: 'center',
    fontSize: RFValue(11.678),
  },
  eyeIcon: {
    flexDirection: 'row',
  },
  bottomTextInfo: {
    fontSize: wp(3),
    lineHeight: wp(4.2),
    marginVertical: hp(0.5),
    color: COLORS.NeutralGrey60,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.4),
  },
  errorText: {
    color: COLORS.ErrorRed60,
  },
  focus: {
    borderColor: COLORS.NeutralGrey60,
  },
  leftImageStyle: {
    height: RFValue(18),
    width: RFValue(18),
    marginLeft: RFValue(10),
  },
});

export default CustomTextInput;
