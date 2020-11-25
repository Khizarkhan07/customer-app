import {CustomerType, InitialCategoryType, InitialCustomerType, InitialState} from "../types";


export const deleteCustomer = (customer: CustomerType[], id: number) => {
    for (let i=0 ; i<customer.length ; i++){
        if (customer[i].id === id) {
            customer.splice(i, 1);
        }
    }
    return customer;
}

export const singleCustomer = (customer: CustomerType[] ,id: number) => {
    for (let i= 0; i< customer.length; i++) {
        if(customer[i].id === id){
            return customer[i]
        }
    }
}


export const editCustomer = (customer: CustomerType[] , data: CustomerType) => {
    for (let i= 0; i< customer.length; i++) {
        if(customer[i].id == data.id){
            data.first_name ? customer[i].first_name = data.first_name: customer[i].first_name
            data.last_name ? customer[i].last_name = data.last_name: customer[i].last_name
            data.email ? customer[i].email = data.email: customer[i].email
            data.phone ? customer[i].phone = data.phone: customer[i].phone
            data.address ? customer[i].address = data.address: customer[i].address
            data.description ? customer[i].description = data.description: customer[i].description
        }
    }
    return customer
}

export const removeSale = (state: InitialState[], id: number) =>{
    for (let i = 0; i < state.length; i++) {
        let obj = state[i];
        if(obj['id'] === id) {
            state.splice(i,1);
        }

    }

    return state;
}

export const singleSale = (data: InitialState[], id: number) => {
    let result = [];
    for (let i =0 ; i < data.length ;i ++){
        let obj = data[i];
        console.log(obj)
        if(obj['id'] == id){
            result[0] =  obj;
            break;
        }
    }
    return result;
}

export const storeData = (data: InitialState[]) => {

    window.localStorage.setItem("sales", JSON.stringify(data));

}

export const storeCat = (data: InitialCategoryType) => {

    window.localStorage.setItem("category", JSON.stringify(data));

}

export const getData = (): InitialState | boolean  => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("sales")) {
        return JSON.parse(localStorage.getItem("sales") as string);
    } else {
        return false;
    }
}

export const getCategories = (): InitialState | boolean  => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("category")) {
        return JSON.parse(localStorage.getItem("category") as string);
    } else {
        return false;
    }
}

export const storeCustomers = (data: InitialCustomerType) => {

    window.localStorage.setItem("customer", JSON.stringify(data));

}

export const getCustomers = (): InitialCustomerType[] | boolean  => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("category")) {
        return JSON.parse(localStorage.getItem("customer") as string);
    } else {
        return false;
    }
}

export const callback = (id: string , phase: string , actualTime: number, baseTime: number, startTime: number, commitTime: number, interactions: any) => {
    const performanceData = [
        `id: ${id}`,
        `phase: ${phase}`,
        `actualDuration: ${actualTime}`,
        `baseDuration: ${baseTime}`,
        `startTime: ${startTime}`,
        `commitTime: ${commitTime}`,
        `interactions: ${JSON.stringify([...interactions])}`
    ].join("\n");

    console.log(performanceData);
}