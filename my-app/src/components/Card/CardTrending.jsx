import React from "react";
import slugify from "../../utils/format";
import { Link } from "react-router-dom";
const TopReviewCard = ({ index, avatar, title, date }) => {
  return (
    <Link to={`/${slugify(title)}`}>
      <div className="w-full hover:shadow-lg transition-shadow duration-300 rounded-xl px-3">
        <div className="flex items-center gap-3 py-3">
          {/* Avatar + Rank Badge */}
          <div className="relative">
            <img
              src={avatar}
              alt={title}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute -top-1 -left-1 bg-gradient-to-r from-pink-400 to-orange-400 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {index}
            </span>
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-black text-sm leading-tight hover:text-red-500 line-clamp-2">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{date}</p>
          </div>
        </div>
        <hr className="w-full text-gray-200" />
      </div>
    </Link>
  );
};

export default TopReviewCard;
