import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {headers: { 'Accept': 'application/json' }};
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function login(email: string, password: string) {
    const response: { data: { access: string }, status: number } = await axios.post(url+'/login', { email, password }, config);

    if (response.status === 200) {
        setCookie('access', response.data['access']);
    }

    return response;
}

export async function me() {
    const response: { data: { name: string, role: string }, status: number } = await axios.get(url+'/me', configAuth());

    if (response.status === 200) {
        setCookie('role', response.data.role);
        return response.data;
    }
}

export async function logout() {
    const response: { status: number } = await axios.get(url+'/logout', configAuth());

    if (response.status === 200) {
        deleteCookie('access');
    }

    return response
}