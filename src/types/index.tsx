export type InitialState = {
    [key: string]: number| string
}
export type actionType = {
    type: string;
    payload: any
}
export type CategoryType = {
    id: string,
    name: string;
}

export type InitialCategoryType = {
    categories: CategoryType[],
}

export type CustomerType = {
    id : number,
    first_name: string,
    last_name: string,
    email : string,
    phone: string,
    address: string,
    description : string
}

export type InitialCustomerType = {
    customer: CustomerType[]
}
