import React from 'react'
import FeverChart from '../components/FeverChart'
import Navigation from '../components/Navigation'

const ProjectHomePage = () => {
    return (
        <div>
            <Navigation/>
            <div style={{ paddingLeft: '200px', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div class="chart-container" style={{ position: 'relative', height: '20vh', width: '40vw' }}>
                    <FeverChart/>
                </div>
            </div>
        </div>
    );
}

export default ProjectHomePage;