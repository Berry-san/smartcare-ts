import axios from 'axios'
import { z } from 'zod'

const username: string | undefined = process.env.REACT_APP_CLOUDINARY_USERNAME
const password: string | undefined = process.env.REACT_APP_CLOUDINARY_PASSWORD
const apiBaseURL: string | undefined = 'https://api.sunsmartcare.com/v1/api/'
const apiKey: string | undefined = '21122023'
const cloudName: string | undefined =
  process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
const videoEndpoint: string | undefined =
  process.env.REACT_APP_CLOUDINARY_VIDEO_ENDPOINT
const deleteVideoEndpoint: string | undefined =
  process.env.REACT_APP_CLOUDINARY_DELETE_VIDEO_ENDPOINT
const imageEndpoint: string | undefined =
  process.env.REACT_APP_CLOUDINARY_IMAGE_ENDPOINT
const deleteImageEndpoint: string | undefined =
  process.env.REACT_APP_CLOUDINARY_DELETE_IMAGE_ENDPOINT

const categorySchema = z.object({
  category_id: z.string(),
  category_name: z.string(),
})

const categoriesSchema = z.array(categorySchema)

const videoSchema = z.object({
  videoId: z.string(),
  categoryId: z.string(),
  youtubeUrl: z.string(),
  title: z.string(),
  description: z.string(),
})

const videosSchema = z.array(videoSchema)

const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  inserted_dt: z.string(),
})

const articlesSchema = z.array(articleSchema)

// API service
const apiClient = axios.create({
  baseURL: apiBaseURL || '',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey || '',
  },
})

export const apiService = {
  uploadVideoToCloudinary: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'Video_Upload_Preset')
    formData.append('cloud_name', cloudName || '')

    const response = await axios.post(videoEndpoint || '', formData)
    return response.data.secure_url
  },

  uploadImageToCloudinary: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'Video_Upload_Preset')
    formData.append('cloud_name', cloudName || '')

    const response = await axios.post(imageEndpoint || '', formData)
    return response.data.secure_url
  },

  deleteVideoFromCloudinary: async (publicId: string) => {
    const url = `${deleteVideoEndpoint}+?public_ids=${publicId}`

    const response = await axios.delete(url, {
      auth: {
        username: username || '',
        password: password || '',
      },
    })

    if (response.status !== 200) {
      throw new Error('Failed to delete video from Cloudinary')
    }

    return response.data
  },

  // Categories
  listCategories: async () => {
    const response = await apiClient.get('/list_category')
    return categoriesSchema.parse(response.data.result)
  },

  createCategory: async (data: { categoryName: string }) => {
    const response = await apiClient.post('/create_video_category', data)
    return response.data
  },

  updateCategory: async (data: {
    categoryId: string
    categoryName: string
  }) => {
    const response = await apiClient.post('/update_category', data)
    return categorySchema.parse(response.data)
  },

  deleteCategory: async (categoryId: string) => {
    const response = await apiClient.get(
      `/delete_category?categoryId=${categoryId}`
    )
    return response.data
  },

  // Fetch list of users
  listUsers: async () => {
    const response = await apiClient.get('/list_users')
    return response.data.result
  },
  // Fetch list of users
  listBusinesses: async () => {
    const response = await apiClient.get('/list_all_business')
    return response.data.result
  },


  // Fetch a single user by ID
  getSingleUser: async (userId: string) => {
    const response = await apiClient.get(`/single_user/${userId}`)
    return response.data.result
  },

  // Fetch a single user by ID
  getTransactionRecord: async (date: string, month:string) => {
    const response = await apiClient.get(`/business_transaction_summary?date=${date}&month=${month}`)
    return response.data.result.monthly
  },

  // Videos
  listVideos: async () => {
    const response = await apiClient.get('/list_videos')
    // return videosSchema.parse(response.data.result)
    return response.data.result
  },

  createVideo: async (data: {
    title: string
    youtubeUrl: string
    description: string
    categoryId: string
  }) => {
    const response = await apiClient.post('/create_video', data)
    // return videoSchema.parse(response.data)
    return response.data
  },

  updateVideo: async (data: {
    videoId: string
    categoryId: string
    title: string
    youtubeUrl: string
    description: string
  }) => {
    const response = await apiClient.post('/update_video', data)
    return videoSchema.parse(response.data)
  },

  deleteVideo: async (videoId: string) => {
    const response = await apiClient.get(`/delete_video?videoId=${videoId}`)
    return response.data
  },

  getSingleVideo: async (videoId: string) => {
    const response = await apiClient.get(`/single_video?videoId=${videoId}`)
    return videoSchema.parse(response.data)
  },

  // Articles
  listArticles: async () => {
    const response = await apiClient.get('/list_articles')
    // return articlesSchema.parse(response.data.result)
    return response.data.result
  },

  createArticle: async (data: {
    title: string
    description: string
    imageUrl: string
  }) => {
    const response = await apiClient.post('/create_article', data)
    // return articleSchema.parse(response.data.result)
    return response.data.result
  },

  updateArticle: async (data: {
    id: number
    title: string
    description?: string
    imageUrl: string
    inserted_dt: string
  }) => {
    const response = await apiClient.post('/update_articles', data)
    // return articleSchema.parse(response.data)
    return response.data.result
  },

  deleteArticle: async (id: string) => {
    const response = await apiClient.get(`/delete_article/${id}`)
    return response.data
  },

  // Admin Summary
  listSummary: async () => {
    const response = await apiClient.get('/admin_summary')
    // return articlesSchema.parse(response.data.result)
    return response.data.result
  },

  // User Authentication
  userSignUp: async (signUpValue: {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    password: string
    confirmPassword: string
  }) => {
    const response = await apiClient.post('/user_sign_up', signUpValue)
    return response.data
  },

  userLogin: async (loginValue: { emailAddress: string; password: string }) => {
    const response = await apiClient.post('/admin_login', loginValue)
    console.log(response)
    return response.data
  },

  forgotPassword: async (forgotPasswordValue: { emailAddress: string }) => {
    const response = await apiClient.post(
      '/forgot_password',
      forgotPasswordValue
    )
    return response.data
  },

  resetPassword: async (data: {
    token: string
    newPassword: string
    confirmPassword: string
  }) => {
    const response = await apiClient.post('/reset_password', data)
    return response.data
  },

  changePassword: async (resetPasswordValue: {
    emailAddress: string
    old_password: string
    new_password: string
  }) => {
    const response = await apiClient.post(
      '/admin_change_password',
      resetPasswordValue
    )
    console.log(response)
    return response.data
  },
}
