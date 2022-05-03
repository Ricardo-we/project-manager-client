import axios from 'axios';
import { API_URL } from './config';

const ENDPOINT = `${API_URL}/users`;

export async function loginUserRequest(username, password){
    const userData = { username, password }
    const response = await axios.post(`${ENDPOINT}/login`, userData);
    return response.data;
}

export async function createUserRequest(username, password){
    const userData = { username, password };
    const response = await axios.post(ENDPOINT, userData);
    return response.data;
}

export async function getUserProjectsRequest(user_id){
    const response = await axios.get(`${ENDPOINT}/${user_id}/projects`)
    return response.data;
}
