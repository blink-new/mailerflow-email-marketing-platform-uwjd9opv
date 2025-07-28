import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Upload,
  MoreHorizontal,
  Users,
  UserPlus,
  UserMinus,
  Mail
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const subscribers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    status: 'Active',
    subscribed: '2024-01-15',
    lastActivity: '2024-01-20',
    tags: ['VIP', 'Newsletter'],
    source: 'Website'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    status: 'Active',
    subscribed: '2024-01-10',
    lastActivity: '2024-01-19',
    tags: ['Customer'],
    source: 'Import'
  },
  {
    id: 3,
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    status: 'Unsubscribed',
    subscribed: '2024-01-05',
    lastActivity: '2024-01-18',
    tags: [],
    source: 'API'
  },
  {
    id: 4,
    email: 'sarah.wilson@example.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    status: 'Active',
    subscribed: '2024-01-12',
    lastActivity: '2024-01-21',
    tags: ['Newsletter', 'Promotions'],
    source: 'Landing Page'
  },
  {
    id: 5,
    email: 'david.brown@example.com',
    firstName: 'David',
    lastName: 'Brown',
    status: 'Bounced',
    subscribed: '2024-01-08',
    lastActivity: '2024-01-16',
    tags: ['Trial'],
    source: 'Website'
  }
]

const statusColors = {
  'Active': 'bg-green-100 text-green-700',
  'Unsubscribed': 'bg-red-100 text-red-700',
  'Bounced': 'bg-yellow-100 text-yellow-700'
}

export default function Subscribers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([])

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(filteredSubscribers.map(s => s.id))
    } else {
      setSelectedSubscribers([])
    }
  }

  const handleSelectSubscriber = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedSubscribers([...selectedSubscribers, id])
    } else {
      setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id))
    }
  }

  const activeCount = subscribers.filter(s => s.status === 'Active').length
  const unsubscribedCount = subscribers.filter(s => s.status === 'Unsubscribed').length
  const bouncedCount = subscribers.filter(s => s.status === 'Bounced').length

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button className="glow-red hover-glow-red text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Subscriber
          </Button>
        </div>
      </div>

      {/* Subscriber Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{subscribers.length.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCount.toLocaleString()}</p>
              </div>
              <UserPlus className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
                <p className="text-2xl font-bold text-red-600">{unsubscribedCount.toLocaleString()}</p>
              </div>
              <UserMinus className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bounced</p>
                <p className="text-2xl font-bold text-yellow-600">{bouncedCount.toLocaleString()}</p>
              </div>
              <Mail className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedSubscribers.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedSubscribers.length} subscriber{selectedSubscribers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  Add Tags
                </Button>
                <Button size="sm" variant="outline">
                  Remove Tags
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  Unsubscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-700">
              <Checkbox
                checked={selectedSubscribers.length === filteredSubscribers.length}
                onCheckedChange={handleSelectAll}
              />
              <div className="flex-1">Email</div>
              <div className="w-32">Name</div>
              <div className="w-24">Status</div>
              <div className="w-32">Subscribed</div>
              <div className="w-32">Last Activity</div>
              <div className="w-32">Tags</div>
              <div className="w-16"></div>
            </div>

            {/* Table Rows */}
            {filteredSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <Checkbox
                  checked={selectedSubscribers.includes(subscriber.id)}
                  onCheckedChange={(checked) => handleSelectSubscriber(subscriber.id, checked as boolean)}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{subscriber.email}</p>
                  <p className="text-sm text-gray-500">{subscriber.source}</p>
                </div>
                <div className="w-32">
                  <p className="text-sm font-medium text-gray-900">
                    {subscriber.firstName} {subscriber.lastName}
                  </p>
                </div>
                <div className="w-24">
                  <Badge className={statusColors[subscriber.status as keyof typeof statusColors]}>
                    {subscriber.status}
                  </Badge>
                </div>
                <div className="w-32">
                  <p className="text-sm text-gray-900">
                    {new Date(subscriber.subscribed).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-32">
                  <p className="text-sm text-gray-900">
                    {new Date(subscriber.lastActivity).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-32">
                  <div className="flex flex-wrap gap-1">
                    {subscriber.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="w-16">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Add Tags</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Unsubscribe
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}