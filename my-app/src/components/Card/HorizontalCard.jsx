import React from "react";
import slugify from "../../utils/format";
import { Link } from "react-router-dom";

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
      <div className="flex w-[800px] bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 gap-6 group">
        {/* thumbnail */}
        <div className="relative w-65 h-48 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* right column */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          {/* title and description */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* stats */}
          <div className="flex items-center gap-5 text-sm mt-4">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-full">
              <span className="text-yellow-500">★</span>
              <span className="font-medium text-gray-700">{rate}</span>
              <span className="text-gray-400">({rateCount})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full">
              <span className="text-blue-500">💬</span>
              <span className="font-medium text-gray-700">{commentCount}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
              <span className="text-green-500">🔖</span>
              <span className="font-medium text-gray-700">{saveCount}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-2.5 py-1 rounded-full">
              <span className="text-purple-500">👁️</span>
              <span className="font-medium text-gray-700">{viewCount}</span>
            </div>
          </div>

          {/* author & date */}
          <div className="flex items-center gap-3 text-sm mt-4">
            <div className="flex items-center gap-2">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-6 h-6 rounded-full object-cover ring-2 ring-gray-100"
              />
              <span className="font-medium text-gray-700">{authorName}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalCard;
