import React from "react";

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
const HorizontalCard = ({
  image,
  title,
  authorName,
  authorAvatar,
  date,
}) => {
  return (
    <div className="flex w-full max-w-4xl bg-gray-100 rounded-xl shadow hover:shadow-lg transition p-4 gap-5">
      {/* thumbnail */}
      <img
        src={image}
        alt={title}
        className="w-56 h-32 object-cover rounded-lg flex-shrink-0"
      />

      {/* right column */}
      <div className="flex flex-col justify-between flex-1">
        {/* title */}
        <h2 className="text-xl font-semibold text-gray-800 leading-snug">
          {title}
        </h2>

        {/* author & date */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="font-medium text-gray-800">{authorName}</span>
          <span className="mx-1">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
