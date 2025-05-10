import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token, "ngrok-skip-browser-warning": "69420"}}
}

export async function categoryItems() {
    try {
        const response: { data: Model[], status: number } = await axios.get(url+`/category-items/`, configAuth());
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

export async function categories(page: number) {
    try {
        const response: { data: CategoriesInterface, status: number } = await axios.get(url+`/category/?page=${page}`, configAuth());
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

export async function category(id: string) {
    try {
        const response: { data: CategoryInterface, status: number } = await axios.get(url+`/category/${id}/`, configAuth());
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

export async function categoryFindByName(name: string) {
    const response: { data: CategoryInterface[], status: number } = await axios.get(url+`/category/${name}`, configAuth());
    return response.data;
}

export async function deleteCategory(id: string) {
    const response: { data: CategoryInterface, status: number } = await axios.delete(url+`/category/${id}/`, configAuth());
    return response;
}

export async function postCategory(dataCategory: RegisterInterface) {
    const {
        nome
    } = dataCategory;
    const response: { data: RegisterInterface, status: number } = await axios.post(url+`/category`, {
        nome
    }, configAuth());
    return response;
}

export async function putCategory(dataCategory: EditInterface) {
    const {
        id,
        nome
    } = dataCategory;
    const response: { data: RegisterInterface, status: number } = await axios.put(url+`/category/${id}/`, {
        nome
    }, configAuth());
    return response;
}

