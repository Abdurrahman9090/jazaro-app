"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
