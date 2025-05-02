import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
  route: ResultScreenRouteProp;
};

const Result = ({ route }: Props) => {
  const { photoUri, predictions } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.resultContainer}>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.resultImage} />
      )}

      {predictions && Object.entries(predictions).map(([label, value], index) => {
        const info = value as {
          confidence?: string;
          impact?: string;
          practice?: string;
          harmfulness?: string;
          description?: string;
          message?: string;
        };

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>🔍 {label}</Text>
            {info.confidence && <Text>✅ Confidence: {info.confidence}</Text>}
            {info.impact && <Text>🌍 Impact: {info.impact}</Text>}
            {info.practice && <Text>♻️ Good Practice: {info.practice}</Text>}
            {info.harmfulness && <Text>☠️ Harmfulness: {info.harmfulness}</Text>}
            {info.description && <Text>📖 Description: {info.description}</Text>}
            {info.message && <Text>ℹ️ {info.message}</Text>}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  resultImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Result;
