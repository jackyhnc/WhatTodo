import * as React from "react"
import * as ReactDOM from "react-dom/client"
import './index.css'

import LoggedInRoute from "./_root/loggedInRoute"

import AuthPage from "./_auth/pages/authPage"
import Signup from './_auth/pages/components/signup'
import Login from './_auth/pages/components/login'
import LandingPage from './_auth/pages/landingPage'

import { AuthContextProvider } from './contexts/AuthContext.jsx'
import ProtectedRoutes from "./_root/protectedRoutes"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element: <LandingPage/>
  },
  {
    path:"/login",
    element: 
      <AuthPage>
        <Login/>
      </AuthPage>
  },
  {
    path:"/signup",
    element:
      <AuthPage>
        <Signup/>
      </AuthPage>
  },
  {
    path:`/loggedin/*`,
    element:<ProtectedRoutes><LoggedInRoute/></ProtectedRoutes>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
  </AuthContextProvider>
)