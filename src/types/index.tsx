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
