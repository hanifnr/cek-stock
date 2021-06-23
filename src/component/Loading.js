import { Text } from 'native-base'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loading = ({ size, color, message, textColor }) => {
    return (
        <>
            <ActivityIndicator size={size} color={color} style={{ marginBottom: 20 }} />
            <Text style={[textColor ? { color: textColor } : null]}>{message}</Text>
        </>
    )
}

export default Loading