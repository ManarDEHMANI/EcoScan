import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Contact = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is the Contact Us page.</Text>
  </View>
);

export default Contact;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});
