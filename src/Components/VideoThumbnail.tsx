import youtube from '../assets/youtube.svg'

const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

const getYouTubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const VideoThumbnail: React.FC<{ url: string }> = ({ url }) => {
  const videoId = getYouTubeVideoId(url)
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : ''

  return (
    <div className="flex items-center">
      {videoId ? (
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <div className="border shadow-lg rounded-xl border-slate-200">
            <section className="relative inline-block w-full ">
              <img
                src={thumbnailUrl}
                alt="YouTube Video Thumbnail"
                className="object-cover w-full shadow-lg h-60 rounded-t-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg bg-opacity-40">
                <img src={youtube} alt="Play" className="w-12 h-12" />
              </div>
            </section>

            <section className="flex justify-between p-5">
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-extrabold">
                  Lorem ipsum dolor, sit amet consectetur
                </h2>
                <p className="text-gray">22/22/22</p>
              </div>
            </section>
          </div>
        </a>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
    </div>
  )
}

export default VideoThumbnail
