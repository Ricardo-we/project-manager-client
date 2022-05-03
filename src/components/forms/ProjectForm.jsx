import { useState, useEffect } from "react";
import { FormGroup, FormControl, TextField, Button } from "@mui/material";

export const ProjectForm = ({ defaults={}, onSubmit }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        onSubmit(projectName, projectDescription);
    }

    useEffect(() => {
        if(!(defaults.name || defaults.description)) return
        setProjectName(defaults.name);
        setProjectDescription(defaults.description)
    }, [defaults])

    return (
        <form onSubmit={onFormSubmit}>
            <FormGroup>
                <FormControl>
                    <TextField 
                        placeholder="Name" 
                        value={projectName} 
                        onChange={e => setProjectName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <TextField 
                        placeholder="Description" 
                        multiline 
                        value={projectDescription} 
                        onChange={e => setProjectDescription(e.target.value)}
                    />
                </FormControl>
                <Button type="submit" color="info" variant="outlined">SUBMIT</Button>
            </FormGroup>
        </form>
    )
}