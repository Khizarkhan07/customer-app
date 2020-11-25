import React, {useEffect, useState, useCallback, useMemo, memo} from "react";
import {useCategoryContext} from "../../contexts/categoriesContext";
import {Button} from "../../components/Button";
import {Table, Modal, Space} from 'antd';
import 'antd/dist/antd.css';
import { InitialState} from "../../types";
import {useSalesContext} from "../../contexts/salesContext";

type categoryProps =  {
    sales : InitialState[]
}

const SalesData: React.FC<categoryProps> = React.memo(({ sales }) => {
    const {salesState, salesDispatch} = useSalesContext();

    const deleteSale = useCallback((id: number)=> {
        salesDispatch({type: 'DELETE_SALE', payload: {id}})
    }, [])

    const columns = useMemo(()=> {
        return [
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
    }, [sales])

    return (
        <Table columns={columns} dataSource={sales} />
    )
})

export default SalesData;