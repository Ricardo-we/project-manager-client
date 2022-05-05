import { useState } from "react";
import { Card, CardContent, CardHeader, Typography,  Button, CardActions } from "@mui/material"
import { useEffect } from "react";
import { getDatesDifference } from "../services/date-functions";
import { TaskFloatingMenu, FloatingMenu } from "./FloatingMenu";
import { Link } from 'react-router-dom';

export const TaskCard = ({ task, onDelete, onUpdate, onCheck=()=>{} }) => {
    const taskDate = task.taskTimeEnd ? task.taskTimeEnd.split('T')[0] : null;
    const currentDate = (new Date()).toISOString().split('T')[0];
    const [taskDatePass, setTaskDatePass] = useState(false);

    useEffect(() =>{
        const taskAlreadyPass = getDatesDifference(taskDate, currentDate)
        setTaskDatePass(taskAlreadyPass);
    }, [task])

    return (
        <Card sx={{minWidth: 150,width: 270, margin: 3}}>
            <CardHeader
                action={
                    <TaskFloatingMenu 
                        onDelete={onDelete} 
                        onUpdate={onUpdate} 
                        task={task} 
                        onCheck={onCheck}
                    />
                }
                title={task.name}
            />

            <CardContent>
                <Typography variant="p" fontSize={19}>{task.description}</Typography>
                <Typography variant="subtitle2" color={taskDatePass ? "red" : "primary"}>
                    Task date end: {taskDate && taskDate}
                </Typography>
            </CardContent>
        </Card>        
    )
}

export const ProjectCard = ({ project, onDelete, onUpdate }) => {
    return (
        <Card style={{minWidth: 200, width: 300, margin: 10}}>
            <CardHeader
                action={
                    <FloatingMenu 
                        onDelete={onDelete} 
                        onUpdate={onUpdate} 
                    />
                } 
                title={project.name}
            />
            <CardContent>
                {/* <Typography variant="h5">{project.name}</Typography> */}
                <Typography variant="body2">{project.description}</Typography>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold', textDecoration: 'underline'}}>
                    Created at: {project.createdAt && project.createdAt.split('T')[0]}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/project/${project.id}`} variant="text">Go to project</Button>  
            </CardActions>
        </Card>
    )
}
