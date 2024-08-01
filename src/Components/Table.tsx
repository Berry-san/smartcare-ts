import pencil from '../assets/pencil.svg'
import deleteImg from '../assets/delete.svg'

const Table = () => {
  return (
    <div className="max-w-full overflow-x-auto bg-white border rounded-md border-gray shadow-default text-black">
      <table className="min-w-full divide-y divide-gray">
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
        {/* <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
              <td className="px-6 py-4 capitalize whitespace-no-wrap">
                {row.user_name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.email}</td>
              <td className="px-6 py-4 capitalize whitespace-no-wrap">
                {row.user_type}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {row.inserted_dt}
              </td>
            </tr>
          ))}
        </tbody> */}
        <tbody className="bg-white divide-y divide-gray">
          <tr key={1} className={1 % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="px-6 py-4 whitespace-no-wrap">
              4 Habits of emotionally strong people
            </td>
            {/* <td className="px-6 py-4 capitalize whitespace-no-wrap"></td> */}
            <td className="px-6 py-4 whitespace-no-wrap">2,008</td>
            {/* <td className="px-6 py-4 capitalize whitespace-no-wrap"></td> */}
            <td className="px-6 py-4 whitespace-no-wrap">29th April, 2023</td>
            <td className="flex space-x-5 px-6 py-4 whitespace-no-wrap">
              <button className="flex space-x-3 items-center justify-center bg-purple-100 text-secondary w-28 px-4 py-2 rounded-md">
                <img src={pencil} alt="" />
                <span>Edit</span>
              </button>
              <button className="flex space-x-3 items-center justify-center ml-2 bg-red-100 text-red-400 w-28 px-4 py-2 rounded-md">
                <img src={deleteImg} alt="" />
                <span>Delete</span>
              </button>
            </td>
          </tr>
          <tr key={2} className={1 % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="px-6 py-4 whitespace-no-wrap">
              4 Habits of emotionally strong people
            </td>
            {/* <td className="px-6 py-4 capitalize whitespace-no-wrap"></td> */}
            <td className="px-6 py-4 whitespace-no-wrap">2,008</td>
            {/* <td className="px-6 py-4 capitalize whitespace-no-wrap"></td> */}
            <td className="px-6 py-4 whitespace-no-wrap">29th April, 2023</td>
            <td className="flex space-x-5 px-6 py-4 whitespace-no-wrap">
              <button className="flex space-x-3 items-center justify-center bg-purple-100 text-secondary w-28 px-4 py-2 rounded-md text-sm">
                <img src={pencil} alt="" />
                <span>Edit</span>
              </button>
              <button className="flex space-x-3 items-center justify-center ml-2 bg-red-100 text-red-400 w-28 px-4 py-2 rounded-md text-sm">
                <img src={deleteImg} alt="" />
                <span>Delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
