import back from '../assets/back.svg'
import profile from '../assets/images/smartcare.jpeg'
const AllComments = () => {
  return (
    <>
      <div className="flex items-center space-x-5">
        <img src={back} alt="" />
        <p className="text-xl font-bold">All Comments</p>
      </div>
      <ul className="space-y-5 divide-y  divide-gray">
        <li className="flex items-center py-5 space-x-5">
          <div>
            <img src={profile} alt="profile" className="w-24 h-24 rounded" />
          </div>
          <div className="space-y-3">
            <p className="max-w-[72rem]">
              This video is incredibly insightful! It's amazing to see how
              technology is advancing healthcare and improving patient outcomes.
              The integration of cutting- edge tech like AI, robotics, and
              telemedicine is truly transformative. I'm excited to see how these
              innovations will continue to evolve and make medical treatments
              more efficient, personalized, and accessible to everyone. Kudos to
              the creators for shedding light on such an important topic!
            </p>
            <p className="text-gray/50">Posted by: Oluwapelumi Joshua</p>
            <p className="">
              Video title: Transforming Healthcare: How Technology is Revoluti
              ...
            </p>
          </div>
        </li>
        <li className="flex items-center py-5 space-x-5">
          <div>
            <img src={profile} alt="profile" className="w-24 h-24 rounded" />
          </div>
          <div className="space-y-3">
            <p className="max-w-[72rem]">
              This video is incredibly insightful! It's amazing to see how
              technology is advancing healthcare and improving patient outcomes.
              The integration of cutting- edge tech like AI, robotics, and
              telemedicine is truly transformative. I'm excited to see how these
              innovations will continue to evolve and make medical treatments
              more efficient, personalized, and accessible to everyone. Kudos to
              the creators for shedding light on such an important topic!
            </p>
            <p className="">Posted by: Oluwapelumi Joshua</p>
            <p className="">
              Video title: Transforming Healthcare: How Technology is Revoluti
              ...
            </p>
          </div>
        </li>
      </ul>
    </>
  )
}

export default AllComments
