import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { apiService } from 'middleware/ApiServices'
import VideoThumbnail from '../Components/VideoThumbnail'
import Button from '../Components/Button'
import Modal from 'Components/Modal'
import addButton from '../assets/add.svg'
import deleteButton from '../assets/delete.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UploadVideo from 'Components/UploadVideo'

interface Category {
  category_id: string
  category_name: string
}

interface Video {
  video_id: string
  categoryId: string
  youtube_url: string
  title: string
  description: string
  inserted_dt?: string
}

const Videos: React.FC = () => {
  const [search, setSearch] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null)
  const [newCategory, setNewCategory] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const { data: categories = [], error: fetchError } = useQuery<Category[]>(
    'categories',
    apiService.listCategories
  )

  const { data: videos = [], error: fetchVideoError } = useQuery<Video[]>(
    'videos',
    apiService.listVideos
  )

  const deleteCategoryMutation = useMutation(
    (categoryId: string) => apiService.deleteCategory(categoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories')
        toast.success('Category deleted successfully')
        setShowDeleteModal(false)
      },
      onError: () => {
        toast.error('Failed to delete category')
      },
    }
  )

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategoryMutation.mutate(categoryToDelete)
    }
  }

  const addCategoryMutation = useMutation(
    (newCategory: string) =>
      apiService.createCategory({ categoryName: newCategory }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories')
        setNewCategory('')
        setIsAddingCategory(false)
        toast.success('Category added successfully')
      },
      onError: () => {
        toast.error('Failed to create category')
      },
    }
  )

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return
    addCategoryMutation.mutate(newCategory)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCategory()
    }
  }

  const handleAddButtonClick = () => {
    setIsAddingCategory(true)
  }

  useEffect(() => {
    if (isAddingCategory && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAddingCategory])

  const deleteVideoMutation = useMutation(
    async (video: Video) => {
      apiService.deleteVideo(video.video_id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('videos')
        toast.success('Video deleted successfully')
        setVideoToDelete(null) // Close the delete modal
      },
      onError: () => {
        toast.error('Failed to delete video')
      },
    }
  )

  const handleDeleteVideo = () => {
    if (videoToDelete) {
      deleteVideoMutation.mutate(videoToDelete)
    }
  }

  const filteredData = videos.filter((video) =>
    video.title.toLowerCase().includes(search)
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
  }

  if (fetchError) {
    return <div>Failed to load categories</div>
  }

  if (fetchVideoError) {
    return <div>Failed to load videos</div>
  }

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
          <Button
            text={'Upload a video'}
            onClick={() => setShowUploadModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
        <section className="order-2 col-span-1 lg:col-span-2 md:order-1">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredData.map((video) => (
              <div key={video.video_id} className="relative group">
                <VideoThumbnail
                  url={video.youtube_url}
                  title={video.title}
                  date={video.inserted_dt}
                />

                <button
                  onClick={() => setVideoToDelete(video)}
                  className="absolute p-2 transition-opacity bg-red-600 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
                >
                  <img
                    src={deleteButton}
                    alt="Delete Video"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="order-1 col-span-1 md:order-2">
          <div className="font-medium bg-white rounded-xl">
            <div className="flex items-center justify-between p-5 border-b border-b-gray">
              <p>Video Categories ({categories.length})</p>
              <button onClick={handleAddButtonClick}>
                <img src={addButton} alt="Add Category" />
              </button>
            </div>
            <div className="p-5">
              <ul className="space-y-5">
                {isAddingCategory && (
                  <li className="relative flex items-center justify-between">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={handleKeyDown}
                      ref={inputRef}
                      placeholder="Enter category name"
                      className="w-full py-2 text-sm text-gray-500 border-b border-secondary focus:outline-none"
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
                {categories.map((category) => (
                  <li
                    key={category.category_id}
                    className="flex items-center justify-between"
                  >
                    <p>
                      {category.category_name}{' '}
                      {/* <span className="text-gray">(32 Videos)</span> */}
                    </p>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true)
                        setCategoryToDelete(category.category_id)
                      }}
                    >
                      <img
                        src={deleteButton}
                        alt="Delete Category"
                        className="hover:scale-125"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Render the UploadVideo component conditionally */}
      {showUploadModal && (
        <UploadVideo
          isVisible={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          categories={categories}
        />
      )}

      {videoToDelete && (
        <Modal
          isVisible={Boolean(videoToDelete)}
          onClose={() => setVideoToDelete(null)}
        >
          <section className="flex flex-col items-center justify-center space-y-5 text-center">
            <div className="p-5 bg-red-100 rounded-full">
              <img src={deleteButton} className="w-8 h-8" alt="Delete" />
            </div>
            <div className="space-y-3 text-warning">
              <p className="font-semibold">Confirm delete</p>
              <p className="max-w-sm text-xsm">
                Are you sure you want to delete this video? This action cannot
                be undone.
              </p>
            </div>
            <button
              onClick={handleDeleteVideo}
              disabled={deleteVideoMutation.isLoading}
              className="py-4 text-white rounded-md w-60 bg-warning"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setVideoToDelete(null)}
              className="hover:underline"
            >
              Cancel
            </button>
          </section>
        </Modal>
      )}

      <Modal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <section className="flex flex-col items-center justify-center space-y-5 text-center">
          <div className="p-5 bg-red-100 rounded-full">
            <img src={deleteButton} className="w-8 h-8" alt="" />
          </div>
          <div className="space-y-3 text-warning">
            <p className="font-semibold">Confirm delete</p>
            <p className="max-w-sm text-xsm">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>
          </div>
          <button
            onClick={handleDeleteCategory}
            disabled={deleteCategoryMutation.isLoading}
            className="py-4 text-white rounded-md w-60 bg-warning"
          >
            Yes, delete
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="hover:underline"
          >
            Cancel
          </button>
        </section>
      </Modal>
    </>
  )
}

export default Videos
