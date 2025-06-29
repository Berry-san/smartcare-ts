import { useState } from 'react'
import { apiService } from 'middleware/ApiServices'
import { useQuery } from 'react-query'
import { Column } from 'Components/UserTable'
import UserTable from 'Components/UserTable'

interface User {
  firstname: string
  lastname: string
  user_id: string
  email_address: string
  phone_number: string
  inserted_dt: string
}

const Users = () => {
  const [search, setSearch] = useState('')

  const { data: users = [], error: fetchError } = useQuery<User[]>(
    'users',
    apiService.listUsers
  )

  const reversedData = [...users].reverse()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
  }

  const columns: Column[] = [
    { header: 'First Name', key: 'firstname' },
    { header: 'Last Name', key: 'lastname' },
    { header: 'Email', key: 'email_address' },
    { header: 'Phone Number', key: 'phone_number' },
    {
      header: 'Date of Registration',
      key: 'inserted_dt',
    },
  ]

  const filteredUsers = reversedData.filter(
    (user) =>
      (user.firstname?.toLowerCase() || '').includes(search) ||
      (user.lastname?.toLowerCase() || '').includes(search)
  )

  if (fetchError) {
    return <div>Failed to load users</div>
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

      {users.length > 0 ? (
        <UserTable columns={columns} data={filteredUsers} />
      ) : (
        <p className="mt-4 text-center">No user found</p>
      )}
    </div>
  )
}

export default Users
