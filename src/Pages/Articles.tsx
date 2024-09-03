import { useState } from 'react'
import Table from '../Components/Table'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { apiService } from 'middleware/ApiServices'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { Article } from './Article'

export interface Article {
  id: number
  title: string
  description: string
  image_url?: string
  imageUrl: string
  inserted_dt: string
}

const Articles = () => {
  const [search, setSearch] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null)
  const queryClient = useQueryClient()

  const {
    data: articles = [],
    error,
    isLoading,
  } = useQuery<Article[]>('articles', apiService.listArticles)

  const deleteArticleMutation = useMutation(
    (id: string) => apiService.deleteArticle(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles')
        toast.success('Article deleted successfully')
        setShowDeleteModal(false)
      },
      onError: () => {
        toast.error('Failed to delete article')
      },
    }
  )

  const updateArticleMutation = useMutation(
    (article: Article) => apiService.updateArticle(article),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles')
        toast.success('Article updated successfully')
        setShowEditModal(false)
      },
      onError: () => {
        toast.error('Failed to update article')
      },
    }
  )

  const handleDeleteArticle = (id: string) => {
    deleteArticleMutation.mutate(id)
  }

  const handleEditArticle = (article: Article) => {
    updateArticleMutation.mutate(article)
    setArticleToEdit(article)
    setShowEditModal(true)
  }

  const filteredData =
    articles.filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase())
    ) || []

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearch(searchValue)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Failed to load articles</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Articles</h2>
      <div className="flex flex-col items-center justify-between w-full mt-5 space-y-3 md:flex-row md:space-y-0">
        <div className="w-full">
          <div className="flex flex-col space-y-3">
            <label htmlFor="">Search for an article</label>
            <div className="w-full">
              <input
                type="search"
                name="search"
                className="rounded w-full md:1/2 lg:w-1/3 px-5 py-2 border-b border-secondary text-sm text-gray-500 focus-within:text-gray-500 bg-[#f4f4f4] focus:outline-none focus:bg-[#f4f4f4]"
                autoComplete="off"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <Link to="/write-article">
          <Button text={'Write an article'} />
        </Link>
      </div>
      <div className="mt-10">
        <Table
          data={filteredData}
          handleDelete={handleDeleteArticle}
          handleEdit={handleEditArticle} // Pass handleEditArticle function here
          deleteModal={showDeleteModal}
          deleteModalFunction={setShowDeleteModal}
          editModal={showEditModal}
          editModalFunction={setShowEditModal}
        />
      </div>
    </div>
  )
}

export default Articles
