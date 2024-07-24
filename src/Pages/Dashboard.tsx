import Greeting from '../Components/Greeting'

const DashboardItems = [
  { id: 1, totalUsers: 'Alice', randomNumber: 5 },
  { id: 2, totalUsers: 'Bob', randomNumber: 5 },
  { id: 3, totalUsers: 'Charlie', randomNumber: 5 },
  { id: 4, totalUsers: 'David', randomNumber: 5 },
]
const Dashboard = () => {
  return (
    <div>
      <h1>
        <Greeting />
      </h1>
      <section className="grid grid-cols-4 gap-5 my-5">
        {DashboardItems.map(() => (
          <div className="border border-border_color h-40 rounded-xl">
            <div className="flex items-center justify-center"></div>
          </div>
        ))}
      </section>
      <section className="grid grid-cols-2 gap-5">
        {/* Comments */}
        <div className="">
          <div className="flex justify-between">
            <p>Recent comments</p>
            <p className="underline">View all comments</p>
          </div>
          <div className="gap-3">
            <p>This is a comment</p>
            <p>This is a comment</p>
            <p>This is a comment</p>
            <p>This is a comment</p>
            <p>This is a comment</p>
          </div>
        </div>
        {/* Create Video  */}
        <div className="border px-4 py-8 rounded-lg">
          <h2>Content Creator</h2>
          <div className="grid grid-cols-2 gap-5 text-white mt-2">
            <button className="bg-secondary py-4 rounded">
              Upload a Video
            </button>
            <button className="bg-secondary py-4 rounded">Create Video</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
