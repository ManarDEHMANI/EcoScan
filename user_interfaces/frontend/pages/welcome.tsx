import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from './types';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
type Props = {
    navigation: SignUpScreenNavigationProp;
  };  

const Welcome= ({ navigation}  : Props ) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.appName}>EcoScan</Text>
      
      <Image
        source={require('../assets/welcome.jpeg')}
        style={styles.illustration}
        resizeMode="contain"
      /> 
      
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.signInWithText}>sign in with</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.emailButton} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.emailButtonText}>Start with Email</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#E6F7E6',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  skipText: {
    color: '#34A853',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D6923',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#34A853',
    marginBottom: 20,
  },
  illustration: {
    width: '100%',
    height: 250,
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CFCFCF',
  },
  signInWithText: {
    marginHorizontal: 10,
    color: '#9796A1',
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: '#34A853',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#9796A1',
    fontSize: 14,
  },
  signUpText: {
    color: '#34A853',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Welcome;
