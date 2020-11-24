import React, {useEffect, useState, useCallback} from "react";
import {useCategoryContext} from "../../contexts/categoriesContext";
import {Button} from "../../components/Button";
import {getCategories, storeCat} from "../../utils";
import { Table , Modal} from 'antd';
import 'antd/dist/antd.css';
import {CategoryType} from "../../types";


const Categories: React.FC = () => {
    const {categoryState, categoryDispatch} = useCategoryContext();

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const [name, setName] = useState('')

    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);

    
    const handleOk = useCallback (() => {
        categoryDispatch({type: 'ADD_CATEGORY', payload:{ name: name} })
        setConfirmLoading(true);
        setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        }, 2000);
    }, [name]);

    const handleCancel = useCallback( () => {

        setVisible(false);
    }, [visible]);


    const handleName = useCallback((e)=> {
        setName(e.target.value)
    }, [])
    

    useEffect(() => {
        if (getCategories() === false) {
            storeCat(categoryState)
        } else {
            const data = getCategories();
            categoryDispatch({type: 'CURRENT_CATEGORIES', payload: {data}})
        }
    }, [])


    const columns = [
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

    const data : CategoryType[]  = [];

    {categoryState && categoryState.categories.map(category => {
            data.push(category);
        }
    )}

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
}

export default Categories;