import React from 'react'
import {useState} from 'react'
//import FeverChart from './components/FeverChart';



async function registerUser(event) {
    event.preventDefault()
    fetch('http://localhost:3000')
}
const App = () => {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
            </form>
        </div>
    );
}

export default App;