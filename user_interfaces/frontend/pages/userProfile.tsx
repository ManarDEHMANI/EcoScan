import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is the User Profile page.</Text>
  </View>
);

export default UserProfile;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});
