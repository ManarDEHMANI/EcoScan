import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const defaultAvatar = require('../assets/avatars/profil-de-lutilisateur.png');
  const [selectedAvatar, setSelectedAvatar] = React.useState<any>(null);
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });
    return unsubscribe;
  }, [navigation]);
  
  const fetchUserData = async () => {
    const data = await AsyncStorage.getItem('userData');
    if (data) {
      const user = JSON.parse(data);
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      if (user.avatar) {
        if (user.avatar.startsWith('http') || user.avatar.startsWith('file') || user.avatar.startsWith('/')) {
          setSelectedAvatar({ uri: user.avatar });
        } else {
          const avatarMap: any = {
            'femme.png': require('../assets/avatars/femme.png'),
            'femme(1).png': require('../assets/avatars/femme(1).png'),
            'homme.png': require('../assets/avatars/homme.png'),
          };
      
          setSelectedAvatar(avatarMap[user.avatar] || defaultAvatar);
        }
      }
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.whitePanel}>
        <View style={styles.profileSection}>
        <TouchableOpacity>
          <Image
            source={selectedAvatar || defaultAvatar}
            style={styles.avatar}
          />
        </TouchableOpacity>
          <Text style={[styles.name, { color: '#000' }]}>{name} {lastname}</Text>
          <Text style={[styles.email, { color: '#444' }]}>{email}</Text>
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

        <TouchableOpacity style={styles.logout} 
            onPress={async () => {
            await AsyncStorage.removeItem('userData');
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            }}>
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
