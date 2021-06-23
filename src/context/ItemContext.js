import AsyncStorage from "@react-native-community/async-storage"
import { defaultApi } from "../api/BApi"
import { RESPONSE_STATUS_OK } from "../helper/constants"
import createDataContext from "./createDataContext"

const ItemReducer = (state, action) => {
    switch (action.type) {
        case 'loadItem':
            return { ...state, itemList: action.payload }
        case 'loadStock':
            return { ...state, stockList: action.payload }
        case 'loadStockByWH':
            return { ...state, stockListByWH: action.payload }
    }
}

const loadItem = dispatch => async () => {
    const response = await defaultApi.get('item')
    if (response.status === RESPONSE_STATUS_OK) {
        // console.log('repsonse item ', response.data.data)
        dispatch({ type: 'loadItem', payload: response.data.data })
    }
}

const loadStockWH = dispatch => async () => {
    const whid = await AsyncStorage.getItem('whid')
    const responseStock = await defaultApi.get('stock')
    const responseItem = await defaultApi.get('item')
    const responseUnit = await defaultApi.get('unit')
    const result = []
    if (responseStock.status === RESPONSE_STATUS_OK && responseItem.status === RESPONSE_STATUS_OK && responseUnit.status === RESPONSE_STATUS_OK) {
        const resultStock = responseStock.data.data
        const resultItem = responseItem.data.data
        const resultUnit = responseUnit.data.data
        resultItem.forEach(item => {
            resultStock.forEach(stock => {
                if (stock.item_id === item.id) {
                    const qty = getQtyStock(resultUnit, item.id, stock.qty)
                    result.push({ id: item.id, wh_id: stock.wh_id.toString(), code: item.code, name: item.name1, qty: qty })
                }
            })
        })
        console.log('result', result)
        const resultByWH = result.filter(item =>
            item.wh_id === whid
        )
        console.log('resultByWH', resultByWH)
        dispatch({ type: 'loadStock', payload: result })
        dispatch({ type: 'loadStockByWH', payload: resultByWH })
    }
}

const getQtyStock = (resultUnit, item_id, qty) => {
    const result = []
    const unitList = resultUnit.filter(unit =>
        unit.item_id.toString() === item_id.toString()
    )
    console.log('unitlist', unitList)
    const unit3 = unitList.filter(unit => { return unit.idx === "3" })[0]
    const unit2 = unitList.filter(unit => { return unit.idx === "2" })[0]
    const unit1 = unitList.filter(unit => { return unit.idx === "1" })[0]

    if (qty < 1) {
        return "0 " + unit1.unit
    }

    const getStrUnit = (unit) => {
        const conv = parseInt(unit.conv)
        const i = Math.floor(qty / conv)
        if (i >= 1) {
            qty = qty - (conv * i)
            result.push(i + " " + unit.unit + " ")
        }
    }

    if (unit3) {
        getStrUnit(unit3)
    }
    if (unit2) {
        getStrUnit(unit2)
    }
    if (unit1) {
        getStrUnit(unit1)
    }
    console.log('str result', result)
    return result.join("");
}


export const { Context, Provider } = createDataContext(
    ItemReducer,
    {
        // loadItem,
        loadStockWH
    },
    { itemList: null, stockList: null, stockListByWH: null }
)