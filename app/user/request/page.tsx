"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, MapPin, Clock, DollarSign, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RequestPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [step, setStep] = useState(1)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">FixerApp</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-orange-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="font-medium">Upload Photos</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? "bg-orange-600" : "bg-gray-200"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-orange-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="font-medium">Details</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 3 ? "bg-orange-600" : "bg-gray-200"}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-orange-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-orange-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="font-medium">Review</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Upload Photos of Your Item</CardTitle>
              <CardDescription>
                Take clear photos showing the damage or issue. Multiple angles help experts provide better quotes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Click to upload photos</p>
                  <p className="text-gray-500">or drag and drop images here</p>
                  <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Uploaded Photos ({uploadedImages.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">📸 Photo Tips for Better Quotes</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Take photos in good lighting</li>
                  <li>• Show the damage from multiple angles</li>
                  <li>• Include the entire item for context</li>
                  <li>• Capture any model numbers or labels</li>
                </ul>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={uploadedImages.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
              >
                Continue to Details
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tell Us About Your Item</CardTitle>
              <CardDescription>Provide details to help experts understand what needs to be fixed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="appliances">Appliances</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How urgent?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency (Same day)</SelectItem>
                      <SelectItem value="urgent">Urgent (Within 2 days)</SelectItem>
                      <SelectItem value="normal">Normal (Within a week)</SelectItem>
                      <SelectItem value="flexible">Flexible (Anytime)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Item Title</Label>
                <Input id="title" placeholder="e.g., Samsung TV, Kitchen Faucet, Office Chair" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Problem Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what's wrong with your item. Be as specific as possible..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="location" placeholder="Enter your address or ZIP code" className="pl-10" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-250">$100 - $250</SelectItem>
                      <SelectItem value="250-500">$250 - $500</SelectItem>
                      <SelectItem value="500-plus">$500+</SelectItem>
                      <SelectItem value="open">Open to quotes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="app">In-App Messages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Review Request
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Review Your Request</CardTitle>
              <CardDescription>Double-check your information before submitting to repair experts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photos Preview */}
              <div>
                <h3 className="font-medium mb-3">Photos ({uploadedImages.length})</h3>
                <div className="grid grid-cols-4 gap-2">
                  {uploadedImages.slice(0, 4).map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>

              {/* Request Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <Badge variant="secondary">Electronics</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Urgency:</span>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Normal (Within a week)
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Budget:</span>
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    <DollarSign className="w-3 h-3 mr-1" />
                    $100 - $250
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span className="text-gray-600">New York, NY 10001</span>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">🚀 What happens next?</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Your request will be sent to verified experts in your area</li>
                  <li>• You'll receive quotes within 2-4 hours</li>
                  <li>• Compare quotes and choose your preferred expert</li>
                  <li>• Schedule the repair at your convenience</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back to Edit
                </Button>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" size="lg">
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
