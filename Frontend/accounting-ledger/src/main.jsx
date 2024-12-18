import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate} from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import CreateAccount from './pages/Dashboard/CreateAccount.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'
import Index from './pages/Dashboard/Index.tsx'
import _404 from './404/_404.tsx'

const value = localStorage.getItem('token');

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
<Route path="/" element={value ? <Navigate to="/dashboard" replace /> : <App />}>
      <Route index element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="*" element={<_404/>}/>
    </Route>

    <Route path="/dashboard" element={<ProtectedRoute/>}>
      <Route index element={<Index/>}/>
      <Route path="create-account" element={<CreateAccount/>}/>
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
