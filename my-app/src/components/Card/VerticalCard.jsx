import React from "react";
import { Card } from "antd";
import { ShareAltOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import slugify from "../../utils/format";

const VerticalCard = ({ image, date, title, description, tag, type }) => {
  return (
    <Link to={`/review/${slugify(title)}`}>
      <Card
        className="hover:shadow-lg transition-shadow duration-300 w-full"
        hoverable
        style={{
          maxWidth: 320,
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
            {tag && (
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "linear-gradient(to right, #fb7185, #f43f5e)",
                  padding: "4px 10px",
                  color: "white",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            )}
            {type && (
              <span
                style={{
                  position: "absolute",
                  top: 40,
                  left: 10,
                  background: "#6366f1",
                  padding: "3px 8px",
                  color: "white",
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                {type}
              </span>
            )}
          </div>
        }
      >
        <p style={{ marginBottom: 4, fontSize: 12, color: "#999" }}>{date}</p>
        <h3
          style={{ margin: 0, fontWeight: 600 }}
          className="hover:text-red-500"
        >
          {title}
        </h3>
        <p style={{ color: "#333", marginTop: 4, fontSize: 14 }}>
          {description}
        </p>
      </Card>
    </Link>
  );
};

export default VerticalCard;
