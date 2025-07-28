import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Search, Plus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { blink } from '@/blink/client'

const tabTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/campaigns': 'Campaigns',
  '/subscribers': 'Subscribers',
  '/automation': 'Automation',
  '/landing-pages': 'Landing Pages',
  '/templates': 'Templates',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

export default function Header() {
  const location = useLocation()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const getPageTitle = () => {
    const path = location.pathname
    
    // Handle builder pages
    if (path.includes('/builder')) {
      if (path.includes('/campaigns/builder')) return 'Campaign Builder'
      if (path.includes('/automation/builder')) return 'Automation Builder'
      if (path.includes('/landing-pages/builder')) return 'Landing Page Builder'
    }
    
    // Handle exact matches
    return tabTitles[path] || 'MailerFlow'
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>

          {/* Create Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="glow-red hover-glow-red text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                Create
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/campaigns/builder" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Email Campaign
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/automation/builder" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Automation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/landing-pages/builder" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Landing Page
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/templates" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Template
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => blink.auth.logout('/')}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}