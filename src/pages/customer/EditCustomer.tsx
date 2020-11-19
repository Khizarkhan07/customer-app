import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import {InitialState} from "../../types";
import { RouteComponentProps } from 'react-router-dom';

const EditCustomer: React.FC<RouteComponentProps<any>> =  (props)  =>{

    const [loading, setLoading] = useState<boolean>(false)
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [customer, setCustomer] = useState<InitialState>({})
    const [firstName, setFirstName] = useState<string>(customer.first_name as string);
    const [lastName, setLastName] = useState<string>(customer.last_name as string);
    const [email, setEmail] = useState<string>(customer.email as string);
    const [phone, setPhone] = useState<string>(customer.phone as string);
    const [address, setAddress] = useState<string>(customer.address as string);
    const [description, setDescription] = useState<string>(customer.description as string);


    useEffect(()=> {
        axios.get(`http://localhost:5000/customers/${props.match.params.id}`).then(data => {
            setCustomer(data.data);
        })
    },[])

    const handleFistName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }, [firstName])

    const handleLastName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }, [lastName])

    const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, [email])

    const handlePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }, [phone])

    const handleDescription = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }, [description])


    const handleAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }, [address])


    const processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: address,
            description: description,
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
                                <input type="text" id="first_name" defaultValue= {customer.first_name as string} onChange={handleFistName} name="first_name" className="form-control" placeholder="Enter customer's first name" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="last_name"> Last Name </label>
                                <input type="text" id="last_name" defaultValue ={customer.last_name as string} onChange={handleLastName} name="last_name" className="form-control" placeholder="Enter customer's last name" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="email"> Email </label>
                                <input type="email" id="email" defaultValue={customer.email as string} onChange={handleEmail} name="email" className="form-control" placeholder="Enter customer's email address" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="phone"> Phone </label>
                                <input type="text" id="phone" defaultValue={customer.phone as string} onChange={handlePhone} name="phone" className="form-control" placeholder="Enter customer's phone number" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="address"> Address </label>
                                <input type="text" id="address" defaultValue={customer.address as string} onChange={handleAddress} name="address" className="form-control" placeholder="Enter customer's address" />
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="description"> Description </label>
                                <input type="text" id="description" defaultValue={customer.description as string} onChange={handleDescription} name="description" className="form-control" placeholder="Enter Description" />
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