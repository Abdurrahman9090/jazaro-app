"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  MapPin,
  Forward,
} from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { AuthSelector } from "@/redux/reducers";

export default function FixerRegisterPage() {
  const { user } = useSelector(AuthSelector);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profession: "",
    experience: "",
    location: "",
    bio: "",
    specialties: [] as string[],
    certifications: [] as string[],
  });

  const specialties = [
    "Electronics Repair",
    "Home Appliances",
    "Furniture",
    "Plumbing",
    "Electrical",
    "HVAC",
    "Carpentry",
    "Automotive",
    "Computer Repair",
    "Smart Home",
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Fixer registration attempt with:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleCertificationAdd = () => {
    const cert = prompt("Enter certification name:");
    if (cert) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, cert],
      }));
    }
  };

  const handleCertificationRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] p-4 flex items-center justify-center">
      <div className="">
        {step === 1 ? (
          <form onSubmit={handleNext}>
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#00838F]">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Username" className="text-[#006064]">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="Username"
                      name="username"
                      type="text"
                      placeholder="your username"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#006064]">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#006064]">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[#006064]">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Your location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#00838F]">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession" className="text-[#006064]">
                    Main Profession
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="profession"
                      name="profession"
                      type="text"
                      placeholder="Your Profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-[#006064]">
                    Years of Experience
                  </Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, experience: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[#006064]">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about your experience and expertise..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px] min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#00838F]">
                Account Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#006064]">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00838F] hover:text-[#00BCD4] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#006064]">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00838F]" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 bg-white/80 backdrop-blur-[10px] border border-[#00BCD4]/30 text-[#006064] placeholder:text-[#00838F] focus:border-[#00BCD4] focus:ring-[#00BCD4]/20 rounded-[10px]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px] mt-6"
            >
              Next <Forward className="inline h-4 w-4 ml-2" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Specialties Section */}
            <div className="space-y-2">
              <Label className="text-[#006064]">Specialties</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specialties.map((specialty) => (
                  <div
                    key={specialty}
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      formData.specialties.includes(specialty)
                        ? "bg-[#00BCD4] text-white"
                        : "bg-white/80 hover:bg-[#00BCD4]/10"
                    }`}
                    onClick={() => handleSpecialtyChange(specialty)}
                  >
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="text-sm">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-2">
              <Label className="text-[#006064]">Certifications</Label>
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/80 p-2 rounded-lg"
                  >
                    <span className="text-[#006064]">{cert}</span>
                    <button
                      type="button"
                      onClick={() => handleCertificationRemove(index)}
                      className="text-[#00838F] hover:text-[#00BCD4] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleCertificationAdd}
                  className="w-full bg-white/80 text-[#00838F] hover:bg-[#00BCD4]/10 border border-[#00BCD4]/30"
                >
                  Add Certification
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-[#00BCD4]/30 text-[#00BCD4] focus:ring-[#00BCD4]/20"
                required
              />
              <Label htmlFor="terms" className="text-sm text-[#00838F]">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#00BCD4] hover:text-[#00838F] transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#00BCD4] hover:text-[#00838F] transition-colors"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                className="bg-white/80 text-[#00838F] border border-[#00BCD4]/30 hover:bg-[#00BCD4]/10 rounded-[10px]"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-[#00BCD4] text-white hover:bg-[#00838F] rounded-[10px]"
              >
                Create Fixer Account
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
