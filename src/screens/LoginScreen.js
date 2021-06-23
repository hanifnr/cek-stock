import { Button, Form, Icon, Input, Item } from 'native-base'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BDialog from '../component/dialog/BDialog'
import DialogConfirm from '../component/dialog/DialogConfirm'
import { Context as LoginContext } from '../context/LoginContext'
import { dimgray, primary, transparent, whiteBackground } from '../helper/colors'
import { dimension, fontBtnNormal, fontLarge, fontMedium, fontSmall } from '../helper/sizes'

const LoginScreen = ({ navigation }) => {
    const { doLogin, clearError, state } = useContext(LoginContext)
    const { errMsg } = state
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(true)
    const [loading, setLoading] = useState(false)
    const inputPass = useRef()

    useEffect(() => {
        setTimeout(() => {
            StatusBar.setBackgroundColor(whiteBackground);
        }, 100)
    }, [])

    return (
        <View style={[styles.container, { paddingBottom: 10 }]}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/icon.png')}
                />
                <Form style={{ width: dimension.width / 1.2 }}>
                    <Item>
                        <Input
                            placeholder='Email'
                            textContentType='username'
                            keyboardType='email-address'
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                inputPass.current._root.focus()
                            }} />
                    </Item>
                    <Item style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Input
                            placeholder='Password'
                            textContentType='password'
                            autoCompleteType='password'
                            secureTextEntry={showPass}
                            onChangeText={(text) => {
                                setPass(text)
                            }}
                            onSubmitEditing={() => doLogin(email, pass)}
                            ref={inputPass} />
                        <TouchableOpacity
                            onPress={() => setShowPass(!showPass)}>
                            {showPass ?
                                <Icon type='Entypo' name='eye' style={styles.passIcon} /> :
                                <Icon type='Entypo' name='eye-with-line' style={styles.passIcon} />
                            }
                        </TouchableOpacity>
                    </Item>
                    <TouchableOpacity
                        onPress={() => {
                            const url = 'https://app.beecloud.id/resetpassword'
                            Linking.canOpenURL(url).then(supported => {
                                if (supported) {
                                    Linking.openURL(url);
                                }
                            });
                        }}>
                        <Text style={{ color: dimgray, alignSelf: 'flex-end' }}>
                            Lupa kata sandi?
                        </Text>
                    </TouchableOpacity>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            setLoading(true)
                            doLogin(
                                email,
                                pass,
                                () => {
                                    setLoading(false)
                                },
                                () => {
                                    setLoading(false)
                                }
                            )
                        }}
                    >
                        {loading ?
                            <ActivityIndicator size='small' color='white' /> :
                            <Text style={styles.txtButton}>Login</Text>
                        }
                    </Button>
                </Form>
            </View>
            <BDialog
                isVisible={(errMsg && errMsg.length > 0)}
                children={
                    <DialogConfirm onPositive={clearError} onPositiveText='OK' message={errMsg} onClose={clearError} />
                }
                onTouchOutside={() => clearError()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: dimension.width / 2,
        height: dimension.width / 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 40,
    },
    button: {
        backgroundColor: primary,
        width: dimension.width / 1.5,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
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
        flex: 1,
        textAlign: 'center'
    }
})

export default LoginScreen