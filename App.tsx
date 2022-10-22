import React from 'react';
import {StyleSheet, View, StatusBar, useColorScheme} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainScreen from './src/routes/routes';
import GlobalContext from './src/lib/Store';
import {useTheme} from '@react-navigation/native';

export default function App(props: any) {
  const {} = props;
  const scheme = useColorScheme();
  //=========System navigation Bar color Styling============
  SystemNavigationBar.setNavigationColor(
    scheme === 'dark' ? '#48404A' : '#ffffff',
  );
  return (
    <GlobalContext>
      <View style={styles.container}>
        <StatusBar
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={scheme === 'dark' ? '#302832' : '#ffffff'}
        />
        <MainScreen />
      </View>
    </GlobalContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
