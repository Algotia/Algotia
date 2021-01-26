import { FC, useContext } from "react";
import { ColDef, DataGrid } from "@material-ui/data-grid";
import { BacktestContext } from "../context";
import styled from "styled-components";

const columns: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "side", headerName: "Side", width: 85 },
    { field: "amount", headerName: "Amount", flex: 0.7 },
    { field: "price", headerName: "Price", flex: 0.8 },
    { field: "cost", headerName: "Cost", flex: 0.8 },
];

const Wrapper = styled.div`
    height: calc(100% - 75px);
`;

const ClosedOrders: FC = () => {
    const { requestResult } = useContext(BacktestContext);

    const quotePrecision = requestResult?.market.precision.quote || 2;
    const basePrecision = requestResult?.market.precision.base || 2;

    const rows = requestResult?.results.closedOrders.map((order, i) => {
        const { side, amount, price, cost, timestamp } = order;
        return {
            id: i,
            side,
            cost: parseFloat(cost.toFixed(quotePrecision)),
            price: parseFloat(price.toFixed(quotePrecision)),
            amount: parseFloat(amount.toFixed(basePrecision)),
            timestamp,
        };
    });

    return (
        <Wrapper>
            <DataGrid
                rows={rows || []}
                columns={columns}
                density="compact"
                rowsPerPageOptions={[100]}
            />
        </Wrapper>
    );
};

export default ClosedOrders;
