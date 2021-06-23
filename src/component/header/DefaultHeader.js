import { Body, Header, Icon, Left, Title, View } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { primary } from '../../helper/colors'
import { dimension } from '../../helper/sizes'

const DefaultHeader = ({ title, onBack, actionComponent }) => {
    return (
        <Header style={{ backgroundColor: primary }}>
            <Left style={{ flex: dimension.width * 0.1 }}>
                <TouchableOpacity onPress={onBack}>
                    <Icon
                        type="Entypo"
                        name="chevron-left"
                        style={{ fontSize: 30, color: 'white' }}
                    />
                </TouchableOpacity>
            </Left>
            <Body style={{ flex: dimension.width * 0.7 }}>
                <Title>{title}</Title>
            </Body>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
                {actionComponent}
            </View>
        </Header>
    )
}

export default DefaultHeader