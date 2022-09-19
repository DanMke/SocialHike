import axios from 'axios';
import auth from '@react-native-firebase/auth';

const api = axios.create({
    baseURL: 'https://18.210.32.102:4000',
});

api.interceptors.request.use(async (config) => {
    const idToken = await auth().currentUser?.getIdToken(/* forceRefresh */ true);
    if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
});

export default api;