import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { InitialState, actionType} from "../types";
import {storeData, removeSale, singleSale} from "../utils";

const CREATE_SALE = 'CREATE_SALE'
const CURRENT_SALES = 'CURRENT_SALES'
const DELETE_SALES = 'DELETE_SALE'
const EDIT_SALE = 'EDIT_SALE'
const GET_SINGLE_SALE = 'GET_SINGLE_SALE'

export const initialState = [
        {product_name:"laptop",price:"100500",description:"description",customer_id:"1","id":1},
        {product_name:"laptop",price:"100500",description:"description",customer_id:"1","id":1},
        {product_name:"laptop",price:"100500",description:"description",customer_id:"1","id":1},
        {product_name:"laptop",price:"100500",description:"description",customer_id:"1","id":1},
        {product_name:"laptop",price:"100500",description:"description",customer_id:"1","id":1},

    ];

const SalesContext = createContext<{
    salesState: InitialState[];
    salesDispatch: React.Dispatch<any>;
}>({
    salesState: initialState,
    salesDispatch: () => null,
});

const salesReducer = (state: InitialState[], action: actionType) => {
    switch (action.type) {
        case CREATE_SALE :{
            action.payload.data.id = state.length+1;
            const newState =  [...state, action.payload.data];
            storeData(state)
            return newState;
        }
        case DELETE_SALES: {
            const result = removeSale(state, action.payload.id)
            storeData(result);
            return [...result]

        }
        case CURRENT_SALES: {
            state = action.payload.data;
            return state;
        }
        case GET_SINGLE_SALE : {
            const result = singleSale(state, action.payload.id)
            return [...result];
        }

        default: return state;
    }

};

type Props = {
    children: ReactNode;
};
const SalesProvider: React.FC<Props> = ({ children }) => {
    const [salesState, salesDispatch] = useReducer(salesReducer, initialState);

    return (
        <SalesContext.Provider value={{ salesState, salesDispatch }}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSalesContext = () => useContext(SalesContext);
export { SalesProvider };

