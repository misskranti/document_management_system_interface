"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { AdminPanel } from "@/components/admin-panel"
import { useAuthStore } from "@/lib/auth-store"

export default function Home() {
  const { isAuthenticated, isAdmin, checkAuth } = useAuthStore()
  const [currentView, setCurrentView] = useState<"login" | "dashboard" | "admin">("login")

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView(isAdmin ? "admin" : "dashboard")
    } else {
      setCurrentView("login")
    }
  }, [isAuthenticated, isAdmin])

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return <LoginForm />
      case "admin":
        return <AdminPanel onSwitchToDashboard={() => setCurrentView("dashboard")} />
      case "dashboard":
        return <Dashboard onSwitchToAdmin={() => setCurrentView("admin")} />
      default:
        return <LoginForm />
    }
  }

  return <div className="min-h-screen bg-gray-50">{renderCurrentView()}</div>
}
