import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

const CreateCustomer: React.FC = () =>  {
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');



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


    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoading(true)

        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: address,
            description: description,
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
                        <input type="text" id="first_name" onChange={handleFistName} name="first_name" className="form-control" placeholder="Enter customer's first name" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="last_name"> Last Name </label>
                        <input type="text" id="last_name" onChange={handleLastName} name="last_name" className="form-control" placeholder="Enter customer's last name" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" onChange={handleEmail} name="email" className="form-control" placeholder="Enter customer's email address" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="phone"> Phone </label>
                        <input type="text" id="phone" onChange={handlePhone} name="phone" className="form-control" placeholder="Enter customer's phone number" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="address"> Address </label>
                        <input type="text" id="address" onChange={handleAddress} name="address" className="form-control" placeholder="Enter customer's address" />
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="description"> Description </label>
                        <input type="text" id="description" onChange={handleDescription} name="description" className="form-control" placeholder="Enter Description" />
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