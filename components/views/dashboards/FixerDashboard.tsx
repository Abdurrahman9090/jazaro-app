"use client"

import { useState } from "react"
import {
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Wrench,
  Car,
  Navigation,
  Phone,
  MessageCircle,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { message, Button, Card, Input, Avatar, Badge, Tag, Space, Typography, Divider } from "antd"
import type { ButtonProps } from "antd"
import { PhoneOutlined, MessageOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const serviceRequests = [
  {
    id: 1,
    customer: "Sarah Johnson",
    service: "TV Repair",
    issue: "TV won't turn on, no display",
    pricing: { type: "Fixed", amount: 120 },
    estimatedTime: "1-2 hours",
    location: "123 Oak Street, Downtown",
    photo: "/placeholder.svg?height=200&width=300",
    urgency: "Medium",
    distance: "2.3 miles",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    customer: "Mike Chen",
    service: "Plumbing",
    issue: "Kitchen sink leak under cabinet",
    pricing: { type: "Hourly", amount: 85 },
    estimatedTime: "2-3 hours",
    location: "456 Pine Avenue, Westside",
    photo: "/placeholder.svg?height=200&width=300",
    urgency: "High",
    distance: "1.8 miles",
    lat: 40.7589,
    lng: -73.9851,
  },
  {
    id: 3,
    customer: "Lisa Rodriguez",
    service: "AC Repair",
    issue: "AC not cooling, making strange noise",
    pricing: { type: "Fixed", amount: 200 },
    estimatedTime: "2-4 hours",
    location: "789 Maple Drive, Eastside",
    photo: "/placeholder.svg?height=200&width=300",
    urgency: "High",
    distance: "3.1 miles",
    lat: 40.7505,
    lng: -73.9934,
  },
]

const acceptedJobDetails = {
  customer: "John Martinez",
  rating: 4.9,
  reviews: 127,
  service: "TV Repair",
  pricing: { type: "Fixed", amount: 120 },
  estimatedTime: "1-2 hours",
  status: "Working",
  timeline: [
    { step: "Booking Confirmed", time: "2:45 PM", completed: true },
    { step: "Fixer Preparing", time: "2:50 PM", completed: true },
    { step: "On the Way", time: "3:00 PM", completed: true },
    { step: "Arrived", time: "3:15 PM", completed: true },
    { step: "Working", time: "", completed: false, current: true },
    { step: "Completed", time: "", completed: false },
  ],
}

type ServiceRequest = typeof serviceRequests[number]
type AcceptedJob = typeof acceptedJobDetails

function getUrgencyTag(urgency: string) {
  switch (urgency) {
    case "High":
      return <Tag color="red">High</Tag>
    case "Medium":
      return <Tag color="orange">Medium</Tag>
    case "Low":
      return <Tag color="green">Low</Tag>
    default:
      return <Tag color="default">{urgency}</Tag>
  }
}

function getStatusIcon(step: string, completed?: boolean, current?: boolean) {
  if (completed)
    return <CheckCircle className="w-6 h-6" color="#52c41a" />
  if (current) {
    switch (step) {
      case "Fixer Preparing":
        return <Wrench className="w-6 h-6" color="#1677ff" />
      case "On the Way":
        return <Car className="w-6 h-6" color="#1677ff" />
      case "Arrived":
        return <MapPin className="w-6 h-6" color="#1677ff" />
      case "Working":
        return <Wrench className="w-6 h-6" color="#1677ff" />
      default:
        return <Clock className="w-6 h-6" color="#1677ff" />
    }
  }
  return (
    <div style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      border: "2px solid #d9d9d9",
      background: "#fff"
    }} />
  )
}

export default function FixerDashboard() {
  const [acceptedJob, setAcceptedJob] = useState<AcceptedJob | null>(null)
  const [selectedRequestForCounter, setSelectedRequestForCounter] = useState<ServiceRequest | null>(null)
  const [counterOfferAmount, setCounterOfferAmount] = useState("")
  const [showCounterOfferScreen, setShowCounterOfferScreen] = useState(false)

  const handleAcceptJob = (requestId: number) => {
    setAcceptedJob(acceptedJobDetails)
    message.success("Job accepted!")
  }

  const handleCounterOffer = (requestId: number) => {
    const request = serviceRequests.find((req) => req.id === requestId)
    if (request) {
      setSelectedRequestForCounter(request)
      setCounterOfferAmount(request.pricing.amount.toString())
      setShowCounterOfferScreen(true)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 50%, #80DEEA 100%)",
      maxWidth: "100vw",
      margin: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ width: "100%", maxWidth: "100vw", margin: 0, paddingLeft: 4, paddingRight: 4 }}>
        {showCounterOfferScreen ? (
          <div style={{ padding: 24 }}>
            <Space align="center" size={16} style={{ marginBottom: 24 }}>
              <Button
                type="link"
                style={{ padding: 0, fontWeight: 600, fontSize: 16, color: "#00838F" }}
                onClick={() => setShowCounterOfferScreen(false)}
              >
                ← Back
              </Button>
              <Title level={4} style={{
                background: "linear-gradient(to right, #111827, #334155)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0
              }}>
                Counter Offer
              </Title>
            </Space>
            {selectedRequestForCounter && (
              <Card style={{ boxShadow: "0 4px 24px #0001", border: 0 }}>
                <div style={{ padding: 24 }}>
                  <div style={{ marginBottom: 16 }}>
                    <img
                      src={selectedRequestForCounter.photo || "/placeholder.svg"}
                      alt="Service issue"
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 16,
                        boxShadow: "0 2px 8px #0001"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Title level={5} style={{ marginBottom: 4 }}>{selectedRequestForCounter.service}</Title>
                    <Text type="secondary" style={{ fontWeight: 500 }}>{selectedRequestForCounter.customer}</Text>
                  </div>
                  <div style={{
                    color: "#334155",
                    background: "#f1f5f9",
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 16
                  }}>
                    {selectedRequestForCounter.issue}
                  </div>
                  <Space size={16} style={{ marginBottom: 16, width: "100%" }}>
                    <Space style={{
                      background: "#e0f2fe",
                      padding: 12,
                      borderRadius: 8,
                      flex: 1
                    }}>
                      <Clock className="w-5 h-5" color="#1677ff" />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#0f172a" }}>
                        {selectedRequestForCounter.estimatedTime}
                      </span>
                    </Space>
                    <Space style={{
                      background: "#ede9fe",
                      padding: 12,
                      borderRadius: 8,
                      flex: 1
                    }}>
                      <MapPin className="w-5 h-5" color="#7c3aed" />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#7c3aed" }}>
                        {selectedRequestForCounter.distance}
                      </span>
                    </Space>
                  </Space>
                  <div style={{
                    background: "linear-gradient(to right, #f1f5f9, #eef2ff)",
                    padding: 16,
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    marginBottom: 16
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <Text type="secondary" style={{ fontWeight: 500 }}>Original Price:</Text>
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                        ${selectedRequestForCounter.pricing.amount}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text type="secondary" style={{ fontWeight: 500 }}>Pricing Type:</Text>
                      <Tag color="blue" style={{ fontWeight: 600, borderRadius: 16, padding: "2px 12px" }}>
                        {selectedRequestForCounter.pricing.type}
                      </Tag>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>
                      Your Counter Offer
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#10b981"
                      }}>
                        <DollarSign className="w-5 h-5" />
                      </span>
                      <Input
                        type="number"
                        value={counterOfferAmount}
                        onChange={e => setCounterOfferAmount(e.target.value)}
                        placeholder="Enter your price"
                        style={{
                          paddingLeft: 36,
                          height: 48,
                          fontSize: 18,
                          fontWeight: 600,
                          border: "2px solid #e2e8f0",
                          borderRadius: 8
                        }}
                      />
                    </div>
                  </div>
                  <Space size={12} style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      style={{
                        flex: 1,
                        height: 48,
                        background: "linear-gradient(to right, #10b981, #22c55e)",
                        border: 0,
                        fontWeight: 600,
                        borderRadius: 8,
                        fontSize: 16
                      }}
                      onClick={() => {
                        message.success(`Counter offer submitted: $${counterOfferAmount}`)
                        setShowCounterOfferScreen(false)
                      }}
                    >
                      Send Offer ${counterOfferAmount}
                    </Button>
                    <Button
                      style={{
                        flex: 1,
                        height: 48,
                        border: "2px solid #e2e8f0",
                        background: "transparent",
                        fontWeight: 600,
                        borderRadius: 8,
                        fontSize: 16
                      }}
                      onClick={() => setShowCounterOfferScreen(false)}
                    >
                      Cancel
                    </Button>
                  </Space>
                </div>
              </Card>
            )}
          </div>
        ) : acceptedJob ? (
          <div style={{ padding: 24 }}>
            <Card style={{
              border: 0,
              background: "linear-gradient(135deg, #B2EBF2 0%, #E0F7FA 100%)",
              boxShadow: "0 4px 24px #0001"
            }}>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Space align="center" size={16}>
                    <Avatar
                      size={48}
                      style={{
                        background: "linear-gradient(to right, #1e40af, #6366f1)",
                        color: "#fff",
                        boxShadow: "0 0 0 4px #fff"
                      }}
                      icon={<User className="w-6 h-6" />}
                    />
                    <div>
                      <Title level={5} style={{ marginBottom: 4 }}>{acceptedJob.customer}</Title>
                      <Space size={8} style={{ fontSize: 14 }}>
                        <span style={{ color: "#f59e42", fontWeight: 600 }}>⭐ {acceptedJob.rating}</span>
                        <Text type="secondary">({acceptedJob.reviews} reviews)</Text>
                      </Space>
                    </div>
                  </Space>
                  <Space size={8}>
                    <Button
                      shape="circle"
                      type="primary"
                      style={{ background: "#10b981", border: 0 }}
                      icon={<PhoneOutlined />}
                    />
                    <Button
                      shape="circle"
                      type="primary"
                      style={{ background: "#1677ff", border: 0 }}
                      icon={<MessageOutlined />}
                    />
                  </Space>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <Title level={5} style={{ marginBottom: 12 }}>Service Status</Title>
                  <div>
                    {acceptedJob.timeline.map((item, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                        {getStatusIcon(item.step, item.completed, item.current)}
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontWeight: 600,
                              color: item.completed
                                ? "#64748b"
                                : item.current
                                ? "#1677ff"
                                : "#cbd5e1"
                            }}
                          >
                            {item.step}
                          </span>
                          {item.time && (
                            <span style={{
                              fontSize: 12,
                              color: "#64748b",
                              marginLeft: 12,
                              background: "#f1f5f9",
                              padding: "2px 8px",
                              borderRadius: 12
                            }}>
                              {item.time}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 2px 8px #0001",
                  border: "1px solid #fff"
                }}>
                  <Title level={5} style={{ marginBottom: 12 }}>Service Details</Title>
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text type="secondary" style={{ fontWeight: 500 }}>Service Type:</Text>
                    <Tag color="blue" style={{ fontWeight: 600, borderRadius: 16, padding: "2px 12px" }}>
                      {acceptedJob.service}
                    </Tag>
                  </div>
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text type="secondary" style={{ fontWeight: 500 }}>Pricing:</Text>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>
                      {acceptedJob.pricing.type} Price - ${acceptedJob.pricing.amount}
                    </span>
                  </div>
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text type="secondary" style={{ fontWeight: 500 }}>Duration:</Text>
                    <span style={{ fontWeight: 600, color: "#334155" }}>{acceptedJob.estimatedTime}</span>
                  </div>
                  <Divider style={{ margin: "12px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#0f172a", fontWeight: 700, fontSize: 18 }}>Total Estimate:</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 24,
                      background: "linear-gradient(to right, #059669, #16a34a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      ${acceptedJob.pricing.amount}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <>
            {/* Map Section */}
            <div style={{ position: "relative" }}>
              <div style={{
                height: 288,
                background: "linear-gradient(135deg, #bae6fd 0%, #ede9fe 50%, #f5d0fe 100%)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 24px #0001"
              }}>
                {/* Map Placeholder */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, #bae6fdcc 0%, #bbf7d0cc 100%)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: 64,
                      height: 64,
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px auto",
                      boxShadow: "0 2px 8px #0001"
                    }}>
                      <MapPin className="w-8 h-8" color="#1677ff" />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#334155" }}>Interactive Map</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Service requests in your area</div>
                  </div>
                </div>
                {/* Map Pins for Service Requests */}
                {serviceRequests.map((request, index) => (
                  <div
                    key={request.id}
                    style={{
                      position: "absolute",
                      width: 48,
                      height: 48,
                      background: "linear-gradient(to right, #ef4444, #ec4899)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 20,
                      boxShadow: "0 2px 8px #0002",
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                      cursor: "pointer",
                      transition: "transform 0.2s"
                    }}
                  >
                    ${request.pricing.amount}
                  </div>
                ))}
                {/* Current Location Pin */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    width: 32,
                    height: 32,
                    background: "linear-gradient(to right, #1e40af, #6366f1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px #0002",
                    animation: "bounce 1.5s infinite"
                  }}
                >
                  <Navigation className="w-5 h-5" color="#fff" />
                </div>
              </div>
              {/* Map Controls */}
              <div style={{
                position: "absolute",
                top: 24,
                right: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}>
                <Button
                  shape="circle"
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 8px #0001"
                  }}
                  icon={<MapPin className="w-5 h-5" color="#334155" />}
                />
              </div>
            </div>
            {/* Available Jobs Section */}
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <Title level={4} style={{
                  background: "linear-gradient(to right, #111827, #334155)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0
                }}>
                  Available Jobs
                </Title>
                <Badge
                  count={`${serviceRequests.length} nearby`}
                  style={{
                    background: "linear-gradient(to right, #1e40af, #6366f1)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    boxShadow: "0 2px 8px #0001",
                    padding: "0 12px"
                  }}
                  showZero
                />
              </div>
              <Space direction="vertical" size={24} style={{ width: "100%" }}>
                {serviceRequests.map((request) => (
                  <Card
                    key={request.id}
                    style={{
                      boxShadow: "0 4px 24px #0001",
                      border: 0,
                      background: "rgba(255,255,255,0.8)",
                      transition: "transform 0.2s",
                      width: "100%",
                      marginLeft: 0,
                      marginRight: 0
                    }}
                    bodyStyle={{ padding: 24 }}
                    hoverable
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div>
                          <Title level={5} style={{ marginBottom: 4 }}>{request.service}</Title>
                          <Text type="secondary" style={{ fontWeight: 500 }}>{request.customer}</Text>
                        </div>
                        <Space size={8}>
                          {getUrgencyTag(request.urgency)}
                          <span style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#64748b",
                            background: "#f1f5f9",
                            padding: "2px 8px",
                            borderRadius: 12
                          }}>
                            {request.distance}
                          </span>
                        </Space>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <img
                          src={request.photo || "/placeholder.svg"}
                          alt="Service issue"
                          style={{
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            borderRadius: 16,
                            boxShadow: "0 2px 8px #0001"
                          }}
                        />
                      </div>
                      <div style={{
                        color: "#334155",
                        background: "#f1f5f9",
                        padding: 12,
                        borderRadius: 10,
                        marginBottom: 16
                      }}>
                        {request.issue}
                      </div>
                      <Space size={16} style={{ marginBottom: 16, width: "100%" }}>
                        <Space style={{
                          background: "#bbf7d0",
                          padding: 12,
                          borderRadius: 8,
                          flex: 1
                        }}>
                          <DollarSign className="w-5 h-5" color="#059669" />
                          <span style={{ fontWeight: 600, color: "#065f46" }}>
                            {request.pricing.type}: ${request.pricing.amount}
                          </span>
                        </Space>
                        <Space style={{
                          background: "#e0f2fe",
                          padding: 12,
                          borderRadius: 8,
                          flex: 1
                        }}>
                          <Clock className="w-5 h-5" color="#1677ff" />
                          <span style={{ fontWeight: 600, color: "#1677ff" }}>{request.estimatedTime}</span>
                        </Space>
                      </Space>
                      <Space size={8} style={{
                        background: "#ede9fe",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 24
                      }}>
                        <MapPin className="w-5 h-5" color="#7c3aed" />
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#7c3aed" }}>{request.location}</span>
                      </Space>
                      <Space size={12} style={{ width: "100%" }}>
                        <Button
                          type="primary"
                          style={{
                            flex: 1,
                            height: 48,
                            background: "linear-gradient(to right, #10b981, #22c55e)",
                            border: 0,
                            fontWeight: 700,
                            borderRadius: 8,
                            fontSize: 16
                          }}
                          onClick={() => handleAcceptJob(request.id)}
                        >
                          Accept ${request.pricing.amount}
                        </Button>
                        <Button
                          style={{
                            flex: 1,
                            height: 48,
                            border: "2px solid #1e40af",
                            background: "transparent",
                            color: "#1e40af",
                            fontWeight: 600,
                            borderRadius: 8,
                            fontSize: 16
                          }}
                          onClick={() => handleCounterOffer(request.id)}
                        >
                          Counter Offer
                        </Button>
                      </Space>
                    </div>
                  </Card>
                ))}
              </Space>
            </div>
          </>
        )}
      </div>
    </div>
  )
}