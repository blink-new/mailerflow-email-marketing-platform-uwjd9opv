import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Save,
  Settings,
  Mail,
  Clock,
  Users,
  Filter,
  Zap,
  GitBranch
} from 'lucide-react'
import { blink } from '@/blink/client'

interface WorkflowNode {
  id: string
  type: 'trigger' | 'action' | 'condition' | 'delay'
  title: string
  config: any
  position: { x: number; y: number }
  connections: string[]
}

export default function AutomationBuilder() {
  const [automation, setAutomation] = useState({
    name: 'New Automation',
    description: '',
    status: 'draft'
  })
  
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'trigger',
      title: 'Subscriber joins list',
      config: { listId: '', event: 'subscribe' },
      position: { x: 100, y: 100 },
      connections: []
    }
  ])
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const nodeTypes = [
    { type: 'trigger', icon: Zap, label: 'Trigger', color: 'bg-green-500' },
    { type: 'action', icon: Mail, label: 'Send Email', color: 'bg-blue-500' },
    { type: 'condition', icon: GitBranch, label: 'Condition', color: 'bg-yellow-500' },
    { type: 'delay', icon: Clock, label: 'Wait', color: 'bg-purple-500' }
  ]

  const triggerOptions = [
    { value: 'subscribe', label: 'Subscriber joins list' },
    { value: 'tag_added', label: 'Tag is added' },
    { value: 'email_opened', label: 'Email is opened' },
    { value: 'link_clicked', label: 'Link is clicked' },
    { value: 'date_based', label: 'Date-based trigger' }
  ]

  const getDefaultTitle = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'New Trigger'
      case 'action':
        return 'Send Email'
      case 'condition':
        return 'If/Then'
      case 'delay':
        return 'Wait'
      default:
        return 'New Node'
    }
  }

  const getDefaultConfig = (type: string) => {
    switch (type) {
      case 'trigger':
        return { event: 'subscribe', listId: '' }
      case 'action':
        return { emailId: '', delay: 0 }
      case 'condition':
        return { field: 'tag', operator: 'contains', value: '' }
      case 'delay':
        return { duration: 1, unit: 'days' }
      default:
        return {}
    }
  }

  const addNode = (type: string, position: { x: number; y: number }) => {
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: type as any,
      title: getDefaultTitle(type),
      config: getDefaultConfig(type),
      position,
      connections: []
    }
    setNodes([...nodes, newNode])
  }

  const updateNode = (id: string, updates: Partial<WorkflowNode>) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ))
  }

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id))
    if (selectedNode === id) {
      setSelectedNode(null)
    }
  }

  const connectNodes = (fromId: string, toId: string) => {
    setNodes(nodes.map(node => 
      node.id === fromId 
        ? { ...node, connections: [...node.connections, toId] }
        : node
    ))
  }

  const saveAutomation = async () => {
    try {
      const user = await blink.auth.me()
      await blink.db.automations.create({
        id: `automation_${Date.now()}`,
        user_id: user.id,
        name: automation.name,
        trigger_type: nodes.find(n => n.type === 'trigger')?.config.event || 'subscribe',
        trigger_config: JSON.stringify(nodes.find(n => n.type === 'trigger')?.config || {}),
        workflow_data: JSON.stringify({ nodes, automation }),
        status: automation.status
      })
      alert('Automation saved successfully!')
    } catch (error) {
      console.error('Error saving automation:', error)
      alert('Error saving automation')
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedNode(null)
    }
  }

  const selectedNodeData = nodes.find(n => n.id === selectedNode)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Automations
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{automation.name}</h1>
              <p className="text-sm text-gray-500">
                {automation.status === 'active' ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={saveAutomation}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Activate
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Automation Settings */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Automation Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    value={automation.name}
                    onChange={(e) => setAutomation({...automation, name: e.target.value})}
                    placeholder="Enter automation name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    value={automation.description}
                    onChange={(e) => setAutomation({...automation, description: e.target.value})}
                    placeholder="Describe this automation"
                  />
                </div>
              </div>
            </div>

            {/* Add Nodes */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Add Steps</h3>
              <div className="space-y-2">
                {nodeTypes.map((nodeType) => (
                  <Button
                    key={nodeType.type}
                    variant="outline"
                    className="w-full justify-start hover:bg-gray-50"
                    onClick={() => addNode(nodeType.type, { x: 200, y: 200 })}
                  >
                    <div className={`w-3 h-3 rounded-full ${nodeType.color} mr-3`}></div>
                    <nodeType.icon className="h-4 w-4 mr-2" />
                    {nodeType.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Node Configuration */}
            {selectedNodeData && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Configure {selectedNodeData.title}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      value={selectedNodeData.title}
                      onChange={(e) => updateNode(selectedNodeData.id, { title: e.target.value })}
                      placeholder="Step title"
                    />
                  </div>

                  {selectedNodeData.type === 'trigger' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trigger Event
                      </label>
                      <Select
                        value={selectedNodeData.config.event}
                        onValueChange={(value) => updateNode(selectedNodeData.id, {
                          config: { ...selectedNodeData.config, event: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select trigger" />
                        </SelectTrigger>
                        <SelectContent>
                          {triggerOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedNodeData.type === 'action' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Template
                      </label>
                      <Select
                        value={selectedNodeData.config.emailId}
                        onValueChange={(value) => updateNode(selectedNodeData.id, {
                          config: { ...selectedNodeData.config, emailId: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select email template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="followup">Follow-up Email</SelectItem>
                          <SelectItem value="promotion">Promotional Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedNodeData.type === 'delay' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <Input
                          type="number"
                          value={selectedNodeData.config.duration}
                          onChange={(e) => updateNode(selectedNodeData.id, {
                            config: { ...selectedNodeData.config, duration: parseInt(e.target.value) }
                          })}
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit
                        </label>
                        <Select
                          value={selectedNodeData.config.unit}
                          onValueChange={(value) => updateNode(selectedNodeData.id, {
                            config: { ...selectedNodeData.config, unit: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {selectedNodeData.type === 'condition' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field
                        </label>
                        <Select
                          value={selectedNodeData.config.field}
                          onValueChange={(value) => updateNode(selectedNodeData.id, {
                            config: { ...selectedNodeData.config, field: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tag">Tag</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="custom_field">Custom Field</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Operator
                        </label>
                        <Select
                          value={selectedNodeData.config.operator}
                          onValueChange={(value) => updateNode(selectedNodeData.id, {
                            config: { ...selectedNodeData.config, operator: value }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not_equals">Not Equals</SelectItem>
                            <SelectItem value="starts_with">Starts With</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Value
                        </label>
                        <Input
                          value={selectedNodeData.config.value}
                          onChange={(e) => updateNode(selectedNodeData.id, {
                            config: { ...selectedNodeData.config, value: e.target.value }
                          })}
                          placeholder="Enter value"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteNode(selectedNodeData.id)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Step
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 overflow-hidden relative">
          <div 
            ref={canvasRef}
            className="w-full h-full relative"
            onClick={handleCanvasClick}
          >
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Workflow Nodes */}
            {nodes.map((node) => {
              const nodeTypeInfo = nodeTypes.find(t => t.type === node.type)
              return (
                <Card
                  key={node.id}
                  className={`absolute w-48 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedNode === node.id ? 'ring-2 ring-red-500 shadow-lg' : 'shadow-md'
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedNode(node.id)
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${nodeTypeInfo?.color}`}></div>
                      {nodeTypeInfo?.icon && (
                        <nodeTypeInfo.icon className="h-4 w-4 text-gray-600" />
                      )}
                      <CardTitle className="text-sm font-medium text-gray-900 truncate">
                        {node.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="text-xs text-gray-500">
                      {node.type === 'trigger' && `When: ${node.config.event}`}
                      {node.type === 'action' && `Send: ${node.config.emailId || 'Select email'}`}
                      {node.type === 'delay' && `Wait: ${node.config.duration} ${node.config.unit}`}
                      {node.type === 'condition' && `If: ${node.config.field} ${node.config.operator} ${node.config.value}`}
                    </div>
                    
                    {/* Connection Points */}
                    <div className="flex justify-between mt-3">
                      {node.type !== 'trigger' && (
                        <div className="w-3 h-3 bg-gray-300 rounded-full border-2 border-white shadow-sm"></div>
                      )}
                      <div className="flex-1"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Empty State */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Build Your First Automation
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start by adding a trigger to define when this automation should run
                  </p>
                  <Button 
                    onClick={() => addNode('trigger', { x: 300, y: 200 })}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glow-red"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trigger
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}