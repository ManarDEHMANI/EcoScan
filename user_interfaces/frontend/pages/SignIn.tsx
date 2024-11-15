import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import axios from 'axios';
import { createIconSetFromFontello } from 'react-native-vector-icons';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};


const SignIn = ({ navigation }: Props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    return form.email !== '' && form.password !== '';
  };
  const [loading, setLoading] = useState(false);
  const submitForm = async() => {
    if(validateForm()){
      try{
        setLoading(true);
        const response = await axios.get('http://10.0.2.2:4000/connection',{
          params:{
            email: form.email,
            password: form.password,
          },
        });
        setForm({
          email: '',
          password: '',
        });
        if (response.data.success) {
          navigation.navigate('Home');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data?.message || 'An error occurred';
          console.error('Error message:', message);
        } else {
          console.error('Unexpected error:', err);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input,styles.inputDefault]}
          placeholder="Your email"
          placeholderTextColor="#A0A0A0"
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input,styles.inputDefault]}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}/>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => submitForm()} disabled={loading}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#9796A1',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  inputDefault: {
    borderColor: '#ccc',
  },
  inputEmail: {
    borderColor: '#FF6347',
  },
  inputPassword: {
    borderColor: '#32CD32', 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#32CD32',
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
  },
  eyeIcon: {
    marginLeft: 'auto',
  },
  forgotPassword: {
    color: '#34A853',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#34A853',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#000',
    fontSize: 14,
  },
  signupLink: {
    color: '#34A853',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignIn;