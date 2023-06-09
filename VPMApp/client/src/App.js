import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/Login/LoginPage'
import SignUpPage from './pages/Login/SignUpPage'
import SettingsPage from './pages/Settings/SettingsPage'

import ProjectHomePage from './pages/Projects/ProjectHomePage'
import ProjectFormPage from './pages/Projects/ProjectFormPage'
import ProjectEditPage from './pages/Projects/ProjectEditPage'
import ArchivePage from './pages/Archive/ArchivePage'
import ErrorPage from './pages/ErrorPage'

import ViewInPlanningPage from './pages/Projects/ViewInPlanning'
import ViewInProgressPage from './pages/Projects/ViewInProgress'
import ViewArchiveProjectPage from './pages/Archive/ViewArchive'

import Listing from './pages/Projects/ProjectForm'
import Detailpage from './pages/Projects/ProjectDetailsPage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/signup" element={<SignUpPage />}/>
                <Route path="projects" element={<ProjectHomePage />}/>
                <Route path="projects/create" element={<ProjectFormPage />}/>
                <Route path="projects/listing" element={<Listing />}/>
                <Route path="/details" element={<Detailpage />}/>
                <Route path="projects/view/planning/:id" element={<ViewInPlanningPage />}/>
                <Route path="projects/view/progress/:id" element={<ViewInProgressPage />}/>
                <Route path="projects/view/archive/:id" element={<ViewArchiveProjectPage />}/>
                <Route path="projects/edit/:id" element={<ProjectEditPage/>}/>
                <Route path="archive" element={<ArchivePage />}/>
                <Route path="/settings" element={<SettingsPage />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;