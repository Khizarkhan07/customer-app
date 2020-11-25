import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {CustomerProvider} from "./contexts/customerContext";
import {SalesProvider} from "./contexts/salesContext";
import {CategoryProvider} from "./contexts/categoriesContext";
import { unstable_Profiler as Profiler } from "react";
import { render } from "react-dom";
import { unstable_trace as trace } from "scheduler/tracing";
import {callback} from "./utils";


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



