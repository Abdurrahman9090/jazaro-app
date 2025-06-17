"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Clock,
  DollarSign,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active")

  const requests = [
    {
      id: 1,
      title: "Samsung TV Screen Repair",
      category: "Electronics",
      status: "quotes_received",
      urgency: "normal",
      budget: "$100-250",
      location: "New York, NY",
      createdAt: "2 hours ago",
      quotesCount: 3,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Kitchen Faucet Leak",
      category: "Plumbing",
      status: "in_progress",
      urgency: "urgent",
      budget: "$50-100",
      location: "New York, NY",
      createdAt: "1 day ago",
      quotesCount: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Office Chair Wheel Replacement",
      category: "Furniture",
      status: "completed",
      urgency: "flexible",
      budget: "Under $50",
      location: "New York, NY",
      createdAt: "3 days ago",
      quotesCount: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const quotes = [
    {
      id: 1,
      requestId: 1,
      provider: {
        name: "TechFix Pro",
        rating: 4.9,
        reviews: 127,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 180,
      timeline: "2-3 days",
      description: "I can replace the LCD panel and fix the screen issue. Includes 6-month warranty.",
      responseTime: "30 minutes ago",
    },
    {
      id: 2,
      requestId: 1,
      provider: {
        name: "ElectroRepair NYC",
        rating: 4.7,
        reviews: 89,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 220,
      timeline: "Same day",
      description: "Professional TV repair with premium parts. 1-year warranty included.",
      responseTime: "1 hour ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "quotes_received":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "quotes_received":
        return <AlertCircle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">FixerApp</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/request">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Link>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Repair Requests</h1>
          <p className="text-gray-600">Track your repair requests and manage quotes from experts</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Requests</TabsTrigger>
            <TabsTrigger value="quotes">Quotes Received</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {requests
              .filter((r) => r.status !== "completed")
              .map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Image
                        src={request.image || "/placeholder.svg"}
                        alt={request.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{request.title}</h3>
                            <p className="text-gray-600 text-sm">{request.createdAt}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status.replace("_", " ")}</span>
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Category:</span>
                            <Badge variant="outline">{request.category}</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{request.budget}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{request.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {request.quotesCount > 0 && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {request.quotesCount} quotes received
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Messages
                            </Button>
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            {quotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={quote.provider.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{quote.provider.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{quote.provider.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{quote.provider.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{quote.provider.reviews} reviews</span>
                          <span>•</span>
                          <span>{quote.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${quote.price}</div>
                      <div className="text-sm text-gray-600">{quote.timeline}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{quote.description}</p>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 ml-auto">
                      Accept Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {requests
              .filter((r) => r.status === "completed")
              .map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Image
                        src={request.image || "/placeholder.svg"}
                        alt={request.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{request.title}</h3>
                            <p className="text-gray-600 text-sm">Completed {request.createdAt}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">Completed</span>
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <Badge variant="outline">{request.category}</Badge>
                            <span>{request.budget}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Rate Service
                            </Button>
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
