import { useState, useEffect, useRef } from 'react'
import { apiService } from 'middleware/ApiServices'
import VideoThumbnail from '../Components/VideoThumbnail'
import Button from '../Components/Button'
import Modal from 'Components/Modal'
import addButton from '../assets/add.svg'
import deleteButton from '../assets/delete.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Videos: React.FC = () => {
  // const [search, setSearch] = useState('')
  // const [showModal, setShowModal] = useState(false)
  // const [videos, setVideos] = useState([])
  // const [categories, setCategories] = useState<any[]>([])
  // const [newCategory, setNewCategory] = useState('')
  // const [error, setError] = useState<string | null>(null)
  // const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [videos, setVideos] = useState([])
  const [categories, setCategories] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await apiService.listCategories()
        setCategories(categories)
      } catch (error) {
        setError('Failed to load categories')
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const response = await apiService.deleteCategory(categoryId)
      setCategories(
        categories.filter((category) => category.category_id !== categoryId)
      )
      toast.success(response.message)
    } catch (err) {
      setError('Failed to delete category')
    }
  }

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return

    try {
      const createdCategory = await apiService.createCategory({
        categoryName: newCategory,
      })
      console.log(newCategory)
      // setCategories([...categories, { newCategory }])
      setCategories((prevCategories) => [newCategory, ...prevCategories])

      console.log(categories)
      setNewCategory('')
      setIsAddingCategory(false)

      // Update categories state directly

      toast.success('Category added successfully')
    } catch (err) {
      setError('Failed to create category')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCategory()
    }
  }

  const handleAddButtonClick = () => {
    setIsAddingCategory(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const filteredUsers = videos.filter(
    (video) =>
      //  video.document_owner.toLowerCase().includes(search) ||
      //  video.name.toLowerCase().includes(search)
      video
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
  }
  const videoUrl = 'https://www.youtube.com/watch?v=5SUqLHydmhg'

  return (
    <>
      <h2 className="text-2xl font-bold">Videos</h2>
      <div className="flex flex-col items-center justify-between w-full mt-5 space-y-3 md:flex-row md:space-y-0">
        <div className="w-full">
          <div className="flex flex-col space-y-3">
            <label htmlFor="">Search for a video</label>
            <div className="">
              <input
                type="search"
                name="search"
                className="rounded w-full md:1/3 lg:w-1/3 px-5 py-2 border-b border-secondary text-sm text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4]"
                autoComplete="off"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div>
          <Button text={'Upload a video'} onClick={() => setShowModal(true)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
        <section className="order-2 col-span-1 lg:col-span-2 md:order-1">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <VideoThumbnail url={videoUrl} />
            <VideoThumbnail url={videoUrl} />
          </div>
        </section>
        <section className="order-1 col-span-1 md:order-2">
          <div className="bg-white rounded-xl font-medium">
            <div className="flex items-center justify-between p-5 border-b border-b-gray">
              <p className="">Video Categories</p>
              <button onClick={handleAddButtonClick}>
                <img src={addButton} alt="Add Category" />
              </button>
            </div>
            <div className="p-5">
              <ul className="space-y-5">
                {isAddingCategory && (
                  <li className="flex items-center justify-between relative">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      placeholder="Enter category name"
                      className="w-full border-b border-secondary text-sm text-gray-500 focus:outline-none py-2"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                      onClick={handleAddCategory}
                    >
                      <img src={addButton} alt="Add Category" />
                    </button>
                  </li>
                )}
                {categories.map((category, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <p>
                      {category.category_name}{' '}
                      <span className="text-gray">(32 Videos)</span>
                    </p>
                    <button
                      onClick={() => handleDeleteCategory(category.category_id)}
                    >
                      <img
                        src={deleteButton}
                        alt=""
                        className="hover:scale-125"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* {filteredData.map((item, index) => (
          <VideoThumbnail key={index} item={item} />
        ))} */}
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div>Hello</div>
      </Modal>
    </>
  )
}

export default Videos
