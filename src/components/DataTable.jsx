import ActionMenu from "./atoms/ActionMenu";
import Pagination from "./atoms/Pagination";
import Button from "./forms/Button";

export default function DataTable({
  title,
  description,
  actionLabel,
  onActionClick,
  columns = [],
  actions = [],
  queryHook,
  currentPage,
  setCurrentPage,
  search,
  setSearch,
  pageSize = 10,
  searchable = true,
}) {
  const { data, isLoading, isError, error } = queryHook;

  const totalItems = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const tableData = data?.data || [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="sm:flex-row sm:items-center sm:justify-between mb-4 pl-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <hr className="my-3 text-gray-300" />

      {/* Actions & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center justify-between w-full gap-3">
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 w-screen max-w-xs rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          )}
          {actionLabel && <Button children={actionLabel} onClick={onActionClick} />}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-sm w-1 font-semibold text-gray-900">No.</th>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">{col.label}</th>
              ))}
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {tableData.length > 0 ? tableData.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center text-sm w-1 whitespace-nowrap text-gray-500">
                  {index + 1 + (currentPage - 1) * pageSize}
                </td>
                {columns.map((col, i) => (
                  <td key={i} className="px-6 py-4 text-sm text-gray-500">{row[col.key] || "-"}</td>
                ))}
                <td className="px-6 py-4 text-center text-sm">
                  <ActionMenu actions={typeof actions === "function" ? actions(row) : actions} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-4 text-center text-sm text-gray-500">No data found.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={columns.length + 2}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {isLoading && <p className="text-center mt-4 text-gray-500">Loading...</p>}
      {isError && <p className="text-center mt-4 text-red-500">Error: {error?.data?.message || error?.error}</p>}
    </div>
  );
}
