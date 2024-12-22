import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OtpInput } from 'react-native-otp-entry';
import { usePathname, useRouter } from 'expo-router';

import PhoneField from '@/components/PhoneField';

export default function PrePage({ navigation }: any) {
  const [confirm, setConfirm] = useState(null);
  const [isContinue, setContinue] = useState(false);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(true);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathName === "/firebaseauth/link") router.back();
  }, [pathName]);

  async function onAuthStateChanged(user) {
    setUser(user);

    const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        alert('User already exists.');
        navigation.replace('Tabs');
      } else {
        setContinue(true);
      }
    if (initializing) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
  
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          alert('User already exists.');
          navigation.replace('Tabs');
        } else {
          setContinue(true);
        }
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function handleContinue() {
    try {
      if (name && email) {
        const user = auth().currentUser;
        if (user) {
          await user.updateProfile({
            displayName: name
          }).then(async () => {
            const userRef = firestore().collection('users').doc(user.uid);

            await userRef.set({
              name,
              email,
            });
          }).then(() => {
            navigation.replace('Tabs');
          });
        } else {
          console.log('User is not authenticated.');
        }
      } else {
        console.log('Please fill in all fields.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user && !isContinue) {
    if (!confirm) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Input your phone number</Text>
          <Text style={styles.subTitle}>Provide your phone number to receive a code</Text>
          <PhoneField
            componentStyles={{
              marginTop: 40,
            }}
            setNumberValue={(value) => {
              setPhoneNumber(value);
              signInWithPhoneNumber(value);
            }}
          />
        </SafeAreaView>
      );
    } 

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Enter the code we sent you 💬</Text>
        <Text style={styles.subTitle}>As of now, fixed code is 123456</Text>

        <OtpInput
          onTextChange={text => setCode(text)}
          numberOfDigits={6}
          focusColor={'#7EC6FF'}
          blurOnFilled
        />

        <TouchableOpacity onPress={confirmCode} style={styles.button}>
          <Text style={styles.buttonText}>Confirm code</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (isContinue) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>About you 😄</Text>
        <View>
          <Text style={styles.label}>What should we call you?</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={setName}
          />

          <Text style={styles.label}>Your email address</Text>
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Bold',
  },

  subTitle: {
    fontSize: 16,
    fontFamily: 'Regular',
  },

  button: {
    marginTop: 20,
    padding: 10,
    width: '100%',
    backgroundColor: '#7EC6FF',
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Bold',
    fontSize: 16,
    textAlign: 'center',
  },

  label: {
    fontFamily: 'Medium',
    fontSize: 16,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#7EC6FF',
    width: '100%',
    marginBottom: 20,
    fontFamily: 'Regular',
  },
});
