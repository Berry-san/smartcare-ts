import pencil from '../assets/pencil.svg'
import deleteImg from '../assets/delete.svg'
import { useState } from 'react'
import Modal from './Modal'
import Pagination from './Pagination/Pagination'
import { Article } from 'Pages/Articles'
import Editor from './Editor'

interface TableRowData {
  id: number
  title: string
  description: string
  imageUrl: string
  inserted_dt: string
  likes?: number
}

interface TableProps {
  data: TableRowData[]
  handleDelete: (id: string) => void
  handleEdit: (article: Article) => void
  deleteModal: boolean
  editModal: boolean
  deleteModalFunction: React.Dispatch<React.SetStateAction<boolean>>
  editModalFunction: React.Dispatch<React.SetStateAction<boolean>>
}

const Table: React.FC<TableProps> = ({
  data,
  handleDelete,
  handleEdit,
  deleteModal,
  editModal,
  deleteModalFunction,
  editModalFunction,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const openDeleteModal = (articleId: string) => {
    setSelectedArticle({
      id: parseInt(articleId),
      title: '',
      description: '',
      imageUrl: '',
      inserted_dt: '',
    })
    deleteModalFunction(true)
  }

  const openEditModal = (article: Article) => {
    setSelectedArticle(article)
    editModalFunction(true)
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const usersPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser: number = currentPage * usersPerPage
  const indexOfFirstUser: number = indexOfLastUser - usersPerPage

  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div className="max-w-full overflow-x-auto text-black">
      <table className="min-w-full bg-white border divide-y rounded-md divide-gray border-gray shadow-default">
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
          {currentUsers.map((row, index) => {
            const date = row.inserted_dt.match(
              /^[A-Za-z]+\s\d{1,2},\s\d{4}/
            )?.[0]
            return (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-no-wrap">{row.title}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {row.likes ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{date}</td>
                <td className="flex px-6 py-4 space-x-5 whitespace-no-wrap">
                  <button
                    onClick={() => openEditModal(row as unknown as Article)}
                    className="flex items-center justify-center px-4 py-2 space-x-3 bg-purple-100 rounded-md text-secondary w-28"
                  >
                    <img src={pencil} alt="" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(row.id.toString())}
                    className="flex items-center justify-center px-4 py-2 ml-2 space-x-3 text-red-400 bg-red-100 rounded-md w-28"
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
          totalCount={data.length}
          pageSize={usersPerPage}
          siblingCount={1}
        />
      </div>
      <Modal isVisible={deleteModal} onClose={() => deleteModalFunction(false)}>
        <div className="text-center">
          <p>Are you sure you want to delete this article?</p>
          <div className="flex justify-center mt-5 space-x-5">
            <button
              onClick={() => {
                if (selectedArticle) {
                  handleDelete(selectedArticle.id.toString())
                }
              }}
              className="px-4 py-2 text-white bg-red-600 rounded-md"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => deleteModalFunction(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal isVisible={editModal} onClose={() => editModalFunction(false)}>
        {selectedArticle && (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Edit Article</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                console.log(selectedArticle)
                if (selectedArticle) {
                  handleEdit(selectedArticle)
                  editModalFunction(false)
                }
              }}
            >
              <div className="mt-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={selectedArticle.title}
                  onChange={(e) =>
                    setSelectedArticle({
                      ...selectedArticle,
                      title: e.target.value,
                    })
                  }
                  className="px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm w-96 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Editor
                  placeholder="Write anything you want."
                  id="description"
                  value={selectedArticle.description}
                  onChange={(value) =>
                    setSelectedArticle({
                      ...selectedArticle,
                      description: value,
                    })
                  }
                  // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  //   setSelectedArticle({
                  //     ...selectedArticle,
                  //     DESCRIPTION: e.target.value,
                  //   })
                  // }
                />
                {/* <textarea
                  id="DESCRIPTION"
                  value={selectedArticle.DESCRIPTION}
                  onChange={(e) =>
                    setSelectedArticle({
                      ...selectedArticle,
                      DESCRIPTION: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  required
                /> */}
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="submit"
                  onClick={() => {
                    if (selectedArticle) {
                      handleEdit(selectedArticle)
                    }
                  }}
                  className="px-4 py-2 text-white rounded-md bg-secondary"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => editModalFunction(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Table
