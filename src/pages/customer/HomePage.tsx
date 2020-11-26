import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {useCustomerContext} from "../../contexts/customerContext";
import {Button} from "../../components/Button";
import {CustomerType, InitialState} from "../../types";
import {Space, Table} from "antd";
import { Drawer, message } from 'antd';
import {getCustomers, getData, storeCustomers} from "../../utils";
import { unstable_trace as trace } from "scheduler/tracing";
import CustomerDrawer from "./CustomerDrawer";


export const HomePage: React.FC =() =>  {

    const {state, dispatch} = useCustomerContext();

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

    const CustomerTable = useMemo(()=> {
        return <Table columns={columns} dataSource={state.customer} />
    },[state.customer])

    return (
        <div>
            {!state.customer  && (
                <div className="text-center">
                    <h2>No customer found at the moment</h2>
                </div>
            )}

            <div className="container">

                <CustomerDrawer/>
                {CustomerTable}

            </div>

        </div>
    )
}

export default HomePage;