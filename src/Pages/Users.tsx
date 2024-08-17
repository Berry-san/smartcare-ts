import { useState } from 'react'
import UserCard from '../Components/User-Card'

const Users = () => {
  const [search, setSearch] = useState('')

  // Sample user data (replace this with your actual data)
  const users = [
    {
      name: 'Ayo Maff',
      date: '22/09/2000',
      document_owner: 'Ayo Maff',
      department: 'Engineering',
    },
    {
      name: 'Jane Doe',
      date: '15/07/1999',
      document_owner: 'Jane Doe',
      department: 'Marketing',
    },
    {
      name: 'John Smith',
      date: '30/11/1985',
      document_owner: 'John Smith',
      department: 'Sales',
    },
    // Add more users as needed
  ]

  // Filter the users based on the search input
  const filteredUsers = users.filter(
    (user) =>
      user.document_owner.toLowerCase().includes(search) ||
      user.name.toLowerCase().includes(search)
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
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
        {filteredUsers.map((user, index) => (
          <UserCard key={index} name={user.name} date={user.date} />
        ))}
      </div>
    </div>
  )
}

export default Users
