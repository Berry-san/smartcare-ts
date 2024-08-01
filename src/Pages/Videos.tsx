import { useState } from 'react'
import VideoThumbnail from '../Components/VideoThumbnail'
import Button from '../Components/Button'
import addButton from '../assets/add.svg'
import deleteButton from '../assets/delete.svg'

const Videos: React.FC = () => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
    // const filtered = sortedData.filter(
    //   (item) =>
    //     // item.firstName.toLowerCase().includes(searchValue) ||
    //     item.document_owner.toLowerCase().includes(searchValue) ||
    //     item.department.toLowerCase().includes(searchValue)
    // )
    // setFilteredData(filtered)
  }
  const videoUrl = 'https://www.youtube.com/watch?v=5SUqLHydmhg'

  return (
    <>
      <h2 className="text-2xl font-bold">Videos</h2>
      <div className="flex items-center justify-between w-full mt-5">
        <div className="w-full">
          <div className="flex flex-col space-y-3">
            <label htmlFor="">Search for a video</label>
            <div className="w-full">
              <input
                type="search"
                name="search"
                className="rounded w-1/3 px-5 py-2 border-b border-secondary text-sm text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4]"
                autoComplete="off"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div>
          <Button text={'Upload a video'} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-10 sm:grid-cols-2 md:grid-cols-3">
        <section className="col-span-2">
          <div className="grid grid-cols-2">
            <VideoThumbnail url={videoUrl} />
            <VideoThumbnail url={videoUrl} />
          </div>
        </section>
        <section className="col-span-1 ">
          <div className="bg-white rounded-xl">
            <div className="flex items-center justify-between p-5 border-b border-b-gray">
              <p className="">Video Categories</p>
              <img src={addButton} alt="" />
            </div>
            <div className="p-5">
              <ul className="space-y-5">
                <li className="flex items-center justify-between">
                  <p>
                    Cat 1 <span className="text-gray">(32 Videos)</span>
                  </p>
                  <img src={deleteButton} alt="" />
                </li>
                <li>Cat 1</li>
                <li>Cat 1</li>
                <li>Cat 1</li>
                <li>Cat 1</li>
              </ul>
            </div>
          </div>
        </section>
        {/* {filteredData.map((item, index) => (
          <VideoThumbnail key={index} item={item} />
        ))} */}
      </div>
    </>
  )
}

export default Videos
