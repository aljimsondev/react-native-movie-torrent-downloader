import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Logo from '../Logo';
import Searchbar from '../Searchbar';

export default function HomeNavbar(props: any) {
  //Global declaration of colors
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Logo />
      <Searchbar {...props} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
