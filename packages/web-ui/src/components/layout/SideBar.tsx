import React, { PropsWithChildren, useContext } from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { FaHome, FaBook } from "react-icons/fa";
import { RiTestTubeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {
    Paper,
    Typography,
    Divider,
    styled as muiStyled,
} from "@material-ui/core";
import {
    createStyles,
    withStyles,
    WithStyles,
    Theme,
} from "@material-ui/core/styles";
import { ThemeSetterContext } from "../../App";

const styles = (theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100px",
            borderRadius: "0px",
            backgroundColor: theme.palette.primary.main,
            position: "relative",
        },
    });
};

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {}

const Wrapper = withStyles(styles)(({ classes, children }: Props) => (
    <Paper classes={classes} elevation={3} square>
        {children}
    </Paper>
));

const AlgotiaLogo = styled.div`
    height: 50px;
    width: 80%;
    box-sizing: border-box;
    margin: 0 auto;
`;

const NavItem = styled.div`
    height: 75px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface NavItemObj {
    path: string;
    label: string;
    Icon: IconType;
}

const navItems: NavItemObj[] = [
    {
        path: "/",
        label: "Home",
        Icon: FaHome,
    },
    {
        path: "/backtest",
        label: "Backtest",
        Icon: RiTestTubeFill,
    },
    {
        path: "/docs",
        label: "Docs",
        Icon: FaBook,
    },
];

const SideBar = () => {
    const themeContext = useContext(ThemeSetterContext);
    return (
        <Wrapper>
            <AlgotiaLogo />
            {navItems.map(({ path, label, Icon }, i) => {
                return (
                    <div key={"to-" + path}>
                        <Divider />
                        <NavLink
                            exact
                            to={path}
                            style={{
                                color: "#999",
                                textDecoration: "none",
                            }}
                            activeStyle={{
                                color: "#fff",
                            }}
                        >
                            <NavItem>
                                <Icon />
                                <Typography>{label}</Typography>
                            </NavItem>
                        </NavLink>
                        {i === navItems.length - 1 && (
                            <Divider variant="middle" light />
                        )}
                    </div>
                );
            })}
            <button
                onClick={() => {
                    if (themeContext.setTheme) {
                        themeContext.setTheme();
                    }
                }}
            >
                Theme
            </button>
        </Wrapper>
    );
};

export default SideBar;
