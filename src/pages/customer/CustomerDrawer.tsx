import React, {useCallback, useMemo, useState} from 'react';
import {Drawer, message} from "antd";
import {unstable_trace as trace} from "scheduler/tracing";
import {useCustomerContext} from "../../contexts/customerContext";
import {Button} from "../../components/Button";

const CustomerDrawer = () => {
    const {state, dispatch} = useCustomerContext();

    const [stateValue, setStateValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        description: ''
    })
    const [visible, setVisible] = useState(false);
    const toggleDrawer = useCallback(() => {
        setVisible(!visible);

    }, [visible])
    const handleChange = useCallback( (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setStateValue({
            ...stateValue,
            [e.target.name]: value
        });
    }, [stateValue])

    const success = useCallback(() => {
        message.success('Customer Created!');
    }, [visible]);

    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        trace('create customer', performance.now(), ()=> {
            e.preventDefault();
            success();
            dispatch({type: 'CREATE_CUSTOMER', payload: {
                    first_name: stateValue.firstName,
                    last_name: stateValue.lastName,
                    email: stateValue.email,
                    phone: stateValue.phone,
                    address: stateValue.address,
                    description: stateValue.description,
                }})
            setVisible(false);

        })


    }
    const MemoButton = useMemo(()=> {
        return <Button callback={toggleDrawer} text={"create customer"}/>
    },[visible])

    const CustomerDrawer = useMemo(() => {
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
                        </div>
                    </form>
                </div>
            </Drawer>
        )
    }, [visible, stateValue])
    return (
        <React.Fragment>
            {MemoButton}
            {CustomerDrawer}
        </React.Fragment>

    );
}

export default CustomerDrawer;