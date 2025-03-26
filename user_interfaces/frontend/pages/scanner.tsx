import React, { useEffect, useState,useRef } from 'react';
import { Text, View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice,useCameraDevices } from 'react-native-vision-camera';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
type ProfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scanner'>;
type Props = {
    navigation: ProfilScreenNavigationProp;
  };
const Scanner = ({ navigation}  : Props) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('back'); // Set the initial camera device
  const camera = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    console.log('status',status);

    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'granted');
    } else {
        const permission = await Camera.requestCameraPermission();
      setCameraPermission(true);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  // const camera = useRef<Camera>(null);
  // const camera = useRef(null);

  const takePhoto = async () => {
    try {
      if (!camera.current) {
        console.error('Camera reference not available.', camera);
        return;
      }

      const photo = await camera.current.takePhoto();
      console.log(photo);

      if (photo) {
        setCapturedPhoto(`file://${photo.path}`);
        setShowPreview(true);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const confirmPhoto = () => {
    // User confirmed, further actions with the captured photo
    // For example, save the photo to storage, etc.
    console.log('Photo confirmed:', capturedPhoto);
    navigation.navigate('Result', { photoUri: capturedPhoto });
    };

  const retakePhoto = () => {
    // User wants to retake the photo
    setCapturedPhoto(null); // Clear the captured photo
    setShowPreview(false); // Hide the preview
  };

  const onCameraReady = (ref) => {
    // Camera component is ready, set the camera reference
    camera.current = ref;// Reference to the Camera component (e.g., obtained from ref prop)
  };

  return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          ref={(ref) => onCameraReady(ref)}
          photo={true}
        />
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <Text style={styles.headerText}>Scan Bottle</Text>
          </View>
          {showPreview && capturedPhoto ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: capturedPhoto }} style={styles.capturedImage} />
              <View style={styles.previewButtons}>
                <Button title="Retake" onPress={retakePhoto} />
                <Button title="Confirm" onPress={confirmPhoto} />
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
            </View>
          )}

        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    camera: { flex: 1 },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-between' },
    topBar: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.9)' },
    backButton: { paddingHorizontal: 8 },
    backButtonText: { fontSize: 24 },
    headerText: { fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
    captureButton: { alignSelf:'center',width: 80, height: 80, borderRadius: 40, backgroundColor: 'white',marginBottom:20},
    previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    capturedImage: { width: 300, height: 300, marginBottom: 20 },
    previewButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
    resultContainer: { alignItems: 'center', padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    resultTag: { backgroundColor: '#E0E0E0', borderRadius: 16, padding: 8, paddingHorizontal: 16, marginBottom: 8 },
    resultText: { fontSize: 16, fontWeight: 'bold' },
    description: { textAlign: 'center', color: '#666', paddingHorizontal: 16 },
    navigation: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    navIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#ccc' }
  });

export default Scanner;
