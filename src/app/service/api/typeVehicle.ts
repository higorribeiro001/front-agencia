import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token, "ngrok-skip-browser-warning": "69420"}}
}

export async function typeVehicleItems() {
    const response: { data: Model[], status: number } = await axios.get(url+`/type-vehicle-items/`, configAuth());
    return response.data;
}

export async function typeVehicles(page: number) {
    try {
        const response: { data: TypeVehiclesInterface, status: number } = await axios.get(url+`/type-vehicle/?page=${page}`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        if (error.response.status === 401) {
            deleteCookie('access');
            setCookie('statusMe', error.response.status);
            window.location.reload();
        }
    }
}

export async function typeVehicle(id: string) {
    try {
        const response: { data: TypeVehicleInterface, status: number } = await axios.get(url+`/type-vehicle/${id}/`, configAuth());
        return response.data;
    } catch(e: unknown) {
        const error = e as StatusResponse;
        if (error.response.status === 401) {
            deleteCookie('access');
            setCookie('statusMe', error.response.status);
            window.location.reload();
        }
    }
}

export async function typeVehicleFindByName(name: string) {
    const response: { data: TypeVehicleInterface[], status: number } = await axios.get(url+`/type-vehicle/${name}`, configAuth());
    return response.data;
}

export async function deleteTypeVehicle(id: string) {
    const response: { data: TypeVehicleInterface, status: number } = await axios.delete(url+`/type-vehicle/${id}/`, configAuth());
    return response;
}

export async function postTypeVehicle(dataTypeVehicle: RegisterInterface) {
    const {
        nome
    } = dataTypeVehicle;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/type-vehicle`, {
        nome
    }, configAuth());
    return response;
}

export async function putTypeVehicle(dataTypeVehicle: EditInterface) {
    const {
        id,
        nome
    } = dataTypeVehicle;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/type-vehicle/${id}/`, {
        nome
    }, configAuth());
    return response;
}

