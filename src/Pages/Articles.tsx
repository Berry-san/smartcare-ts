import { useState } from 'react'
import Table from '../Components/Table'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'

const Articles = () => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
    // const filtered = sortedData.filter(
    //   (item) =>
    //     // item.firstName.toLowerCase().includes(searchValue) ||
    //     item.document_owner.toLowerCase().includes(searchValue) ||
    //     item.department.toLowerCase().includes(searchValue)
    // )
    // setFilteredData(filtered)
  }
  return (
    <div>
      <h2 className="text-2xl font-bold">Articles</h2>
      <div className="flex flex-col items-center justify-between w-full mt-5 space-y-3 md:flex-row md:space-y-0">
        <div className="w-full">
          <div className="flex flex-col space-y-3">
            <label htmlFor="">Search for an article</label>
            <div className="w-full">
              <input
                type="search"
                name="search"
                className="rounded w-full md:1/2 lg:w-1/3 px-5 py-2 border-b border-secondary text-sm text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4]"
                autoComplete="off"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <Link to="/write-article">
          <Button text={'Write an article'} />
        </Link>
      </div>
      <div className="mt-10">
        <Table />
      </div>
    </div>
  )
}

export default Articles
