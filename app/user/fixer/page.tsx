"use client";

import { useState } from "react";
import {
  Bell,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Wrench,
  Car,
  HomeIcon,
  MessageSquare,
  HelpCircle,
  AlertTriangle,
  Navigation,
} from "lucide-react";
import {
  Button,
  Card,
  Badge,
  Avatar,
  Tabs,
  Input,
  Modal,
  message as antdMessage,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

// Mock data
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
];

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
};

const chatMessages = [
  {
    id: 1,
    sender: "customer",
    message: "Hi, when can you arrive?",
    time: "2:30 PM",
  },
  {
    id: 2,
    sender: "fixer",
    message: "I'll be there in about 30 minutes. Just gathering my tools.",
    time: "2:32 PM",
  },
  {
    id: 3,
    sender: "customer",
    message: "Perfect, thank you!",
    time: "2:33 PM",
  },
  {
    id: 4,
    sender: "fixer",
    message: "I've arrived and am at your front door.",
    time: "3:15 PM",
  },
];

type ServiceRequest = (typeof serviceRequests)[number];
type AcceptedJob = typeof acceptedJobDetails;

export default function FixerApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [acceptedJob, setAcceptedJob] = useState<AcceptedJob | null>(null);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRequestForCounter, setSelectedRequestForCounter] =
    useState<ServiceRequest | null>(null);
  const [counterOfferAmount, setCounterOfferAmount] = useState("");
  const [showCounterOfferScreen, setShowCounterOfferScreen] = useState(false);

  const handleAcceptJob = (requestId: number) => {
    setAcceptedJob(acceptedJobDetails);
    antdMessage.success("Job accepted!");
  };

  const handleCounterOffer = (requestId: number) => {
    const request = serviceRequests.find((req) => req.id === requestId);
    if (request) {
      setSelectedRequestForCounter(request);
      setCounterOfferAmount(request.pricing.amount.toString());
      setShowCounterOfferScreen(true);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return {
          background: "linear-gradient(to right, #ef4444, #dc2626)",
          color: "#fff",
        };
      case "Medium":
        return {
          background: "linear-gradient(to right, #f59e42, #f97316)",
          color: "#fff",
        };
      case "Low":
        return {
          background: "linear-gradient(to right, #10b981, #22c55e)",
          color: "#fff",
        };
      default:
        return {
          background: "linear-gradient(to right, #6b7280, #374151)",
          color: "#fff",
        };
    }
  };

  const getStatusIcon = (
    step: string,
    completed?: boolean,
    current?: boolean
  ) => {
    if (completed)
      return <CheckCircle className="w-6 h-6" style={{ color: "#10b981" }} />;
    if (current) {
      switch (step) {
        case "Fixer Preparing":
          return (
            <Wrench
              className="w-6 h-6 animate-pulse"
              style={{ color: "#2563eb" }}
            />
          );
        case "On the Way":
          return (
            <Car
              className="w-6 h-6 animate-pulse"
              style={{ color: "#2563eb" }}
            />
          );
        case "Arrived":
          return (
            <MapPin
              className="w-6 h-6 animate-pulse"
              style={{ color: "#2563eb" }}
            />
          );
        case "Working":
          return (
            <Wrench
              className="w-6 h-6 animate-bounce"
              style={{ color: "#2563eb" }}
            />
          );
        default:
          return (
            <Clock
              className="w-6 h-6 animate-pulse"
              style={{ color: "#2563eb" }}
            />
          );
      }
    }
    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          border: "2px solid #d1d5db",
          background: "#fff",
        }}
      />
    );
  };

  // Remove header and bottom tab bar: just render the content of the "home" tab directly
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
      }}
    >
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        {showCounterOfferScreen ? (
          // Counter Offer Screen
          <div style={{ padding: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <Button
                type="text"
                onClick={() => setShowCounterOfferScreen(false)}
                style={{ padding: 0, fontWeight: 600 }}
              >
                ← Back
              </Button>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  background: "linear-gradient(to right, #111827, #374151)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                }}
              >
                Counter Offer
              </h2>
            </div>
            {selectedRequestForCounter && (
              <Card
                style={{
                  boxShadow: "0 4px 24px 0 rgba(59,130,246,0.10)",
                  border: 0,
                }}
              >
                <div style={{ padding: 24 }}>
                  <div style={{ marginBottom: 16 }}>
                    <img
                      src={
                        selectedRequestForCounter.photo || "/placeholder.svg"
                      }
                      alt="Service issue"
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 16,
                        boxShadow: "0 2px 12px 0 rgba(59,130,246,0.10)",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <h3
                      style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}
                    >
                      {selectedRequestForCounter.service}
                    </h3>
                    <p style={{ color: "#64748b", fontWeight: 500, margin: 0 }}>
                      {selectedRequestForCounter.customer}
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#334155",
                      background: "#f1f5f9",
                      padding: 16,
                      borderRadius: 12,
                      marginBottom: 16,
                    }}
                  >
                    {selectedRequestForCounter.issue}
                  </p>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#eff6ff",
                        padding: 12,
                        borderRadius: 8,
                        flex: 1,
                      }}
                    >
                      <Clock
                        style={{ width: 20, height: 20, color: "#2563eb" }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#1e293b",
                        }}
                      >
                        {selectedRequestForCounter.estimatedTime}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#ede9fe",
                        padding: 12,
                        borderRadius: 8,
                        flex: 1,
                      }}
                    >
                      <MapPin
                        style={{ width: 20, height: 20, color: "#7c3aed" }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#6d28d9",
                        }}
                      >
                        {selectedRequestForCounter.distance}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "linear-gradient(to right, #f1f5f9, #e0e7ff)",
                      padding: 16,
                      borderRadius: 16,
                      border: "1px solid #e5e7eb",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ color: "#64748b", fontWeight: 500 }}>
                        Original Price:
                      </span>
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        ${selectedRequestForCounter.pricing.amount}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#64748b", fontWeight: 500 }}>
                        Pricing Type:
                      </span>
                      <Badge
                        style={{
                          background: "#dbeafe",
                          color: "#1e40af",
                          fontWeight: 600,
                          padding: "2px 12px",
                        }}
                      >
                        {selectedRequestForCounter.pricing.type}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 8,
                      }}
                    >
                      Your Counter Offer
                    </label>
                    <Input
                      prefix={<DollarSign style={{ color: "#10b981" }} />}
                      type="number"
                      value={counterOfferAmount}
                      onChange={(e) => setCounterOfferAmount(e.target.value)}
                      placeholder="Enter your price"
                      style={{
                        height: 48,
                        fontSize: 18,
                        fontWeight: 600,
                        border: "2px solid #e5e7eb",
                        borderRadius: 12,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Button
                      type="primary"
                      style={{
                        flex: 1,
                        height: 48,
                        background:
                          "linear-gradient(to right, #10b981, #22c55e)",
                        border: 0,
                        fontWeight: 600,
                        borderRadius: 12,
                      }}
                      onClick={() => {
                        antdMessage.success(
                          `Counter offer submitted: $${counterOfferAmount}`
                        );
                        setShowCounterOfferScreen(false);
                      }}
                    >
                      Send Offer ${counterOfferAmount}
                    </Button>
                    <Button
                      style={{
                        flex: 1,
                        height: 48,
                        border: "2px solid #e5e7eb",
                        background: "transparent",
                        fontWeight: 600,
                        borderRadius: 12,
                      }}
                      onClick={() => setShowCounterOfferScreen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        ) : acceptedJob ? (
          // Show accepted job details
          <div style={{ padding: 24 }}>
            <Card
              style={{
                border: 0,
                background: "linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)",
                boxShadow: "0 4px 24px 0 rgba(59,130,246,0.10)",
              }}
            >
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <Avatar
                      size={48}
                      style={{
                        background:
                          "linear-gradient(to right, #2563eb, #6366f1)",
                        color: "#fff",
                        boxShadow: "0 2px 8px 0 rgba(59,130,246,0.15)",
                        border: "4px solid #fff",
                      }}
                      icon={<UserOutlined />}
                    >
                      JM
                    </Avatar>
                    <div>
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {acceptedJob.customer}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 14,
                        }}
                      >
                        <span style={{ color: "#f59e42", fontWeight: 600 }}>
                          ⭐ {acceptedJob.rating}
                        </span>
                        <span style={{ color: "#64748b" }}>
                          ({acceptedJob.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<Phone style={{ width: 16, height: 16 }} />}
                      style={{ background: "#10b981", border: 0 }}
                    />
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<MessageCircle style={{ width: 16, height: 16 }} />}
                      style={{ background: "#2563eb", border: 0 }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <h4
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}
                  >
                    Service Status
                  </h4>
                  <div>
                    {acceptedJob.timeline.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginBottom: 8,
                        }}
                      >
                        {getStatusIcon(item.step, item.completed, item.current)}
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontWeight: 600,
                              color: item.completed
                                ? "#64748b"
                                : item.current
                                ? "#2563eb"
                                : "#cbd5e1",
                            }}
                          >
                            {item.step}
                          </span>
                          {item.time && (
                            <span
                              style={{
                                fontSize: 12,
                                color: "#64748b",
                                marginLeft: 12,
                                background: "#f1f5f9",
                                padding: "2px 8px",
                                borderRadius: 12,
                              }}
                            >
                              {item.time}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: "0 2px 8px 0 rgba(59,130,246,0.10)",
                    border: "1px solid #fff",
                  }}
                >
                  <h4
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}
                  >
                    Service Details
                  </h4>
                  <div
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#64748b", fontWeight: 500 }}>
                      Service Type:
                    </span>
                    <Badge
                      style={{
                        background: "#dbeafe",
                        color: "#1e40af",
                        fontWeight: 600,
                        padding: "2px 12px",
                      }}
                    >
                      {acceptedJob.service}
                    </Badge>
                  </div>
                  <div
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#64748b", fontWeight: 500 }}>
                      Pricing:
                    </span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>
                      {acceptedJob.pricing.type} Price - $
                      {acceptedJob.pricing.amount}
                    </span>
                  </div>
                  <div
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#64748b", fontWeight: 500 }}>
                      Duration:
                    </span>
                    <span style={{ fontWeight: 600, color: "#334155" }}>
                      {acceptedJob.estimatedTime}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "2px solid #e5e7eb",
                      paddingTop: 12,
                    }}
                  >
                    <span
                      style={{
                        color: "#334155",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      Total Estimate:
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 22,
                        background:
                          "linear-gradient(to right, #059669, #16a34a)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ${acceptedJob.pricing.amount}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Show map and available jobs
          <>
            {/* Map Section */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  height: 288,
                  background:
                    "linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #f3e8ff 100%)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px 0 rgba(59,130,246,0.10)",
                }}
              >
                {/* Map Placeholder */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, #dbeafeCC 0%, #bbf7d0CC 100%)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px auto",
                        boxShadow: "0 2px 16px 0 rgba(59,130,246,0.10)",
                      }}
                    >
                      <MapPin
                        style={{ width: 32, height: 32, color: "#2563eb" }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#334155",
                      }}
                    >
                      Interactive Map
                    </p>
                    <p style={{ fontSize: 13, color: "#64748b" }}>
                      Service requests in your area
                    </p>
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
                      fontSize: 16,
                      boxShadow: "0 2px 16px 0 rgba(236,72,153,0.15)",
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                      cursor: "pointer",
                      transition: "transform 0.2s",
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
                    background: "linear-gradient(to right, #2563eb, #6366f1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 16px 0 rgba(59,130,246,0.15)",
                    animation: "bounce 1s infinite",
                  }}
                >
                  <Navigation
                    style={{ width: 20, height: 20, color: "#fff" }}
                  />
                </div>
              </div>
              {/* Map Controls */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    <MapPin
                      style={{ width: 20, height: 20, color: "#374151" }}
                    />
                  }
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 16px 0 rgba(59,130,246,0.10)",
                  }}
                />
              </div>
            </div>
            {/* Available Jobs Section */}
            <div style={{ padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: "linear-gradient(to right, #111827, #374151)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    margin: 0,
                  }}
                >
                  Available Jobs
                </h2>
                <Badge
                  count={`${serviceRequests.length} nearby`}
                  style={{
                    background: "linear-gradient(to right, #2563eb, #6366f1)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "2px 12px",
                    boxShadow: "0 2px 8px 0 rgba(59,130,246,0.10)",
                  }}
                  showZero
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {serviceRequests.map((request) => (
                  <Card
                    key={request.id}
                    style={{
                      boxShadow: "0 4px 24px 0 rgba(59,130,246,0.10)",
                      border: 0,
                      background: "rgba(255,255,255,0.8)",
                      marginBottom: 0,
                    }}
                    bodyStyle={{ padding: 24 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {request.service}
                        </h3>
                        <p
                          style={{
                            color: "#64748b",
                            fontWeight: 500,
                            margin: 0,
                          }}
                        >
                          {request.customer}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Badge
                          style={{
                            ...getUrgencyColor(request.urgency),
                            fontWeight: 600,
                            padding: "2px 12px",
                            boxShadow: "0 2px 8px 0 rgba(59,130,246,0.10)",
                          }}
                          count={request.urgency}
                          showZero
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#64748b",
                            background: "#f1f5f9",
                            padding: "2px 8px",
                            borderRadius: 12,
                          }}
                        >
                          {request.distance}
                        </span>
                      </div>
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
                          boxShadow: "0 2px 12px 0 rgba(59,130,246,0.10)",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        color: "#334155",
                        background: "#f1f5f9",
                        padding: 12,
                        borderRadius: 12,
                        marginBottom: 16,
                      }}
                    >
                      {request.issue}
                    </p>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: "#d1fae5",
                          padding: 12,
                          borderRadius: 8,
                          flex: 1,
                        }}
                      >
                        <DollarSign
                          style={{ width: 20, height: 20, color: "#059669" }}
                        />
                        <span style={{ fontWeight: 600, color: "#065f46" }}>
                          {request.pricing.type}: ${request.pricing.amount}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: "#eff6ff",
                          padding: 12,
                          borderRadius: 8,
                          flex: 1,
                        }}
                      >
                        <Clock
                          style={{ width: 20, height: 20, color: "#2563eb" }}
                        />
                        <span style={{ fontWeight: 600, color: "#1e40af" }}>
                          {request.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#ede9fe",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 24,
                      }}
                    >
                      <MapPin
                        style={{ width: 20, height: 20, color: "#7c3aed" }}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#6d28d9",
                        }}
                      >
                        {request.location}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <Button
                        type="primary"
                        style={{
                          flex: 1,
                          height: 48,
                          background:
                            "linear-gradient(to right, #10b981, #22c55e)",
                          border: 0,
                          fontWeight: 700,
                          borderRadius: 12,
                        }}
                        onClick={() => handleAcceptJob(request.id)}
                      >
                        Accept ${request.pricing.amount}
                      </Button>
                      <Button
                        style={{
                          flex: 1,
                          height: 48,
                          border: "2px solid #2563eb",
                          background: "transparent",
                          color: "#2563eb",
                          fontWeight: 600,
                          borderRadius: 12,
                        }}
                        onClick={() => handleCounterOffer(request.id)}
                      >
                        Counter Offer
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
