import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useCustomerContext} from "../../contexts/customerContext";
import {useSalesContext} from "../../contexts/salesContext";
import axios from "axios";
import {CategoryObjectType} from "../../types";
import {useCategoryContext} from "../../contexts/categoriesContext";

const CreateSale: React.FC = () =>  {
    const {state , dispatch } = useCustomerContext();
    const {salesState, salesDispatch} = useSalesContext();
    const {categoryState} = useCategoryContext();

    const [stateValue, setStateValue] = React.useState({
        name: "",
        price: "",
        description: "",
        customerId: ""
    })

    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(()=> {
        axios.get(`http://localhost:5000/customers`).then(data => {
            dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: data.data })
        })
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setStateValue({
            ...stateValue,
            [e.target.name]: value
        });
    }

    const customerOptions = useMemo(() => {
        return state.map(customer => (
            <option key={customer.id} value={customer.id}>
                {customer.first_name+ " - " + customer.id}
            </option>
        ))
    }, [state]);



    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true)
        const data = {
            product_name: stateValue.name,
            price: stateValue.price,
            description: stateValue.description,
            customer_id: stateValue.customerId
        }
        salesDispatch({type: 'CREATE_SALE', payload: {data}})
        window.location.href ='/sales'
        setSubmitSuccess(true);
        setLoading(false)

    }

    const categories = categoryState.totalCategories.map((catId: string) => {
            const category: CategoryObjectType = categoryState.categories[catId];

            return <option key={category.id} value={category.id}>
                    {category.name+ " - " + category.id}
                </option>


        });

    return (
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> Create sale </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new sale
                    </div>
                )}

                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}

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
                        {loading &&
                        <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSale;