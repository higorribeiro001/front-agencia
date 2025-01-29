import axios from 'axios';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const config = {headers: { 'Accept': 'application/json' }};

export async function login(email: string, password: string) {
    return await axios.post(url+'/login', { email, password }, config);
}