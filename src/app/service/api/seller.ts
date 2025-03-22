import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function sellerItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/seller-items/`, configAuth());
    return response.data;
}

export async function sellers(page: number) {
    try {
        const response: { data: SellersInterface, status: number } = await axios.get(url+`/seller/?page=${page}`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        setCookie('statusMe', error.response.status);
        window.location.reload();
    }
}

export async function seller(id: string) {
    const response: { data: SellerInterface, status: number } = await axios.get(url+`/seller/${id}/`, configAuth());
    return response.data;
}

export async function sellerFindByName(name: string) {
    const response: { data: SellerInterface[], status: number } = await axios.get(url+`/seller/${name}`, configAuth());
    return response.data;
}

export async function deleteSeller(id: string) {
    const response: { data: SellerInterface, status: number } = await axios.delete(url+`/seller/${id}/`, configAuth());
    return response;
}

export async function postSeller(dataSeller: RegisterInterface) {
    const {
        nome
    } = dataSeller;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/seller`, {
        nome
    }, configAuth());
    return response;
}

export async function putSeller(dataSeller: EditInterface) {
    const {
        id,
        nome
    } = dataSeller;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/seller/${id}/`, {
        nome
    }, configAuth());
    return response;
}