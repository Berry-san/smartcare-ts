// import axios from 'axios'
// import { z } from 'zod'

// // Define Zod schemas for request and response validation
// const categorySchema = z.object({
//   category_id: z.string(),
//   category_name: z.string(),
// })

// const categoriesSchema = z.array(categorySchema)

// const videoSchema = z.object({
//   videoId: z.string(),
//   categoryId: z.string(),
//   youtubeUrl: z.string(),
//   title: z.string(),
//   description: z.string(),
// })

// const videosSchema = z.array(videoSchema)

// const articleSchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   description: z.string(),
//   image_url: z.string(),
//   inserted_dt: z.string(),
// })

// const articlesSchema = z.array(articleSchema)

// // API service
// const apiClient = axios.create({
//   baseURL: 'https://api.sunsmartcare.com/v1/api',
//   headers: {
//     'Content-Type': 'application/json',
//     'x-api-key': '21122023',
//   },
// })

// export const apiService = {
//   // Categories
//   listCategories: async () => {
//     const response = await apiClient.get('/list_category')
//     return categoriesSchema.parse(response.data.result)
//   },

//   createCategory: async (data: { categoryName: string }) => {
//     const response = await apiClient.post('/create_video_category', data)
//     // return categorySchema.parse(response.data)
//     return response.data
//   },

//   updateCategory: async (data: {
//     categoryId: string
//     categoryName: string
//   }) => {
//     const response = await apiClient.post('/update_category', data)
//     return categorySchema.parse(response.data)
//   },

//   deleteCategory: async (categoryId: string) => {
//     const response = await apiClient.get(
//       `/delete_category?categoryId=${categoryId}`
//     )
//     return response.data
//   },

//   // Videos
//   listVideos: async () => {
//     const response = await apiClient.get('/list_videos')
//     return videosSchema.parse(response.data.result)
//   },

//   createVideo: async (data: { title: string; youtubeUrl: string }) => {
//     const response = await apiClient.post('/create_video', data)
//     return videoSchema.parse(response.data)
//   },

//   updateVideo: async (data: {
//     videoId: string
//     categoryId: string
//     title: string
//     youtubeUrl: string
//     description: string
//   }) => {
//     const response = await apiClient.post('/update_video', data)
//     return videoSchema.parse(response.data)
//   },

//   deleteVideo: async (videoId: string) => {
//     const response = await apiClient.delete(`/delete_video?videoId=${videoId}`)
//     return response.data
//   },

//   getSingleVideo: async (videoId: string) => {
//     const response = await apiClient.get(`/single_video?videoId=${videoId}`)
//     return videoSchema.parse(response.data)
//   },

//   // Articles
//   listArticles: async () => {
//     const response = await apiClient.get('/list_articles')
//     // return articlesSchema.parse(response.data)
//     return response.data.result
//   },

//   createArticle: async (data: {
//     title: string
//     description: string
//     imageUrl: string
//   }) => {
//     const response = await apiClient.post('/create_article', data)
//     // return articleSchema.parse(response.data.result)
//     return response.data.result
//   },

//   updateArticle: async (data: {
//     id: number
//     title: string
//     description: string
//     imageUrl: string
//   }) => {
//     const response = await apiClient.post('/update_articles', data)
//     return articleSchema.parse(response.data)
//   },

//   deleteArticle: async (id: string) => {
//     const response = await apiClient.delete(`/delete_article/${id}`)
//     return response.data
//   },

//   // User Authentication
//   userSignUp: async (signUpValue: {
//     firstName: string
//     lastName: string
//     emailAddress: string
//     phoneNumber: string
//     password: string
//     confirmPassword: string
//   }) => {
//     const response = await apiClient.post('/user_sign_up', signUpValue)
//     return response.data
//   },

//   userLogin: async (loginValue: { emailAddress: string; password: string }) => {
//     const response = await apiClient.post('/user_login', loginValue)
//     return response.data
//   },

//   forgotPassword: async (forgotPasswordValue: { emailAddress: string }) => {
//     const response = await apiClient.post(
//       '/forgot_password',
//       forgotPasswordValue
//     )
//     return response.data
//   },

//   resetPassword: async (data: {
//     token: string
//     newPassword: string
//     confirmPassword: string
//   }) => {
//     const response = await apiClient.post('/reset_password', data)
//     return response.data
//   },
// }

import axios from 'axios'
import { z } from 'zod'

// Define Zod schemas for request and response validation
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
  baseURL: 'https://api.sunsmartcare.com/v1/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '21122023',
  },
})

export const apiService = {
  uploadVideoToCloudinary: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'Video_Upload_Preset')
    formData.append('cloud_name', 'dkiyhlnyw')
    console.log(formData)

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dkiyhlnyw/video/upload`,
      formData
    )
    console.log(response.data.secure_url)
    console.log(response)
    return response.data.secure_url // The URL of the uploaded video
  },

  deleteVideoFromCloudinary: async (publicId: string) => {
    const url = `https://api.cloudinary.com/v1_1/dkiyhlnyw/resources/video/upload?public_ids=${publicId}`

    const response = await axios.delete(url, {
      auth: {
        username: '918831619251733', // Cloudinary API Key
        password: 'Fs5NE6DoKEHaF3GMsYZoNElQ5G0', // Cloudinary API Secret
      },
    })
    console.log(response)

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

  // Fetch a single user by ID
  getSingleUser: async (userId: string) => {
    const response = await apiClient.get(`/single_user/${userId}`)
    return response.data.result
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
    DESCRIPTION?: string
    imageUrl: string
    inserted_dt: string
  }) => {
    const response = await apiClient.post('/update_articles', data)
    // return articleSchema.parse(response.data)
    console.log(response)
    return response.data.result
  },

  deleteArticle: async (id: string) => {
    const response = await apiClient.get(`/delete_article/${id}`)
    return response.data
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
    const response = await apiClient.post('/user_login', loginValue)
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
}
