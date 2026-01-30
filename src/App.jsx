import React from 'react'
import './App.css'
import IssueForm from './pages/ReportIssue'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Home from './components/Home'
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminDashboard from './pages/AdminDashboard'
import WorkerDashboard from './pages/WorkerDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminReports from './pages/AdminReports'
import AdminArchive from './pages/AdminArchive';
import AdminMessages from './pages/AdminMessages';
import WorkerReports from './pages/WorkerReports'
import Pnp from './pages/Pnp'
import MyReports from './pages/MyReports'
import StatusTracking from './pages/StatusTracking'
import History from './pages/History'
import About from './pages/About'
import Contact from './pages/Contact'
import { ToastProvider } from './context/ToastContext'
import DownloadApp from './pages/DownloadApp'




function App() {


  return (
    <ToastProvider>
      <Header />


      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/download-app' element={<DownloadApp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/form' element={<IssueForm />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/reports' element={<AdminReports />} />
        <Route path='/admin/archive' element={<AdminArchive />} />
        <Route path='/admin/messages' element={<AdminMessages />} />
        <Route path='/worker' element={<WorkerDashboard />} />
        <Route path='/worker/reports' element={<WorkerReports />} />
        <Route path='/my-reports' element={<MyReports />} />
        <Route path='/status-tracking' element={<StatusTracking />} />
        <Route path='/history' element={<History />} />
        <Route path='/*' element={<Pnp />} />
      </Routes>


      <Footer />




    </ToastProvider>
  )
}

export default App
