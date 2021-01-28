import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Spec from "@algotia/server/spec/swagger.json";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
`;

const Docs = () => {
    return (
        <Wrapper>
            <SwaggerUI spec={Spec} />
        </Wrapper>
    );
};

export default Docs;
