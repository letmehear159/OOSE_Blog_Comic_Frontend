import React from "react";
import { Card, Tag } from "antd";
import {
  ShareAltOutlined,
  EllipsisOutlined,
  StarOutlined,
  EyeOutlined,
  MessageOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import slugify from "../../utils/format";

const VerticalCard = ({
  image,
  date,
  title,
  description,
  rate = 0,
  rateCount = 0,
  commentCount = 0,
  saveCount = 0,
  viewCount = 0,
  tags = [],
  types = [],
}) => {
  const truncateDescription = (text, maxWords = 20) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <Link to={`/review/${slugify(title)}`}>
      <Card
        className="hover:shadow-xl transition-all duration-300 group"
        hoverable
        style={{
          width: 320,
          borderRadius: 16,
          overflow: "hidden",
        }}
        cover={
          <div style={{ position: "relative" }}>
            <img
              alt={title}
              src={image}
              className="group-hover:scale-105 transition-transform duration-300"
              style={{ width: "100%", height: 280, objectFit: "cover" }}
            />
            <div
              className="absolute top-3 left-3 flex flex-wrap gap-1.5"
              style={{ maxWidth: "85%" }}
            >
              {types.map((type, index) => (
                <Tag
                  key={`type-${index}`}
                  color="blue"
                  style={{
                    margin: 0,
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontSize: 12,
                    fontWeight: 500,
                    border: "none",
                  }}
                >
                  {type}
                </Tag>
              ))}
              {tags.map((tag, index) => (
                <Tag
                  key={`tag-${index}`}
                  color="green"
                  style={{
                    margin: 0,
                    borderRadius: 6,
                    padding: "2px 8px",
                    fontSize: 12,
                    fontWeight: 500,
                    border: "none",
                  }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        }
      >
        <div className="px-1">
          <p className="text-xs text-gray-500 mb-2">{date}</p>
          <h3
            className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2"
            style={{
              lineHeight: "1.4em",
              height: "2.8em",
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm text-gray-600 mb-4 line-clamp-3"
            style={{
              lineHeight: "1.5em",
              height: "4.5em",
            }}
          >
            {truncateDescription(description)}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-xs">★</span>
              <span className="text-xs font-medium text-gray-700">
                {rate.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">({rateCount})</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <EyeOutlined className="text-blue-500 text-xs" />
                <span className="text-xs text-gray-600">{viewCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageOutlined className="text-green-500 text-xs" />
                <span className="text-xs text-gray-600">{commentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOutlined className="text-purple-500 text-xs" />
                <span className="text-xs text-gray-600">{saveCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VerticalCard;
