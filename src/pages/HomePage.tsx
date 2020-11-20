import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useCustomerContext} from "../contexts/customerContext";
import axios from "axios";
import {Button} from "../components/Button";
import {InitialState} from "../types";
import {Space, Table} from "antd";

export const HomePage: React.FC =() =>  {

    const {state, dispatch} = useCustomerContext();
    const customers = state;


    useEffect( () => {
        axios.get(`http://localhost:5000/customers/`).then(data => {
            dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: data.data })
        })
    }, [])

   const deleteCustomer = (id: number) => {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: data.data })
        })
       window.location.href = '/'
    }
    console.log(state)

    const columns = [
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
            dataIndex: 'Email',
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
            render: ( customer: InitialState) => (
                <Space size="middle">
                    <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteCustomer(customer.id as number)}>Delete Customer</button>
                </Space>
            ),
        },


    ];

    return (
        <div>
            {customers && customers.length === 0 && (
                <div className="text-center">
                    <h2>No customer found at the moment</h2>
                </div>
            )}

            <div className="container">
                <Button text={"Create Customer"} callback={(e)=> {
                    window.location.href = '/create'
                }}/>
                <Table columns={columns} dataSource={state} />
            </div>

        </div>
    )
}

export default HomePage;