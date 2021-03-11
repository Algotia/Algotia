import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import Spec from "@algotia/client/swagger.json";
import { Paper, styled } from "@material-ui/core";

const Wrapper = styled(Paper)({
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    backgroundColor: "#fff",
});

const Docs = () => {
    return (
        <Wrapper>
            <SwaggerUI spec={Spec} />
        </Wrapper>
    );
};

export default Docs;
