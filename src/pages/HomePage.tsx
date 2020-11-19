import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useCustomerContext} from "../contexts/customerContext";
import axios from "axios";
import {useFetch} from "../hooks/useFetch";

export const HomePage: React.FC =() =>  {

    const {state, dispatch} = useCustomerContext();
    const customers = state;


    const res= useFetch('http://localhost:5000/customers', {})
    dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: res.response })

   const deleteCustomer = (id: number) => {
        axios.delete(`http://localhost:5000/customers/${id}`).then(data => {
            dispatch ({type: 'CURRENT_CUSTOMERS' ,payload: data.data })
        })
       window.location.href = '/'
    }

    return (
        <div>
            {customers && customers.length === 0 && (
                <div className="text-center">
                    <h2>No customer found at the moment</h2>
                </div>
            )}

            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers && customers.map(customer =>
                            <tr key={customer.id}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{customer.description}</td>
                                <td>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group" >
                                            <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteCustomer(customer.id as number)}>Delete Customer</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default HomePage;