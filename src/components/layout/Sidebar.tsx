import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  Users, 
  Mail, 
  Zap, 
  FileText, 
  Settings, 
  Home,
  PlusCircle,
  Target,
  Globe,
  Palette,
  MousePointer,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { blink } from '@/blink/client'

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, href: '/dashboard' },
  { id: 'campaigns', name: 'Campaigns', icon: Mail, href: '/campaigns' },
  { id: 'subscribers', name: 'Subscribers', icon: Users, href: '/subscribers' },
  { id: 'automation', name: 'Automation', icon: Zap, href: '/automation' },
  { id: 'landing-pages', name: 'Landing Pages', icon: Globe, href: '/landing-pages' },
  { id: 'templates', name: 'Templates', icon: Palette, href: '/templates' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'settings', name: 'Settings', icon: Settings, href: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const handleLogout = () => {
    blink.auth.logout('/')
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 glow-red rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">MailerFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || 
                          (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
                isActive 
                  ? 'glow-red-subtle text-white font-medium' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-gray-500')} />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Link
            to="/campaigns/builder"
            className="w-full flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Campaign</span>
          </Link>
          <Link
            to="/automation/builder"
            className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <Zap className="w-4 h-4" />
            <span>New Automation</span>
          </Link>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.displayName?.[0] || user?.email?.[0] || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}