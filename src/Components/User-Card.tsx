import download from '../assets/download.svg'

interface UserCardProps {
  name: string
  date: string
}

const UserCard: React.FC<UserCardProps> = ({ name, date }) => {
  return (
    <div className="rounded-xl border border-border_color shadow-lg p-10">
      <div className="gap-5">
        <p className="text-black font-semibold">{name}</p>
        <p className="text-gray font-semibold">Joined: {date}</p>
      </div>
      <button className="flex items-center mt-5 space-x-3">
        <img src={download} alt="" />
        <span className="text-secondary font-semibold">Download user file</span>
      </button>
    </div>
  )
}

export default UserCard
