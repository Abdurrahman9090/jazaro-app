"use client";

import { useParams } from "next/navigation";
import { Card, Button } from "antd";
import {
  ToolOutlined,
  ThunderboltOutlined,
  BuildOutlined,
  FormatPainterOutlined,
  FireOutlined,
  SettingOutlined,
  CarOutlined,
  LockOutlined,
  HomeOutlined,
  UserOutlined,
  LaptopOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

// Main categories data (copied from main dashboard page for consistency)
const categories = [
  {
    key: "electricians",
    name: "Electricians",
    description: "Wiring, lighting, and more",
    icon: <ThunderboltOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "plumbers",
    name: "Plumbers",
    description: "Pipes, drains, and fixtures",
    icon: <ToolOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "carpenters",
    name: "Carpenters",
    description: "Furniture and woodwork",
    icon: <BuildOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "painters",
    name: "Painters",
    description: "Interior and exterior painting",
    icon: <FormatPainterOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "hvac",
    name: "HVAC / AC",
    description: "Cooling and ventilation",
    icon: <FireOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "appliance-repair",
    name: "Appliance Repair",
    description: "Fix home appliances",
    icon: <SettingOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "mason",
    name: "Mason / Construction",
    description: "Brickwork and renovations",
    icon: <HomeOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "mechanics",
    name: "Mechanics",
    description: "Car and bike repairs",
    icon: <CarOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "locksmiths",
    name: "Locksmiths",
    description: "Locks and security",
    icon: <LockOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "handyman",
    name: "Handyman",
    description: "General home repairs",
    icon: <UserOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "vehicle-services",
    name: "Vehicle Services",
    description: "Detailing and maintenance",
    icon: <CarOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "it-smart-home",
    name: "IT & Smart Home",
    description: "CCTV and smart devices",
    icon: <LaptopOutlined className="text-4xl text-[#00BCD4]" />,
  },
  {
    key: "cleaning",
    name: "Cleaning Services",
    description: "Home and office cleaning",
    icon: <DeleteOutlined className="text-4xl text-[#00BCD4]" />,
  },
];

// Updated subcategories for all main categories
const subcategoriesMap: Record<string, { key: string; name: string; description: string }[]> = {
  electricians: [
    { key: "general-repair", name: "General Electrical Repairing", description: "All types of electrical repairs for home and office" },
    { key: "wiring", name: "House & Office Wiring", description: "Complete wiring solutions for buildings" },
    { key: "switchboard-panel", name: "Switchboard & Panel Installation", description: "Installation of switchboards and electrical panels" },
    { key: "circuit-breaker", name: "Circuit Breaker & Fuse Repair", description: "Repair and replacement of circuit breakers and fuses" },
    { key: "lighting", name: "Lighting Installation (Indoor/Outdoor)", description: "Indoor and outdoor lighting setup" },
    { key: "generator-ups", name: "Generator & UPS Setup", description: "Installation and maintenance of generators and UPS systems" },
  ],
  plumbers: [
    { key: "water-pipe", name: "Water Pipe Installation & Repair", description: "Install and repair water supply pipes" },
    { key: "sanitary-fitting", name: "Sanitary Fitting & Replacement", description: "Sanitary ware installation and replacement" },
    { key: "drainage", name: "Drainage & Sewerage Solutions", description: "Drainage and sewerage system services" },
    { key: "tank-cleaning", name: "Water Tank Cleaning", description: "Cleaning of water storage tanks" },
    { key: "leak", name: "Leak Detection & Fixing", description: "Fixing pipe and faucet leaks" },
    { key: "fixture-installation", name: "Bathroom & Kitchen Fixture Installation", description: "Install new bathroom and kitchen fixtures" },
  ],
  carpenters: [
    { key: "custom-woodwork", name: "Custom Woodwork", description: "Custom wood designs for home and office" },
    { key: "furniture", name: "Furniture Making & Repair", description: "Custom furniture and repairs" },
    { key: "cabinet-wardrobe", name: "Cabinet & Wardrobe Installation", description: "Installation of cabinets and wardrobes" },
    { key: "door-window", name: "Door and Window Fittings", description: "Fitting and repair of doors and windows" },
    { key: "shelving-storage", name: "Shelving and Storage Solutions", description: "Custom shelving and storage units" },
    { key: "wooden-flooring", name: "Wooden Flooring Installation", description: "Installation of wooden flooring" },
  ],
  painters: [
    { key: "interior-painting", name: "Interior Wall Painting", description: "Painting for indoor walls" },
    { key: "exterior-painting", name: "Exterior Wall Painting", description: "Painting for outdoor walls" },
    { key: "ceiling-decorative", name: "Ceiling & Decorative Paint", description: "Ceiling and decorative painting services" },
    { key: "wallpaper", name: "Wallpaper Installation & Removal", description: "Installation and removal of wallpapers" },
    { key: "surface-prep", name: "Surface Preparation (Plastering, Sanding)", description: "Plastering and sanding for painting prep" },
  ],
  hvac: [
    { key: "ac-install-repair", name: "Air Conditioner Installation & Repair", description: "Install and repair air conditioners" },
    { key: "hvac-system", name: "HVAC System Installation & Servicing", description: "Complete HVAC system services" },
    { key: "split-central-inverter", name: "Split, Central, and Inverter AC Handling", description: "Services for all AC types" },
    { key: "ventilation", name: "Ventilation Setup and Maintenance", description: "Ventilation system installation and upkeep" },
    { key: "gas-refilling", name: "Gas Refilling & Pipe Insulation", description: "AC gas refilling and pipe insulation" },
  ],
  "appliance-repair": [
    { key: "fridge-washing-oven", name: "Refrigerator, Washing Machine, Oven Fixing", description: "Repair of major home appliances" },
    { key: "microwave-dryer", name: "Microwave, Dishwasher & Dryer Repairs", description: "Fixing smaller household appliances" },
    { key: "water-dispenser-heater", name: "Water Dispenser and Heater Repair", description: "Repair of water dispensers and heaters" },
    { key: "tv-home-theater", name: "TV and Home Theater Setup", description: "Installation and repair of TVs and home theater systems" },
  ],
  mason: [
    { key: "brickwork-tiling", name: "Brickwork & Tiling", description: "Brickwork and tile installation services" },
    { key: "renovation", name: "Home and Office Renovation", description: "Complete renovation services" },
    { key: "plastering", name: "Wall Plastering & Painting Prep", description: "Plastering and prep for painting" },
    { key: "kitchen-bathroom", name: "Kitchen & Bathroom Remodeling", description: "Remodeling kitchens and bathrooms" },
    { key: "ceiling-design", name: "Ceiling Design (POP, Gypsum)", description: "Ceiling design with POP or gypsum" },
    { key: "foundation-repairs", name: "Foundation Repairs & Concrete Work", description: "Concrete work and foundation repairs" },
  ],
  mechanics: [
    { key: "car-repairs", name: "Car Mechanical Repairs", description: "Mechanical repairs for cars" },
    { key: "bike-servicing", name: "Motorcycle/Bike Servicing", description: "Servicing for motorcycles and bikes" },
    { key: "engine-diagnostics", name: "Engine Diagnostics", description: "Diagnosing engine issues" },
    { key: "battery-replacement", name: "Battery Replacement", description: "Replacing vehicle batteries" },
    { key: "oil-filter", name: "Oil & Filter Change", description: "Oil changes and filter replacements" },
  ],
  locksmiths: [
    { key: "lock-install-repair", name: "Lock Installation & Repair", description: "Installing and repairing locks" },
    { key: "digital-smart-lock", name: "Digital & Smart Lock Services", description: "Services for digital and smart locks" },
    { key: "door-un/SPDX-License-Identifier: MITunlocking", name: "Door Unlocking (Emergency)", description: "Emergency door unlocking services" },
    { key: "key-duplication", name: "Key Duplication", description: "Duplicating keys for homes and vehicles" },
    { key: "safe-install-repair", name: "Safe Installation & Repair", description: "Installing and repairing safes" },
  ],
  handyman: [
    { key: "tree-trimming", name: "Tree Trimming & Cutting", description: "Trimming and cutting trees" },
    { key: "gutter-cleaning", name: "Gutter Cleaning", description: "Cleaning and maintaining gutters" },
    { key: "pest-control", name: "Pest Control Services", description: "Pest removal and prevention" },
    { key: "carpet-cleaning", name: "Carpet Cleaning", description: "Deep cleaning of carpets" },
    { key: "lawn-mowing", name: "Lawn Mowing & Landscaping", description: "Lawn care and landscaping services" },
    { key: "wall-mounting", name: "Wall Mounting (TVs, Shelves, etc.)", description: "Mounting TVs and shelves" },
    { key: "minor-repairs", name: "Minor Home Repairs", description: "General minor repair services" },
  ],
  "vehicle-services": [
    { key: "car-detailing", name: "Car Detailing & Polishing", description: "Detailing and polishing vehicles" },
    { key: "touring-inspection", name: "Touring Inspection & Pre-Trip Services", description: "Vehicle checks for trips" },
    { key: "tyre-fitting", name: "Tyre Fitting & Puncture Repair", description: "Tyre services and puncture repairs" },
    { key: "ev-battery", name: "Electric Vehicle (EV) Battery Installation & Maintenance", description: "EV battery services" },
    { key: "windshield-repair", name: "Windshield & Glass Repair", description: "Repairing vehicle windshields and glass" },
  ],
  "it-smart-home": [
    { key: "cctv-install", name: "CCTV Installation & Troubleshooting", description: "CCTV setup and troubleshooting" },
    { key: "wifi-network", name: "Wi-Fi & Network Setup", description: "Setting up Wi-Fi and networks" },
    { key: "smart-home-devices", name: "Smart Home Device Setup (Lights, Thermostats)", description: "Installing smart home devices" },
    { key: "doorbell-cameras", name: "Doorbell Cameras & Security Systems", description: "Setting up security cameras and doorbells" },
  ],
  cleaning: [
    { key: "deep-home-cleaning", name: "Deep Home Cleaning", description: "Thorough cleaning of homes" },
    { key: "office-cleaning", name: "Office/Commercial Cleaning", description: "Cleaning for offices and commercial spaces" },
    { key: "move-in-out", name: "Move-in / Move-out Cleaning", description: "Cleaning for moving in or out" },
    { key: "sofa-mattress", name: "Sofa & Mattress Cleaning", description: "Cleaning sofas and mattresses" },
  ],
};

const CategoryPage = () => {
  const params = useParams();
  const categoryKey = params?.category as string;

  // Find the main category object
  const mainCategory = categories.find((cat) => cat.key === categoryKey);

  // Get subcategories for the current category, or empty array if not found
  const subcategories = subcategoriesMap[categoryKey] || [];

  // State for selected subcategories
  const [selectedSubs, setSelectedSubs] = React.useState<string[]>([]);

  // Handle checkbox toggle
  const handleToggle = (key: string) => {
    setSelectedSubs((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  // Handle Find Fixer For Me button click
  const handleFindFixer = () => {
    // For now, just alert the selected subcategories
    // In real app, you would route or send this data to backend
    if (selectedSubs.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    alert(
      `Selected services:\n${selectedSubs
        .map(
          (key) =>
            subcategories.find((s) => s.key === key)?.name || key
        )
        .join(", ")}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] max-w-md mx-auto flex flex-col relative overflow-hidden">
      {/* Main Category Header */}
      <div className="flex flex-col items-center justify-center py-8">
        {mainCategory ? (
          <>
            <div className="flex items-center justify-center mb-2">
              {mainCategory.icon}
            </div>
            <div className="text-2xl font-bold text-[#00838F] mb-1 text-center">
              {mainCategory.name}
            </div>
            <div className="text-sm text-gray-500 text-center">
              {mainCategory.description}
            </div>
          </>
        ) : (
          <div className="text-xl font-bold text-[#00838F] mb-1 text-center capitalize">
            {categoryKey}
          </div>
        )}
      </div>

      {/* Subcategories as checklist */}
      <main className="flex-1 p-4 pt-0 overflow-y-auto">
        {subcategories.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              {subcategories.map((sub) => (
                <Card
                  key={sub.key}
                  hoverable
                  className={`flex flex-col items-center justify-center bg-white rounded-lg shadow-md transition-transform duration-200 border border-[#E0F7FA] ${
                    selectedSubs.includes(sub.key)
                      ? "ring-2 ring-[#00BCD4] scale-105"
                      : "hover:scale-105 hover:shadow-[0_8px_16px_rgba(0,123,255,0.2)]"
                  }`}
                  bodyStyle={{ padding: "20px", textAlign: "center" }}
                  onClick={() => handleToggle(sub.key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="relative flex items-center justify-center w-full">
                      <input
                        type="checkbox"
                        checked={selectedSubs.includes(sub.key)}
                        onChange={() => handleToggle(sub.key)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 accent-[#00BCD4] w-5 h-5"
                        style={{ zIndex: 2 }}
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={-1}
                        aria-label={`Select ${sub.name}`}
                      />
                      {mainCategory && (
                        <div className="ml-6 w-full flex justify-center">
                          {React.cloneElement(mainCategory.icon, {
                            className:
                              "text-4xl text-[#00BCD4] bg-[#E0F7FA] p-3 rounded-full shadow-sm",
                          })}
                        </div>
                      )}
                    </div>
                    <span className="text-base font-semibold text-gray-800 leading-tight text-center">
                      {sub.name}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-2 text-center">
                      {sub.description}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button
                type="primary"
                size="large"
                className="bg-[#00BCD4] hover:bg-[#00838F] text-white font-semibold rounded-lg px-8 py-2 shadow-md transition-all duration-200"
                onClick={handleFindFixer}
                disabled={selectedSubs.length === 0}
              >
                Find Fixer For Me
              </Button>
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-center">
            No subcategories found for this category.
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;