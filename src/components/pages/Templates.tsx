import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Eye, 
  Copy, 
  Heart, 
  Star,
  Plus,
  Grid3X3,
  List,
  Palette,
  Mail,
  Zap,
  ShoppingBag,
  Calendar,
  Users
} from 'lucide-react'
import { blink } from '@/blink/client'

interface Template {
  id: string
  name: string
  category: string
  thumbnail_url: string
  content: string
  is_public: boolean
  created_at: string
  user_id: string
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all', name: 'All Templates', icon: <Grid3X3 className="h-4 w-4" />, count: 0 },
    { id: 'newsletter', name: 'Newsletter', icon: <Mail className="h-4 w-4" />, count: 0 },
    { id: 'promotional', name: 'Promotional', icon: <Zap className="h-4 w-4" />, count: 0 },
    { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingBag className="h-4 w-4" />, count: 0 },
    { id: 'event', name: 'Event', icon: <Calendar className="h-4 w-4" />, count: 0 },
    { id: 'welcome', name: 'Welcome', icon: <Users className="h-4 w-4" />, count: 0 },
    { id: 'custom', name: 'My Templates', icon: <Palette className="h-4 w-4" />, count: 0 }
  ]

  // Sample templates data
  const sampleTemplates = [
    {
      id: '1',
      name: 'Modern Newsletter',
      category: 'newsletter',
      thumbnail_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      content: '<div>Modern newsletter template</div>',
      is_public: true,
      created_at: new Date().toISOString(),
      user_id: 'system'
    },
    {
      id: '2',
      name: 'Product Launch',
      category: 'promotional',
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      content: '<div>Product launch template</div>',
      is_public: true,
      created_at: new Date().toISOString(),
      user_id: 'system'
    },
    {
      id: '3',
      name: 'Welcome Series',
      category: 'welcome',
      thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      content: '<div>Welcome series template</div>',
      is_public: true,
      created_at: new Date().toISOString(),
      user_id: 'system'
    },
    {
      id: '4',
      name: 'Flash Sale',
      category: 'ecommerce',
      thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      content: '<div>Flash sale template</div>',
      is_public: true,
      created_at: new Date().toISOString(),
      user_id: 'system'
    },
    {
      id: '5',
      name: 'Event Invitation',
      category: 'event',
      thumbnail_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
      content: '<div>Event invitation template</div>',
      is_public: true,
      created_at: new Date().toISOString(),
      user_id: 'system'
    },
    {
      id: '6',
      name: 'Minimalist Newsletter',
      category: 'newsletter',
      thumbnail_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      content: '<div>Minimalist newsletter template</div>',
      is_public: true,
      created_at: new Date().toISOString(),
      user_id: 'system'
    }
  ]

  const loadTemplates = async () => {
    try {
      setLoading(true)
      // Try to load from database first
      const dbTemplates = await blink.db.templates.list({
        where: { is_public: "1" },
        orderBy: { created_at: 'desc' }
      })
      
      if (dbTemplates.length > 0) {
        setTemplates(dbTemplates)
      } else {
        // Use sample data if no templates in database
        setTemplates(sampleTemplates)
      }
    } catch (error) {
      console.error('Error loading templates:', error)
      // Fallback to sample data
      setTemplates(sampleTemplates)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const applyTemplate = async (template: Template) => {
    try {
      // Create a new campaign with this template
      const user = await blink.auth.me()
      const newCampaign = await blink.db.campaigns.create({
        id: `campaign_${Date.now()}`,
        user_id: user.id,
        name: `${template.name} - Copy`,
        subject: `New campaign from ${template.name}`,
        content: template.content,
        status: 'draft',
        type: 'regular'
      })
      
      // Navigate to campaign builder (you would implement this navigation)
      console.log('Created campaign:', newCampaign)
      alert('Template applied! Redirecting to campaign builder...')
    } catch (error) {
      console.error('Error using template:', error)
      alert('Error applying template. Please try again.')
    }
  }

  const previewTemplate = (template: Template) => {
    // Open preview modal or new window
    console.log('Preview template:', template)
    alert('Preview functionality would open here')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
              <p className="text-gray-600 mt-2">Choose from professionally designed templates to create stunning emails</p>
            </div>
            <Button className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const count = category.id === 'all' 
                    ? templates.length 
                    : templates.filter(t => t.category === category.id).length
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={selectedCategory === category.id ? 'text-red-600' : 'text-gray-500'}>
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        {count}
                      </Badge>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-0 shadow-lg animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedCategory === 'all' ? 'All Templates' : categories.find(c => c.id === selectedCategory)?.name}
                    </h2>
                    <p className="text-gray-600">
                      {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                </div>

                {/* Templates Grid */}
                {viewMode === 'grid' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={template.thumbnail_url}
                            alt={template.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => previewTemplate(template)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => applyTemplate(template)}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Use
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {template.category}
                                </Badge>
                                {template.is_public && (
                                  <Badge variant="secondary" className="text-xs">
                                    Public
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-600">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>4.8</span>
                              <span>(124)</span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
                              onClick={() => applyTemplate(template)}
                            >
                              Use Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-6">
                            <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                              <img
                                src={template.thumbnail_url}
                                alt={template.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge variant="outline" className="text-xs capitalize">
                                      {template.category}
                                    </Badge>
                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span>4.8</span>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 text-sm">
                                    Professional email template perfect for your campaigns
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => previewTemplate(template)}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    Preview
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
                                    onClick={() => applyTemplate(template)}
                                  >
                                    <Copy className="h-4 w-4 mr-1" />
                                    Use Template
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Mail className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or browse different categories
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('all')
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}