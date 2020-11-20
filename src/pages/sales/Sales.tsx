import React, {useCallback, useEffect} from 'react';
import {Link} from "react-router-dom";
import {getData, storeData} from "../../utils";
import {useSalesContext} from "../../contexts/salesContext";
import {Button} from "../../components/Button";
import Categories from "../category/Categories";
import {InitialState} from "../../types";
import { Table, Space } from 'antd';
import 'antd/dist/antd.css';

const Sales = () =>{

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



    const columns = [
        {
            title: 'product',
            dataIndex: 'product_name',
            key: 'product',

        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'customer',
            dataIndex: 'customer_id',
            key: 'customer',
        },
        {
            title: 'Action',
            key: 'action',
            render: ( record: InitialState) => (
                <Space size="middle">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteSale((record.id as number))}>Delete Sale</button>
                </Space>
            ),
        },

    ];

    const data = salesState
    return (

        <div>

            {salesState && salesState.length === 0 && (
                <div className="text-center">
                    <h2>No sale found at the moment</h2>
                </div>
            )}

            <div className="container">


                <Categories/>

                <hr/>

                <Button text={'Create Sale'}
                    callback={(e: React.MouseEvent<HTMLButtonElement>)=> {
                        window.location.href = '/create/sale'
                    }}
                />

                <Table columns={columns} dataSource={data} />

            </div>

        </div>

    );
}

export default Sales;