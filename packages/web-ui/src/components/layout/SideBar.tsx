import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Column } from "../shared";
import { IconType } from "react-icons";
import { FaHome, FaBook } from "react-icons/fa";
import { RiTestTubeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { createStyles, withStyles, WithStyles, Theme, useTheme } from "@material-ui/core/styles";

const styles = (theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100px",
            borderRadius: "0px",
            backgroundColor: theme.palette.primary.main,
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

const NavItem = styled(Column)`
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Label = styled.p`
    font-size: 1em;
`;
const Seperator = styled.hr`
    width: 80%;
    margin: 5px auto 5px;
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
		Icon: FaBook
	}
];

const SideBar = () => {
    const theme = useTheme();
    return (
        <Wrapper>
            <AlgotiaLogo />
            {navItems.map(({ path, label, Icon }, i) => {
                return (
                    <div key={"to-" + path}>
                        <Seperator />
                        <NavLink
                            exact
                            to={path}
                            style={{
                                color: "#999",
                            }}
                            activeStyle={{
                                color: "#fff",
                            }}
                        >
                            <NavItem>
                                <Icon size={24} />
                                <Label>{label}</Label>
                            </NavItem>
                        </NavLink>
                        {i === navItems.length - 1 && <Seperator />}
                    </div>
                );
            })}
        </Wrapper>
    );
};

export default SideBar;
