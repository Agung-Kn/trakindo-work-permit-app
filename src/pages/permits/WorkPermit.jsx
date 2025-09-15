import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { useState } from "react";

export default function WorkPermit() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const permits = [];

  const columns = [
    { label: "No Izin", key: "company" },
    { label: "Tanggal Pengajuan", key: "startDate" },
    { label: "Tanggal Mulai", key: "startDate" },
    { label: "Tanggal Selesai", key: "endDate" },
    { label: "Status", key: "pic" },
  ];

  const actions = (row) => [
    { label: "Edit", onClick: () => navigate(`/work-permits/${row.id}/edit`) },
    {
      label: "Delete",
      onClick: async () => {
        if (confirm("Delete this permit?")) {
          
        }
      },
      danger: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-96px)] sm:min-h-[calc(100vh-80px)] text-gray-900 transition-colors duration-200 space-y-6">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-white">Daftar Izin Kerja</h1>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white rounded-lg shadow-md">
          <DataTable
            actionLabel="Pengajuan Baru"
            onActionClick={() => navigate("/create")}
            columns={columns}
            actions={actions}
            queryHook={permits}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            search={search}
            setSearch={setSearch}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}
