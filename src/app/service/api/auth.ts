import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {headers: { 'Accept': 'application/json' }};
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function login(email: string, password: string) {
    const response: { data: { access: string, refresh: string }, status: number } = await axios.post(url+'/auth/api/v1/login/', { email, password }, config);

    if (response.status === 200) {
        deleteCookie('statusMe');
        setCookie('access', response.data['access']);
        setCookie('refresh', response.data['refresh']);
    } 

    return response;
}

export async function me() {
    try {
        const response: { data: { name: string, role: string }, status: number } = await axios.get(url+'/auth/api/v1/profile/', configAuth());
    
        if (response.status === 200) {
            setCookie('role', response.data.role);
            return response.data;
        } 
    } catch (e) {
        const error = e as StatusResponse;
        setCookie('statusMe', error.response.status);
    }
}

export async function logout() {
    const refresh = getCookie('refresh');
    const response: { status: number } = await axios.post(url+'/auth/api/v1/logout/', {refresh}, configAuth());

    if (response.status === 200) {
        deleteCookie('access');
        window.location.reload();
    }

    return response
}