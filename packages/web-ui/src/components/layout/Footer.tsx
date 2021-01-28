import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styled from "styled-components";
import { Row } from "../shared";
import { Paper, Theme } from "@material-ui/core";
import {
    WithStyles,
    withStyles,
    createStyles,
} from "@material-ui/core/styles";

const styles = (theme: Theme) => {
    return createStyles({
        root: {
            position: "absolute",
            top: "-111px",
            right: "5px",
            height: "100px",
            width: "150px",
            color: "#fff",
            padding: "2px 5px",
            backgroundColor: theme.palette.primary.main,
        },
    });
};

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {}

const Menu = withStyles(styles)(({ classes, children }: Props) => (
    <Paper classes={classes} elevation={3} square>
        {children}
    </Paper>
));

const Wrapper = styled(Row)`
    padding: 5px 10px;
    height: 30px;
    border-top: 2px solid #000;
    justify-content: flex-end;
    align-items: center;
    position: relative;
`;

const StatusWrapper = styled.div`
    cursor: pointer;
`;

// const Menu = styled.div`
// `;

const MenuHeader = styled.div`
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid #fff;
    margin-bottom: 5px;
`;

const StatusRow = styled(Row)`
    margin-bottom: 10px;
`;
const StatusLabel = styled.p`
    text-transform: capitalize;
    margin-right: 10px;
`;

const Footer = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [data, setData] = useState<Record<string, boolean>>();

    const fetchStatus = async () => {
        const res = await fetch("/api/status");
        if (res.status !== 200) {
            throw "PLACEHOLDER ERROR";
        }
        const json = await res.json();
        setData(json.exchanges);
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const onClick = () => {
        if (menuOpen === false) {
            fetchStatus();
        }
        setMenuOpen(!menuOpen);
    };

    return (
            <Wrapper>
                <StatusWrapper onClick={onClick}>
                    <button>Status</button>
                </StatusWrapper>
                {menuOpen && (
                    <Menu>
                        <MenuHeader>Exchange status</MenuHeader>
                        {data &&
                            Object.keys(data).map((key) => {
                                return (
                                    <StatusRow>
                                        <StatusLabel>{key}</StatusLabel>
                                        {data[key] ? (
                                            <FaThumbsUp color="green" />
                                        ) : (
                                            <FaThumbsDown />
                                        )}
                                    </StatusRow>
                                );
                            })}
                    </Menu>
                )}
            </Wrapper>
    );
};

export default Footer;
