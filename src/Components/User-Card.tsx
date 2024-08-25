import download from '../assets/download.svg'
import { jsPDF } from 'jspdf'
import { useQuery } from 'react-query'
import { apiService } from 'middleware/ApiServices'

interface UserCardProps {
  firstname: string
  lastname: string
  date: string
  user_id: string
  email: string
}

const UserCard: React.FC<UserCardProps> = ({
  firstname,
  lastname,
  date,
  user_id,
  email,
}) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(['user', user_id], () => apiService.getSingleUser(user_id), {
    enabled: false, // Do not automatically fetch on mount
  })

  const generatePDF = async () => {
    // Refetch user data and wait for it to complete
    const { data } = await refetch()
    const user = data[0]

    // Log the data to inspect the structure
    console.log('Fetched User Data:', data)

    // Ensure data is available before proceeding
    if (data) {
      const doc = new jsPDF()

      doc.setFontSize(16)
      doc.text('User Details', 20, 20)

      doc.setFontSize(12)
      doc.text(`First Name: ${user.firstname}`, 20, 30)
      doc.text(`Last Name: ${user.lastname}`, 20, 40)
      doc.text(`Email Address: ${user.email_address}`, 20, 50)
      doc.text(`Date Joined: ${user.inserted_dt}`, 20, 60)
      doc.text(`Date of Birth: ${user.date_of_birth}`, 20, 70)
      doc.text(`Phone Number: ${user.phone_number}`, 20, 80)
      doc.text(`Height: ${user.height}`, 20, 90)
      doc.text(`Weight: ${user.weight}`, 20, 100)
      doc.text(`Blood Group: ${user.blood_group}`, 20, 110)
      doc.text(`Marital Status: ${user.marital_status}`, 20, 120)
      doc.text(`User ID: ${user.user_id}`, 20, 130)
      doc.text(
        `User Status: ${user.user_status === '0' ? 'Inactive' : 'Active'}`,
        20,
        140
      )

      doc.save(`${user.firstname}_${user.lastname}_details.pdf`)
    } else {
      console.error('No user data returned from the API.')
    }
  }

  return (
    <div className="p-10 border shadow-lg rounded-xl border-border_color">
      <div className="gap-5">
        <p className="font-semibold text-black">
          {firstname} {lastname}
        </p>
        <p className="font-semibold text-gray">Joined: {date}</p>
      </div>
      <button
        onClick={generatePDF}
        className="flex items-center mt-5 space-x-3"
      >
        <img src={download} alt="Download" />
        <span className="font-semibold text-secondary">Download user file</span>
      </button>
      {isLoading && <p>Loading user details...</p>}
      {isError && error instanceof Error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default UserCard
