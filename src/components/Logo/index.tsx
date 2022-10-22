import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import LogoBG from '../../Assets/icon.png';

export default function Logo(props: any) {
  return (
    <View style={[styles.container]}>
      <Image source={LogoBG} style={{height: '100%', width: '100%'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60 * 2,
  },
});
