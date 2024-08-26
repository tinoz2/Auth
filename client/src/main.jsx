import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'
import LoadingContext from './context/LoadingContext'
import VerifyEmail from './components/VerifyEmail'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import ProtectedRouteIsAuth from './components/ProtectedRoutes'
import { ProtectedRouteIsNotAuth } from './components/ProtectedRoutes'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoadingContext>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={
          <ProtectedRouteIsAuth>
            <Register />
          </ProtectedRouteIsAuth>} />
        <Route path='/login' element={
          <ProtectedRouteIsAuth>
            <Login />
          </ProtectedRouteIsAuth>} />
        <Route path='/verify' element={<VerifyEmail />} />
        <Route path='/profile' element={
          <ProtectedRouteIsNotAuth>
            <Profile />
          </ProtectedRouteIsNotAuth>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </LoadingContext>
  </BrowserRouter>
)
