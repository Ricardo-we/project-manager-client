import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import './../css/NavBar.css';
import { AppContext } from './../App';

export function NavBar() {
    const [navOpen, setNavOpen] = useState(false);
    const { setUserDataInStorage } = useContext(AppContext);
    const navigate = useNavigate();

    const onLogout = () => {
        setUserDataInStorage(prev => {
            navigate('/')
            return {}
        })
    }

    return (
        <nav className="navbar">
            <button className="toggle-button" onClick={() => setNavOpen(prev => !prev)}>
                <MenuIcon />
            </button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Project manager
            </Typography>
            <div className={navOpen ? "nav-collapse-container navbar-open" : "nav-collapse-container"}>
                <Button color="inherit" component={Link} to="/home">My Projects</Button>
                <Button color="info" onClick={onLogout}>Logout</Button>
            </div>
        </nav>
    )
}