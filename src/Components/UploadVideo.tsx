import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { apiService } from 'middleware/ApiServices'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from './Modal'

interface UploadVideoProps {
  isVisible: boolean
  onClose: () => void
  categories: Array<{ category_id: string; category_name: string }>
}

const UploadVideo: React.FC<UploadVideoProps> = ({
  isVisible,
  onClose,
  categories,
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const queryClient = useQueryClient()

  const mutation = useMutation(
    async () => {
      let videoUrl = youtubeUrl

      // If a video file is selected, upload it and get the Cloudinary URL
      if (videoFile) {
        videoUrl = await apiService.uploadVideoToCloudinary(videoFile)
      }

      // Validate that either a video URL from YouTube or a file upload exists
      if (!videoUrl) {
        throw new Error('Please provide a YouTube URL or upload a video file')
      }

      // Prepare the payload
      const data = {
        title,
        description,
        youtubeUrl: videoUrl, // This can be either the YouTube URL or the Cloudinary URL
        categoryId,
      }

      return apiService.createVideo(data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('videos')
        toast.success('Video uploaded successfully')
        onClose() // Close the modal on success
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to upload video')
      },
    }
  )

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setVideoFile(selectedFile)
      setTitle(selectedFile.name) // Default the title to the file name
      setYoutubeUrl('') // Clear the YouTube URL if a video file is selected
    }
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault() // Prevent the default form submission
    mutation.mutate()
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <h2 className="text-2xl font-bold">Upload a Video</h2>
        <div className="flex flex-col mt-4 space-y-3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full px-2 py-2 border rounded-lg cursor-pointer border-border_color"
          >
            <input
              id="dropzone-file"
              type="file"
              //   className="hidden"
              onChange={handleVideoUpload}
              accept="video/*"
            />
          </label>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Video Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>
          {!videoFile && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="">YouTube URL</label>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
              />
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Video Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">Video Category</label>
            <select
              name="categoryId"
              id="categoryId"
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">--</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mutation.isLoading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default UploadVideo
