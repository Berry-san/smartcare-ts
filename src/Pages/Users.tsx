import { useState } from 'react'
import UserCard from '../Components/User-Card'
const Users = () => {
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
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Users</h2>
        <div className="flex flex-col space-y-3">
          <label htmlFor="">Search for a user</label>
          <input
            type="search"
            name="search"
            className="rounded w-full md:w-1/2 lg:w-1/3 px-5 py-2 border-b border-secondary text-sm text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4]"
            autoComplete="off"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-4">
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
        <UserCard name="Ayo Maff" date="22/09/2000" />
      </div>
    </div>
  )
}

export default Users
