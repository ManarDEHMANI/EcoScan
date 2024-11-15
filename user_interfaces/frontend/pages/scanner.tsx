// /pages/scanner.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Ionicons } from '@expo/vector-icons';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera to scan products.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting for camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </RNCamera>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Plastic</Text>
      </View>
      <TouchableOpacity style={styles.captureButton}>
        <Ionicons name="camera" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 15,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#34A853',
    borderRadius: 5,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#34A853',
    padding: 15,
    borderRadius: 50,
  },
});

export default Scanner;
