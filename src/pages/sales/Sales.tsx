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


const Sales: React.FC = () =>{

    const {state , dispatch } = useCustomerContext();
    const {salesState, salesDispatch} = useSalesContext();
    const {categoryState, categoryDispatch} = useCategoryContext();

    const [stateValue, setStateValue] = React.useState({
        name: "",
        price: "",
        description: "",
        customerId: ""
    })

    const [visible, setVisible] = useState<boolean>(false);

    const toggleDrawer = useCallback(() => {
        setVisible(!visible);
    }, [visible])


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

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setStateValue({
            ...stateValue,
            [e.target.name]: value
        });
    }

    const customerOptions = useMemo(() => {
            return state.customer.map(customer => (
                <option key={customer.id} value={customer.id}>
                    {customer.first_name+ " - " + customer.id}
                </option>
            ))

    }, [state]);



    const processFormSubmission = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const data = {
            product_name: stateValue.name,
            price: stateValue.price,
            description: stateValue.description,
            customer_id: stateValue.customerId
        }
        salesDispatch({type: 'CREATE_SALE', payload: {data}})
        message.success("Sale created!")
        setVisible(false);

    }, [stateValue])

    const categories = useMemo(()=> {
        return categoryState.categories.map((category: CategoryType) => {
            return <option key={category.id} value={category.id}>
                {category.name+ " - " + category.id}
            </option>

        });
    },[categoryState.categories])

    const createSaleButton = useMemo(()=> {
        return  <Button text={'Create Sale'} callback={toggleDrawer}/>
    },[true])

    const SaleDrawer = useMemo(()=> {
        return (
            <Drawer
                title="Create a new customer"
                width={720}
                onClose={toggleDrawer}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

            >


                <div className={"col-md-12 form-wrapper"}>

                    <form id={"create-post-form"} onSubmit={processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> Product Name </label>
                            <input type="text" id="product_name" onChange={handleChange} name="name" className="form-control" placeholder="Enter product name" />
                        </div>


                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Price </label>
                            <input type="number" id="price" onChange={handleChange} name="price" className="form-control" placeholder="Enter Price" />
                        </div>


                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={handleChange} name="description" className="form-control" placeholder="Enter Description" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="customers"> Customer </label>
                            <select name={"customerId"} className={"form-control"} placeholder={"select customer"} value={stateValue.customerId} onChange={handleChange} >
                                <option value="" disabled={true}> select customer</option>
                                {customerOptions}
                            </select>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="customers"> Category </label>
                            <select className={"form-control"} placeholder={"select customer"} value={""}  >
                                <option value="" disabled={true}> select category</option>
                                {categories}
                            </select>
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Product
                            </button>
                        </div>
                    </form>
                </div>
            </Drawer>
        )
    }, [visible])

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

                {createSaleButton}

                <SalesData sales={salesState}/>

                {SaleDrawer}
            </div>

        </div>

    );
}

export default Sales;