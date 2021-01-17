import { BacktestResults, OHLCV } from "@algotia/core";
import { Paper } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { FC, useState } from "react";
import styled from "styled-components";
import { Column } from "../../../components";
import { Options } from "../backtest";
import Balance from "./balance";

const ResultsTableWrapper = styled(Column)`
    height: 100%;
    width: 100%;
`;

const Header = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    padding: 5px 0;
    box-sizing: border-box;
    justify-content: center;
    align-items: space-around;
`;

const Body = styled.div`
	flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    border: 2px solid #808080;
    box-sizing: border-box;
`;

const ResultsTable: FC<{
    results: BacktestResults;
    options: Options;
    candles: OHLCV[];
}> = (props) => {
    const { results, options, candles } = props;

    const allGroups = [
        "Balance",
        "Closed Orders",
        "Open Orders",
        "Errors",
    ] as const;

    const [group, setGroup] = useState<typeof allGroups[number]>(allGroups[0]);

    const handleGroupChange = (_: any, groupName: any) => {
        setGroup(groupName);
    };

    return (
        <ResultsTableWrapper>
            <Header>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    onChange={handleGroupChange}
                    value={group}
                >
                    {allGroups.map((groupName) => {
                        return (
                            <ToggleButton value={groupName}>
                                {groupName}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </Header>
            <Body>
                {group === "Balance" && (
                    <Balance
                        options={options}
                        results={results}
                        candles={candles}
                    />
                )}
            </Body>
        </ResultsTableWrapper>
    );
};

export default ResultsTable;
