import { BacktestResults, OHLCV, parsePair } from "@algotia/core";
import { FC, useContext } from "react";
import { BacktestContext, Options } from "../context";
import { ColDef, DataGrid } from "@material-ui/data-grid";

const columns: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "side", headerName: "Side", width: 85 },
    { field: "amount", headerName: "Amount", flex: 0.7 },
    { field: "price", headerName: "Price", flex: 0.8 },
    { field: "cost", headerName: "Cost", flex: 0.8 },
];

const OpenOrders: FC = () => {
    const { requestResult } = useContext(BacktestContext);

    const rows = requestResult?.results.openOrders.map((order, i) => {
        const { side, amount, price, cost } = order;
        return {
            id: i,
            side,
            cost,
            price,
            amount,
        };
    });

    return (
        <DataGrid
            rows={rows || []}
            columns={columns}
            density="compact"
            rowsPerPageOptions={[100]}
            disableSelectionOnClick={true}
        />
    );
};

export default OpenOrders;
