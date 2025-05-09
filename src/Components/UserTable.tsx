import { useState } from 'react'
import Pagination from './Pagination/Pagination'

export interface Column {
  header: string
  key: string
  format?: (value: any) => React.ReactNode
}

interface UserTableProps {
  columns: Column[]
  data: Array<Record<string, any>>
}

const UserTable: React.FC<UserTableProps> = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedItems = data.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <>
      <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-300 border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase "
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((row, rowIndex) => (
              <tr
                key={data[rowIndex].user_id}
                // onClick={() => handleRowClick(row)}
                className="cursor-pointer"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="max-w-[10rem] px-6 py-4 text-sm text-gray-700 capitalize truncate whitespace-nowrap"
                  >
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paginatedItems && (
        <div className="flex justify-center mt-2">
          <Pagination
            currentPage={currentPage}
            onPageChange={paginate}
            totalCount={data.length}
            pageSize={itemsPerPage}
            siblingCount={1}
          />
        </div>
      )}
    </>
  )
}

export default UserTable
