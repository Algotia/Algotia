import { BacktestResults } from "@algotia/core";
import { FC } from "react";
import { ColDef, DataGrid } from "@material-ui/data-grid";

const columns: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "side", headerName: "Side", width: 85 },
    { field: "amount", headerName: "Amount", flex: 0.7 },
    { field: "price", headerName: "Price", flex: 0.8 },
    { field: "cost", headerName: "Cost", flex: 0.8 },
];

const ClosedOrders: FC<{
    results: BacktestResults | undefined;
}> = (props) => {
    const { results } = props;

    const rows = results?.closedOrders.map((order, i) => {
        const { side, amount, price, cost, timestamp } = order;
        return {
            id: i,
            side,
            cost,
            price,
            amount,
            timestamp,
        };
    });

    return (
        <DataGrid
            rows={rows || []}
            columns={columns}
            density="compact"
            rowsPerPageOptions={[100]}
        />
    );
};

export default ClosedOrders;
