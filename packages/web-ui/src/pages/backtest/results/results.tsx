import { FC, useContext, useState } from "react";
import { Column } from "../../../components";
import { BacktestResults } from "@algotia/core";
import { Button, ButtonGroup, makeStyles, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import { BacktestContext } from "../context";
import Balance from "./balance";
import ClosedOrders from "./closedOrders";
import Errors from "./errors";
import OpenOrders from "./openOrders";

const ResultsTableWrapper = styled.div`
    height: 40%;
    width: 100%;
`;

const Header = styled(Toolbar)`
    height: 50px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 5px 0;
    justify-content: center;
    align-items: space-around;
`;

const useTabsStyles = makeStyles({
    root: {
        width: "auto",
    },
});

const TableBody = styled(Column)`
    height: 100%;
    width: calc(100% - 30px);
    margin: 0 auto;
`;

const Results: FC = () => {
    const { requestResult } = useContext(BacktestContext);

    const allGroups: [keyof BacktestResults, string][] = [
        ["balance", "balance"],
        ["closedOrders", "closed orders"],
        ["openOrders", "open orders"],
        ["errors", "errors"],
    ];

    const [activeGroup, setActiveGroup] = useState<keyof BacktestResults>(
        allGroups[0][0]
    );

    const tabClasses = useTabsStyles();

    return (
        <ResultsTableWrapper>
            <Header>
                <ButtonGroup>
                    {allGroups.map(([resultKey, label]) => {
                        if (requestResult?.results) {
                            label =
                                resultKey === "balance"
                                    ? resultKey
                                    : label +
                                      " (" +
                                      requestResult.results[resultKey].length +
                                      ")";
                            return (
                                <Button
                                    className={tabClasses.root}
                                    onClick={() => {
                                        setActiveGroup(resultKey);
                                    }}
                                >
                                    {label}
                                </Button>
                            );
                        } else {
                            return (
                                <Button
                                    className={tabClasses.root}
                                    onClick={() => {
                                        setActiveGroup(resultKey);
                                    }}
                                >
                                    {label}
                                </Button>
                            );
                        }
                    })}
                </ButtonGroup>
            </Header>
            <TableBody>
                {activeGroup === "balance" && <Balance />}
                {activeGroup === "closedOrders" && <ClosedOrders />}
                {activeGroup === "openOrders" && <OpenOrders />}
                {activeGroup === "errors" && <Errors />}
            </TableBody>
        </ResultsTableWrapper>
    );
};
export default Results;
// <Tabs
//     onChange={handleGroupChange}
//     value={activeGroup}
//     scrollButtons="auto"
// >
// </Tabs>
