import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import TurboImage from 'react-native-turbo-image';
import { CustomImageProps } from './interface';

const CustomImage: React.FC<CustomImageProps> = ({
  editable,
  id,
  source,
  height,
  width,
  onPressImage,
  containerStyle,
  disabled,
  resizeMode = 'cover',
  style,
  tintColor,
  thumbnail,
  borderRadius,
}) => {
  return (
    <View>
      <Pressable
        disabled={typeof onPressImage !== 'function' || disabled}
        onPress={() =>
          typeof onPressImage === 'function' ? onPressImage(id) : {}
        }
        style={[
          {
            height: height,
            width: width,
            borderRadius,
          } as any,
          styles.container,
          containerStyle,
        ]}>
        {source?.uri ? (
          <TurboImage
            source={{
              ...source,
            }}
            style={[styles.image, style]}
            resizeMode={resizeMode}
            placeholder={{
              thumbhash: thumbnail || 'ZxgGFQS9ic9I+SUrZ5k4WDQweABE',
            }}
            // onLoadEnd={() => setIsLoading(false)}
          />
        ) : (
          <Image
            source={source}
            style={{...styles.image, ...style}}
            resizeMode={resizeMode || 'contain'}
            tintColor={tintColor}
          />
        )}
      </Pressable>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },

  image: {height: '100%', width: '100%'},
});
