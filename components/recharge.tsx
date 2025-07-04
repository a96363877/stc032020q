"use client"
import { CheckCircle } from "lucide-react"

interface RechargeCardProps {
  value: number
  days: number
  selected?: boolean
  onSelect?: () => void
}

export function RechargeCard({ value, days, selected = false, onSelect }: RechargeCardProps) {
  return (
    <div className="relative cursor-pointer group w-full" onClick={onSelect}>
      <div
        className={`flex flex-col items-center p-2 sm:p-3 lg:p-4 bg-white border-2 rounded-xl transition-all duration-200 ${
          selected ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <div className="w-full bg-purple-700 rounded-lg overflow-hidden mb-2 sm:mb-3 shadow-md group-hover:shadow-lg transition-all">
          <div className="relative pt-[55%] sm:pt-[50%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">{value}</span>
              <span className="text-xs sm:text-sm text-white absolute top-2 sm:top-3 left-2 sm:left-3">د.ك</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 py-1 px-2">
              <span className="text-xs sm:text-sm text-white text-center block">بطاقة تعبئة رصيد</span>
            </div>
            <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2">
              <span className="text-white text-sm sm:text-base lg:text-lg font-bold">stc</span>
            </div>
          </div>
        </div>
        <span className="text-xs sm:text-sm lg:text-base text-gray-600 text-center px-1">صالحة لمدة {days} يوم</span>
      </div>
      {selected && (
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 bg-purple-600 rounded-full flex items-center justify-center">
          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
      )}
    </div>
  )
}
