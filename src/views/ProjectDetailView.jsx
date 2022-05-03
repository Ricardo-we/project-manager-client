import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectTasksRequest } from "./../services/projects-requests.js";
import { addTaskRequest, deleteTaskRequest, updateTaskRequest } from "../services/tasks-requests.js";
import { TaskForm } from "../components/forms/TaskForm.jsx";
import { TaskCard } from "../components/Cards.jsx";
import { ContainerFlex } from "../components/styled-components/ContainerFlex.jsx";
import { BaseModal } from "../components/Modal.jsx";
import { AlertModal } from "../components/Alert.jsx";

export function ProjectDetailView(){
    const { projectId } = useParams();

    const [projectTasks, setProjectTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const getProjectTasks = () => {
        getProjectTasksRequest(projectId)
            .then(res => setProjectTasks(res))
    }

    const addTask = (name, description, formatDate) => {
        addTaskRequest(name, description, formatDate, projectId)
            .then(getProjectTasks);
    }

    const deleteTask = () => {
        deleteTaskRequest(selectedTask.id)
            .then(getProjectTasks);
        setAlertOpen(false);
    }

    const onOpenUpdateModal = (task) => {
        setSelectedTask(task);
        setModalOpen(true);
    }

    const onOpenAlert = (task) => {
        setSelectedTask(task);
        setAlertOpen(true);
    }

    const onCloseModal = () => {
        setModalOpen(false);
        getProjectTasks();
    }

    const onCheckTask = (checked, task_id) => {
        updateTaskRequest(checked, undefined, undefined, undefined, task_id);
    }

    useLayoutEffect(() => {
        getProjectTasks();
    }, [])

    return (
        <>
            <TaskForm projectId={projectId} onSubmit={addTask}/>
            <UpdateTaskModal task={selectedTask} open={modalOpen} onClose={onCloseModal}/>
            <AlertModal open={alertOpen} onClose={() => setAlertOpen(false)} onConfirm={deleteTask}>
                <h2>Are you sure you want to delete this task</h2>
            </AlertModal>
            <ContainerFlex>
                {projectTasks && projectTasks.length > 0 ? 
                    projectTasks.map((task, index)=> (
                            <TaskCard 
                                key={index} 
                                onDelete={() => onOpenAlert(task)}
                                onUpdate={() => onOpenUpdateModal(task)} 
                                onCheck={onCheckTask}
                                task={task}
                            />
                    ))
                    : <h3>No tasks yet </h3>
                }
            </ContainerFlex>
        </>
    )
}

const UpdateTaskModal = ({ open, onClose, task }) => {

    const updateTask = (name, description, formatDate) => {
        updateTaskRequest(task.done, name, description, formatDate, task.id)
            .then(onClose);
    }

    return (
        <BaseModal open={open} onClose={onClose}>
            <TaskForm defaults={task} onSubmit={updateTask}/>
        </BaseModal>
    )
}

