import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {CustomerProvider} from "./contexts/customerContext";
import {SalesProvider} from "./contexts/salesContext";

ReactDOM.render(
    <BrowserRouter>
        <CustomerProvider>
            <SalesProvider>
                <App />
            </SalesProvider>
        </CustomerProvider>
    </BrowserRouter>
    , document.getElementById('root')
);


