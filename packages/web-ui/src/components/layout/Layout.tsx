import React from "react";
import styled from "styled-components";
import { Column, Row } from "../shared";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

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
    padding: 10px;
	box-sizing: border-box;
`;

const Layout: React.FC = (props) => {
    return (
        <Wrapper>
            <SideBar />
            <MainCol>
                <Header />
				<ChildContainer>
                {props.children}
				</ChildContainer>
                <Footer />
            </MainCol>
        </Wrapper>
    );
};

export default Layout;
