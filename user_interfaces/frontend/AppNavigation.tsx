import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/welcome';
import Scanner from './pages/scanner';
import Profile from './pages/profile';
import Home from './pages/Home';
import { RootStackParamList } from './pages/types';
import { Image } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string|JSX.Element = '';

          if (route.name === 'Home') {
            iconName = (
              <Image
                source={require('./assets/home-icone.png')} 
                style={{ width: size, height: size }}
              />
            );
          } else if (route.name === 'Scanner') {
            iconName = (
              <Image
                source={require('./assets/scan-icone.png')} 
                style={{ width: size, height: size }}
              />
            );
          } else if (route.name === 'Profile') {
            iconName = (
              <Image
                source={require('./assets/profil-icone.png')} 
                style={{ width: size, height: size }}
              />
            );
          }
          return iconName;
        },
        tabBarLabel: () => null, 
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
