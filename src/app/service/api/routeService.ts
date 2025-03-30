import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token, "ngrok-skip-browser-warning": true}}
}

export async function routeItems() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`/route-items/`, configAuth());
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

export async function routes(page: number) {
    try {
        const response: { data: RoutesInterface, status: number } = await axios.get(url+`/route/?page=${page}`, configAuth());
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

export async function route(id: string) {
    const response: { data: RouteInterface, status: number } = await axios.get(url+`/route/${id}/`, configAuth());
    return response.data;
}

export async function routeFindByName(name: string) {
    const response: { data: RouteInterface[], status: number } = await axios.get(url+`/route/${name}`, configAuth());
    return response.data;
}

export async function deleteRoute(id: string) {
    const response: { data: RouteInterface, status: number } = await axios.delete(url+`/route/${id}/`, configAuth());
    return response;
}

export async function postRoute(dataRoute: RegisterInterface) {
    const {
        nome
    } = dataRoute;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/route`, {
        nome
    }, configAuth());
    return response;
}

export async function putRoute(dataRoute: EditInterface) {
    const {
        id,
        nome
    } = dataRoute;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/route/${id}/`, {
        nome
    }, configAuth());
    return response;
}
