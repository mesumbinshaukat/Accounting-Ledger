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
import CreateTransaction from './pages/Dashboard/CreateTransaction.tsx'
import Page from './pages/Dashboard/Page.tsx'
import Accounts from './pages/Dashboard/Accounts.tsx'

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
      <Route path="create-transaction" element={<CreateTransaction/>}/>
      <Route path="page" element={<Page/>}/>
      <Route path="accounts" element={<Accounts/>}/>
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
