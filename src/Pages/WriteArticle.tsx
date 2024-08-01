import { useState } from 'react'
import VideoThumbnail from '../Components/VideoThumbnail'
import Button from '../Components/Button'

const WriteArticle = () => {
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
  return <div></div>
}

export default WriteArticle
