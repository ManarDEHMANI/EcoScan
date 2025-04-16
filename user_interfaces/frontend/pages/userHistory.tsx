import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserHistory = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is the History page.</Text>
  </View>
);

export default UserHistory;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});
