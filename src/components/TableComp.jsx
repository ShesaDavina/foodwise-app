import React from "react";
import TableRowList from "./TableRowList";

function TableComp({ data }) {
    return (
        <div className="w-full">
            {/* Desktop View - Tabel */}
            <div className="hidden md:block w-full overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Header */}
                    <div className="grid grid-cols-7 gap-4 px-5 py-5 bg-linear-to-b from-[#FFF1DF] to-white rounded-2xl mb-4">
                        <div className="text-left text-sm font-semibold text-gray-700 ms-4">Status</div>
                        <div className="text-left text-sm font-semibold text-gray-700">Nama</div>
                        <div className="text-left text-sm font-semibold text-gray-700">Kategori</div>
                        <div className="text-left text-sm font-semibold text-gray-700">Tanggal Beli</div>
                        <div className="text-left text-sm font-semibold text-gray-700">Kadaluarsa</div>
                        <div className="text-left text-sm font-semibold text-gray-700">Total</div>
                        <div className="text-left text-sm font-semibold text-gray-700">Detail</div>
                    </div>

                    {/* Body */}
                    <TableRowList data={data} />
                </div>
            </div>

            {/* Mobile View - Card List */}
            <div className="md:hidden">
                <TableRowList data={data} />
            </div>
        </div>
    );
}

export default TableComp;