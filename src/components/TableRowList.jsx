import React from "react";
import TableRowComp from "./TableRowComp";

function TableRowList({ data }) {
    return (
        <div className="flex flex-col">
            {data.map((item, index) => (
                <TableRowComp key={index} item={item} />
            ))}
        </div>
    );
}

export default TableRowList;