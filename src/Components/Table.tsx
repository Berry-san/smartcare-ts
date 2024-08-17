import pencil from '../assets/pencil.svg'
import deleteImg from '../assets/delete.svg'
import { useState } from 'react'
import Modal from './Modal'
import Pagination from './Pagination/Pagination'

interface TableRowData {
  id: number
  title: string
  likes: number
  inserted_dt: string
}
interface TableProps {
  data: TableRowData[]
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(1) // Track the current page
  const usersPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser: number = currentPage * usersPerPage
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage

  // Assuming `filteredData` is an array of users
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div className="max-w-full overflow-x-auto  text-black">
      <table className="min-w-full divide-y divide-gray bg-white border rounded-md border-gray shadow-default">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left uppercase bg-gray-200">
              Title
            </th>
            <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left uppercase bg-gray-200">
              Likes
            </th>
            <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left uppercase bg-gray-200">
              Date Posted
            </th>
            <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left uppercase bg-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray">
          {data.map((row, index) => {
            const date = row.inserted_dt.match(
              /^[A-Za-z]+\s\d{1,2},\s\d{4}/
            )?.[0]
            return (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-no-wrap">{row.title}</td>
                {/* <td className="px-6 py-4 whitespace-no-wrap">{row.likes}</td> */}
                <td className="px-6 py-4 whitespace-no-wrap">2,005</td>
                <td className="px-6 py-4 whitespace-no-wrap">{date}</td>
                <td className="flex space-x-5 px-6 py-4 whitespace-no-wrap">
                  <button className="flex space-x-3 items-center justify-center bg-purple-100 text-secondary w-28 px-4 py-2 rounded-md">
                    <img src={pencil} alt="" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex space-x-3 items-center justify-center ml-2 bg-red-100 text-red-400 w-28 px-4 py-2 rounded-md"
                  >
                    <img src={deleteImg} alt="" />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={paginate}
          totalCount={data?.length}
          pageSize={usersPerPage}
          siblingCount={1}
          // className="my-3"
        />
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div>Hello</div>
      </Modal>
    </div>
  )
}

export default Table
