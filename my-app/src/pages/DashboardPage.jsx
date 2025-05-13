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

// Mới code UI, chưa có logic lấy data để hiển thị

const { Title, Text } = Typography;
const { Option } = Select;

const DashboardPage = () => {
  // -----Hardcode data-----
  const userStats = {
    total: 200, // Cần hàm tính total
    admins: 2,
    bloggers: 10,
    registered: 188,
  };

  const reportCategories = [
    // Ngoài logic lấy dữ toàn thời gian, cần 1 mục riêng của dữ liệu mới nhất (dữ liệu hôm nay)
    { title: "Số blog đã đăng", key: "blogs" },
    { title: "Số lượt xem tất cả blog", key: "views" },
    { title: "Số lượt đánh giá", key: "rates" },
    { title: "Tổng số bình luận", key: "comments" },
    { title: "Tổng số lượt reaction", key: "reactions" },
  ];

  const dailyData = [
    {
      date: "2024-05-01",
      blogs: 4,
      views: 100,
      rates: 2,
      comments: 5,
      reactions: 12,
    },
    {
      date: "2024-05-02",
      blogs: 2,
      views: 150,
      rates: 4,
      comments: 3,
      reactions: 7,
    },
    {
      date: "2024-05-03",
      blogs: 7,
      views: 120,
      rates: 1,
      comments: 8,
      reactions: 20,
    },
    {
      date: "2024-05-04",
      blogs: 3,
      views: 180,
      rates: 3,
      comments: 2,
      reactions: 5,
    },
    {
      date: "2024-05-05",
      blogs: 6,
      views: 90,
      rates: 2,
      comments: 6,
      reactions: 9,
    },
  ];
  // -----Hardcode data-----

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["blogs"]);

  const handleSelect = (key) => {
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white px-4 py-6 sm:ml-32">
      <Title level={3} style={{ color: "white" }}>
        Thống kê hệ thống
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title={
              <Title level={5} style={{ color: "white", margin: 0 }}>
                Số lượng người dùng: {userStats.total}
              </Title>
            }
            onClick={() => handleSelect("users")}
            hoverable
            className="cursor-pointer"
            style={{ backgroundColor: "#2a1a2f", border: "none" }}
          >
            <AnimatePresence initial={false}>
              {expandedCategories.includes("users") && (
                <motion.div
                  key="user-card"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden", color: "white" }}
                >
                  <Text style={{ color: "white" }}>
                    Admin: <strong>{userStats.admins}</strong>
                  </Text>
                  <br />
                  <Text style={{ color: "white" }}>
                    Blogger: <strong>{userStats.bloggers}</strong>
                  </Text>
                  <br />
                  <Text style={{ color: "white" }}>
                    User thường: <strong>{userStats.registered}</strong>
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Col>

        {reportCategories.map((category) => {
          const total = dailyData.reduce(
            (sum, item) => sum + item[category.key],
            0
          );
          const today = dailyData[dailyData.length - 1][category.key];

          return (
            <Col xs={24} sm={12} md={8} key={category.key}>
              <Card
                title={
                  <Title level={5} style={{ color: "white", margin: 0 }}>
                    {`${category.title}: ${total}`}
                  </Title>
                }
                onClick={() => handleSelect(category.key)}
                hoverable
                className="cursor-pointer"
                style={{ backgroundColor: "#2a1a2f", border: "none" }}
              >
                <AnimatePresence initial={false}>
                  {expandedCategories.includes(category.key) && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden", color: "white" }}
                    >
                      <Text style={{ color: "white" }}>
                        {category.title} hôm nay: <strong>{today}</strong>
                      </Text>
                      <div style={{ height: 180, marginTop: 12 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dailyData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#444"
                            />
                            <XAxis dataKey="date" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey={category.key}
                              stroke="#ff85c0"
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

      <Divider style={{ backgroundColor: "#444" }} />

      <Title level={4} style={{ color: "white" }}>
        Thống kê tổng hợp
      </Title>

      <Select
        className="custom-select"
        mode="multiple"
        placeholder="Chọn loại dữ liệu để hiển thị"
        optionLabelProp="label"
        value={selectedCategories}
        onChange={setSelectedCategories}
        style={{
          width: "100%",
          maxWidth: 500,
          marginBottom: 24,
          backgroundColor: "#000000",
          color: "grey",
        }}
        dropdownStyle={{ backgroundColor: "#000000", color: "grey" }}
      >
        {reportCategories.map((category) => (
          <Option
            key={category.key}
            value={category.key}
            label={category.title}
            style={{ color: "grey" }}
          >
            {category.title}
          </Option>
        ))}
      </Select>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ minWidth: 600 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              {selectedCategories.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={
                    ["#ff85c0", "#40a9ff", "#ffc658", "#73d13d", "#d46b08"][
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
