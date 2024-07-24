
const originalConsoleWarn = console.warn;

console.warn = (...args) => {
    if (args[0] && args[0].includes('Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>')) {
        // Ignore this specific warning
        return;
    }
    // Call the original console.warn for other warnings
    originalConsoleWarn(...args);
};

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>,
)
