import { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    background-color: #007acc;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
`;

const BottomBar: FC<{ height: string }> = ({ height }) => {
    return <Wrapper style={{ height }}></Wrapper>;
};

export default BottomBar;
