import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { apiService } from 'middleware/ApiServices'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import back from '../assets/back.svg'
import Editor from 'Components/Editor'
import Button from 'Components/Button'

const WriteArticle = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  console.log(imageUrl)

  const queryClient = useQueryClient()

  const mutation = useMutation(
    async () => {
      let finalImageUrl = imageUrl

      // If an image file is selected, upload it and get the Cloudinary URL
      if (imageFile) {
        finalImageUrl = await apiService.uploadImageToCloudinary(imageFile)
      }

      // Validate that either an image URL is provided or an image file is uploaded
      if (!finalImageUrl) {
        throw new Error('Please provide an image URL or upload an image file')
      }

      // Prepare the payload
      const data = {
        title,
        description,
        imageUrl: finalImageUrl,
      }
      console.log(data)
      return apiService.createArticle(data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles')
        toast.success('Article created successfully')
        navigate('/articles') // Assuming you want to navigate to the articles page after success
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create article')
      },
    }
  )

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setImageFile(selectedFile)
      setImageUrl('') // Clear the Image URL if an image file is selected
    }
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault() // Prevent the default form submission
    mutation.mutate()
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-5">
        <button onClick={goBack}>
          <img src={back} alt="" />
        </button>

        <p className="text-xl font-bold">Write an Article</p>
      </div>
      <div className="space-y-10">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col w-full space-y-5"
        >
          {/* <div className="w-full">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="title"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div> */}
          <div className="grid items-center grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="">Upload Image</label>
              <input
                id="dropzone-file"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="px-3 py-1 border rounded-md border-border_color focus:outline-none"
              />
            </div>

            {!imageFile && (
              <div className="flex flex-col space-y-2">
                <label htmlFor="">Image URL</label>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 bg-transparent border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Editor
              placeholder="Write anything you want."
              value={description}
              onChange={(value) => setDescription(value)}
              id="description"
            />
          </div>
          <div>
            <Button text="Publish" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default WriteArticle
