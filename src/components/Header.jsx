import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const infoExample = {
    name: "Carlos Stoll",
    uri: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
}

const Header = () => {
    return (
        <View style= {styles.container}>
            <View>
                <Text style={styles.textWelcome}>Hello, {infoExample.name}</Text>
                <Text style={styles.textSimple}>Welcome back to your app</Text>
            </View>
            <Image source={{uri: infoExample.uri}} style={{width: 50, height: 50}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 50,
        height: 50,
    },
    textWelcome: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textSimple: {
        fontSize: 14,
        opacity: .6
    }
})

export default Header