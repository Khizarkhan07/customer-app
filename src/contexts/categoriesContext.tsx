import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { InitialCategoryType, actionType} from "../types";
import {storeCat} from "../utils";

const ADD_CATEGORY = 'ADD_CATEGORY'
const CURRENT_CATEGORIES = 'CURRENT_CATEGORIES'
export const initialState = {
    categories: [
         { id: "1", name: "Electronics" },
         { id: "2", name: "Mobile Phones" , },
         { id: "3", name: "Accessories",  },
         { id: "4", name: "Wood Work",  },
         { id: "5", name: "Cars",  },
    ],

}

const CategoryContext = createContext<{
    categoryState: InitialCategoryType;
    categoryDispatch: React.Dispatch<any>;
}>({
    categoryState: initialState,
    categoryDispatch: () => null,
});


const categoryReducer = (state: InitialCategoryType, action: actionType) => {
    switch (action.type) {
        case ADD_CATEGORY :{
            const id = (state.categories.length+1).toString();
            action.payload.id = id;
            const newState =  {
                ...state,
                categories: [...state.categories, action.payload],
            };
            storeCat(newState);
            return newState;

        }
        case CURRENT_CATEGORIES : {
            state =  action.payload.data;
            return state;
        }
        default: return state;
    }

};

type Props = {
    children: ReactNode;
};
const CategoryProvider: React.FC<Props> = ({ children }) => {
    const [categoryState, categoryDispatch] = useReducer(categoryReducer, initialState);

    return (
        <CategoryContext.Provider value={{ categoryState, categoryDispatch }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => useContext(CategoryContext);
export { CategoryProvider };

