"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Search,
  Bot,
  Play,
  Camera,
  Shield,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      id: "1",
      question: "How does AI object detection work?",
      answer:
        "Our AI analyzes your uploaded photos to identify the object (TV, fridge, etc.) and detect issues like cracks, leaks, or malfunctions. This helps match you with the right repair experts who specialize in your specific problem.",
      category: "AI Detection",
    },
    {
      id: "2",
      question: "How are Fixers matched to my location?",
      answer:
        "We use GPS technology to find verified repair experts within your area. You can see their distance, ratings, and availability in real-time on the map.",
      category: "Location",
    },
    {
      id: "3",
      question: "Is my payment information secure?",
      answer:
        "Yes, all payments are processed through secure, encrypted gateways. We never store your full payment details on our servers.",
      category: "Security",
    },
    {
      id: "4",
      question: "What if I'm not satisfied with the repair?",
      answer:
        "All repairs come with our satisfaction guarantee. If you're not happy, contact us within 48 hours and we'll work to resolve the issue or provide a refund.",
      category: "Guarantee",
    },
    {
      id: "5",
      question: "How do video diagnostics work?",
      answer:
        "Video diagnostics allow Fixers to assess your issue in real-time through video calls. This helps provide more accurate quotes and faster solutions.",
      category: "Video Calls",
    },
    {
      id: "6",
      question: "Can I schedule recurring services?",
      answer:
        "Yes! Many Fixers offer recurring maintenance services. You can set up monthly, quarterly, or annual appointments for ongoing maintenance.",
      category: "Recurring Services",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Chatbot Support */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Chat with AI Assistant</h3>
                <p className="text-sm text-gray-600">Get instant help 24/7</p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200"
          />
        </div>

        {/* AI Object Detection Tutorial */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-600" />
              How AI Object Detection Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Video Tutorial</p>
                <p className="text-xs text-gray-500">Learn how our AI identifies issues</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">What our AI can detect:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline" className="justify-center">
                  📱 Electronics
                </Badge>
                <Badge variant="outline" className="justify-center">
                  🏠 Appliances
                </Badge>
                <Badge variant="outline" className="justify-center">
                  🚿 Plumbing
                </Badge>
                <Badge variant="outline" className="justify-center">
                  ⚡ Electrical
                </Badge>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">How it works:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Upload a clear photo of your broken item</li>
                <li>2. AI identifies the object and potential issues</li>
                <li>3. Get matched with specialized repair experts</li>
                <li>4. Receive accurate quotes based on the diagnosis</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{faq.question}</span>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-700">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="h-4 w-4 mr-3" />
              Live Chat Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-3" />
              Call Support: 1-800-JAZARO
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-3" />
              Email: support@jazaro.com
            </Button>
          </CardContent>
        </Card>

        {/* Legal Documents */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Legal & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-between">
              <span>Privacy Policy</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-between">
              <span>Terms of Service</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-between">
              <span>Data Protection</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Security Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Your data is protected:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• All photos and data are encrypted</li>
                <li>• Fixer background checks and verification</li>
                <li>• Secure payment processing</li>
                <li>• Location data is anonymized</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spacing for content */}
      <div className="h-8"></div>
    </div>
  )
}
