import React, { useEffect, useState } from 'react'
import { Body, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { primary } from '../../helper/colors'
import { dimension } from '../../helper/sizes'
import AsyncStorage from '@react-native-community/async-storage'

const DrawerHeader = ({ title, onMenuAction, onProfileAction }) => {
    const [cmpname, setCmpname] = useState('')

    useEffect(() => {
        async function fetchProfile() {
            const cmpname = await AsyncStorage.getItem('cmpname')
            setCmpname(cmpname)
        }
        fetchProfile()
    })

    return (
        <Header style={{ backgroundColor: primary, paddingTop: 10 }}>
            <Left style={{ flex: 1 }}>
                <TouchableOpacity onPress={onMenuAction}>
                    <Icon
                        type="Entypo"
                        name="menu"
                        style={{ fontSize: 30, color: 'white' }}
                    />
                </TouchableOpacity>
            </Left>
            <Body style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Title>{cmpname}</Title>
            </Body>
        </Header>
    )
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: 'white',
        width: dimension.width * 0.08,
        height: dimension.width * 0.08,
        borderRadius: dimension.width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    initial: {
        color: primary,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default DrawerHeader