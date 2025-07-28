import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Type, 
  Image, 
  Link, 
  Eye, 
  Send, 
  Save, 
  ArrowLeft,
  Plus,
  Trash2,
  Move,
  Settings,
  Smartphone,
  Monitor
} from 'lucide-react'
import { blink } from '@/blink/client'

interface EmailBlock {
  id: string
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer'
  content: any
  styles: any
}

const getDefaultContent = (type: string) => {
  switch (type) {
    case 'text':
      return { text: 'Your text here...' }
    case 'image':
      return { src: 'https://via.placeholder.com/600x300', alt: 'Image', url: '' }
    case 'button':
      return { text: 'Click Here', url: '#' }
    case 'divider':
      return {}
    case 'spacer':
      return { height: '20px' }
    default:
      return {}
  }
}

const getDefaultStyles = (type: string) => {
  switch (type) {
    case 'text':
      return { fontSize: '16px', color: '#333333', textAlign: 'left', fontWeight: 'normal' }
    case 'image':
      return { width: '100%', textAlign: 'center' }
    case 'button':
      return { 
        backgroundColor: '#dc2626', 
        color: '#ffffff', 
        padding: '12px 24px', 
        borderRadius: '6px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    case 'divider':
      return { borderColor: '#e5e7eb', borderWidth: '1px' }
    case 'spacer':
      return { height: '20px' }
    default:
      return {}
  }
}

export default function CampaignBuilder() {
  const [campaign, setCampaign] = useState({
    name: 'New Campaign',
    subject: '',
    preheader: '',
    fromName: '',
    fromEmail: ''
  })
  
  const [blocks, setBlocks] = useState<EmailBlock[]>([
    {
      id: '1',
      type: 'text',
      content: { text: 'Welcome to our newsletter!' },
      styles: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#333333' }
    }
  ])
  
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [isPreview, setIsPreview] = useState(false)
  const draggedBlock = useRef<string | null>(null)

  const blockTypes = [
    { type: 'text', icon: Type, label: 'Text' },
    { type: 'image', icon: Image, label: 'Image' },
    { type: 'button', icon: Link, label: 'Button' },
    { type: 'divider', icon: Move, label: 'Divider' },
    { type: 'spacer', icon: Plus, label: 'Spacer' }
  ]

  const addBlock = (type: string) => {
    const newBlock: EmailBlock = {
      id: Date.now().toString(),
      type: type as any,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<EmailBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id))
    if (selectedBlock === id) {
      setSelectedBlock(null)
    }
  }

  const saveCampaign = async () => {
    try {
      const user = await blink.auth.me()
      await blink.db.campaigns.create({
        id: `campaign_${Date.now()}`,
        user_id: user.id,
        name: campaign.name,
        subject: campaign.subject,
        content: JSON.stringify({ blocks, settings: campaign }),
        status: 'draft'
      })
      alert('Campaign saved successfully!')
    } catch (error) {
      console.error('Error saving campaign:', error)
      alert('Error saving campaign')
    }
  }

  const renderBlock = (block: EmailBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div 
            style={block.styles}
            className="min-h-[40px] p-2 cursor-text"
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={(e) => updateBlock(block.id, { 
              content: { ...block.content, text: e.currentTarget.textContent } 
            })}
          >
            {block.content.text}
          </div>
        )
      
      case 'image':
        return (
          <div style={{ textAlign: block.styles.textAlign }} className="p-2">
            <img 
              src={block.content.src} 
              alt={block.content.alt}
              style={{ width: block.styles.width, maxWidth: '100%' }}
              className="cursor-pointer"
            />
          </div>
        )
      
      case 'button':
        return (
          <div style={{ textAlign: block.styles.textAlign }} className="p-2">
            <button
              style={block.styles}
              className="cursor-pointer border-0 inline-block"
            >
              {block.content.text}
            </button>
          </div>
        )
      
      case 'divider':
        return (
          <div className="p-2">
            <hr style={block.styles} />
          </div>
        )
      
      case 'spacer':
        return (
          <div style={{ height: block.styles.height }} className="w-full">
          </div>
        )
      
      default:
        return null
    }
  }

  const selectedBlockData = blocks.find(b => b.id === selectedBlock)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{campaign.name}</h1>
              <p className="text-sm text-gray-500">Draft • Last saved 2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className="px-3"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className="px-3"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            
            <Button variant="outline" onClick={saveCampaign}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glow-red">
              <Send className="h-4 w-4 mr-2" />
              Send Test
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        {!isPreview && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <Tabs defaultValue="blocks" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>
              
              <TabsContent value="blocks" className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Add Blocks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {blockTypes.map((blockType) => (
                      <Button
                        key={blockType.type}
                        variant="outline"
                        className="h-20 flex-col space-y-2 hover:bg-red-50 hover:border-red-200"
                        onClick={() => addBlock(blockType.type)}
                      >
                        <blockType.icon className="h-5 w-5" />
                        <span className="text-xs">{blockType.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Email Structure</h3>
                  <div className="space-y-2">
                    {blocks.map((block) => (
                      <div
                        key={block.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                          selectedBlock === block.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedBlock(block.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {blockTypes.find(t => t.type === block.type)?.icon && (
                              React.createElement(blockTypes.find(t => t.type === block.type)!.icon, {
                                className: "h-4 w-4 text-gray-500"
                              })
                            )}
                            <span className="text-sm font-medium capitalize">{block.type}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteBlock(block.id)
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Campaign Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Name
                      </label>
                      <Input
                        value={campaign.name}
                        onChange={(e) => setCampaign({...campaign, name: e.target.value})}
                        placeholder="Enter campaign name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Line
                      </label>
                      <Input
                        value={campaign.subject}
                        onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
                        placeholder="Enter subject line"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Name
                      </label>
                      <Input
                        value={campaign.fromName}
                        onChange={(e) => setCampaign({...campaign, fromName: e.target.value})}
                        placeholder="Your name or company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Email
                      </label>
                      <Input
                        value={campaign.fromEmail}
                        onChange={(e) => setCampaign({...campaign, fromEmail: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="p-4 space-y-4">
                {selectedBlockData ? (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Style {selectedBlockData.type} Block
                    </h3>
                    
                    {selectedBlockData.type === 'text' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Font Size
                          </label>
                          <Input
                            value={selectedBlockData.styles.fontSize}
                            onChange={(e) => updateBlock(selectedBlockData.id, {
                              styles: { ...selectedBlockData.styles, fontSize: e.target.value }
                            })}
                            placeholder="16px"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Color
                          </label>
                          <Input
                            type="color"
                            value={selectedBlockData.styles.color}
                            onChange={(e) => updateBlock(selectedBlockData.id, {
                              styles: { ...selectedBlockData.styles, color: e.target.value }
                            })}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text Align
                          </label>
                          <div className="flex space-x-2">
                            {['left', 'center', 'right'].map(align => (
                              <Button
                                key={align}
                                variant={selectedBlockData.styles.textAlign === align ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateBlock(selectedBlockData.id, {
                                  styles: { ...selectedBlockData.styles, textAlign: align }
                                })}
                                className="capitalize"
                              >
                                {align}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedBlockData.type === 'button' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Button Text
                          </label>
                          <Input
                            value={selectedBlockData.content.text}
                            onChange={(e) => updateBlock(selectedBlockData.id, {
                              content: { ...selectedBlockData.content, text: e.target.value }
                            })}
                            placeholder="Button text"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link URL
                          </label>
                          <Input
                            value={selectedBlockData.content.url}
                            onChange={(e) => updateBlock(selectedBlockData.id, {
                              content: { ...selectedBlockData.content, url: e.target.value }
                            })}
                            placeholder="https://example.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Background Color
                          </label>
                          <Input
                            type="color"
                            value={selectedBlockData.styles.backgroundColor}
                            onChange={(e) => updateBlock(selectedBlockData.id, {
                              styles: { ...selectedBlockData.styles, backgroundColor: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Select a block to edit its style</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Email Canvas */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="flex justify-center py-8">
            <div 
              className={`bg-white shadow-lg ${
                previewMode === 'mobile' ? 'w-80' : 'w-full max-w-2xl'
              } transition-all duration-300`}
            >
              {/* Email Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span>From: {campaign.fromName || 'Your Name'} &lt;{campaign.fromEmail || 'your@email.com'}&gt;</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {campaign.subject || 'Your email subject line'}
                  </div>
                </div>
              </div>
              
              {/* Email Body */}
              <div className="min-h-96">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className={`relative group ${
                      !isPreview && selectedBlock === block.id ? 'ring-2 ring-red-500' : ''
                    }`}
                    onClick={() => !isPreview && setSelectedBlock(block.id)}
                  >
                    {!isPreview && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteBlock(block.id)
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    {renderBlock(block)}
                  </div>
                ))}
                
                {blocks.length === 0 && (
                  <div className="text-center py-16 text-gray-500">
                    <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start building your email by adding blocks</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}