import { useState } from 'react'
import VideoThumbnail from '../Components/VideoThumbnail'
import Button from '../Components/Button'
import Editor from 'Components/Editor'

const WriteArticle = () => {
  return (
    <div>
      <Editor
        value={''}
        onChange={function (value: string): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}

export default WriteArticle
