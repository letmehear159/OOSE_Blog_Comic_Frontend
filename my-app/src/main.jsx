import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css'// Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import Callback from './callback/CallBack.jsx'
import { EditBlogCharacterPage } from './pages/EditBlogCharacterPage.jsx'
import { ViewBlogCharacterPage } from './pages/ViewBlogCharacterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import { NewBlogCharacterPage } from './pages/NewBlogCharacterPage.jsx'
import UserPage from './pages/UserPage.jsx'
import CommentPage from './pages/CommentPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import FavouritePage from './pages/FavouritePage.jsx'
import { ReportProvider } from './context/ReportContext'
import FavouriteProvider from './context/FavouriteContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: []
  },
  {
    path: '/login',
    element: <LoginPage/>

  },
  {
    path: '/register',
    element: <RegisterPage/>,

  },
  {
    path: '/callback',
    element: <Callback/>
  },
  {
    path: '/new-character',
    element: <NewBlogCharacterPage/>
  },

  {
    path: '/edit-character/:id',
    element: <EditBlogCharacterPage/>
  },
  {
    path: '/character/:id',
    element: <ViewBlogCharacterPage/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage/>
  },
  {
    path: '/user',
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
  }
])

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <FavouriteProvider>
      <ReportProvider>
        <RouterProvider router={router}/>
      </ReportProvider>
    </FavouriteProvider>
  </AuthWrapper>
)
