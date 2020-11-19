import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useCustomerContext} from "../../contexts/customerContext";
import {useSalesContext} from "../../contexts/salesContext";
import axios from "axios";


const CreateSale: React.FC = () =>  {
    const {state , dispatch } = useCustomerContext();
    const {salesState, salesDispatch} = useSalesContext();

    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [customerId, setCustomerId] = useState('')

    useEffect(()=> {
        axios.get(`http://localhost:5000/customers`).then(data => {
            dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: data.data })
        })
    },[])

    const customerOptions = useMemo(() => {
        return state.map(customer => (
            <option key={customer.id} value={customer.id}>
                {customer.first_name+ " - " + customer.id}
            </option>
        ))
    }, [state]);

    const handleCustomer = useCallback((e:React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerId(e.target.value);
    }, [])
    const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, [name])


    const handlePrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    }, [price])

    const handleDescription = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }, [description])




    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true)
        const data = {
            product_name: name,
            price: price,
            description: description,
            customer_id: customerId
        }
        salesDispatch({type: 'CREATE_SALE', payload: {data}})
        window.location.href ='/'
        setSubmitSuccess(true);
        setLoading(false)

    }



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
                        <input type="text" id="product_name" onChange={handleName} name="product_name" className="form-control" placeholder="Enter product name" />
                    </div>


                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Price </label>
                        <input type="number" id="price" onChange={handlePrice} name="price" className="form-control" placeholder="Enter Price" />
                    </div>


                    <div className="form-group col-md-12">
                        <label htmlFor="description"> Description </label>
                        <input type="text" id="description" onChange={handleDescription} name="description" className="form-control" placeholder="Enter Description" />
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="customers"> Customer </label>
                        <select className={"form-control"} placeholder={"select customer"} value={customerId} onChange={handleCustomer} >
                            <option value="" disabled={true}> select customer</option>
                            {customerOptions}
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