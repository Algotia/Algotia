import { FC, useContext, useState } from "react";
import { Column } from "../../../components";
import { BacktestResults } from "@algotia/core";
import { Tab, Tabs, styled as muiStyled } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
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

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: space-around;
`;

const TableBody = styled(Column)`
    height: calc(100% - 50px);
    width: 100%;
    margin: 0 auto;
`;

const CustomTab = muiStyled(Tab)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

const Panel = muiStyled(TabPanel)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const Results: FC = () => {
    const { requestResult } = useContext(BacktestContext);

    const allGroups: [keyof BacktestResults, string, FC][] = [
        ["balance", "balance", Balance],
        ["closedOrders", "closed orders", ClosedOrders],
        ["openOrders", "open orders", OpenOrders],
        ["errors", "errors", Errors],
    ];

    const [activeGroup, setActiveGroup] = useState<keyof BacktestResults>(
        allGroups[0][0]
    );

    const getItems = (key: keyof BacktestResults): number => {
        return requestResult?.results[key].length;
    };

    return (
        <ResultsTableWrapper>
            <TabContext value={activeGroup}>
                <Header>
                    <Tabs
                        value={activeGroup}
                        onChange={(_, val) => {
                            setActiveGroup(val);
                        }}
                    >
                        {allGroups.map(([key, label]) => {
                            return (
                                <CustomTab
                                    key={key}
                                    label={
                                        <div>
                                            {label}
                                        </div>
                                    }
                                    value={key}
                                />
                            );
                        })}
                    </Tabs>
                </Header>
                <TableBody>
                    {allGroups.map(([key, _, Component]) => {
                        return (
                            <Panel
                                key={key}
                                value={key}
                                style={{ height: "100%" }}
                            >
                                <Component />
                            </Panel>
                        );
                    })}
                </TableBody>
            </TabContext>
        </ResultsTableWrapper>
    );
};
export default Results;
