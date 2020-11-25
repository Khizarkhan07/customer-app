import React, {useEffect, useState, useCallback, useMemo, memo} from "react";
import {useCategoryContext} from "../../contexts/categoriesContext";
import {Button} from "../../components/Button";
import { Table , Modal} from 'antd';
import 'antd/dist/antd.css';
import {CategoryType} from "../../types";

type categoryProps =  {
    categories : CategoryType[]
}

const Categories: React.FC<categoryProps> = React.memo(({ categories }) => {
    const {categoryState, categoryDispatch} = useCategoryContext();

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [name, setName] = useState('')


    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);


    const handleOk = useCallback(()=> {
        categoryDispatch({type: 'ADD_CATEGORY', payload: {name: name}})
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    }, [name])


    const handleCancel = useCallback( () => {
        setVisible(false);
    }, [visible]);


    const handleName = useCallback((e)=> {
        setName(e.target.value)
    }, [])


    const columns = useMemo(()=> {
       return [
           {
               title: 'id',
               dataIndex: 'id',
               key: 'id',

           },
           {
               title: 'name',
               dataIndex: 'name',
               key: 'name',
           }

       ];
    }, [categoryState.categories])

    const data : CategoryType[]  = categories;


    return (
        <div>

            <Button text={'Add category'}
                    callback={showModal}
            />
            <Modal
                title="Create Category"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >

                <div className="form-group col-md-12">
                    <label htmlFor="first_name"> Category Name </label>
                    <input type="text" id="product_name" onChange={handleName} name="product_name" className="form-control" placeholder="Enter product name" />
                </div>

            </Modal>
            <Table columns={columns} dataSource={data} />
        </div>

    )
})

export default Categories;