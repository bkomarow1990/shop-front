export interface IThemeState{
    isDarkTheme : boolean;
}
export enum ThemeActionTypes{
    CHANGE_THEME = "CHANGE_THEME",
} 
export interface IChangeThemeAction{
    type: ThemeActionTypes.CHANGE_THEME;
    payload: boolean;
}
export type ThemeAction = IChangeThemeAction;