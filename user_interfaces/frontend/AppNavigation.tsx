import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/welcome';
import Scanner from './pages/scanner';
import Profile from './pages/profile';
import Home from './pages/Home';
import Result from './pages/Result';
import { RootStackParamList } from './pages/types';
import { Image } from 'react-native';
import UserProfile from './pages/userProfile';
import UserHistory from './pages/userHistory';
import Contact from './pages/contact';
import AvatarPicker from './pages/AvatarPicker';

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
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserHistory" component={UserHistory} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="AvatarPicker" component={AvatarPicker} />
        <Stack.Screen name="Result" component={Result} options={{ title: 'Scan Result' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
