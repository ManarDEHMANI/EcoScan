import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type UserHistoryRouteProp = RouteProp<RootStackParamList, 'UserHistory'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;

interface ScanHistory {
  _id: string;
  date: string;
  photoUri?: string;
  predictions: Record<string, { confidence?: number }>;
}

interface Props {
  route: UserHistoryRouteProp;
}


const UserHistory: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const [scans, setScans] = useState<ScanHistory[]>([]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_URL}/user/${userId}/scans`)
      .then((res) => setScans(res.data))
      .catch((err) => console.error('❌ Failed to fetch scans', err));
  }, [userId]);

  const deleteScan = async (scanId: string) => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this scan? ?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/history/${scanId}`);
              setScans((prev) => prev.filter((scan) => scan._id !== scanId));
              Alert.alert("✅ Success", "Scan deleted successfully.");
            } catch (err) {
              console.error('❌ Failed to delete scan', err);
              Alert.alert("❌ Error", "Failed to delete scan.");
            }
          },
        },
      ]
    );
  };  
  return (
    <View style={styles.container}>
    <Text style={styles.title}>📸 Scan History</Text>
    <Text style={styles.subtitle}>
      Tap to view scan details. Use the button below each card to delete a scan.
    </Text>
    <FlatList
      data={scans}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Result', {
              photoUri: item.photoUri ?? '',
              predictions: item.predictions,
              userId,
              showSaveButton: false, 
            })
          }
          onLongPress={() => deleteScan(item._id)}
        >
          <View style={styles.card}>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
            {Object.entries(item.predictions).map(([tag, info]) => (
              <Text key={tag} style={styles.tag}>
                🔖 {tag} ({info.confidence ?? 'N/A'})
              </Text>
            ))}
            <Button title="Delete" onPress={() => deleteScan(item._id)} color="#34A853" />

          </View>
        </TouchableOpacity>
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 16, textAlign: 'center' },
  list: { paddingBottom: 20 },
  card: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  date: { fontWeight: 'bold', marginBottom: 8 },
  tag: { marginVertical: 2 },
});

export default UserHistory;
