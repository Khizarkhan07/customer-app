import React, {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import {getData, storeData} from "../../utils";
import {useSalesContext} from "../../contexts/salesContext";

const Sales =() =>{
    const {salesState, salesDispatch} = useSalesContext();

    useEffect(()=> {
        if(getData() === false) {
            storeData(salesState)
        }
        else {
            const data = getData()
            salesDispatch( {type: 'CURRENT_SALES', payload: {data}})
        }
    }, [])

    const deleteSale = useCallback((id: number)=> {
        salesDispatch({type: 'DELETE_SALE', payload: {id}})
    }, [])

    return (

        <div>
            {salesState && salesState.length === 0 && (
                <div className="text-center">
                    <h2>No sale found at the moment</h2>
                </div>
            )}

            <div className="container">
                <div className="row">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {salesState && salesState.map(sale =>
                            <tr key={sale.id}>
                                <td>{sale.product_name}</td>
                                <td>{sale.price}</td>
                                <td>{sale.description}</td>
                                <td>{sale.customer_id}</td>
                                <td>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group" >
                                            <button className="btn btn-sm btn-outline-secondary" onClick={()=> {deleteSale(sale.id as number)}} >Delete Sale</button>
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

    );
}

export default Sales;