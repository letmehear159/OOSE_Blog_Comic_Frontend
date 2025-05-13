import React from "react";
import slugify from "../../utils/format";
import { Link } from "react-router-dom";
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
  image,
  title,
  description,
  authorName,
  authorAvatar,
  date,
  rate,
  rateCount,
  commentCount,
  saveCount,
  viewCount,
}) => {
  return (
    <Link to={`/${slugify(title)}`}>
      <div className="flex w-[800px] bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4 gap-4">
        {/* thumbnail */}
        <img
          src={image}
          alt={title}
          className="w-48 h-36 object-cover rounded-lg flex-shrink-0"
        />

        {/* right column */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          {/* title and description */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 leading-snug hover:text-red-500 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>

          {/* bottom row with stats and author info */}
          <div className="flex justify-between items-center mt-2">
            {/* stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{rate}</span>
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
                <span>{viewCount}</span>
              </div>
            </div>

            {/* author & date */}
            <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-medium text-gray-600 truncate max-w-[120px]">
                {authorName}
              </span>
              <span>•</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalCard;
