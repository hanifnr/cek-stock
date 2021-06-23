import { View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

const BDialog = ({ isVisible, children, onTouchOutside }) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => onTouchOutside()}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', margin: -20 }}
            >
                <TouchableOpacity style={styles.modalContainer} onPress={() => onTouchOutside()}>
                    <TouchableOpacity onPress={() => console.log('do nothing')} activeOpacity={1} >
                        {children}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 155,
        height: 300
    },
});

export default BDialog