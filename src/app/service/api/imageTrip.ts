import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    return {headers: { 
        'Accept': 'application/json', 
        // "ngrok-skip-browser-warning": true
    }}
}

export async function postImageTrip(formData: FormData) {
    const response: { data: ImageTrip, status: number } = await axios.post(url+`/api/v1/foto-viagens/`, formData, configAuth());
    return response;
}