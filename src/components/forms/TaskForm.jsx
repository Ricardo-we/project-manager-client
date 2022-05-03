import { useState, useEffect } from "react";
import { FormControl, FormGroup, TextField, Button } from "@mui/material";

export const TaskForm = ({ defaults={}, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [taskTimeEnd, setTaskTimeEnd] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        const formatDate = (new Date(taskTimeEnd)).toISOString().split('T')[0];
        onSubmit(name, description, formatDate);
    }

    const handleDefaultValues = () => {
        if(!defaults.name || !defaults.description || !defaults.taskTimeEnd) return
        setName(defaults.name);
        setDescription(defaults.description);
        setTaskTimeEnd(defaults.taskTimeEnd.split('T')[0]);
    }

    useEffect(() => {
        handleDefaultValues();
    }, [defaults])

    return(
        <form onSubmit={onFormSubmit}>
            <FormGroup>
                <FormControl>
                    <TextField 
                        placeholder="Task Name" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <TextField 
                        placeholder="Task Description" 
                        multiline 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <TextField 
                        placeholder="Task Date end" 
                        type="date"
                        value={taskTimeEnd}
                        onChange={e => setTaskTimeEnd(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" color="info" variant="outlined">SUBMIT</Button>
            </FormGroup>
        </form>
    )
}