import { Icon, Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { dimgray, primary } from '../../helper/colors'
import { dimension, fontBtnNormal, fontLarge, fontMedium } from '../../helper/sizes'

const DialogConfirm = ({ message, onNegative, onPositive, onNegativeText, onPositiveText, onClose }) => {
    return (
        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, width: dimension.width / 1.3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 20 }}>
                {onClose &&
                    <Icon
                        type='AntDesign'
                        name='close'
                        style={{ color: dimgray, fontSize: 22, flex: 1, marginRight: 5 }}
                        onPress={onClose} />
                }
                <Text style={styles.title}>Perhatian</Text>
                <View style={{ flex: 1 }} />
            </View>
            <Text style={{ color: dimgray, fontSize: fontMedium, marginBottom: 30, paddingHorizontal: 5 }}>{message}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {onNegative && onNegativeText && (
                    <TouchableOpacity
                        onPress={onNegative}>
                        <Text style={{ color: dimgray, marginRight: 20 }}>{onNegativeText}</Text>
                    </TouchableOpacity>
                )}
                {onPositive && onPositiveText && (
                    <TouchableOpacity
                        onPress={onPositive}
                    >
                        <Text style={{ color: primary }}>{onPositiveText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    image: {
        width: 220,
        height: 220,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 50,
    },
    button: {
        backgroundColor: primary,
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 10
    },
    txtButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: fontBtnNormal
    },
    passIcon: {
        fontSize: 20,
        color: dimgray
    },
    title: {
        fontSize: fontLarge,
        color: dimgray,
        fontWeight: 'bold',
        flex: 1
    }
})

export default DialogConfirm