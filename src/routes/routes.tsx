import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screen component imports
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';
import MoviePreview from '../screens/MoviePreview';
import SearchHistory from '../screens/SearchHistory';
import SearchResults from '../screens/SearchResults';
//theme
import {CustomTheme, LightTheme} from '../Theme';
import Torrents from '../screens/Torrents';

//constant declaration
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Return all Stack Screen
 */
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            //identfying if screen is focused or not
            return (
              <MaterialCommunityIcons
                name="movie"
                color={
                  focused
                    ? useTheme().colors.notification
                    : useTheme().colors.text
                }
                size={22}
              />
            );
          } else if (route.name === 'Favorites') {
            return (
              <AntDesign
                name={focused ? 'heart' : 'hearto'}
                color={
                  focused
                    ? useTheme().colors.notification
                    : useTheme().colors.text
                }
                size={22}
              />
            );
          } else if (route.name === 'Settings') {
            return (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                color={
                  focused
                    ? useTheme().colors.notification
                    : useTheme().colors.text
                }
                size={22}
              />
            );
          }
        },
        tabBarActiveTintColor: useTheme().colors.notification,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
/**
 * Route management goes here
 */
export default function MainScreen() {
  //scheme of the device
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? CustomTheme : LightTheme}>
      <Stack.Navigator initialRouteName="Splash Screen">
        <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Torrents"
          component={Torrents}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SearchHistory"
          component={SearchHistory}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="MoviePreview"
          component={MoviePreview}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
            statusBarAnimation: 'slide',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
