import { AUTH_URLS } from '@/config/apiUrls';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/constants';
import api from '@/config/apiInterceptor';


export const login = async (user) => {
    try {
        const response = await api.post(AUTH_URLS.LOGIN, user);
        if (response.data) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        }
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }

};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
        const response = await api.post(AUTH_URLS.REFRESH, { refresh: refreshToken });
        if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            return response.data.access;
        }
        return null;
    } catch (err) {
        console.error('Error refreshing token', err);
        throw err;
    }
};


export const registerUser = async (user) => {
    try {
        const response = await api.post(AUTH_URLS.REGISTER, user);
        return response;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};


export const logout = async () => {
    try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        console.log(refreshToken)
        const response = await api.post(AUTH_URLS.LOGOUT, { refresh: refreshToken });
        console.log(response)
        if (response) {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
        }

        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }

};


export const activateAccount = async (data) => {
    try {
        const response = await api.post(AUTH_URLS.ACTIVATE, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const forgotPassword = async (data) => {
    try {
        const response = await api.post(AUTH_URLS.FORGOT_PASSWORD, data.email);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const resetPassword = async (data) => {
    console.log("Data:", data)
    try {
        const response = await api.post(AUTH_URLS.RESET_PASSWORD, data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



