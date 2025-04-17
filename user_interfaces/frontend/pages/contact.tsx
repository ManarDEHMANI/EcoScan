import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking, Image, ScrollView,Dimensions, Alert } from 'react-native';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = async () => {
    try {
      await axios.post('http://10.0.2.2:4000/send-email', {
        name,
        email,
        subject,
        message,
      });
      console.log({ name, email, subject, message });
      Alert.alert('Success', 'Your message has been sent!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to send message.');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact us</Text>
      <Text style={styles.subtitle}>How can we help you?</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Put your name here"
          placeholderTextColor="#C7C7CD"
          value={name}
          onChangeText={(text) => setName(text)}          
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Put your email here"
          placeholderTextColor="#C7C7CD"
          value={email}
          onChangeText={(text) => setEmail(text)}     
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#C7C7CD"
          value={subject}
          onChangeText={setSubject}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your message</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Message"
          placeholderTextColor="#C7C7CD"
          value={message}
          onChangeText={(text) => setMessage(text)}     
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={sendMail}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or contact us through our social media</Text>

      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
          <Image source={require('../assets/facebook.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
          <Image source={require('../assets/instagram.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com')}>
          <Image source={require('../assets/linkedin.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    color: '#444',
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 200,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#34A853',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 90,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  socialText: {
    marginTop: 30,
    color: '#444',
    fontSize: 13,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 25,
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});
