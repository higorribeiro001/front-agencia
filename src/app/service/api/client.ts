import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function clientItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/client-items/`, configAuth());
    return response.data;
}
