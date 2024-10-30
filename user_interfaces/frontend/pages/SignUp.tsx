import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-input';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUp = ({ navigation }: Props) => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    password: '',
    country: 'fr',
  });

  const handlePhoneChange = (telephone: string) => {
    setForm({ ...form, telephone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input]}
            placeholder="First Name"
            placeholderTextColor="#A0A0A0"
            value={form.firstname}
            onChangeText={(firstname) => setForm({ ...form, firstname })}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input]}
            placeholder="First Name"
            placeholderTextColor="#A0A0A0"
            value={form.lastname}
            onChangeText={(lastname) => setForm({ ...form, lastname })}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number :</Text>
        <PhoneInput
          style={[styles.input]}
          initialCountry="fr"
          onChangePhoneNumber={handlePhoneChange}
          textProps={{
            placeholder: "Téléphone",
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input]}
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
            style={[styles.input]}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}/>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => console.log("Form data:", form)}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signupLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
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

export default SignUp;
