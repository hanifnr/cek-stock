import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

export const loginApi = axios.create({
    baseURL: 'https://provision.beecloud.id'
})

export const defaultApi = axios.create({
    baseURL: 'https://api.beecloud.id/api/v1'
    // baseURL: 'http://dev.beecloud.id/api'
})

defaultApi.interceptors.request.use(
    async config => {
        const bearer = await AsyncStorage.getItem('apikey');
        if (bearer) {
            config.headers.Authorization = `Bearer ${bearer}`;
        }
        return config;
    },
    err => {
        console.log('provApi err', err);
        return Promise.reject(err);
    },
);
