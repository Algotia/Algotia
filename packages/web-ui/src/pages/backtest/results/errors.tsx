import { BacktestResults, OHLCV, parsePair } from "@algotia/core";
import { FC, useContext } from "react";
import { BacktestContext, Options } from "../context";
import { ColDef, DataGrid } from "@material-ui/data-grid";

const columns: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "at", headerName: "At", flex: 1 },
    { field: "message", headerName: "Message", flex: 2 },
];

const Errors: FC = () => {
    const { requestResult } = useContext(BacktestContext);

    const rows = requestResult?.results.errors.map((error, i) => {
        const { timestamp, message } = error;
        return {
            id: i,
            message,
            at: new Date(timestamp),
        };
    });

    return (
        <DataGrid
            rows={rows || []}
            columns={columns}
            density="compact"
            disableSelectionOnClick={true}
            rowsPerPageOptions={[100]}
        />
    );
};

export default Errors;
