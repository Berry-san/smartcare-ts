import { useState } from 'react'
import back from '../assets/back.svg'
import Editor from 'Components/Editor'
import Button from 'Components/Button'

const WriteArticle = () => {
  const [article, setArticle] = useState('')
  console.log(article)
  return (
    <div className="space-y-8">
      <div className="flex space-x-5">
        <img src={back} alt="" />
        <p className="text-xl font-bold">Write an Article</p>
      </div>
      <div className="space-y-10">
        <div>
          <Editor
            placeholder="Write anything you want."
            value={article}
            onChange={(value) => setArticle(value)}
            id="article"
            // name="adcontent"
            // onChange={function (value: string): void {
            //   throw new Error('Function not implemented.')
            // }}
          />
        </div>
        <div>
          <Button text="Publish" />
        </div>
      </div>
    </div>
  )
}

export default WriteArticle
