import { DataGrid, GridColumns, GridRowsProp } from "@material-ui/data-grid";
import { FC } from "react";

export const Grid: FC<{
    columns: GridColumns;
    rows: GridRowsProp | undefined;
}> = ({ columns, rows }) => {
    return (
        <DataGrid
            columns={columns}
            rows={rows || []}
            density="compact"
            hideFooter={true}
        />
    );
};
