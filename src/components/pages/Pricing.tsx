import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Check, Star } from 'lucide-react'

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        '1,000 subscribers',
        '12,000 emails/month',
        'Email support',
        'Basic templates',
        'Landing pages',
        'Signup forms'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Growing Business',
      description: 'For growing businesses',
      monthlyPrice: 10,
      annualPrice: 8,
      features: [
        '2,500 subscribers',
        'Unlimited emails',
        'Priority support',
        'Advanced templates',
        'A/B testing',
        'Automation',
        'Custom domains',
        'Advanced analytics'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Advanced',
      description: 'For established businesses',
      monthlyPrice: 21,
      annualPrice: 17,
      features: [
        '5,000 subscribers',
        'Unlimited emails',
        'Phone & email support',
        'Custom HTML editor',
        'Advanced automation',
        'Facebook integration',
        'Custom branding',
        'Dedicated IP'
      ],
      popular: false,
      cta: 'Start Free Trial'
    }
  ]

  const enterprise = {
    name: 'Enterprise',
    description: 'For large organizations',
    features: [
      'Unlimited subscribers',
      'Unlimited emails',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
      'White-label solution',
      'Priority onboarding'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
            Simple, Transparent Pricing
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Choose your plan
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Start free and scale as you grow. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-500 data-[state=checked]:to-yellow-500"
            />
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Save 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-red-50 to-yellow-50 ring-2 ring-red-500' 
                    : 'bg-gradient-to-br from-white to-gray-50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 px-4 py-1 text-sm font-medium shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-6">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Billed annually (${(isAnnual ? plan.annualPrice : plan.monthlyPrice) * 12}/year)
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl glow-red'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600'
                    } transition-all duration-300`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                {enterprise.name}
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {enterprise.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <ul className="space-y-3">
                  {enterprise.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-4xl font-bold mb-4">Custom Pricing</p>
                <p className="text-gray-300 mb-6">
                  Tailored solutions for your specific needs
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-red"
                >
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Frequently asked questions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600 mb-6">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 mb-6">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my limits?
              </h3>
              <p className="text-gray-600 mb-6">
                We'll notify you before you reach your limits and help you upgrade to a suitable plan.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 mb-6">
                Yes, we offer a 30-day money-back guarantee on all paid plans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}