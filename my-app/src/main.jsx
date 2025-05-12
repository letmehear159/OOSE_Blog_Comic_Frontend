import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css' // Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import Callback from './callback/CallBack.jsx'
import { EditBlogCharacterPage } from './pages/EditBlogCharacterPage.jsx'
import { ViewBlogCharacterPage } from './pages/ViewBlogCharacterPage.jsx'
import { NewBlogCharacterPage } from './pages/NewBlogCharacterPage.jsx'
import CharacterPage from './pages/CharacterPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import Homepage from './pages/Homepage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import SearchResultPage from './pages/SearchResultPage'
import UserPage from './pages/UserPage.jsx'
import CommentPage from './pages/CommentPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import FavouritePage from './pages/FavouritePage.jsx'
import { ReportProvider } from './context/ReportContext'
import FavouriteProvider from './context/FavouriteContext.jsx'
import CommentAdminPage from './pages/CommentAdminPage.jsx'

import { NewBlogComicPage } from './pages/NewBlogComicPage.jsx'
import { EditBlogComicPage } from './pages/EditBlogComicPage.jsx'
import { ViewBlogComicPage } from './pages/ViewBlogComicPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Homepage/>,
      },
      {
        path: '/new-character',
        element: <NewBlogCharacterPage/>,
      },

      {
        path: '/edit-character/:id',
        element: <EditBlogCharacterPage/>,
      },
      {
        path: '/character/:id',
        element: <ViewBlogCharacterPage/>,
      },
      {
        path: '/comic/:id',
        element: <ViewBlogComicPage/>,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage/>,
      },
      {
        path: '/review-comic',
        element: <ReviewPage/>,
      },
      {
        path: '/review-character',
        element: <CharacterPage/>,
      },
      {
        path: "/view-blog",
        element: <ViewBlogPage />,
      },
      {
        path: '/new-comic',
        element: <NewBlogComicPage/>
      },
      {
        path: '/edit-comic/:id',
        element: <EditBlogComicPage/>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
  {
    path: '/callback',
    element: <Callback/>,
  },
  {
    path: '/dashboard',
    element: <DashboardPage/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage/>
  },
  {
    path: '/search',
    element: <SearchResultPage/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage/>
  },
  {
    path: '/users',
    element: <UserPage/>
  },
  {
    path: 'comment',
    element: <CommentPage/>
  },
  {
    path: 'report',
    element: <ReportPage/>
  },
  {
    path: 'favourite',
    element: <FavouritePage/>
  },
  {
    path: '/comment-admin',
    element: <CommentAdminPage/>
  }
]);

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <FavouriteProvider>
      <ReportProvider>
        <RouterProvider router={router} />
      </ReportProvider>
    </FavouriteProvider>
  </AuthWrapper>
);
