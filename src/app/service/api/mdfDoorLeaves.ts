import axios from 'axios';
import { getCookie } from 'cookies-next';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const configAuth = () => {
    const token = getCookie('access');
    return {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token}}
}

export async function mdfDoorLeaves(page: number) {
    const response: { data: MdfDoorLeavesInterface, status: number } = await axios.get(url+`/mdf-door-leaves?page=${page}`, configAuth());
    return response.data;
}

export async function mdfDoorLeave(id: string) {
    const response: { data: MdfDoorLeaveInterface, status: number } = await axios.get(url+`/mdf-door-leaves/${id}`, configAuth());
    return response.data;
}