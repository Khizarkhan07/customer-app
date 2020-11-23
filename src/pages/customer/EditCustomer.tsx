import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import {InitialState} from "../../types";
import { RouteComponentProps } from 'react-router-dom';

const EditCustomer: React.FC<RouteComponentProps<any>> =  (props)  =>{

    const [loading, setLoading] = useState<boolean>(false)
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [customer, setCustomer] = useState<InitialState>({})


    const [state, setState] = useState({
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        description: customer.description
    })

    const handleChange = useCallback( (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        console.log(e.target.value);
        console.log(e.target.name);
        setState({
            ...state,
            [e.target.name]: value
        });
    }, [])

    useEffect(()=> {
        axios.get(`http://localhost:5000/customers/${props.match.params.id}`).then(data => {
            setCustomer(data.data);
        })
    },[])


    const processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            phone: state.phone,
            address: state.address,
            description: state.description,
        }

        axios.patch(`http://localhost:5000/customers/${props.match.params.id}`, formData).then(data => {
            setSubmitSuccess(true);
            setLoading(false);
            setTimeout(() => {
                window.location.href='/';
            }, 1500)
        })
    }

    return (
        <div className="App">
            {state &&
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