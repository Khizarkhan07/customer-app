import React, {useEffect, useState} from "react";
import {useCategoryContext} from "../../contexts/categoriesContext";
import {CategoryObjectType} from "../../types";
import {Button} from "../../components/Button";
import {getCategories, storeCat} from "../../utils";
import { Table } from 'antd';
import 'antd/dist/antd.css';


const Categories: React.FC = () => {
    const {categoryState, categoryDispatch} = useCategoryContext();

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

    const data : any = [];

    {categoryState && categoryState.totalCategories.map(catId => {

            const category: CategoryObjectType = categoryState.categories[catId];
            data.push(category);
        }
    )}

    return (
        <div>

            <Button text={'Add category'}
                    callback={(e: React.MouseEvent<HTMLButtonElement>) => {
                        window.location.href = '/create/category'
                    }}
            />

            <Table columns={columns} dataSource={data} />
        </div>

    )
}

export default Categories;