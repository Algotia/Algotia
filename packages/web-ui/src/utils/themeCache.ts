import localForage from "localforage";
import { AllThemes } from "../assets/styles";

const themeKey = "ALGOTIA_THEME";

export const getCachedTheme = async (): Promise<keyof AllThemes | null> => {
    return await localForage.getItem(themeKey);
};

export const setCachedTheme = async (value: keyof AllThemes) => {
    return await localForage.setItem(themeKey, value);
};
