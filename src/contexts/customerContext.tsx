import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { InitialCustomerType, actionType} from "../types";
import {deleteCustomer, editCustomer, singleCustomer, singleSale, storeCustomers} from "../utils";

const CURRENT_CUSTOMERS = 'CURRENT_CUSTOMERS'
const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
const EDIT_CUSTOMER = 'EDIT_CUSTOMER'
const DELETE_CUSTOMER = 'DELETE_CUSTOMER'
const SINGLE_CUSTOMER = 'SINGLE_CUSTOMER'
export const initialState = {
    customer : [
        {
            id: 1,
            first_name: "Customer_1",
            last_name: "Customer_1",
            email: "customer1@mail.com",
            phone: "00000000000",
            address: "Customer_1 Address",
            description: "Customer_1 description"
        }
    ]
};

const CustomerContext = createContext<{
    state: InitialCustomerType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});


const customerReducer = (state: InitialCustomerType, action: actionType) => {
    switch (action.type) {
        case CURRENT_CUSTOMERS :{
             state = action.payload;
             return state;
        }
        case CREATE_CUSTOMER : {
            const id = (state.customer.length+1);
            action.payload.id = id;
            const newState =  {
                ...state,
                customer: [...state.customer, action.payload],
            };
            storeCustomers(newState);
            return newState;
        }
        case DELETE_CUSTOMER : {
            const newState = {
                ...state,
                customer : deleteCustomer(state.customer, action.payload.id)
            }
            storeCustomers(newState)
            return newState;
        }
        case SINGLE_CUSTOMER : {
            const newState = {
                ...state,
                customer : [singleCustomer(state.customer, action.payload.id)]
            }
            return newState;
        }
        case EDIT_CUSTOMER : {
            console.log(action.payload);

            const newState = {
                ...state,
                customer: editCustomer(state.customer, action.payload)
            }
            storeCustomers(newState)
            return newState;
        }
        default: return state;
    }

};

type Props = {
    children: ReactNode;
};
const CustomerProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(customerReducer, initialState);

    return (
        <CustomerContext.Provider value={{ state, dispatch }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomerContext = () => useContext(CustomerContext);
export { CustomerProvider };

