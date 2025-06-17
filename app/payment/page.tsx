"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Smartphone, DollarSign, Shield, CheckCircle, Clock, Receipt, Plus } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [useInsurance, setUseInsurance] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")

  const paymentMethods = [
    {
      id: "card",
      name: "Credit Card",
      icon: <CreditCard className="h-5 w-5" />,
      details: "**** **** **** 4532",
      type: "Visa",
    },
    {
      id: "apple",
      name: "Apple Pay",
      icon: <Smartphone className="h-5 w-5" />,
      details: "Touch ID or Face ID",
      type: "Digital Wallet",
    },
    {
      id: "cash",
      name: "Cash",
      icon: <DollarSign className="h-5 w-5" />,
      details: "Pay in person",
      type: "Cash Payment",
    },
  ]

  const transactionHistory = [
    {
      id: 1,
      description: "TV Screen Repair - Mike Rodriguez",
      amount: 180,
      date: "Dec 15, 2024",
      status: "completed",
      method: "Credit Card",
    },
    {
      id: 2,
      description: "Kitchen Faucet Repair - Sarah Johnson",
      amount: 120,
      date: "Dec 10, 2024",
      status: "completed",
      method: "Apple Pay",
    },
    {
      id: 3,
      description: "Office Chair Repair - David Chen",
      amount: 75,
      date: "Dec 5, 2024",
      status: "pending",
      method: "Cash",
    },
  ]

  const currentRepair = {
    item: "Samsung TV Screen",
    fixer: "Mike Rodriguez",
    cost: 180,
    serviceFee: 18,
    tax: 15.84,
    total: 213.84,
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Payment</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Current Payment */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Current Repair</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{currentRepair.item}</h3>
                <p className="text-sm text-gray-600">by {currentRepair.fixer}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Repair Cost</span>
                <span className="text-gray-900">${currentRepair.cost}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-900">${currentRepair.serviceFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${currentRepair.tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-blue-600">${currentRepair.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Option */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Insurance Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Use Insurance</p>
                <p className="text-sm text-gray-500">This repair may be covered by your insurance</p>
              </div>
              <Switch checked={useInsurance} onCheckedChange={setUseInsurance} />
            </div>
            {useInsurance && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Insurance Applied</span>
                </div>
                <p className="text-xs text-green-700">State Farm Insurance will cover $150 of this repair</p>
                <div className="mt-2 text-sm">
                  <span className="text-gray-600">Your portion: </span>
                  <span className="font-semibold text-green-800">$63.84</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedPaymentMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-gray-600">{method.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.details}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {method.type}
                  </Badge>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Add New Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg font-medium">
            <Shield className="h-5 w-5 mr-2" />
            Pay Securely ${useInsurance ? "63.84" : currentRepair.total}
          </Button>
          <p className="text-xs text-gray-500 text-center">Your payment is secured with 256-bit SSL encryption</p>
        </div>

        {/* Transaction History */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="h-5 w-5 text-gray-600" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactionHistory.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{transaction.date}</span>
                    <span>•</span>
                    <span>{transaction.method}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${transaction.amount}</p>
                  <Badge
                    variant={transaction.status === "completed" ? "default" : "secondary"}
                    className={`text-xs ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status === "completed" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Spacing for content */}
      <div className="h-8"></div>
    </div>
  )
}
