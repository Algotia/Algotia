import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Spec from "@algotia/server/spec/swagger.json";
import { Paper, styled } from "@material-ui/core";

const Wrapper = styled(Paper)({
    height: "100%",
    width: "100%",
    overflowY: "scroll",
});

const Docs = () => {
    return (
        <Wrapper>
            <SwaggerUI spec={Spec} />
        </Wrapper>
    );
};

export default Docs;
