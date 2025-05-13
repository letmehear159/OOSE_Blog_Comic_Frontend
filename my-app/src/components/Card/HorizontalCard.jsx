import React, { useEffect, useState } from 'react'
import slugify from '../../utils/format'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/api.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { formatDatetimeWithTimeFirst } from '../../services/helperService.js'
import { Image, message } from 'antd'
import { getCommentCountOfBlogAPI } from '../../services/commentService.js'
import { getFavouriteCountBlogAPI } from '../../services/favoriteService.js'

/**
 * props:
 * {
 *   image: string,
 *   title: string,
 *   description: string,
 *   authorName: string,
 *   authorAvatar: string,
 *   date: string,
 *   rate: number,
 *   rateCount: number,
 *   commentCount: number,
 *   saveCount: number,
 *   viewCount: number
 * }
 */
const HorizontalCard = ({
  id,
  thumbnail,
  title,
  introduction,
  author,
  createdAt,
  rating,
  rateCount,
  view,
  type
}) => {
  const [commentCount, setCommentCount] = useState(null)
  const [saveCount, setSaveCount] = useState(null)

  useEffect(() => {
    getCommentCount()
    getFavoriteCount()
  }, [id])

  const getCommentCount = async () => {
    try {
      const res = await getCommentCountOfBlogAPI(id)
      setCommentCount(res)
    } catch (err) {
      message.error(err.data)

    }
  }

  const getFavoriteCount = async () => {
    try {
      const res = await getFavouriteCountBlogAPI(id)
      setSaveCount(res)
    } catch (err) {
      message.error(err.data)

    }
  }

  return (
    <Link to={type !== null && type.toLowerCase() === 'character' ? `${ROUTES.getViewCharacter(
      id)}` : `${ROUTES.getViewComic(id)}`}>
      <div className="flex w-[800px] bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4 gap-4">
        {/* thumbnail */}
        <Image
          src={`${URL_BACKEND_IMAGES}/${thumbnail}`}
          alt={title}
          className="!w-48 !h-36 !object-cover rounded-lg flex-shrink-0"
        />

        {/* right column */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          {/* title and description */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 leading-snug hover:text-red-500 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">{introduction}</p>
          </div>

          {/* bottom row with stats and author info */}
          <div className="flex justify-between items-center mt-2">
            {/* stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{rating}</span>
                <span className="text-gray-400">({rateCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>{commentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🔖</span>
                <span>{saveCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{view}</span>
              </div>
            </div>

            {/* author & date */}
            <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
              <img
                src={`${URL_BACKEND_IMAGES}/${author.avatar}`}
                alt={author.avatar}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-gray-600 truncate max-w-[120px]">
                {author.displayName}
              </span>
              <span>•</span>
              <span>{formatDatetimeWithTimeFirst(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HorizontalCard
