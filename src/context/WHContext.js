import { defaultApi } from "../api/BApi"
import { RESPONSE_STATUS_OK } from "../helper/constants"
import createDataContext from "./createDataContext"

const WHReducer = (state, action) => {
    switch (action.type) {
        case 'load':
            console.log('payload wh', action.payload)
            return { ...state, whList: action.payload }
    }
}

const loadWH = dispatch => async () => {
    const response = await defaultApi.get('wh')
    if (response.status === RESPONSE_STATUS_OK) {
        console.log('repsonse wh ', response.data.data)
        dispatch({ type: 'load', payload: response.data.data })
    }
}

export const { Context, Provider } = createDataContext(
    WHReducer,
    {
        loadWH
    },
    { whList: null }
)