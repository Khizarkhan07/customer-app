export type InitialState = {
    [key: string]: number| string
}
export type actionType = {
    type: string;
    payload: any
}
export type CategoryObjectType = {
    id: string,
    name: string;
}

export type CategoryType = {
    [key : string] : CategoryObjectType
}

export type InitialCategoryType = {
    categories: CategoryType,
    totalCategories: string[]
}