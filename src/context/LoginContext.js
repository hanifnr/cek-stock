import AsyncStorage from "@react-native-community/async-storage"
import { loginApi } from "../api/BApi"
import { navigate } from "../../navigationRef"
import createDataContext from "./createDataContext"

const loginReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                dblist: action.payload
            }
        case 'error':
            return {
                ...state,
                errMsg: action.payload
            }
        case 'clear':
            return {
                ...state,
                errMsg: ''
            }
        default:
            return state
    }
}

const doLogin = dispatch => async (username, password, onSuccess, onFailure) => {
    try {
        const response = await loginApi.post('/v1/auth/loginmobile', { username, password })
        console.log('response login', response.data.status)
        if (response.data.db) {
            await AsyncStorage.setItem('username', username)
            navigate('DB')
            dispatch({
                type: 'login',
                payload: response.data.db
            })
            onSuccess()
        } else if (response.data.status === 'error') {
            dispatch({
                type: 'error',
                payload: response.data.msg
            })
            onFailure()
        }
    } catch (error) {
        console.log(error)
    }
}

const clearError = dispatch => () => {
    dispatch({ type: 'clear' })
}

export const { Context, Provider } = createDataContext(
    loginReducer,
    {
        doLogin,
        clearError
    },
    { dblist: null, errMsg: '' }
)