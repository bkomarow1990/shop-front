import {
  AdminCategoryAction,
  AdminCategoryActionTypes,
  AdminCategoryState,
} from "./types";

const initialState: AdminCategoryState = {
  categories: [],
  isLoading: false,
  allCategories: [],
  isAllCategoriesLoading: false,
};

export const adminCategoryReducer = (
  state = initialState,
  action: AdminCategoryAction
): AdminCategoryState => {
  switch (action.type) {
    case AdminCategoryActionTypes.GET_CATEGORIES:
      return {
        ...state,
        isLoading: true,
      };
    case AdminCategoryActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case AdminCategoryActionTypes.GET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case AdminCategoryActionTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        isAllCategoriesLoading: true,
      };
    case AdminCategoryActionTypes.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        isAllCategoriesLoading: false,
        allCategories: action.payload,
      };
    case AdminCategoryActionTypes.GET_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        isAllCategoriesLoading: false,
      };
      case AdminCategoryActionTypes.DELETE_CATEGORY:
        {
          let updatedCategories = state.categories.filter(category => category.id !== action.payload);
          updatedCategories = updatedCategories.map( c =>
            {
              return{
                ...c,
                subcategories: c.subcategories.filter(sc => sc.id !== action.payload)
              }
            }
          );
        
        return {
          ...state,
          categories: updatedCategories 
          //..categories: state.categories.filter(c => c.id !== action.payload).map(c => c.subcategories.filter(sc => sc.id !== action.payload))
        }
      }
    default:
      return state;
  }
};
