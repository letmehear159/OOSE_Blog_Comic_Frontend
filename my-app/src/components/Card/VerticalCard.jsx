import React, { useEffect, useState } from 'react'
import { Card, message } from 'antd'
import { Link } from 'react-router-dom'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { formatDatetimeWithTimeFirst } from '../../services/helperService.js'
import { ROUTES } from '../../constants/api.js'
import {
  ShareAltOutlined,
  EllipsisOutlined,
  StarOutlined,
  EyeOutlined,
  MessageOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { getCommentCountOfBlogAPI } from '../../services/commentService.js'
import { getFavouriteCountBlogAPI } from '../../services/favoriteService.js'

const VerticalCard = (props) => {
  const {
    id,
    type,
    thumbnail,
    createdAt,
    title,
    introduction,
    rating,
    rateCount,
    view,
    tags = [],
    categories = [],
  } = props

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
      <Card
        className="hover:shadow-lg transition-shadow duration-300"
        hoverable
        style={{
          width: 320,
          borderRadius: 12,
          overflow: 'hidden',
        }}
        cover={
          <div style={{ position: 'relative' }}>
            <img
              alt={title}
              src={`${URL_BACKEND_IMAGES}/${thumbnail}`}
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
            />
            <div
              className="absolute top-2 left-2 flex flex-wrap gap-1"
              style={{ maxWidth: '80%' }}
            >
              {categories.map((tag, index) => (
                <span
                  key={tag.id}
                  style={{
                    background: 'linear-gradient(to right, #fb7185, #f43f5e)',
                    padding: '4px 10px',
                    color: 'white',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: 10,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              {tags.map((category, index) => (
                <span
                  key={category.id}
                  style={{
                    background: '#6366f1',
                    padding: '3px 8px',
                    color: 'white',
                    borderRadius: 16,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        }
      >
        <p style={{ marginBottom: 4, fontSize: 12, color: '#999' }}>{formatDatetimeWithTimeFirst(createdAt)}</p>
        <h3
          style={{
            margin: 0,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4em',
            height: 'auto',
            fontSize: '16px',
          }}
          className="hover:text-red-500"
        >
          {title}
        </h3>
        <p
          style={{
            color: '#666',
            marginBottom: 20,
            fontSize: 13,
            lineHeight: '1.4em',
            height: '4em',
          }}
        >
          {introduction}
        </p>
        <div className="flex items-center justify-between mt-2 text-gray-500 text-xs pt-1">
          <div className="flex items-center gap-0.5">
            <span className="text-yellow-500 text-xl">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-400">({rateCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <EyeOutlined className="text-xl"/>
              <span>{view}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageOutlined className="text-xl"/>
              <span>{commentCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOutlined className="text-xl"/>
              <span>{saveCount}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default VerticalCard
