import AsyncStorage from '@react-native-community/async-storage'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Icon, Text, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Drawer } from 'react-native-paper'
import { primary } from '../../helper/colors'
import { fontMedium, fontXLarge } from '../../helper/sizes'
import { Context as LoginContext } from '../../context/LoginContext'
import BDialog from '../dialog/BDialog'
import DialogConfirm from '../dialog/DialogConfirm'

const DrawerContent = (props) => {
    const navigate = props.navigation.navigate
    const [username, setUsername] = useState("")
    const [cmpname, setCmpname] = useState("")
    const [showDialogLogout, setShowDialogLogout] = useState(false)

    useEffect(() => {
        async function fetchProfile() {
            const username = await AsyncStorage.getItem('username')
            const cmpname = await AsyncStorage.getItem('cmpname')
            setUsername(username)
            setCmpname(cmpname)
        }
        fetchProfile()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.headerView}>
                    <>
                        <Text style={[styles.title, { marginBottom: 5 }]}>{cmpname}</Text>
                        <Text style={styles.subTitle}>{username}</Text>
                    </>
                </View>
                <Drawer.Section style={{ marginTop: 15 }}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon type='Entypo' name='home' />
                        )}
                        label='Home'
                        labelStyle={{ fontWeight: 'bold' }}
                        onPress={() => navigate('Main')}
                    />

                </Drawer.Section>
            </DrawerContentScrollView>
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon type='AntDesign' name='logout' />
                )}
                label='Keluar'
                labelStyle={{ fontWeight: 'bold' }}
                onPress={() => {
                    setShowDialogLogout(true)
                }}
            />
            <BDialog
                isVisible={showDialogLogout}
                onTouchOutside={() => setShowDialogLogout(false)}
                children={
                    <DialogConfirm
                        message='Apakah anda yakin ingin logout?'
                        onPositiveText='LOGOUT'
                        onNegativeText='BATAL'
                        onPositive={() => {
                            setShowDialogLogout(false)
                            props.navigation.closeDrawer()
                            AsyncStorage.clear()
                            props.navigation.navigate('Login')
                        }}
                        onNegative={() => setShowDialogLogout(false)} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: 'white',
        width: 64,
        height: 64,
        borderRadius: 64,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    initial: {
        color: primary,
        fontSize: 26,
        fontWeight: 'bold'
    },
    headerView: {
        backgroundColor: primary,
        padding: 20,
        marginTop: -4
    },
    title: {
        color: 'white',
        fontSize: fontXLarge
    },
    subTitle: {
        color: 'white',
        fontSize: fontMedium
    },
    viewProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default DrawerContent