import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { useState } from "react";
import { useDeleteWorkPermitMutation, useGetWorkPermitsQuery } from "../../services/features/workPermitApi";
import { formatFullDate } from "../../helpers/dateFormatter";
import Swal from "sweetalert2";

export default function WorkPermit() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const workPermitsQuery = useGetWorkPermitsQuery({page: currentPage, limit: pageSize, search,});
  const [ deleteWorkPermit ] = useDeleteWorkPermitMutation();

  const { data, isLoading, isError } = workPermitsQuery

  const formattedData = (data?.data || []).map((item) => ({
    ...item,
    startDate: formatFullDate(item.startDate),
    endDate: formatFullDate(item.endDate),
    createdAt: formatFullDate(item.createdAt),
    status: item.status === "APPROVED" ? "Disetujui" : item.status === "REJECTED" ? "Ditolak" : "Menunggu Persetujuan",
  }));

  const modifiedQuery = {
    ...workPermitsQuery,
    data: {
      ...workPermitsQuery.data,
      data: formattedData,
    },
  };

  const handleDeleteWorkPermit = async (workPermit) => {
    const result = await Swal.fire({
      title: "Hapus Work Permit?",
      text: `Anda yakin ingin menghapus work permit "${workPermit.title || workPermit.id}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteWorkPermit(workPermit.id).unwrap();

        Swal.fire({
          title: "Berhasil!",
          text: "Work Permit telah dihapus.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus Work Permit.",
          icon: "error",
        });
        console.error(err);
      }
    }
  };

  const columns = [
    { label: "No Izin", key: "no" },
    { label: "Perusahaan", key: "company" },
    { label: "Tanggal Pengajuan", key: "createdAt" },
    { label: "Status", key: "status" },
  ];

  const actions = (row) => [
    { label: "Edit", onClick: () => navigate(`/work-permits/${row.id}/edit`) },
    { label: "Delete", onClick: () => handleDeleteWorkPermit(row), danger: true },
  ];

  return (
    <div className="min-h-[calc(100vh-96px)] sm:min-h-[calc(100vh-80px)] text-gray-900 transition-colors duration-200 space-y-6">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-white">Daftar Izin Kerja</h1>

        {!isLoading && !isError && (
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white rounded-lg shadow-md">
            <DataTable
              title={data?.pagination?.total > 0 ? `Total Izin Kerja: ${data.pagination.total}` : "Belum ada izin kerja"}
              description={data?.pagination?.total > 0 ? "Kelola izin kerja Anda di sini." : "Klik tombol di bawah untuk menambahkan izin kerja baru."}
              actionLabel="Pengajuan Baru"
              onActionClick={() => navigate("/create")}
              columns={columns}
              actions={actions}
              queryHook={modifiedQuery}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              search={search}
              setSearch={setSearch}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}
