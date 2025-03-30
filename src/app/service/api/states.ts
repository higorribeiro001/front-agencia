import axios from 'axios';

export async function getStates() {
    try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        if (response.status === 200) {
            return response.data
        }
    } catch {
        return []
    }
}