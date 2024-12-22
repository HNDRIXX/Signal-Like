import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Chats({ navigation }: any) {

  useEffect(() => {
    console.log(JSON.stringify(auth().currentUser))
  }, [])

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => auth().signOut().then(() => navigation.navigate('App'))}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>

      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Image source={require('@/src/assets/images/me.png')} style={{ width: 50, height: 50 }}/>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>HNDRX</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Ionicons name='search-outline' size={25} color='black' />
          <Ionicons name='ellipsis-vertical' size={25} color='black' />
        </View>
      </View> */}
      {/* <Text>Home</Text> */}
    </SafeAreaView>
  )
}