import Greeting from '../Components/Greeting'
import profile from '../assets/images/smartcare.jpeg'
import users from '../assets/dashboardUser.svg'
import { Link } from 'react-router-dom'
import Modal from 'Components/Modal'
import { useState } from 'react'

const DashboardItems = [
  { id: 1, totalUsers: 'Total users', randomNumber: 400 },
  { id: 2, totalUsers: 'Bob', randomNumber: 70 },
  { id: 3, totalUsers: 'Charlie', randomNumber: 56 },
  { id: 4, totalUsers: 'David', randomNumber: 40 },
]
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <h1>
        <Greeting />
      </h1>
      <section className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
        {DashboardItems.map((item) => (
          <div className="h-40 px-10 pt-10 font-mono border border-border_color rounded-xl bg-gray/15">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-blue">
                <p className="text-3xl">{item.randomNumber} </p>
                <p className="text-lg">{item.totalUsers}</p>
              </div>
              <div>
                <img src={users} className="w-7 h-7" alt="" />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Comments */}
        <div className="order-2 lg:order-1">
          <div className="flex justify-between text-lg font-medium">
            <p className="text-secondary">Recent comments</p>
            <Link to="/comments" className="underline">
              View all comments
            </Link>
          </div>
          <div className="gap-3">
            <ul className="space-y-5 divide-y divide-gray">
              <li className="flex py-5 space-x-5">
                <div>
                  <img
                    src={profile}
                    alt="profile"
                    className="object-cover w-24 h-24 rounded"
                  />
                </div>
                <div className="space-y-3">
                  <p className="max-w-[72rem]">
                    This video is incredibly insightful! It's amazing to see how
                    technology is advancing healthcare and improving patient
                    outcomes. The integration of cutting- edge tech like AI,
                    robotics, and telemedicine is truly transformative. I'm
                    excited to see how these innovations will continue to evolve
                    and make medical treatments more efficient, personalized,
                    and accessible to everyone. Kudos to the creators for
                    shedding light on such an important topic!
                  </p>
                  <p className="text-black/50">Posted by: Oluwapelumi Joshua</p>
                  <p className="text-black/50">
                    Video title: Transforming Healthcare: How Technology is
                    Revoluti ...
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Create Video  */}
        <div className="order-1 px-4 py-8 border rounded-lg border-border_color bg-gray/15 h-44 lg:order-2">
          <h2 className="text-lg font-medium">Content Creator:</h2>
          <div className="grid grid-cols-2 gap-5 mt-2 text-white">
            <button
              className="py-4 rounded bg-secondary"
              onClick={() => setShowModal(true)}
            >
              Upload a Video
            </button>
            <button className="py-4 rounded bg-secondary">Create Video</button>
          </div>
        </div>
      </section>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div>Hello</div>
      </Modal>
    </div>
  )
}

export default Dashboard
