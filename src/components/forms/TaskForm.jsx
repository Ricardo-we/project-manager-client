import { useState, useEffect } from "react";
import { FormControl, CircularProgress, FormGroup, TextField, Button } from "@mui/material";

export const TaskForm = ({ defaults={}, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [taskTimeEnd, setTaskTimeEnd] = useState('');
    const [loading, setLoading] = useState(false);

    const onFormSubmit = e => {
        e.preventDefault();
        setLoading(true);
        const formatDate = (new Date(taskTimeEnd)).toISOString().split('T')[0];
        onSubmit(name, description, formatDate)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
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
                {   loading ? <Button color="info" disabled><CircularProgress/></Button>
                    :
                    <Button type="submit" color="info" variant="outlined">SUBMIT</Button>
                }
            </FormGroup>
        </form>
    )
}