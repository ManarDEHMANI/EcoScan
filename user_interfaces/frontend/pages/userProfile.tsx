import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


const defaultAvatar = require('../assets/avatars/profil-de-lutilisateur.png');
const UserProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [avatar, setAvatar] = React.useState<any>(defaultAvatar);
  const [rawAvatar, setRawAvatar] = React.useState(''); 
  const [userId, setUserId] = React.useState('');


  useFocusEffect(
    React.useCallback(() => {
      const loadUser = async () => {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const user = JSON.parse(data);
          setName(user.name);
          setLastname(user.lastname);
          setEmail(user.email);
          setTelephone(user.telephone);
          setUserId(user._id);
  
          if (user.avatar?.startsWith('http') || user.avatar?.startsWith('file') || user.avatar?.startsWith('/')) {
            setAvatar({ uri: user.avatar });
          } else {
            const avatarMap: any = {
              'femme.png': require('../assets/avatars/femme.png'),
              'femme(1).png': require('../assets/avatars/femme(1).png'),
              'homme.png': require('../assets/avatars/homme.png'),
            };
            setAvatar(avatarMap[user.avatar] || defaultAvatar);
          }
          setRawAvatar(user.avatar);
        }
      };
  
      loadUser();
    }, [])
  );

  const handleSave = async () => {
    try {
      const updatedUser = {
        name,
        lastname,
        email,
        telephone,
        avatar: rawAvatar
      };
      const response = await axios.put(`http://10.0.2.2:4000/users/update/${userId}`, updatedUser);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));

      console.log("➡️ Envoi de la mise à jour pour l'utilisateur :", userId);

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AvatarPicker')}>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.cameraIcon}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>📷</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{name} {lastname}</Text>
      <Text style={styles.editText}>Edit Profile</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={[styles.input, { borderColor: '#28a745' }]}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={[styles.input, { borderColor: '#28a745' }]}
          value={lastname}
          onChangeText={setLastname}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, { borderColor:  '#28a745' }]}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={[styles.input, { borderColor: '#28a745' }]}
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
        />
      </View>


      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 8,
  },
  editText: {
    color: '#777',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 20,      
    paddingHorizontal: 12,
    fontSize: 15,            
    fontWeight: '400',
    backgroundColor: '#fff',
  },
  inputGroup: {
    width: '80%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,              
    color: '#888888',          
    marginBottom: 6,
    fontWeight: '600',        
  },
  
  saveButton: {
    backgroundColor: '#34A853',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

