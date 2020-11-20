import React, {useCallback, useEffect, useState} from 'react';
import {useCategoryContext} from "../../contexts/categoriesContext";
import { nanoid } from 'nanoid'
import {getCategories, storeCat} from "../../utils";

const CreateCategory = () => {
    const {categoryDispatch, categoryState} = useCategoryContext();
    const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);
    const [name, setName] = useState('')

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

    const processFormSubmission =  (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        categoryDispatch({type: 'ADD_CATEGORY', payload:{id: nanoid(), name: name} })
        setSubmitSuccess(true);
        window.location.href= '/sales'
    }
    return (
        <div>

            <div className={"col-md-12 form-wrapper"}>
                <h2> Create Category </h2>
                {!submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Fill the form below to create a new category
                    </div>
                )}

                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}

                <form id={"create-post-form"} onSubmit={processFormSubmission} noValidate={true}>
                    <div className="form-group col-md-12">
                        <label htmlFor="first_name"> Category Name </label>
                        <input type="text" id="product_name" onChange={handleName} name="product_name" className="form-control" placeholder="Enter product name" />
                    </div>

                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCategory;