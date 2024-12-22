import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { mobileContent } from '../src'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

export default function App() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>            
            <StatusBar style="dark"/>

            <Image
                source={mobileContent}
                style={styles.image}
            />

            <View style={styles.wrapper}>
                <Text style={styles.headText}>Welcome!</Text>
                <Text style={styles.baseText}>
                    This is a sample HNDRX app. For testing and development purposes.
                    {'\n'}
                    Feel free to use it!
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PrePage')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    image: {
        width: '100%',
        height: 400,
        marginBottom: 20,
        resizeMode: 'contain',
    },

    wrapper: {
        paddingHorizontal: 20
    },

    headText: {
        fontFamily: 'Bold',
        fontSize: 25,
    },

    baseText: {
        fontSize: 16,
        fontFamily: 'Regular',
    },

    button: {
        backgroundColor: '#7EC6FF', 
        paddingHorizontal: 20,
        paddingVertical: 10, 
        borderRadius: 10, 
        marginTop: 20 
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'Bold',
        fontSize: 16,
        textAlign: 'center'
    }
})