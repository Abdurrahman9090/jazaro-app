"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, MapPin, MessageCircle, Bell, User, Menu, Search, Filter } from "lucide-react"
import Link from "next/link"
import CameraModal from "@/components/camera-modal"

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  const fixers = [
    {
      id: 1,
      name: "Mike Rodriguez",
      specialty: "Electronics Repair",
      rating: 4.9,
      distance: "0.5 mi",
      avatar: "/placeholder.svg?height=40&width=40",
      available: true,
      categories: ["electronics"],
      position: { lat: 40.7589, lng: -73.9851 },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "Appliance Repair",
      rating: 4.8,
      distance: "0.8 mi",
      avatar: "/placeholder.svg?height=40&width=40",
      available: true,
      categories: ["appliances"],
      position: { lat: 40.7614, lng: -73.9776 },
    },
    {
      id: 3,
      name: "David Chen",
      specialty: "Plumbing Expert",
      rating: 4.7,
      distance: "1.2 mi",
      avatar: "/placeholder.svg?height=40&width=40",
      available: false,
      categories: ["plumbing"],
      position: { lat: 40.7505, lng: -73.9934 },
    },
  ]

  const categories = [
    { 
      id: "all", 
      name: "All", 
      icon: "🔧",
      subcategories: []
    },
    { 
      id: "electronics", 
      name: "Electronics", 
      icon: "📱",
      subcategories: [
        {
          name: "Consumer Electronics",
          items: ["Screen Repairs", "Battery Replacement", "Connectivity Issues", "Software Problems"]
        },
        {
          name: "Office Electronics",
          items: ["Printers & Scanners", "Projectors", "Network Equipment"]
        }
      ]
    },
    { 
      id: "appliances", 
      name: "Appliances", 
      icon: "🏠",
      subcategories: [
        {
          name: "Kitchen Appliances",
          items: ["Refrigerators", "Dishwashers", "Microwaves", "Small Appliances"]
        },
        {
          name: "Laundry & Climate",
          items: ["Washers & Dryers", "Air Conditioners", "Heaters"]
        }
      ]
    },
    { 
      id: "plumbing", 
      name: "Plumbing", 
      icon: "🚿",
      subcategories: [
        {
          name: "Fixtures",
          items: ["Faucets & Sinks", "Toilets", "Showers & Tubs"]
        },
        {
          name: "Pipes & Water Systems",
          items: ["Pipe Repairs", "Water Heaters", "Water Purifiers"]
        }
      ]
    },
    { 
      id: "electrical", 
      name: "Electrical", 
      icon: "⚡",
      subcategories: [
        {
          name: "Lighting & Wiring",
          items: ["Light Fixtures", "Electrical Outlets", "Circuit Breakers"]
        },
        {
          name: "Vehicle Electrical",
          items: ["Car Batteries", "Vehicle Lighting", "Infotainment Systems"]
        }
      ]
    },
    { 
      id: "carpentry", 
      name: "Carpentry", 
      icon: "🪚",
      subcategories: [
        {
          name: "Furniture",
          items: ["Tables & Chairs", "Cabinets & Shelves", "Upholstery"]
        },
        {
          name: "Structural & Decorative",
          items: ["Doors & Windows", "Staircases", "Wooden Decor"]
        }
      ]
    },
    { 
      id: "vehicle", 
      name: "Vehicle Components", 
      icon: "🚗",
      subcategories: [
        {
          name: "Mechanical",
          items: ["Engine Repairs", "Brake Systems", "Suspension"]
        },
        {
          name: "Body & Interior",
          items: ["Body Repairs", "Glass Repairs", "Interior Trim"]
        }
      ]
    }
  ]

  const filteredFixers =
    selectedCategory === "all" ? fixers : fixers.filter((fixer) => fixer.categories.includes(selectedCategory))

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData)
    // Here you would typically send the image to your backend for processing
    // or navigate to a repair request page with the captured image
  }

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Dynamically import Leaflet
      import("leaflet").then((L) => {
        // Initialize map
        const map = L.map(mapRef.current!).setView([40.7589, -73.9851], 13)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map)

        // Add fixer markers
        filteredFixers.forEach((fixer) => {
          const marker = L.marker([fixer.position.lat, fixer.position.lng]).addTo(map)
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${fixer.name}</h3>
              <p class="text-xs text-gray-600">${fixer.specialty}</p>
              <p class="text-xs">⭐ ${fixer.rating} • ${fixer.distance}</p>
              <p class="text-xs ${fixer.available ? "text-green-600" : "text-red-600"}">
                ${fixer.available ? "Available" : "Busy"}
              </p>
            </div>
          `)
        })

        // Map click handler for geolocation zoom
        map.on("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords
                map.flyTo([latitude, longitude], 16, { duration: 1 })

                // Add user location marker
                L.marker([latitude, longitude]).addTo(map).bindPopup("Your Location").openPopup()
              },
              () => {
                alert("Geolocation not available. Zooming to default location.")
                map.flyTo([40.7589, -73.9851], 16, { duration: 1 })
              },
            )
          } else {
            alert("Geolocation not supported by your browser.")
            map.flyTo([40.7589, -73.9851], 16, { duration: 1 })
          }
        })

        mapInstanceRef.current = map
      })
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [filteredFixers])

  // Load Leaflet CSS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)

      return () => {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto relative overflow-hidden">
      {/* 3D Globe Dynamic Wallpaper */}
      <div className="fixed inset-0 z-0">
        {/* 3D Globe Background */}
        <div className="absolute inset-0">
          {/* Main Globe Sphere */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-[#E0F7FA]/40 to-[#B2EBF2]/40 backdrop-blur-sm border border-[#00BCD4]/10 shadow-inner animate-spin-slow">
            {/* Globe Grid Lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Latitude lines */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`lat-${i}`}
                  className="absolute left-0 right-0 border-t border-[#00BCD4]/15"
                  style={{ top: `${(i + 1) * 8.33}%` }}
                />
              ))}
              {/* Longitude lines */}
              {[...Array(16)].map((_, i) => (
                <div
                  key={`lng-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-[#00BCD4]/15 transform origin-center"
                  style={{
                    left: "50%",
                    transform: `translateX(-50%) rotateZ(${i * 11.25}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Glowing Core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-[#00BCD4]/60 to-[#26C6DA]/60 rounded-full shadow-[0_0_40px_rgba(0,188,212,0.4)] animate-pulse"></div>

            {/* Floating Particles */}
            {[...Array(30)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-[#00BCD4]/40 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Orbital Rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[130vw] h-[130vw] max-w-[700px] max-h-[700px] border border-[#00BCD4]/8 rounded-full animate-spin-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[800px] max-h-[800px] border border-[#26C6DA]/6 rounded-full animate-spin-slow"></div>

          {/* Additional Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-60 right-5 w-20 h-20 bg-gradient-to-r from-[#26C6DA] to-[#4DD0E1] rounded-full opacity-15 blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/70 backdrop-blur-[10px] border-b border-[#00BCD4]/20 px-4 py-3 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/menu">
              <Menu className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            </Link>
            {/* 3D Jazaro Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* 3D Cube Effect */}
                <div className="w-8 h-8 relative transform-gpu perspective-1000">
                  <div className="w-full h-full bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] rounded-lg shadow-lg transform rotate-12 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#26C6DA] to-[#4DD0E1] rounded-lg opacity-80 transform translate-x-1 translate-y-1"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm transform -rotate-12 drop-shadow-lg">J</span>
                    </div>
                  </div>
                </div>
                {/* Glowing Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-[#00BCD4] to-[#26C6DA] rounded-full shadow-[0_0_10px_rgba(0,188,212,0.8)] animate-pulse"></div>
              </div>
              <h1 className="text-xl font-bold text-[#006064] drop-shadow-lg">Jazaro</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications">
              <Bell className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            </Link>
            <Link href="/profile">
              <User className="h-6 w-6 text-[#006064] hover:text-[#00838F] transition-colors" />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative z-10 px-4 py-3 bg-white/50 backdrop-blur-[10px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
          <Input
            placeholder="Search for fixers or services..."
            className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative z-10 px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-5 w-5 text-[#00838F]" />
          <h2 className="text-lg font-semibold text-[#006064]">Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`relative group cursor-pointer ${
                selectedCategory === category.id ? "ring-2 ring-[#00BCD4]" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="bg-white/80 backdrop-blur-[10px] rounded-lg p-3 border border-[#00BCD4]/30 hover:border-[#00BCD4] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-[#006064]">{category.name}</span>
                </div>
                
                {/* Subcategories Dropdown */}
                {category.subcategories.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-[#00BCD4]/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3">
                      {category.subcategories.map((subcat, idx) => (
                        <div key={idx} className="mb-3 last:mb-0">
                          <h3 className="font-medium text-[#006064] mb-1">{subcat.name}</h3>
                          <ul className="text-sm text-[#00838F] space-y-1">
                            {subcat.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="hover:text-[#00BCD4] transition-colors">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Leaflet Map */}
      <div className="relative z-10 flex-1 px-4 py-4 bg-white/30 backdrop-blur-[10px]">
        <div className="bg-white/60 backdrop-blur-[10px] rounded-[10px] h-96 relative overflow-hidden border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
          <div ref={mapRef} className="w-full h-full rounded-[10px]" style={{ minHeight: "384px" }} />

          {/* Map Instructions Overlay */}
          <div className="absolute top-4 left-4 right-4 z-[1000] bg-white/90 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <p className="text-sm text-[#006064] font-medium">📍 Interactive Map</p>
            <p className="text-xs text-[#00838F]">Click anywhere to zoom to your location</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 px-4 py-4 bg-white/60 backdrop-blur-[10px] border-t border-[#00BCD4]/20">
        <div className="text-center">
          <span className="text-xs text-[#00838F]">{filteredFixers.length} fixers available in your area</span>
        </div>
      </div>

      {/* 3D Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-[10px] border-t border-[#00BCD4]/20 px-4 py-2 shadow-[0_4px_10px_rgba(0,188,212,0.3)] z-40">
        <div className="flex justify-around">
          <Link
            href="/"
            className="flex flex-col items-center py-2 text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4]/20 to-[#26C6DA]/20 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30 shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/messages"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Button
            onClick={() => setIsCameraOpen(true)}
            className="flex flex-col items-center py-2 bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] hover:from-[#00ACC1] hover:to-[#00BCD4] rounded-[20px] w-14 h-14 -mt-2 shadow-[0_0_20px_rgba(0,188,212,0.5)] transform hover:scale-110 transition-all duration-300 border-2 border-white/30 active:scale-95"
          >
            <Camera className="h-6 w-6 text-white" />
            <span className="text-xs text-white mt-1 font-bold">AI</span>
          </Button>
          <Link
            href="/history"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <Search className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">History</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-2 text-[#00838F] hover:text-[#006064] transform hover:scale-110 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/40 rounded-[10px] flex items-center justify-center backdrop-blur-[10px] border border-[#00BCD4]/30">
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Camera Modal */}
      <CameraModal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} onCapture={handleCameraCapture} />

      {/* Spacing for bottom nav */}
      <div className="h-16"></div>
    </div>
  )
}
