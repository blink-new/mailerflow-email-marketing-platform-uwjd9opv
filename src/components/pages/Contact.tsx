import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Users } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', company: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@mailerflow.com',
      action: 'mailto:hello@mailerflow.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: '123 Business Ave, Suite 100\nSan Francisco, CA 94105',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'Our support team is available',
      value: 'Monday - Friday: 8am - 6pm PST\nWeekends: 10am - 4pm PST',
      action: '#'
    }
  ]

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      available: true
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our knowledge base',
      available: true
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join our user community',
      available: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
            Get in Touch
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            We're here to help
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about MailerFlow? Need help getting started? Our team is ready to assist you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send us a message
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                    <Button 
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-4"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-2 border-gray-200 focus:border-red-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-2 border-gray-200 focus:border-red-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="border-2 border-gray-200 focus:border-red-500"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="border-2 border-gray-200 focus:border-red-500"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="border-2 border-gray-200 focus:border-red-500"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-red"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in touch
                </h2>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 glow-red">
                            <info.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {info.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {info.description}
                            </p>
                            <p className="text-gray-900 font-medium whitespace-pre-line">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Support Options */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Other ways to get help
                </h2>
                <div className="grid gap-4">
                  {supportOptions.map((option, index) => (
                    <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300 glow-yellow">
                            <option.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                              {option.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          </div>
                          {option.available && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Available
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How quickly do you respond?
                </h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer phone support?
                </h3>
                <p className="text-gray-600">
                  Yes, phone support is available for all paid plan customers during business hours.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I schedule a demo?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Contact us to schedule a personalized demo of MailerFlow.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you provide onboarding help?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer comprehensive onboarding assistance to help you get started.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is technical support included?
                </h3>
                <p className="text-gray-600">
                  Technical support is included with all plans, with priority support for paid customers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can you help with migration?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide migration assistance to help you move from other platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}