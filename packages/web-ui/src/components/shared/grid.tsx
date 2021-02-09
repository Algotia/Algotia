import { DataGrid, Columns, RowsProp } from "@material-ui/data-grid";
import { FC } from "react";

export const Grid: FC<{ columns: Columns; rows: RowsProp | undefined }> = ({
    columns,
    rows,
}) => {
    return (
        <DataGrid
            columns={columns}
            rows={rows || []}
            density="compact"
            hideFooter={true}
        />
    );
};
