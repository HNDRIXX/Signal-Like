import { View, Text, StatusBar, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

export default function TabHeader() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image 
                    source={require('@/src/assets/images/me.png')} 
                    style={{ width: 50, height: 50 }} 
                />

                <Text style={styles.title}>HNDRX</Text>
            </View>

            <View style={styles.wrapper}>
                <Ionicons name='search-outline' size={25} color='black' />
                <Ionicons name='ellipsis-vertical' size={25} color='black' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-between', padding: 10,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white'
    },

    wrapper: {
        flexDirection: 'row', alignItems: 'center', gap: 20
    },

    title: {
        fontWeight: 'bold', fontSize: 20 
    }
})