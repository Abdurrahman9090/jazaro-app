"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Camera,
  MapPin,
  MessageCircle,
  Bell,
  User,
  Menu,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import CameraModal from "@/components/camera-modal";

export default function MainPage() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const fixers = [
    {
      id: 1,
      name: "Mike Rodriguez",
      specialty: "Electronics Repair",
      rating: 4.9,
      distance: "0.5 mi",
      avatar: "/placeholder.svg?height=40&width=40",
      available: true,
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
      position: { lat: 40.7505, lng: -73.9934 },
    },
  ];

  // Handle camera capture
  const handleCameraCapture = (imageData: string) => {
    console.log("Image captured:", imageData);
    // Here you would typically send the image to your backend for processing
    // or navigate to a repair request page with the captured image
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      // Dynamically import Leaflet
      import("leaflet").then((L) => {
        // Initialize map
        // Fix: Prevent "Map container is already initialized" error
        if (mapRef.current && mapRef.current._leaflet_id) {
          // @ts-ignore
          mapRef.current._leaflet_id = null;
        }
        const map = L?.map(mapRef.current!).setView([40.7589, -73.9851], 13);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // Add fixer markers
        fixers.forEach((fixer) => {
          const marker = L.marker([
            fixer.position.lat,
            fixer.position.lng,
          ]).addTo(map);
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${fixer.name}</h3>
              <p class="text-xs text-gray-600">${fixer.specialty}</p>
              <p class="text-xs">⭐ ${fixer.rating} • ${fixer.distance}</p>
              <p class="text-xs ${
                fixer.available ? "text-green-600" : "text-red-600"
              }">
                ${fixer.available ? "Available" : "Busy"}
              </p>
            </div>
          `);
        });

        // Map click handler for geolocation zoom
        map.on("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.flyTo([latitude, longitude], 16, { duration: 1 });

                // Add user location marker
                L.marker([latitude, longitude])
                  .addTo(map)
                  .bindPopup("Your Location")
                  .openPopup();
              },
              () => {
                alert(
                  "Geolocation not available. Zooming to default location."
                );
                map.flyTo([40.7589, -73.9851], 16, { duration: 1 });
              }
            );
          } else {
            alert("Geolocation not supported by your browser.");
            map.flyTo([40.7589, -73.9851], 16, { duration: 1 });
          }
        });

        mapInstanceRef.current = map;
      });
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [fixers]);

  // Load Leaflet CSS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

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
            {[...Array(10)].map((_, i) => (
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

      {/* Interactive Leaflet Map */}
      <div className="relative z-10 flex-1 px-4 py-4 bg-white/30 backdrop-blur-[10px]">
        <div className="bg-white/60 backdrop-blur-[10px] rounded-[10px] h-96 relative overflow-hidden border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
          <div
            ref={mapRef}
            className="w-full h-full rounded-[10px]"
            style={{ minHeight: "384px" }}
          />

          {/* Map Instructions Overlay */}
          <div className="absolute top-4 left-4 right-4 z-[1000] bg-white/90 backdrop-blur-[10px] rounded-[10px] p-3 border border-[#00BCD4]/30 shadow-[0_4px_10px_rgba(0,188,212,0.3)]">
            <p className="text-sm text-[#006064] font-medium">
              📍 Interactive Map
            </p>
            <p className="text-xs text-[#00838F]">
              Click anywhere to zoom to your location
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 px-4 py-4 bg-white/60 backdrop-blur-[10px] border-t border-[#00BCD4]/20">
        <div className="text-center">
          <span className="text-xs text-[#00838F]">
            {fixers.length} fixers available in your area
          </span>
        </div>
      </div>

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Spacing for bottom nav */}
      <div className="h-16"></div>
    </div>
  );
}
