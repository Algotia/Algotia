import React from "react";
import styled from "styled-components";
import { Column, Row } from "../shared";
import SideBar from "./SideBar";

const Wrapper = styled(Row)`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const MainCol = styled(Column)`
    height: 100%;
    width: 100%;
`;

const ChildContainer = styled.div`
    flex-grow: 1;
    padding: 25px;
    box-sizing: border-box;
    overflow: hidden;
`;

const Layout: React.FC = (props) => {
    return (
        <Wrapper>
            <SideBar />
            <MainCol>
                <ChildContainer>{props.children}</ChildContainer>
            </MainCol>
        </Wrapper>
    );
};

export default Layout;
