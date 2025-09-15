import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { useState } from "react";
import { formatFullDate } from "../../helpers/dateFormatter";
import Swal from "sweetalert2";
import { useApprovePermitMutation, useGetPermitsQuery } from "../../services/features/managePermitApi";

export default function ManagePermit() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const managePermitsQuery = useGetPermitsQuery({page: currentPage, limit: pageSize, search,});
  const [ approvePermit ] = useApprovePermitMutation();

  const { data, isLoading, isError } = managePermitsQuery

  const formattedData = (data?.data || []).map((item) => ({
    ...item,
    startDate: formatFullDate(item.startDate),
    endDate: formatFullDate(item.endDate),
    createdAt: formatFullDate(item.createdAt),
    status: item.userStatus === "APPROVED" ? "Disetujui" : item.status === "REJECTED" ? "Ditolak" : "Menunggu Persetujuan",
  }));

  const modifiedQuery = {
    ...managePermitsQuery,
    data: {
      ...managePermitsQuery.data,
      data: formattedData,
    },
  };

  const handleApprove = async (managePermit) => {
    const { isConfirmed } = await Swal.fire({
      title: "Setujui Izin Kerja?",
      text: `Anda yakin ingin menyetujui izin kerja dari "${managePermit.pic}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Setujui",
      cancelButtonText: "Batal",
    });

    if (!isConfirmed) return;

    Swal.fire({
      title: "Memproses...",
      text: "Sedang menyetujui izin kerja.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await approvePermit({
        id: managePermit.id,
        status: "APPROVED"  
      }).unwrap();

      Swal.fire({
        title: "Berhasil!",
        text: "Izin kerja berhasil disetujui.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err?.data?.message || "Terjadi kesalahan saat menyetujui izin kerja.",
        icon: "error",
      });
    }
  };

  const handleReject = async (managePermit) => {
    const result = await Swal.fire({
      title: "Hapus Manage Permit?",
      text: `Anda yakin ingin menghapus manage permit "${managePermit.title || managePermit.id}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await approvePermit(managePermit.id).unwrap();

        Swal.fire({
          title: "Berhasil!",
          text: "Manage Permit telah dihapus.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus Manage Permit.",
          icon: "error",
        });
      }
    }
  };

  const columns = [
    { label: "No Izin", key: "no" },
    { label: "Nama", key: "pic" },
    { label: "Tanggal Pengajuan", key: "createdAt" },
    { label: "Status", key: "status" },
  ];

  const actions = (row) => [
    { label: "Review", onClick: () => handleReview(row) },
    { label: "Approve", onClick: () => handleApprove(row) },
    { label: "Reject", onClick: () => handleReject(row), danger: true },
  ];

  return (
    <div className="min-h-[calc(100vh-96px)] sm:min-h-[calc(100vh-80px)] text-gray-900 transition-colors duration-200 space-y-6">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-white">Daftar Izin Kerja</h1>

        {!isLoading && !isError && (
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white rounded-lg shadow-md">
            <DataTable
              title="Daftar Izin Kerja karyawan"
              description="Klik tombol action di review, approve atau reject izin kerja."
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
