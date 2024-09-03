import Greeting from '../Components/Greeting'
import profile from '../assets/images/smartcare.jpeg'
import users from '../assets/dashboardUser.svg'
import { Link } from 'react-router-dom'
import Modal from 'Components/Modal'
import { useState } from 'react'
import useAuthStore from 'Store/authStore'
import UploadVideo from 'Components/UploadVideo'
import { useQuery } from 'react-query'
import { apiService } from 'middleware/ApiServices'

interface Category {
  category_id: string
  category_name: string
}

interface Summary {
  noOfUsers: string
  noOfArticles: string
  noOfVideos: string
  noOfVideoCategories: string
}
const Dashboard = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }))

  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const { data: categories = [], error: fetchCategoriesError } = useQuery<
    Category[]
  >('categories', apiService.listCategories)

  const { data: adminSummary, error: fetchError } = useQuery<Summary>(
    'Summary',
    apiService.listSummary
  )

  const DashboardItems = [
    {
      id: 1,
      totalUsers: 'Total users',
      randomNumber: adminSummary?.noOfUsers || 0,
    },
    {
      id: 2,
      totalUsers: 'Total Video Categories',
      randomNumber: adminSummary?.noOfVideoCategories || 0,
    },
    {
      id: 3,
      totalUsers: 'Total Videos',
      randomNumber: adminSummary?.noOfVideos || 0,
    },
    {
      id: 4,
      totalUsers: 'Total Articles',
      randomNumber: adminSummary?.noOfArticles || 0,
    },
  ]

  return (
    <div className="">
      <span>
        <Greeting />
      </span>
      <section className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
        {DashboardItems.map((item, index) => (
          <div
            className="h-32 px-5 pt-8 font-mono border border-border_color rounded-xl bg-gray/15"
            key={index}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold text-bluish">
                <p className="text-2xl">{item.randomNumber} </p>
                <p className="text-base">{item.totalUsers}</p>
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
          <div className="flex justify-between font-medium text-md">
            <p className="">Recent comments</p>
            <Link to="/comments" className="underline text-secondary">
              View all comments
            </Link>
          </div>
          <div className="gap-3">
            <ul className="space-y-5 divide-y divide-gray">
              <li className="flex pt-3 space-x-5 text-sm">
                <div>
                  <img
                    src={profile}
                    alt="profile"
                    className="object-cover w-40 h-20 rounded"
                  />
                </div>
                <div className="space-y-3">
                  <p className="max-w-[72rem] ">
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
              <li className="flex py-5 space-x-5 text-sm">
                <div>
                  <img
                    src={profile}
                    alt="profile"
                    className="object-cover w-40 h-20 rounded"
                  />
                </div>
                <div className="space-y-3">
                  <p className="max-w-[72rem] ">
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
              <li className="flex py-5 space-x-5 text-sm">
                <div>
                  <img
                    src={profile}
                    alt="profile"
                    className="object-cover w-40 h-20 rounded"
                  />
                </div>
                <div className="space-y-3">
                  <p className="max-w-[72rem] ">
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
        <div className="order-1 px-4 py-6 border rounded-lg border-border_color bg-gray/15 h-36 lg:order-2">
          <h2 className="font-medium text-md">Content Creator:</h2>
          <div className="grid grid-cols-2 gap-5 mt-2 text-white">
            <button
              className="py-4 rounded bg-secondary"
              onClick={() => setShowUploadModal(true)}
            >
              Upload a Video
            </button>
            <Link
              to="/write-article"
              className="flex justify-center py-4 rounded bg-secondary"
            >
              Write an article
            </Link>
          </div>
        </div>
      </section>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div>Hello</div>
      </Modal>
      {showUploadModal && (
        <UploadVideo
          isVisible={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          categories={categories}
        />
      )}
    </div>
  )
}

export default Dashboard
