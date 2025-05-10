import React from 'react'
import slugify from '../../utils/format'
import { Link } from 'react-router-dom'

/**
 * props:
 * {
 *   image: string,
 *   title: string,
 *   authorName: string,
 *   authorAvatar: string,
 *   date: string
 * }
 */
const HorizontalCard = ({ image, title, authorName, authorAvatar, date, introduction }) => {
  return (
    <Link to={`/${slugify(title)}`}>
      <div className="flex w-full bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4 gap-4">
        {/* thumbnail */}
        <img
          src={image}
          alt={title}
          className="w-48 h-36 object-cover rounded-lg flex-shrink-0"
        />

        {/* right column */}
        <div className="flex flex-col justify-between flex-1">
          {/* title */}
          <h2 className="text-lg font-semibold text-gray-800 leading-snug hover:text-red-500 line-clamp-2">
            {title}
          </h2>
          <div>
            Đây là phần viết introduction

          </div>
          {/* author & date */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800">{authorName}</span>
            <span className="mx-1">|</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HorizontalCard
