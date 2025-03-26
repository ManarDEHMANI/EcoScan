import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';


const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.whitePanel}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Tom Smith</Text>
          <Text style={styles.email}>tomsmith@gmail.com</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserHistory')}>
            <Image source={require('../assets/list.png')} style={styles.Icon}/>
            <Text style={styles.menuText}>My History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserProfile')}>
            <Image source={require('../assets/user.png')} style={styles.Icon}/>
            <Text style={styles.menuText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contact')}>
          <Image source={require('../assets/envelope.png')} style={styles.Icon}/>
          <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logout}>
          <Image source={require('../assets/power-off.png')} style={styles.Icon}/>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6fff9',
    flexDirection: 'row',
  },
  whitePanel: {
    backgroundColor: '#fff',
    width: width * 0.65,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    color: 'gray',
    fontSize: 14,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34A853',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 18,
  },
  Icon: {
    width: 35,
    height: 35,
  }
});
