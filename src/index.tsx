import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {CustomerProvider} from "./contexts/customerContext";
import {SalesProvider} from "./contexts/salesContext";
import {CategoryProvider} from "./contexts/categoriesContext";
import { render } from "react-dom";

    render(
        <BrowserRouter>
            <CustomerProvider>
                <CategoryProvider>
                    <SalesProvider>
                        <App/>
                    </SalesProvider>
                </CategoryProvider>
            </CustomerProvider>
        </BrowserRouter>,
        document.getElementById('root')
    )



