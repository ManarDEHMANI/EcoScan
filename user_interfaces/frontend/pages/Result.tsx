import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import axios from 'axios';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
  route: ResultScreenRouteProp;
};

const Result = ({ route }: Props) => {
  const { photoUri, predictions, showSaveButton = true  } = route.params;
  const saveScan = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const user = userData ? JSON.parse(userData) : null;
      const userId = user?._id;
  
      if (!userId) throw new Error('User ID not found');
  
      await axios.post(`${API_URL}/user/${userId}/scans`, {
        photoUri,
        predictions,
        date: new Date().toISOString()
      });
  
      Alert.alert('Success', 'Scan saved successfully!');
    } catch (err) {
      console.error('❌ Error saving scan:', err);
      Alert.alert('Error', 'Failed to save scan.');
    }
  };
  
  
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
          toxicity?: number[];
        };
        const isValid = (val?: string) =>
          val && val.trim() !== '' && val !== 'Information not available';
        const getToxicityInfo = (levels: number[]) => {
          if (levels.includes(3)) return { label: 'High', color: 'red' };
          if (levels.includes(2)) return { label: 'Moderate', color: 'orange' };
          if (levels.includes(1)) return { label: 'Low', color: 'green' };
          return { label: 'Unknown', color: 'gray' };
        };
        

        return (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>🔍 {label}</Text>
            {info.confidence && <Text>✅ Confidence: {info.confidence}</Text>}
            {info.impact && <Text>🌍 Impact: {info.impact}</Text>}
            {info.practice && <Text>♻️ Good Practice: {info.practice}</Text>}
            {info.harmfulness && <Text>☠️ Harmfulness: {info.harmfulness}</Text>}
            {info.description && <Text>📖 Description: {info.description}</Text>}
            {isValid(info.message) && <Text>ℹ️ {info.message}</Text>}
            {info.toxicity && info.toxicity.length > 0 && (() => {
  const { label, color } = getToxicityInfo(info.toxicity!);
  return (
    <Text style={{ color, fontWeight: 'bold' }}>
      🧪 Toxicity Level: {label}
    </Text>
  );
})()}

          </View>
          
        );
      })}
       {showSaveButton && (
        <View>
          <Button title="Save this Scan" onPress={saveScan} />
        </View>
      )}
          
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
