import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { InitialState, actionType} from "../types";

const CURRENT_CUSTOMERS = 'CURRENT_CUSTOMERS'
export const initialState = [

        {
            "id": 1,
            "first_name": "Customer_1",
            "last_name": "Customer_1",
            "email": "customer1@mail.com",
            "phone": "00000000000",
            "address": "Customer_1 Address",
            "description": "Customer_1 description"
        },
];

const CustomerContext = createContext<{
    state: InitialState[];
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});


const customerReducer = (state: InitialState[], action: actionType) => {
    switch (action.type) {
        case CURRENT_CUSTOMERS :{
             state = action.payload;
             return state;
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

