import {InitialState} from "../types";

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