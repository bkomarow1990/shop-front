export interface IBaseCategory{
    id: string;
    name: string;
}
export interface ICategory extends IBaseCategory{
    subcategories: ICategory[];
}

//REDUX
export enum AdminCategoryActionTypes{
    // ADD_CATEGORY = "ADD_CATEGORY",
    GET_CATEGORIES = "GET_CATEGORIES",
    DELETE_CATEGORY = "DELETE_CATEGORY",
    GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
    GET_CATEGORIES_ERROR = "GET_CATEGORIES_ERROR",
    GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES",
    GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS",
    GET_ALL_CATEGORIES_ERROR = "GET_ALL_CATEGORIES_ERROR",
}
export interface AdminCategoryState{
    categories: ICategory[];
    isLoading: boolean;
    allCategories: ICategory[];
    isAllCategoriesLoading: boolean;
}

export interface GetCategoriesAction{
    type: AdminCategoryActionTypes.GET_CATEGORIES;
}
export interface GetCategoriesErrorAction{
    type: AdminCategoryActionTypes.GET_CATEGORIES_ERROR;
    payload: string;
}
export interface GetCategoriesSuccessAction{
    type: AdminCategoryActionTypes.GET_CATEGORIES_SUCCESS;
    payload: ICategory[];
}
export interface GetAllCategoriesAction{
    type: AdminCategoryActionTypes.GET_ALL_CATEGORIES;
}
export interface GetAllCategoriesErrorAction{
    type: AdminCategoryActionTypes.GET_ALL_CATEGORIES_ERROR;
    payload: string;
}
export interface GetAllCategoriesSuccessAction{
    type: AdminCategoryActionTypes.GET_ALL_CATEGORIES_SUCCESS;
    payload: ICategory[];
}
export interface DeleteCategoryAction{
    type: AdminCategoryActionTypes.DELETE_CATEGORY;
    payload: string;
}
// export interface AddCategory{
//     type: AdminCategoryActionTypes.ADD_CATEGORY;
// }
export type AdminCategoryAction = 
| GetCategoriesAction
| GetCategoriesErrorAction
| GetCategoriesSuccessAction
| GetAllCategoriesAction
| GetAllCategoriesErrorAction
| GetAllCategoriesSuccessAction
| DeleteCategoryAction
;
