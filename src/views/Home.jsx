import { useContext, useState, useLayoutEffect, useEffect } from "react";
import { AppContext } from "../App";
import { getUserProjectsRequest } from "../services/user-requests";
import { addProjectRequest, deleteProjectRequest, updateProjectRequest } from "../services/projects-requests";
import { Container, } from "@mui/material";
import { ProjectForm } from "../components/forms/ProjectForm";
import { useNavigate } from "react-router-dom";
import { BaseModal } from "../components/Modal";
import { AlertModal } from "../components/Alert";
import { ProjectCard } from "../components/Cards";

export function Home(){
    const navigate = useNavigate()

    const { userDataInStorage } = useContext(AppContext);
    const { user_id } = userDataInStorage;

    const [userProjects, setUserProjects] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});

    const getUserProjects = () => {
        return getUserProjectsRequest(user_id)   
            .then(res => setUserProjects(res))
    }

    const addProject = (name, description) => {
        return addProjectRequest(name, description, user_id)
            .then(getUserProjects);
    }

    const onUpdateProject = (project) => {
        setModalOpen(true)
        setSelectedProject(project);
    }

    const onDeleteProject = (project) => {
        setAlertOpen(true);
        setSelectedProject(project);
    }

    const submitDelete = () => {
        return deleteProjectRequest(selectedProject.id)
            .then(() => {
                getUserProjects()
                setAlertOpen(false);
            });
    }

    useLayoutEffect(() => {
        getUserProjects();
    }, [])
    
    useEffect(() => {
        if(!userDataInStorage) return navigate('/')
    }, [userDataInStorage])

    return (
        <>
            <UpdateProjectModal 
                project={selectedProject} 
                onClose={() => setModalOpen(false)} 
                open={modalOpen}
                onSubmit={() => {
                    setModalOpen(false);
                    getUserProjects();                    
                }}
            />
            <AlertModal 
                open={alertOpen} 
                onClose={() => setAlertOpen(false)} 
                onConfirm={submitDelete}
            >
                <h2>Are you sure you want to delete this project</h2>
            </AlertModal>
            <h1>Welcome {userDataInStorage.username} </h1>
            <ProjectForm onSubmit={addProject}/>
            <Container sx={styles.flexRow}>
                {userProjects && userProjects.length > 0 
                    ? userProjects.map((project, index) => (
                        <ProjectCard 
                            onDelete={() => onDeleteProject(project)} 
                            onUpdate={() => onUpdateProject(project)}
                            project={project} 
                            key={index}
                        />
                    ))
                    : <h3>Not projects yet</h3>
                }
            </Container>
        </>
    )
}

const UpdateProjectModal = ({ project, open, onClose, onSubmit }) => {

    const onSubmitProjectForm = (name, description) => {
        return updateProjectRequest(name, description, project.id)
            .then(onSubmit);
    }

    return (
        <BaseModal open={open} onClose={onClose}>
            <ProjectForm defaults={project} onSubmit={onSubmitProjectForm}/>
        </BaseModal>
    )
}   

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
}