import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Zap, Heart } from 'lucide-react'

export default function About() {
  const stats = [
    { label: 'Active Users', value: '50,000+', icon: Users },
    { label: 'Emails Sent', value: '1B+', icon: Target },
    { label: 'Countries', value: '120+', icon: Zap },
    { label: 'Customer Satisfaction', value: '99%', icon: Heart }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Former VP of Marketing at TechCorp with 15+ years in email marketing.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Ex-Google engineer passionate about building scalable marketing platforms.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer focused on creating intuitive user experiences.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
            About MailerFlow
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Empowering businesses through email marketing
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We believe that every business deserves access to powerful, easy-to-use email marketing tools. That's why we built MailerFlow - to democratize email marketing and help businesses of all sizes grow.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4 glow-red">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 via-red-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Our Mission
          </h2>
          <p className="text-xl text-red-100 leading-relaxed">
            To make email marketing accessible, powerful, and enjoyable for businesses worldwide. We're committed to providing the tools, insights, and support you need to build meaningful relationships with your customers and grow your business sustainably.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Meet our team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a passionate team of marketers, engineers, and designers dedicated to helping you succeed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-red-200">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{member.name}</CardTitle>
                  <p className="text-red-600 font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Values
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Simplicity</CardTitle>
                <p className="text-gray-600">
                  We believe powerful tools should be easy to use. Every feature is designed with simplicity and clarity in mind.
                </p>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Innovation</CardTitle>
                <p className="text-gray-600">
                  We're constantly pushing the boundaries of what's possible in email marketing technology.
                </p>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Customer Success</CardTitle>
                <p className="text-gray-600">
                  Your success is our success. We're committed to helping you achieve your marketing goals.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}