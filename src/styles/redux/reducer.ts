
import { changeThemeCustomActions } from "./actions";
import { IThemeState, ThemeAction, ThemeActionTypes } from "./types";


const initialState: IThemeState = {
  isDarkTheme: localStorage.getItem('theme') === 'dark' ? true : false 
};

export const themeReducer = (state = initialState, action: ThemeAction): IThemeState => {
    switch (action.type) {
      case ThemeActionTypes.CHANGE_THEME:
        localStorage.setItem('theme', action.payload === false ? 'light' : 'dark');
        changeThemeCustomActions(action.payload);
        return {
          ...state,
          isDarkTheme: action.payload
        };
      default:
        return state;
    }
  };