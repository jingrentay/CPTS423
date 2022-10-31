import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getProjects } from './actions/projectActions'
import LoginPage from './pages/Login/LoginPage'
import ProjectHomePage from './pages/Projects/ProjectHomePage'
import ProjectFormPage from './pages/Projects/ProjectFormPage'
import ProjectViewPage from './pages/Projects/ProjectViewPage'
import ProjectEditPage from './pages/Projects/ProjectEditPage'
import ArchivePage from './pages/Archive/ArchivePage'
import ErrorPage from './pages/ErrorPage'


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="projects" element={<ProjectHomePage />}/>
                <Route path="projects/create" element={<ProjectFormPage />}/>
                <Route path="projects/view" element={<ProjectViewPage />}/>
                <Route path="projects/edit" element={<ProjectEditPage/>}/>
                <Route path="archive" element={<ArchivePage />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;