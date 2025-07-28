import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react'
import { blink } from '@/blink/client'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  featured_image: string
  status: string
  created_at: string
  updated_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogPosts = await blink.db.blog_posts.list({
          where: { status: 'published' },
          orderBy: { created_at: 'desc' }
        })
        setPosts(blogPosts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
            MailerFlow Blog
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Email Marketing Insights
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay up-to-date with the latest email marketing trends, best practices, and strategies to grow your business.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-red-500 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Article</h2>
              <p className="text-gray-600">Our latest insights and strategies</p>
            </div>
            
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={filteredPosts[0].featured_image} 
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0">
                    Featured
                  </Badge>
                  
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {filteredPosts[0].title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(filteredPosts[0].created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{getReadingTime(filteredPosts[0].content)} min read</span>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-red">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
            <p className="text-gray-600">
              {searchTerm ? `Found ${filteredPosts.length} articles` : 'Discover our latest insights'}
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4 opacity-50">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <Card 
                  key={post.id} 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50 overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getReadingTime(post.content)} min</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 via-red-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Stay in the loop
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Get the latest email marketing tips, strategies, and insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white border-0 text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}