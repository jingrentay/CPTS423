import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProjectHomePage from './pages/ProjectHomePage'
import ErrorPage from './pages/ErrorPage'



async function registerUser(event) {
    event.preventDefault()
    fetch('http://localhost:3000')
}
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="projects" element={<ProjectHomePage />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;