import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import projectReducer from './features/projectSlice'
import accountReducer from './features/accountSlice'

const store = configureStore({
    reducer: {
        projects: projectReducer, 
        account: accountReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
