import React, {useCallback, useMemo, useState} from 'react';
import {Drawer, message} from "antd";
import {CategoryType} from "../../types";
import {Button} from "../../components/Button";
import {useCustomerContext} from "../../contexts/customerContext";
import {useSalesContext} from "../../contexts/salesContext";
import {useCategoryContext} from "../../contexts/categoriesContext";

const SaleDrawer = () => {

    const {state} = useCustomerContext();
    const {salesDispatch} = useSalesContext();
    const {categoryState} = useCategoryContext();

    const [stateValue, setStateValue] = React.useState({
        name: "",
        price: "",
        description: "",
        customerId: ""
    })
    const [visible, setVisible] = useState<boolean>(false);

    const toggleDrawer = useCallback(() => {
        setVisible(!visible);
    }, [visible])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        console.log(e.target.value);
        console.log(e.target.name);
        setStateValue({
            ...stateValue,
            [e.target.name]: value
        });
    }

    const customerOptions = useMemo(() => {
        return state.customer.map(customer => (
            <option key={customer.id} value={customer.id}>
                {customer.first_name+ " - " + customer.id}
            </option>
        ))

    }, [state]);



    const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(stateValue)
        const data = {
            product_name: stateValue.name,
            price: stateValue.price,
            description: stateValue.description,
            customer_id: stateValue.customerId
        }
        salesDispatch({type: 'CREATE_SALE', payload: {data}})
        message.success("Sale created!")
        setVisible(false);

    }

    const categories = useMemo(()=> {
        return categoryState.categories.map((category: CategoryType) => {
            return <option key={category.id} value={category.id}>
                {category.name+ " - " + category.id}
            </option>

        });
    },[categoryState.categories])

    const createSaleButton = useMemo(()=> {
        return  <Button text={'Create Sale'} callback={toggleDrawer}/>
    },[true])

    const SaleDrawer = useMemo(()=> {
        return (
            <Drawer
                title="Create a new customer"
                width={720}
                onClose={toggleDrawer}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

            >
                <div className={"col-md-12 form-wrapper"}>

                    <form id={"create-post-form"} onSubmit={processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> Product Name </label>
                            <input type="text" id="product_name" onChange={handleChange} name="name" className="form-control" placeholder="Enter product name" />
                        </div>


                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Price </label>
                            <input type="number" id="price" onChange={handleChange} name="price" className="form-control" placeholder="Enter Price" />
                        </div>


                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={handleChange} name="description" className="form-control" placeholder="Enter Description" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="customers"> Customer </label>
                            <select name={"customerId"} className={"form-control"} placeholder={"select customer"} value={stateValue.customerId} onChange={handleChange} >
                                <option value="" disabled={true}> select customer</option>
                                {customerOptions}
                            </select>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="customers"> Category </label>
                            <select className={"form-control"} placeholder={"select customer"} value={""}  >
                                <option value="" disabled={true}> select category</option>
                                {categories}
                            </select>
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Product
                            </button>
                        </div>
                    </form>
                </div>
            </Drawer>
        )
    }, [visible, stateValue])

    return (
        <div>
            {createSaleButton}
            {SaleDrawer}
        </div>
    );
}

export default SaleDrawer;