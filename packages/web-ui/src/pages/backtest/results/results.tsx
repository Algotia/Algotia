import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { Column } from "../../../components";
import { BacktestResults, OHLCV } from "@algotia/core";
import { makeStyles, Tab, Tabs, Toolbar } from "@material-ui/core";
import styled from "styled-components";
import { BacktestContext } from "../context";
import Balance from "./balance";
import ClosedOrders from "./closedOrders";
import Errors from "./errors";
import OpenOrders from "./openOrders";

const ResultsTableWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const Header = styled(Toolbar)`
    height: 50px;
    max-width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 5px 0;
    justify-content: center;
    align-items: space-around;
`;

const Body = styled.div`
    height: calc(100% - 65px);
    box-sizing: border-box;
`;

const useTabsStyles = makeStyles({
    root: {
        width: "auto",
    },
});

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 15px;
    box-sizing: border-box;
`;

const TableBody = styled(Column)`
    height: 100%;
    width: 100%;
    margin: 0 auto;
`;

const Results: FC = () => {
    const { results, options, candles } = useContext(BacktestContext);

    const allGroups: [keyof BacktestResults, string][] = [
        ["balance", "balance"],
        ["closedOrders", "closed orders"],
        ["openOrders", "open orders"],
        ["errors", "errors"],
    ];

    const [activeGroup, setActiveGroup] = useState<keyof BacktestResults>(
        allGroups[0][0]
    );

    const handleGroupChange = (_: any, groupName: keyof BacktestResults) => {
        setActiveGroup(groupName);
    };

    const tabClasses = useTabsStyles();
    return (
        <Wrapper>
            <Body>
                <ResultsTableWrapper>
                    <Header>
                        <Tabs
                            onChange={handleGroupChange}
                            value={activeGroup}
                            scrollButtons="auto"
                        >
                            {allGroups.map(([resultKey, label]) => {
                                if (results) {
                                    label =
                                        resultKey === "balance"
                                            ? resultKey
                                            : label +
                                              " (" +
                                              results[resultKey].length +
                                              ")";
                                    return (
                                        <Tab
                                            className={tabClasses.root}
                                            value={resultKey}
                                            label={label}
                                        />
                                    );
                                } else {
                                    return (
                                        <Tab
                                            className={tabClasses.root}
                                            value={resultKey}
                                            label={label}
                                        />
                                    );
                                }
                            })}
                        </Tabs>
                    </Header>
                    <TableBody>
                        {activeGroup === "balance" && (
                            <Balance
                                options={options}
                                results={results}
                                candles={candles}
                            />
                        )}
                        {activeGroup === "closedOrders" && (
                            <ClosedOrders results={results} />
                        )}
                        {activeGroup === "openOrders" && (
                            <OpenOrders results={results} candles={candles} />
                        )}
                        {activeGroup === "errors" && (
                            <Errors results={results} />
                        )}
                    </TableBody>
                </ResultsTableWrapper>
            </Body>
        </Wrapper>
    );
};
export default Results;

