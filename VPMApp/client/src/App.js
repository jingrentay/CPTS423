import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/Login/LoginPage'
import ProjectHomePage from './pages/Projects/ProjectHomePage'
import ProjectFormPage from './pages/Projects/ProjectFormPage'
import ProjectViewPage from './pages/Projects/ProjectViewPage'
import ProjectEditPage from './pages/Projects/ProjectEditPage'
import ArchivePage from './pages/Archive/ArchivePage'
import ErrorPage from './pages/ErrorPage'
import Listing from './pages/Projects/ProjectForm'
import Detailpage from './pages/Projects/ProjectDetailsPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="projects" element={<ProjectHomePage />}/>
                <Route path="projects/create" element={<ProjectFormPage />}/>
                <Route path="projects/listing" element={<Listing />}/>
                <Route path="/details" element={<Detailpage />}/>
                <Route path="projects/view/:id" element={<ProjectViewPage />}/>
                <Route path="projects/edit/:id" element={<ProjectEditPage/>}/>
                <Route path="archive" element={<ArchivePage />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;