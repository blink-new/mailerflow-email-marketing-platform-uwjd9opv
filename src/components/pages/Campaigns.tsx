import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Eye,
  MousePointer,
  Calendar,
  Copy,
  Edit,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const campaigns = [
  {
    id: 1,
    name: 'Welcome Series - Part 1',
    subject: 'Welcome to MailerFlow! 🎉',
    status: 'Sent',
    type: 'Regular',
    sent: 2847,
    opens: 712,
    clicks: 89,
    openRate: 25.0,
    clickRate: 3.1,
    sentDate: '2024-01-15',
    createdDate: '2024-01-14'
  },
  {
    id: 2,
    name: 'Monthly Newsletter - January',
    subject: 'Your January Newsletter is Here!',
    status: 'Sending',
    type: 'Regular',
    sent: 8234,
    opens: 1456,
    clicks: 234,
    openRate: 17.7,
    clickRate: 2.8,
    sentDate: '2024-01-20',
    createdDate: '2024-01-19'
  },
  {
    id: 3,
    name: 'Product Launch Announcement',
    subject: 'Introducing Our New Feature!',
    status: 'Draft',
    type: 'Regular',
    sent: 0,
    opens: 0,
    clicks: 0,
    openRate: 0,
    clickRate: 0,
    sentDate: null,
    createdDate: '2024-01-18'
  },
  {
    id: 4,
    name: 'Abandoned Cart Recovery',
    subject: 'You left something behind...',
    status: 'Scheduled',
    type: 'Automation',
    sent: 156,
    opens: 45,
    clicks: 12,
    openRate: 28.8,
    clickRate: 7.7,
    sentDate: '2024-01-22',
    createdDate: '2024-01-16'
  }
]

const statusColors = {
  'Sent': 'bg-green-100 text-green-700',
  'Sending': 'bg-yellow-100 text-yellow-700',
  'Draft': 'bg-gray-100 text-gray-700',
  'Scheduled': 'bg-blue-100 text-blue-700'
}

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Link to="/campaigns/builder">
          <Button className="glow-red hover-glow-red text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">24.8%</p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Click Rate</p>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
              </div>
              <MousePointer className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                      <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
                        {campaign.status}
                      </Badge>
                      <Badge variant="outline">{campaign.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{campaign.subject}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Sent</p>
                        <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Opens</p>
                        <p className="font-medium">{campaign.opens.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Clicks</p>
                        <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Open Rate</p>
                        <p className="font-medium">{campaign.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Click Rate</p>
                        <p className="font-medium">{campaign.clickRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Created</p>
                        <p className="font-medium">{new Date(campaign.createdDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
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