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
        className="hover:shadow-lg transition-shadow duration-300"
        hoverable
        style={{
          width: 320,
          borderRadius: 12,
          overflow: "hidden",
        }}
        cover={
          <div style={{ position: "relative" }}>
            <img
              alt={title}
              src={image}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <div
              className="absolute top-2 left-2 flex flex-wrap gap-1"
              style={{ maxWidth: "80%" }}
            >
              {types.map((type, index) => (
                <Tag key={`type-${index}`} color="blue" style={{ margin: 0 }}>
                  {type}
                </Tag>
              ))}
              {tags.map((tag, index) => (
                <Tag key={`tag-${index}`} color="green" style={{ margin: 0 }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        }
      >
        <p style={{ marginBottom: 4, fontSize: 12, color: "#999" }}>{date}</p>
        <h3
          style={{
            margin: 0,
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: "1.4em",
            height: "2.3em",
            fontSize: "16px",
          }}
          className="hover:text-red-500"
        >
          {title}
        </h3>
        <p
          style={{
            color: "#666",
            marginBottom: 20,
            fontSize: 13,
            lineHeight: "1.4em",
            height: "4em",
          }}
        >
          {truncateDescription(description)}
        </p>
        <div className="flex items-center justify-between mt-2 text-gray-500 text-xs pt-1">
          <div className="flex items-center gap-0.5">
            <span className="text-yellow-500 text-xs">★</span>
            <span>{rate.toFixed(1)}</span>
            <span className="text-gray-400">({rateCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <EyeOutlined className="text-xs" />
              <span>{viewCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageOutlined className="text-xs" />
              <span>{commentCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <BookOutlined className="text-xs" />
              <span>{saveCount}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VerticalCard;
