import React from 'react'
import { Card } from 'antd'
import { ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import slugify from '../../utils/format'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { formatDatetimeWithTimeFirst } from '../../services/helperService.js'
import { ROUTES } from '../../constants/api.js'

const VerticalCard = (props) => {
  const {
    id,
    type,
    thumbnail,
    createdAt,
    title,
    introduction,
    tags = [],
    categories = [],
  } = props
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
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              {tags.map((tag, index) => (
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
              {categories.map((category, index) => (
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
            height: '2.8em',
          }}
          className="hover:text-red-500"
        >
          {title}
        </h3>
        <p
          style={{
            color: '#333',
            marginTop: 4,
            fontSize: 14,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4em',
            height: '2.8em',
          }}
        >
          {introduction}
        </p>
      </Card>
    </Link>
  )
}

export default VerticalCard
