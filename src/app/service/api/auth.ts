import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {headers: { 'Accept': 'application/json' }};
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token, "ngrok-skip-browser-warning": true,}}
}

export async function login(email: string, password: string) {
    const response: { data: { access: string, refresh: string }, status: number } = await axios.post(url+'/login', { email, password }, config);

    if (response.status === 200) {
        deleteCookie('statusMe');
        setCookie('access', response.data['access']);
        const user = await me();
        setCookie('role', user?.role);
    } 

    return response;
}

export async function me() {
    try {
        const response: { data: UserInterface, status: number } = await axios.get(url+'/me', configAuth());
    
        if (response.status === 200) {
            setCookie('role', response.data.role);
            return response.data;
        } 
    } catch (e) {
        const error = e as StatusResponse;
        if (error.response.status === 401) {
            deleteCookie('access');
            deleteCookie('role');
            setCookie('statusMe', error.response.status);
            window.location.reload();
        }
    }
}

export async function logout() {
    const response: { status: number } = await axios.get(url+'/logout', configAuth());

    if (response.status === 200) {
        deleteCookie('access');
        deleteCookie('role');
        window.location.reload();
    }

    return response
}