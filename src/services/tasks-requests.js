import axios from "axios";
import { API_URL } from "./config";

const ENDPOINT = `${API_URL}/tasks`;

export async function addTaskRequest(name, description, taskTimeEnd, project_id){
    const response = await axios.post(ENDPOINT, { name, description, taskTimeEnd, project_id });
    return response.data;
}

export async function getTaskRequest(task_id){
    const response = await axios.get(`${ENDPOINT}/${task_id}`);
    return response.data
}

export async function deleteTaskRequest(task_id){
    const response = await axios.delete(`${ENDPOINT}/${task_id}`);
    return response.data
}

export async function updateTaskRequest(done, name, description, taskTimeEnd, task_id){
    console.log(done)
    const response = await axios.put(`${ENDPOINT}/${task_id}`, { name, description, taskTimeEnd, done });
    return response.data;
}