import React from "react";
import { Card } from "antd";
import { ShareAltOutlined, EllipsisOutlined } from "@ant-design/icons";

const CardComic = ({ image, date, title, description, tag }) => {
  return (
    <Card
      hoverable
      style={{
        width: 300,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
        </div>
      }
    >
      <p style={{ marginBottom: 4, fontSize: 12, color: "#999" }}>{date}</p>
      <h3 style={{ margin: 0, fontWeight: 600 }}>{title}</h3>
      <p style={{ color: "#333", marginTop: 4, fontSize: 14 }}>{description}</p>
      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          marginTop: 12,
          paddingTop: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ShareAltOutlined style={{ fontSize: 18, color: "#888" }} />
        <EllipsisOutlined style={{ fontSize: 18, color: "#888" }} />
      </div>
    </Card>
  );
};

export default CardComic;
