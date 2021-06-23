import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { lightGray } from '../../helper/colors';
import PropTypes from 'prop-types';
import { dimension } from '../../helper/sizes';


const BDropDown = (props) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const itemsConvert = convertList(props.items, props.label, props.value, props.isMultiple)

    useEffect(() => {
        setItems(itemsConvert)
    }, [])

    return (
        <View style={{ marginBottom: 10 }}>
            {items[0] && items[0].label && (
                <DropDownPicker
                    open={open}
                    value={props.item}
                    items={items}
                    setOpen={setOpen}
                    setValue={props.setItem}
                    setItems={setItems}
                    placeholder={props.placeholder}
                    containerStyle={{ height: 40, width: 250 }}
                />
            )}
        </View>
    )
}

const convertList = (list, label, value, isMultiple) => {
    let items = []
    for (var i in list) {
        let item = { label: list[i], value: list[i] }
        if (label && value) {
            item = { label: list[i][label], value: list[i][value] }
        }
        items.push(item)
    }
    // if (!isMultiple) {
    //     items.push({ label: 'Semua', value: null })
    // }
    // items.reverse()
    return items
}

BDropDown.propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    item: PropTypes.object,
    setItem: PropTypes.func,
    isMultiple: PropTypes.bool,
    searchable: PropTypes.bool,
    width: PropTypes.number,
    useDefaultValue: PropTypes.bool,
    placeholder: PropTypes.string
}

BDropDown.defaultProps = {
    isMultiple: false,
    searchable: false,
    width: dimension / 2
}

export default BDropDown
