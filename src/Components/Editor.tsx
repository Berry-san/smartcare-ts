import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
}

const Editor: React.FC<EditorProps> & { modules: any; formats: string[] } = ({
  value,
  onChange,
  id,
  placeholder,
}) => {
  const [theme, setTheme] = useState<string>('snow')

  const handleChange = (html: string) => {
    onChange(html)
  }

  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={value}
        id={id}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds=".app"
        placeholder={placeholder}
      />
    </div>
  )
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

export default Editor
