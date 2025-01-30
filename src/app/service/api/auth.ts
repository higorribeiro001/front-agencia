import axios from 'axios';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {headers: { 'Accept': 'application/json' }};
const configAuth = {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer'+localStorage.getItem('access') }};

export async function login(email: string, password: string) {
    const response: { data: { access: string }, status: number } = await axios.post(url+'/login', { email, password }, config);

    if (response.status === 200) {
        localStorage.setItem('access', response.data['access']);
    }

    return response;
}

export async function me() {
    const response: { data: { name: string }, status: number } = await axios.get(url+'/me', configAuth);

    if (response.status === 200) {
        return response.data;
    }
}