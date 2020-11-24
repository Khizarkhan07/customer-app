import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import {InitialState} from "../../types";
import { RouteComponentProps } from 'react-router-dom';
import {getCustomers, storeCustomers} from "../../utils";
import {useCustomerContext} from "../../contexts/customerContext";

const EditCustomer: React.FC<RouteComponentProps<any>> =  (props)  =>{
    const {state, dispatch} = useCustomerContext();
    const [loading, setLoading] = useState<boolean>(false)
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [customer, setCustomer] = useState<InitialState>({})


    const [stateValue, setStateValue] = useState({
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        description: customer.description
    })

    const handleChange =  useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setStateValue({
            ...stateValue,
            [e.target.name]: value
        });
    },[stateValue])

    useEffect(()=> {
        if(getCustomers() === null) {
            storeCustomers(state)
        }
        else {
            const data = getCustomers()
            dispatch({type: 'CURRENT_CUSTOMERS', payload: data})

            singleCustomer(props.match.params.id)
        }
    },[])


    const singleCustomer = (id: number) => {
        for (let i= 0; i< state.customer.length; i++) {
            if(state.customer[i].id == id){
                setCustomer(state.customer[i])
            }
        }
    }

    const processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);




        dispatch({type: 'EDIT_CUSTOMER' , payload: {
                id : props.match.params.id,
                first_name: stateValue.firstName,
                last_name: stateValue.lastName,
                email: stateValue.email,
                phone: stateValue.phone,
                address: stateValue.address,
                description: stateValue.description,

            }})
        window.location.href='/';

    }

    return (
        <div className="App">
            {customer &&
            <div>

                <div>
                    <div className={"col-md-12 form-wrapper"}>
                        <h2> Edit Customer </h2>

                        {submitSuccess && (
                            <div className="alert alert-info" role="alert">
                                Customer's details has been edited successfully </div>
                        )}

                        <form id={"create-post-form"} onSubmit={processFormSubmission} noValidate={true}>
                            <div className="form-group col-md-12">
                                <label htmlFor="first_name"> First Name </label>
                                <input type="text" id="first_name" defaultValue= {customer.first_name as string} onChange={handleChange} name="firstName" className="form-control" placeholder="Enter customer's first name" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="last_name"> Last Name </label>
                                <input type="text" id="last_name" defaultValue ={customer.last_name as string} onChange={handleChange} name="lastName" className="form-control" placeholder="Enter customer's last name" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="email"> Email </label>
                                <input type="email" id="email" defaultValue={customer.email as string} onChange={handleChange} name="email" className="form-control" placeholder="Enter customer's email address" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="phone"> Phone </label>
                                <input type="text" id="phone" defaultValue={customer.phone as string} onChange={handleChange} name="phone" className="form-control" placeholder="Enter customer's phone number" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address"> Address </label>
                                <input type="text" id="address" defaultValue={customer.address as string} onChange={handleChange} name="address" className="form-control" placeholder="Enter customer's address" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="description"> Description </label>
                                <input type="text" id="description" defaultValue={customer.description as string} onChange={handleChange} name="description" className="form-control" placeholder="Enter Description" />
                            </div>

                            <div className="form-group col-md-4 pull-right">
                                <button className="btn btn-success" type="submit">
                                    Edit Customer </button>
                                {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default EditCustomer;