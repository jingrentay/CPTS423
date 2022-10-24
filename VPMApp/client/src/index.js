import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import reducers from './reducers'

const store = configureStore({
    reducer: reducers,
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

