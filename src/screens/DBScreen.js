import { Icon, Text, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import { loginApi } from '../api/BApi'
import DefaultHeader from '../component/header/DefaultHeader'
import Loading from '../component/Loading'
import { Context as LoginContext } from '../context/LoginContext'
import { defaultLineColor, dimgray, primary, whiteBackground } from '../helper/colors'
import { RESPONSE_STATUS_OK } from '../helper/constants'
import { dimension, fontLarge } from '../helper/sizes'
import { Context as WHContext } from '../context/WHContext'

const DBScreen = (props) => {
    const { state } = useContext(LoginContext)
    const { loadWH } = useContext(WHContext)
    const { dblist } = state
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState('')
    const navigate = props.navigation.navigate

    useEffect(() => {
        setTimeout(() => {
            StatusBar.setBackgroundColor(primary);
        }, 100)
        if (dblist && dblist.length === 1) {
            onChooseDB(dblist[0])
        }
    }, [dblist])

    console.log('dblist', dblist)

    const onChooseDB = (item) => {
        setLoading(true)
        setLoadingText('Sedang memproses data...')
        doProcessDB(
            item.dbname,
            item.cmpname,
            () => {
                loadWH()
                props.navigation.navigate('Setting')
            }
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: whiteBackground }}>
            <DefaultHeader
                title='Pilih Database'
                onBack={() => navigate('Login')} />
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Loading size={50} color={primary} message={loadingText} />
                </View> :
                <FlatList
                    data={dblist}
                    keyExtractor={db => db.cmpname}
                    renderItem={({ item }) => {
                        return (
                            <ItemDB
                                name={item.cmpname}
                                onAction={() => {
                                    onChooseDB(item)
                                }} />
                        )
                    }}
                />
            }
            {/* {!loading && (
                <View style={{
                    height: dimension.height / 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#46BE8A',
                    marginHorizontal: -20
                }} >
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center', padding: 15, alignSelf: 'stretch', justifyContent: 'center' }}
                        onPress={() => {
                            props.navigation.goBack()
                        }}>
                        <Text style={{ color: 'white' }}>KEMBALI</Text>
                    </TouchableOpacity>
                </View>
            )} */}
        </View >
    )
}

const doProcessDB = async (dbname, cmpname, callback) => {
    const username = await AsyncStorage.getItem('username')
    const response = await loginApi.post('/v1/auth/apikey', { username, dbname })
    console.log('response process', response)
    if (response.status === RESPONSE_STATUS_OK) {
        const apikey = response.data.message[0].auth_key
        console.log('apikey', apikey)
        await AsyncStorage.setItem('cmpname', cmpname)
        await AsyncStorage.setItem('apikey', apikey)
        if (callback) {
            callback()
        }
    }
}

const ItemDB = ({ name, onAction }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onAction}>
            <>
                <Icon type='Entypo' name='database' style={{ fontSize: 25, marginRight: 10 }} />
                <Text style={{ alignSelf: 'center', fontSize: fontLarge, color: dimgray }}>{name}</Text>
            </>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 15
    },
    btnBack: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderWidth: 0.5,
        width: 250,
        padding: 10,
        borderRadius: 10,
        borderColor: defaultLineColor,
        backgroundColor: 'white',
        elevation: 0.5,
    }
})

export default DBScreen