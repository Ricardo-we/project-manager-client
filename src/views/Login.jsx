import { useState, useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {  FormGroup, FormControl, TextField, Button, Container } from "@mui/material";
import { loginUserRequest, createUserRequest } from "../services/user-requests";
import { AppContext } from "../App";
import { useEffect } from "react";

export function Login({ ...props }){
    const { userDataInStorage, setUserDataInStorage } = useContext(AppContext);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = () => { 
        loginUserRequest(username, password)
            .then(res => setUserDataInStorage({ username: res.username, user_id:res.id }))
            .catch(error => console.log(error));
    }

    const submitCreateUser = () => {
        createUserRequest(username, password)
            .then(res => setUserDataInStorage({ username: res.username, user_id:res.id }))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        const { username, user_id } = userDataInStorage;
        if(username && user_id) navigate('/home');
    }, [userDataInStorage]) 

    return (
        <Container maxWidth="sm">
            <h1>Login to start your dream project!</h1>
            <FormGroup>
                <FormControl>
                    <TextField placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <TextField placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}/>
                </FormControl>
                <Button className="mt-2" onClick={submitLogin} variant="contained" color="primary">Login</Button>
                <Button className="mb-2" onClick={submitCreateUser} variant="outlined" color="info">Register</Button>
            </FormGroup>
        </Container>
    )
}
