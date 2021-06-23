import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'
import { Image, LogBox, StatusBar, View } from "react-native"
import { primary, transparent } from '../helper/colors'

const SplashScreen = (props) => {
    const navigate = props.navigation.navigate

    useEffect(() => {
        setTimeout(() => {
            StatusBar.setBackgroundColor(transparent);
        }, 100)
    }, [])

    LogBox.ignoreLogs(['VirtualizedList', 'Encountered'])

    const autoLogin = async () => {
        const apikey = await AsyncStorage.getItem('apikey')
        const whid = await AsyncStorage.getItem('whid')
        if (apikey && whid) {
            navigate('Drawer')
        } else {
            navigate('Login')
        }
        console.log('Bearer ', apikey)
    }

    autoLogin()

    return (
        <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: primary }}
        >
            <Image
                style={{
                    width: 350,
                    height: 350,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 20,
                }}
                source={require('../../assets/icon.png')}
            />
        </View>
    )
}


export default SplashScreen;