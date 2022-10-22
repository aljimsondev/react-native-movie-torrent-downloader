import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, Animated, View, Easing} from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   interpolate,
//   useSharedValue,
// } from 'react-native-reanimated';
import LoadingImage from '../Assets/loading.png';

export default function SplashScreen(props: any) {
  const {colors} = useTheme();
  // const rotation = useSharedValue(0);
  // const rotate = interpolate(rotation.value, [0, 1], ['0deg,360deg'], 'clamp');
  const rotation = React.useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
    extrapolate: 'clamp',
  });
  //loading of data goes here
  const animate = () => {
    rotation.setValue(0);
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };
  React.useEffect(() => {
    animate();

    const timeout = setTimeout(() => {
      //fetching settings goes here
      return props.navigation.navigate('HomeScreen');
    }, 2000);

    return () => {
      //cleanup
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          width: 200,
          transform: [{rotate}],
        }}>
        <Image source={LoadingImage} style={styles.logo} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    maxHeight: 112,
    maxWidth: 127,
  },
});
