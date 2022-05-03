import { useState, useEffect } from "react";
import { Menu, IconButton, MenuItem, Checkbox } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";

export const TaskFloatingMenu = ({ onDelete, onUpdate, onCheck, task }) => {
    const [checked, setChecked] = useState(task.done)

    const onCheckChange = () => {
        setChecked(prev => {
            onCheck(!prev, task.id);
            return !prev
        });
    }   

    useEffect(() => {
        setChecked(task.done)
    }, [task.done])

    return (
        <div>
            <FloatingMenu onDelete={onDelete} onUpdate={onUpdate}/>
            <Checkbox disabled={!task ? true : false} checked={checked} onChange={onCheckChange}/>
        </div>
    )
}

export const FloatingMenu = ({ onDelete, onUpdate, }) => {
    return (
        <>
            <IconButton onClick={onDelete}>
                <Delete/>
            </IconButton>
            <IconButton onClick={onUpdate}>
                <Edit/>
            </IconButton>
        </>
    )
}