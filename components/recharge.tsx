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
    <div className="relative cursor-pointer group" onClick={onSelect}>
      <div
        className={`flex flex-col items-center p-3 bg-white border-2 rounded-xl transition-all duration-200 ${
          selected ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <div className="w-full bg-purple-700 rounded-lg overflow-hidden mb-2 shadow-md group-hover:shadow-lg transition-all">
          <div className="relative pt-[60%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{value}</span>
              <span className="text-sm text-white absolute top-2 left-2">د.ك</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 py-1 px-2 text-center">
              <span className="text-xs text-white">بطاقة تعبئة رصيد</span>
            </div>
            <div className="absolute bottom-1 right-1">
              <span className="text-white text-lg font-bold">stc</span>
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-600">صالحة لمدة {days} يوم</span>
      </div>
      {selected && (
        <div className="absolute top-2 right-2 h-5 w-5 bg-purple-600 rounded-full">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  )
}
