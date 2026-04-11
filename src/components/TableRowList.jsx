import React from "react";
import TableRowComp from "./TableRowComp";

function TableRowList({ data = [] }) { // ← default empty array
    if (!Array.isArray(data)) {
        console.error('Data bukan array:', data);
        return <div>No data</div>;
    }

    return (
        <div className="flex flex-col">
            {data.map((item, index) => (
                <TableRowComp key={item.id || index} item={item} />
            ))}
        </div>
    );
}

export default TableRowList;