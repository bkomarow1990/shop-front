import { Dispatch } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ThemeAction, ThemeActionTypes } from "./types";

export const ChangeTheme = (data: boolean) => async (dispatch: Dispatch<ThemeAction>) => {
    try {
        dispatch({
            type: ThemeActionTypes.CHANGE_THEME,
            payload: data
        });
        return Promise.resolve();

    } catch (err: any) {
        return Promise.reject(err);
    }
}
export const changeThemeCustomActions = (isDarkTheme: boolean) => {
  updateBackgroundColor(isDarkTheme);
}

export const updateBackgroundColor = (isDarkTheme: boolean) => {
    // const {isDarkTheme} = useTypedSelector(state => state.theme);
    // Update the background color based on the theme
    const body = document.querySelector('body');
    if (isDarkTheme) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
  };