import React from 'react'
import FeverChart from './components/FeverChart';

const App = () => {
    return (
        <div>
            <h1>Virtual Project Management</h1>
            <div class="chart-container" style={{position: 'relative', height: '20vh', width: '40vw'}}>
                <FeverChart/>
            </div>
        </div>
    );
}

export default App;