import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq5U_5WzJrlgNnHGq8XcI0v8F2GniN5r0",
  authDomain: "hndrx-app.firebaseapp.com",
  projectId: "hndrx-app",
  storageBucket: "hndrx-app.appspot.com",
  messagingSenderId: "305141103659",
  appId: "1:305141103659:web:5a265d3cc2b21c2cac3e6e",
  measurementId: "G-Z64K10VVCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  // Function to fetch users in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const addData = async () => {
    if (!name || !age) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        age: Number(age),
      });
      setMessage('User added successfully!');
      setName('');
      setAge('');
    } catch (error) {
      setMessage('Error adding user: ' + error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Add User" onPress={addData} />
      {message ? <Text>{message}</Text> : null}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10 }}>{item.name}, Age: {item.age}</Text>
        )}
      />
    </View>
  );
};

export default App;