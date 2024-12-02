import React from 'react'
import youtube from '../assets/youtube.svg'
// import { ReactComponent as CloudinaryIcon } from '../assets/cloudinary.svg'

const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

const getYouTubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const getCloudinaryThumbnailUrl = (url: string): string => {
  return url
    .replace('/upload/', '/upload/so_5/c_fill,w_640,h_360/')
    .replace('.mp4', '.jpg')
}

const VideoThumbnail: React.FC<{
  url: string
  title: string
  date: string | undefined
}> = ({ url, title, date }) => {
  const videoId = getYouTubeVideoId(url)
  const isYouTube = !!videoId
  const thumbnailUrl = isYouTube
    ? getYouTubeThumbnailUrl(videoId!)
    : getCloudinaryThumbnailUrl(url)

  const handleClick = (event: React.MouseEvent) => {
    if (isYouTube) {
      window.open(
        `https://www.youtube.com/watch?v=${videoId}`,
        '_blank',
        'noopener,noreferrer'
      )
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex items-center">
      <div
        className="w-full border shadow-lg cursor-pointer rounded-xl border-slate-200"
        onClick={handleClick}
      >
        <section className="relative inline-block w-full">
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="object-cover w-full h-48 shadow-lg rounded-t-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg bg-opacity-40">
            {isYouTube ? (
              <img
                src={youtube}
                alt="Play YouTube Video"
                className="w-12 h-12"
              />
            ) : (
              // <CloudinaryIcon className="w-12 h-12 text-white" />
              <div>
                <svg
                  fill="#fff"
                  height="48"
                  viewBox="0 0 48 48"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z" />
                </svg>
              </div>
            )}
          </div>
        </section>

        <section className="flex justify-between px-5 py-3">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-md">{title}</h2>
            <p className="text-gray">{date}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default VideoThumbnail
