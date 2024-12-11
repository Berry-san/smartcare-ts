import { useState } from 'react'
import { apiService } from 'middleware/ApiServices'
import { useQuery } from 'react-query'

interface User {
  firstname: string
  lastname: string
  user_id: string
  email_address: string
  inserted_dt: string
  phone_number:string
  business_id:string
  business_name:string
  contact_person:string
  currentBalance: string
}

const Business = () => {
  const [search, setSearch] = useState('')

  const { data: users = [], error: fetchError } = useQuery<User[]>(
    'business',
    apiService.listBusinesses
  )

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search) ||
      user.lastname.toLowerCase().includes(search)
  )


  if (fetchError) {
    return <div>Failed to load users</div>
  }

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">List of registered Businesses</h2>
        
      </div>
      
      <table className=' mx-auto mt-5' >
        <thead>
          <tr>
            <th className=' p-5 text-center border'>Name</th>
            <th className=' p-5 text-center border' align="right">Email</th>
            <th className=' p-5 text-center border' align="right">Phone number</th>
            <th className=' p-5 text-center border' align="right">Business name</th>
            <th className=' p-5 text-center border' align="right">Contact person</th>
            <th className=' p-5 text-center border' align="right">Current balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((row,i) => (
            <tr
              key={i}
             
            >
              <th className=' p-5 text-center border' scope="row">
                {row.firstname} {row.lastname}
              </th>
              <th className=' p-5 text-center border' align="right">{row.email_address}</th>
              <th className=' p-5 text-center border' align="right">{row.phone_number}</th>
              <th className=' p-5 text-center border' align="right">{row.business_name}</th>
              <th className=' p-5 text-center border' align="right">{row.contact_person}</th>
              <th className=' p-5 text-center border' align="right">{row.currentBalance}</th>
            </tr>
          ))}
        </tbody>
      </table>
   
      {/* User Cards */}
      
    </div>
  )
}

export default Business
