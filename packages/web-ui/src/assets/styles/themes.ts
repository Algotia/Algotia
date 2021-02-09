import lightTheme from "./light-theme";
import darkTheme from "./dark-theme";
import { Theme } from "@material-ui/core";

export const themes = { Light: lightTheme, Dark: darkTheme } as const;

export type AllThemes = Record<keyof typeof themes, Theme>;
