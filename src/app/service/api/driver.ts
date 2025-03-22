import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function driverItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/driver-items/`, configAuth());
    return response.data;
}

export async function drivers(page: number) {
    try {
        const response: { data: DriversInterface, status: number } = await axios.get(url+`/driver/?page=${page}`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        setCookie('statusMe', error.response.status);
        window.location.reload();
    }
}

export async function driver(id: string) {
    const response: { data: DriverInterface, status: number } = await axios.get(url+`/driver/${id}/`, configAuth());
    return response.data;
}

export async function driverFindByName(name: string) {
    const response: { data: DriverInterface, status: number } = await axios.get(url+`/driver/${name}`, configAuth());
    return response.data;
}

export async function deleteDriver(id: string) {
    const response: { data: DriverInterface, status: number } = await axios.delete(url+`/driver/${id}/`, configAuth());
    return response;
}

export async function postDriver(dataDriver: RegisterInterface) {
    const {
        nome
    } = dataDriver;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/driver`, {
        nome
    }, configAuth());
    return response;
}

export async function putDriver(dataDriver: EditInterface) {
    const {
        id,
        nome
    } = dataDriver;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/driver/${id}/`, {
        nome
    }, configAuth());
    return response;
}
