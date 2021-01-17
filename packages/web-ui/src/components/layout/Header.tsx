import React from "react";
import styled from "styled-components";
import { Row } from "../shared";

const Wrapper = styled(Row)`
    width: 100%;
    height: 25px;
    background-color: white;
    border-bottom: 2px solid #000;
`;

const Header = () => {
    return (
        <>
            <Wrapper></Wrapper>
        </>
    );
};

export default Header;
