import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Button from '../Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';

interface PropsTypes {
  navigation: any;
  title?: string | undefined;
  leftSideBar?: Element;
  mode: 'default' | 'stack';
  style?: any;
}

/**
 *
 * @param {string} title - Title of the navbar
 * @param {function} leftSideBar - function that return React Component next to the title component
 *
 * ```
 * javascript
 * leftSideBar:()=>{
 * }
 * ```
 * @returns Navbar component
 */

export default function Navbar(props: PropsTypes) {
  const {colors} = useTheme();
  const {navigation, title, leftSideBar, mode, style} = props;
  //adjust font size when title is longer
  const titleLength = title ? title.length : 20;
  return (
    <Animated.View
      style={[styles.container, {backgroundColor: colors.primary}, style]}>
      {mode === 'default' ? null : (
        <Button
          icon={<AntDesign name="arrowleft" size={25} color={colors.text} />}
          onPressButton={() => navigation.goBack()}
        />
      )}
      <Text
        style={[
          styles.title,
          {fontSize: titleLength > 30 ? 16 : 20, color: colors.text},
        ]}>
        {title}
      </Text>
      {leftSideBar}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    maxWidth: '70%',
    marginLeft: 10,
  },
});
