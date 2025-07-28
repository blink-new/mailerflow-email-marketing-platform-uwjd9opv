import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Mail, 
  TrendingUp, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react'

const stats = [
  {
    title: 'Total Subscribers',
    value: '12,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Campaigns Sent',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: Mail,
    color: 'text-green-600'
  },
  {
    title: 'Open Rate',
    value: '24.8%',
    change: '+2.1%',
    trend: 'up',
    icon: Eye,
    color: 'text-purple-600'
  },
  {
    title: 'Click Rate',
    value: '3.2%',
    change: '-0.5%',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

const recentCampaigns = [
  {
    name: 'Welcome Series - Part 1',
    status: 'Sent',
    sent: '2,847',
    opens: '712',
    clicks: '89',
    date: '2 hours ago'
  },
  {
    name: 'Monthly Newsletter',
    status: 'Sending',
    sent: '8,234',
    opens: '1,456',
    clicks: '234',
    date: '1 day ago'
  },
  {
    name: 'Product Launch Announcement',
    status: 'Draft',
    sent: '0',
    opens: '0',
    clicks: '0',
    date: '3 days ago'
  }
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-6 border border-red-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back to MailerFlow! 👋
            </h2>
            <p className="text-gray-600">
              Ready to create amazing email campaigns? Let's get started.
            </p>
          </div>
          <Button className="glow-red hover-glow-red text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Campaigns</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'Sent' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'Sending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status}
                    </span>
                    <span>{campaign.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.sent}</div>
                    <div className="text-gray-500">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.opens}</div>
                    <div className="text-gray-500">Opens</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.clicks}</div>
                    <div className="text-gray-500">Clicks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 glow-red rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Create Campaign</h3>
            <p className="text-sm text-gray-600">Design and send beautiful email campaigns</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 glow-yellow rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Manage Subscribers</h3>
            <p className="text-sm text-gray-600">Import and organize your contact lists</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600">Track performance and engagement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}