import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Result = ({ route }) => {
  const { photoUri } = route.params;

  return (
    <View style={styles.resultContainer}>
      <Image source={{ uri: photoUri }} style={styles.resultImage} />
      <Text style={styles.resultText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  resultImage: { width: '100%', height: '70%', resizeMode: 'contain' },
  resultText: { fontSize: 16, color: '#333', textAlign: 'center', marginTop: 20 },
});

export default Result;