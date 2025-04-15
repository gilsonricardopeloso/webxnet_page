import { useToast } from "./use-toast"
import { CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react"

const toastStyles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200"
}

const toastIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type]
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-lg border p-4 shadow-lg ${toastStyles[toast.type]}`}
          >
            <Icon className="h-5 w-5" />
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        )
      })}
    </div>
  )
}
