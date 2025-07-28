import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Type, 
  Image, 
  RectangleHorizontal as ButtonIcon, 
  Layout, 
  Palette, 
  Eye, 
  Save,
  Plus,
  Trash2,
  Settings,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'

interface PageBlock {
  id: string
  type: 'hero' | 'text' | 'image' | 'form' | 'testimonial' | 'features' | 'cta'
  content: any
  styles: any
}

export default function LandingPageBuilder() {
  const [page, setPage] = useState({
    name: 'New Landing Page',
    url: 'new-landing-page',
    title: 'Welcome to Our Landing Page',
    description: 'Convert visitors into subscribers'
  })

  const [blocks, setBlocks] = useState<PageBlock[]>([
    {
      id: '1',
      type: 'hero',
      content: {
        headline: 'Transform Your Business Today',
        subheadline: 'Join thousands of successful businesses using our platform',
        buttonText: 'Get Started Free',
        buttonUrl: '#signup',
        backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop'
      },
      styles: {
        textAlign: 'center',
        padding: '80px 20px',
        backgroundColor: '#1f2937',
        color: '#ffffff'
      }
    }
  ])

  const [selectedBlock, setSelectedBlock] = useState<string | null>('1')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'hero':
        return {
          headline: 'Your Amazing Headline',
          subheadline: 'A compelling subheadline that converts',
          buttonText: 'Get Started',
          buttonUrl: '#signup'
        }
      case 'text':
        return { text: 'Enter your text content here...' }
      case 'image':
        return { 
          src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop', 
          alt: 'Image',
          caption: ''
        }
      case 'form':
        return {
          title: 'Subscribe to Our Newsletter',
          description: 'Get the latest updates and exclusive content',
          fields: ['email'],
          buttonText: 'Subscribe',
          successMessage: 'Thank you for subscribing!'
        }
      case 'testimonial':
        return {
          quote: 'This product has transformed our business completely.',
          author: 'John Smith',
          company: 'Tech Corp',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        }
      case 'features':
        return {
          title: 'Why Choose Us',
          features: [
            { title: 'Feature 1', description: 'Amazing feature description' },
            { title: 'Feature 2', description: 'Another great feature' },
            { title: 'Feature 3', description: 'One more awesome feature' }
          ]
        }
      case 'cta':
        return {
          headline: 'Ready to Get Started?',
          description: 'Join thousands of satisfied customers today',
          buttonText: 'Start Free Trial',
          buttonUrl: '#signup'
        }
      default:
        return {}
    }
  }

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case 'hero':
        return {
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: '#1f2937',
          color: '#ffffff'
        }
      case 'text':
        return {
          fontSize: '16px',
          lineHeight: '1.6',
          padding: '40px 20px',
          textAlign: 'left'
        }
      case 'image':
        return {
          textAlign: 'center',
          padding: '40px 20px'
        }
      case 'form':
        return {
          backgroundColor: '#f9fafb',
          padding: '60px 20px',
          textAlign: 'center'
        }
      case 'testimonial':
        return {
          backgroundColor: '#ffffff',
          padding: '60px 20px',
          textAlign: 'center',
          borderLeft: '4px solid #dc2626'
        }
      case 'features':
        return {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        }
      case 'cta':
        return {
          backgroundColor: '#dc2626',
          color: '#ffffff',
          padding: '80px 20px',
          textAlign: 'center'
        }
      default:
        return {}
    }
  }

  const blockTypes = [
    { type: 'hero', icon: <Layout className="h-5 w-5" />, label: 'Hero Section' },
    { type: 'text', icon: <Type className="h-5 w-5" />, label: 'Text Block' },
    { type: 'image', icon: <Image className="h-5 w-5" />, label: 'Image' },
    { type: 'form', icon: <ButtonIcon className="h-5 w-5" />, label: 'Signup Form' },
    { type: 'testimonial', icon: <Type className="h-5 w-5" />, label: 'Testimonial' },
    { type: 'features', icon: <Layout className="h-5 w-5" />, label: 'Features' },
    { type: 'cta', icon: <ButtonIcon className="h-5 w-5" />, label: 'Call to Action' }
  ]

  const addBlock = (type: string) => {
    const newBlock: PageBlock = {
      id: Date.now().toString(),
      type: type as any,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    }
    setBlocks([...blocks, newBlock])
    setSelectedBlock(newBlock.id)
  }

  const updateBlock = (id: string, updates: Partial<PageBlock>) => {
    setBlocks(blocks => 
      blocks.map(block => 
        block.id === id ? { ...block, ...updates } : block
      )
    )
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks => blocks.filter(block => block.id !== id))
    setSelectedBlock(null)
  }

  const renderBlock = (block: PageBlock) => {
    const blockStyle = {
      ...block.styles,
      minHeight: '100px',
      position: 'relative' as const
    }

    switch (block.type) {
      case 'hero':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {block.content.headline}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {block.content.subheadline}
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold">
                {block.content.buttonText}
              </button>
            </div>
          </div>
        )
      case 'text':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300 max-w-4xl mx-auto"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div dangerouslySetInnerHTML={{ __html: block.content.text.replace(/\n/g, '<br>') }} />
          </div>
        )
      case 'image':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="max-w-4xl mx-auto">
              <img 
                src={block.content.src} 
                alt={block.content.alt}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
              {block.content.caption && (
                <p className="text-center text-gray-600 mt-4 italic">
                  {block.content.caption}
                </p>
              )}
            </div>
          </div>
        )
      case 'form':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-4">{block.content.title}</h3>
              <p className="text-gray-600 mb-6">{block.content.description}</p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                  {block.content.buttonText}
                </button>
              </div>
            </div>
          </div>
        )
      case 'testimonial':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-xl md:text-2xl italic mb-6">
                "{block.content.quote}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={block.content.avatar} 
                  alt={block.content.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{block.content.author}</div>
                  <div className="text-gray-600">{block.content.company}</div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'features':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{block.content.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {block.content.features.map((feature: any, index: number) => (
                  <div key={index} className="text-center">
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'cta':
        return (
          <div 
            style={blockStyle}
            className="cursor-pointer hover:ring-2 hover:ring-red-300"
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {block.content.headline}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {block.content.description}
              </p>
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold">
                {block.content.buttonText}
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const selectedBlockData = blocks.find(block => block.id === selectedBlock)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Landing Page Builder</h1>
            <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
              Draft
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-white shadow' : ''}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-white shadow' : ''}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white">
              <Globe className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Blocks */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Page Blocks</h3>
          <div className="space-y-2">
            {blockTypes.map((blockType) => (
              <button
                key={blockType.type}
                onClick={() => addBlock(blockType.type)}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 transition-colors duration-200"
              >
                <div className="text-red-600">
                  {blockType.icon}
                </div>
                <span className="font-medium text-sm">{blockType.label}</span>
                <Plus className="h-4 w-4 ml-auto text-gray-400" />
              </button>
            ))}
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold text-gray-900 mb-4">Page Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pageName" className="text-sm">Page Name</Label>
              <Input
                id="pageName"
                value={page.name}
                onChange={(e) => setPage({...page, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pageUrl" className="text-sm">URL Slug</Label>
              <Input
                id="pageUrl"
                value={page.url}
                onChange={(e) => setPage({...page, url: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pageTitle" className="text-sm">Page Title</Label>
              <Input
                id="pageTitle"
                value={page.title}
                onChange={(e) => setPage({...page, title: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pageDescription" className="text-sm">Meta Description</Label>
              <Textarea
                id="pageDescription"
                value={page.description}
                onChange={(e) => setPage({...page, description: e.target.value})}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Center - Page Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <div className={`mx-auto transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'
          }`}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Landing Page Preview</CardTitle>
                    <CardDescription>
                      URL: /{page.url}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {viewMode === 'mobile' ? 'Mobile' : 'Desktop'} View
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-white">
                  {blocks.map((block) => (
                    <div key={block.id} className="relative group">
                      {renderBlock(block)}
                      {selectedBlock === block.id && (
                        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelectedBlock(block.id)}
                            className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <Settings className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => deleteBlock(block.id)}
                            className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {blocks.length === 0 && (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <div className="text-center">
                        <Layout className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Start building your landing page by adding blocks</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Block Properties */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Block Properties</h3>
          
          {selectedBlockData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {selectedBlockData.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteBlock(selectedBlockData.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  {selectedBlockData.type === 'hero' && (
                    <>
                      <div>
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                          id="headline"
                          value={selectedBlockData.content.headline}
                          onChange={(e) => updateBlock(selectedBlockData.id, {
                            content: { ...selectedBlockData.content, headline: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subheadline">Subheadline</Label>
                        <Textarea
                          id="subheadline"
                          value={selectedBlockData.content.subheadline}
                          onChange={(e) => updateBlock(selectedBlockData.id, {
                            content: { ...selectedBlockData.content, subheadline: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                          id="buttonText"
                          value={selectedBlockData.content.buttonText}
                          onChange={(e) => updateBlock(selectedBlockData.id, {
                            content: { ...selectedBlockData.content, buttonText: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}

                  {selectedBlockData.type === 'text' && (
                    <div>
                      <Label htmlFor="textContent">Text Content</Label>
                      <Textarea
                        id="textContent"
                        value={selectedBlockData.content.text}
                        onChange={(e) => updateBlock(selectedBlockData.id, {
                          content: { ...selectedBlockData.content, text: e.target.value }
                        })}
                        className="mt-1"
                        rows={6}
                      />
                    </div>
                  )}

                  {selectedBlockData.type === 'form' && (
                    <>
                      <div>
                        <Label htmlFor="formTitle">Form Title</Label>
                        <Input
                          id="formTitle"
                          value={selectedBlockData.content.title}
                          onChange={(e) => updateBlock(selectedBlockData.id, {
                            content: { ...selectedBlockData.content, title: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="formDescription">Description</Label>
                        <Textarea
                          id="formDescription"
                          value={selectedBlockData.content.description}
                          onChange={(e) => updateBlock(selectedBlockData.id, {
                            content: { ...selectedBlockData.content, description: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4">
                  <div>
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={selectedBlockData.styles.backgroundColor || '#ffffff'}
                      onChange={(e) => updateBlock(selectedBlockData.id, {
                        styles: { ...selectedBlockData.styles, backgroundColor: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input
                      id="textColor"
                      type="color"
                      value={selectedBlockData.styles.color || '#000000'}
                      onChange={(e) => updateBlock(selectedBlockData.id, {
                        styles: { ...selectedBlockData.styles, color: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="padding">Padding</Label>
                    <Input
                      id="padding"
                      value={selectedBlockData.styles.padding || '40px 20px'}
                      onChange={(e) => updateBlock(selectedBlockData.id, {
                        styles: { ...selectedBlockData.styles, padding: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a block to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}