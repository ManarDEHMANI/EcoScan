import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, FlatList
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const avatarList = [
  require('../assets/avatars/femme.png'),
  require('../assets/avatars/femme(1).png'),
  require('../assets/avatars/homme.png'),
  require('../assets/avatars/profil-de-lutilisateur.png')
];

const AvatarPicker = () => {
  const navigation = useNavigation();
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);

  const pickFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        setSelectedAvatar({ uri: response.assets[0].uri });
      }
    });
  };

  const handleAvatarSelect = (avatar: any) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirm = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) return;
  
      const user = JSON.parse(userData);
  
      let avatarValue = '';
  
      if (selectedAvatar?.uri) {
        avatarValue = selectedAvatar.uri;
      } else if (selectedAvatar) {
        const resolved = Image.resolveAssetSource(selectedAvatar);
        avatarValue = (resolved?.uri?.split('/').pop() || '').split('?')[0];
      }
  
      if (!avatarValue) {
        console.warn("Aucun avatar sélectionné");
        return;
      }
  
      await axios.put(`http://10.0.2.2:4000/users/update/${user._id}`, {
        ...user,
        avatar: avatarValue,
      });      
  
      const updatedUser = { ...user, avatar: avatarValue };
  
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
  
      navigation.goBack();
    } catch (err) {
      console.error('Error saving avatar:', err);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your Avatar</Text>

      <FlatList
        data={avatarList}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAvatarSelect(item)}>
            <Image source={item} style={[
              styles.avatar,
              selectedAvatar === item && styles.selected
            ]} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.avatarList}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickFromGallery}>
        <Text style={styles.uploadText}>Upload from Gallery</Text>
      </TouchableOpacity>

      {selectedAvatar && (
        <View style={styles.preview}>
          <Text style={styles.previewText}>Selected Avatar:</Text>
          <Image source={selectedAvatar} style={styles.avatar} />
        </View>
      )}

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  avatarList: { gap: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#34A853',
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#34A853',
    padding: 10,
    borderRadius: 10,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  preview: {
    alignItems: 'center',
    marginTop: 30,
  },
  previewText: {
    marginBottom: 10,
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: '#1cc77e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
