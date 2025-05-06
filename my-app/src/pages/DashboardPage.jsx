import { Card, Col, Row, Typography, Divider, Select } from "antd";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const { Title, Text } = Typography;
const { Option } = Select;

const DashboardPage = () => {
  const reportCategories = [
    { title: "Số blog đã đăng", key: "blogs" },
    { title: "Số lượt xem tất cả blog", key: "views" },
    { title: "Số lượt đánh giá", key: "rates" },
    { title: "Tổng số bình luận", key: "comments" },
    { title: "Tổng số lượt reaction", key: "reactions" },
  ];

  const dailyData = [
    { date: "2024-05-01", blogs: 4, views: 100, rates: 2, comments: 5, reactions: 12 },
    { date: "2024-05-02", blogs: 2, views: 150, rates: 4, comments: 3, reactions: 7 },
    { date: "2024-05-03", blogs: 7, views: 120, rates: 1, comments: 8, reactions: 20 },
    { date: "2024-05-04", blogs: 3, views: 180, rates: 3, comments: 2, reactions: 5 },
    { date: "2024-05-05", blogs: 6, views: 90, rates: 2, comments: 6, reactions: 9 },
  ];

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["blogs"]);

  const handleSelect = (key) => {
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div
      style={{
        padding: 16,
        maxWidth: 1200,
        margin: "0 auto",
        overflowX: "hidden",
      }}
    >
      <Title level={3}>Thống kê hệ thống</Title>

      <Row gutter={[16, 16]}>
        {reportCategories.map((category) => {
          const total = dailyData.reduce((sum, item) => sum + item[category.key], 0);
          const today = dailyData[dailyData.length - 1][category.key];

          return (
            <Col xs={24} sm={12} md={8} key={category.key}>
              <Card
                title={`${category.title}: ${total}`}
                onClick={() => handleSelect(category.key)}
                hoverable
                className="cursor-pointer"
                style={{ minHeight: 150 }}
              >

                <AnimatePresence initial={false}>
                  {expandedCategories.includes(category.key) && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <Text>
                        {category.title} hôm nay: <strong>{today}</strong>
                      </Text>

                      <div style={{ height: 180, marginTop: 12 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dailyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey={category.key}
                              stroke="#1890ff"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Divider />

      <Title level={4}>Biểu đồ tổng hợp nhiều loại thống kê</Title>

      <Select
        mode="multiple"
        placeholder="Chọn loại dữ liệu để hiển thị"
        value={selectedCategories}
        onChange={setSelectedCategories}
        style={{ width: "100%", maxWidth: 500, marginBottom: 24 }}
      >
        {reportCategories.map((category) => (
          <Option key={category.key} value={category.key}>
            {category.title}
          </Option>
        ))}
      </Select>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ minWidth: 600 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedCategories.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={
                    ["#8884d8", "#82ca9d", "#ff7300", "#ffc658", "#1890ff"][
                      idx % 5
                    ]
                  }
                  strokeWidth={2}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
