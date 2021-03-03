import { Paper, styled as muiStyled } from "@material-ui/core";

const Wrapper = muiStyled(Paper)(({ theme }) => ({
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: theme.palette.background.paper,
}));

const Strategies = () => {
    return <Wrapper />;
};

export default Strategies;
