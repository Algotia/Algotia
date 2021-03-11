import { useState } from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { FaHome, FaBook } from "react-icons/fa";
import { RiTestTubeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {
    Paper,
    Typography,
    Divider,
    makeStyles,
    Zoom,
} from "@material-ui/core";
import Settings from "./Settings";

const useBarStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100px",
        borderRadius: "0px",
        backgroundColor: theme.palette.primary.main,
        position: "relative",
    },
}));

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
    const barStyles = useBarStyles();
    const [hoveredItem, setHoveredItem] = useState("");

    return (
        <Paper classes={barStyles} elevation={3} square>
            <AlgotiaLogo />
            {navItems.map(({ path, label, Icon }, i) => {
                const isHovered = hoveredItem === label;
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
                            <NavItem
                                onMouseEnter={() => {
                                    setHoveredItem(label);
                                }}
                                onMouseLeave={() => {
                                    setHoveredItem("");
                                }}
                            >
                                <Icon
                                    size={isHovered ? 20 : 30}
                                    style={{
                                        transition:
                                            "width 300ms ease-in-out, height 100ms ease-in-out",
                                    }}
                                />
                                <Zoom in={hoveredItem === label}>
                                    <Typography>{label}</Typography>
                                </Zoom>
                            </NavItem>
                        </NavLink>
                        {i === navItems.length - 1 && <Divider />}
                    </div>
                );
            })}
            <Settings />
        </Paper>
    );
};

export default SideBar;
