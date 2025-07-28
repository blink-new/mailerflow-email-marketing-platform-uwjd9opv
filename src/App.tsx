import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { blink } from './blink/client'

// Layout Components
import Navigation from './components/layout/Navigation'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

// Public Pages
import Homepage from './components/pages/Homepage'
import About from './components/pages/About'
import Pricing from './components/pages/Pricing'
import Blog from './components/pages/Blog'
import Contact from './components/pages/Contact'

// Dashboard Pages
import Dashboard from './components/pages/Dashboard'
import Campaigns from './components/pages/Campaigns'
import Subscribers from './components/pages/Subscribers'
import Templates from './components/pages/Templates'
import CampaignBuilder from './components/pages/CampaignBuilder'
import AutomationBuilder from './components/pages/AutomationBuilder'
import LandingPageBuilder from './components/pages/LandingPageBuilder'

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Public routes that don't require authentication
  const PublicLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-white">
      <Navigation />
      {children}
    </div>
  )

  // Dashboard layout for authenticated users
  const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">MailerFlow</h2>
          <p className="text-red-100">Loading your email marketing platform...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <Homepage />
          </PublicLayout>
        } />
        <Route path="/about" element={
          <PublicLayout>
            <About />
          </PublicLayout>
        } />
        <Route path="/pricing" element={
          <PublicLayout>
            <Pricing />
          </PublicLayout>
        } />
        <Route path="/blog" element={
          <PublicLayout>
            <Blog />
          </PublicLayout>
        } />
        <Route path="/contact" element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        } />

        {/* Authentication Routes */}
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" replace /> : 
          <div className="min-h-screen bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent mb-2">
                  MailerFlow
                </h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>
              <button
                onClick={() => blink.auth.login('/dashboard')}
                className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Sign In with Blink
              </button>
            </div>
          </div>
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          user ? (
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          ) : <Navigate to="/login" replace />
        } />
        
        <Route path="/campaigns" element={
          user ? (
            <DashboardLayout>
              <Campaigns />
            </DashboardLayout>
          ) : <Navigate to="/login" replace />
        } />
        
        <Route path="/campaigns/builder" element={
          user ? <CampaignBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/campaigns/builder/:id" element={
          user ? <CampaignBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/subscribers" element={
          user ? (
            <DashboardLayout>
              <Subscribers />
            </DashboardLayout>
          ) : <Navigate to="/login" replace />
        } />
        
        <Route path="/templates" element={
          user ? (
            <DashboardLayout>
              <Templates />
            </DashboardLayout>
          ) : <Navigate to="/login" replace />
        } />
        
        <Route path="/automation" element={
          user ? <AutomationBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/automation/builder" element={
          user ? <AutomationBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/automation/builder/:id" element={
          user ? <AutomationBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/landing-pages" element={
          user ? <LandingPageBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/landing-pages/builder" element={
          user ? <LandingPageBuilder /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/landing-pages/builder/:id" element={
          user ? <LandingPageBuilder /> : <Navigate to="/login" replace />
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App