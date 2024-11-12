import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from './types';

type ProfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
    navigation: ProfilScreenNavigationProp;
  };  
const Home = ({ navigation}  : Props ) => {
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/menu.png')} style={styles.profileIcon}/>
        </TouchableOpacity>
        <Text style={styles.appName}>EcoScan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/profil-utilisateur.png')} style={styles.profileIcon}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcomeText}>Welcome to EcoScan!</Text>
      <Text style={styles.slogan}>“A healthy planet is a priceless gift.”</Text>
      
      <Image source={require('../assets/home.png')} style={styles.illustration} resizeMode="contain" />

      <View style={styles.impactSection}>
        <Text style={styles.sectionTitle}>Why We Care</Text>
        <Text style={styles.impactText}>
          By using EcoScan, you contribute to a cleaner environment, reduce pollution, and make informed choices for your health and the planet.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34A853',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  slogan: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: '100%',
    height: 300,
    marginTop: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34A853',
    marginBottom: 10,
  },
  impactSection: {
    backgroundColor: '#E6F7E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  impactText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default Home;
