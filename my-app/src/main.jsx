import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthWrapper } from "./context/auth.context.jsx";
import Callback from "./callback/CallBack.jsx";
import { EditBlogCharacterPage } from "./pages/EditBlogCharacterPage.jsx";
import { ViewBlogCharacterPage } from "./pages/ViewBlogCharacterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import { NewBlogCharacterPage } from "./pages/NewBlogCharacterPage.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import ViewBlogPage from "./pages/ViewBlogPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import TestErrorPage from "./pages/TestErrorPage.jsx";

// Error handler for async operations
const errorHandler = async (error) => {
  // Log the error to your error tracking service
  console.error("Router Error:", error);

  // Handle different types of errors
  if (error instanceof Response) {
    const data = await error.json().catch(() => ({}));
    throw new Error(data.message || "An error occurred while fetching data");
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("An unexpected error occurred");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          try {
            // Your homepage data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/new-character",
        element: <NewBlogCharacterPage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          try {
            // Your new character data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/edit-character/:id",
        element: <EditBlogCharacterPage />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          try {
            // Your edit character data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/character/:id",
        element: <ViewBlogCharacterPage />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          try {
            // Your view character data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/review-comic",
        element: <ReviewPage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          try {
            // Your review comic data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/review-character",
        element: <CharacterPage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          try {
            // Your review character data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/view-blog",
        element: <ViewBlogPage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          try {
            // Your view blog data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      // Test error routes
      {
        path: "/test-error",
        element: <TestErrorPage />,
      },
      {
        path: "/test-error/404",
        loader: () => {
          throw new Response("Not Found", { status: 404 });
        },
      },
      {
        path: "/test-error/403",
        loader: () => {
          throw new Response("Forbidden", { status: 403 });
        },
      },
      {
        path: "/test-error/500",
        loader: () => {
          throw new Response("Server Error", { status: 500 });
        },
      },
      {
        path: "/test-error/network",
        loader: () => {
          throw new Error("Network Error: Failed to fetch data");
        },
      },
      {
        path: "/test-error/unknown",
        loader: () => {
          throw new Error("An unexpected error occurred");
        },
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/callback",
    element: <Callback />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
