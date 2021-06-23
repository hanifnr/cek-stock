import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button } from 'native-base'
import DefaultHeader from '../component/header/DefaultHeader'
import { StatusBar, StyleSheet } from 'react-native'
import BDropDown from '../component/input/BDropDown'
import { Context as WHContext } from '../context/WHContext'
import { Context as ItemContext } from '../context/ItemContext'
import { primary } from '../helper/colors'
import Loading from '../component/Loading'
import { dimension, fontBtnNormal, fontSmall, fontXSmall } from '../helper/sizes'
import AsyncStorage from '@react-native-community/async-storage'

const SettingScreen = (props) => {
    const navigate = props.navigation.navigate
    const { state, loadWH } = useContext(WHContext)
    const { loadData } = useContext(ItemContext)
    const { whList } = state
    const [item, setItem] = useState(null)
    const [showErrorWH, setShowErrorWH] = useState(false)

    useEffect(() => {
        const focus = props.navigation.addListener('focus', () => {
            console.log('focus setting')
            loadWH()
        })
        setTimeout(() => {
            StatusBar.setBackgroundColor(primary);
        }, 100)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <DefaultHeader title='Pengaturan Awal' onBack={() => navigate('DB')} />
            {whList ?
                <>
                    <View style={styles.container}>
                        <Text style={styles.label}>Gudang</Text>
                        <BDropDown
                            items={whList}
                            label='name'
                            value='id'
                            item={item}
                            setItem={setItem}
                            isMultiple={false}
                            placeholder='Pilih gudang penjualan' />
                        {showErrorWH && <Text style={styles.txtErrorWH}>Gudang wajib dipilih</Text>}
                    </View>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            if (item) {
                                loadData(true)
                                setShowErrorWH(false)
                                saveWH(item)
                                navigate('Drawer')
                            } else {
                                setShowErrorWH(true)
                            }
                        }}
                    >
                        <Text style={styles.txtButton}>SIMPAN</Text>
                    </Button>
                </> :
                <View style={styles.loadingContainer}>
                    <Loading color={primary} size={48} />
                </View>
            }
        </View>
    )
}

const saveWH = async (whid) => {
    console.log('selected wh', whid)
    await AsyncStorage.setItem('whid', whid.toString())
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    button: {
        backgroundColor: primary,
        width: dimension.width / 1.2,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        borderRadius: 10
    },
    txtButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: fontBtnNormal
    },
    txtErrorWH: {
        color: 'red',
        fontSize: fontXSmall,
        marginTop: 5
    }
})

export default SettingScreen