import React from "react";

const TopReviewCard = ({ index, avatar, title, date }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-5 ">
        {/* Avatar + Rank Badge */}
        <div className="relative">
          <img
            src={avatar}
            alt={title}
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="absolute -top-1 -left-1 bg-gradient-to-r from-pink-400 to-orange-400 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
            {index}
          </span>
        </div>

        {/* Text */}
        <div>
          <h3 className="font-semibold text-black text-base leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      </div>
      <hr className="w-full text-gray-300" />
    </div>
  );
};

export default TopReviewCard;
