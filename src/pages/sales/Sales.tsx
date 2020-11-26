import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {getCategories, getCustomers, getData, storeCat, storeCustomers, storeData} from "../../utils";
import {useSalesContext} from "../../contexts/salesContext";
import {Button} from "../../components/Button";
import Categories from "../category/Categories";
import { CategoryType} from "../../types";
import { Drawer, message } from 'antd';
import 'antd/dist/antd.css';
import {useCustomerContext} from "../../contexts/customerContext";
import {useCategoryContext} from "../../contexts/categoriesContext";
import SalesData from "./SaleData";
import SaleDrawer from "./SaleDrawer";


const Sales: React.FC = () =>{

    const {state , dispatch } = useCustomerContext();
    const {salesState, salesDispatch} = useSalesContext();
    const {categoryState, categoryDispatch} = useCategoryContext();


    useEffect(()=> {

        if(!getData()) {
            storeData(salesState)
        }
        else {
            const data = getData()
            salesDispatch( {type: 'CURRENT_SALES', payload: {data}})
        }
        if(!getCustomers()) {
            storeCustomers(state)
        }
        else {
            const data = getCustomers()
            dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: data })

        }
        if (getCategories() === false) {
            storeCat(categoryState)
        } else {
            const data = getCategories();
            categoryDispatch({type: 'CURRENT_CATEGORIES', payload: {data}})
        }
    }, [])



    return (

        <div>

            {salesState && salesState.length === 0 && (
                <div className="text-center">
                    <h2>No sale found at the moment</h2>
                </div>
            )}

            <div className="container">

                <Categories categories={categoryState.categories}/>

                <hr/>
                <SaleDrawer/>
                <SalesData sales={salesState}/>
            </div>

        </div>

    );
}

export default Sales;