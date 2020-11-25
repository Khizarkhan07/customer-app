import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {useCustomerContext} from "../contexts/customerContext";
import {Button} from "../components/Button";
import {CustomerType, InitialState} from "../types";
import {Space, Table} from "antd";
import { Drawer, message } from 'antd';
import {getCustomers, getData, storeCustomers} from "../utils";
import { unstable_trace as trace } from "scheduler/tracing";


export const HomePage: React.FC =() =>  {

    const {state, dispatch} = useCustomerContext();

    const [stateValue, setStateValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        description: ''
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);

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

    const toggleDrawer = useCallback(() => {
        setVisible(!visible);

    }, [visible])


    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        trace('create customer', performance.now(), ()=> {
            e.preventDefault();
            setLoading(true)
            setLoading(false)
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

    useEffect( () =>{
        if(getCustomers() === null) {
            storeCustomers(state)
        }
        else {
            const data = getCustomers()
            dispatch({type: 'CURRENT_CUSTOMERS', payload: data})
        }
    }, [])

   const deleteCustomer = useCallback( (id: number) => {
       dispatch( {type: 'DELETE_CUSTOMER', payload: {id}})
       window.location.href = '/'
    },[state.customer])
    const columns = useMemo(()=> {
       return [
           {
               title: 'First Name',
               dataIndex: 'first_name',
               key: 'first_name',

           },
           {
               title: 'Last Name',
               dataIndex: 'last_name',
               key: 'last_name',
           },
           {
               title: 'Email',
               dataIndex: 'email',
               key: 'email',
           },
           {
               title: 'Phone',
               dataIndex: 'phone',
               key: 'phone',
           },
           {
               title: 'Address',
               dataIndex: 'address',
               key: 'address',
           },
           {
               title: 'description',
               dataIndex: 'description',
               key: 'description',
           },

           {
               title: 'Action',
               key: 'action',
               render: ( customer: CustomerType) => (
                   <Space size="middle">
                       <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                       <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteCustomer(customer.id as number)}>Delete Customer</button>
                   </Space>
               ),
           },


       ];
    }, [state.customer])

    return (
        <div>
            {!state.customer  && (
                <div className="text-center">
                    <h2>No customer found at the moment</h2>
                </div>
            )}

            <div className="container">
                
                <Button text={"Create Customer"} callback={toggleDrawer}/>
                
                <Table columns={columns} dataSource={state.customer} />

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
                                {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                                }
                            </div>
                        </form>
                    </div>
                </Drawer>
            </div>

        </div>
    )
}

export default HomePage;