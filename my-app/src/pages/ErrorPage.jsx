import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Typography, Space, Result } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  // Function to get error message based on error type
  const getErrorMessage = () => {
    if (error.status === 404) {
      return "The page you're looking for doesn't exist.";
    }
    if (error.status === 403) {
      return "You don't have permission to access this page.";
    }
    if (error.status === 500) {
      return "Something went wrong on our end. Please try again later.";
    }
    return "We apologize for the inconvenience. The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.";
  };

  // Function to get error title based on error type
  const getErrorTitle = () => {
    if (error.status === 404) return "Page Not Found";
    if (error.status === 403) return "Access Denied";
    if (error.status === 500) return "Server Error";
    return "Something went wrong";
  };

  return (
    <Result
      status="error"
      title={getErrorTitle()}
      subTitle={getErrorMessage()}
      icon={<WarningOutlined style={{ fontSize: "64px", color: "#ff4d4f" }} />}
      extra={[
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {error.message && (
            <Text
              type="secondary"
              style={{
                display: "block",
                backgroundColor: "#f5f5f5",
                padding: "16px",
                borderRadius: "4px",
                fontFamily: "monospace",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {error.message}
            </Text>
          )}
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/")}
            style={{
              minWidth: "200px",
            }}
          >
            Return to Home
          </Button>
        </Space>,
      ]}
    />
  );
};

export default ErrorPage;
