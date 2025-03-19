import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function categoryItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/category-items/`, configAuth());
    return response.data;
}
