import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

const CreateCustomer: React.FC = () =>  {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        description: ''
    })
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);


    const handleChange = useCallback( (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }, [state])


    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true)

        const formData = {
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            phone: state.phone,
            address: state.address,
            description: state.description,
        }



        setSubmitSuccess(true);
        setLoading(false)
        axios.post(`http://localhost:5000/customers`, formData).then(data => [
                setTimeout(() => {
                    window.location.href= '/'
                }, 1500)
        ]);
   }



    return (
        <div>
            <div className={"col-md-12 form-wrapper"}>
                <h2> Create Post </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new post
                    </div>
                )}

                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}

                <form id={"create-post-form"} onSubmit={processFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="first_name"> First Name </label>
                        <input type="text" id="first_name" onChange={handleChange} name="firstName" className="form-control" placeholder="Enter customer's first name" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="last_name"> Last Name </label>
                        <input type="text" id="last_name" onChange={handleChange} name="lastName" className="form-control" placeholder="Enter customer's last name" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" onChange={handleChange} name="email" className="form-control" placeholder="Enter customer's email address" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="phone"> Phone </label>
                        <input type="text" id="phone" onChange={handleChange} name="phone" className="form-control" placeholder="Enter customer's phone number" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="address"> Address </label>
                        <input type="text" id="address" onChange={handleChange} name="address" className="form-control" placeholder="Enter customer's address" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="description"> Description </label>
                        <input type="text" id="description" onChange={handleChange} name="description" className="form-control" placeholder="Enter Description" />
                    </div>

                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Create Customer
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

export default CreateCustomer;