import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Clock, Star, CheckCircle, Smartphone, Calendar, TrendingUp, ArrowRight } from "lucide-react"

export default function ProviderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold">FixerApp</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/provider/login">Provider Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/provider/signup">Join as Expert</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <TrendingUp className="w-4 h-4 mr-1" />
            Growing Network of 10,000+ Experts
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Grow Your Repair
            <span className="text-blue-600 block">Business with FixerApp</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with customers who need your expertise. Get more jobs, set your own rates, and build your reputation
            in the repair industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <Link href="/provider/signup">
                Start Earning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2,500</div>
              <p className="text-gray-600">Average Monthly Earnings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15k+</div>
              <p className="text-gray-600">Jobs Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8★</div>
              <p className="text-gray-600">Average Expert Rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24h</div>
              <p className="text-gray-600">Average Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How FixerApp Works for Experts</h2>
            <p className="text-xl text-gray-600">Start earning with these simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">1. Create Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Set up your expert profile with skills, experience, and service areas. Get verified to build trust.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">2. Receive Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get notified of repair requests in your area. Review photos and details to provide accurate quotes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">3. Get Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Complete the job, get rated by customers, and receive payment. Build your reputation for more work.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Repair Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Repair Categories</h2>
            <p className="text-xl text-gray-600">Choose your expertise from our comprehensive categories</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Electronics */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <CardTitle>Electronics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Consumer Electronics</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Screen Repairs</li>
                    <li>• Battery Replacement</li>
                    <li>• Connectivity Issues</li>
                    <li>• Software Problems</li>
                  </ul>
                  <p className="font-medium mt-4">Office Electronics</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Printers & Scanners</li>
                    <li>• Projectors</li>
                    <li>• Network Equipment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Appliances */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏠</span>
                  <CardTitle>Appliances</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Kitchen Appliances</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Refrigerators</li>
                    <li>• Dishwashers</li>
                    <li>• Microwaves</li>
                    <li>• Small Appliances</li>
                  </ul>
                  <p className="font-medium mt-4">Laundry & Climate</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Washers & Dryers</li>
                    <li>• Air Conditioners</li>
                    <li>• Heaters</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Plumbing */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚿</span>
                  <CardTitle>Plumbing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Fixtures</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Faucets & Sinks</li>
                    <li>• Toilets</li>
                    <li>• Showers & Tubs</li>
                  </ul>
                  <p className="font-medium mt-4">Pipes & Water Systems</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pipe Repairs</li>
                    <li>• Water Heaters</li>
                    <li>• Water Purifiers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Electrical */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <CardTitle>Electrical</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Lighting & Wiring</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Light Fixtures</li>
                    <li>• Electrical Outlets</li>
                    <li>• Circuit Breakers</li>
                  </ul>
                  <p className="font-medium mt-4">Vehicle Electrical</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Car Batteries</li>
                    <li>• Vehicle Lighting</li>
                    <li>• Infotainment Systems</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Carpentry */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪚</span>
                  <CardTitle>Carpentry</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Furniture</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tables & Chairs</li>
                    <li>• Cabinets & Shelves</li>
                    <li>• Upholstery</li>
                  </ul>
                  <p className="font-medium mt-4">Structural & Decorative</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Doors & Windows</li>
                    <li>• Staircases</li>
                    <li>• Wooden Decor</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Components */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚗</span>
                  <CardTitle>Vehicle Components</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Mechanical</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Engine Repairs</li>
                    <li>• Brake Systems</li>
                    <li>• Suspension</li>
                  </ul>
                  <p className="font-medium mt-4">Body & Interior</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Body Repairs</li>
                    <li>• Glass Repairs</li>
                    <li>• Interior Trim</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FixerApp?</h2>
            <p className="text-xl text-gray-600">Benefits that help you succeed</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Set Your Own Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You control your pricing. No hidden fees or commission caps. Keep more of what you earn.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Flexible Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Work when you want. Accept jobs that fit your schedule and availability.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle>Build Your Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Customer reviews and ratings help you stand out and attract more high-paying jobs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Verified Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>All customers are verified. No more time wasters or fake requests.</CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Mobile App</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage your business on the go with our mobile app. Get instant notifications.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Quick Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get paid within 24 hours of job completion. No waiting weeks for your money.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Experts Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "FixerApp has transformed my repair business. I'm getting 3x more jobs and earning 40% more than
                  before."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mike Rodriguez</p>
                    <p className="text-sm text-gray-600">Electronics Repair Expert</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The platform is so easy to use. I love being able to see photos before quoting - it saves so much
                  time."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-green-600">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Appliance Repair Specialist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Fast payments and quality customers. FixerApp has helped me grow from a side hustle to full-time
                  business."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-purple-600">DL</span>
                  </div>
                  <div>
                    <p className="font-semibold">David Lee</p>
                    <p className="text-sm text-gray-600">Furniture Repair Expert</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of repair experts already growing their business with FixerApp
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/provider/signup">
              Create Your Expert Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
