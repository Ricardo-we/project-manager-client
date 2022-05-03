import axios from "axios";
import { API_URL } from './config';

const ENDPOINT = `${API_URL}/projects`;

export async function getProjectRequest(){
    const response = await axios.get(ENDPOINT);
    return response.data
}

export async function addProjectRequest(name, description, user_id){
    const response = await axios.post(ENDPOINT, { name, description, user_id });
    return response.data;
}

export async function updateProjectRequest(name, description, projectId){
    const response = await axios.put(`${ENDPOINT}/${projectId}`, { name, description });
    return response.data;
}

export async function deleteProjectRequest(projectId){
    const response = await axios.delete(`${ENDPOINT}/${projectId}`);
    return response.data;
}

export async function getProjectTasksRequest(projectId){
    const response = await axios.get(`${ENDPOINT}/${projectId}/tasks`);
    return response.data;
}
